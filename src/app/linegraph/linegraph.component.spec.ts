import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinegraphComponent } from './linegraph.component';

describe('LinegraphComponent', () => {
  let component: LinegraphComponent;
  let fixture: ComponentFixture<LinegraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinegraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinegraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
