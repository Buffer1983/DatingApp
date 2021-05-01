import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { map, take } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { FuelExpense } from "../_models/fuelExpense";
import { FuelExpenseParams } from "../_models/fuelExpenseParams";
import { User } from "../_models/user";
import { AccountService } from "./account.service";
import { getPaginatedResult, getPaginationHeaders } from "./paginationHelper";


@Injectable({
    providedIn: 'root'
  })
  export class FuelExpensesService {
    baseUrl = environment.apiUrl;
    fuelExpenses: FuelExpense[] = [];
    fuelExpenseParams : FuelExpenseParams;
    fuelCache = new Map();
    fuelExpense :FuelExpense;
    user: User;

    constructor(private http: HttpClient, private accountService: AccountService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
        this.user = user;
        this.fuelExpenseParams = new FuelExpenseParams();
        this.fuelExpenseParams.username = user.username;
        
      })
     }

    addFuelExpense(model: any) {
        return this.http.post(this.baseUrl + 'fuelExpense/AddExpense', model).pipe(
          map((fuelExpense: FuelExpense) => {
            if (fuelExpense) {
            //  this.setCurrentUser(user);
                this.fuelExpenses.push(fuelExpense);
            }
          })
        )
      }
    
    deleteFuelExpense(id: number) {
        return this.http.delete(this.baseUrl + 'fuelExpense/' + id);
      }

      getFuelParams() {
        return this.fuelExpenseParams;
      }

      setFuelParams(params: FuelExpenseParams) {
        this.fuelExpenseParams = params;
      }

      resetFuelParams() {
        this.fuelExpenseParams = new FuelExpenseParams();
        return this.fuelExpenseParams;
      }

      getFuelExpenses(fuelExpenseParams: FuelExpenseParams) {
        var response = this.fuelCache.get(Object.values(fuelExpenseParams).join('-'));
        if (response) {
          return of(response);
        }
        
        let params = getPaginationHeaders(fuelExpenseParams.pageNumber, fuelExpenseParams.pageSize);
        
        

        params = params.append('username', fuelExpenseParams.username);
        params = params.append('fromDate', fuelExpenseParams.fromDate);
        params = params.append('toDate', fuelExpenseParams.toDate);
        
        
        // params = params.append('orderBy', fuelExpenseParams.orderBy);
        return getPaginatedResult<FuelExpense[]>(this.baseUrl + 'fuelexpense', params,this.http)
          .pipe(map(response => {
            this.fuelCache.set(Object.values(fuelExpenseParams).join('-'), response);
            return response;
          }))
      }

  }