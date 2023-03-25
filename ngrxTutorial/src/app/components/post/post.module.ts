import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AddpostComponent } from "./addpost/addpost.component";
import { EditpostComponent } from "./editpost/editpost.component";
import { PostlistComponent } from "./postlist/postlist.component";
import { PostEffects } from "./state/post.effects";
import { postReducer } from "./state/post.reducer";
import { PostStateName } from "./state/post.selector";
import { PostDetailsComponent } from './post-details/post-details.component';

const postRoutes : Routes = [
    {
        path:"",
        component: PostlistComponent,
        children:[
        {
            path:'addpost', component:AddpostComponent
        },
        {
            path:'editpost/:id', component:EditpostComponent
        }
        ]
    }
]
@NgModule({
    declarations:[
        PostlistComponent,
        AddpostComponent,
        EditpostComponent,
        PostDetailsComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(postRoutes),
        StoreModule.forFeature(PostStateName, postReducer),
        EffectsModule.forFeature([PostEffects])
    ]
})
export class PostModule{

}