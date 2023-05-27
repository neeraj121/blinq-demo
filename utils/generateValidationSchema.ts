import { FieldValidationsTypes, IntegrationField } from "../database";
import * as yup from "yup";
import { CONTACT_MAPPING_FIELDS } from "./constants";

export const validationErrorMessages = {
    required: "This field is required",
    email: "Invalid email address",
    patternMatch: "Invalid format entered",
};

const fieldMappingValidationObject = CONTACT_MAPPING_FIELDS.reduce(
    (acc, field) => {
        const { name, required } = field;
        let validation = yup
            .string()
            .matches(
                /^[a-zA-Z0-9_-]{5,30}$/g,
                validationErrorMessages.patternMatch
            );
        if (required) {
            validation = validation.required(validationErrorMessages.required);
        }

        return { ...acc, [name]: validation };
    },
    {}
);

export const generateValidationSchema = (fields: IntegrationField[]) => {
    const validationObject = fields.reduce((acc, field) => {
        const { name, type, required } = field;

        if (type === "fieldMapping") {
            let validation = yup.object(fieldMappingValidationObject);
            return { ...acc, [name]: validation };
        } else {
            let validation = yup.string();

            switch (field.validations) {
                case FieldValidationsTypes.CLIENT_ID:
                    validation = validation.matches(
                        /^[a-zA-Z0-9_-]{5,18}$/g,
                        validationErrorMessages.patternMatch
                    );
                case FieldValidationsTypes.CLIENT_SECRET:
                    validation = validation.matches(
                        /^[a-zA-Z0-9_-]{5,18}$/g,
                        validationErrorMessages.patternMatch
                    );
                default:
                    validation = validation.matches(
                        /^[a-zA-Z0-9_-]{5,30}$/g,
                        validationErrorMessages.patternMatch
                    );
            }

            if (required) {
                validation = validation.required(
                    validationErrorMessages.required
                );
            }

            return { ...acc, [name]: validation };
        }
    }, {});

    const validationSchema = yup.object(validationObject);
    return validationSchema;
};
