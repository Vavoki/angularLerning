import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { state, trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('fade', [
      transition('void <=> *', [
        style({ opacity: 0 }),
        animate(1000, style({opacity: 1}))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
  }
  onNewAd() {
    this.router.navigate(['ads/new'], {relativeTo: this.route});
  }
  onLogout() {
    this.authService.loggout();
  }
}
