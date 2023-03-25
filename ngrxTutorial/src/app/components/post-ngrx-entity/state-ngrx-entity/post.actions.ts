import { Update } from "@ngrx/entity/src";
import { createAction, props } from "@ngrx/store";
import { PostModel } from "../../models/post.model";

const ADD_POST_NE_ACTION = "ADD_POST_NE_ACTION";
const ADD_POST_NE_ACTION_SUCCESS = "ADD_POST_NE_ACTION_SUCCESS";
const ADD_POST_NE_FAIL = "ADD_POST_NE_FAIL";
const UPDATE_POST_NE_ACTION = "UPDATE_POST_NE_ACTION";
const UPDATE_POST_NE_SUCCESS_ACTION = "UPDATE_POST_NE_SUCCESS_ACTION";

const DELETE_POST_NE_ACTION = "DELETE_POST_NE_ACTION";
const DELETE_POST_NE_SUCCESS_ACTION = "DELETE_POST_NE_SUCCESS_ACTION";

export const AddPostNeAction = createAction(ADD_POST_NE_ACTION, 
    props<{post:PostModel}>() );
export const AddPostNeSuccessAction = createAction(ADD_POST_NE_ACTION_SUCCESS, 
    props<{post:PostModel}>() );
    
export const UpdatePostNeAction = createAction(UPDATE_POST_NE_ACTION, 
    props<{post:PostModel}>() );
export const UpdatePostNeSuccessAction = createAction(UPDATE_POST_NE_SUCCESS_ACTION, 
    props<{post:Update<PostModel>, redirect:boolean}>() );

export const DeletePostNeAction = createAction(DELETE_POST_NE_ACTION, 
    props<{id:number}>() );
export const DeletePostNeSuccessAction = createAction(DELETE_POST_NE_SUCCESS_ACTION, 
    props<{id:number}>() );

export const AddPostNeFailAction = createAction(ADD_POST_NE_FAIL);


const LOAD_POST_NE_ACTION = "LOAD_POST_NE_ACTION";
const LOAD_POST_NE_SUCCESS_ACTION = "LOAD_POST_NE_SUCCESS_ACTION";
export const LoadPostNeAction = createAction(LOAD_POST_NE_ACTION);
export const LoadPostNeSuccessAction = createAction(LOAD_POST_NE_SUCCESS_ACTION, 
    props<{posts:  PostModel[]}>());
