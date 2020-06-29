import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../users/services/user.service';
import { User } from '../../../users/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../core/commonService/common.service';


@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})

export class UserCardComponent implements OnInit {
  public user: User;
  personalFormGroup: FormGroup;
  base64File: string = null;
  filename: string = null;
  public getUser;
  ngStyleDisplay = 'none';
  isdeleteUser = false;
  isrestoreUser = true;

  constructor(private userService: UserService, private formBuilder: FormBuilder,
              private router: Router, private commonService: CommonService){
    this.user = new User();
    this.commonService.newUserId.subscribe(id => {
      this.getUser = id;
      this.userService.getUser(this.getUser).subscribe((user: User) => {
          // tslint:disable-next-line: no-string-literal
          this.user = user['data'];
          if (this.user.isDeleted === true) {
            this.ngStyleDisplay = 'block';
            this.isdeleteUser =  true;
            this.isrestoreUser = false;
          } else {
            this.ngStyleDisplay = 'none';
            this.isdeleteUser = false;
            this.isrestoreUser = true;
          }
      });
    });
  }

  ngOnInit(): void {
    this.personalFormGroup = this.formBuilder.group({
      exampleInputName: ['', Validators.required],
      exampleLogin: ['', Validators.required],
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
    if (this.personalFormGroup.get('exampleLogin').touched === true) {
      this.user.login = this.personalFormGroup.get('exampleLogin').value;
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
      // tslint:disable-next-line: no-string-literal
      this.user = user['data'];
    });
  }

  deleteUser(){
    this.user.isDeleted = true;
    this.userService.updateThisUser(this.user).subscribe((user: User) => {
      // tslint:disable-next-line: no-string-literal
      this.user = user['data'];
    });
    this.router.navigate(['/home']);
    setTimeout(() => {
      this.showNotification({
        html: 'User deleted',
        className: 'welcome'
      });
    }, 1000);
  }

  restoreUser(){
    this.user.isDeleted = false;
    this.userService.updateThisUser(this.user).subscribe((user: User) => {
      // tslint:disable-next-line: no-string-literal
      this.user = user['data'];
    });
    this.router.navigate(['/home']);
    setTimeout(() => {
      this.showNotification({
        html: 'User restored',
        className: 'welcome'
      });
    }, 1000);
  }

  showNotification({className, html}) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    if (className) {
      notification.classList.add(className);
    }
    notification.style.top = '10px';
    notification.style.right = '10px';
    notification.style.color = 'white';
    notification.style.padding = '20px';
    notification.style.textAlign = 'center';
    notification.style.backgroundColor = 'blue';
    notification.style.marginBottom = '15px';
    notification.innerHTML = html;
    document.body.append(notification);
    setTimeout(() => notification.remove(), 1500);
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
