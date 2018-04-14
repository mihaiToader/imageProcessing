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
    return this.http.get(`${this.apiUrl}/img`).toPromise();
  }

  getSecondImage(): Promise<any> {
    return this.http.get(`${this.apiUrl}/img/getSecond`).toPromise();
  }

  getModified(): Promise<any> {
    return this.http.get(`${this.apiUrl}/img/modified`).toPromise();
  }

  getInvert(): Promise<any> {
    return this.http.get(`${this.apiUrl}/img/invert`).toPromise();
  }

  getGrayscale(): Promise<any> {
    return this.http.get(`${this.apiUrl}/img/grayscale`).toPromise();
  }

  getNormalize(): Promise<any> {
    return this.http.get(`${this.apiUrl}/img/normalize`).toPromise();
  }

  getDither565(): Promise<any> {
    return this.http.get(`${this.apiUrl}/img/dither565`).toPromise();
  }

  getChangeColors(): Promise<any> {
    return this.http.get(`${this.apiUrl}/img/changeColors`).toPromise();
  }

  switchImages(): Promise<any> {
    return this.http.get(`${this.apiUrl}/img/switch`).toPromise();
  }

  switchImages2(): Promise<any> {
    return this.http.get(`${this.apiUrl}/img/switch2`).toPromise();
  }

  findDifferences(): Promise<any> {
    return this.http.get(`${this.apiUrl}/img/findDifferences`).toPromise();
  }

  gaussian(nrPixels: number): Promise<any> {
    return this.http.get(`${this.apiUrl}/img/gaussian/${nrPixels}`).toPromise();
  }

  pixelate(nrPixels: number): Promise<any> {
    return this.http.get(`${this.apiUrl}/img/pixelate/${nrPixels}`).toPromise();
  }

  noiseReduction(vmin: number, a: number, b: number, L: number): Promise<any> {
    return this.http.get(`${this.apiUrl}/img/noiseReduction/${vmin}/${a}/${b}/${L}`).toPromise();
  }

  inversareContrast(w: number): Promise<any> {
    return this.http.get(`${this.apiUrl}/img/inversareContrast/${w}`).toPromise();
  }

  filtrareDir(w: number): Promise<any> {
    return this.http.get(`${this.apiUrl}/img/filtrareDire/${w}`).toPromise();
  }

  scale(f: number): Promise<any> {
    return this.http.get(`${this.apiUrl}/img/scale/${f}`).toPromise();
  }
}
