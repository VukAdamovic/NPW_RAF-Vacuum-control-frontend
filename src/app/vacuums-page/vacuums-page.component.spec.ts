import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacuumsPageComponent } from './vacuums-page.component';

describe('VacuumsPageComponent', () => {
  let component: VacuumsPageComponent;
  let fixture: ComponentFixture<VacuumsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VacuumsPageComponent]
    });
    fixture = TestBed.createComponent(VacuumsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
