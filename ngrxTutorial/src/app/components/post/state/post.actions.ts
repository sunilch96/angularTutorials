import { createAction, props } from "@ngrx/store";
import { PostModel } from "../../models/post.model";

const ADD_POST_ACTION = "ADD_POST_ACTION";
const ADD_POST_ACTION_SUCCESS = "ADD_POST_ACTION_SUCCESS";
const ADD_POST_FAIL = "ADD_POST_FAIL";
const UPDATE_POST_ACTION = "UPDATE_POST_ACTION";
const UPDATE_POST_SUCCESS_ACTION = "UPDATE_POST_ACTION_SUCCESS";

const DELETE_POST_ACTION = "DELETE_POST_ACTION";
const DELETE_POST_SUCCESS_ACTION = "DELETE_POST_SUCCESS_ACTION";

export const AddPostAction = createAction(ADD_POST_ACTION, 
    props<{post:PostModel}>() );
export const AddPostSuccessAction = createAction(ADD_POST_ACTION_SUCCESS, 
    props<{post:PostModel}>() );
    
export const UpdatePostAction = createAction(UPDATE_POST_ACTION, 
    props<{post:PostModel}>() );
export const UpdatePostSuccessAction = createAction(UPDATE_POST_SUCCESS_ACTION, 
    props<{post:PostModel, redirect:boolean}>() );

export const DeletePostAction = createAction(DELETE_POST_ACTION, 
    props<{id:number}>() );
export const DeletePostSuccessAction = createAction(DELETE_POST_SUCCESS_ACTION, 
    props<{id:number}>() );

export const AddPostFailAction = createAction(ADD_POST_FAIL);


const LOAD_POST_ACTION = "LOAD_POST_ACTION";
const LOAD_POST_SUCCESS_ACTION = "LOAD_POST_SUCCESS_ACTION";
export const LoadPostAction = createAction(LOAD_POST_ACTION);
export const LoadPostSuccessAction = createAction(LOAD_POST_SUCCESS_ACTION, 
    props<{posts: PostModel[]}>());

const GET_POST_BY_ID_LOAD_ACTION = "GET_POST_BY_ID_LOAD_ACTION";
const GET_POST_BY_ID_SUCCESS_ACTION = "GET_POST_BY_ID_SUCCESS_ACTION"
export const GetPostByIdLoadAction = createAction(GET_POST_BY_ID_LOAD_ACTION);
export const GetPostByIdSuccessAction = createAction(GET_POST_BY_ID_SUCCESS_ACTION,
    props<{post:PostModel}>())