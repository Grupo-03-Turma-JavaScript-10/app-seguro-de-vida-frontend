import { CreateUsuarioDto } from '../../interfaces/CreateUsuarioDto';
import { SeguroVida } from '../../interfaces/SeguroVida';
import PainelPlanoSelecionado from './PainelPlanoSelecionado';

interface FormCadastroProps {
  planoSelecionado: SeguroVida;
  formData: CreateUsuarioDto;
  loading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onVoltar: () => void;
}

export default function FormCadastro({
  planoSelecionado,
  formData,
  loading,
  onInputChange,
  onSubmit,
  onVoltar
}: FormCadastroProps) {
  return (
    <div className="container mx-auto max-w-2xl">
      <button
        onClick={onVoltar}
        className="mb-6 text-blue-600 hover:text-blue-800 font-semibold flex items-center"
      >
        ← Voltar aos Planos
      </button>

      <PainelPlanoSelecionado plano={planoSelecionado} />

      <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Complete seu Cadastro</h1>

        {/* Dados Pessoais */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Dados Pessoais</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Nome *</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              value={formData.rendaMensal || ''}
              onChange={onInputChange}
              required
              step="0.01"
              min="0"
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Mãe, Pai, Irmão, etc"
            />
          </div>
        </div>


        <div className="flex gap-4">
          <button
            type="button"
            onClick={onVoltar}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
          >
            Voltar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            {loading ? 'Processando...' : `Confirmar ${planoSelecionado.tipoSeguro}`}
          </button>
        </div>
      </form>
    </div>
  );
}
