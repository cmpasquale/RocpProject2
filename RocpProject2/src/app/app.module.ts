import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { GetComponent } from './get/get.component';
import { ROCPService } from './services/rocp.service';
import { DeleteComponent } from './delete/delete.component';
import { UpdatetaskComponent} from './updatetask/updatetask.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CreateComponent } from './create/create.component';
//import { BsDropdownModule } from './ngx-bootstrap/dropdown';
//import { CarouselModule } from 'ngx-bootstrap/carousel';
@NgModule({
  declarations: [
    AppComponent,
    GetComponent,
    DeleteComponent,
    UpdatetaskComponent,
    WelcomeComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    //CarouselModule,
    //BsDropdownModule.forRoot(),
    RouterModule.forRoot([
      { path: 'getbyId', component: GetComponent},
      {path: 'create', component: CreateComponent},
      { path: 'delete', component: DeleteComponent },
      { path: 'update', component: UpdatetaskComponent},
      { path: '**', component: WelcomeComponent }

    ])
  ],
  providers: [ROCPService],
  bootstrap: [AppComponent]
})
export class AppModule { }
