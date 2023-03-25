import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CounterState } from "./counter.state";

export const CounterStateName = 'counter';
const _getCounterState = createFeatureSelector<CounterState>(CounterStateName);

//Selectors : Get from state
//Get Counter
export const getCounterStateSelector = 
createSelector(_getCounterState, (state)=>{
    return state.counter;
});
//Get Channel Name
export const getChannelNameStateSelector = 
createSelector(_getCounterState, (state)=>{
    return state.channel;
});


