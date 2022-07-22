import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { GuitarCataloguePage } from './pages/guitar-catalogue/guitar-catalogue.page';
import { ProfilePage } from './pages/profile/profile.page';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { GuitarListComponent } from './components/guitar-list/guitar-list.component';
import { GuitarListItemComponent } from './components/guitar-list-item/guitar-list-item.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FavouriteButtonComponent } from './components/favourite-button/favourite-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';

// Decorator: @
@NgModule({
  declarations: [
    // Components
    AppComponent,
    LoginPage,
    GuitarCataloguePage,
    ProfilePage,
    LoginFormComponent,
    GuitarListComponent,
    GuitarListItemComponent,
    NavbarComponent,
    FavouriteButtonComponent,
    LogoutButtonComponent,
  ],
  imports: [
    // Modules
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
