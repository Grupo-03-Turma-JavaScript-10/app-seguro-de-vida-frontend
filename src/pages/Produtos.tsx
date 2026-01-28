import { useState, useEffect } from 'react';
import { cadastrarUsuario, cadastrarSeguroVida, listarSegurosVida } from '../services/Service';
import { CreateUsuarioDto } from '../interfaces/CreateUsuarioDto';
import { SeguroVida } from '../interfaces/SeguroVida';
import { toast } from 'react-toastify';
import ListaPlanos from '../components/produtos/ListaPlanos';
import FormCadastro from '../components/produtos/FormCadastro';

export default function Produtos() {
  const [etapa, setEtapa] = useState<'planos' | 'cadastro'>('planos');
  const [planoSelecionado, setPlanoSelecionado] = useState<SeguroVida | null>(null);
  const [planos, setPlanos] = useState<SeguroVida[]>([]);
  const [carregandoPlanos, setCarregandoPlanos] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<CreateUsuarioDto>({
    nome: '',
    email: '',
    dataNascimento: '',
    cpf: '',
    rendaMensal: 0,
    endereco: {
      rua: '',
      numero: '',
      cidade: '',
      cep: ''
    },
    contatoEmergencia: {
      nome: '',
      telefone: '',
      grauParentesco: ''
    }
  });

  // Carregar planos do backend
  useEffect(() => {
    const carregarPlanos = async () => {
      try {
        setCarregandoPlanos(true);
        const dados = await listarSegurosVida();
        
        // Filtrar apenas templates únicos (removendo duplicatas por tipoSeguro)
        const templates = dados.filter((seguro, index, self) =>
          index === self.findIndex((s) => s.tipoSeguro === seguro.tipoSeguro)
        );
        
        setPlanos(templates);
      } catch (erro) {
        console.error('Erro ao carregar planos:', erro);
        toast.error('Erro ao carregar planos. Tente novamente.');
      } finally {
        setCarregandoPlanos(false);
      }
    };

    carregarPlanos();
  }, []);

  const handleSelecionarPlano = (plano: SeguroVida) => {
    setPlanoSelecionado(plano);
    setEtapa('cadastro');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('endereco.')) {
      const enderecoField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          [enderecoField]: value
        }
      }));
    } else if (name.startsWith('contatoEmergencia.')) {
      const contatoField = name.split('.')[1];
      setFormData(prev => {
        const contato = prev.contatoEmergencia || { nome: '', telefone: '', grauParentesco: '' };
        return {
          ...prev,
          contatoEmergencia: {
            ...contato,
            [contatoField]: value
          }
        };
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'rendaMensal' ? Number(value) : value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações básicas
    if (!formData.nome || !formData.email || !formData.cpf) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (!planoSelecionado) {
      toast.error('Selecione um plano');
      return;
    }

    setLoading(true);

    try {
      // Criar usuário
      const usuarioResponse = await cadastrarUsuario(formData);
      const usuarioId = usuarioResponse.id;

      // Associar usuário ao plano existente selecionado
      const seguroData = {
        usuarioId,
        tipoSeguro: planoSelecionado.tipoSeguro,
        valorAssegurado: planoSelecionado.valorAssegurado
      };

      await cadastrarSeguroVida(seguroData);

      toast.success(`Cadastro concluído! Você foi associado ao ${planoSelecionado.tipoSeguro}.`);
      
      // Limpar formulário
      setFormData({
        nome: '',
        email: '',
        dataNascimento: '',
        cpf: '',
        rendaMensal: 0,
        endereco: {
          rua: '',
          numero: '',
          cidade: '',
          cep: ''
        },
        contatoEmergencia: {
          nome: '',
          telefone: '',
          grauParentesco: ''
        }
      });
      
      setEtapa('planos');
      setPlanoSelecionado(null);
    } catch (erro) {
      console.error('Erro ao criar cadastro:', erro);
      toast.error('Erro ao criar cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Etapa de Seleção de Planos */}
      {etapa === 'planos' && (
        <ListaPlanos
          planos={planos}
          carregando={carregandoPlanos}
          onSelecionarPlano={handleSelecionarPlano}
        />
      )}

      {/* Etapa de Cadastro */}
      {etapa === 'cadastro' && planoSelecionado && (
        <FormCadastro
          planoSelecionado={planoSelecionado}
          formData={formData}
          loading={loading}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onVoltar={() => setEtapa('planos')}
        />
      )}
    </div>
  );
}

