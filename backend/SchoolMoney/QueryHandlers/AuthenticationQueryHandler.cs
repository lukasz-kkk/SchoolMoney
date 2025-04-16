using Domain.Exceptions;
using SchoolMoney.Queries;
using SchoolMoney.Response;
using SchoolMoney.Utils;
using MediatR;
using Domain.Repositories;

namespace SchoolMoney.QueryHandlers
{
    public class AuthenticationQueryHandler 
        :IRequestHandler<LoginQuery, UserResponse>
    {
        private readonly IUserRepository _userRepository;

        public AuthenticationQueryHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public Task<UserResponse> Handle(LoginQuery request, CancellationToken cancellationToken)
        {
            var user = _userRepository.GetList(x => x.Login == request.login).FirstOrDefault()
                ?? throw new UserNotFoundException(request.login);

            var hash = ShaHelper.QuickHash(request.Password);
            if (hash.ToLower() != user.HashedPassword.ToLower())
                throw new PasswordNotMatchException(request.login);

            if (!user.IsActive)
                throw new UserIsNotActiveException(user.Id);

            return Task.FromResult(new UserResponse
            {
                Id = user.Id,
                Login = user.Login,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = user.Role.ToString(),
                IsActive = user.IsActive,
                DateOfBirth = user.DateOfBirth,
                AccoutNumber = user.Account.Number
            });
        }
    }
}
