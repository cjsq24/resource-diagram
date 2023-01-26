import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "./components/sidebar";
import { dataPanel, customStyles } from "../../utils";
import Modal from "react-modal";
import Form from "./components/form";
import { objectColor } from "./components/sidebar/components/cardOption/CardOption";

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [options, setOptions] = useState(dataPanel);
  const [showModal, setShowModal] = useState(false);
  const [menuSelected, setMenuSelected] = useState();

  const onOpenModal = (selected) => {
    setMenuSelected(selected);
    setShowModal(true);
  };

  const onSave = (menu) => {
    if (menuSelected) {
      setOptions((options) =>
        options.map((option) => {
          return option.id === menu.id ? { ...option, ...menu } : option;
        })
      );
    } else {
      menu.id = `${menu.title}-${options.length}`;
      setOptions((options) => [menu, ...options]);
    }
    setShowModal(false);
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const params = event.dataTransfer.getData("application/reactflow");

      const [type, id, title, typeInput] = params.split("|");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const setColor = `${objectColor[typeInput] || "black"}`;

      const newNode = {
        id,
        type,
        position,
        data: { label: title },
        style: {
          border: `1px solid ${setColor}`,
          color: setColor,
        },
      };

      setNodes((nds) => nds.concat(newNode));
      setOptions((prev) => prev.filter((option) => option.id !== id));
    },
    [reactFlowInstance]
  );

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <Sidebar options={options} onOpenModal={onOpenModal} />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <Controls />
            <MiniMap />
            <Background />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <Form
          menuData={menuSelected}
          onSave={onSave}
          onCancel={() => setShowModal(false)}
          options={options}
        />
      </Modal>
    </div>
  );
};

export default DnDFlow;
