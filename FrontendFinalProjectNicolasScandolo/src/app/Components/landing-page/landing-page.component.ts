import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private route: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  GoToSignUp() {
    this.route.navigate(['signup']);
  }

  GoToSignIn() {
    this.route.navigate(['signin']);
  }

}
