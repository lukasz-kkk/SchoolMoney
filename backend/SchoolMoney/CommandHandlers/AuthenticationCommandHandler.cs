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
        private readonly IFinancialAccountRepository _financialAccountRepository;

        public AuthenticationCommandHandler(IUserRepository userRepository, IFinancialAccountRepository financialAccountRepository)
        {
            _userRepository = userRepository;
            _financialAccountRepository = financialAccountRepository;
        }

        public async Task<UserResponse> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            var userExists = _userRepository.GetList(x => x.Login == request.login).FirstOrDefault();
            if (userExists != null)
                throw new UserAlreadyExistsException(request.login);

            var account = new FinancialAccount
            {
                Number = FinancialAccountHelper.GenerateAccountNumber(),
                Balance = 0
            };
            _financialAccountRepository.Add(account);
            await _financialAccountRepository.SaveChangesAsync();

            var hash = ShaHelper.QuickHash(request.Password);
            var user = new User 
            { 
                Login = request.login,
                FirstName = request.FirstName,
                LastName = request.LastName,
                IsActive = true,
                HashedPassword = hash,
                Role = Role.User,
                DateOfBirth = request.DateOfBirth,
                Account = account,
            };
            _userRepository.Add(user);
            await _userRepository.SaveChangesAsync();

            return new UserResponse
            {
                Id = user.Id,
                Login = user.Login,
                FirstName = request.FirstName,
                LastName = request.LastName,
                IsActive = user.IsActive,
                Role = user.Role.ToString(),
                DateOfBirth = user.DateOfBirth,
                AccoutNumber = account.Number,
            };
        }
    }
}
