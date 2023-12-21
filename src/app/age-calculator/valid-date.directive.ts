import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

export const validDateValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const day = control.get('day')?.value;
  const month = control.get('month')?.value;
  const year = control.get('year')?.value;

  if (!day || !month || !year) {
    return null;
  }

  const isValidDate = moment(`${year}/${month}/${day}`, 'Y/M/D').isValid();

  return !isValidDate ? { invalidDate: true } : null;
};
