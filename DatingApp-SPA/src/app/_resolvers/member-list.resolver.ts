import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_service/user.service';
import { AlertifyService } from '../_service/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
  constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}

  pageNumber = 1;
  pageSize = 5;

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService.GetUsers(this.pageNumber, this.pageSize).pipe(
      catchError(error => {
        this.alertify.error(`Problem retrieving data and the error is: ${error}`);
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
}
