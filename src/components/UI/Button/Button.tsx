import { FC } from "react";
import "./Button.scss";

interface ButtonProps {
    children: string | number;
    onClick: () => void;
    full?: boolean;
    disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
    children,
    onClick,
    full = false,
    disabled = false,
}) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={full ? "button full" : "button"}
        >
            {children}
        </button>
    );
};

export default Button;
