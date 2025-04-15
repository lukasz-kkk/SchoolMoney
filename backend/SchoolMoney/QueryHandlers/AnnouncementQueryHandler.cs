using SchoolMoney.Queries;
using SchoolMoney.Response;
using MediatR;
using Domain.Repositories;

namespace SchoolMoney.QueryHandlers
{
    public class AnnouncementQueryHandler : IRequestHandler<GetAllAnnouncementsQuery, IEnumerable<AnnouncementResponse>>
    {
        private readonly IAnnouncementRepository _announcementRepository;

        public AnnouncementQueryHandler(IAnnouncementRepository announcementRepository)
        {
            _announcementRepository = announcementRepository;
        }

        public Task<IEnumerable<AnnouncementResponse>> Handle(GetAllAnnouncementsQuery request, CancellationToken cancellationToken)
        {
            var announcements = _announcementRepository.GetList();

            if (announcements == null)
            {
                return Task.FromResult(Enumerable.Empty<AnnouncementResponse>());
            }

            var result = announcements.Select(x => new AnnouncementResponse
            {
                Id = x.Id,
                Title = x.Title,
                Content = x.Content,
                FilePath = x.FilePath,
                CreatedAt = x.CreatedAt
            });

            return Task.FromResult(result);
        }
    }
}
