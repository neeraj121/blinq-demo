import React, { useEffect, useMemo, useState } from "react";
import styles from "../styles/IntegrationForm.module.css";
import { IntegrationData } from "../pages/api/integrations/[id]";
import { generateValidationSchema } from "../utils/generateValidationSchema";
import { useYupValidationResolver } from "../utils/yupValidationResolver";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import InputField from "./input-field";
import { CONTACT_MAPPING_FIELDS } from "../utils/constants";

interface IntegrationFormProps {
    integration: IntegrationData;
}

const IntegrationForm: React.FC<IntegrationFormProps> = ({ integration }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const validationSchema = useMemo(
        () => generateValidationSchema(integration.fields),
        [integration.fields]
    );
    const resolver = useYupValidationResolver(validationSchema);
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ resolver });

    useEffect(() => {
        // Fetch the user's current connection settings here.
    }, [integration]);

    const disconnectHandler: React.MouseEventHandler<HTMLButtonElement> = (
        event
    ) => {
        event.preventDefault();
        setSuccess(null);
        setError(null);
        setIsConnected(false);
    };

    const onSubmit: SubmitHandler<any> = async (data) => {
        try {
            setIsLoading(true);
            setSuccess(null);
            setError(null);
            setIsConnected(true);
            setSuccess("Successfully connected!");
            console.log(data);
        } catch (error: any) {
            setError(error.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                {integration.fields.map((field) => {
                    if (field.type !== "fieldMapping") {
                        return (
                            <div
                                key={field.id}
                                className="col-12 col-md-6 mb-3"
                            >
                                <InputField
                                    name={field.name}
                                    description={field.description}
                                    label={field.label}
                                    type={field.type}
                                    error={
                                        errors[field.name]?.message as
                                            | string
                                            | undefined
                                    }
                                    register={register}
                                />
                            </div>
                        );
                    } else {
                        return (
                            <div key={field.id} className="col-12 mb-3">
                                <div className={styles.fieldMapping}>
                                    <label className={styles.fieldMappingLabel}>
                                        {field.label}
                                    </label>
                                    {CONTACT_MAPPING_FIELDS.map((mapping) => {
                                        const contrustedName = `${field.name}.${mapping.name}`;
                                        return (
                                            <div
                                                key={`${field.id}-${mapping.name}`}
                                                className="row"
                                            >
                                                <div className="col-12 col-md-4 py-md-2">
                                                    <label
                                                        htmlFor={contrustedName}
                                                    >
                                                        {mapping.label}
                                                    </label>
                                                </div>
                                                <div className="col-12 col-md-8 mb-3">
                                                    <InputField
                                                        name={contrustedName}
                                                        type={field.type}
                                                        error={
                                                            errors[
                                                                contrustedName
                                                            ]?.message as
                                                                | string
                                                                | undefined
                                                        }
                                                        register={register}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
            {error && (
                <p className="error-message text-center" role="alert">
                    {error}
                </p>
            )}
            {success && (
                <p className="success-message text-center">{success}</p>
            )}
            <div
                className={`row flex-wrap ${
                    isConnected
                        ? "justify-content-between"
                        : "justify-content-end"
                } `}
            >
                {isConnected && (
                    <div className="col-auto">
                        <button
                            className="btn btn--secondary"
                            type="button"
                            disabled={isLoading ? true : false}
                            onClick={disconnectHandler}
                        >
                            Disconnect
                        </button>
                    </div>
                )}
                <div className="col-auto">
                    <button
                        className="btn"
                        type="submit"
                        disabled={isLoading ? true : false}
                    >
                        {isConnected
                            ? isLoading
                                ? "Updating..."
                                : "Update"
                            : isLoading
                            ? "Connecting..."
                            : "Connect"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default IntegrationForm;
