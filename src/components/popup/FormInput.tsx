import { FC } from "react";
import classes from "./Settings.module.css";

interface Range {
  defaultValue: number;
  min: number;
  max: number;
}

interface FormInputProps {
  label: string;
  name: string;
  range: Range;
}

const FormInput: FC<FormInputProps> = ({ label, name, range }) => {
  return (
    <label className={classes.popup__input}>
      {label}
      <input
        className={classes.popup__text}
        type="number"
        min={range.min}
        max={range.max}
        name={name}
        defaultValue={range.defaultValue}
        required
      />
    </label>
  );
};

export default FormInput;
