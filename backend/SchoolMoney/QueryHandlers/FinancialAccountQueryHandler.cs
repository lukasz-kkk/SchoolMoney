using Domain.Exceptions;
using SchoolMoney.Queries;
using SchoolMoney.Response;
using MediatR;
using Domain.Repositories;
using Infrastructure;
using SchoolMoney.Constants;
using SchoolMoney.Exceptions;
using SchoolMoney.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SchoolMoney.QueryHandlers
{
    public class FinancialAccountQueryHandler : IRequestHandler<GetFinancialAccoutByLoggedUserQuery, FinancialAccountResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly IFinancialAccountRepository _financialAccountRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public FinancialAccountQueryHandler(IUserRepository userRepository,
                                            IHttpContextAccessor httpContextAccessor,
                                            IFinancialAccountRepository financialAccountRepository)
        {
            _userRepository = userRepository;
            _financialAccountRepository = financialAccountRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public Task<FinancialAccountResponse> Handle(GetFinancialAccoutByLoggedUserQuery request, CancellationToken cancellationToken)
        {
            var loggedUserId = JwtHelper.GetUserIdFromCookies(_httpContextAccessor)
                ?? throw new InvalidCookieException(Cookies.UserId);

            var user = _userRepository.Get(loggedUserId)
                ?? throw new UserNotFoundException(loggedUserId);

            var account = _financialAccountRepository.Get(user.Account.Id);

            var result = new FinancialAccountResponse
            {
                AccountNumber = account.Number,
                Balance = account.Balance,
            };

            return Task.FromResult(result);
        }
    }
}
