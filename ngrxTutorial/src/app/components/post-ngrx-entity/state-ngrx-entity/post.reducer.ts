import { createReducer, on } from "@ngrx/store"
import {  AddPostNeSuccessAction,
    DeletePostNeAction,
    DeletePostNeSuccessAction,
    LoadPostNeSuccessAction,
    UpdatePostNeAction,
    UpdatePostNeSuccessAction } from "./post.actions"
import { postNeInitialState, postsNeAdapter } from "./post.state"

const _postReducer = createReducer(postNeInitialState,
    on(AddPostNeSuccessAction, (state, action)=>{        
       return postsNeAdapter.addOne(action.post, {
        ...state,
        count: state.count + Math.floor((Math.random() * 100) + 1) // random number
       });
    }),
    on(UpdatePostNeSuccessAction, (state, action)=>{
        return postsNeAdapter.updateOne(action.post, state);
    }),
    on(DeletePostNeSuccessAction, (state, action)=>{
       return postsNeAdapter.removeOne(action.id, state);
    }),
    on(LoadPostNeSuccessAction, (state, action)=>{
       return postsNeAdapter.setAll(action.posts, {
        ...state,
        count: state.count + Math.floor((Math.random() * 100) + 1) // random number
       });
    })
    );

export function postNeReducer(state, action){
    return _postReducer(state, action)
}