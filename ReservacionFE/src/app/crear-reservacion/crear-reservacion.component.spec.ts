import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearReservacionComponent } from './crear-reservacion.component';

describe('CrearReservacionComponent', () => {
  let component: CrearReservacionComponent;
  let fixture: ComponentFixture<CrearReservacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearReservacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearReservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
