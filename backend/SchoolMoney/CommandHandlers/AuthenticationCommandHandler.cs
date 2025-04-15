using Domain;
using Domain.Exceptions;
using SchoolMoney.Commands;
using SchoolMoney.Response;
using SchoolMoney.Utils;
using MediatR;
using Domain.Repositories;

namespace SchoolMoney.CommandHandlers
{
    public class AuthenticationCommandHandler
        : IRequestHandler<RegisterCommand, UserResponse>
    {
        private readonly IUserRepository _userRepository;

        public AuthenticationCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserResponse> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            var userExists = _userRepository.GetList(x => x.Name == request.Username).FirstOrDefault();
            if (userExists != null)
                throw new UserAlreadyExistsException(request.Username);

            var hash = ShaHelper.QuickHash(request.Password);
            var user = new User 
            { 
                Name = request.Username,
                FirstName = request.FirstName,
                LastName = request.LastName,
                IsActive = true,
                HashedPassword = hash,
                Role = Role.User,
                DateOfBirth = request.DateOfBirth
            };
            _userRepository.Add(user);
            await _userRepository.SaveChangesAsync();

            return new UserResponse
            {
                Id = user.Id,
                Name = user.Name,
                FirstName = request.FirstName,
                LastName = request.LastName,
                IsActive = user.IsActive,
                Role = user.Role.ToString(),
                DateOfBirth = user.DateOfBirth,
            };
        }
    }
}
