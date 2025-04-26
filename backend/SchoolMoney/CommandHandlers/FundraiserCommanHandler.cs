using Domain;
using Domain.Exceptions;
using Domain.Repositories;
using Infrastructure;
using MediatR;
using SchoolMoney.Commands;
using SchoolMoney.Constants;
using SchoolMoney.Exceptions;
using SchoolMoney.Utils;

namespace SchoolMoney.CommandHandlers
{
    public class FundraiserCommandHandler : IRequestHandler<CreateFundraiserCommand, Unit>
    {
        private readonly IUserRepository _userRepository;
        private readonly IFundraiserRepository _FundraiserRepository;
        private readonly ITransactionRepository _transactionRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public FundraiserCommandHandler(
            IUserRepository userRepository,
            IFundraiserRepository FundraiserRepository,
            ITransactionRepository transactionRepository,
            IHttpContextAccessor httpContextAccessor)
        {
            _userRepository = userRepository;
            _FundraiserRepository = FundraiserRepository;
            _transactionRepository = transactionRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Unit> Handle(CreateFundraiserCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
