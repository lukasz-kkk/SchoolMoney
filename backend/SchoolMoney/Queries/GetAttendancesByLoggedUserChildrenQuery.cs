using MediatR;
using SchoolMoney.Response;

namespace SchoolMoney.Queries
{
    public class GetAttendancesByLoggedUserChildrenQuery : IRequest<IEnumerable<AttendanceResponse>>
    {
        public DateOnly DateFrom { get; set; }
        public DateOnly DateTo { get; set; }
    }
}