import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userName: string;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.userName = this.auth.getSubject();
  }

  logout() {
    this.auth.logout();
  }
}
