import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVenda } from './editar-venda';

describe('EditarVenda', () => {
  let component: EditarVenda;
  let fixture: ComponentFixture<EditarVenda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarVenda]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarVenda);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
