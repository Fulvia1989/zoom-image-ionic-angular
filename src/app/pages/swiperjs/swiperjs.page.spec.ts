import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwiperjsPage } from './swiperjs.page';

describe('SwiperjsPage', () => {
  let component: SwiperjsPage;
  let fixture: ComponentFixture<SwiperjsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiperjsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
