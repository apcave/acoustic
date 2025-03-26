import { PropsWithChildren, useState } from "react";

/*
    Component for inputting a floating point number, with any format that will be parsed.
    The onChange is triggered whenever the input is a valid number.
    If the input "value" is set using state, the this input will update if it changes.
    The css class "error" is added if the input is not a valid number.
    The min and max values are optional.
*/

interface InputFloatProps {
  id?: string;
  name?: string;
  value: number | undefined | null;
  disabled?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputFloat(props: PropsWithChildren<InputFloatProps>) {
  const {
    id,
    name,
    value,
    onChange,
    disabled,
    required,
    className,
    min,
    max,
    ...rest
  } = props;
  const modelValue = value || 0;
  const [floatStr, setFloatStr] = useState(modelValue.toString());
  const [error, setError] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFloatStr(e.target.value);
    setError(false);

    const newValue = parseFloat(e.target.value);

    if (!isNaN(newValue)) {
      if (min !== undefined && newValue < min) {
        setError(true);
        return;
      }
      if (max !== undefined && newValue > max) {
        setError(true);
        return;
      }
      onChange(e);
    } else {
      setError(true);
    }
  }

  return (
    <input
      id={id}
      name={name}
      disabled={disabled}
      required={required}
      {...rest}
      className={className + (error ? " error" : "")}
      onChange={handleChange}
      value={floatStr}
    />
  );
}
