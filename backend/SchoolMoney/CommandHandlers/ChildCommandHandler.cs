using Domain;
using Domain.Exceptions;
using SchoolMoney.Commands;
using MediatR;
using Domain.Repositories;
using SchoolMoney.Constants;
using SchoolMoney.Exceptions;
using SchoolMoney.Utils;

namespace SchoolMoney.CommandHandlers
{
    public class ChildCommandHandler : IRequestHandler<CreateChildCommand, Unit>,
                                       IRequestHandler<UpdateChildParentCommand, Unit>,
                                       IRequestHandler<UpdateChildGroupCommand, Unit>,
                                       IRequestHandler<DeleteChildCommand, Unit>,
                                       IRequestHandler<UpdateChildIsAcceptedCommand, Unit>
    { 
        private readonly IChildRepository _childRepository;
        private readonly IUserRepository _userRepository;
        private readonly IGroupRepository _groupRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ChildCommandHandler(IChildRepository childRepository,
                                   IUserRepository userRepository,
                                   IGroupRepository groupRepository,
                                   IHttpContextAccessor httpContextAccessor)
        {
            _childRepository = childRepository;
            _userRepository = userRepository;
            _groupRepository = groupRepository;
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

        public async Task<Unit> Handle(DeleteChildCommand request, CancellationToken cancellationToken)
        {
            var child = _childRepository.Get(request.ChildId)
                ?? throw new ChildNotFoundException(request.ChildId);

            _childRepository.Delete(child);
            await _childRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
