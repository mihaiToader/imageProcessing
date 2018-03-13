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

  constructor(private imageService: ImageService) {
  }

  ngOnInit() {
  }

  getCurrentImage($event) {
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
        console.log(err);
      });
  }

  getInvertImage() {
    this.loading = true;
    this.imageService.getInvert()
      .then((res) => {
        if (res.status === 'ok') {
          this.imageToShow = res.img;
        }
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  }

  getGrayscaleImage() {
    this.loading = true;
    this.imageService.getGrayscale()
      .then((res) => {
        if (res.status === 'ok') {
          this.imageToShow = res.img;
        }
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  }

  getNormalize() {
    this.loading = true;
    this.imageService.getNormalize()
      .then((res) => {
        if (res.status === 'ok') {
          this.imageToShow = res.img;
        }
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  }

  getDither565() {
    this.loading = true;
    this.imageService.getDither565()
      .then((res) => {
        if (res.status === 'ok') {
          this.imageToShow = res.img;
        }
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  }

  getChangeColors() {
    this.loading = true;
    this.imageService.getChangeColors()
      .then((res) => {
        if (res.status === 'ok') {
          this.imageToShow = res.img;
        }
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  }

}
