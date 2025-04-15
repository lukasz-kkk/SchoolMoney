using Domain;
using SchoolMoney.Commands;
using MediatR;
using Domain.Repositories;
using Domain.Exceptions;

namespace SchoolMoney.CommandHandlers
{
    public class AnnouncementCommandHandler : IRequestHandler<CreateAnnouncementCommand, Unit>,
                                              IRequestHandler<DeleteAnnouncementCommand, Unit>,
                                              IRequestHandler<UpdateAnnouncementCommand, Unit>
    { 
        private readonly IAnnouncementRepository _announcementRepository;

        public AnnouncementCommandHandler(IAnnouncementRepository announcementRepository)
        {
            _announcementRepository = announcementRepository;
        }

        public async Task<Unit> Handle(CreateAnnouncementCommand request, CancellationToken cancellationToken)
        {
            var announcement = new Announcement
            {
                Title = request.Title,
                Content = request.Content,
                FilePath = request.FilePath,
                CreatedAt = DateTime.Now
            };

            _announcementRepository.Add(announcement);
            await _announcementRepository.SaveChangesAsync();

            return Unit.Value;
        }

        public async Task<Unit> Handle(UpdateAnnouncementCommand request, CancellationToken cancellationToken)
        {
            var announcement = _announcementRepository.Get(request.AnnouncementId)
                ?? throw new AnnouncementNotFoundException(request.AnnouncementId);

            announcement.Title = request.Title;
            announcement.Content = request.Content;
            announcement.FilePath = request.FilePath;

            await _announcementRepository.SaveChangesAsync();

            return Unit.Value;
        }

        public async Task<Unit> Handle(DeleteAnnouncementCommand request, CancellationToken cancellationToken)
        {
            var announcement = _announcementRepository.Get(request.AnnouncementId)
                ?? throw new AnnouncementNotFoundException(request.AnnouncementId);

            _announcementRepository.Delete(announcement);
            await _announcementRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
