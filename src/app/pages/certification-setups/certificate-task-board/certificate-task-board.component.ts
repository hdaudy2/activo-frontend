import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certificate-task-board',
  templateUrl:'./certificate-task-board.component.html',
  styleUrls: ['./certificate-task-board.component.css']
})
export class CertificateTaskBoardComponent implements OnInit {
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
