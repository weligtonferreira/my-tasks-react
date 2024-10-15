import { FieldErrors } from 'react-hook-form';
import { notifyErrorPopUp } from './notify-popups';

export function handleNotifyValidationErrors(
  formErrors: FieldErrors,
  theme: string
) {
  if (Object.keys(formErrors).length > 0) {
    Object.values(formErrors).forEach((value) =>
      notifyErrorPopUp(value?.message as string, theme)
    );
  }
}
