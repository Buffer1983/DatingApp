import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { FuelExpense } from 'src/app/_models/fuelExpense';
import { FuelExpenseParams } from 'src/app/_models/fuelExpenseParams';
import { FuelSummary } from 'src/app/_models/fuelSummary';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { FuelExpensesService } from 'src/app/_services/fuelExpenses.service';

@Component({
  selector: 'app-fuel-expenses-admin',
  templateUrl: './fuel-expenses-admin.component.html',
  styleUrls: ['./fuel-expenses-admin.component.css']
})
export class FuelExpensesAdminComponent implements OnInit {
  fuelExpenses:Partial<FuelExpense[]>;
  fuelSummary : FuelSummary;
  fuelExpenseParams: FuelExpenseParams;
  pagination:Pagination;
  currentDate = new Date();
  pageSize=20;
  user:User;

  constructor(private toastr: ToastrService, private accountService: AccountService,private router:Router,private fuelExpensesService: FuelExpensesService) { 
    this.fuelExpenseParams = this.fuelExpensesService.getFuelParams();
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }


  ngOnInit(): void {
    this.fuelExpenseParams.toDate= new Date().toUTCString();
    this.fuelExpenseParams.fromDate= new Date(this.currentDate.setDate(this.currentDate.getDate() - 930)).toUTCString();
    this.fuelExpensesService.user.username = this.user.username;
    this.fuelExpenseParams.pageSize = this.pageSize;
    this.loadExpensesAdmin();
  }

  loadExpensesAdmin(){
    this.fuelExpensesService.setFuelParams(this.fuelExpenseParams);
    var result = this.fuelExpensesService.getFuelSummaryAdmin(this.fuelExpenseParams);
    
    result.subscribe(response=>{
      this.fuelSummary = response
    });

    
    this.fuelExpensesService.getFuelExpensesAdmin(this.fuelExpenseParams).subscribe(response=>{
      this.fuelExpenses = response.result;
      this.pagination = response.pagination;
    })
  }

  resetFilters() {
    this.fuelExpenseParams = this.fuelExpensesService.resetFuelParams();
    this.loadExpensesAdmin();
  }

  pageChanged(event: any) {
    this.fuelExpenseParams.pageNumber = event.page;
    this.fuelExpensesService.setFuelParams(this.fuelExpenseParams);
    this.loadExpensesAdmin();
  }

  
  deleteInvoice(fuelExpense:FuelExpense){
    this.fuelExpensesService.deleteFuelExpense(fuelExpense.id).subscribe(()=>{
      this.toastr.success('You have deleted invoice');
    })

    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/fuelexpense/admin']);
  });
  }

}
