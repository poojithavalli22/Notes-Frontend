import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddNotePageComponent } from './components/add-note-page/add-note-page.component';
import { CodeExplanatorComponent } from './components/code-explanator/code-explanator.component';
import  {ProfileComponent}  from './components/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-note', component: AddNotePageComponent },
  { path: 'code-explanator', component: CodeExplanatorComponent },
  {path: 'profile', component: ProfileComponent}
];
