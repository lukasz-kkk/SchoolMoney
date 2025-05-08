using Domain.Exceptions;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using MediatR;
using SchoolMoney.Commands;
using SchoolMoney.Exceptions;
using SchoolMoney.Properties;
using SchoolMoney.Queries;
using SchoolMoney.Requests;
using SchoolMoney.Response;

namespace PrzedszkolePlus.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ChatController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("Message")]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public async Task<ActionResult> Post([FromBody] MessageRequest dto)
        {
            var request = new CreateMessageCommand
            {
                ReceiverGroupId = dto.ReceiverGroupId,
                ReceiverUserId = dto.ReceiverUserId,
                Content = dto.Content
            };

            try
            {
                await _mediator.Send(request);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
        }

        [HttpGet("List")]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public async Task<ActionResult<ChatListResponse>> ByLoggedUser()
        {
            try
            {
                var query = new GetChatListQuery
                {
                };
                var result = await _mediator.Send(query);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
        }

        [HttpGet]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public async Task<ActionResult<IEnumerable<MessageResponse>>> GetByReceiver([FromQuery] ChatRequest dto)
        {
            try
            {
                var query = new GetMessagesByReceiverQuery
                {
                    ReceiverUserId = dto.ReceiverUserId,
                    ReceiverGroupId = dto.ReceiverGroupId,
                };
                var result = await _mediator.Send(query);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
        }
    }
}