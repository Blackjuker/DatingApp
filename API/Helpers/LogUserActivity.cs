using System;
using API.Data;
using API.Extensions;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace API.Helpers;

public class LogUserActivity : IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var resultContext = await next(); // continue to the action

        if (context.HttpContext.User.Identity?.IsAuthenticated != true) return;

        var memberId = resultContext.HttpContext.User.GetMemberId(); // extension method to get member id

        var dbContext = resultContext.HttpContext.RequestServices
        .GetRequiredService<AppDbContext>(); // get the DbContext from DI
        
        await dbContext.Members
            .Where(m => m.Id == memberId)
            .ExecuteUpdateAsync(setters => setters.SetProperty(u => u.LastActive, DateTime.UtcNow));

        // if(context.HttpContext.User.Identity is {IsAuthenticated: true})
        // {
        //     var userId = int.Parse(context.HttpContext.User.FindFirst("nameid")!.Value);
        //     var repo = resultContext.HttpContext.RequestServices.GetService<IUserRepository>();
        //     var user = await repo!.GetUserByIdAsync(userId);
        //     user.LastActive = DateTime.UtcNow;
        //     await repo.SaveAllAsync();
        // }
    }
}
