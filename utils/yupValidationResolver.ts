import { useCallback } from "react";
import * as yup from "yup";

export const useYupValidationResolver = (
    validationSchema: yup.ObjectSchema<any, any, any, any>
) =>
    useCallback(
        async (data: any) => {
            try {
                const values = await validationSchema.validate(data, {
                    abortEarly: false,
                });

                return {
                    values,
                    errors: {},
                };
            } catch (errors: any) {
                return {
                    values: {},
                    errors: errors.inner.reduce(
                        (allErrors: any, currentError: yup.ValidationError) => {
                            return currentError.path
                                ? {
                                      ...allErrors,
                                      [currentError.path]: {
                                          type:
                                              currentError.type ?? "validation",
                                          message: currentError.message,
                                      },
                                  }
                                : allErrors;
                        },
                        {}
                    ),
                };
            }
        },
        [validationSchema]
    );
