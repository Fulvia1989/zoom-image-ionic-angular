import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZoomImagePage } from './zoom-image.page';

describe('ZoomImagePage', () => {
  let component: ZoomImagePage;
  let fixture: ComponentFixture<ZoomImagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
