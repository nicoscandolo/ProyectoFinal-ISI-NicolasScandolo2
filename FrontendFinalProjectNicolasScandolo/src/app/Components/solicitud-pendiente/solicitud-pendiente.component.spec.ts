import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudPendienteComponent } from './solicitud-pendiente.component';

describe('SolicitudPendienteComponent', () => {
  let component: SolicitudPendienteComponent;
  let fixture: ComponentFixture<SolicitudPendienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudPendienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudPendienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
