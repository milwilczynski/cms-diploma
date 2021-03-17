import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role/role.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users-adder',
  templateUrl: './users-adder.component.html',
  styleUrls: ['./users-adder.component.css'],
})
export class UsersAdderComponent implements OnInit {
  login!: any;
  name!: any;
  surname!: any;
  email!: any;
  roles!: any;
  password!: any;
  chosenRoles!: any;

  constructor(
    private roleService: RoleService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.fetchRoles();
  }

  fetchRoles(): void {
    this.roleService.getAllRoles().subscribe((response) => {
      this.roles = response;
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
      login: this.login,
      password: this.password,
      email: this.email,
      name: this.name,
      surname: this.surname,
      roles: jsonArr,
    };
    console.log(body);
    this.userService.addUser(body).subscribe((response) => {
      console.log(response);
    });
  }
}
