import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ClienteComponent } from './cliente.component';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { ClienteFormularioComponent } from './cliente-formulario/cliente-formulario.component';

describe('ClienteComponent', () => {
  let component: ClienteComponent;
  let dialogSpy: jasmine.Spy;
  let fixture: ComponentFixture<ClienteComponent>;
  const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };

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
        MatDialogModule,
        MatCardModule,
        MatTableModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
