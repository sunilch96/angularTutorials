import { createFeatureSelector,createSelector } from "@ngrx/store";
import { RouterMainStateModel } from "src/app/store/router/custom-router-store-serializer";
import { getCurrentRouteDataSelector } from "src/app/store/router/router.selector";
import { PostNeState, postsNeAdapter } from "./post.state";
export const PostNeStateName = 'postsNe';

const _getPostState = createFeatureSelector<PostNeState>(PostNeStateName)

//has selectors like:
// addOne: Add one entity to the collection.
// addMany: Add multiple entities to the collection.
// setAll: Replace current collection with provided collection.
// setOne: Add or Replace one entity in the collection.
// setMany: Add or Replace multiple entities in the collection.
// removeOne: Remove one entity from the collection.
// removeMany: Remove multiple entities from the collection, by id or by predicate.
// removeAll: Clear entity collection.
// updateOne: Update one entity in the collection. Supports partial updates.
// updateMany: Update multiple entities in the collection. Supports partial updates.
// upsertOne: Add or Update one entity in the collection.
// upsertMany: Add or Update multiple entities in the collection.
// mapOne: Update one entity in the collection by defining a map function.
// map: Update multiple entities in the collection by defining a map function, similar to Array.map.
export const _postNeSelector = postsNeAdapter.getSelectors();

//Selectors : Get state data
//Get Post List
export const getPostStateAllEntitiesSelector = createSelector(_getPostState,
     _postNeSelector.selectAll)
export const getPostStateEntitiesSelector = createSelector(_getPostState, 
    _postNeSelector.selectEntities);
//Get Post By Id - using route State
export const getPostStateByIdSelector = createSelector(
    getPostStateEntitiesSelector, 
    getCurrentRouteDataSelector,
    (posts, route: RouterMainStateModel) =>{
    return posts? posts[route.state.params['id']] : null
});

export const getPostCountStateSelector = createSelector(_getPostState, (state) => state.count)