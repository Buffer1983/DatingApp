using System.Security.Claims;

namespace API.Extensions
{
    // Created this extension for principal claims. As get user that we use a lot.
    public static class ClaimsPrincipleExtensions
    {
        public static string GetUsername(this ClaimsPrincipal user){
            return user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
    }
}