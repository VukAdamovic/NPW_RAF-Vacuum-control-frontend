import { Component, OnInit } from '@angular/core';
import { LoggedInService } from '../service/logged-in.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isTokenAvailable : boolean = false;
  activeLink : string | null = null;
  firstName : string | null = null;
  lastName : string | null= null;


  constructor(private router: Router ,private loggedInService : LoggedInService){}

  ngOnInit(): void {
    this.loggedInService.isTokenAvailable$.subscribe((isAvailable) => {
      this.isTokenAvailable = isAvailable;
    })

    this.loggedInService.firstName$.subscribe((firstName) => {
      this.firstName = firstName;
    });

    this.loggedInService.lastName$.subscribe((lastName) => {
      this.lastName = lastName;
    });

  }

  setActiveLink(link: string) {
    this.activeLink = link;
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('activeUser');
    this.loggedInService.updateTokenVisibility(false);
    this.router.navigate(['/']);
  }
}
