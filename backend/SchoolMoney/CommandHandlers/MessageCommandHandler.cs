using SchoolMoney.Commands;
using MediatR;
using Domain.Repositories;
using Domain.Exceptions;
using Infrastructure;
using SchoolMoney.Constants;
using SchoolMoney.Exceptions;
using SchoolMoney.Utils;
using Domain;

namespace SchoolMoney.CommandHandlers
{
    public class MessageCommandHandler : 
        IRequestHandler<CreateMessageCommand, Unit>
    {
        private readonly IThreadRepository _threadRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserRepository _userRepository;

        public MessageCommandHandler(IThreadRepository threadRepository,
            IHttpContextAccessor httpContextAccessor, IUserRepository userRepository)
        {
            _threadRepository = threadRepository;
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
        }

        public async Task<Unit> Handle(CreateMessageCommand request, CancellationToken cancellationToken)
        {
            var thread = _threadRepository.Get(request.ThreadId)
                    ?? throw new ThreadNotFoundException(request.ThreadId);
            var loggedUserId = JwtHelper.GetUserIdFromCookies(_httpContextAccessor)
                ?? throw new InvalidCookieException(Cookies.UserId);
            var user = _userRepository.Get(loggedUserId)
                ?? throw new UserNotFoundException(loggedUserId);

            if (user.Id != thread.Parent.Id && user.Id != thread.Caregiver.Id)
                throw new UserNotAllowedInThreadException(thread.Id);

            var message = new Domain.Message
            {
                Content = request.Content,
                Sender = user,
                CreatedAt = DateTime.UtcNow
            };

            thread.Messages ??= new List<Message>();
            thread.Messages.Add(message);

            await _threadRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}