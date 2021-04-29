using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class FuelExpenseRepository : IFuelExpenseRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public FuelExpenseRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;

            _context = context;
        }

        public void AddFuelExpense(FuelExpense fuelExpense)
        {
            _context.FuelExpenses.Add(fuelExpense);
        }

        public void DeleteFuelExpense(FuelExpense fuelExpense)
        {
            _context.FuelExpenses.Remove(fuelExpense);
        }

        public async Task<FuelExpense> GetFuelExpense(string username, string invoiceNumber)
        {
            return await _context.FuelExpenses
                .Include(u => u.User)
                .SingleOrDefaultAsync(x => x.User.UserName == username && x.InvoiceNumber == invoiceNumber);
        }

        public async Task<FuelExpense> GetFuelExpenseById(int id)
        {
            return await _context.FuelExpenses
                .Include(u => u.User)
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<PagedList<FuelExpenseDto>> GetUserFuelExpenses(FuelExpensesParams fuelExpensesParams)
        {
            var query = _context.FuelExpenses
                    .OrderByDescending(f => f.InvoiceDate)
                    .ProjectTo<FuelExpenseDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();
            query = query.Where(f => f.InvoiceDate >= fuelExpensesParams.FromDate
                                && f.InvoiceDate <= fuelExpensesParams.ToDate
                                && f.Username == fuelExpensesParams.Username);

            return await PagedList<FuelExpenseDto>.CreateAsync(query, fuelExpensesParams.PageNumber, fuelExpensesParams.PageSize);
        }

        public void UpdateFuelExpense(FuelExpense fuelExpense)
        {
            _context.FuelExpenses.Update(fuelExpense);
        }
    }
}