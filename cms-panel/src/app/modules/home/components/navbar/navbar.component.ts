import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: any;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUserData();
  }

  logOut(): void {
    if (this.authService.logout()) {
      this.router.navigate(['/login']);
    }
  }
  fetchUserData() {
    this.user = this.authService.currentUser();
  }
}
