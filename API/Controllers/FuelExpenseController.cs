using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class FuelExpenseController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public FuelExpenseController(UserManager<AppUser> userManager, IMapper mapper, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;

        }

        [HttpPost("AddExpense")]
        public async Task<ActionResult<FuelExpenseDto>> AddExpense(FuelExpenseDto fuelExpenseDto)
        {
            var userId = User.GetUserId();
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(userId);
            var fuelExpenseExists = await _unitOfWork.FuelExpenseRepository.GetFuelExpense(user.UserName , fuelExpenseDto.InvoiceNumber);
            if (fuelExpenseExists != null) return BadRequest("Receipt With this number already exists for user");

            
            var fuelExpense = new FuelExpense();
            fuelExpense = _mapper.Map<FuelExpense>(fuelExpenseDto);
            fuelExpense.User = user;
            
            _unitOfWork.FuelExpenseRepository.AddFuelExpense(fuelExpense);

            if(await _unitOfWork.Complete()) return Ok(_mapper.Map<FuelExpenseDto>(fuelExpense));
            return BadRequest("Failed to save expenses");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteFuelExpense(int id)
        {
            var fuelExpense = await _unitOfWork.FuelExpenseRepository.GetFuelExpenseById(id);
            if(fuelExpense ==null) return BadRequest("Could not find specified fuel expense to delete.");
            _unitOfWork.FuelExpenseRepository.DeleteFuelExpense(fuelExpense);
            if (await _unitOfWork.Complete()) return Ok();
            return BadRequest("Problem deleting the fuel expense");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FuelExpenseDto>>> GetFuelExpensesForUser([FromQuery] FuelExpensesParams fuelExpensesParams)
        {
            var fuelExpenses = await _unitOfWork.FuelExpenseRepository.GetUserFuelExpenses(fuelExpensesParams);
            Response.AddPaginationHeader(fuelExpenses.CurrentPage, fuelExpenses.PageSize, fuelExpenses.TotalCount, fuelExpenses.TotalPages);

            return fuelExpenses;
        }

        [HttpGet("Admin")]
        public async Task<ActionResult<IEnumerable<FuelExpenseDto>>> GetFuelExpensesForAdmin([FromQuery] FuelExpensesParams fuelExpensesParams)
        {         
            var fuelExpenses = await _unitOfWork.FuelExpenseRepository.GetAdminFuelExpenses(fuelExpensesParams);
            Response.AddPaginationHeader(fuelExpenses.CurrentPage, fuelExpenses.PageSize, fuelExpenses.TotalCount, fuelExpenses.TotalPages);

            return fuelExpenses;
        }

        [HttpGet("Admin/Summary")]
        public async Task<ActionResult<FuelSummaryDto>> GetFuelSummaryForAdmin([FromQuery] FuelExpensesParams fuelExpensesParams)
        {
            var fuelExpenses = await _unitOfWork.FuelExpenseRepository.GetAdminSummaryExpenses(fuelExpensesParams);
            FuelSummaryDto  summary = new FuelSummaryDto();
            foreach(FuelExpense f in fuelExpenses){
                summary.totalAmount += f.InvoiceAmount;
                summary.totalKm += f.CarKm;
                summary.totalkmOutside += f.TripOutsideKm;
                summary.totalLitres += f.InvoiceLitres;
                switch (f.FuelType){
                    case "benzene":
                        summary.totalAmountBenzene += f.InvoiceAmount;
                        summary.totalLitresBenzene += f.InvoiceLitres;
                    break;
                    case "diesel":
                        summary.totalAmountDiesel += f.InvoiceAmount;
                        summary.totalLitresDiesel += f.InvoiceLitres;
                    break;
                    case "gas":
                        summary.totalAmountGas += f.InvoiceAmount;
                        summary.totalLitresGas += f.InvoiceLitres;
                    break;
                }
            }
            return summary;
        }
        
    }
}