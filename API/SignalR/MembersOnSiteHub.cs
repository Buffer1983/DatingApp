using System;
using System.Threading.Tasks;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    [Authorize]
    public class MembersOnSiteHub : Hub
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public MembersOnSiteHub(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public override async Task OnConnectedAsync()
        {
            var members = await _unitOfWork.MemberOnSiteRepository.GetMembersOnSiteThread();
            if (_unitOfWork.HasChanges()) await _unitOfWork.Complete();
            //We send only to user who are connecting to hub
            await Clients.Caller.SendAsync("MembersOnSiteThread", members);
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await base.OnDisconnectedAsync(exception);
        }
    }
}