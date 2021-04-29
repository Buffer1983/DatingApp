import { EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from 'src/app/modals/confirm-dialog/confirm-dialog.component';
import { AccountService } from 'src/app/_services/account.service';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { FuelExpensesService } from 'src/app/_services/fuelExpenses.service';

@Component({
  selector: 'app-fuel-expenses-add',
  templateUrl: './fuel-expenses-add.component.html',
  styleUrls: ['./fuel-expenses-add.component.css']
})
export class FuelExpensesAddComponent implements OnInit {
  @ViewChild('addFuelExpensesForm') editForm: NgForm;
  @Output() cancelRegister = new EventEmitter();
  addFuelExpensesForm: FormGroup;
  validationErrors: string[] = [];
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private accountService: AccountService, private toastr: ToastrService, 
    private fb: FormBuilder, private router: Router, private fuelExpensesService: FuelExpensesService) { }

  ngOnInit(): void {

    

    this.addFuelExpensesForm = this.fb.group({
      invoiceDate: ['',Validators.required],
      invoiceAmount: ['', Validators.required],
      invoiceNumber: ['', Validators.required],
      tripDescription : ['',Validators.required],
      licenseNumber : ['',Validators.required],
      carModel : ['',Validators.required],
      fuelType : ['benzene',Validators.required],
      invoiceLitres : ['',Validators.required],
      carKm : ['',Validators.required],
      tripOutside : ['False',Validators.required],
      scheduledTrip : ['False',Validators.required],
      tripOutsideKm : ['',Validators.required]
    })
  }

  AddExpenses() {
    this.fuelExpensesService.addFuelExpense(this.addFuelExpensesForm.value).subscribe(response=>{      
      this.toastr.success("Fuel Invoice Saved Successfully");
      // this.router.navigateByUrl('/members');
    },error =>{
      this.validationErrors = error;
    });
    //If we want to rese without exiting
    // this.addFuelExpensesForm.reset();
  }

  cancel() {
    this.addFuelExpensesForm.reset();
  }

  
}
