import React, { useMemo, useState } from "react";
import { UseFormRegister } from "react-hook-form/dist/types";
import styles from "../styles/InputField.module.css";

interface InputFieldProps {
    name: string;
    register?: UseFormRegister<any>;
    label?: string;
    description?: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
    error?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    name,
    label,
    description,
    value,
    type,
    error,
    register,
    ...otherProps
}) => {
    const [inFocus, setInFocus] = useState(
        !value || value?.trim() === "" ? false : true
    );
    const inputType = useMemo(() => {
        return type || "text";
    }, [type]);

    const onFocusHandler = () => {
        setInFocus(true);
    };

    const onBlurHandler: React.FocusEventHandler<HTMLInputElement> = (
        event
    ) => {
        if (event.target.value === "") {
            setInFocus(false);
        }
    };

    return (
        <div className={styles.group}>
            {label && (
                <label
                    className={`${styles.label} ${
                        inFocus && label ? styles.inFocusLabel : ""
                    }`}
                    htmlFor={name}
                >
                    {label}
                </label>
            )}
            <input
                className={styles.input}
                id={name}
                type={inputType}
                {...otherProps}
                aria-invalid={error ? "true" : "false"}
                onFocus={onFocusHandler}
                {...(register
                    ? {
                          ...register(name, {
                              value: value,
                              onBlur: onBlurHandler,
                          }),
                      }
                    : {
                          name: name,
                          value: value,
                          onChange: otherProps.onChange,
                          onBlur: onBlurHandler,
                      })}
            />
            {error ? (
                <p className={styles.fielderror} role="alert">
                    {error}
                </p>
            ) : null}
            {description && <p className={styles.fieldinfo}>🛈 {description}</p>}
        </div>
    );
};

export default InputField;
