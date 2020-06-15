export interface IUser {
    id: string;
    login: string;
    email: string;
    fullName: string;
    password: string;
    confirmPassword: string;
    filename: string;
    dateOfBirth: string;
    aboutYou: string;
    role: string;
  }

export class User implements IUser{
    id = '';
    login = '';
    email = '';
    fullName = '';
    password = '';
    confirmPassword = '';
    filename = '';
    dateOfBirth = '';
    aboutYou = '';
    role = '';
}

