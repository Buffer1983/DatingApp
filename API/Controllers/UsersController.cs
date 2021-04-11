using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        public UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService)
        {
            _photoService = photoService;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [HttpGet]
        //We put fromQuery attribute in order to take user params from the query string
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers([FromQuery]UserParams userParams)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
            userParams.CurrentUsername = user.UserName;
            if(string.IsNullOrEmpty(userParams.Gender)){
                userParams.Gender = user.Gender == "male" ? "female" : "male";
            }
            var users = await _userRepository.GetMembersAsync(userParams);
            Response.AddPaginationHeader(users.CurrentPage,users.PageSize,users.TotalCount,users.TotalPages);
            //We map an IEnumerable of MemberDto with retrieved users
            // var usersToReturn = _mapper.Map<IEnumerable<MemberDto>>(users);
            return Ok(users);
        }
        //We set a route name for method GetUser
        [HttpGet("{username}", Name="GetUser")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            return await _userRepository.GetMemberAsync(username);
        }

        //httpPut is unique in each controller.
        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            //this will give us the username that http uses in order to authenticate the request (Authorize Annotation)
            //We commented out, because we created an extension to get user easier and not repeat code. See Extensions->ClaimsPrincipleExtensions
            // var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

            //uses AutoMapHelper settings that we made. With this we dont have to say e.g. memberUpdateDto.city = user.city etc. Mapping will go auto.
            _mapper.Map(memberUpdateDto, user);
            _userRepository.Update(user);
            if (await _userRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Failed to update user");
        }

        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId){
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);
            if(photo.IsMain)return BadRequest("This is already your main photo");
            var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);
            if(currentMain!=null) currentMain.IsMain =false;
            photo.IsMain = true;

            if(await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to set main photo");
        }

        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId){
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
            var photo = user.Photos.FirstOrDefault(x=>x.Id == photoId);
            if(photo == null) return NotFound();
            if(photo.IsMain) return BadRequest("You cannot delete your main photo");
            if(photo.PublicId != null){
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if(result.Error != null) return BadRequest(result.Error.Message);
            }
            user.Photos.Remove(photo);
            if(await _userRepository.SaveAllAsync()) return Ok();
            return BadRequest("Failed to delete photo!");
        }


        //Http post because we create a new post
        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            //We get the user and photos. User has photo as property.Entity does the rest.
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
            //We add the file to Cloud
            var result = await _photoService.AddPhotoAsync(file);
            if(result.Error !=null) return BadRequest(result.Error.Message);
            //If stored the create a new object photo and set Url and publicId in order to access the photo
            var photo =new Photo{
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
            };
            //If user has no photos then set image as main
            if(user.Photos.Count==0){
                photo.IsMain=true;
            }

            //Add photos to user 
            user.Photos.Add(photo);
            //Save will save user and photo. User take photo as property.Entity does the rest.
            if(await _userRepository.SaveAllAsync()){
                //We use CreateAtRoute in order to send back the correct response to client (201 - created).
                //In order to call getuser we have not only to call by the link but provide the user also.
                //We call get user to return it as response to create action.
                return CreatedAtRoute("GetUser", new{ Username= user.UserName } ,_mapper.Map<PhotoDto>(photo));
                
            }

            return BadRequest("Problem adding photo");
         }

    }
}
