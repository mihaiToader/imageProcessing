import { Component, OnInit } from '@angular/core';
import {ImageService} from '@app/service';

@Component({
  selector: 'app-full-image',
  templateUrl: './full-image.component.html',
  styleUrls: ['./full-image.component.css']
})
export class FullImageComponent implements OnInit {
  imageToShow: any;
  loading = false;
  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.getCurrentImage();
  }

  getCurrentImage() {
    this.loading = true;
    this.imageService.getModified()
      .then((res) => {
        this.loading = false;
        if (res.status === 'ok') {
          this.imageToShow = res.img;
        }
      })
      .catch((err) => {
        this.loading = false;
        console.log(err);
      });
  }
}
