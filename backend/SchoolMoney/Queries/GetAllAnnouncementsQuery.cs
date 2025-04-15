using SchoolMoney.Response;
using MediatR;

namespace SchoolMoney.Queries
{
    public class GetAllAnnouncementsQuery : IRequest<IEnumerable<AnnouncementResponse>>
    {
    }
}
