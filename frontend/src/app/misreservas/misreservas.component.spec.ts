import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisreservasComponent } from './misreservas.component';

describe('MisreservasComponent', () => {
  let component: MisreservasComponent;
  let fixture: ComponentFixture<MisreservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisreservasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisreservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
