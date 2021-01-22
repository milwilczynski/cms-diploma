import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  emailorlogin!: string;
  password!: string;

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {}

  authUser(): void {
    const body = {
      emailorlogin: this.emailorlogin,
      password: this.password,
    };
    this.authService.authUser(body).subscribe((response) => {
      console.log(response);
    });
  }
}
