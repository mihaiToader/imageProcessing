import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { environment } from '@env/environment';

@Injectable()
export class ImageService {
  private apiUrl: string;

  constructor(private http: HttpClient,
              private router: Router) {
    this.apiUrl = environment.apiUrl;
  }

  getImage(): Promise<any> {
    console.log('asdsad');
    return this.http.get(`${this.apiUrl}/img`).toPromise();
  }
}
