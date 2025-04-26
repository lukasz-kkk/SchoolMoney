using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using SchoolMoney.Response;
using SchoolMoney.Requests;
using SchoolMoney.Properties;
using MediatR;
using SchoolMoney.Commands;
using Domain.Exceptions;

namespace SchoolMoney.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FundraiserController : ControllerBase
    {
        private readonly IMediator _mediator;

        public FundraiserController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpPost]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public async Task<IActionResult> MakeTransaction([FromBody] CreateFundraiserRequest dto)
        {
            try
            {
                var command = new CreateFundraiserCommand
                {
                    Name = dto.Name,
                    Description = dto.Description,
                    Goal = dto.Goal,
                    StartDate = dto.StartDate,
                    EndDate = dto.EndDate,
                    GroupId = dto.GroupId
                };

                await _mediator.Send(command);
                return NoContent();
            }

            catch (TransactionAccountNotFoundException ex)
            {
                return StatusCode((int)HttpStatusCode.NotFound,
                    string.Format(Resource.ControllerNotFound, ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
        }
    }
}
