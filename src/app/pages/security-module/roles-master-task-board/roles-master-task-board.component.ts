import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
  selector: 'app-roles-master-task-board',
  templateUrl: './roles-master-task-board.component.html',
  styleUrls: ['./roles-master-task-board.component.css'],
  animations: [appModuleAnimation()],
  // animations:[ RouterModule]

})
export class RolesMasterTaskBoardComponent implements OnInit {
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
