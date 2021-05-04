import { Component, OnInit } from '@angular/core';
import { FuelExpense } from 'src/app/_models/fuelExpense';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { FuelExpensesService } from 'src/app/_services/fuelExpenses.service';
import { FuelExpenseParams } from 'src/app/_models/fuelExpenseParams';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-fuel-expenses-list',
  templateUrl: './fuel-expenses-list.component.html',
  styleUrls: ['./fuel-expenses-list.component.css']
})
export class FuelExpensesListComponent implements OnInit {
  fuelExpenses:FuelExpense[]=[];
  pagination:Pagination;
  fuelExpenseParams: FuelExpenseParams;
  user:User;
  currentDate = new Date();
  


  constructor(private accountService: AccountService, private fuelExpensesService: FuelExpensesService) {
     this.fuelExpenseParams = this.fuelExpensesService.getFuelParams();
     this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    
   }

  ngOnInit(): void { 
    
    this.fuelExpenseParams.toDate= new Date().toUTCString();
    this.fuelExpenseParams.fromDate= new Date(this.currentDate.setDate(this.currentDate.getDate() - 30)).toUTCString();
    this.fuelExpensesService.user.username = this.user.username;
    this.loadExpenses();
  }

  loadExpenses(){
    this.fuelExpensesService.setFuelParams(this.fuelExpenseParams);
    this.fuelExpensesService.getFuelExpenses(this.fuelExpenseParams).subscribe(response=>{
      this.fuelExpenses = response.result;
      this.pagination = response.pagination;
    })
  }

  resetFilters() {
    this.fuelExpenseParams = this.fuelExpensesService.resetFuelParams();
    this.loadExpenses();
  }

  pageChanged(event: any) {
    this.fuelExpenseParams.pageNumber = event.page;
    this.fuelExpensesService.setFuelParams(this.fuelExpenseParams);
    this.loadExpenses();
  }

}
