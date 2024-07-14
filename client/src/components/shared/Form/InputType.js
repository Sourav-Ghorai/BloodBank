import React from "react";

function InputType({ lableText, inputType, name, value, onChange }) {
  return (
    <div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          {lableText}
        </label>
        <input
          type={inputType}
          className="form-control"
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default InputType;
