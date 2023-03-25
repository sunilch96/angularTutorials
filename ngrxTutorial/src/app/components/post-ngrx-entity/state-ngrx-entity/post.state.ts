import { createEntityAdapter, EntityState } from "@ngrx/entity"
import { PostModel } from "../../models/post.model"

//Ne == Ngrx entity
export interface PostNeState extends EntityState<PostModel>{
    count:number;
}
//adapter
export const postsNeAdapter = createEntityAdapter<PostModel>({
    //let adapter know primary key
    selectId:(post:PostModel)=> post.id,
    sortComparer: sortByNameAsc
});
//ascending
function sortByNameAsc(a:PostModel, b:PostModel):number{
    return a.title.localeCompare(b.title)
}
//descending
function sortByNameDesc(a:PostModel, b:PostModel):number{
    const compare =  a.title.localeCompare(b.title);
    if(compare > 0 ){
        return -1;
    }

    if(compare < 0 ){
        return 1;
    }

    return compare;
}


//Initial State
export const postNeInitialState:PostNeState = postsNeAdapter.getInitialState({
    count:0
});