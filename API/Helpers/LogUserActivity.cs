using System;
using System.Threading.Tasks;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace API.Helpers
{       //Action Filter Interface. In order to track users activity, we implement this filter. This Action Executed before and after any user action    
        public class LogUserActivity : IAsyncActionFilter
    {
        //Takes 2 parameters. First shows the context that is executing and then what to do next, after action executed
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            //waiting for next action to be completed and get the executed result context
            var resultContext = await next();
            //Check if user is authenticated in the result. If yes we use next result 
            if(!resultContext.HttpContext.User.Identity.IsAuthenticated) return;
            var userName = resultContext.HttpContext.User.GetUsername();
            //Getting Access to UserRepository
            var repo = resultContext.HttpContext.RequestServices.GetService<IUserRepository>();
            var user = await repo.GetUserByUsernameAsync(userName);
            user.LastActive = DateTime.Now;
            await repo.SaveAllAsync();
        }
    }
}