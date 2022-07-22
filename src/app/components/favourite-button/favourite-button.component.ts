import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FavouriteService } from 'src/app/services/favourite.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favourite-button',
  templateUrl: './favourite-button.component.html',
  styleUrls: ['./favourite-button.component.css'],
})
export class FavouriteButtonComponent implements OnInit {
  public loading: boolean = false;

  public isFavourite: boolean = false;

  @Input() guitarId: string = '';

  constructor(
    private readonly favouriteService: FavouriteService,
    private readonly userSerivce: UserService
  ) {}

  ngOnInit(): void {
    //inputs are resolved (inits the bool with value to pass into )
    this.isFavourite = this.userSerivce.inFavourites(this.guitarId);
  }

  /**
   * This DOESN'T WORK!
   * get isFavourite(): boolean {
   *  return this.userService.inFavourites(this.guitarId)
   * }
   *
   * Because the getter get init on creation of class
   * --> when this.guitarId == ''
   *
   * guitarId == '' until view is init
   *
   * ngOnInit populates guitarId
   *
   */

  onFavouritesClick(): void {
    this.loading = true;

    // Add the guitar to favourites
    this.favouriteService.changeFavourites(this.guitarId).subscribe({
      next: (response: User) => {
        // Triggers event to reload component view
        this.loading = false;
        this.isFavourite = this.userSerivce.inFavourites(this.guitarId);
      },
      error: (error: HttpErrorResponse) => {
        console.log('ERROR', error.message);
      },
    });
  }
}
