using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IFuelExpenseRepository
    {
        void AddFuelExpense(FuelExpense fuelExpense);
        void DeleteFuelExpense(FuelExpense fuelExpense);
        void UpdateFuelExpense(FuelExpense fuelExpense);
        Task<FuelExpense> GetFuelExpenseById(int id);
        Task<FuelExpense> GetFuelExpense(string username, string InvoiceNumber);
        Task<PagedList<FuelExpenseDto>> GetUserFuelExpenses(FuelExpensesParams fuelExpensesParams);
        
    }
}