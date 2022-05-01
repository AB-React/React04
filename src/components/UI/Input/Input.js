import React from "react";
import style from "./Input.module.sass";

const Input = React.forwardRef((props, ref) => {
  const inputRef = React.useRef();

  const gainFocus = () => {
    inputRef.current.focus();
  };

  React.useImperativeHandle(ref, () => {
    return {
      focus: gainFocus,
    };
  });

  return (
    <div className={`${style.control} ${props.isValid ? "" : style.invalid}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
