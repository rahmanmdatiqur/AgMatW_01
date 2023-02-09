import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalCreateComponent } from './components/animal/animal-create/animal-create.component';
import { AnimalViewComponent } from './components/animal/animal-view/animal-view.component';
import { HomeComponent } from './components/home/home.component';
import { ZooCreateComponent } from './components/zoo/zoo-create/zoo-create.component';
import { ZooEditComponent } from './components/zoo/zoo-edit/zoo-edit.component';
import { ZooViewComponent } from './components/zoo/zoo-view/zoo-view.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'zoo', component: ZooViewComponent },
  { path: 'add-zoo', component: ZooCreateComponent },
  { path: 'edit-zoo/:id', component: ZooEditComponent },
  { path: 'animal', component: AnimalViewComponent },
  { path: 'add-animal', component: AnimalCreateComponent },
  { path: '**', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
