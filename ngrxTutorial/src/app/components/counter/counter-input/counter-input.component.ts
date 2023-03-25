import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { CHANGECHANNELNAME, CUSTOMINCREMENT } from '../state/counter.actions';
import { getChannelNameStateSelector } from '../state/counter.selectors';

@Component({
  selector: 'app-counter-input',
  templateUrl: './counter-input.component.html',
  styleUrls: ['./counter-input.component.css']
})
export class CounterInputComponent implements OnInit {
  constructor(private storeService: Store<AppState>){}
  ngOnInit(): void {
    this.channelName$ = this.storeService.select(getChannelNameStateSelector);
  }
  channelName$: Observable<string>;
  countValue:number = 0;
  txtchannelName:string;
  onAddCounterClick(){
    this.storeService
    .dispatch(CUSTOMINCREMENT({value:this.countValue}))
  }

  onChannelTextClick(){
    this.storeService
    .dispatch(CHANGECHANNELNAME({value:this.txtchannelName}));
  }
}
