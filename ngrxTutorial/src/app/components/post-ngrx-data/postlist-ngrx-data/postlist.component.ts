import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PostModel } from '../../models/post.model';
import { PostEntityDataService } from '../state/post.entity.data.service';
@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostlistNdComponent implements OnInit{
  constructor(private postEntityDataService : PostEntityDataService){
  }
  ngOnInit(): void {
    //ngrx entity data
    this.postListNd$ = this.postEntityDataService.entities$;
  }
  postListNd$ : Observable<PostModel[]>; 
  deletePost(event:Event, postId:number){
    event.preventDefault();
    if(confirm("Proceed to delete this post?")){
     this.postEntityDataService.delete(postId);
    }
  }
}
