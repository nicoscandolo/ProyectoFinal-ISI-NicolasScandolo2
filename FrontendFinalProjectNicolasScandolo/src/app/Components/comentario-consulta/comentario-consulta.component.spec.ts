import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarioConsultaComponent } from './comentario-consulta.component';

describe('ComentarioConsultaComponent', () => {
  let component: ComentarioConsultaComponent;
  let fixture: ComponentFixture<ComentarioConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComentarioConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentarioConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
