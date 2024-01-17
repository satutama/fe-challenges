import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function domainOrIPValidator(): ValidatorFn {
  const domainRe = new RegExp(/^[a-z0-9A-Z\-]+\.[a-z]{2,6}$/);

  const ipRe = new RegExp(
    '^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$'
  );

  return (control: AbstractControl): ValidationErrors | null => {
    const valid = domainRe.exec(control.value) || ipRe.exec(control.value);

    return valid ? null : { domainName: { value: control.value } };
  };
}
