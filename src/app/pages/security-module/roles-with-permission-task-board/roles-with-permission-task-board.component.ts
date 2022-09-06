import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roles-with-permission-task-board',
  templateUrl: './roles-with-permission-task-board.component.html',
  styleUrls: ['./roles-with-permission-task-board.component.css']
})
export class RolesWithPermissionTaskBoardComponent implements OnInit {
public approval = [
  {
    dencode: "0001",
    certificate: "Manager"
  }, {
    dencode: "0002",
    certificate: "Auditor"
  },{
    dencode: "0003",
    certificate: "Admin"
  }, {
    dencode: "0004",
    certificate: "Accountant"
  },{
    dencode: "005",
    certificate: "Operation"
  }, {
    dencode: "0006",
    certificate: "Marketing"
  }
]

  constructor() { }

  ngOnInit(): void {
  }

}
