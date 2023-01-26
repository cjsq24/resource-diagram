import React, { useState } from "react";

const Form = ({ menuData, onSave, onCancel, options }) => {
  const [form, setForm] = useState({
    id: menuData?.id,
    title: menuData?.title || "",
    subTitle: menuData?.subTitle || "",
    type: menuData?.type || "",
  });

  const save = () => {
    if (form.title === "" || form.subTitle === "") {
      alert("Complete the inputs");
    } else {
      onSave(form);
    }
  };

  return (
    <div className="form-container">
      <header className="form-header">
        <span>{`${!menuData ? "Add" : "Edit"} Card`}</span>
      </header>
      <main className="form-content">
        <div className="form-group">
          <label>
            Title <span className="required">(*)</span>
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div className="form-group">
          <label>
            Subtitle <span className="required">(*)</span>
          </label>
          <input
            type="text"
            value={form.subTitle}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, subTitle: e.target.value }))
            }
          />
        </div>
        <div className="form-group">
          <label>Type</label>
          <select
            value={form.type}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, type: e.target.value }))
            }
          >
            <option value="">None</option>
            <option value="page">Page</option>
            <option value="element">Element</option>
            <option value="element-item">Element Item</option>
          </select>
        </div>
      </main>
      <footer className="form-footer">
        <button onClick={onCancel}>Cancel</button>
        <button className="button-save" onClick={save}>
          {menuData ? "Edit" : "Save"}
        </button>
      </footer>
    </div>
  );
};

export default Form;
