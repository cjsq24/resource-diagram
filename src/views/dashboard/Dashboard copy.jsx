import { useCallback, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { dataPanel } from "../../utils";

const initialNodes = dataPanel.map(({ id, title }, idx) => {
  return {
    id,
    position: { x: 0, y: idx * 50 },
    data: { label: title },
  };
});

/* const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "Initial" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
  { id: "3", position: { x: 0, y: 200 }, data: { label: "3" } },
]; */

const initialEdges = [{ id: "e1-2", source: "2", target: "3" }];

export default function Dashboard() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setTimeout(() => {
      const lastNode = {
        id: "testing",
        data: { label: "Testing" },
        position: { x: 0, y: nodes.slice(-1)[0].position.y * nodes.length - 1 },
      };
      setNodes((prev) => [...prev, lastNode]);
    }, 2000);
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ background: "lightgray", width: 1200, height: 800 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
