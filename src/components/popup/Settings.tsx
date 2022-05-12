import { FC } from "react";
import ReactModal from "react-modal";
import FormInput from "./FormInput";
import classes from "./Settings.module.css";

interface SettingsProps {
  modalOpened: boolean;
  handleModalOpenedChange: (modalOpened: boolean) => void;
}

const Settings: FC<SettingsProps> = ({
  modalOpened,
  handleModalOpenedChange,
}) => {
  const onSubmit = () => {
    console.log("fff");
    handleModalOpenedChange(false);
  };

  return (
    <ReactModal
      isOpen={modalOpened}
      onRequestClose={() => handleModalOpenedChange(false)}
      className={classes.popup}
      overlayClassName={classes.popup__overlay}
    >
      <h2 className={classes.popup__title}>Change settings</h2>
      <div className={classes.popup__body}>
        <form onSubmit={onSubmit}>
          <div className={classes.popup__block}>
            <h3 className={classes.popup__blockname}>Board size</h3>
            <div className={classes.popup__inputs}>
              <FormInput label="Rows" name="board_size_rows" />
              <FormInput label="Columns" name="board_size_columns" />
              <FormInput label="Cell size" name="board_cell_size" />
            </div>
          </div>
          <div className={classes.popup__button}>
            <input className={classes.popup__submit} type="submit" />
          </div>
        </form>
      </div>
    </ReactModal>
  );
};

export default Settings;
