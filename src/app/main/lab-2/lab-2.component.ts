import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageService } from '@app/service';

@Component({
  selector: 'app-lab-2',
  templateUrl: './lab-2.component.html',
  styleUrls: ['./lab-2.component.css']
})
export class Lab2Component implements OnInit {
  @Input() loading = false;
  @Output() loadingChange: EventEmitter<any>;
  @Input() imageToShow: any;
  @Output() imageToShowChange: EventEmitter<any>;
  nrPixels = 0;

  constructor(private imageService: ImageService) {
    this.loadingChange = new EventEmitter<any>();
    this.imageToShowChange = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  setLoading(value: boolean) {
    this.loading = value;
    this.loadingChange.emit(this.loading);
  }

  setImageToShow(value: any) {
    this.imageToShow = value;
    this.imageToShowChange.emit(this.imageToShow);
  }

  getDifferences() {
    this.setLoading(true);
    this.imageService.findDifferences()
      .then((res) => {
        if (res.status === 'ok') {
          this.setImageToShow(res.img);
        }
        this.setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        this.setLoading(false);
      });
  }

  getGaussian() {
    this.setLoading(true);
    this.imageService.gaussian(this.nrPixels)
      .then((res) => {
        if (res.status === 'ok') {
          this.setImageToShow(res.img);
        }
        this.setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        this.setLoading(false);
      });
  }

  getPixelate() {
    this.setLoading(true);
    this.imageService.pixelate(this.nrPixels)
      .then((res) => {
        if (res.status === 'ok') {
          this.setImageToShow(res.img);
        }
        this.setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        this.setLoading(false);
      });
  }
}
