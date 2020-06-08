import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PersonalServiceService } from '../personal-page/personal-service.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    public role;
    constructor( private router: Router, private personalService: PersonalServiceService ) {
        if (localStorage.getItem('loggedInID') === 'admin') {
            this.role = 'admin';
        } else {
            this.personalService.getUser(localStorage.getItem('loggedInID')).subscribe(user => {
                this.role = user['role'];
            });
        }
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = localStorage.getItem('loggedInUser');
        if (currentUser) {
            // check if route is restricted by role
            // console.log(route.data.roles);
            // console.log(route.data.roles.indexOf(currentUser));
            if (currentUser === 'admin') {
                this.role = 'admin';
            } else {
                this.role = 'user';
            }
            if (route.data.roles && route.data.roles.indexOf(this.role) === -1) {
                // role not authorised so redirect to home page
                // console.log(currentUser)
                this.router.navigate(['/home']);
                return false;
            }

            // authorised so return true
            return true;
        }
        
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
