import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";




@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {

  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";
  readPermission : boolean = false;
  createPermission : boolean = false;
  updatePermission : boolean = false;
  deletePermission : boolean = false;
  searchPermission:boolean = false;
  startPermission:boolean = false;
  stopPermission:boolean = false;
  dischargePermission:boolean = false;
  addPermission:boolean = false;
  removePermission:boolean = false;


  isAllowed : boolean = false;

  ngOnInit(): void {
      const token = localStorage.getItem('token');

      if(token){
        // Dekodiranje JWT tokena
        const decodedToken : any  = jwtDecode(token);

        if(decodedToken.create){
          this.isAllowed = true;
        }
      }
  }


  createUser(){
     if(this.firstName ==="" || this.lastName === "" || this.email === "" || this.password === ""){
        alert("All fields are required!");
        return;
     }

     const body = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        canCreateUsers: this.createPermission,
        canReadUsers: this.readPermission,
        canUpdateUsers: this.updatePermission,
        canDeleteUsers: this.deletePermission,
        canSearchVacuum: this.searchPermission,
        canStartVacuum: this.startPermission,
        canStopVacuum: this.stopPermission,
        canDischargeVacuum: this.dischargePermission,
        canAddVacuum: this.addPermission,
        canRemoveVacuum: this.removePermission
     }

     axios.post('http://localhost:8080/users', body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      console.log(response.data);
      this.resetValues();
    }).catch(error => {
      console.error('Error fetching user information:', error);
    });


  }

  private resetValues(){
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.password = "";
    this.createPermission = false;
    this.readPermission = false;
    this.updatePermission = false;
    this.deletePermission = false;
    this.searchPermission = false;
    this.startPermission = false;
    this.stopPermission = false;
    this.dischargePermission = false;
    this.addPermission = false;
    this.removePermission = false;
  }

}
