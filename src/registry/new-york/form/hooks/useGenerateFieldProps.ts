import { useFieldContext } from "../appForm";
import {
  type GenerateFieldPropsOptions,
  generateFieldProps,
} from "../utils/generateFieldProps";

/**
 * Hook for managing form field accessibility and validation state.
 *
 * Provides ARIA attributes and IDs for connecting form controls with their descriptions and error messages.
 * Automatically tracks field validation state and touched status.
 *
 * - **fieldControllerProps:** Props to spread on the form control element (id, aria-describedby, aria-invalid)
 * - **fieldDescriptionId:**   ID for the field description element
 * - **fieldErrorId:**         ID for the field error message element
 * - **isInvalid:**            Whether the field has been touched and contains validation errors
 */
function useGenerateFieldProps(
  getFieldPropsOptions: GenerateFieldPropsOptions = {},
) {
  "use no memo";
  // why "use no memo"? tanstack form returns stable references and with react compiler it can break the updates

  const field = useFieldContext();

  return generateFieldProps(field, getFieldPropsOptions);
}

export { useGenerateFieldProps };
