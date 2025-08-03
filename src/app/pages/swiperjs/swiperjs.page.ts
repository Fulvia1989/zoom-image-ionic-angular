import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons,IonMenuButton,IonFooter } from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';

register();

@Component({
  selector: 'app-swiperjs',
  templateUrl: './swiperjs.page.html',
  styleUrls: ['./swiperjs.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons,IonMenuButton,IonFooter]
})
export class SwiperjsPage implements OnInit {

  currentZoomRatio = 1;

  config: SwiperOptions = {
    zoom: {
      maxRatio: 5,
      minRatio: 0.5,
      
    }
  }
  @ViewChild('swiper') swiper!: ElementRef<any>;


  constructor() { }

  ngOnInit() {
  }

  zoom(zoomIn: boolean) {
    const zoom = this.swiper.nativeElement.swiper.zoom;
    if(zoomIn){
      this.currentZoomRatio < 5 ? this.currentZoomRatio+=0.5 : this.currentZoomRatio; 
      zoom.in(this.currentZoomRatio) 
    }else{
      this.currentZoomRatio = 0.5;
      zoom.out();
    }
  }

}
