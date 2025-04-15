using MediatR;

namespace SchoolMoney.Commands
{
    public class DeleteAnnouncementCommand : IRequest<Unit>
    {
        public int AnnouncementId { get; set; }
    }
}
