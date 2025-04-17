using Domain.Exceptions;
using SchoolMoney.Commands;
using SchoolMoney.Constants;
using SchoolMoney.Exceptions;
using SchoolMoney.Extensions;
using SchoolMoney.Properties;
using SchoolMoney.Queries;
using SchoolMoney.Requests;
using SchoolMoney.Response;
using SchoolMoney.Utils;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;

namespace SchoolMoney.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IMediator _mediator;

        public AuthenticationController(IConfiguration configuration, IMediator mediator)
        {
            _configuration = configuration;
            _mediator = mediator;
        }

        [HttpPost("Register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
#if !DEBUG
        [AllowAnonymous]
#endif
        public async Task<ActionResult<UserResponse>> Register([FromBody] RegisterRequest dto)
        {
            var command = new RegisterCommand
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Password = dto.Password,
                login = dto.login,
                DateOfBirth = dto.DateOfBirth,
            };

            try
            {
                var response = await _mediator.Send(command);
                AppendToCookie(response);

                return Ok(response);
            }
            catch (UserAlreadyExistsException ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    string.Format(Resource.ControllerBadRequest, ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
        }

        [HttpPost("Login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [AllowAnonymous]
        public async Task<ActionResult<UserResponse>> Login([FromBody] LoginRequest dto)
        {
            var query = new LoginQuery
            {
                Password = dto.Password,
                login = dto.login
            };
            try
            {
                var response = await _mediator.Send(query);
                AppendToCookie(response);

                return Ok(new UserResponse
                {
                    Id = response.Id,
                    Login = response.Login,
                    FirstName = response.FirstName,
                    LastName = response.LastName,
                    Role = response.Role,
                    IsActive = response.IsActive,
                    DateOfBirth = response.DateOfBirth,
                    AccoutNumber = response.AccoutNumber
                });
            }
            catch (UserNotFoundException ex)
            {
                return StatusCode((int)HttpStatusCode.NotFound,
                    string.Format(Resource.ControllerNotFound, ex.Message));
            }
            catch (PasswordNotMatchException ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    string.Format(Resource.ControllerBadRequest, ex.Message));
            }
            catch (UserIsNotActiveException ex)
            {
                return StatusCode((int)HttpStatusCode.Forbidden,
                    string.Format(Resource.ControllerForbidden, ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
        }

        [HttpPost("Logout")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public IActionResult Logout()
        {
            try
            {
                Response.Cookies.Delete(Cookies.UserId, new CookieOptions()
                {
                    SameSite = SameSiteMode.None,
                    Secure = true,
                    HttpOnly = true,
                    MaxAge = new TimeSpan(12, 0, 0),
                    Domain = "localhost"
                });
                Response.Cookies.Delete(Cookies.AccessToken, new CookieOptions()
                {
                    SameSite = SameSiteMode.None,
                    Secure = true,
                    HttpOnly = true,
                    MaxAge = new TimeSpan(12, 0, 0),
                    Domain = "localhost"
                });

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
        }

        private void AppendToCookie(UserResponse response)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Role, response.Role)
            };

            var signingKey = Environment.GetEnvironmentVariable(_configuration["JWT:EnvironmentSecretVariableName"]);
            if (string.IsNullOrEmpty(signingKey))
                throw new MissingSigningKeyException();

            var token = JwtHelper.GetJwtToken(
                response.Login,
                signingKey,
                _configuration["JWT:Issuer"],
                _configuration["JWT:Audience"],
                TimeSpan.FromMinutes(24 * 60),
                claims.ToArray());

            Response.Cookies
                .AppendToCookie(Cookies.AccessToken, new JwtSecurityTokenHandler().WriteToken(token))
                .AppendToCookie(Cookies.UserId, response.Id.ToString());
        }
    }
}