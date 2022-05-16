import { FC, FormEvent } from "react";
import ReactModal from "react-modal";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { settingsSlice } from "../../store/reducers/settingsSlice";
import { ShipType } from "../../utils/enums";
import { SettingsState } from "../../utils/interfaces";
import { setToLocalStorage } from "../../utils/settings";
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
  const { boardSize, delayTimeout, maxAttemptsToInit, shipsOnBoard } =
    useAppSelector((state) => state.settingsReducer);

  const dispatch = useAppDispatch();
  const { changeSettings } = settingsSlice.actions;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const settings: SettingsState = {
      boardSize: {
        rows: +event.currentTarget.board_size_rows.value,
        columns: +event.currentTarget.board_size_columns.value,
        cellSize: +event.currentTarget.board_cell_size.value,
      },
      shipsOnBoard: {
        [ShipType.LShaped]: {
          ...shipsOnBoard[ShipType.LShaped],
          amount: +event.currentTarget.amount_lshaped.value,
        },
        [ShipType.IShaped]: {
          ...shipsOnBoard[ShipType.IShaped],
          amount: +event.currentTarget.amount_ishaped.value,
        },
        [ShipType.DotShaped]: {
          ...shipsOnBoard[ShipType.DotShaped],
          amount: +event.currentTarget.amount_dotshaped.value,
        },
      },
      delayTimeout: +event.currentTarget.delay_timeout.value,
      maxAttemptsToInit: +event.currentTarget.max_attempts_to_init.value,
    };

    setToLocalStorage(settings);
    dispatch(changeSettings(settings));

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
          <div className={classes.popup__blocks}>
            <div className={classes.popup__block}>
              <h3 className={classes.popup__blockname}>Board size</h3>
              <div className={classes.popup__inputs}>
                <FormInput
                  label="Rows"
                  name="board_size_rows"
                  range={{ defaultValue: boardSize.rows, min: 1, max: 100 }}
                />
                <FormInput
                  label="Columns"
                  name="board_size_columns"
                  range={{ defaultValue: boardSize.columns, min: 1, max: 100 }}
                />
                <FormInput
                  label="Cell size"
                  name="board_cell_size"
                  range={{ defaultValue: boardSize.cellSize, min: 5, max: 100 }}
                />
              </div>
            </div>
            <div className={classes.popup__block}>
              <h3 className={classes.popup__blockname}>Amount of ships</h3>
              <div className={classes.popup__inputs}>
                <FormInput
                  label="L-Shaped"
                  name="amount_lshaped"
                  range={{
                    defaultValue: shipsOnBoard[ShipType.LShaped].amount,
                    min: 0,
                    max: 100,
                  }}
                />
                <FormInput
                  label="I-Shaped"
                  name="amount_ishaped"
                  range={{
                    defaultValue: shipsOnBoard[ShipType.IShaped].amount,
                    min: 0,
                    max: 100,
                  }}
                />
                <FormInput
                  label="Dot-Shaped"
                  name="amount_dotshaped"
                  range={{
                    defaultValue: shipsOnBoard[ShipType.DotShaped].amount,
                    min: 0,
                    max: 100,
                  }}
                />
              </div>
            </div>
            <div className={classes.popup__block}>
              <h3 className={classes.popup__blockname}>Other</h3>
              <div className={classes.popup__inputs}>
                <FormInput
                  label="Timeout between shots, ms"
                  name="delay_timeout"
                  range={{ defaultValue: delayTimeout, min: 50, max: 10000 }}
                />
                <FormInput
                  label="Max attempts to init"
                  name="max_attempts_to_init"
                  range={{
                    defaultValue: maxAttemptsToInit,
                    min: 100,
                    max: 100000,
                  }}
                />
              </div>
            </div>
          </div>
          <div className={classes.popup__button}>
            <input
              className={classes.popup__submit}
              type="submit"
              value="Save"
            />
          </div>
        </form>
      </div>
    </ReactModal>
  );
};

export default Settings;
