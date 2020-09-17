import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaAddComponent } from './consulta-add.component';

describe('ConsultaAddComponent', () => {
  let component: ConsultaAddComponent;
  let fixture: ComponentFixture<ConsultaAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
