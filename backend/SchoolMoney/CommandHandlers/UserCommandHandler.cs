using Domain;
using Domain.Exceptions;
using SchoolMoney.Commands;
using MediatR;
using Domain.Repositories;
using SchoolMoney.Utils;

namespace SchoolMoney.CommandHandlers
{
    public class UserCommandHandler : IRequestHandler<UpdateUserRoleCommand, Unit>,
                                      IRequestHandler<DeleteUserCommand, Unit>,
                                      IRequestHandler<UpdateUserIsActiveFlagCommand, Unit>,
                                      IRequestHandler<ChangeUserPasswordCommand, Unit>
    {
        private readonly IUserRepository _userRepository;

        public UserCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<Unit> Handle(UpdateUserRoleCommand request, CancellationToken cancellationToken)
        {
            var user = _userRepository.Get(request.UserId) 
                ?? throw new UserNotFoundException(request.UserId);

            user.Role = Enum.Parse<Role>(request.NewRole);
            await _userRepository.SaveChangesAsync();

            return Unit.Value;
        }
        public async Task<Unit> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            var user = _userRepository.Get(request.UserId)
                ?? throw new UserNotFoundException(request.UserId);

            _userRepository.Delete(user);
            await _userRepository.SaveChangesAsync();

            return Unit.Value;
        }
        public async Task<Unit> Handle(UpdateUserIsActiveFlagCommand request, CancellationToken cancellationToken)
        {
            var user = _userRepository.Get(request.UserId)
                ?? throw new UserNotFoundException(request.UserId);

            user.IsActive = request.NewIsActiveFlagValue;
            await _userRepository.SaveChangesAsync();

            return Unit.Value;
        }
        public async Task<Unit> Handle(ChangeUserPasswordCommand request, CancellationToken cancellationToken)
        {
            var user = _userRepository.Get(request.UserId)
                ?? throw new UserNotFoundException(request.UserId);

            var oldPasswordHash = ShaHelper.QuickHash(request.OldPassword);
            if (oldPasswordHash.ToLower() != user.HashedPassword.ToLower())
                throw new PasswordNotMatchException(user.Login);

            var newPasswordHash = ShaHelper.QuickHash(request.NewPassword);

            user.HashedPassword = newPasswordHash;
            await _userRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
