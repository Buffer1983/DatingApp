using API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{    
    //In order to log last user activity. We put it here because all pass through here
    //API.controllers contain all of controllers and actions made on them, an pass from here
    [ServiceFilter(typeof(LogUserActivity))]
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController: ControllerBase
    {
    
    }
}