import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { TareaComponent } from './tarea/tarea.component';
import { FormularioTareaComponent } from './formulario-tarea/formulario-tarea.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskManagerComponent,
    TareaComponent,
    FormularioTareaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
