import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalStorageService } from 'ngx-webstorage';
import { of } from 'rxjs';
import { DetalleCitaService } from '../../services/detalle-cita.service';

import { DetalleCitasFormularioComponent } from './detalle-citas-formulario.component';

describe('DetalleCitasFormularioComponent', () => {
  let component: DetalleCitasFormularioComponent;
  let fixture: ComponentFixture<DetalleCitasFormularioComponent>;
  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
    dialogRefSpyObj.componentInstance = { body: '' }; // attach componentInstance to the spy object...

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCitasFormularioComponent ],
      providers: [
        DetalleCitaService,
        LocalStorageService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { myData: DetalleCitasFormularioComponent } }
      ],
      imports: [
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatSelectModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCitasFormularioComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
