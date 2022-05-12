import { FC } from "react";
import classes from "./Settings.module.css";

interface FormInputProps {
  label: string;
  name: string;
}

const FormInput: FC<FormInputProps> = ({ label, name }) => {
  return (
    <label className={classes.popup__input}>
      {label}
      <input
        className={classes.popup__text}
        type="text"
        pattern="[0-9]*"
        name={name}
        required
      />
    </label>
  );
};

export default FormInput;
