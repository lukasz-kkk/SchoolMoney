using Domain;
using Domain.Exceptions;
using Domain.Repositories;
using MediatR;
using SchoolMoney.Commands;
using SchoolMoney.Constants;
using SchoolMoney.Exceptions;
using SchoolMoney.Utils;

namespace SchoolMoney.CommandHandlers
{
    public class FundraiserCommandHandler : 
        IRequestHandler<CreateFundraiserCommand, Unit>,
        IRequestHandler<ExcludeChildCommand, Unit>,
        IRequestHandler<SwitchBlockFundraiserCommand, Unit>
    {
        private readonly IUserRepository _userRepository;
        private readonly IFundraiserRepository _fundraiserRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IFinancialAccountRepository _financialAccountRepository;
        private readonly IGroupRepository _groupRepository;
        private readonly IChildRepository _childRepository;

        public FundraiserCommandHandler(
            IUserRepository userRepository,
            IFundraiserRepository FundraiserRepository,
            IHttpContextAccessor httpContextAccessor,
            IFinancialAccountRepository financialAccountRepository,
            IGroupRepository groupRepository,
            IChildRepository childRepository)
        {
            _userRepository = userRepository;
            _fundraiserRepository = FundraiserRepository;
            _httpContextAccessor = httpContextAccessor;
            _financialAccountRepository = financialAccountRepository;
            _groupRepository = groupRepository;
            _childRepository = childRepository;
        }

        public async Task<Unit> Handle(CreateFundraiserCommand request, CancellationToken cancellationToken)
        {
            if (_fundraiserRepository.Exists(request.Name))
                throw new FundraiserNameAlreadyExistsException(request.Name);

            var loggedUserId = JwtHelper.GetUserIdFromCookies(_httpContextAccessor)
                ?? throw new InvalidCookieException(Cookies.UserId);

            var user = _userRepository.Get(loggedUserId)
                ?? throw new UserNotFoundException(loggedUserId);

            var account = new FinancialAccount
            {
                Number = FinancialAccountHelper.GenerateAccountNumber(),
                Balance = 0
            };
            _financialAccountRepository.Add(account);
            await _financialAccountRepository.SaveChangesAsync();

            var group = _groupRepository.Get(request.GroupId)
                ?? throw new GroupNotFoundException(request.GroupId);
            
            var fundraiser = new Fundraiser(request.Name, request.Description, request.Goal, request.StartDate, request.EndDate, 
                account, user, group);
            _fundraiserRepository.Add(fundraiser);
            await _fundraiserRepository.SaveChangesAsync();
            return Unit.Value;
        }

        public async Task<Unit> Handle(ExcludeChildCommand request, CancellationToken cancellationToken)
        {
            var fundraiser = _fundraiserRepository.Get(request.FundraiserId)
                ?? throw new FundraiserNotFoundException(request.FundraiserId);
            var child = _childRepository.Get(request.ChildId)
                ?? throw new ChildNotFoundException(request.ChildId);

            fundraiser.ExcludeChild(child);
            await _fundraiserRepository.SaveChangesAsync();
            return Unit.Value;
        }

        public async Task<Unit> Handle(SwitchBlockFundraiserCommand request, CancellationToken cancellationToken)
        {
            var fundraiser = _fundraiserRepository.Get(request.FundraiserId)
                ?? throw new FundraiserNotFoundException(request.FundraiserId);

            fundraiser.IsBlocked = request.IsBlocked;
            await _fundraiserRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
