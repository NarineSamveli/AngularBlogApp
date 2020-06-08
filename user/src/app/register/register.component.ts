import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidation } from './password-regis';
import { AppCustomDirective } from './date-valid';
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const name = control.value;
    const no = nameRe.test(name);
    return no ? {forbiddenName: {name}} : null;
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    minFromDate = new Date();
    maxToDate = new Date().setDate(2);

  constructor( private formBuilder: FormBuilder, private router: Router ) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
        login: new FormControl('', [Validators.required, forbiddenNameValidator(/admin/i)]),
        password: ['', Validators.required],
        Email: ['', Validators.compose([Validators.required, Validators.email])],
        confirmPassword: ['', Validators.required]
      }, {
        validator: PasswordValidation.MatchPassword
    });
    this.secondFormGroup = this.formBuilder.group({
        secondCtrl: ['', Validators.required],
        FromDate: ['', [ AppCustomDirective.fromDateValidator]],
    });
  }


  confirmYes() {
    this.router.navigate(['/home']);
  }

}


