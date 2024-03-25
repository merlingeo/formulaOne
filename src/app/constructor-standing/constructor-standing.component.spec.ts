import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorStandingComponent } from './constructor-standing.component';

describe('ConstructorStandingComponent', () => {
  let component: ConstructorStandingComponent;
  let fixture: ComponentFixture<ConstructorStandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstructorStandingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConstructorStandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
