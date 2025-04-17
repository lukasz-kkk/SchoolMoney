using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using SchoolMoney.Response;
using SchoolMoney.Requests;
using SchoolMoney.Properties;
using MediatR;
using SchoolMoney.Exceptions;
using SchoolMoney.Queries;
using SchoolMoney.Commands;
using Domain.Exceptions;

namespace SchoolMoney.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FinancialAccountController : ControllerBase
    {
        private readonly IMediator _mediator;

        public FinancialAccountController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("ByLoggedUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public async Task<ActionResult<FinancialAccountResponse>> GetMyAccount()
        {
            try
            {
                var query = new GetFinancialAccoutByLoggedUserQuery();
                var result = await _mediator.Send(query);
                return Ok(result);
            }
            catch (InvalidCookieException ex)
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

        [HttpPost("Transaction")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public async Task<IActionResult> MakeTransaction([FromBody] TransactionRequest dto)
        {
            try
            {
                var command = new MakeTransactionCommand
                {
                    Name = dto.Name,
                    SourceAccountNumber = dto.SourceAccountNumber,
                    TargetAccountNumber = dto.TargetAccountNumber,
                    Amount = dto.Amount
                };

                await _mediator.Send(command);
                return NoContent();
            }
            catch (InvalidCookieException ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    string.Format(Resource.ControllerBadRequest, ex.Message));
            }
            catch (TransactionInvalidAmountException ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    string.Format(Resource.ControllerBadRequest, ex.Message));
            }
            catch (TransactionNotEnoughFundsException ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    string.Format(Resource.ControllerBadRequest, ex.Message));
            }
            catch (TransactionAccountNotFoundException ex)
            {
                return StatusCode((int)HttpStatusCode.NotFound,
                    string.Format(Resource.ControllerNotFound, ex.Message));
            }
            catch (TransactionUnauthorizedException ex)
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
    }
}
