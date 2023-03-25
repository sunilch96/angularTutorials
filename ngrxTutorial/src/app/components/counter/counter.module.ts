import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { CounterButtonsComponent } from "./counter-buttons/counter-buttons.component";
import { CounterInputComponent } from "./counter-input/counter-input.component";
import { CounterOutputComponent } from "./counter-output/counter-output.component";
import { CounterComponent } from "./counter/counter.component";
import { CounterReducer } from "./state/counter.reducer";
import { CounterStateName } from "./state/counter.selectors";
const counterRoutes : Routes = [
    {
        path:"",
        component: CounterComponent
      },    
]
@NgModule({
    declarations:[
        CounterComponent,
        CounterOutputComponent,
        CounterInputComponent,
        CounterButtonsComponent,
    ],
    imports:[
        CommonModule,        
        FormsModule,        
        RouterModule.forChild(counterRoutes),
        StoreModule.forFeature(CounterStateName, CounterReducer)
    ]    
})
export class CounterModule{

}