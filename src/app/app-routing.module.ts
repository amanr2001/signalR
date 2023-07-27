import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatpaggeComponent } from './chatpagge/chatpagge.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'chat/:userid',component:ChatpaggeComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
