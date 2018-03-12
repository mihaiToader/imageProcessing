import { Component, OnInit } from '@angular/core';
import { ImageService } from '@app/service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  isImageLoading: boolean;
  imageToShow: any;

  constructor(private imageService: ImageService) {
    this.showImage();
  }

  ngOnInit() {
  }

  showImage() {
    this.isImageLoading = true;
    this.imageService.getImage()
      .then((res) => {
        console.log(res);
        this.imageToShow = res.img;
        // this.isImageLoading = false;
      })
      .catch((err) => {
        // this.isImageLoading = false;
        console.log(err);
      });
  }
}
