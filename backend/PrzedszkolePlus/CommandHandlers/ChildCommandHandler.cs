﻿using Domain;
using Domain.Exceptions;
using PrzedszkolePlus.Commands;
using MediatR;
using Domain.Repositories;

namespace PrzedszkolePlus.CommandHandlers
{
    public class ChildCommandHandler : IRequestHandler<CreateChildCommand, Unit>,
                                       IRequestHandler<UpdateChildParentCommand, Unit>,
                                       IRequestHandler<DeleteChildCommand, Unit>
    { 
        private readonly IChildRepository _childRepository;
        private readonly IUserRepository _userRepository;
        private readonly IGroupRepository _groupRepository;

        public ChildCommandHandler(IChildRepository childRepository, IUserRepository userRepository, IGroupRepository groupRepository)
        {
            _childRepository = childRepository;
            _userRepository = userRepository;
            _groupRepository = groupRepository;
        }

        public async Task<Unit> Handle(CreateChildCommand request, CancellationToken cancellationToken)
        {
            var parent = _userRepository.Get(request.ParentId)
                    ?? throw new UserNotFoundException(request.ParentId);

            var group = _groupRepository.Get(request.GroupId)
                    ?? throw new GroupNotFoundException(request.ParentId);

            var child = new Child
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                DateOfBirth = request.DateOfBirth,
                Parent = parent,
                Group = group,
                CreatedAt = DateTime.Now
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
            await _userRepository.SaveChangesAsync();

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
