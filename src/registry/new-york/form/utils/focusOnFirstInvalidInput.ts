/**
 * Focus on the first invalid control in the form.
 *
 * - deferred to the next task because `onSubmitInvalid` fires before React
 *   commits `aria-invalid="true"` to the DOM
 * - limited to focusable controls, since labels also carry `aria-invalid` for
 *   styling and would win the query
 *
 * @see https://tanstack.com/form/latest/docs/framework/react/guides/focus-management
 */
function focusOnFirstInvalidInput() {
  setTimeout(() => {
    const invalidControl = document.querySelector<HTMLElement>(
      ':is(input, textarea, select, button, [tabindex])[aria-invalid="true"]',
    );
    invalidControl?.focus();
  }, 0);
}

export { focusOnFirstInvalidInput };
