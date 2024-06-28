import { Component, OnInit} from '@angular/core';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-create-vacuum-page',
  templateUrl: './create-vacuum-page.component.html',
  styleUrls: ['./create-vacuum-page.component.css']
})
export class CreateVacuumPageComponent implements OnInit {
  isAllowed : boolean = false;
  name: string = "";

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if(token){
      // Dekodiranje JWT tokena
      const decodedToken : any  = jwtDecode(token);

      if(decodedToken.add){
        this.isAllowed = true;
      }
    }
  }
  
  createVacuum(){
    if(this.name === ""){
      alert("All fields are required!");
      return;
    }

    const token = localStorage.getItem('token');

    if(token){
      // Dekodiranje JWT tokena
      const decodedToken : any  = jwtDecode(token);

      // Dohvatanje ID-a
      const userId = decodedToken.id;
  
      const body = {
        userId: userId,
        name: this.name
      }

      axios.post('http://localhost:8080/vacuums/create', body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).then(response => {
        console.log(response.data);
        this.resetValues();
      }).catch(error => {
        console.error('Error fetching user information:', error);
      });

    }
  }


  removeVacuum(vacuumId : number){
    
  }


  resetValues(){
    this.name = "";
  }

}
