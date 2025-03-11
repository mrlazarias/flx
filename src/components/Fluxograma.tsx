import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  NodeChange,
  EdgeChange,
  Connection,
  addEdge,
  Panel,
  Handle,
  Position,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Plus, Square, Diamond, Circle, ArrowRight, X, Trash2, Type, Hexagon, Cylinder } from 'lucide-react';

interface NodeData {
  label: string;
}

const CustomNode = ({ data, type }: any) => {
  const nodeStyles = {
    start: 'bg-green-100 border-2 border-green-500 rounded-full',
    process: 'bg-blue-100 border-2 border-blue-500 rounded-lg',
    subprocess: 'bg-blue-100 border-4 border-blue-500 rounded-lg',
    decision: 'bg-yellow-100 border-2 border-yellow-500 transform rotate-45',
    end: 'bg-red-100 border-2 border-red-500 rounded-full',
    intermediate: 'bg-purple-100 border-4 border-purple-500 rounded-full',
    gateway: 'bg-yellow-100 border-2 border-yellow-500 rotate-45',
    text: 'bg-transparent',
    database: 'bg-cyan-100 border-2 border-cyan-500',
    parallelogram: 'bg-indigo-100 border-2 border-indigo-500 transform skew-x-12',
    cloud: 'bg-pink-100 border-2 border-pink-500 rounded-[50px]',
    hexagon: 'bg-orange-100 border-2 border-orange-500 clip-path-hexagon',
    octagon: 'bg-emerald-100 border-2 border-emerald-500 clip-path-octagon',
    star: 'bg-violet-100 border-2 border-violet-500 clip-path-star',
  };

  const isRotated = type === 'decision' || type === 'gateway';
  const baseClass = nodeStyles[type as keyof typeof nodeStyles];
  
  // Estilo especial para banco de dados
  if (type === 'database') {
    return (
      <div className={`relative w-48 h-32 ${baseClass} rounded-t-2xl overflow-hidden`}>
        <div className="absolute top-0 left-0 right-0 h-8 bg-cyan-200 border-b-2 border-cyan-500"></div>
        <Handle
          type="source"
          position={Position.Top}
          style={{ background: '#555', width: '8px', height: '8px' }}
          id="top"
        />
        <Handle
          type="source"
          position={Position.Right}
          style={{ background: '#555', width: '8px', height: '8px' }}
          id="right"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          style={{ background: '#555', width: '8px', height: '8px' }}
          id="bottom"
        />
        <Handle
          type="source"
          position={Position.Left}
          style={{ background: '#555', width: '8px', height: '8px' }}
          id="left"
        />
        <div className="flex items-center justify-center h-full pt-8">
          {data.label}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${isRotated ? 'w-32 h-32' : type === 'text' ? 'min-w-32' : 'w-48'} ${baseClass} p-4`}>
      <Handle
        type="source"
        position={Position.Top}
        style={{ background: '#555', width: '8px', height: '8px' }}
        id="top"
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555', width: '8px', height: '8px' }}
        id="right"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#555', width: '8px', height: '8px' }}
        id="bottom"
      />
      <Handle
        type="source"
        position={Position.Left}
        style={{ background: '#555', width: '8px', height: '8px' }}
        id="left"
      />

      <div className={`flex items-center justify-center h-full ${isRotated ? 'transform -rotate-45' : ''} ${type === 'text' ? 'text-lg font-medium' : ''}`}>
        {data.label}
      </div>
    </div>
  );
};

const nodeTypes = {
  start: CustomNode,
  process: CustomNode,
  subprocess: CustomNode,
  decision: CustomNode,
  end: CustomNode,
  intermediate: CustomNode,
  gateway: CustomNode,
  text: CustomNode,
  database: CustomNode,
  parallelogram: CustomNode,
  cloud: CustomNode,
  hexagon: CustomNode,
  octagon: CustomNode,
  star: CustomNode,
};

const defaultEdgeOptions = {
  animated: true,
  type: 'smoothstep',
  style: { stroke: '#666', strokeWidth: 2 },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: '#666',
    width: 20,
    height: 20,
  },
};

const EditModal = ({ node, onClose, onUpdate, onDelete }: any) => {
  const [nodeData, setNodeData] = useState(node.data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(node.id, nodeData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Editar Elemento</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              value={nodeData.label}
              onChange={(e) => setNodeData({ ...nodeData, label: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => {
                onDelete(node.id);
                onClose();
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EdgeModal = ({ edge, onClose, onUpdate, onDelete }: any) => {
  const [label, setLabel] = useState(edge.label);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(edge.id, label);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Editar Conexão</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Texto da Conexão</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => {
                onDelete(edge.id);
                onClose();
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Fluxograma() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [nodeName, setNodeName] = useState('');
  const [nodeType, setNodeType] = useState<'start' | 'process' | 'subprocess' | 'decision' | 'end' | 'intermediate' | 'gateway' | 'text' | 'database' | 'parallelogram' | 'cloud' | 'hexagon' | 'octagon' | 'star'>('process');
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        id: `e${params.source}-${params.target}`,
        label: 'Conexão',
        labelStyle: { fill: '#666', fontWeight: 500 },
        labelBgStyle: { fill: '#fff' },
        type: 'smoothstep',
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    []
  );

  const addNode = () => {
    if (!nodeName) return;

    const newNode: Node = {
      id: Date.now().toString(),
      type: nodeType,
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { label: nodeName },
      connectable: true,
    };

    setNodes((nds) => [...nds, newNode]);
    setNodeName('');
  };

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  };

  const onEdgeClick = (_: React.MouseEvent, edge: Edge) => {
    setSelectedEdge(edge);
  };

  const updateNode = (id: string, newData: NodeData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: newData } : node
      )
    );
  };

  const deleteNode = (id: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
  };

  const updateEdge = (id: string, label: string) => {
    setEdges((eds) =>
      eds.map((edge) =>
        edge.id === id
          ? {
              ...edge,
              label,
              labelStyle: { fill: '#666', fontWeight: 500 },
              labelBgStyle: { fill: '#fff' },
            }
          : edge
      )
    );
  };

  const deleteEdge = (id: string) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== id));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Fluxograma Detalhado</h2>
      
      <div className="flex space-x-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Nome do Elemento</label>
          <input
            type="text"
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Digite o nome do elemento"
          />
        </div>
        <div className="w-48">
          <label className="block text-sm font-medium text-gray-700">Tipo</label>
          <select
            value={nodeType}
            onChange={(e) => setNodeType(e.target.value as any)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="start">Início</option>
            <option value="process">Processo</option>
            <option value="subprocess">Subprocesso</option>
            <option value="decision">Decisão</option>
            <option value="gateway">Gateway</option>
            <option value="intermediate">Intermediário</option>
            <option value="database">Banco de Dados</option>
            <option value="parallelogram">Paralelogramo</option>
            <option value="cloud">Nuvem</option>
            <option value="hexagon">Hexágono</option>
            <option value="octagon">Octágono</option>
            <option value="star">Estrela</option>
            <option value="text">Texto</option>
            <option value="end">Fim</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={addNode}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar
          </button>
        </div>
      </div>

      <div className="h-[600px] border border-gray-200 rounded-lg">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeClick={onEdgeClick}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          fitView
          snapToGrid
          snapGrid={[15, 15]}
          connectionMode="loose"
        >
          <Background />
          <Controls />
          <Panel position="top-right" className="bg-white p-2 rounded shadow-lg">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Circle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Início</span>
              </div>
              <div className="flex items-center space-x-2">
                <Square className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Processo</span>
              </div>
              <div className="flex items-center space-x-2">
                <Square className="w-4 h-4 text-blue-500 border-2" />
                <span className="text-sm">Subprocesso</span>
              </div>
              <div className="flex items-center space-x-2">
                <Diamond className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">Decisão</span>
              </div>
              <div className="flex items-center space-x-2">
                <Hexagon className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">Gateway</span>
              </div>
              <div className="flex items-center space-x-2">
                <Circle className="w-4 h-4 text-purple-500 border-2" />
                <span className="text-sm">Intermediário</span>
              </div>
              <div className="flex items-center space-x-2">
                <Cylinder className="w-4 h-4 text-cyan-500" />
                <span className="text-sm">Banco de Dados</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-indigo-500 transform skew-x-12" />
                <span className="text-sm">Paralelogramo</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-pink-500 rounded-[8px]" />
                <span className="text-sm">Nuvem</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-orange-500 clip-path-hexagon" />
                <span className="text-sm">Hexágono</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-emerald-500 clip-path-octagon" />
                <span className="text-sm">Octágono</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-violet-500 clip-path-star" />
                <span className="text-sm">Estrela</span>
              </div>
              <div className="flex items-center space-x-2">
                <Type className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Texto</span>
              </div>
              <div className="flex items-center space-x-2">
                <Circle className="w-4 h-4 text-red-500" />
                <span className="text-sm">Fim</span>
              </div>
            </div>
          </Panel>
        </ReactFlow>
      </div>

      {selectedNode && (
        <EditModal
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
          onUpdate={updateNode}
          onDelete={deleteNode}
        />
      )}

      {selectedEdge && (
        <EdgeModal
          edge={selectedEdge}
          onClose={() => setSelectedEdge(null)}
          onUpdate={updateEdge}
          onDelete={deleteEdge}
        />
      )}
    </div>
  );
}