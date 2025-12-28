/**
 * Focus on the first invalid input in the form.
 * @see https://tanstack.com/form/latest/docs/framework/react/guides/focus-management
 */
export function focusOnFirstInvalidInput() {
  const InvalidInput = document.querySelector(
    '[aria-invalid="true"]',
  ) as HTMLInputElement;

  InvalidInput?.focus();
}
