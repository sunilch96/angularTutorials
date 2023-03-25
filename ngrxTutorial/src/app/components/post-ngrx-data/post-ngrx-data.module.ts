import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AddpostNdComponent } from "./addpost-ngrx-data/addpost.component";
import { EditpostNdComponent } from "./editpost-ngrx-data/editpost.component";
import { PostlistNdComponent } from "./postlist-ngrx-data/postlist.component";
import { PostDetailsNdComponent } from './post-details-ngrx-data/post-details.component';
import { PostsEntityDataService } from "./state/post.data.service";
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from "@ngrx/data";
import { PostEntityDataResolver } from "./state/post.entity.data.resolver";
import { postsNdEntityDataName } from "./state/post.entity.data.service";
import { PostModel } from "../models/post.model";

const postNgrxDataRoutes : Routes = [
    {
        path:"",
        component: PostlistNdComponent,
        resolve : {PostEntity: PostEntityDataResolver},
        children:[
        {
            path:'addpost', component:AddpostNdComponent
        },
        {
            path:'editpost/:id', component:EditpostNdComponent
        }
        ]
    }
]
@NgModule({
    declarations:[
        PostlistNdComponent,
        AddpostNdComponent,
        EditpostNdComponent,
        PostDetailsNdComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(postNgrxDataRoutes),
    ],
    providers:[PostEntityDataResolver, PostsEntityDataService]
})
export class PostNdModule{
    constructor(
        eds: EntityDefinitionService,
        entityDataService: EntityDataService,
        postsDataService : PostsEntityDataService){
          eds.registerMetadataMap(_entityMetaData);
          entityDataService.registerService(postsNdEntityDataName, postsDataService)
      }
}

//Post entity meta data
const _entityMetaData : EntityMetadataMap = {
    [postsNdEntityDataName]:{
        //sortComparer : sortByName,

        // entityDispatcherOptions:{
        //     optimisticUpdate:true,
        //     optimisticDelete:false
        // }
    },
};

//can you comparer to sort by required col
function sortByName(a:PostModel, b:PostModel):number{
    let comp = a.title.localeCompare(b.title);
    return comp;
}