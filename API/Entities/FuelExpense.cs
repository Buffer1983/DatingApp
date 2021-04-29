using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class FuelExpense
    {
        public int Id {get; set;}
        [Required] public string LicenseNumber {get;set;}
        [Required] public string CarModel {get;set;}
        [Required] public string FuelType {get;set;}
        [Required] public AppUser User {get;set;}
        [Required] public string InvoiceNumber {get;set;}
        [Required] public decimal InvoiceLitres {get;set;}
        [Required] public decimal InvoiceAmount {get; set;}
        [Required] public decimal CarKm {get; set;}
        [Required] public DateTime InvoiceDate {get;set;}
        [Required] public bool TripOutside {get;set;}
        public DateTime InsertDate {get;set;} = DateTime.UtcNow;
        [Required] public bool ScheduledTrip {get; set;}
        [Required] public decimal TripOutsideKm {get; set;}
        [Required] public string TripDescription {get;set;}
        
    }
}