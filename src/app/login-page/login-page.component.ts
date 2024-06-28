import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { LoggedInService } from '../service/logged-in.service';
import { jwtDecode } from "jwt-decode";
import { UserModel } from '../model/UserModel';




@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  email : string = "";
  password : string = "";

  constructor(private router: Router, private loggedInService : LoggedInService) {}

  ngOnInit(): void {
    this.loggedInService.isTokenAvailable$.subscribe((isAvailable) => {
       if(isAvailable){
        this.router.navigate(['/home']);    
       }
    })
  }

  onSubmit() {
    if (this.email === "" || this.password === "") {
      alert("All fields are required!");
      return;
    }

    const body = {
      email: this.email,
      password: this.password
    };

    axios.post('http://localhost:8080/users/login', body)
      .then(response => {

        const token = response.data.token;

        // Cuvanje tokena u localStorage-u
        localStorage.setItem('token', token);

        // Dekodiranje JWT tokena
        const decodedToken : any  = jwtDecode(token);

        // Dohvatanje ID-a
        const userId = decodedToken.id;
       
  
        // Slanje GET zahteva
        axios.get(`http://localhost:8080/users/${userId}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          
        // Cuvanje aktivnog Usera u localStorage-u
          const activeUser : UserModel = new UserModel(response.data);
          localStorage.setItem('activeUser', JSON.stringify(activeUser));

           // Preusmeravanje na 'home page'
          this.loggedInService.updateTokenVisibility(true);
          this.router.navigate(['/home']);
        }).catch(error => {
          console.error('Error fetching user information:', error);
          localStorage.removeItem('token');
          alert('You don\'t have any permission');
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        alert('Invalid credentials. Please check your email and password.');
      });
  }

}
