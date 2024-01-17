import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function domainOrIPValidator(): ValidatorFn {
  const domainRe = new RegExp(
    '^(?!.* .*)(?:[a-z0-9][a-z0-9-]{0,61}[a-z0-9].)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$'
  );

  const ipRe = new RegExp(
    '^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
  );

  return (control: AbstractControl): ValidationErrors | null => {
    const valid = domainRe.test(control.value) || ipRe.test(control.value);
    return valid ? null : { domainName: { value: control.value } };
  };
}
