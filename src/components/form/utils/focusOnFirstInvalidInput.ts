/**
 * Focus on the first invalid input in the form.
 * @see https://tanstack.com/form/latest/docs/framework/react/guides/focus-management
 */
export function focusOnFirstInvalidInput() {
  const InvalidInput = document.querySelector<HTMLInputElement>(
    '[aria-invalid="true"]',
  );
  InvalidInput?.focus();
}
