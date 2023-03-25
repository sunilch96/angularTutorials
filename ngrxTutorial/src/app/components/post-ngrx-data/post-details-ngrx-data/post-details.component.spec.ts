import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailsNdComponent } from './post-details.component';

describe('PostDetailsNdComponent', () => {
  let component: PostDetailsNdComponent;
  let fixture: ComponentFixture<PostDetailsNdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostDetailsNdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDetailsNdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
