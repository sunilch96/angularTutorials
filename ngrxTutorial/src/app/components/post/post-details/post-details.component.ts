import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { PostModel } from '../../models/post.model';
import { getPostStateByIdSelector } from '../state/post.selector';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit{
  constructor(private store: Store<AppState>){}
  ngOnInit(): void {
    this.postData = this.store.select(getPostStateByIdSelector)
  }
  postData: Observable<PostModel>;
}
