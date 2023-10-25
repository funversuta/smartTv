import config from "../../store";
import { FC, useEffect, useRef } from "react";
import Button from "../UI/Button/Button";
import "./Numbers.scss";
import { observer } from "mobx-react-lite";

interface KeyProps {
  content: number | string;
  wide?: boolean;
}

const Key: FC<KeyProps> = observer(({ content, wide }) => {
  const doc = useRef<Document>(document);

  doc.current.onkeydown = (e) => {
    if (config.isShowContent) {
      if (/^\d+$/.test(e.key)) {
        // Ввод цифр
        config.addDigit(Number(e.key));
      } else if (e.key === "Backspace") {
        // Стирание цифр
        config.deleteDigit();
      } else if (e.key.slice(0, 5) === "Arrow") {
        // Перемещение по "клавиатуре", config.currentFocusedKey - индекс текущей выбранной клавиши
        switch (
          e.key.slice(5) // Логика перемещения по клавишам "клавиатуры"
        ) {
          case "Left":
            if (config.currentFocusedKey === null) {
              config.setCurrentFocusedKey(2);
            } else if (config.currentFocusedKey > 0) {
              config.setCurrentFocusedKey(config.currentFocusedKey - 1);
            }
            break;
          case "Up":
            if (config.currentFocusedKey === null) {
              config.setCurrentFocusedKey(10);
            } else if (
              config.currentFocusedKey === 9 ||
              config.currentFocusedKey === 10
            ) {
              config.setCurrentFocusedKey(config.currentFocusedKey - 2);
            } else if (config.currentFocusedKey > 2) {
              config.setCurrentFocusedKey(config.currentFocusedKey - 3);
            }
            break;
          case "Right":
            if (config.currentFocusedKey === null) {
              config.setCurrentFocusedKey(0);
            } else if (config.currentFocusedKey < 10) {
              config.setCurrentFocusedKey(config.currentFocusedKey + 1);
            }
            break;
          case "Down":
            if (config.currentFocusedKey === null) {
              config.setCurrentFocusedKey(0);
            } else if (config.currentFocusedKey < 7) {
              config.setCurrentFocusedKey(config.currentFocusedKey + 3);
            } else if (
              config.currentFocusedKey === 8 ||
              config.currentFocusedKey === 7
            ) {
              config.setCurrentFocusedKey(config.currentFocusedKey + 2);
            }
            break;
        }
      }
    }
  };

  const clickHandler = (val: number | string): void => {
    if (typeof val === "string") {
      config.deleteDigit();
    } else {
      config.addDigit(Number(content));
    }
  };

  return (
    <div className={wide ? "key wide-key" : "key"}>
      <Button full={true} onClick={() => clickHandler(content)}>
        {content}
      </Button>{" "}
    </div>
  );
});

const Numbers: FC = observer(() => {
  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, "стереть", 0];
  const keyboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (config.currentFocusedKey != null) {
      keyboardRef.current?.children[config.currentFocusedKey]
        .querySelector("button")
        ?.focus();
    }
  }, []);

  return (
    <div ref={keyboardRef} className="keyboard">
      {keys.map((elem, ind) => {
        return (
          <Key
            content={elem}
            key={ind}
            wide={typeof elem === "string" ? true : false}
          />
        );
      })}
    </div>
  );
});

export default Numbers;
