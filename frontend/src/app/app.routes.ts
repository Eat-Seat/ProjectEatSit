import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'login', component: LogInComponent},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes { }