import { Component, OnInit } from '@angular/core';
import { DateFormatter } from 'ngx-bootstrap/datepicker';
import { FuelExpense } from 'src/app/_models/fuelExpense';
import { FuelExpenseParams } from 'src/app/_models/fuelExpenseParams';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { FuelExpensesService } from 'src/app/_services/fuelExpenses.service';
import { MembersService } from 'src/app/_services/members.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

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
  ngForm: FormGroup;

  constructor(private fuelExpensesService: FuelExpensesService,private fb: FormBuilder) {
    this.fuelExpenseParams = this.fuelExpensesService.getFuelExpenseParams();
   }

  ngOnInit(): void { 
    // this.resetFilters()
    console.log(this.fuelExpenseParams.orderBy);
    // this.loadExpenses();
    // this.initializeForm();
    // this.loadExpenses();
  }

  initializeForm():void{
    this.ngForm = this.fb.group({
      dateFrom:[''],
      dateTo:['']
    })

  }

  loadExpenses(){

    console.log(this.fuelExpenseParams.fromDate);

    this.fuelExpensesService.setFuelExpensesParams(this.fuelExpenseParams);
    this.fuelExpensesService.getFuelExpenses(this.fuelExpenseParams).subscribe(response=>{
      this.fuelExpenses = response.result;
      this.pagination = response.pagination;
    })
    // this.fuelExpensesService.addFuelExpense();
  }

  resetFilters() {
    this.fuelExpenseParams = this.fuelExpensesService.resetFuelExpenseParams();
    this.loadExpenses();
  }

  pageChanged(event: any) {
    this.fuelExpenseParams.pageNumber = event.page;
    this.fuelExpensesService.setFuelExpensesParams(this.fuelExpenseParams);
    this.loadExpenses();
  }

}
