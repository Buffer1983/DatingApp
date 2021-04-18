using System;
using System.Threading.Tasks;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    [Authorize]
    public class PresenceHub: Hub
    {
        public override async Task OnConnectedAsync(){
            //Send to other clients when connected, a method (UserIsOnline) and the username of current user
            //Override the default on connectedAsync in order to pass data as we want it
            await Clients.Others.SendAsync("UserIsOnline",Context.User.GetUsername());
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Clients.Others.SendAsync("UserIsOffline",Context.User.GetUsername());
            await base.OnDisconnectedAsync(exception);
        }
    }
}