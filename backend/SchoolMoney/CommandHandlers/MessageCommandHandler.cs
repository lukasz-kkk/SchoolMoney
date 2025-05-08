using Domain;
using Domain.Exceptions;
using SchoolMoney.Commands;
using SchoolMoney.Response;
using SchoolMoney.Utils;
using MediatR;
using Domain.Repositories;
using SchoolMoney.Exceptions;
using SchoolMoney.Constants;

namespace SchoolMoney.CommandHandlers
{
    public class MessageCommandHandler
        : IRequestHandler<CreateMessageCommand, Unit>
    {
        private readonly IUserRepository _userRepository;
        private readonly IMessageRepository _messageRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public MessageCommandHandler(IUserRepository userRepository,
                                            IHttpContextAccessor httpContextAccessor,
                                            IMessageRepository messageRepository)
        {
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
            _messageRepository = messageRepository;
        }

        public async Task<Unit> Handle(CreateMessageCommand request, CancellationToken cancellationToken)
        {
            var loggedUserId = JwtHelper.GetUserIdFromCookies(_httpContextAccessor)
                ?? throw new InvalidCookieException(Cookies.UserId);

            var user = _userRepository.Get(loggedUserId)
                ?? throw new UserNotFoundException(loggedUserId);

            var message = new Message
            {
                Sender = user,
                Content = request.Content,
                CreatedAt = DateTime.Now
            };

            if(request.ReceiverUserId != 0)
                message.ReceiverUserId = request.ReceiverUserId;

            if(request.ReceiverGroupId != 0)
                message.ReceiverGroupId = request.ReceiverGroupId;

            _messageRepository.Add(message);
            await _messageRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
