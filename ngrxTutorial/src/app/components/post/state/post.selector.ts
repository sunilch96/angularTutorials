import { createFeatureSelector,createSelector } from "@ngrx/store";
import { RouterMainStateModel } from "src/app/store/router/custom-router-store-serializer";
import { getCurrentRouteDataSelector } from "src/app/store/router/router.selector";
import { PostState } from "./post.state";
export const PostStateName = 'posts';

const _getPostState = createFeatureSelector<PostState>(PostStateName)

//Selectors : Get state data
//Get Post List
export const getPostStateSelector = createSelector(_getPostState, state=>{
    return state.posts
})
//Get Post By Id - using route State
export const getPostStateByIdSelector = createSelector(
    getPostStateSelector, 
    getCurrentRouteDataSelector,
    (posts, route: RouterMainStateModel) =>{    
    return posts? posts.find((x)=> x.id == route.state.params['id']): null
})

//Get Post By Id - old way without using route state
// export const getPostStateById = createSelector(_getPostState, (state, props) =>{
//     const filterPostById = state.posts.find((x)=> x.id == props.id);
//     return filterPostById
// })