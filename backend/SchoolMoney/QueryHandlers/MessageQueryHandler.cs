using SchoolMoney.Queries;
using SchoolMoney.Response;
using MediatR;
using Domain.Repositories;
using SchoolMoney.Constants;
using SchoolMoney.Exceptions;
using SchoolMoney.Utils;
using Domain.Exceptions;
using Infrastructure;
using System.Globalization;
using System.Text.Json;
using System.Text;
using Infrastructure.Migrations;
using System.Collections.Generic;

namespace SchoolMoney.QueryHandlers
{
    public class MessageQueryHandler : IRequestHandler<GetMessagesByReceiverQuery, IEnumerable<MessageResponse>>
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IMessageRepository _messageRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public MessageQueryHandler(IGroupRepository groupRepository,
                                 IHttpContextAccessor httpContextAccessor,
                                 IMessageRepository messageRepository)
        {
            _groupRepository = groupRepository;
            _httpContextAccessor = httpContextAccessor;
            _messageRepository = messageRepository;
        }

        public Task<IEnumerable<MessageResponse>> Handle(GetMessagesByReceiverQuery request, CancellationToken cancellationToken)
        {
            List<Message> messages = null;

            var loggedUserId = JwtHelper.GetUserIdFromCookies(_httpContextAccessor)
                ?? throw new InvalidCookieException(Cookies.UserId);

            if (request.ReceiverGroupId != 0)
                messages = _messageRepository.GetList(m => m.ReceiverGroupId == request.ReceiverGroupId);

            if (request.ReceiverUserId != 0)
                messages = _messageRepository.GetList(m => 
                    (m.ReceiverUserId == request.ReceiverUserId &&
                    m.Sender.Id == loggedUserId)
                    ||
                    (m.ReceiverUserId == loggedUserId &&
                    m.Sender.Id == request.ReceiverUserId)
                    );

            if (messages == null)
            {
                return Task.FromResult(Enumerable.Empty<MessageResponse>());
            }

            var result = messages.Select(x => new MessageResponse
            {
                MessageId = x.Id,
                SenderId = x.Sender.Id,
                SenderFirstName = x.Sender.FirstName,
                SenderLastName = x.Sender.LastName,
                Content = x.Content,
                CreatedAt = x.CreatedAt
            });

            return Task.FromResult(result);
        }
    }
}
