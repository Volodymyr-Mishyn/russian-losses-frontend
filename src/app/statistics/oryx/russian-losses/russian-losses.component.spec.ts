import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RussianLossesComponent } from './russian-losses.component';

describe('RussianLossesComponent', () => {
  let component: RussianLossesComponent;
  let fixture: ComponentFixture<RussianLossesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RussianLossesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RussianLossesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
