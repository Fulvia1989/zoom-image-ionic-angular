import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonButton,IonIcon, IonFooter } from '@ionic/angular/standalone';
import { ZoomPanDirective } from 'src/app/pages/hammerjs/zoom-pan.directive';

@Component({
  selector: 'app-hammerjs',
  templateUrl: './hammerjs.page.html',
  styleUrls: ['./hammerjs.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonButton,IonIcon, IonFooter, ZoomPanDirective]
})
export class HammerjsPage implements OnInit {

  @ViewChild('image') image!: ElementRef<any>;

  scale = 1;


  constructor() { }

  ngOnInit() {
  }

  zoom(zoomIn:boolean){
    if(zoomIn){
     this.scale < 5 ? this.scale +=0.5 : null;
    }else{
     this.scale > 0.5 ? this.scale -=0.5 : null;
    }
    let  transform = `translate3d(0, 0, 0) ` +
                      `scale3d(${this.scale}, ${this.scale}, ${this.scale}) `;
    this.image.nativeElement.style.webkitTransform = transform;
  }

}
