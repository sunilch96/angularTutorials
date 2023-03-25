import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCounterStateSelector } from '../state/counter.selectors';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css']
})
export class CounterOutputComponent implements OnInit{
  constructor(private store:Store<CounterState>){}
  ngOnInit(): void {
    this.counter$ = this.store.select(getCounterStateSelector);
  } 
  counter$ :  Observable<number>;

  //OLD Code without async pipe not needed if using counter$
  // constructor(private store:Store<{counter:CounterState}>){}
  // ngOnInit(): void {
  //   this.counterSubscription = this.store.select('counter').subscribe((data)=>{
  //     this.counter = data.counter
  //   });

  //   this.counter$ = this.store.select("counter")
  // }
  // ngOnDestroy(): void {
  //   if(this.counterSubscription){
  //     this.counterSubscription.unsubscribe();
  //   }    
  // }

  // counter:number=0;
  // counterSubscription: Subscription;
  // counter$ : Observable<CounterState>;
}
