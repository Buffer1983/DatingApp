import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { fuelExpense } from "../_models/fuelExpense";

@Injectable({
    providedIn: 'root'
  })
  export class FuelExpensesService {
    baseUrl = environment.apiUrl;
    fuelExpenses: fuelExpense[] = [];

    constructor(private http: HttpClient) { }

    addFuelExpense(model: any) {
        return this.http.post(this.baseUrl + 'fuelExpense/AddExpense', model).pipe(
          map((fuelExpense: fuelExpense) => {
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

  }