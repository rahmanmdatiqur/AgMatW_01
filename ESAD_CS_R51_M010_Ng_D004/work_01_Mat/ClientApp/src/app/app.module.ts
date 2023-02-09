import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSharedModule } from './mat-shared/mat-shared.module';
import { NavComponent } from './components/shared/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { ZooViewComponent } from './components/zoo/zoo-view/zoo-view.component';
import { ZooCreateComponent } from './components/zoo/zoo-create/zoo-create.component';
import { ZooEditComponent } from './components/zoo/zoo-edit/zoo-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AnimalViewComponent } from './components/animal/animal-view/animal-view.component';
import { AnimalCreateComponent } from './components/animal/animal-create/animal-create.component';
import { AnimalEditComponent } from './components/animal/animal-edit/animal-edit.component';
import { DataService } from './services/data.service';
import { NotifyService } from './services/notify.service';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ZooViewComponent,
    ZooCreateComponent,
    ZooEditComponent,
    ConfirmDialogComponent,
    AnimalViewComponent,
    AnimalCreateComponent,
    AnimalEditComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DataService, NotifyService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
