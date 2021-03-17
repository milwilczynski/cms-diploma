import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  emailorlogin!: string;
  password!: string;
  isLogged = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  authUser(): void {
    const body = {
      emailorlogin: this.emailorlogin,
      password: this.password,
    };
    this.authService.authUser(body).subscribe((result) => {
      if (result) {
        this.isLogged = true;
        if (this.isLogged) {
          this.emailorlogin = '';
          this.password = '';
          this.router.navigate(['/']);
        }
      }
    });
  }
}
