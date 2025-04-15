using Domain.Exceptions;
using SchoolMoney.Queries;
using SchoolMoney.Response;
using MediatR;
using Domain.Repositories;

namespace SchoolMoney.QueryHandlers
{
    public class UserQueryHandler : IRequestHandler<CheckloginAvailabilityQuery, bool>,
                                    IRequestHandler<GetUserQuery, UserResponse>,
                                    IRequestHandler<GetAllUsersQuery, IEnumerable<UserResponse>>,
                                    IRequestHandler<GetUsersByRoleQuery, IEnumerable<UserResponse>>
    {
        private readonly IUserRepository _userRepository;

        public UserQueryHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public Task<bool> Handle(CheckloginAvailabilityQuery request, CancellationToken cancellationToken)
        {
            var login = request.login.ToLower();

            var existingUsers = _userRepository.GetList(u => u.Login.ToLower() == login);
            if (existingUsers == null || !existingUsers.Any())
                return Task.FromResult(true);

            return Task.FromResult(false);
        }

        public Task<UserResponse> Handle(GetUserQuery request, CancellationToken cancellationToken)
        {
            var user = _userRepository.Get(request.UserId)
                ?? throw new UserNotFoundException(request.UserId);

            var result = new UserResponse
            {
                Id = user.Id,
                Login = user.Login,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = user.Role.ToString(),
                IsActive = user.IsActive,
                DateOfBirth = user.DateOfBirth,
            };
            return Task.FromResult(result);
        }

        public Task<IEnumerable<UserResponse>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
        {
            var users = _userRepository.GetList();

            if (users == null)
            {
                return Task.FromResult(Enumerable.Empty<UserResponse>());
            }

            var result = users.Select(x => new UserResponse
            {
                Id = x.Id,
                Login = x.Login,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Role = x.Role.ToString(),
                IsActive = x.IsActive,
                DateOfBirth = x.DateOfBirth,
            });

            return Task.FromResult(result);
        }

        public Task<IEnumerable<UserResponse>> Handle(GetUsersByRoleQuery request, CancellationToken cancellationToken)
        {
            var users = _userRepository.GetList(u => u.Role.ToString().ToLower() == request.UserRole.ToLower());

            if (users == null)
            {
                return Task.FromResult(Enumerable.Empty<UserResponse>());
            }

            var result = users.Select(x => new UserResponse
            {
                Id = x.Id,
                Login = x.Login,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Role = x.Role.ToString(),
                IsActive = x.IsActive,
                DateOfBirth = x.DateOfBirth,
            });

            return Task.FromResult(result);
        }
    }
}
