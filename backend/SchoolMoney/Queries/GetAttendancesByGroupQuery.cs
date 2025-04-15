using MediatR;
using SchoolMoney.Response;

namespace SchoolMoney.Queries
{
    public class GetAttendancesByGroupQuery : IRequest<IEnumerable<AttendanceResponse>>
    {
        public int GroupId { get; set; }
        public DateOnly DateFrom { get; set; }
        public DateOnly DateTo { get; set; }
    }
}