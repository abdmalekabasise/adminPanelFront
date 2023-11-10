import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpanelComponent } from './opanel.component';

describe('OpanelComponent', () => {
  let component: OpanelComponent;
  let fixture: ComponentFixture<OpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
