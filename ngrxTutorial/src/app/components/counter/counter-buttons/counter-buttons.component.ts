import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DECREMENT, INCREMENT, RESET } from '../state/counter.actions';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.css']
})
export class CounterButtonsComponent implements OnInit{
  constructor(private store : Store<CounterState>){}
  ngOnInit(): void {
    
  }

  //With Redux
  onIncrement(){
    this.store.dispatch(INCREMENT())
  }
  onDecrement(){
    this.store.dispatch(DECREMENT())
  }
  onReset(){
    this.store.dispatch(RESET())
  }

  //Event emitter is used to get known that this event is invoked
  //Without Redux
  // @Output()
  // increment = new EventEmitter<void>();
  // @Output()
  // decrement = new EventEmitter<void>();
  // @Output()
  // reset = new EventEmitter<void>();
  
  // onIncrement(){
  //   this.increment.emit();
  // }
  // onDecrement(){
  //   this.decrement.emit();
  // }
  // onReset(){
  //   this.reset.emit();
  // }  

}
