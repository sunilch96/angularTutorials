import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, 
    EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { PostModel } from "../../models/post.model";


export const postsNdEntityDataName = "PostEntity";
@Injectable({
    providedIn:'root'
})
export class PostEntityDataService extends EntityCollectionServiceBase<PostModel>{
    constructor(private serviceElementsFactory : EntityCollectionServiceElementsFactory){
        super(postsNdEntityDataName, serviceElementsFactory);
    }
    
}