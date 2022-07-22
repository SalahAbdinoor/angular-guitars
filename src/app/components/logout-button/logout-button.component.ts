import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css'],
})
export class LogoutButtonComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  public logout(): void {
    if (this.userService.user) {
      this.userService.logOutUser();
    }
  }
}
