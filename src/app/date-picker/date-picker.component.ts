import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";




@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {
  isAllowed : boolean = false;
  vacuumId: number;
  date: string = "";
  hours: string = ""
  selectedOperation: string = ""


  constructor(
    public dialogRef: MatDialogRef<DatePickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vacuumId: number }
  ) {
    this.vacuumId = data.vacuumId;
  }


  book(){

    const formatDate = (dateString: string) => {
      if (!dateString) return null;
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US");
    };

    if(this.date === "" || this.hours === "" || this.selectedOperation === ""){
      alert("All fields are required")
      return;
    }


    if(this.selectedOperation === "start"){
      const token = localStorage.getItem('token');

      if(token){
        const decodedToken : any  = jwtDecode(token);

        if(!decodedToken.start){
          alert("You don\'t have permission'")
          return;
        }

        const body = {
          date : formatDate(this.date) + ` ${this.hours}` ,
          vacuumId : this.vacuumId
        }

        console.log(body)

        axios.put(`http://localhost:8080/vacuums/bookStartOperation`, body ,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }).then(response =>{
          if(response.data){
            alert("Successfully booked")
          }else{
            alert("Unsuccessfully booked")
          }
        })
      }
    }
    else if(this.selectedOperation === "stop"){
      const token = localStorage.getItem('token');

      if(token){
        const decodedToken : any  = jwtDecode(token);

        if(!decodedToken.stop){
          alert("You don\'t have permission'")
          return;
        }

        const body = {
          date : formatDate(this.date) + ` ${this.hours}` ,
          vacuumId : this.vacuumId
        }

        console.log(body)

        axios.put(`http://localhost:8080/vacuums/bookStopOperation`, body ,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }).then(response =>{
          if(response.data){
            alert("Successfully booked")
          }else{
            alert("Unsuccessfully booked")
          }
        })
      }
    }
    else if(this.selectedOperation === "discharge"){
      const token = localStorage.getItem('token');

      if(token){
        const decodedToken : any  = jwtDecode(token);

        if(!decodedToken.discharge){
          alert("You don\'t have permission'")
          return;
        }

        const body = {
          date : formatDate(this.date) + ` ${this.hours}` ,
          vacuumId : this.vacuumId
        }

        console.log(body)

        axios.put(`http://localhost:8080/vacuums/bookDischargeOperation`, body ,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }).then(response =>{
          if(response.data){
            alert("Successfully booked")
          }else{
            alert("Unsuccessfully booked")
          }
        })
      }
    }
    
  }


  insertColon() {
    // Ako je uneseno 2 karaktera, automatski dodaj dvotačku
    if (this.hours.length === 2 && !this.hours.includes(":")) {
      this.hours = this.hours + ":";
    }
  
    // Ograniči unos na 5 karaktera
    if (this.hours.length > 5) {
      this.hours = this.hours.slice(0, 5);
    }
  }
  
  validateInput(event: any) {
    const inputValue = event.key;
  
    // Ograničenja za prvi, drugi, treći i četvrti broj
    const firstDigit = Number(this.hours.charAt(0));
    const secondDigit = Number(this.hours.charAt(1));
    const thirdDigit = Number(this.hours.charAt(3));
    const fourthDigit = Number(this.hours.charAt(4));
  
    if (
      firstDigit * 10 + secondDigit >= 24 ||
      thirdDigit * 10 + fourthDigit >= 60
    ) {
      event.preventDefault();
      return;
    }
  
    // Ograniči unos na 5 karaktera
    if (this.hours.length >= 5 || (this.hours.length === 2 && !this.hours.includes(":"))) {
      event.preventDefault();
      return;
    }
  
    // Dozvoli samo cifre i dvotačku
    if (!/^\d|:$/.test(inputValue)) {
      event.preventDefault();
      return;
    }
  }
  

}

