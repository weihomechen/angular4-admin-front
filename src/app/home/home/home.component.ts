import { Component, OnInit } from '@angular/core';
declare var Common;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      Common.stopLoading();
  }

}
