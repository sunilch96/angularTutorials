import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpostNdComponent } from './addpost.component';

describe('AddpostNdComponent', () => {
  let component: AddpostNdComponent;
  let fixture: ComponentFixture<AddpostNdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpostNdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddpostNdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
