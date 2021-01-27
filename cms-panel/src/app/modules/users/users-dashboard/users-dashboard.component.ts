import { Component, OnInit } from '@angular/core';
import {
  faTrashAlt,
  faStar,
  faEye,
  faFile,
  faClock,
  faEyeSlash,
} from '@fortawesome/free-regular-svg-icons';
import {
  faPen,
  faCircleNotch,
  faUserTag,
  faPlus,
  faCheck,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { RoleService } from 'src/app/services/role/role.service';
import { UsersService } from 'src/app/services/users/users.service';
import Utils from 'src/app/utility/utils';

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.css'],
})
export class UsersDashboardComponent implements OnInit {
  _utils = Utils;
  roles: any = null;
  users: any = null;
  isOnShow = false;
  fileUrl: string = '';
  dashboard: any = null;
  faPen = faPen;
  faCircleNotch = faCircleNotch;
  faTrashAlt = faTrashAlt;
  faUserTag = faUserTag;
  faStar = faStar;
  faEye = faEye;
  faPlus = faPlus;
  faCheck = faCheck;
  faTimes = faTimes;
  faFile = faFile;
  faClock = faClock;
  faEyeSlash = faEyeSlash;

  constructor(
    private roleService: RoleService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchDashboard();
  }

  fetchUsers() {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response;
    });
  }

  fetchDashboard() {
    this.userService.getDashboard().subscribe((response) => {
      this.dashboard = response;
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((response) => {
      console.log(response);
    });
  }
}
