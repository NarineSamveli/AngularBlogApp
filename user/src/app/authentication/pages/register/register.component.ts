import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PasswordValidation } from '../../../core/validators/password-regis';
import { AppCustomDirective } from '../../../core/validators/date-valid';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthorizationService } from '../../services/authentication.service';

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
  maxToDate = new Date();
  hide = true;
  hide2 = true;
  user;
  base64File: string = null;
  filename: string = null;

  constructor( private formBuilder: FormBuilder, private authorizationService: AuthorizationService ) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
        login: new FormControl('', [Validators.required, forbiddenNameValidator(/admin/i)]),
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }, {
        validator: PasswordValidation.MatchPassword
    });
    this.secondFormGroup = this.formBuilder.group({
        fullName: ['', Validators.required],
        dateOfBirth: ['', [ AppCustomDirective.fromDateValidator]],
        aboutYou: ['', Validators.required],
        filename: ['', Validators.required]
    });
  }

  confirmYes() {
    this.user = {...this.firstFormGroup.value, ...this.secondFormGroup.value};
    this.authorizationService.saveUser(this.user);
  }



  onFileSelect(e: any): void {
    try {
      const file = e.target.files[0];
      const fReader = new FileReader();
      fReader.readAsDataURL(file);
      // tslint:disable-next-line: no-shadowed-variable
      fReader.onloadend = (e: any) => {
        this.filename = file.name;
        this.base64File = e.target.result;
        this.secondFormGroup.value.filename = this.base64File;
      };
    } catch (error) {
      this.filename = null;
      this.base64File = null;
      console.log('no file was selected...');
    }
  }

  public resolved(captchaResponse: string) {
    // console.log(`Resolved captcha with response: ${captchaResponse}`);
    document.getElementById('accepted').removeAttribute('disabled');
  }
}


