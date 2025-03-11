import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface FluxoItem {
  id: string;
  alerta: string;
  prazo: string;
}

interface FormData {
  macroProcesso: string;
  subProcesso: string;
  objetivo: string;
  elaboracao: FluxoItem[];
  verificacao: FluxoItem[];
  aprovacao: FluxoItem[];
}

// Dados estáticos para exemplo (serão substituídos pelo banco de dados)
const macroProcessos = [
  'Gestão de Qualidade',
  'Recursos Humanos',
  'Financeiro',
  'Operações',
  'Marketing'
];

const subProcessos = {
  'Gestão de Qualidade': ['Controle de Documentos', 'Auditoria Interna', 'Ações Corretivas'],
  'Recursos Humanos': ['Recrutamento', 'Treinamento', 'Avaliação de Desempenho'],
  'Financeiro': ['Contas a Pagar', 'Contas a Receber', 'Orçamento'],
  'Operações': ['Produção', 'Manutenção', 'Logística'],
  'Marketing': ['Campanhas', 'Mídias Sociais', 'Análise de Mercado']
};

const objetivos = {
  'Controle de Documentos': ['Padronizar documentação', 'Garantir conformidade', 'Melhorar processos'],
  'Auditoria Interna': ['Avaliar conformidade', 'Identificar melhorias', 'Reduzir riscos'],
  'Ações Corretivas': ['Resolver não conformidades', 'Prevenir recorrências', 'Melhorar sistema'],
  'Recrutamento': ['Atrair talentos', 'Selecionar candidatos', 'Preencher vagas'],
  'Treinamento': ['Desenvolver equipe', 'Capacitar funcionários', 'Melhorar performance'],
  // ... outros objetivos
};

export default function CadastroBasico() {
  const [formData, setFormData] = useState<FormData>({
    macroProcesso: '',
    subProcesso: '',
    objetivo: '',
    elaboracao: [],
    verificacao: [],
    aprovacao: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Reset dependent fields when parent field changes
      if (name === 'macroProcesso') {
        newData.subProcesso = '';
        newData.objetivo = '';
      } else if (name === 'subProcesso') {
        newData.objetivo = '';
      }
      
      return newData;
    });
  };

  const addFluxoItem = (tipo: 'elaboracao' | 'verificacao' | 'aprovacao') => {
    const newItem: FluxoItem = {
      id: Date.now().toString(),
      alerta: '',
      prazo: ''
    };
    setFormData(prev => ({
      ...prev,
      [tipo]: [...prev[tipo], newItem]
    }));
  };

  const updateFluxoItem = (
    tipo: 'elaboracao' | 'verificacao' | 'aprovacao',
    id: string,
    field: string,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [tipo]: prev[tipo].map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeFluxoItem = (tipo: 'elaboracao' | 'verificacao' | 'aprovacao', id: string) => {
    setFormData(prev => ({
      ...prev,
      [tipo]: prev[tipo].filter(item => item.id !== id)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Aqui você enviaria os dados para o backend
  };

  const renderFluxoSection = (
    tipo: 'elaboracao' | 'verificacao' | 'aprovacao',
    titulo: string,
    items: FluxoItem[]
  ) => (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-medium text-gray-900">{titulo}</h4>
        <button
          type="button"
          onClick={() => addFluxoItem(tipo)}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="w-4 h-4 mr-1" />
          Novo
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 bg-white p-3 rounded-md shadow-sm">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Alerta</label>
              <input
                type="date"
                value={item.alerta}
                onChange={(e) => updateFluxoItem(tipo, item.id, 'alerta', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Prazo</label>
              <input
                type="date"
                value={item.prazo}
                onChange={(e) => updateFluxoItem(tipo, item.id, 'prazo', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <button
              type="button"
              onClick={() => removeFluxoItem(tipo, item.id)}
              className="self-end text-red-600 hover:text-red-900 p-2"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Cadastro Básico</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Primeira Parte - Seleção de Processo */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Informações do Processo</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Macro Processo</label>
              <select
                name="macroProcesso"
                value={formData.macroProcesso}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Selecione um macro processo</option>
                {macroProcessos.map(processo => (
                  <option key={processo} value={processo}>{processo}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Subprocesso</label>
              <select
                name="subProcesso"
                value={formData.subProcesso}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                disabled={!formData.macroProcesso}
              >
                <option value="">Selecione um subprocesso</option>
                {formData.macroProcesso && subProcessos[formData.macroProcesso as keyof typeof subProcessos]?.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Objetivo</label>
              <select
                name="objetivo"
                value={formData.objetivo}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                disabled={!formData.subProcesso}
              >
                <option value="">Selecione um objetivo</option>
                {formData.subProcesso && objetivos[formData.subProcesso as keyof typeof objetivos]?.map(obj => (
                  <option key={obj} value={obj}>{obj}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Segunda Parte - Fluxos de Aprovação */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Fluxo de Aprovação</h3>
          <div className="grid grid-cols-1 gap-6">
            {renderFluxoSection('elaboracao', 'Elaboração', formData.elaboracao)}
            {renderFluxoSection('verificacao', 'Verificação', formData.verificacao)}
            {renderFluxoSection('aprovacao', 'Aprovação', formData.aprovacao)}
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}