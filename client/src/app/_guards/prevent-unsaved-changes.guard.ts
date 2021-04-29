import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FuelExpensesAddComponent } from '../fuelexpenses/fuel-expenses-add/fuel-expenses-add.component';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { ConfirmService } from '../_services/confirm.service';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {

  constructor(private confirmService : ConfirmService){}

  //we use union | so that method can return either an observable of boolean or a boolean
  canDeactivate(component: MemberEditComponent): Observable<boolean> | boolean{
    if (component.editForm.dirty) {
      return this.confirmService.confirm()
    }
    return true;
  }

}
