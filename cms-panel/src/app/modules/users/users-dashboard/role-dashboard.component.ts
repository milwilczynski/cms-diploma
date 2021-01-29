import { Component, OnInit } from '@angular/core';
import {
  faTrashAlt,
  faEye,
  faFile,
  faUser,
  faClock,
  faEyeSlash,
  faStar,
} from '@fortawesome/free-regular-svg-icons';
import {
  faPen,
  faHome,
  faPlus,
  faCheck,
  faTimes,
  faUserTag,
  faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';
import { RoleService } from 'src/app/services/role/role.service';
import Utils from 'src/app/utility/utils';
@Component({
  selector: 'app-role-dashboard',
  templateUrl: './role-dashboard.component.html',
  styleUrls: ['./role-dashboard.component.css'],
})
export class RoleDashboardComponent implements OnInit {
  _utils = Utils;
  roles: any = null;
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

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.fetchRoles();
    this.fetchDashboard();
  }

  fetchRoles() {
    this.roleService.getAllRoles().subscribe((response) => {
      this.roles = response;
    });
  }

  fetchDashboard() {
    this.roleService.getDashboard().subscribe((response) => {
      this.dashboard = response;
    });
  }

  deleteRole(id: number) {
    this.roleService.deleteRole(id).subscribe((response) => {
      this.dashboard = response;
    });
  }
}
