import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor() { 
    $('app-root').append('<div class="full-screen-mask"></div>');
  }

  ngOnInit() {
  }

}
