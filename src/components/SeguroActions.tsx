import React, { useState } from 'react';
import { SeguroVida } from '../models/Interfaces';
import { atualizarSeguroVida, deletarSeguroVida } from '../services/Service';

interface SeguroActionsProps {
  seguro: SeguroVida;
  onAlterado: () => void;
  onDeletado: () => void;
  buttonClassName?: string;
  deleteButtonClassName?: string;
}



export function SeguroActions({ seguro, onAlterado, onDeletado, buttonClassName, deleteButtonClassName }: SeguroActionsProps) {
  // Planos padrão e valores fixos
  const PLANOS_PADRAO = [
    { tipo: 'Plano Básico', valor: 50000 },
    { tipo: 'Plano Intermediário', valor: 150000 },
    { tipo: 'Plano Premium', valor: 500000 },
    { tipo: 'Plano Personalizado', valor: null },
  ];

  const [editando, setEditando] = useState(false);
  const [tipo, setTipo] = useState(seguro.tipoSeguro);
  const [valor, setValor] = useState(String(seguro.valorAssegurado));
  const [loading, setLoading] = useState(false);

  const handleAlterar = async () => {
    setLoading(true);
    try {
      let valorNum: number;
      if (tipo === 'Plano Personalizado') {
        valorNum = Number(valor.replace(/\./g, '').replace(',', '.'));
        if (isNaN(valorNum) || valorNum < 10000 || valorNum > 1000000) {
          alert('Digite um valor entre 10.000 e 1.000.000 para o seguro personalizado!');
          setLoading(false);
          return;
        }
      } else {
        // Valor fixo do plano padrão
        const planoPadrao = PLANOS_PADRAO.find(p => p.tipo === tipo);
        valorNum = (planoPadrao && typeof planoPadrao.valor === 'number') ? planoPadrao.valor : seguro.valorAssegurado;
      }
      await atualizarSeguroVida({
        ...seguro,
        valorAssegurado: valorNum,
        tipoSeguro: tipo,
        usuarioId: seguro.usuarioId ?? seguro.usuario.id
      });
      setEditando(false);
      onAlterado();
    } finally {
      setLoading(false);
    }
  };

  const handleDeletar = async () => {
    if (!window.confirm('Tem certeza que deseja deletar este seguro?')) return;
    setLoading(true);
    try {
      await deletarSeguroVida(seguro.id);
      onDeletado();
    } finally {
      setLoading(false);
    }
  };

  return editando ? (
    <div className="flex flex-col gap-2 mt-4">
      <label className="text-sm font-semibold">Tipo de Plano</label>
      <select
        className="border rounded px-2 py-1"
        value={tipo}
        onChange={e => {
          const novoTipo = e.target.value;
          setTipo(novoTipo);
          if (novoTipo !== 'Plano Personalizado') {
            const planoPadrao = PLANOS_PADRAO.find(p => p.tipo === novoTipo);
            setValor(planoPadrao && planoPadrao.valor ? String(planoPadrao.valor) : '');
          }
        }}
        disabled={loading}
      >
        {PLANOS_PADRAO.map(plano => (
          <option key={plano.tipo} value={plano.tipo}>{plano.tipo}</option>
        ))}
      </select>
      <label className="text-sm font-semibold">Valor Assegurado</label>
      <input
        className={`border rounded px-2 py-1 ${tipo !== 'Plano Personalizado' ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ''}`}
        type="number"
        value={valor}
        onChange={e => setValor(e.target.value)}
        disabled={loading || tipo !== 'Plano Personalizado'}
        min={tipo === 'Plano Personalizado' ? 10000 : undefined}
        max={tipo === 'Plano Personalizado' ? 1000000 : undefined}
        step={1000}
        placeholder={tipo === 'Plano Personalizado' ? 'Digite o valor desejado' : 'Valor fixo do plano'}
      />
      {tipo !== 'Plano Personalizado' && (
        <span className="text-xs text-gray-500">Valor fixo do plano selecionado</span>
      )}
      <div className="flex flex-row justify-center gap-4 mt-2 ml-16">
        <button
          className={buttonClassName || "bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50"}
          onClick={handleAlterar}
          disabled={loading}
          style={{ minWidth: 90 }}
        >Salvar</button>
        <button
          className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
          onClick={() => setEditando(false)}
          disabled={loading}
          style={{ minWidth: 90 }}
        >Cancelar</button>
      </div>
    </div>
  ) : (
    <div className="flex flex-row justify-center gap-4 mt-4 ml-16">
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded transition disabled:opacity-50"
        onClick={() => setEditando(true)}
        style={{ minWidth: 90 }}
      >Alterar</button>
      <button
        className={deleteButtonClassName || "bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"}
        onClick={handleDeletar}
        disabled={loading}
        style={{ minWidth: 90 }}
      >Deletar</button>
    </div>
  );
}
