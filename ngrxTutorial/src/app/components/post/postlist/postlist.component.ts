import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { PostModel } from '../../models/post.model';
import { DeletePostAction, LoadPostAction } from '../state/post.actions';
import { getPostStateSelector } from '../state/post.selector';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostlistComponent implements OnInit{
  constructor(private storeService : Store<AppState>){   
  }
  ngOnInit(): void {
    this.postList$ = this.storeService.select(getPostStateSelector);
    this.storeService.dispatch(LoadPostAction());
  }
  postList$ : Observable<PostModel[]>;
  deletePost(postId:number){
    if(confirm("Proceed to delete this post?")){
      this.storeService.dispatch(DeletePostAction({id:postId}));
    }
  }
}
