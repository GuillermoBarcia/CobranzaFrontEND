import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificacionCitaComponent } from './planificacion-cita.component';

describe('PlanificacionCitaComponent', () => {
  let component: PlanificacionCitaComponent;
  let fixture: ComponentFixture<PlanificacionCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanificacionCitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanificacionCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
