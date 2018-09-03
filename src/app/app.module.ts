import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MovieService } from './movies.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import {  SearchresultsComponent } from './searchresults/searchresults.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '', component: SearchComponent
  },
  {
    path: 'search-results', component: SearchresultsComponent
  },
  {
    path: 'search-results/:title/:year', component: SearchresultsComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    SearchresultsComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes,{useHash:true}),
    ReactiveFormsModule
    

    
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
