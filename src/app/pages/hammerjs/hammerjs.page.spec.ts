import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HammerjsPage } from './hammerjs.page';

describe('HammerjsPage', () => {
  let component: HammerjsPage;
  let fixture: ComponentFixture<HammerjsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HammerjsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
