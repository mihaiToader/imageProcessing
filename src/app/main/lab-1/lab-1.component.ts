import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageService } from '@app/service';

@Component({
  selector: 'app-lab-1',
  templateUrl: './lab-1.component.html',
  styleUrls: ['./lab-1.component.css'],
})
export class Lab1Component implements OnInit {
  @Input() loading = false;
  @Output() loadingChange: EventEmitter<any>;
  @Input() imageToShow: any;
  @Output() imageToShowChange: EventEmitter<any>;

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

  getInvertImage() {
    this.setLoading(true);
    this.imageService.getInvert()
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

  getGrayscaleImage() {
    this.setLoading(true);
    this.imageService.getGrayscale()
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

  getNormalize() {
    this.setLoading(true);
    this.imageService.getNormalize()
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

  getDither565() {
    this.setLoading(true);
    this.imageService.getDither565()
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

  getChangeColors() {
    this.setLoading(true);
    this.imageService.getChangeColors()
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
