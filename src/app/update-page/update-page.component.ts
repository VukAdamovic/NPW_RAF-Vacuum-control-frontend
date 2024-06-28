import { Component, OnInit } from '@angular/core';
import { UserModel } from '../model/UserModel';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";


@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.component.html',
  styleUrls: ['./update-page.component.css']
})
export class UpdatePageComponent implements OnInit {

  selectedUser : UserModel | null = null;
  isAllowed : boolean = false;

  firstName: string = "";
  lastName: string = "";
  email: string = "";
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


  constructor(private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if(token){
      // Dekodiranje JWT tokena
      const decodedToken : any  = jwtDecode(token);

      if(decodedToken.update){
        this.isAllowed = true;

        this.route.queryParams.subscribe(params => {
          const userId = params['userId'];
    
          axios.get(`http://localhost:8080/users/${userId}`, 
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            })
            .then(response => {
                this.selectedUser = new UserModel(response.data);
                
                this.firstName = this.selectedUser.firstName;
                this.lastName = this.selectedUser.lastName;
                this.email = this.selectedUser.email;
                this.readPermission = this.selectedUser.canReadUsers;
                this.createPermission = this.selectedUser.canCreateUsers;
                this.updatePermission = this.selectedUser.canUpdateUsers;
                this.deletePermission = this.selectedUser.canDeleteUsers;
                this.searchPermission = this.selectedUser.canSearchVacuum;
                this.startPermission = this.selectedUser.canStartVacuum;
                this.stopPermission = this.selectedUser.canStopVacuum;
                this.dischargePermission = this.selectedUser.canDischargeVacuum;
                this.addPermission = this.selectedUser.canAddVacuum;
                this.removePermission = this.selectedUser.canRemoveVacuum;
    
            }).catch(error => {
              console.error('Error fetching user information:', error);
            });
    
          // Sada možete koristiti "user" objekat na osnovu potreba vaše aplikacije.
        });
      }
    } 
  }


  updateUser(){
    const body = {
      id : this.selectedUser?.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.selectedUser?.password,
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
    axios.put('http://localhost:8080/users', body,  {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response => {
      console.log(response.data);
      this.router.navigate(['/home']);
    }).catch(error => {
      console.error('Error fetching user information:', error);
    });
  }
}
