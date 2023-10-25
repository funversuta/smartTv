import { v4 as uuidv4 } from "uuid";
import React, { FC, ReactComponentElement } from "react";
import "./Checkbox.scss";

interface CheckboxProps {
    children: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: FC<CheckboxProps> = ({ children, onChange }) => {
    const randomId = uuidv4();

    return (
        <div className='checkbox-container'>
            <input
                onChange={onChange}
                className='checkbox'
                type='checkbox'
                id={randomId}
            />
            <label htmlFor={randomId}>{children}</label>
        </div>
    );
};

export default Checkbox;
