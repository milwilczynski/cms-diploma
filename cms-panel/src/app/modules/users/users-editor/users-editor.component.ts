import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from 'src/app/services/role/role.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users-editor',
  templateUrl: './users-editor.component.html',
  styleUrls: ['./users-editor.component.css'],
})
export class UsersEditorComponent implements OnInit {
  userId: any = null;
  login!: any;
  name!: any;
  surname!: any;
  email!: any;
  roles: any = null;
  chosenRoles!: any;
  userRoles!: any;

  constructor(
    private roleService: RoleService,
    private userService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      this.fetchUser(this.userId);
      this.fetchRoles();
    });
  }

  fetchUser(id: number): void {
    this.userService.getUser(id).subscribe((response) => {
      this.login = response.login;
      this.email = response.email;
      this.name = response.name;
      this.surname = response.surname;
      this.userRoles = response.roles;
    });
  }

  fetchRoles(): void {
    this.roleService.getAllRoles().subscribe((response) => {
      this.roles = response;
    });
  }

  checkIfHasRole(id: number): boolean {
    return this.userRoles.some((element) => {
      return element.id === id;
    });
  }

  addUser(): void {
    const jsonArr = new Array();
    const roles = document.getElementsByClassName('custom-control-input');
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < roles.length; i++) {
      const id = (roles[i] as HTMLInputElement).value;
      const isChecked = (roles[i] as HTMLInputElement).checked;
      // tslint:disable-next-line: radix
      jsonArr.push({ id: parseInt(id), value: isChecked });
    }
    const body = {
      id: this.userId,
      login: this.login,
      email: this.email,
      name: this.name,
      surname: this.surname,
      roles: jsonArr,
    };

    this.userService.editUser(body).subscribe((response) => {
      console.log(response);
    });
  }
}
