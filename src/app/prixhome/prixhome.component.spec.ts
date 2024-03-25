import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrixhomeComponent } from './prixhome.component';

describe('PrixhomeComponent', () => {
  let component: PrixhomeComponent;
  let fixture: ComponentFixture<PrixhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrixhomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrixhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
