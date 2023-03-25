import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostDetailsNdComponent } from './components/post-ngrx-data/post-details-ngrx-data/post-details.component';
import { PostDetailsNeComponent } from './components/post-ngrx-entity/post-details-ngrx-entity/post-details.component';
import { PostDetailsComponent } from './components/post/post-details/post-details.component';
import { AuthGuard } from './services/auth.guard';
const routes: Routes = [
  {path:"", component:HomeComponent},
  {
    path:"counter",
    loadChildren: ()=> import('./components/counter/counter.module').then((m)=>m.CounterModule)
  },
  {
    path:"post",
    loadChildren: ()=>import('./components/post/post.module').then(m=> m.PostModule),
    canActivate : [AuthGuard]
  },
  {
      path:'post/details/:id', component:PostDetailsComponent
  },
  {
    path:'auth',
    loadChildren: ()=> import('./components/auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:"postne",
    loadChildren: ()=>import('./components/post-ngrx-entity/post-ngrx-entity.module').then(m=> m.PostNeModule),
    canActivate : [AuthGuard]
  },
  {
      path:'postne/details/:id', component:PostDetailsNeComponent
  },
  {
    path:"postnd",
    loadChildren: ()=>import('./components/post-ngrx-data/post-ngrx-data.module').then(m=> m.PostNdModule),
    canActivate : [AuthGuard]
  },
  {
      path:'postnd/details/:id', component:PostDetailsNdComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
