import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class LoggedInService {
  private isTokenAvailableSubject = new BehaviorSubject<boolean>(localStorage.getItem('token') ? true : false);  
  isTokenAvailable$ = this.isTokenAvailableSubject.asObservable();
  
  private firstNameSubject = new BehaviorSubject<string | null>(this.getActiveUser()?.firstName || null);
  firstName$ = this.firstNameSubject.asObservable();

  private lastNameSubject = new BehaviorSubject<string | null>(this.getActiveUser()?.lastName || null);
  lastName$ = this.lastNameSubject.asObservable();

  updateTokenVisibility(isAvailable : boolean){
      this.isTokenAvailableSubject.next(isAvailable);

      if (isAvailable) {
      const activeUser = this.getActiveUser();
      this.firstNameSubject.next(activeUser?.firstName || null);
      this.lastNameSubject.next(activeUser?.lastName || null);
    }
  }

  private getActiveUser() {
    const activeUserString = localStorage.getItem('activeUser');
    return activeUserString ? JSON.parse(activeUserString) : null;
  }
}
