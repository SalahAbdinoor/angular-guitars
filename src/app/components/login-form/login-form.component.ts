import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  // Emit events to the parent. On login
  @Output() login: EventEmitter<void> = new EventEmitter();

  // DI.
  constructor(
    private readonly userService: UserService,
    private readonly loginService: LoginService
  ) {}

  public loginSubmit(LoginForm: NgForm): void {
    //username from login form
    const { username } = LoginForm.value;

    this.loginService.login(username).subscribe({
      next: (user: User) => {
        this.userService.user = user;
        this.login.emit();

        // Bad practice // Redirect to the catalogue page
        // this.router.navigateByUrl('/guitars');
      },
      error: () => {
        // handle that locally
      },
    });
  }
}
