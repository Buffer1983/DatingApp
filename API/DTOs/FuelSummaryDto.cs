namespace API.DTOs
{
    public class FuelSummaryDto
    {
        public decimal totalAmount {get; set;} =0;
        public decimal totalAmountBenzene {get; set;}=0;
        public decimal totalAmountDiesel {get;set;}=0;
        public decimal totalAmountGas {get;set;}=0;
        public decimal totalLitres {get;set;}=0;
        public decimal totalLitresBenzene {get;set;}=0;
        public decimal totalLitresDiesel {get;set;}=0;
        public decimal totalLitresGas {get;set;}=0;
        public decimal totalKm {get;set;}=0;
        public decimal totalkmOutside {get;set;}=0;
    }
}