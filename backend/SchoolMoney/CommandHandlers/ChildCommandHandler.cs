using Domain;
using Domain.Exceptions;
using SchoolMoney.Commands;
using MediatR;
using Domain.Repositories;
using SchoolMoney.Constants;
using SchoolMoney.Exceptions;
using SchoolMoney.Utils;
using Infrastructure;

namespace SchoolMoney.CommandHandlers
{
    public class ChildCommandHandler : IRequestHandler<CreateChildCommand, Unit>,
                                       IRequestHandler<UpdateChildParentCommand, Unit>,
                                       IRequestHandler<UpdateChildGroupCommand, Unit>,
                                       IRequestHandler<DeleteChildCommand, Unit>,
                                       IRequestHandler<UpdateChildIsAcceptedCommand, Unit>,
                                       IRequestHandler<UpdateChildCommand, Unit>
    { 
        private readonly IChildRepository _childRepository;
        private readonly IUserRepository _userRepository;
        private readonly IGroupRepository _groupRepository;
        private readonly ITransactionRepository _transactionRepository;
        private readonly IMediator _mediator;
        private readonly IFundraiserRepository _fundraiserRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ChildCommandHandler(IChildRepository childRepository,
                                   IUserRepository userRepository,
                                   IGroupRepository groupRepository,
                                   ITransactionRepository transactionRepository,
                                   IMediator mediator,
                                   IFundraiserRepository fundraiserRepository,
                                   IHttpContextAccessor httpContextAccessor)
        {
            _childRepository = childRepository;
            _userRepository = userRepository;
            _groupRepository = groupRepository;
            _transactionRepository = transactionRepository;
            _mediator = mediator;
            _fundraiserRepository = fundraiserRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Unit> Handle(CreateChildCommand request, CancellationToken cancellationToken)
        {
            var loggedUserId = JwtHelper.GetUserIdFromCookies(_httpContextAccessor)
                ?? throw new InvalidCookieException(Cookies.UserId);

            var user = _userRepository.Get(loggedUserId)
                ?? throw new UserNotFoundException(loggedUserId);

            var child = new Child
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                DateOfBirth = request.DateOfBirth,
                IsAccepted = false,
                CreatedAt = DateTime.Now,
                Parent = user
            };

            _childRepository.Add(child);
            await _childRepository.SaveChangesAsync();

            return Unit.Value;
        }

        public async Task<Unit> Handle(UpdateChildParentCommand request, CancellationToken cancellationToken)
        {
            var child = _childRepository.Get(request.ChildId)
                ?? throw new ChildNotFoundException(request.ChildId);

            var newParent = _userRepository.Get(request.NewParentId)
                    ?? throw new UserNotFoundException(request.NewParentId);

            child.Parent = newParent;
            await _childRepository.SaveChangesAsync();

            return Unit.Value;
        }

        public async Task<Unit> Handle(UpdateChildGroupCommand request, CancellationToken cancellationToken)
        {
            var child = _childRepository.Get(request.ChildId)
                ?? throw new ChildNotFoundException(request.ChildId);

            var newGroup = _groupRepository.Get(request.NewGroupId)
                    ?? throw new GroupNotFoundException(request.NewGroupId);

            child.Group = newGroup;
            await _childRepository.SaveChangesAsync();

            return Unit.Value;
        }

        public async Task<Unit> Handle(UpdateChildIsAcceptedCommand request, CancellationToken cancellationToken)
        {
            var child = _childRepository.Get(request.ChildId)
                ?? throw new ChildNotFoundException(request.ChildId);

            var group = _groupRepository.Get(child.Group.Id)
                ?? throw new ChildDoesntHaveJoinRequest(request.ChildId);

            var loggedUserId = JwtHelper.GetUserIdFromCookies(_httpContextAccessor)
                ?? throw new InvalidCookieException(Cookies.UserId);

            if (group.Treasurer.Id != loggedUserId)
                throw new UserIsNotTreasurerException(loggedUserId);

            child.IsAccepted = request.NewIsAccepted;

            if (request.NewIsAccepted == false)
            {
                child.Group = null;
            }

            await _childRepository.SaveChangesAsync();

            return Unit.Value;
        }

        public async Task<Unit> Handle(UpdateChildCommand request, CancellationToken cancellationToken)
        {
            var child = _childRepository.Get(request.ChildId)
                ?? throw new ChildNotFoundException(request.ChildId);

            var loggedUserId = JwtHelper.GetUserIdFromCookies(_httpContextAccessor)
                ?? throw new InvalidCookieException(Cookies.UserId);

            if (child.Parent.Id != loggedUserId)
                throw new UserIsNotParentOfThisChildException(loggedUserId, child.Id);

            child.FirstName = request.FirstName;
            child.LastName = request.LastName;
            child.DateOfBirth = request.DateOfBirth;

            await _childRepository.SaveChangesAsync();

            return Unit.Value;
        }

        public async Task<Unit> Handle(DeleteChildCommand request, CancellationToken cancellationToken)
        {
            var child = _childRepository.Get(request.ChildId)
                ?? throw new ChildNotFoundException(request.ChildId);

            var parentChildAccount = _childRepository.GetAccount(request.ChildId);
            var fundraiserAccounts = _fundraiserRepository.GetChildFundraisers(request.ChildId);
            foreach (var fundraiserAccount in fundraiserAccounts)
            {
                var balance = _transactionRepository.GetBalanceForChild(fundraiserAccount.FinancialAccount.Number, child);

                if (balance > 0)
                {
                    var command = new MakeTransactionCommand
                    {
                        Name = $"Przelew automatyczny za dziecko #{child.Id}",
                        SourceAccountNumber = fundraiserAccount.FinancialAccount.Number,
                        TargetAccountNumber = parentChildAccount,
                        Amount = balance,
                        TechnicalOperation = true
                    };

                    await _mediator.Send(command);
                }
            }

            var childTransactions = _transactionRepository.GetListByChild(request.ChildId);
            foreach (var transaction in childTransactions)
            {
                transaction.Child = null;
            }
            _childRepository.Delete(child);
            await _childRepository.SaveChangesAsync();
            await _transactionRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
