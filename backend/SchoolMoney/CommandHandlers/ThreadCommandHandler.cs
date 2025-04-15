using SchoolMoney.Commands;
using MediatR;
using Domain.Repositories;
using Domain.Exceptions;
using Domain;
using Infrastructure;
using SchoolMoney.Constants;
using SchoolMoney.Exceptions;
using SchoolMoney.Utils;

namespace SchoolMoney.CommandHandlers
{
    public class ThreadCommandHandler : 
        IRequestHandler<CreateThreadCommand, Unit>,
        IRequestHandler<UpdateThreadLastReadCommand, Unit>
    {
        private readonly IThreadRepository _threadRepository;
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ThreadCommandHandler(IThreadRepository threadRepository, IUserRepository userRepository,
            IHttpContextAccessor httpContextAccessor)
        {
            _threadRepository = threadRepository;
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Unit> Handle(CreateThreadCommand request, CancellationToken cancellationToken)
        {
            var parent = _userRepository.Get(request.ParentId)
                ?? throw new UserNotFoundException(request.ParentId);
            var caregiver = _userRepository.Get(request.CaregiverId)
                ?? throw new UserNotFoundException(request.CaregiverId);

            if(parent.Role != Role.User)
                throw new UserHasWrongRoleInThreadException("Parent", parent.Id);
            if(caregiver.Role != Role.Admin)
                throw new UserHasWrongRoleInThreadException("Caregiver", parent.Id);

            var thread = new Domain.Thread
            {
                Parent = parent,
                Caregiver = caregiver,
                Subject = request.Subject,
                CreatedAt = DateTime.UtcNow
            };

            _threadRepository.Add(thread);
            await _threadRepository.SaveChangesAsync();

            return Unit.Value;
        }

        public async Task<Unit> Handle(UpdateThreadLastReadCommand request, CancellationToken cancellationToken)
        {
            var thread = _threadRepository.Get(request.ThreadId)
                ?? throw new ThreadNotFoundException(request.ThreadId);
            var loggedUserId = JwtHelper.GetUserIdFromCookies(_httpContextAccessor)
                ?? throw new InvalidCookieException(Cookies.UserId);
            var loggedUser = _userRepository.Get(loggedUserId)
                ?? throw new UserNotFoundException(loggedUserId);

            if (loggedUser.Id == thread.Parent.Id)
                thread.ParentLastRead = DateTime.UtcNow;
            else if (loggedUser.Id == thread.Caregiver.Id)
                thread.CaregiverLastRead = DateTime.UtcNow;
            else
                throw new UserNotAllowedInThreadException(loggedUser.Id);

            await _threadRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}