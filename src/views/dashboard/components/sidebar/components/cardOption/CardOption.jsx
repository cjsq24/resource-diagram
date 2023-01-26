import React from "react";
import Pen from "../../../../../../assets/pen.png";

export const objectColor = {
  page: "red",
  element: "blue",
  "element-item": "green",
};

const CardOption = ({ option, onOpenModal, onDragStart }) => {
  const { id, title, subTitle, type } = option;
  return (
    <article
      key={id}
      className="card-container"
      style={{ border: `1px solid ${objectColor[type] ?? "black"}` }}
      onDragStart={(event) =>
        onDragStart(
          event,
          `${!type ? "input" : "default"}|${id}|${title}|${type}`
        )
      }
      draggable
    >
      <header className="card-header">
        <span style={{ color: `${objectColor[type] ?? "black"}` }}>
          {title}
        </span>
        <button onClick={() => onOpenModal(option)}>
          <img src={Pen} style={{ width: 20, height: 20 }} />
        </button>
      </header>
      <main className="card-content">
        <span>{subTitle}</span>
      </main>
    </article>
  );
};

export default CardOption;
