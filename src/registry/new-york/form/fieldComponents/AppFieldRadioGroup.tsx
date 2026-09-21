import {
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useStore } from "@tanstack/react-form-nextjs";
import type { ComponentProps } from "react";
import { type ReactNode, createContext, use } from "react";

import { useFieldContext, useFormContext } from "../appForm";
import { useGenerateFieldProps } from "../hooks/useGenerateFieldProps";

type AppFieldRadioGroupItemContextValue = {
  itemProps: ReturnType<typeof useGenerateFieldProps>;
  radioItemValue: ComponentProps<typeof RadioGroupItem>["value"];
};

const AppFieldRadioGroupItemContext =
  createContext<AppFieldRadioGroupItemContextValue | null>(null);

type AppFieldRadioGroupItemProviderProps = {
  children: ReactNode;
  radioItemValue: AppFieldRadioGroupItemContextValue["radioItemValue"];
};

function AppFieldRadioGroupItemProvider({
  children,
  radioItemValue,
}: AppFieldRadioGroupItemProviderProps) {
  const itemProps = useGenerateFieldProps({
    fieldItemIdSuffix: radioItemValue,
  });

  return (
    <AppFieldRadioGroupItemContext value={{ itemProps, radioItemValue }}>
      {children}
    </AppFieldRadioGroupItemContext>
  );
}

function useAppFieldRadioGroupItemContext() {
  const context = use(AppFieldRadioGroupItemContext);
  if (!context)
    throw new Error(
      "AppFieldRadioGroupItemContext was called outside of its provider!",
    );
  return context;
}

type AppFieldRadioGroupProps = ComponentProps<typeof RadioGroup>;

function AppFieldRadioGroup(props: AppFieldRadioGroupProps) {
  const field = useFieldContext<string>();

  return (
    <RadioGroup
      name={field.name}
      value={field.state.value}
      onValueChange={field.handleChange}
      {...props}
    />
  );
}

type AppFieldRadioGroupItemProps = Omit<
  ComponentProps<typeof RadioGroupItem>,
  "value"
>;

function AppFieldRadioGroupItem({
  disabled,
  ...props
}: AppFieldRadioGroupItemProps) {
  const {
    itemProps: { fieldControllerProps },
    radioItemValue,
  } = useAppFieldRadioGroupItemContext();
  const form = useFormContext();
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);

  return (
    <RadioGroupItem
      disabled={disabled || isSubmitting}
      value={radioItemValue}
      {...fieldControllerProps}
      {...props}
    />
  );
}

type AppFieldRadioGroupItemLabelProps = ComponentProps<typeof FieldLabel>;

function AppFieldRadioGroupItemLabel({
  ...props
}: AppFieldRadioGroupItemLabelProps) {
  const {
    itemProps: { fieldControllerProps, isInvalid },
  } = useAppFieldRadioGroupItemContext();

  return (
    <FieldLabel
      aria-invalid={isInvalid}
      htmlFor={fieldControllerProps.id}
      {...props}
    />
  );
}

type AppFieldRadioGroupItemDescriptionProps = ComponentProps<
  typeof FieldDescription
>;

function AppFieldRadioGroupItemDescription(
  props: AppFieldRadioGroupItemDescriptionProps,
) {
  const {
    itemProps: { fieldItemDescriptionId },
  } = useAppFieldRadioGroupItemContext();

  return <FieldDescription id={fieldItemDescriptionId} {...props} />;
}

type AppFieldRadioGroupItemErrorProps = ComponentProps<typeof FieldError>;

function AppFieldRadioGroupItemError(props: AppFieldRadioGroupItemErrorProps) {
  const {
    itemProps: { fieldItemErrorId },
  } = useAppFieldRadioGroupItemContext();
  const field = useFieldContext();

  return (
    <FieldError
      id={fieldItemErrorId}
      errors={field.state.meta.errors}
      {...props}
    />
  );
}

export {
  AppFieldRadioGroupItemProvider,
  type AppFieldRadioGroupItemContextValue,
  useAppFieldRadioGroupItemContext,
  AppFieldRadioGroup,
  AppFieldRadioGroupItem,
  AppFieldRadioGroupItemLabel,
  AppFieldRadioGroupItemError,
  AppFieldRadioGroupItemDescription,
};
