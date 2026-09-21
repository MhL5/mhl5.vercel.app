import Spinner from "@/components/ui/spinner";
import dynamic from "next/dynamic";

/**
 * used for dynamically importing components and their source codes
 */
export const componentPaths = {
  DebouncedInput: "@/registry/new-york/DebouncedInput/example.tsx",
  DrawerDialog: "@/registry/new-york/DrawerDialog/example.tsx",
  ErrorBoundary: "@/registry/new-york/ErrorBoundary/example.tsx",
  Img: "@/registry/new-york/Img/example.tsx",
  useLocalStorage: "@/registry/hooks/useLocalStorage/example.tsx",
  useSessionStorage: "@/registry/hooks/useSessionStorage/example.tsx",
  useCopyToClipboard: "@/registry/hooks/useCopyToClipboard/example.tsx",
  useIsMounted: "@/registry/hooks/useIsMounted/example.tsx",
  useSearchParamShallow: "@/registry/hooks/useSearchParamShallow/example.tsx",
  AutoGrid: "@/registry/new-york/AutoGrid/example.tsx",

  FallbackPagesError:
    "@/registry/new-york/FallbackPages/examples/ErrorExample.tsx",
  FallbackPagesNotFound:
    "@/registry/new-york/FallbackPages/examples/NotFoundExample.tsx",
  FallbackPagesForbidden:
    "@/registry/new-york/FallbackPages/examples/ForbiddenExample.tsx",
  FallbackPagesUnauthorized:
    "@/registry/new-york/FallbackPages/examples/UnauthorizedExample.tsx",
  FallbackPagesLoading:
    "@/registry/new-york/FallbackPages/examples/LoadingExample.tsx",

  TagsInput: "@/registry/new-york/TagsInput/example.tsx",
  Form: "@/registry/new-york/form/examples/FullFormExample.tsx",
  FormInput: "@/registry/new-york/form/examples/InputExample.tsx",
  FormInputGroup: "@/registry/new-york/form/examples/InputGroupExample.tsx",
  FormInputNumber: "@/registry/new-york/form/examples/InputNumberExample.tsx",
  FormTextarea: "@/registry/new-york/form/examples/TextareaExample.tsx",
  FormSelect: "@/registry/new-york/form/examples/SelectExample.tsx",
  FormMultiSelect: "@/registry/new-york/form/examples/MultiSelectExample.tsx",
  FormRadioGroup: "@/registry/new-york/form/examples/RadioGroupExample.tsx",
  FormCheckbox: "@/registry/new-york/form/examples/CheckboxExample.tsx",
  FormDropzone: "@/registry/new-york/form/examples/DropzoneExample.tsx",
  FormActions: "@/registry/new-york/form/examples/FormActionsExample.tsx",
  FormFieldGroup: "@/registry/new-york/form/examples/FieldGroupExample.tsx",
  FormCustomControl:
    "@/registry/new-york/form/examples/CustomControlExample.tsx",

  useDebounce: "@/registry/hooks/useDebounce/example.tsx",
  useStepper: "@/registry/hooks/useStepper/example.tsx",
} as const;

const dynamicImportOptions = {
  ssr: false,
  loading: () => <Spinner className="size-8" />,
};

/**
 *
 * Notes:
 *  - dynamic option object must be literal, we cant pass `dynamicImportOptions` directly
 */
export const PreviewComponents = {
  DebouncedInput: dynamic(() => import(componentPaths.DebouncedInput), {
    ...dynamicImportOptions,
  }),
  DrawerDialog: dynamic(() => import(componentPaths.DrawerDialog), {
    ...dynamicImportOptions,
  }),
  ErrorBoundary: dynamic(() => import(componentPaths.ErrorBoundary), {
    ...dynamicImportOptions,
  }),
  Img: dynamic(() => import(componentPaths.Img), {
    ...dynamicImportOptions,
  }),
  useLocalStorage: dynamic(() => import(componentPaths.useLocalStorage), {
    ...dynamicImportOptions,
  }),
  useSessionStorage: dynamic(() => import(componentPaths.useSessionStorage), {
    ...dynamicImportOptions,
  }),
  useCopyToClipboard: dynamic(() => import(componentPaths.useCopyToClipboard), {
    ...dynamicImportOptions,
  }),
  useIsMounted: dynamic(() => import(componentPaths.useIsMounted), {
    ...dynamicImportOptions,
  }),
  useSearchParamShallow: dynamic(
    () => import(componentPaths.useSearchParamShallow),
    {
      ...dynamicImportOptions,
    },
  ),
  AutoGrid: dynamic(() => import(componentPaths.AutoGrid), {
    ...dynamicImportOptions,
  }),

  FallbackPagesError: dynamic(() => import(componentPaths.FallbackPagesError), {
    ...dynamicImportOptions,
  }),
  FallbackPagesNotFound: dynamic(
    () => import(componentPaths.FallbackPagesNotFound),
    {
      ...dynamicImportOptions,
    },
  ),
  FallbackPagesLoading: dynamic(
    () => import(componentPaths.FallbackPagesLoading),
    {
      ...dynamicImportOptions,
    },
  ),
  FallbackPagesForbidden: dynamic(
    () => import(componentPaths.FallbackPagesForbidden),
    {
      ...dynamicImportOptions,
    },
  ),
  FallbackPagesUnauthorized: dynamic(
    () => import(componentPaths.FallbackPagesUnauthorized),
    {
      ...dynamicImportOptions,
    },
  ),
  TagsInput: dynamic(() => import(componentPaths.TagsInput), {
    ...dynamicImportOptions,
  }),
  Form: dynamic(() => import(componentPaths.Form), {
    ...dynamicImportOptions,
  }),
  FormInput: dynamic(() => import(componentPaths.FormInput), {
    ...dynamicImportOptions,
  }),
  FormInputGroup: dynamic(() => import(componentPaths.FormInputGroup), {
    ...dynamicImportOptions,
  }),
  FormInputNumber: dynamic(() => import(componentPaths.FormInputNumber), {
    ...dynamicImportOptions,
  }),
  FormTextarea: dynamic(() => import(componentPaths.FormTextarea), {
    ...dynamicImportOptions,
  }),
  FormSelect: dynamic(() => import(componentPaths.FormSelect), {
    ...dynamicImportOptions,
  }),
  FormMultiSelect: dynamic(() => import(componentPaths.FormMultiSelect), {
    ...dynamicImportOptions,
  }),
  FormRadioGroup: dynamic(() => import(componentPaths.FormRadioGroup), {
    ...dynamicImportOptions,
  }),
  FormCheckbox: dynamic(() => import(componentPaths.FormCheckbox), {
    ...dynamicImportOptions,
  }),
  FormDropzone: dynamic(() => import(componentPaths.FormDropzone), {
    ...dynamicImportOptions,
  }),
  FormActions: dynamic(() => import(componentPaths.FormActions), {
    ...dynamicImportOptions,
  }),
  FormFieldGroup: dynamic(() => import(componentPaths.FormFieldGroup), {
    ...dynamicImportOptions,
  }),
  FormCustomControl: dynamic(() => import(componentPaths.FormCustomControl), {
    ...dynamicImportOptions,
  }),
  useDebounce: dynamic(() => import(componentPaths.useDebounce), {
    ...dynamicImportOptions,
  }),
  useStepper: dynamic(() => import(componentPaths.useStepper), {
    ...dynamicImportOptions,
  }),
};
