import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpetasAddComponent } from './carpetas-add.component';

describe('CarpetasAddComponent', () => {
  let component: CarpetasAddComponent;
  let fixture: ComponentFixture<CarpetasAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarpetasAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarpetasAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
