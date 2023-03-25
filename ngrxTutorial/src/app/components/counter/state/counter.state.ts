export interface CounterState{
    counter:number;
    channel:string
}

export const counterInitialState:CounterState={
    counter:0,
    channel:'some text'
}
