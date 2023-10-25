import React, { FC, useState } from "react";
import "./SidePanel.scss";
import InputMask from "react-input-mask";

import { observer } from "mobx-react-lite";
import config from "../../store";
import Numbers from "../Numbers/Numbers";
import Checkbox from "../UI/Checkbox/Checkbox";
import Button from "../UI/Button/Button";

interface SidePanelProps {
  show: boolean;
}

const SidePanel: FC<SidePanelProps> = observer(({ show }) => {
  const [checkboxValue, setCheckboxValue] = useState<boolean>(false);
  const [agreed, setAgreed] = useState<boolean>(false);

  const panelOver = () => {
    config.hideContent();
    config.play();
    config.deleteDigits();
  };

  const finishingFuction = () => {
    setAgreed(true);
    setTimeout(() => {
      setAgreed(false);
      panelOver();
    }, 10000);
  };

  return (
    <>
      <div
        className={config.isShowContent ? "side-panel" : "side-panel hidden"}
      >
        {!agreed ? (
          <>
            <h3>
              Введите ваш номер
              <br />
              мобильного телефона
            </h3>
            <InputMask
              className="input"
              alwaysShowMask
              value={config.inputValue}
              mask={"+7-999-999-99-99"}
            ></InputMask>
            <p>и с Вами свяжется наш менеждер для дальнейшей консультации</p>
            <Numbers />
            <Checkbox
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCheckboxValue(e.target.checked);
              }}
            >
              Согласие на обработку персональных данных
            </Checkbox>
            <div className="confirm-container">
              <Button
                full
                disabled={!checkboxValue || config.inputValue.length !== 10}
                onClick={() => finishingFuction()}
              >
                Подтвердить номер
              </Button>
            </div>
          </>
        ) : (
          <>
            <h3>
              ЗАЯВКА
              <br />
              ПРИНЯТА
            </h3>
            <div className="confirm-container-2">
              Держите телефон под рукой. <br />
              Скоро с Вами свяжется наш менеджер.
            </div>
          </>
        )}
      </div>
      <div
        className={config.isShowContent ? "closer" : "closer hidden"}
        onClick={() => {
          panelOver();
        }}
      >
        <div className="cross"></div>
      </div>
    </>
  );
});

export default SidePanel;
