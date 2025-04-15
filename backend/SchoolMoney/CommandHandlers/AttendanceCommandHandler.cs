using Domain;
using Domain.Exceptions;
using SchoolMoney.Commands;
using MediatR;
using Domain.Repositories;
using SchoolMoney.Constants;
using SchoolMoney.Exceptions;
using SchoolMoney.Utils;
using SchoolMoney.Properties;

namespace SchoolMoney.CommandHandlers
{
    public class AttendanceCommandHandler : IRequestHandler<CreateAttendanceCommand, Unit>
    {
        private readonly IAttendanceRepository _attendanceRepository;
        private readonly IChildRepository _childRepository;
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AttendanceCommandHandler(IAttendanceRepository attendanceRepository, IChildRepository childRepository,
                                        IUserRepository userRepository, IHttpContextAccessor httpContextAccessor)
        {
            _attendanceRepository = attendanceRepository;
            _childRepository = childRepository;
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Unit> Handle(CreateAttendanceCommand request, CancellationToken cancellationToken)
        {
            var loggedUserId = JwtHelper.GetUserIdFromCookies(_httpContextAccessor)
                ?? throw new InvalidCookieException(Cookies.UserId);

            var user = _userRepository.Get(loggedUserId)
                ?? throw new InvalidCookieException(Cookies.UserId);

            if (request.Status == true && user.Role != Role.Admin)
                throw new AuthenticationFailureException(Resource.ExceptionUserNotAllowed);

            var child = _childRepository.Get(request.ChildId)
                ?? throw new ChildNotFoundException(request.ChildId);

            if (user.Role != Role.Admin && child.Parent.Id != loggedUserId)
                throw new UserIsNotParentOfThisChildException(loggedUserId, child.Id);

            var existingAttendance = _attendanceRepository.FirstOrDefault(x => x.Child.Id == request.ChildId &&
                                                                               x.Date == request.Date);
            if (existingAttendance != null)
                _attendanceRepository.Delete(existingAttendance);

            var attendance = new Attendance
            {
                Child = child,
                Date = request.Date,
                Status = request.Status
            };

            _attendanceRepository.Add(attendance);
            await _attendanceRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}