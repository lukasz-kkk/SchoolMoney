﻿using Domain;
using Domain.Exceptions;
using SchoolMoney.Commands;
using MediatR;
using Domain.Repositories;
using SchoolMoney.Constants;
using SchoolMoney.Exceptions;
using SchoolMoney.Utils;

namespace SchoolMoney.CommandHandlers
{
    public class GroupCommandHandler : IRequestHandler<CreateGroupCommand, Unit>,
                                       IRequestHandler<UpdateGroupNameCommand, Unit>
    {
        private readonly IUserRepository _userRepository;
        private readonly IGroupRepository _groupRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GroupCommandHandler(IUserRepository userRepository,
                                   IGroupRepository groupRepository,
                                   IHttpContextAccessor httpContextAccessor)
        {
            _userRepository = userRepository;
            _groupRepository = groupRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Unit> Handle(CreateGroupCommand request, CancellationToken cancellationToken)
        {
            var loggedUserId = JwtHelper.GetUserIdFromCookies(_httpContextAccessor)
                ?? throw new InvalidCookieException(Cookies.UserId);

            var user = _userRepository.Get(loggedUserId)
                ?? throw new UserNotFoundException(loggedUserId);

            var existingGroup = _groupRepository.GetList(u => u.Name.ToLower() == request.Name.ToLower());
            if (existingGroup.Any())
                throw new GroupAlreadyExistsException(request.Name);

            var group = new Group
            {
                Treasurer = user,
                Name = request.Name,
                CreatedAt = DateTime.Now
            };

            _groupRepository.Add(group);
            await _groupRepository.SaveChangesAsync();

            return Unit.Value;
        }

        public async Task<Unit> Handle(UpdateGroupNameCommand request, CancellationToken cancellationToken)
        {
            var group = _groupRepository.Get(request.GroupId)
                ?? throw new GroupNotFoundException(request.GroupId);

            var existingGroup = _groupRepository.GetList(u => u.Name.ToLower() == request.NewName.ToLower());
            if (existingGroup.Any())
                throw new GroupAlreadyExistsException(request.NewName);

            group.Name = request.NewName;
            await _groupRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}