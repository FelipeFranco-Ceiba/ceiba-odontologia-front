import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../../models/cliente.model';

import { ClienteComponent } from './cliente.component';
import { ClienteFormularioComponent } from './cliente-formulario/cliente-formulario.component';
import { of } from 'rxjs';

describe('ClienteComponent', () => {
  let component: ClienteComponent;
  let dialogSpy: jasmine.Spy;
  let fixture: ComponentFixture<ClienteComponent>;
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
    dialogRefSpyObj.componentInstance = { body: '' }; // attach componentInstance to the spy object...

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClienteComponent],
      providers: [
        ClienteService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { myData: ClienteFormularioComponent } }
      ],
      imports: [
        HttpClientTestingModule,
        MatDialogModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
