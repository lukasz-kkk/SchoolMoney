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
            return NoContent();
        }

        [HttpGet("List")]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public ActionResult<ChatListResponse> ByLoggedUser()
        {
            var threadGroupResponseList = new List<GroupChatResponse>
            {
                new GroupChatResponse
                {
                    GroupId = 1,
                    GroupName = "Grupa 1",
                    LastMessageSent = DateTime.Now,
                }
            };

            var threadUserResponseList = new List<UserChatResponse>
            {
                new UserChatResponse
                {
                    UserId = 1,
                    UserFirstName = "Andrzej",
                    UserLastName = "Nazwisko",
                    LastMessageSent = DateTime.Now.AddDays(-1)
                },
                new UserChatResponse
                {
                    UserId = 2,
                    UserFirstName = "Tomek",
                    UserLastName = "Nazwisko",
                    LastMessageSent = DateTime.Now.AddDays(-2)
                }
            };

            return new ChatListResponse
            {
                GroupChatList = threadGroupResponseList,
                UserChatList = threadUserResponseList

            };
        }

        [HttpGet]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public async Task<ActionResult<IEnumerable<MessageResponse>>> GetByReceiver([FromHeader] ChatRequest dto)
        {
            return new List<MessageResponse>
            {
                new MessageResponse
                {
                    SenderUserId = 1,
                    SenderFirstName = "Jan",
                    SenderLastName = "Kowalski",
                    Content = "Jakas tam wiadomość",
                    CreatedAt = DateTime.Now.AddDays(-1)
                },
                new MessageResponse
                {
                    SenderUserId = 1,
                    SenderFirstName = "Jan",
                    SenderLastName = "Kowalski",
                    Content = "Jakas tam wiadomość 2",
                    CreatedAt = DateTime.Now.AddDays(-2)
                }
            };
        }
    }
}