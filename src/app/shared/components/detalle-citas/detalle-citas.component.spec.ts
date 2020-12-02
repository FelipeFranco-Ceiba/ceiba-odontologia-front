import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { DetalleCitaService } from 'src/app/core/services/detalle-cita.service';
import { DetalleCitasFormularioComponent } from './detalle-citas-formulario/detalle-citas-formulario.component';

import { DetalleCitasComponent } from './detalle-citas.component';

describe('DetalleCitasComponent', () => {
  let component: DetalleCitasComponent;
  let dialogSpy: jasmine.Spy;
  let fixture: ComponentFixture<DetalleCitasComponent>;
  const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCitasComponent ],
      providers: [
        DetalleCitaService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { myData: DetalleCitasFormularioComponent } }
      ],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatCardModule,
        MatTableModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCitasComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
