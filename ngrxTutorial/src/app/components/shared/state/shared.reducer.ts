import { createReducer, on } from "@ngrx/store";
import { LoadPostSuccessAction } from "../../post/state/post.actions";
import { SetErrorMessageAction, SetLoadingSpinnerAction } from "./shared.actions";
import { initialState } from "./shared.state";

const _SharedReducer = createReducer(initialState,
    on(SetLoadingSpinnerAction, (state, action)=>{
        return {
            ...state,
            showLoading:action.status
        }
    }),
    on(SetErrorMessageAction, (state, action)=>{
        return {
            ...state,
            errorMessage: action.message
        }
    })
     )
export function SharedReducer(state, action){
    return _SharedReducer(state, action);
}