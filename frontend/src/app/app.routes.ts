import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { MisreservasComponent } from './misreservas/misreservas.component';
import { AddreservaComponent } from './addreserva/addreserva.component';
import { AccountComponent } from './account/account.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'login', component: LogInComponent},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent},
  { path: 'misreservas', component: MisreservasComponent},
  { path: 'addreservas', component: AddreservaComponent},
  { path: 'account', component: AccountComponent},
  { path: 'addrestaurant', component: AddRestaurantComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes { }