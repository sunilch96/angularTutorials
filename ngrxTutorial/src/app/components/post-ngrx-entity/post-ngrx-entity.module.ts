import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AddpostNeComponent } from "./addpost-ngrx-entity/addpost.component";
import { EditpostNeComponent } from "./editpost-ngrx-entity/editpost.component";
import { PostlistNeComponent } from "./postlist-ngrx-entity/postlist.component";
import { PostNeEffects } from "./state-ngrx-entity/post.effects";
import { postNeReducer } from "./state-ngrx-entity/post.reducer";
import { PostNeStateName } from "./state-ngrx-entity/post.selector";
import { PostDetailsNeComponent } from './post-details-ngrx-entity/post-details.component';

const postNgrxEntityRoutes : Routes = [
    {
        path:"",
        component: PostlistNeComponent,
        children:[
        {
            path:'addpost', component:AddpostNeComponent
        },
        {
            path:'editpost/:id', component:EditpostNeComponent
        }
        ]
    }
]
@NgModule({
    declarations:[
        PostlistNeComponent,
        AddpostNeComponent,
        EditpostNeComponent,
        PostDetailsNeComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(postNgrxEntityRoutes),
        StoreModule.forFeature(PostNeStateName, postNeReducer),
        EffectsModule.forFeature([PostNeEffects])
    ]
})
export class PostNeModule{

}