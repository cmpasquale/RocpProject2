import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ROCPService } from './services/rocp.service';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '**', redirectTo: 'profile', component: ProfileComponent  }

    ])
  ],
  providers: [ROCPService],
  bootstrap: [AppComponent]
})
export class AppModule { }
