import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostlistNdComponent } from './postlist.component';

describe('PostlistNdComponent', () => {
  let component: PostlistNdComponent;
  let fixture: ComponentFixture<PostlistNdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostlistNdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostlistNdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
