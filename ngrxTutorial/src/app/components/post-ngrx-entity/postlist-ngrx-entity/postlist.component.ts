import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { PostModel } from '../../models/post.model';
import { DeletePostNeAction, LoadPostNeAction } from '../state-ngrx-entity/post.actions';
import { getPostCountStateSelector, getPostStateAllEntitiesSelector, getPostStateEntitiesSelector } from '../state-ngrx-entity/post.selector';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostlistNeComponent implements OnInit{
  constructor(private storeService : Store<AppState>){   
  }
  ngOnInit(): void {
    //load data to state
    this.storeService.dispatch(LoadPostNeAction());
    //get data from state after loading
    this.postList$ = this.storeService.select(getPostStateAllEntitiesSelector);
    this.postCount$ = this.storeService.select(getPostCountStateSelector);    
  }
  postList$ : Observable<PostModel[]>;
  postCount$ : Observable<number>;
  deletePost(postId:number){
    if(confirm("Proceed to delete this post?")){
      this.storeService.dispatch(DeletePostNeAction({id:postId}));
    }
  }
}
