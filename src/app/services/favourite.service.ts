import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Guitar } from '../models/guitar.model';
import { User } from '../models/user.model';
import { GuitarCatalogueService } from './guitar-catalogue.service';
import { UserService } from './user.service';

const { apiUsers, apiKey } = environment;

@Injectable({
  providedIn: 'root',
})
export class FavouriteService {
  constructor(
    private http: HttpClient,
    private readonly guitarService: GuitarCatalogueService,
    private readonly userService: UserService
  ) {}

  public changeFavourites(guitarId: string): Observable<User> {
    if (!this.userService.user) {
      throw new Error('addToFavourite: There is no user');
    }

    const user: User = this.userService.user;
    const guitar: Guitar | undefined = this.guitarService.guitarById(guitarId);

    if (!guitar) {
      throw new Error('addToFavourite: No guitar with id: ' + guitarId);
    }

    if (this.userService.inFavourites(guitarId)) {
      // throw new Error('addToFavourite: Guitar already in favourites');

      this.userService.removeFromFavourites(guitarId);
    } else {
      this.userService.addToFavourites(guitar);
    }

    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-api-key': apiKey,
    });

    return this.http
      .patch<User>(
        `${apiUsers}/${user.id}`,
        {
          favourites: [...user.favourites], // gets updated with new user onFavourit
        },
        {
          headers,
        }
      )
      .pipe(
        tap((updatedUser: User) => {
          this.userService.user = updatedUser;
        })
      );
  }
}
