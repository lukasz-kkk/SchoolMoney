using SchoolMoney.Queries;
using SchoolMoney.Response;
using MediatR;
using Domain.Repositories;
using Domain.Exceptions;
using SchoolMoney.Constants;
using SchoolMoney.Exceptions;
using SchoolMoney.Utils;

namespace SchoolMoney.QueryHandlers
{
    public class AttendanceQueryHandler : IRequestHandler<GetAttendancesByGroupQuery, IEnumerable<AttendanceResponse>>,
                                          IRequestHandler<GetAttendancesByLoggedUserChildrenQuery, IEnumerable<AttendanceResponse>>
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IUserRepository _userRepository;
        private readonly IAttendanceRepository _attendanceRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AttendanceQueryHandler(IGroupRepository groupRepository, IUserRepository userRepository,
                                      IAttendanceRepository attendanceRepository, IHttpContextAccessor httpContextAccessor)
        {
            _groupRepository = groupRepository;
            _userRepository = userRepository;
            _attendanceRepository = attendanceRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public Task<IEnumerable<AttendanceResponse>> Handle(GetAttendancesByGroupQuery request, CancellationToken cancellationToken)
        {
            var group = _groupRepository.Get(request.GroupId)
                ?? throw new GroupNotFoundException(request.GroupId);

            var attendances = _attendanceRepository.GetList(x => x.Child.Group.Id == request.GroupId &&
                                                                 x.Date >= request.DateFrom &&
                                                                 x.Date <= request.DateTo);

            if (attendances == null || !attendances.Any())
            {
                return Task.FromResult(Enumerable.Empty<AttendanceResponse>());
            }

            var result = attendances.Select(x => new AttendanceResponse
            {
                Id = x.Id,
                ChildId = x.Child.Id,
                Date = x.Date,
                Status = x.Status,
            });

            return Task.FromResult(result);
        }

        public Task<IEnumerable<AttendanceResponse>> Handle(GetAttendancesByLoggedUserChildrenQuery request, CancellationToken cancellationToken)
        {
            var loggedUserId = JwtHelper.GetUserIdFromCookies(_httpContextAccessor)
                ?? throw new InvalidCookieException(Cookies.UserId);

            var attendances = _attendanceRepository.GetList(x => x.Child.Parent.Id == loggedUserId &&
                                                                 x.Date >= request.DateFrom &&
                                                                 x.Date <= request.DateTo);

            if (attendances == null || !attendances.Any())
            {
                return Task.FromResult(Enumerable.Empty<AttendanceResponse>());
            }

            var result = attendances.Select(x => new AttendanceResponse
            {
                Id = x.Id,
                ChildId = x.Child.Id,
                Date = x.Date,
                Status = x.Status,
            });

            return Task.FromResult(result);
        }
    }
}
