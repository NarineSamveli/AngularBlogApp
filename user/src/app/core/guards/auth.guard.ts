import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../../users/services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    public user;
    constructor( private router: Router, private userService: UserService ) {
        this.userService.getUser(localStorage.getItem('loggedInID')).subscribe(user => {
            // tslint:disable-next-line: no-string-literal
            this.user = user['data'];
        });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = localStorage.getItem('loggedInUser');
        if (currentUser) {
            this.userService.getUser(localStorage.getItem('loggedInID')).subscribe(user => {
                // tslint:disable-next-line: no-string-literal
                if (route.data.roles && route.data.roles.indexOf(user['data']['role']) === -1) {
                    // role not authorised so redirect to home page

                    this.router.navigate(['/home']);
                    return false;
                }
            });
            // authorised so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
