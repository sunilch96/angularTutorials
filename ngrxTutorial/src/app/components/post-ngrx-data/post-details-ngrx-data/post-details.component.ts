import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostModel } from '../../models/post.model';
import { PostEntityDataService } from '../state/post.entity.data.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsNdComponent implements OnInit{
  constructor(private postEntityDataService : PostEntityDataService,
    private currentRoute : ActivatedRoute){}
  ngOnInit(): void {
    this.postId = this.currentRoute.snapshot.params['id'];  
    this.postEntityDataService.entities$.subscribe(posts=>{    
      const _postById = posts.find(x=> x.id == this.postId);
      if(_postById != undefined){
       this.postData = _postById;
      }
    });
  }
  postId:number;
  postData: PostModel;
}
