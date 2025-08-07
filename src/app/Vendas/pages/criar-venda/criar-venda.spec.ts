import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarVenda } from './criar-venda';

describe('CriarVenda', () => {
  let component: CriarVenda;
  let fixture: ComponentFixture<CriarVenda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarVenda]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarVenda);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
