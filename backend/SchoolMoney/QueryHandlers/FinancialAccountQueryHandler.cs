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
using Domain;

namespace SchoolMoney.QueryHandlers
{
    public class FinancialAccountQueryHandler : IRequestHandler<GetFinancialAccoutByLoggedUserQuery, FinancialAccountResponse>,
                                                IRequestHandler<GetTransactionsHistoryQuery, IEnumerable<TransactionResponse>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IFinancialAccountRepository _financialAccountRepository;
        private readonly ITransactionRepository _transactionRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public FinancialAccountQueryHandler(IUserRepository userRepository,
                                            IHttpContextAccessor httpContextAccessor,
                                            IFinancialAccountRepository financialAccountRepository,
                                            ITransactionRepository transactionRepository)
        {
            _userRepository = userRepository;
            _financialAccountRepository = financialAccountRepository;
            _transactionRepository = transactionRepository;
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

        public Task<IEnumerable<TransactionResponse>> Handle(GetTransactionsHistoryQuery request, CancellationToken cancellationToken)
        {
            var outgoingTransactions = _transactionRepository
                .GetList(x => x.SourceAccountNumber.Replace(" ", "") == request.AccountNumber.Replace(" ", ""));
            var incomingTransactions = _transactionRepository
                .GetList(x => x.TargetAccountNumber.Replace(" ", "") == request.AccountNumber.Replace(" ", ""));

            var transactions = outgoingTransactions
                .Concat(incomingTransactions)
                .GroupBy(x => x.Id)
                .Select(g => g.First())
                .ToList();

            var result = transactions.Select(x =>
            {
                var sender = _userRepository.Get(x.Sender.Id);

                return new TransactionResponse
                {
                    SourceAccountNumber = x.SourceAccountNumber,
                    TargetAccountNumber = x.TargetAccountNumber,
                    Amount = x.Amount,
                    Date = x.Date,
                    Name = x.Name,
                    SenderId = sender.Id,
                    SenderFirstName = sender.FirstName,
                    SenderLastName = sender.LastName,
                };
            });

            return Task.FromResult(result);
        }
    }
}
