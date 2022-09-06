import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roles-with-permission-authorizer-task-board',
  templateUrl: './roles-with-permission-authorizer-task-board.component.html',
  styleUrls: ['./roles-with-permission-authorizer-task-board.component.css']
})
export class RolesWithPermissionAuthorizerTaskBoardComponent implements OnInit {
  public approval = [
    {
      dencode: "abc",
      certificate: "xyz"
    }, {
      dencode: "abc",
      certificate: "xyz"
    },{
      dencode: "abc",
      certificate: "xyz"
    }, {
      dencode: "abc",
      certificate: "xyz"
    },{
      dencode: "abc",
      certificate: "xyz"
    }, {
      dencode: "abc",
      certificate: "xyz"
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
