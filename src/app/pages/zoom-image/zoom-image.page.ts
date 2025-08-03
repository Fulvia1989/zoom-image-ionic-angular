import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonHeader, IonTitle,IonButton,SegmentCustomEvent, IonToolbar,IonButtons,IonMenuButton,IonSegment,IonSegmentButton,IonLabel } from '@ionic/angular/standalone';
import {
  ZoomImageClickService,
  ZoomImageHoverService,
  ZoomImageMoveService,
  ZoomImageWheelService,
} from '@zoom-image/angular';
import {
  ZoomImageClickState,
  ZoomImageHoverState,
  ZoomImageMoveState,
  ZoomImageWheelState,
  cropImage,
} from '@zoom-image/core';

type Tab = {
  name: string;
  current: boolean;
  value: ZoomType;
};
type ZoomType = 'wheel' | 'hover' | 'move' | 'click';
const sleep = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));

@Component({
  selector: 'app-zoom-image',
  templateUrl: './zoom-image.page.html',
  styleUrls: ['./zoom-image.page.scss'],
  standalone: true,
  providers: [
    ZoomImageClickService,
    ZoomImageHoverService,
    ZoomImageMoveService,
    ZoomImageWheelService,
  ],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton,IonButtons,IonMenuButton,IonSegment,IonSegmentButton,IonLabel]
})
export class ZoomImagePage implements OnInit {

  private zoomImageWheelService = inject(ZoomImageWheelService);
  private zoomImageHoverService = inject(ZoomImageHoverService);
  private zoomImageMoveService = inject(ZoomImageMoveService);
  private zoomImageClickService = inject(ZoomImageClickService);

  zoomImageWheelState: ZoomImageWheelState =
    this.zoomImageWheelService.zoomImageState;
     zoomImageHoverState: ZoomImageHoverState =
    this.zoomImageHoverService.zoomImageState;
  zoomImageMoveState: ZoomImageMoveState =
    this.zoomImageMoveService.zoomImageState;
  zoomImageClickState: ZoomImageClickState =
    this.zoomImageClickService.zoomImageState;

  croppedImage: string = '';
  zoomType: ZoomType = 'wheel';
  tabs: Tab[] = [
    { name: 'Wheel', current: true, value: 'wheel' },
    { name: 'Hover', current: false, value: 'hover' },
    { name: 'Move', current: false, value: 'move' },
    { name: 'Click', current: false, value: 'click' },
  ];

  @ViewChild('imageWheelContainer')
  imageWheelContainerRef?: ElementRef<HTMLDivElement>;
  @ViewChild('imageHoverContainer')
  imageHoverContainerRef?: ElementRef<HTMLDivElement>;
  @ViewChild('imageMoveContainer')
  imageMoveContainerRef?: ElementRef<HTMLDivElement>;
  @ViewChild('imageClickContainer')
  imageClickContainerRef?: ElementRef<HTMLDivElement>;
  @ViewChild('zoomTarget') zoomTargetRef?: ElementRef<HTMLDivElement>;
  constructor() { }

  ngAfterViewInit(): void {
    if (this.imageWheelContainerRef) {
      this.zoomImageWheelService.createZoomImage(
        this.imageWheelContainerRef.nativeElement
      );
      this.zoomImageWheelService.zoomImageState$.subscribe((state) => {
        this.zoomImageWheelState = state;
      });
    }
  }

  ngOnInit() {
  }

  async handleTabClick(e:SegmentCustomEvent) {

    const value = e.detail.value as ZoomType;
    if (value === this.zoomType) {
      return;
    }

    this.croppedImage = '';
    this.tabs.forEach((tab) => {
      tab.current = tab.value === value ? true: false;
    });
    this.zoomType = value;

    await sleep();

    const handlers: Record<ZoomType, () => void> = {
      wheel: () => {
        this.zoomImageWheelService.createZoomImage(
          this.imageWheelContainerRef?.nativeElement as HTMLDivElement
        );
        this.zoomImageWheelService.zoomImageState$.subscribe((state) => {
          this.zoomImageWheelState = state;
        });
      },
      hover: () => {
        this.zoomImageHoverService.createZoomImage(
          this.imageHoverContainerRef?.nativeElement as HTMLDivElement,
          {
            zoomImageSource: '/assets/baloons.jpg',
            customZoom: { width: 500, height: 300 },
            zoomTarget: this.zoomTargetRef?.nativeElement as HTMLDivElement,
            scale: 3,
          }
        );
        this.zoomImageHoverService.zoomImageState$.subscribe((state) => {
          this.zoomImageHoverState = state;
        });
        this.zoomImageWheelService.createZoomImage(
          this.imageHoverContainerRef?.nativeElement as HTMLDivElement
        );
        this.zoomImageWheelService.zoomImageState$.subscribe((state) => {
          this.zoomImageWheelState = state;
        });
      },
      move: () => {
        this.zoomImageMoveService.createZoomImage(
          this.imageMoveContainerRef?.nativeElement as HTMLDivElement,
          {
            zoomImageSource: '/assets/baloons.jpg',
          }
        );
        this.zoomImageMoveService.zoomImageState$.subscribe((state) => {
          this.zoomImageMoveState = state;
        });
      },
      click: () => {
        this.zoomImageClickService.createZoomImage(
          this.imageClickContainerRef?.nativeElement as HTMLDivElement,
          {
            zoomImageSource: '/assets/baloons.jpg',
          }
        );
        this.zoomImageClickService.zoomImageState$.subscribe((state) => {
          this.zoomImageClickState = state;
        });
      },
    };

    handlers[value]();
  }

  getCurrentZoomImageValue() {
    return `${Math.round(this.zoomImageWheelState.currentZoom * 100)}%`;
  }

  zoomIn() {
    this.zoomImageWheelService.setZoomImageState({
      currentZoom: this.zoomImageWheelState.currentZoom + 0.5,
    });
  }

  zoomOut() {
    this.zoomImageWheelService.setZoomImageState({
      currentZoom: this.zoomImageWheelState.currentZoom - 0.5,
    });
  }
  
  rotate = () => {
    this.zoomImageWheelService.setZoomImageState({
      currentRotation: this.zoomImageWheelState.currentRotation + 90,
    });

    if (this.croppedImage) {
      this.handleCropWheelZoomImage();
    }
  };


  async handleCropWheelZoomImage() {
    this.croppedImage = await cropImage({
      currentZoom: this.zoomImageWheelState.currentZoom,
      image: (
        this.imageWheelContainerRef?.nativeElement as HTMLDivElement
      ).querySelector('img') as HTMLImageElement,
      positionX: this.zoomImageWheelState.currentPositionX,
      positionY: this.zoomImageWheelState.currentPositionY,
      rotation: this.zoomImageWheelState.currentRotation,
    });
  }

}
