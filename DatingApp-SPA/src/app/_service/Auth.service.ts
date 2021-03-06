import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  // ---------------------------------------------------------------------------
  // I will use the authService to communicate Many to Many Components.
  // Bring in BehaviorSubject(is type of observable). Always needs value for that i added original.png for that.
  // ---------------------------------------------------------------------------
  photoUrl = new BehaviorSubject<string>('../../assets/original.png');
  currentPhotoUrl = this.photoUrl.asObservable();

constructor(private http: HttpClient) { }

  ChangeMemberPhoto(photoURL: string) {
    this.photoUrl.next(photoURL);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(
        map((response: any) => {
          if (response) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.decodedToken = this.jwtHelper.decodeToken(response.token);
            this.currentUser = response.user;
            this.ChangeMemberPhoto(this.currentUser.photoUrl);
          }
        })
      );
  }
  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
