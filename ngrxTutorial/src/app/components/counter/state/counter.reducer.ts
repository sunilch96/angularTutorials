import {createReducer, on} from "@ngrx/store";
import { INCREMENT,DECREMENT, RESET, CUSTOMINCREMENT, CHANGECHANNELNAME } from "./counter.actions";
import { counterInitialState } from "./counter.state";

const _counterReducer = createReducer(counterInitialState, 
    on(INCREMENT, (state)=>{
        return {...state, counter : state.counter + 1}
    }),
    on(DECREMENT, (state)=>{
        return {...state, counter : state.counter - 1}
    }),
    on(RESET, (state)=>{
        return {...state, counter : 0}
    }),
    on(CUSTOMINCREMENT, (state, action)=>{
        return {...state, counter : state.counter + action.value}
    }),
    on(CHANGECHANNELNAME, (state, action)=>{
        return {...state, channel : action.value}
    }),
    )

export function CounterReducer(state, action){
    return _counterReducer(state, action)
}

