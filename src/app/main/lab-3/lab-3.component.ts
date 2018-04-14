import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageService} from '@app/service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lab-3',
  templateUrl: './lab-3.component.html',
  styleUrls: ['./lab-3.component.css']
})
export class Lab3Component implements OnInit {

  @Input() loading = false;
  @Output() loadingChange: EventEmitter<any>;
  @Input() imageToShow: any;
  @Output() imageToShowChange: EventEmitter<any>;
  w = 4;

  constructor(private imageService: ImageService,
              private router: Router) {
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

  inversareContrast() {
    this.setLoading(true);
    this.imageService.inversareContrast(this.w)
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

  scale() {
    this.setLoading(true);
    this.imageService.scale(this.w)
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

  filtrareDire() {
    this.setLoading(true);
    this.imageService.filtrareDir(this.w)
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
