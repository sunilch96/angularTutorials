import { PostModel } from "../../models/post.model"

export interface PostState{
    posts:PostModel[]
}

export const postInitialState:PostState ={
    posts:[]
    // posts:[
    //     {
    //         id:1,
    //         title:'title 1',
    //         description:'description 1'
    //     },
    //     {
    //         id:2,
    //         title:'title 2',
    //         description:'description 2'
    //     }
    // ]
}