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
        IRequestHandler<SwitchBlockFundraiserCommand, Unit>,
        IRequestHandler<DeleteFundraiserCommand, Unit>,
        IRequestHandler<UpdateFundraiserCommand, Unit>,
        IRequestHandler<UploadFileCommand, Unit>
    {
        private readonly IUserRepository _userRepository;
        private readonly IFundraiserRepository _fundraiserRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IFinancialAccountRepository _financialAccountRepository;
        private readonly ITransactionRepository _transactionRepository;
        private readonly IGroupRepository _groupRepository;
        private readonly IMediator _mediator;
        private readonly IChildRepository _childRepository;
        private readonly IFileRepository _fileRepository;

        public FundraiserCommandHandler(
            IUserRepository userRepository,
            IFundraiserRepository FundraiserRepository,
            IHttpContextAccessor httpContextAccessor,
            IFinancialAccountRepository financialAccountRepository,
            ITransactionRepository transactionRepository,
            IGroupRepository groupRepository,
            IMediator mediator,
            IChildRepository childRepository,
            IFileRepository fileRepository)
        {
            _userRepository = userRepository;
            _fundraiserRepository = FundraiserRepository;
            _httpContextAccessor = httpContextAccessor;
            _financialAccountRepository = financialAccountRepository;
            _transactionRepository = transactionRepository;
            _groupRepository = groupRepository;
            _mediator = mediator;
            _childRepository = childRepository;
            _fileRepository = fileRepository;
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
            
            var fundraiser = new Fundraiser(request.Name, request.Description, request.AmountPerPerson, request.StartDate, request.EndDate, 
                account, user, group);
            _fundraiserRepository.Add(fundraiser);
            await _fundraiserRepository.SaveChangesAsync();
            return Unit.Value;
        }
        public async Task<Unit> Handle(UpdateFundraiserCommand request, CancellationToken cancellationToken)
        {
            if (!_fundraiserRepository.Exists(request.Id))
                throw new FundraiserNotFoundException(request.Id);
            
            var fundraiser = _fundraiserRepository.Get(request.Id);
            
            fundraiser.Name = request.Name;
            fundraiser.Description = request.Description;
            fundraiser.StartDate = request.StartDate;
            fundraiser.EndDate = request.EndDate;

            await _fundraiserRepository.SaveChangesAsync();
            return Unit.Value;
        }

        public async Task<Unit> Handle(ExcludeChildCommand request, CancellationToken cancellationToken)
        {
            var fundraiser = _fundraiserRepository.Get(request.FundraiserId)
                ?? throw new FundraiserNotFoundException(request.FundraiserId);
            var child = _childRepository.Get(request.ChildId)
                ?? throw new ChildNotFoundException(request.ChildId);

            var fundraiserAccount = _fundraiserRepository.GetAccount(request.FundraiserId);
            var parentChildAccount = _childRepository.GetAccount(request.ChildId);
            var balance = _transactionRepository.GetBalanceForChild(fundraiserAccount, child);

            if(balance > 0)
            {
                var command = new MakeTransactionCommand
                {
                    Name = $"Przelew automatyczny za dziecko #{child.Id}",
                    SourceAccountNumber = fundraiserAccount,
                    TargetAccountNumber = parentChildAccount,
                    Amount = balance,
                    TechnicalOperation = true
                };

                await _mediator.Send(command);
            }

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

        public async Task<Unit> Handle(DeleteFundraiserCommand request, CancellationToken cancellationToken)
        {
            var fundraiser = _fundraiserRepository.Get(request.FundraiserId)
                ?? throw new FundraiserNotFoundException(request.FundraiserId);
            var fundraiserAccount = _fundraiserRepository.GetAccount(request.FundraiserId);

            var childrens = _fundraiserRepository.GetListOfMembers(request.FundraiserId);

            foreach (var children in childrens)
            {
                var parentChildAccount = _childRepository.GetAccount(children.Id);
                var balance = _transactionRepository.GetBalanceForChild(fundraiserAccount, children);

                if (balance > 0)
                {
                    var command = new MakeTransactionCommand
                    {
                        Name = $"Przelew automatyczny za dziecko #{children.Id}",
                        SourceAccountNumber = fundraiserAccount,
                        TargetAccountNumber = parentChildAccount,
                        Amount = balance,
                        TechnicalOperation = true
                    };

                    await _mediator.Send(command);
                }
            }
            
            _fundraiserRepository.Delete(fundraiser.Id);
            await _fundraiserRepository.SaveChangesAsync();
            return Unit.Value;
        }

        public async Task<Unit> Handle(UploadFileCommand request, CancellationToken cancellationToken)
        {
            var fundraiser = _fundraiserRepository.Get(request.FundraiserId)
                ?? throw new FundraiserNotFoundException(request.FundraiserId);

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "fundraiser-files");

            var uniqueFileName = $"{Guid.NewGuid()}_{Path.GetFileName(request.File.FileName)}";
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await request.File.CopyToAsync(stream);
            }

            var file = new File
            {
                Description = request.Description,
                FileName = uniqueFileName,
                Fundraiser = fundraiser
            };

            _fileRepository.Add(file);
            await _fileRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
