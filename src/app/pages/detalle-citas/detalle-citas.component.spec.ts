import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCitasComponent } from './detalle-citas.component';

describe('DetalleCitasComponent', () => {
  let component: DetalleCitasComponent;
  let fixture: ComponentFixture<DetalleCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
