import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_service/user.service';
import { AlertifyService } from '../_service/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberDatailResolver implements Resolve<User> {
  constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.GetUser(route.params['id']).pipe(
      catchError(error => {
        this.alertify.error(`Problem retrieving data and the error is: ${error}`);
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }
}
