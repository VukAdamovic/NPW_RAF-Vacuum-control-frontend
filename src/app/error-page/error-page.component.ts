import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { VacuumModel } from '../model/VacuumModel';


@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  isAllowed : boolean = false;

  allErrors : any [] = [];
  activeUserId : Number | null = null;  
  
  
  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if(token){
      // Dekodiranje JWT tokena
      const decodedToken : any  = jwtDecode(token);

      if(decodedToken.read){
        this.isAllowed = true;

        this.activeUserId = decodedToken.id;

        const body = {
          userId : this.activeUserId, 
          name : null,
          status : null,
          dateFrom : null,
          dateTo: null
        }

        //dohvatam sve usisivace od usera , pa zatim za svaki pustam rutu pojedinacno da skupim sve errore
        axios.put('http://localhost:8080/vacuums', body,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }).then(response => {
          response.data.forEach((element: any) => {
            const vacuum : VacuumModel = new VacuumModel(element);

            axios.get(`http://localhost:8080/errorMessages/${vacuum.id}`,{
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }).then(response => {
              response.data.forEach((element: any) => {
                this.allErrors.push(element);
              });
            })
          });
        })

        console.log(this.allErrors);
      }
    }
  }

}
