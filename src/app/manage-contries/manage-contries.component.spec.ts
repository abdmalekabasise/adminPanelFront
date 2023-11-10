import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageContriesComponent } from './manage-contries.component';

describe('ManageContriesComponent', () => {
  let component: ManageContriesComponent;
  let fixture: ComponentFixture<ManageContriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageContriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageContriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
