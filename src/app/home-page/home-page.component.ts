import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { UserModel } from '../model/UserModel';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  isAllowed : boolean = false;
  allUsers : UserModel[] = [];
  activeUserId : Number | null = null;  

  constructor(private router: Router){}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if(token){
      // Dekodiranje JWT tokena
      const decodedToken : any  = jwtDecode(token);

      if(decodedToken.read){
        this.isAllowed = true;
        this.activeUserId = decodedToken.id;

        axios.get('http://localhost:8080/users',{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }).then(response => {
          response.data.forEach((element: any) => {
            const user : UserModel = new UserModel(element);
            this.allUsers.push(user);
          });
        })

      }
    }
  }

  deleteUser(userId : Number){
    axios.delete(`http://localhost:8080/users/${userId}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response => {
      console.log(response.data);

      axios.get('http://localhost:8080/users',{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }).then(response => {
          this.allUsers = [];

          response.data.forEach((element: any) => {
            const user : UserModel = new UserModel(element);
            this.allUsers.push(user);
          });
        })
    })  
  }

  updateUser(userId : number){
    this.router.navigate(['/updateUser'], { queryParams: { userId: userId } });
  }
}
