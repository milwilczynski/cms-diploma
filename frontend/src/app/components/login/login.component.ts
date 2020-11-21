import { AuthService } from './../../service/auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public credentials = {
    email: '',
    password: '',
  };

  public logged;
  public logout;
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signIn() {
    return this.authService
      .authenticate(this.credentials)
      .subscribe((result) => {
        if (!result) {
          this.logged = false;
        } else {
          this.logout = false;
          this.credentials = {
            email: '',
            password: '',
          };
          this.router.navigate(['/']);
        }
      });
  }
}
