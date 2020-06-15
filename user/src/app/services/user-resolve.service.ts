import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserResolveService implements Resolve<any> {

  constructor(private userService: UserService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<object> {
      console.log(route.paramMap.get('id'))
    return this.userService.getUser(route.paramMap.get('id'));
  }

}
