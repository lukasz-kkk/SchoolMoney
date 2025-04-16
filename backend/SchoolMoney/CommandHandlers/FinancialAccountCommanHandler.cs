using Domain.Exceptions;
using Domain.Repositories;
using MediatR;
using SchoolMoney.Commands;
using SchoolMoney.Constants;
using SchoolMoney.Exceptions;
using SchoolMoney.Utils;

namespace SchoolMoney.CommandHandlers
{
    public class FinancialAccountCommandHandler : IRequestHandler<MakeTransactionCommand, Unit>
    {
        private readonly IUserRepository _userRepository;
        private readonly IFinancialAccountRepository _financialAccountRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public FinancialAccountCommandHandler(
            IUserRepository userRepository,
            IFinancialAccountRepository financialAccountRepository,
            IHttpContextAccessor httpContextAccessor)
        {
            _userRepository = userRepository;
            _financialAccountRepository = financialAccountRepository;
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

            if (sourceAccount.Id != userAccount.Id)
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

            if (sourceAccount.Id != userAccount.Id)
                throw new TransactionUnauthorizedException();

            if (sourceAccount.Balance < amount)
                throw new TransactionNotEnoughFundsException();

            sourceAccount.Balance -= amount;
            targetAccount.Balance += amount;
        }
    }
}
