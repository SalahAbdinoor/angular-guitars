import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

// Environment variables
let { apiUsers: apiUsers, apiKey } = environment;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // Dependency Injection
  constructor(private readonly http: HttpClient) {}

  /**
   * Checks if user exist
   * -- IF user DOES exist --> continue
   * -- IF user DOES NOT exist --> create user
   *
   * store user
   * @param username user to login
   * @returns <User>
   */
  public login(username: string): Observable<User> {
    return this.checkUsername(username).pipe(
      switchMap((user: User | undefined) => {
        if (user === undefined) {
          // user does not exist
          return this.createUser(username);
        }
        return of(user);
      })
      // , User is now being set in user.service
      // tap((user: User) => {
      //   StorageUtil.storageSave<User>(StorageKeys.User, user);
      // })
    );
  }

  /**
   * Check if user exists
   *
   * @param username name of user
   * @returns <User> IF user DOES exists || <undefined> IF user DOES NOT exist
   */
  private checkUsername(username: string): Observable<User | undefined> {
    return this.http.get<User[]>(`${apiUsers}?username=${username}`).pipe(
      // RxJS Operators
      map((response: User[]) => response.pop())

      /* SAME CALLBACK ^
      map((response: User[]) => {
        return response.pop();
      })
      */
    );
  }

  /**
   * creates a user
   *
   * @param username name of created user
   * @returns <User>
   */
  private createUser(username: string): Observable<User> {
    // user
    const user = {
      username,
      favourites: [],
    };

    // headers -> API Key
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'x-api-key': apiKey,
    });

    // POST - Create items on the server
    return this.http.post<User>(apiUsers, user, { headers });
  }
}
