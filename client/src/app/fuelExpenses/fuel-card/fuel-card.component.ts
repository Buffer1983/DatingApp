import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FuelExpense } from 'src/app/_models/fuelExpense';
import { FuelExpensesService } from 'src/app/_services/fuelExpenses.service';

@Component({
  selector: 'app-fuel-card',
  templateUrl: './fuel-card.component.html',
  styleUrls: ['./fuel-card.component.css']
})
export class FuelCardComponent implements OnInit {
  @Input() fuelExpense:FuelExpense

  constructor(private fuelService: FuelExpensesService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  deleteInvoice(fuelExpense:FuelExpense){
    this.fuelService.deleteFuelExpense(fuelExpense.id).subscribe(()=>{
      this.toastr.success('You have deleted invoice');
    })
  }

  approveInvoice(fuelExpense:FuelExpense){
    // this.fuelService.deleteFuelExpense(fuelExpense.id).subscribe(()=>{
    //   this.toastr.success('You have approved invoice');
    // })
  }

  
}
