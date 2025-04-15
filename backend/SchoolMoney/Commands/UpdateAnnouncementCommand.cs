using MediatR;

namespace SchoolMoney.Commands
{
    public class UpdateAnnouncementCommand : IRequest<Unit>
    {
        public int AnnouncementId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string? FilePath { get; set; }
    }
}