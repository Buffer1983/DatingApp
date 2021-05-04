import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { MemberDetailedResolver } from './_resolvers/member-detailed.resolver';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminGuard } from './_guards/admin.guard';
import { FuelExpensesAddComponent } from './fuelexpenses/fuel-expenses-add/fuel-expenses-add.component';
import { FuelExpensesListComponent } from './fuelexpenses/fuel-expenses-list/fuel-expenses-list.component';
import { FuelExpensesAdminComponent } from './fuelexpenses/fuel-expenses-admin/fuel-expenses-admin.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'members', component: MemberListComponent},
      //With resolve, we say that when this link is used, first load user data before renderingm by useing resolvers
      {path: 'members/:username', component: MemberDetailComponent, resolve:{member: MemberDetailedResolver}},
      {path: 'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'lists', component: ListsComponent},
      {path: 'fuelexpenses/add' , component : FuelExpensesAddComponent},
      {path: 'fuelexpense' , component : FuelExpensesListComponent},
      {path: 'fuelexpense/admin' , component : FuelExpensesAdminComponent},
      {path: 'messages', component: MessagesComponent},
      //We add adminguard in order to have access only admins
      {path: 'admin', component: AdminPanelComponent, canActivate:[AdminGuard]},
    ]
  },
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
