import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MembersPrintComponent } from './members/members-print/members-print.component';
import { MessagesComponent } from './messages/messages.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  {path:'',component:HomeComponent},
  //We add restriction to the following paths
  {
    path: '',
    runGuardsAndResolvers:'always',
    canActivate:[AuthGuard],
    children:[
      {path:'members',component:MemberListComponent},
      {path:'members/:username',component:MemberDetailComponent},
      //except from activate we call canDeactivate guard also
      {path:'member/edit',component:MemberEditComponent,canDeactivate:[PreventUnsavedChangesGuard]},
      {path:'lists',component:ListsComponent},
      {path:'Test',component:MembersPrintComponent},
      {path:'messages',component:MessagesComponent},
      {path:'register',component:RegisterComponent},
    
    ]
  },
  {path: 'Errors', component:TestErrorsComponent},
  {path: 'not-found', component:NotFoundComponent},
  {path: 'server-error', component:ServerErrorComponent},
  //Wildcard if users send sth that does not exist
  {path:'**',component:NotFoundComponent,pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
