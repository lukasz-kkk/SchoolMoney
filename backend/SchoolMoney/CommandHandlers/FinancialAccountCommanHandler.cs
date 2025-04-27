using Domain;
using Domain.Exceptions;
using Domain.Repositories;
using Infrastructure;
using MediatR;
using SchoolMoney.Commands;
using SchoolMoney.Constants;
using SchoolMoney.Exceptions;
using SchoolMoney.Utils;
using System.Text.RegularExpressions;

namespace SchoolMoney.CommandHandlers
{
    public class FinancialAccountCommandHandler : IRequestHandler<MakeTransactionCommand, Unit>
    {
        private readonly IUserRepository _userRepository;
        private readonly IFinancialAccountRepository _financialAccountRepository;
        private readonly ITransactionRepository _transactionRepository;
        private readonly IChildRepository _childRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public FinancialAccountCommandHandler(
            IUserRepository userRepository,
            IFinancialAccountRepository financialAccountRepository,
            ITransactionRepository transactionRepository,
            IChildRepository childRepository,
            IHttpContextAccessor httpContextAccessor)
        {
            _userRepository = userRepository;
            _financialAccountRepository = financialAccountRepository;
            _transactionRepository = transactionRepository;
            _childRepository = childRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Unit> Handle(MakeTransactionCommand request, CancellationToken cancellationToken)
        {
            var loggedUserId = JwtHelper.GetUserIdFromCookies(_httpContextAccessor)
                ?? throw new InvalidCookieException(Cookies.UserId);

            var user = _userRepository.Get(loggedUserId)
                ?? throw new UserNotFoundException(loggedUserId);

            var amount = (int)request.Amount;

            if (amount <= 0)
                throw new TransactionInvalidAmountException();

            if (IsDeposit(request))
                HandleDeposit(request, amount);

            else if (IsWithdrawal(request))
                HandleWithdrawal(request, user.Account, amount);

            else
                HandleTransfer(request, user.Account, amount);

            var transaction = new Transaction
            {
                SourceAccountNumber = request.SourceAccountNumber,
                TargetAccountNumber = request.TargetAccountNumber,
                Name = request.Name,
                Amount = amount,
                Date = DateTime.UtcNow,
                Sender = user
            };

            var match = Regex.Match(request.Name, "#(?<childId>\\d+)");
            if (match.Success)
            {
                var childId = match.Groups["childId"].Value;
                var child = _childRepository.Get(int.Parse(childId));
                transaction.Child = child;
            }

            _transactionRepository.Add(transaction);

            await _transactionRepository.SaveChangesAsync();
            await _userRepository.SaveChangesAsync();
            return Unit.Value;
        }

        private bool IsDeposit(MakeTransactionCommand request)
            => request.SourceAccountNumber == "External";

        private bool IsWithdrawal(MakeTransactionCommand request)
            => request.TargetAccountNumber == "External";

        private void HandleDeposit(MakeTransactionCommand request, int amount)
        {
            var targetAccount = _financialAccountRepository.FirstOrDefault(x => x.Number == request.TargetAccountNumber)
                ?? throw new TransactionAccountNotFoundException(request.TargetAccountNumber);

            targetAccount.Balance += amount;
        }

        private void HandleWithdrawal(MakeTransactionCommand request, Domain.FinancialAccount userAccount, int amount)
        {
            var sourceAccount = _financialAccountRepository.FirstOrDefault(x => x.Number == request.SourceAccountNumber)
                ?? throw new TransactionAccountNotFoundException(request.SourceAccountNumber);

            if (sourceAccount.Id != userAccount.Id && !request.TechnicalOperation)
                throw new TransactionUnauthorizedException();

            if (sourceAccount.Balance < amount)
                throw new TransactionNotEnoughFundsException();

            sourceAccount.Balance -= amount;
        }

        private void HandleTransfer(MakeTransactionCommand request, Domain.FinancialAccount userAccount, int amount)
        {
            var sourceAccount = _financialAccountRepository.FirstOrDefault(x => x.Number == request.SourceAccountNumber)
                ?? throw new TransactionAccountNotFoundException(request.SourceAccountNumber);

            var targetAccount = _financialAccountRepository.FirstOrDefault(x => x.Number == request.TargetAccountNumber)
                ?? throw new TransactionAccountNotFoundException(request.TargetAccountNumber);

            if (sourceAccount.Id != userAccount.Id && !request.TechnicalOperation)
                throw new TransactionUnauthorizedException();

            if (sourceAccount.Balance < amount)
                throw new TransactionNotEnoughFundsException();

            sourceAccount.Balance -= amount;
            targetAccount.Balance += amount;
        }
    }
}
