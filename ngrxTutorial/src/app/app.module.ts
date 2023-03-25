import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import AppComponent from './app.component';
import { HomeComponent } from './components/home/home.component';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppStateReducer } from './store/app.state';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingSpinnerComponent } from './components/shared/loading-spinner/loading-spinner.component';
import { AuthEffects } from './components/auth/state/auth.effects';
import { AuthTokenInterceptor } from './services/authToken.interceptor';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomRouterStateSerialize } from './store/router/custom-router-store-serializer';
import { EntityDataModule, EntityDataService } from '@ngrx/data';
import { entityDataConfig } from './store/posts-entity-metadata';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,   
    HeaderComponent,
    LoadingSpinnerComponent,    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(AppStateReducer),
    EntityDataModule, // entity data : @ngrx/data
    StoreDevtoolsModule.instrument({
      //maxAge:250, // 25 states or actions to capture
      //logOnly: environment .production
    }),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomRouterStateSerialize
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass : AuthTokenInterceptor,
    multi : true
  },
],
  bootstrap: [AppComponent]
})
export class AppModule {  
 }
