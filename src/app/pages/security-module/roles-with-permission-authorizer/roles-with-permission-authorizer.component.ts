import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-roles-with-permission-authorizer',
  templateUrl: './roles-with-permission-authorizer.component.html',
  styleUrls: ['./roles-with-permission-authorizer.component.css']
})
export class RolesWithPermissionAuthorizerComponent implements OnInit {


  RoleForm = new FormGroup({
   
  })

  constructor() { }

  ngOnInit(): void {
  }

}
