import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {COUNTRY} from "../../../app.constants";
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
title_country: any;

  constructor( private fb: FormBuilder,
               private authService: AuthService) {
  }

  ngOnInit() {
    this.title_country = COUNTRY()
  }

  logOut() {
    this.authService.logOut()
  }
}
