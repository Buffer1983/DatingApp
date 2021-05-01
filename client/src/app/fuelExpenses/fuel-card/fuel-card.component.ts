import { stringify } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  isCollapsed=false;

  constructor(private fuelService: FuelExpensesService, private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
    
  }

  deleteInvoice(fuelExpense:FuelExpense){
    this.fuelService.deleteFuelExpense(fuelExpense.id).subscribe(()=>{
      this.toastr.success('You have deleted invoice');
    })

    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/fuelexpense']);
  });
  }

  approveInvoice(fuelExpense:FuelExpense){
    // this.fuelService.deleteFuelExpense(fuelExpense.id).subscribe(()=>{
    //   this.toastr.success('You have approved invoice');
    // })
  }

  
}
