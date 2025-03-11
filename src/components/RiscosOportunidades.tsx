import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface RiscoOportunidade {
  id: string;
  tipo: 'risco' | 'oportunidade';
  descricao: string;
  impacto: 'baixo' | 'medio' | 'alto';
  probabilidade: 'baixa' | 'media' | 'alta';
  acoes: string;
  responsavel: string;
  prazo: string;
}

export default function RiscosOportunidades() {
  const [items, setItems] = useState<RiscoOportunidade[]>([]);
  const [currentItem, setCurrentItem] = useState<RiscoOportunidade>({
    id: '',
    tipo: 'risco',
    descricao: '',
    impacto: 'baixo',
    probabilidade: 'baixa',
    acoes: '',
    responsavel: '',
    prazo: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentItem(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentItem.id) {
      setItems(items.map(item => 
        item.id === currentItem.id ? currentItem : item
      ));
    } else {
      setItems([...items, { ...currentItem, id: Date.now().toString() }]);
    }
    setCurrentItem({
      id: '',
      tipo: 'risco',
      descricao: '',
      impacto: 'baixo',
      probabilidade: 'baixa',
      acoes: '',
      responsavel: '',
      prazo: '',
    });
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleEdit = (item: RiscoOportunidade) => {
    setCurrentItem(item);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Riscos e Oportunidades</h2>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo</label>
            <select
              name="tipo"
              value={currentItem.tipo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="risco">Risco</option>
              <option value="oportunidade">Oportunidade</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <input
              type="text"
              name="descricao"
              value={currentItem.descricao}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Impacto</label>
            <select
              name="impacto"
              value={currentItem.impacto}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="baixo">Baixo</option>
              <option value="medio">Médio</option>
              <option value="alto">Alto</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Probabilidade</label>
            <select
              name="probabilidade"
              value={currentItem.probabilidade}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Ações</label>
            <textarea
              name="acoes"
              value={currentItem.acoes}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Responsável</label>
            <input
              type="text"
              name="responsavel"
              value={currentItem.responsavel}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Prazo</label>
            <input
              type="date"
              name="prazo"
              value={currentItem.prazo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            {currentItem.id ? 'Atualizar' : 'Adicionar'}
          </button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impacto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probabilidade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsável</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prazo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className={item.tipo === 'risco' ? 'bg-red-50' : 'bg-green-50'}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.tipo === 'risco' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {item.tipo === 'risco' ? 'Risco' : 'Oportunidade'}
                  </span>
                </td>
                <td className="px-6 py-4">{item.descricao}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.impacto}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.probabilidade}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.responsavel}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.prazo}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}