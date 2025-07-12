import { SessionStorageService } from './session-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  //injection
  private router = inject(Router);

  //life cycle
  constructor() { }

  //methods
  handleErrorWithMessage (message: string): void {
    let lang = localStorage.getItem('lang') || 'en';
    Swal.fire({
      icon: 'error',
      title: message,
      confirmButtonText: lang == 'ar' ? 'موافق' : 'Ok'
    })
  }
  handleError(error: HttpErrorResponse): void {
    switch (error.status) {
      case 401:
      case 300:
      case 400:
        this.handleErrorWithMessage(error.message);
        break;
      case 404:
        this.router.navigate(['/not-found']);
    }
  }
}
