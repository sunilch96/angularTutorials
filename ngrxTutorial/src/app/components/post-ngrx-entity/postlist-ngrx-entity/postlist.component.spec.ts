import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostlistNeComponent } from './postlist.component';

describe('PostlistNeComponent', () => {
  let component: PostlistNeComponent;
  let fixture: ComponentFixture<PostlistNeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostlistNeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostlistNeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
