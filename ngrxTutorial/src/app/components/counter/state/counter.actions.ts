import { createAction, props } from "@ngrx/store";

export const INCREMENT = createAction('INCREMENT');
export const DECREMENT = createAction('DECREMENT');
export const RESET = createAction('RESET');
export const CUSTOMINCREMENT = createAction(
    'CUSTOMINCREMENT',
    props<{value:number}>());

export const CHANGECHANNELNAME = createAction(
    'CHANGECHANNELNAME',
    props<{value:string}>());