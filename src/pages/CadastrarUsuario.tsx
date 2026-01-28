import { useState } from 'react';
import { cadastrarUsuario } from '../services/Service';
import { CreateUsuarioDto } from '../interfaces/CreateUsuarioDto';
import { toast } from 'react-toastify';

export default function CadastrarUsuario() {
  const [formData, setFormData] = useState<CreateUsuarioDto>({
    nome: '',
    dataNascimento: '',
    cpf: '',
    email: '',
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

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const keys = name.split('.');

    if (keys.length === 1) {
      setFormData({
        ...formData,
        [name]: name === 'rendaMensal' ? Number(value) : value
      });
    } else if (keys.length === 2) {
      setFormData({
        ...formData,
        [keys[0]]: {
          ...formData[keys[0] as keyof CreateUsuarioDto] as object,
          [keys[1]]: value
        }
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await cadastrarUsuario(formData);
      toast.success('Usuário cadastrado com sucesso!');
      console.log('Resposta:', response);
      
      // Limpar formulário
      setFormData({
        nome: '',
        dataNascimento: '',
        cpf: '',
        email: '',
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
    } catch (error) {
      toast.error('Erro ao cadastrar usuário');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Cadastrar Usuário</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
        {/* Dados Pessoais */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Dados Pessoais</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Nome *</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="João Silva"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Data de Nascimento *</label>
            <input
              type="date"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">CPF *</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123.456.789-00"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="joao@email.com"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Renda Mensal *</label>
            <input
              type="number"
              name="rendaMensal"
              value={formData.rendaMensal}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="5000"
            />
          </div>
        </div>

        {/* Endereço */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Endereço</h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Rua *</label>
            <input
              type="text"
              name="endereco.rua"
              value={formData.endereco.rua}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Rua das Flores"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Número *</label>
            <input
              type="text"
              name="endereco.numero"
              value={formData.endereco.numero}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Cidade *</label>
            <input
              type="text"
              name="endereco.cidade"
              value={formData.endereco.cidade}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="São Paulo"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">CEP *</label>
            <input
              type="text"
              name="endereco.cep"
              value={formData.endereco.cep}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="01234-567"
            />
          </div>
        </div>

        {/* Contato de Emergência */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Contato de Emergência</h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Nome</label>
            <input
              type="text"
              name="contatoEmergencia.nome"
              value={formData.contatoEmergencia?.nome || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nome do contato"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Telefone</label>
            <input
              type="tel"
              name="contatoEmergencia.telefone"
              value={formData.contatoEmergencia?.telefone || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="(11) 98765-4321"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Grau de Parentesco</label>
            <input
              type="text"
              name="contatoEmergencia.grauParentesco"
              value={formData.contatoEmergencia?.grauParentesco || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Mãe, Pai, Irmão, etc"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          {loading ? 'Cadastrando...' : 'Cadastrar Usuário'}
        </button>
      </form>
    </div>
  );
}
