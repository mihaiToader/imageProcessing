import { Component, OnInit } from '@angular/core';
import { ImageService } from '@app/service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  loading = false;
  imageToShow: any;
  originalImage: any;
  secondOriginalImage: any;
  labs: any;
  displayedLabIndex: number;
  showSecondImage = false;
  urlUploadImage = 'http://localhost:3000/img/setImage';
  imageToUpload = 1;
  notification = '';

  constructor(private imageService: ImageService) {
    this.labs = ['', 'hidden', 'hidden'];
    this.displayedLabIndex = 0;
  }

  ngOnInit() {
    this.getCurrentImage();
    this.getSecondImage();
    this.getModfiedImage();
  }

  changeShowSecondImage() {
    this.showSecondImage = ! this.showSecondImage;
  }

  displayLab(index: number) {
    this.labs[this.displayedLabIndex] = 'hidden';
    this.labs[index - 1] = '';
    this.displayedLabIndex = index - 1;
  }

  switchImages() {
    const aux = this.imageToShow;
    this.imageToShow = this.originalImage;
    this.originalImage = aux;
    this.imageService.switchImages()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  switchImages2() {
    const aux = this.originalImage;
    this.originalImage = this.secondOriginalImage;
    this.secondOriginalImage = aux;
    this.imageService.switchImages2()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  loadImage(value: number) {
    switch (value) {
      case 1:
        this.urlUploadImage = 'http://localhost:3000/img/setImage';
        break;
      case 2:
        this.urlUploadImage = 'http://localhost:3000/img/setSecondImage';
        break;
      default:
        console.log('error');
    }
    this.imageToUpload = value;
  }

  getCurrentImage() {
    this.loading = true;
    this.imageService.getImage()
      .then((res) => {
        console.log(res);
        if (res.status === 'ok') {
          this.imageToShow = res.img;
          this.originalImage = res.img;
        }
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.notification = err.message;
      });
  }

  getSecondImage() {
    this.loading = true;
    this.imageService.getSecondImage()
      .then((res) => {
        console.log(res);
        if (res.status === 'ok') {
          this.secondOriginalImage = res.img;
        }
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        console.log(err);
        this.notification = err.message;
      });
  }

  getModfiedImage() {
    this.loading = true;
    this.imageService.getModified()
      .then((res) => {
        console.log(res);
        if (res.status === 'ok') {
          this.imageToShow = res.img;
        }
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        console.log(err);
        this.notification = err.message;
      });
  }

  uploadFinished($event) {
    switch (this.imageToUpload) {
      case 1:
        this.getCurrentImage();
        break;
      case 2:
        this.getSecondImage();
        break;
      default:
        console.log('error');
    }
  }

}
