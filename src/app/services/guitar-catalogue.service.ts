import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Guitar } from '../models/guitar.model';

const { apiGuitars } = environment;

@Injectable({
  providedIn: 'root',
})
export class GuitarCatalogueService {
  private _guitars: Guitar[] = [];
  private _error: string = '';
  private _loading: boolean = false;

  get guitars(): Guitar[] {
    return this._guitars;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient) {}

  public findAllGuitars(): void {
    // Stops multiple requests once guitars have been loaded
    if (this._guitars.length > 0 || this.loading) {
      return;
    }

    this._loading = true;
    this.http
      .get<Guitar[]>(apiGuitars)
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (guitars: Guitar[]) => {
          this._guitars = guitars;
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        },
      });
  }

  /**
   * gets id of guitar from list of guitars
   * returns the one with match id from param
   */
  public guitarById(id: string): Guitar | undefined {
    return this._guitars.find((guitar: Guitar) => guitar.id === id);
  }
}
