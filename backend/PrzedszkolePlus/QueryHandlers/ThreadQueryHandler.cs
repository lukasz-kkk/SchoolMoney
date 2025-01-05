﻿using PrzedszkolePlus.Queries;
using PrzedszkolePlus.Response;
using MediatR;
using Domain.Repositories;
using Domain.Exceptions;
using Infrastructure;
using PrzedszkolePlus.Constants;
using PrzedszkolePlus.Exceptions;
using PrzedszkolePlus.Utils;

namespace PrzedszkolePlus.QueryHandlers
{
    public class ThreadQueryHandler : IRequestHandler<GetThreadByLoggedUserQuery, IEnumerable<ThreadResponse>>
    {
        private readonly IThreadRepository _threadRepository;
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ThreadQueryHandler(IThreadRepository threadRepository, IUserRepository userRepository,
            IHttpContextAccessor httpContextAccessor)
        {
            _threadRepository = threadRepository;
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public Task<IEnumerable<ThreadResponse>> Handle(GetThreadByLoggedUserQuery request, CancellationToken cancellationToken)
        {
            var loggedUserId = JwtHelper.GetUserIdFromCookies(_httpContextAccessor)
                ?? throw new InvalidCookieException(Cookies.UserId);

            var loggedUser = _userRepository.Get(loggedUserId)
                ?? throw new UserNotFoundException(loggedUserId);

            var threads = _threadRepository.GetList(thread => 
                thread.Parent.Id == loggedUserId || thread.Caregiver.Id == loggedUserId);

            if (threads == null || !threads.Any())
                return Task.FromResult(Enumerable.Empty<ThreadResponse>());

            var result = threads.Select(thread => new ThreadResponse
            {
                Id = thread.Id,
                IsRead = CheckIsRead(loggedUser.Role, thread),
                ReceiverId = GetReceiverId(loggedUser.Role, thread),
                Subject = thread.Subject,
                CreatedAt = thread.CreatedAt
            });
            return Task.FromResult(result);
        }

        private int GetReceiverId(Domain.Role loggedRole, Domain.Thread thread)
            => loggedRole switch
            {
                Domain.Role.User => thread.Caregiver.Id,
                Domain.Role.Admin => thread.Parent.Id,
                _ => throw new NotImplementedException(),
            };

        private bool CheckIsRead(Domain.Role loggedRole, Domain.Thread thread)
            => loggedRole switch
            {
                Domain.Role.User => !thread.Messages.Any(x => x.CreatedAt > thread.ParentLastRead),
                Domain.Role.Admin => !thread.Messages.Any(x => x.CreatedAt > thread.CaregiverLastRead),
                _ => false
            };
    }
}
