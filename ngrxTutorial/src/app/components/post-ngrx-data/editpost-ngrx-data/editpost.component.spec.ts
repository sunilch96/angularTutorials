import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpostNdComponent } from './editpost.component';

describe('EditpostNdComponent', () => {
  let component: EditpostNdComponent;
  let fixture: ComponentFixture<EditpostNdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditpostNdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditpostNdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
