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

  labs: any;
  displayedLabIndex: number;

  constructor(private imageService: ImageService) {
    this.labs = ['', 'hidden'];
    this.displayedLabIndex = 0;
  }

  ngOnInit() {
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



}
