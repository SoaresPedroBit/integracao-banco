import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveProcessoComponent } from './save-processo.component';

describe('SaveProcessoComponent', () => {
  let component: SaveProcessoComponent;
  let fixture: ComponentFixture<SaveProcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveProcessoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
