import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.scss']
})
export class PersonalPageComponent implements OnInit {
  public user: User;
  hide = true;
  personalFormGroup: FormGroup;
  base64File: string = null;
  filename: string = null;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router){
    this.user = new User();
    if (!localStorage.getItem('loggedInUser')){
        this.router.navigate(['/']);
    }
    if (localStorage.getItem('loggedInUser') !== 'admin') {
      this.userService.getUser(localStorage.getItem('loggedInID')).subscribe((user: User) => {
        this.user = user;
      });
    }
  }

  ngOnInit(): void {
    // console.log(localStorage.getItem('loggedInID'))
    // this.userService.getUser(localStorage.getItem('loggedInID')).subscribe((user: User) => {
    //   this.user = user;
    // });
    this.personalFormGroup = this.formBuilder.group({
      exampleInputName: ['', Validators.required],
      exampleInputPassword: ['', Validators.required],
      exampledateOfBirth: ['', Validators.required],
      exampleInputaboutYou: ['', Validators.required]
    });
  }

  cancelAll() {
    this.router.navigate(['/home']);
  }

  updateUser() {
    if (this.personalFormGroup.get('exampleInputName').touched === true) {
      this.user.fullName = this.personalFormGroup.get('exampleInputName').value;
    }
    if (this.personalFormGroup.get('exampleInputPassword').touched === true) {
      this.user.password = this.personalFormGroup.get('exampleInputPassword').value;
      this.user.confirmPassword = this.personalFormGroup.get('exampleInputPassword').value;
    }
    if (this.personalFormGroup.get('exampledateOfBirth').touched === true) {
      this.user.dateOfBirth = this.personalFormGroup.get('exampledateOfBirth').value;
    }
    if (this.personalFormGroup.get('exampleInputaboutYou').touched === true) {
      this.user.aboutYou = this.personalFormGroup.get('exampleInputaboutYou').value;
    }

    this.userService.updateThisUser(this.user).subscribe((user: User) => {
      this.user = user;
    });
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
        this.user.filename = this.base64File;
      };
    } catch (error) {
      this.filename = null;
      this.base64File = null;
      console.log('no file was selected...');
    }
  }
}
