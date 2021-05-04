using System;

namespace API.DTOs
{
    public class FuelExpenseDto
    {
        public int Id {get; set;}
        public string InvoiceNumber {get;set;}
        public DateTime InvoiceDate {get;set;}
        public decimal InvoiceAmount {get; set;}
        public string TripDescription {get;set;}
        public string LicenseNumber {get;set;}
        public string CarModel {get;set;}
        public string FuelType {get;set;}
        public decimal InvoiceLitres {get;set;}
        public decimal CarKm {get; set;}
        public string TripOutside {get;set;}
        public string ScheduledTrip {get; set;}
        public decimal TripOutsideKm {get; set;}
        public int UserId {get;set;}
        public string Username {get;set;}

    }
}

