import { createReducer, on } from "@ngrx/store"
import {  AddPostSuccessAction, DeletePostAction, DeletePostSuccessAction, LoadPostSuccessAction, UpdatePostAction, UpdatePostSuccessAction } from "./post.actions"
import { postInitialState } from "./post.state"

const _postReducer = createReducer(postInitialState,
    on(AddPostSuccessAction, (state, action)=>{        
        let _post = {...action.post};
        return {...state, posts:[...state.posts, _post]}
    }),
    on(UpdatePostSuccessAction, (state, action)=>{
        const updatedPost = state.posts.map(postItem=> {
            return action.post.id == postItem.id ? action.post : postItem
        });
        return{
            ...state,
            posts: updatedPost
        }        
    }),
    on(DeletePostSuccessAction, (state, action)=>{
        const selectedPost = state.posts.filter((x)=>{
            return x.id != action.id
        })
        return {
            ...state,
            posts: selectedPost
        }
    }),
    on(LoadPostSuccessAction, (state, action)=>{
        return {
            ...state,
            posts: action.posts
        }
    })
    );

export function postReducer(state, action){
    return _postReducer(state, action)
}