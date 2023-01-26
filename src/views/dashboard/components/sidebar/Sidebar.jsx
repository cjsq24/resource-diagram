import React from "react";
import Add from "../../../../assets/add.png";
import CardOption from "./components/cardOption";

const Sidebar = ({ options, onOpenModal }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="aside-container">
      <div className="description">
        You can drag these nodes to the panel on the right.
      </div>
      <button className="button-add" onClick={() => onOpenModal()}>
        <img src={Add} style={{ width: 20, height: 20 }} />
        Add new
      </button>
      {options.map((option, idx) => (
        <CardOption
          key={idx}
          option={option}
          onOpenModal={onOpenModal}
          onDragStart={onDragStart}
        />
      ))}
    </aside>
  );
};

export default Sidebar;
