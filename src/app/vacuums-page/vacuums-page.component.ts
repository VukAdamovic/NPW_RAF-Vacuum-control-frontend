import { Component, OnInit} from '@angular/core';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { VacuumModel } from '../model/VacuumModel';

import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';



@Component({
  selector: 'app-vacuums-page',
  templateUrl: './vacuums-page.component.html',
  styleUrls: ['./vacuums-page.component.css']
})
export class VacuumsPageComponent implements OnInit {
  isAllowed : boolean = false;
  allVacuums : VacuumModel[] = [];
  activateUserId : Number | null = null;

  name : string = "";
  dateFrom : string = "";
  dateTo : string = "";
  statusON : boolean = false;
  statusOFF : boolean = false;
  statusDISCHARGING : boolean = false;

  constructor(public dialog: MatDialog) {}


  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if(token){
      // Dekodiranje JWT tokena
      const decodedToken : any  = jwtDecode(token);

      if(decodedToken.search){
        this.isAllowed = true;

        this.activateUserId = decodedToken.id;

        
        const body = {
          userId : this.activateUserId, 
          name : null,
          status : null,
          dateFrom : null,
          dateTo: null
        }

        axios.put('http://localhost:8080/vacuums', body,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }).then(response => {
          response.data.forEach((element: any) => {
            const vacuum : VacuumModel = new VacuumModel(element);
            this.allVacuums.push(vacuum);
          });
        })

        //pozivaj stalno
        setInterval(() => {
          this.updateData();
        }, 17500);

      }
    }
  }

  removeVacuum(vacuumId : Number ){
    axios.put(`http://localhost:8080/vacuums/deactivcate/${vacuumId}`, null,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response => {
      console.log(response.data);

      const body = {
        userId : this.activateUserId, 
        name : null,
        status : null,
        dateFrom : null,
        dateTo: null
      }

      axios.put('http://localhost:8080/vacuums', body ,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }).then(response => {

          this.allVacuums = [];

          response.data.forEach((element: any) => {
            const vacuum : VacuumModel = new VacuumModel(element);
            this.allVacuums.push(vacuum);
          });
        })
    })
  }

  searchByFilter(){
    const body: {
      userId: Number | null;
      name: string | null;
      status: string | null;
      dateFrom: string | null;
      dateTo: string | null;
    } = {
      userId: this.activateUserId,
      name: null,
      status: null,
      dateFrom: null,
      dateTo: null,
    };

    if(this.name !== ""){
      body.name = this.name;
    }

    let status = "";
    if(this.statusON){
      status = "ON";
    }else if(this.statusOFF){
      status = "OFF"
    }else if(this.statusDISCHARGING){
      status = "DISCHARGING"
    }

    if(status !== ""){
      body.status = status;
    }

    if (this.dateFrom && this.dateTo) {
      const dateFrom = new Date(this.dateFrom);
      const dateTo = new Date(this.dateTo);
  
      if (dateFrom > dateTo) {
        alert("Check Dates");
        return;
      }
    }

    const formatDate = (dateString: string) => {
      if (!dateString) return null;
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US");
    };

    if(this.dateFrom !== ""){
      body.dateFrom = formatDate(this.dateFrom);
    }

    if(this.dateTo !== ""){
      body.dateTo = formatDate(this.dateTo);
    }


    axios.put('http://localhost:8080/vacuums', body,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response => {
      this.allVacuums = [];
      response.data.forEach((element: any) => {
        const vacuum : VacuumModel = new VacuumModel(element);
        this.allVacuums.push(vacuum);
      });

      console.log(this.allVacuums);
    })

  }

  startVacuum(vacuumId : Number ){

    const token = localStorage.getItem('token');

    if(token){
      // Dekodiranje JWT tokena
      const decodedToken : any  = jwtDecode(token);

      if(!decodedToken.start){
        const dialogRef = this.dialog.open(PopupComponent, {
          data: { message: 'You don\'t have permission' },
        });
        return;
      }
    }



    axios.put(`http://localhost:8080/vacuums/start/${vacuumId}`, null ,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response => {
        if(response.data){
          
          const dialogRef = this.dialog.open(PopupComponent, {
            data: { message: 'Successfully started vacuum' },
          });


          setTimeout(() => {

            const formatDate = (dateString: string) => {
              if (!dateString) return null;
              const date = new Date(dateString);
              return date.toLocaleDateString("en-US");
            };
  
            const body: {
              userId: Number | null;
              name: string | null;
              status: string | null;
              dateFrom: string | null;
              dateTo: string | null;
            } = {
              userId: this.activateUserId,
              name: this.name,
              status: null,
              dateFrom: formatDate(this.dateFrom),
              dateTo: formatDate(this.dateTo),
            };
  
            let status = "";
            if(this.statusON){
              status = "ON";
            }else if(this.statusOFF){
              status = "OFF"
            }else if(this.statusDISCHARGING){
              status = "DISCHARGING"
            }
  
  
            axios.put('http://localhost:8080/vacuums', body,{
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }).then(response => {
              this.allVacuums = [];
              response.data.forEach((element: any) => {
                const vacuum : VacuumModel = new VacuumModel(element);
                this.allVacuums.push(vacuum);
              });
  
              console.log(this.allVacuums);
            })          
          }, 20000)
        } else {
          const dialogRef = this.dialog.open(PopupComponent, {
            data: { message: 'Unsuccessfully started vacuum' },
          });
        }
    })

  }

  stopVacuum(vacuumId : Number ){
    const token = localStorage.getItem('token');

    if(token){
      // Dekodiranje JWT tokena
      const decodedToken : any  = jwtDecode(token);

      if(!decodedToken.stop){
        const dialogRef = this.dialog.open(PopupComponent, {
          data: { message: 'You don\'t have permission' },
        });
        return;
      }
    }


    axios.put(`http://localhost:8080/vacuums/stop/${vacuumId}`, null ,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response => {
        if(response.data){
          
          const dialogRef = this.dialog.open(PopupComponent, {
            data: { message: 'Successfully stopped vacuum' },
          });


          setTimeout(() => {

            const formatDate = (dateString: string) => {
              if (!dateString) return null;
              const date = new Date(dateString);
              return date.toLocaleDateString("en-US");
            };
  
            const body: {
              userId: Number | null;
              name: string | null;
              status: string | null;
              dateFrom: string | null;
              dateTo: string | null;
            } = {
              userId: this.activateUserId,
              name: this.name,
              status: null,
              dateFrom: formatDate(this.dateFrom),
              dateTo: formatDate(this.dateTo),
            };
  
            let status = "";
            if(this.statusON){
              status = "ON";
            }else if(this.statusOFF){
              status = "OFF"
            }else if(this.statusDISCHARGING){
              status = "DISCHARGING"
            }
  
  
            axios.put('http://localhost:8080/vacuums', body,{
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }).then(response => {
              this.allVacuums = [];
              response.data.forEach((element: any) => {
                const vacuum : VacuumModel = new VacuumModel(element);
                this.allVacuums.push(vacuum);
              });
  
              console.log(this.allVacuums);
            })          
          }, 20000)
        } else {
          const dialogRef = this.dialog.open(PopupComponent, {
            data: { message: 'Unsuccessfully stopped vacuum' },
          });
        }
    })
  }

  dischargeVacuum(vacuumId : Number ){
    const token = localStorage.getItem('token');

    if(token){
      // Dekodiranje JWT tokena
      const decodedToken : any  = jwtDecode(token);

      if(!decodedToken.discharge){
        const dialogRef = this.dialog.open(PopupComponent, {
          data: { message: 'You don\'t have permission' },
        });
        return;
      }
    }

    axios.put(`http://localhost:8080/vacuums/discharge/${vacuumId}`, null ,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response => {
        if(response.data){
          
          const dialogRef = this.dialog.open(PopupComponent, {
            data: { message: 'Successfully discharged vacuum' },
          });

          setTimeout(() => {

            const formatDate = (dateString: string) => {
              if (!dateString) return null;
              const date = new Date(dateString);
              return date.toLocaleDateString("en-US");
            };
  
            const body: {
              userId: Number | null;
              name: string | null;
              status: string | null;
              dateFrom: string | null;
              dateTo: string | null;
            } = {
              userId: this.activateUserId,
              name: this.name,
              status: null,
              dateFrom: formatDate(this.dateFrom),
              dateTo: formatDate(this.dateTo),
            };
  
            let status = "";
            if(this.statusON){
              status = "ON";
            }else if(this.statusOFF){
              status = "OFF"
            }else if(this.statusDISCHARGING){
              status = "DISCHARGING"
            }
  
  
            axios.put('http://localhost:8080/vacuums', body,{
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }).then(response => {
              this.allVacuums = [];
              response.data.forEach((element: any) => {
                const vacuum : VacuumModel = new VacuumModel(element);
                this.allVacuums.push(vacuum);
              });
  
              console.log(this.allVacuums);
            })          
          }, 17500)

          setTimeout(() => {

            const formatDate = (dateString: string) => {
              if (!dateString) return null;
              const date = new Date(dateString);
              return date.toLocaleDateString("en-US");
            };
  
            const body: {
              userId: Number | null;
              name: string | null;
              status: string | null;
              dateFrom: string | null;
              dateTo: string | null;
            } = {
              userId: this.activateUserId,
              name: this.name,
              status: null,
              dateFrom: formatDate(this.dateFrom),
              dateTo: formatDate(this.dateTo),
            };
  
            let status = "";
            if(this.statusON){
              status = "ON";
            }else if(this.statusOFF){
              status = "OFF"
            }else if(this.statusDISCHARGING){
              status = "DISCHARGING"
            }
  
  
            axios.put('http://localhost:8080/vacuums', body,{
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }).then(response => {
              this.allVacuums = [];
              response.data.forEach((element: any) => {
                const vacuum : VacuumModel = new VacuumModel(element);
                this.allVacuums.push(vacuum);
              });
  
              console.log(this.allVacuums);
            })          
          }, 35000)

        } else {
          const dialogRef = this.dialog.open(PopupComponent, {
            data: { message: 'Unsuccessfully discharged vacuum' },
          });
        }
    })
  }

  bookOperation(vacuumId : Number ){
    const dialogRef = this.dialog.open(DatePickerComponent, {
      width: '400px',
      height:'350px',
      data: { vacuumId: vacuumId }, // Prosledite vacuumId kao deo podataka
    });
  }


  //metoda za refresh
  updateData(): void {
    const formatDate = (dateString: string) => {
      if (!dateString) return null;
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US");
    };

    const body: {
      userId: Number | null;
      name: string | null;
      status: string | null;
      dateFrom: string | null;
      dateTo: string | null;
    } = {
      userId: this.activateUserId,
      name: this.name,
      status: null,
      dateFrom: formatDate(this.dateFrom),
      dateTo: formatDate(this.dateTo),
    };

    let status = "";
    if (this.statusON) {
      status = "ON";
    } else if (this.statusOFF) {
      status = "OFF";
    } else if (this.statusDISCHARGING) {
      status = "DISCHARGING";
    }

    axios.put('http://localhost:8080/vacuums', body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response => {
      this.allVacuums = [];
      response.data.forEach((element: any) => {
        const vacuum: VacuumModel = new VacuumModel(element);
        this.allVacuums.push(vacuum);
      });

      console.log(this.allVacuums);
    });
  }

  

}
