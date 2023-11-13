import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistryOfDefenseComponent } from './ministry-of-defense.component';

describe('MinistryOfDefenseComponent', () => {
  let component: MinistryOfDefenseComponent;
  let fixture: ComponentFixture<MinistryOfDefenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinistryOfDefenseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinistryOfDefenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
