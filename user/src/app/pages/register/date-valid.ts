import { FormControl,  Validators } from '@angular/forms';

export class AppCustomDirective extends Validators{

   static fromDateValidator(fdValue: FormControl) {
    const date = fdValue.value;
    if (date === null || date === '') { return { requiredFromDate: true }; }

  }

   static ToDateValidator(todValue: FormControl) {
    const date = todValue.value;
    if (date === null || date === '') { return { requiredToDate: true }; }

  }
}
