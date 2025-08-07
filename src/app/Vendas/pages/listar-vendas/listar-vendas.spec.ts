import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarVendas } from './listar-vendas';

describe('ListarVendas', () => {
  let component: ListarVendas;
  let fixture: ComponentFixture<ListarVendas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarVendas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarVendas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
