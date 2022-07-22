import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, tap } from 'rxjs';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Guitar } from '../models/guitar.model';
import { User } from '../models/user.model';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root',
})
/**
 * Keeps track of currently logged in user
 */
export class UserService {
  private _user?: User;
  // private _user: User | undefined; Same as ^

  get user(): User | undefined {
    return this._user;
  }

  set user(user: User | undefined) {
    // ! === never undefined
    StorageUtil.storageSave<User>(StorageKeys.User, user!);
    this._user = user;
  }

  constructor(private router: Router) {
    this._user = StorageUtil.storageRead<User>(StorageKeys.User);
  }

  public inFavourites(guitarId: string): boolean {
    if (this.user) {
      return Boolean(
        this.user?.favourites.find((guitar: Guitar) => guitar.id === guitarId)
      );
    }

    return false;
  }

  public addToFavourites(guitar: Guitar): void {
    if (this._user) {
      this._user.favourites.push(guitar);
    }
  }

  public removeFromFavourites(guitarId: string): void {
    if (this._user) {
      this._user.favourites = this._user.favourites.filter(
        (guitar: Guitar) => guitar.id !== guitarId
      );
    }
  }

  public logOutUser(): void {
    if (this._user) {
      StorageUtil.storageRemove(StorageKeys.User);
      this._user = undefined;
      this.router.navigateByUrl('/login');
    }
  }
}
