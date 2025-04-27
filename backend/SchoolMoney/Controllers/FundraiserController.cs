using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using SchoolMoney.Response;
using SchoolMoney.Requests;
using SchoolMoney.Properties;
using MediatR;
using SchoolMoney.Commands;
using Domain.Exceptions;
using SchoolMoney.Exceptions;

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
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public async Task<IActionResult> CreateFundraiser([FromBody] CreateFundraiserRequest dto)
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
            catch (InvalidCookieException ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    string.Format(Resource.ControllerBadRequest, ex.Message));
            }
            catch (FundraiserNameAlreadyExistsException ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    string.Format(Resource.ControllerBadRequest, ex.Message));
            }
            catch (GroupNotFoundException ex)
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

        [HttpPut("{id}/exclude")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public async Task<IActionResult> ExcludeChild(int id, [FromBody] ExcludeChildRequest dto)
        {
            try
            {
                var command = new ExcludeChildCommand
                {
                    ChildId = dto.ChildId,
                    FundraiserId = id,
                };

                await _mediator.Send(command);
                return NoContent();
            }
            catch (ChildNotFoundException ex)
            {
                return StatusCode((int)HttpStatusCode.NotFound,
                    string.Format(Resource.ControllerNotFound, ex.Message));
            }
            catch (FundraiserNotFoundException ex)
            {
                return StatusCode((int)HttpStatusCode.NotFound,
                    string.Format(Resource.ControllerNotFound, ex.Message));
            }
            catch (ChildDoesntBelongToFundraiserException ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    string.Format(Resource.ControllerNotFound, ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
        }

        [HttpPut("{id}/block")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public async Task<IActionResult> Block(int id)
        {
            try
            {
                var command = new SwitchBlockFundraiserCommand
                {
                    FundraiserId = id,
                    IsBlocked = true,
                };

                await _mediator.Send(command);
                return NoContent();
            }
            catch (FundraiserNotFoundException ex)
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

        [HttpPut("{id}/unlock")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public async Task<IActionResult> Unlock(int id)
        {
            try
            {
                var command = new SwitchBlockFundraiserCommand
                {
                    FundraiserId = id,
                    IsBlocked = false,
                };

                await _mediator.Send(command);
                return NoContent();
            }
            catch (FundraiserNotFoundException ex)
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

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public async Task<IActionResult> DeleteFundraiser(int id)
        {
            try
            {
                var command = new DeleteFundraiserCommand
                {
                    FundraiserId = id
                };

                await _mediator.Send(command);
                return NoContent();
            }
            catch (FundraiserNotFoundException ex)
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
