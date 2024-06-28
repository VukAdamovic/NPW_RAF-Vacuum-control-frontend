import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVacuumPageComponent } from './create-vacuum-page.component';

describe('CreateVacuumPageComponent', () => {
  let component: CreateVacuumPageComponent;
  let fixture: ComponentFixture<CreateVacuumPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateVacuumPageComponent]
    });
    fixture = TestBed.createComponent(CreateVacuumPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
