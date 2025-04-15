using FluentValidation;
using SchoolMoney.Properties;

namespace SchoolMoney.Requests
{
    public class AnnouncementRequest
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string FilePath { get; set; }
    }

    public class AnnouncementRequestValidator : AbstractValidator<AnnouncementRequest>
    {
        public AnnouncementRequestValidator()
        {
            RuleFor(announcementRequest => announcementRequest.Title)
                .NotEmpty().WithMessage(Resource.ValidatorAnnouncementTitleRequired)
                .MinimumLength(3).WithMessage(Resource.ValidatorAnnouncementTitleLonger)
                .MaximumLength(255).WithMessage(Resource.ValidatorAnnouncementTitleShorter);
            RuleFor(announcementRequest => announcementRequest.Content)
                .NotEmpty().WithMessage(Resource.ValidatorAnnouncementContentRequired)
                .MinimumLength(3).WithMessage(Resource.ValidatorAnnouncementContentLonger)
                .MaximumLength(4000).WithMessage(Resource.ValidatorAnnouncementContentShorter);
        }
    }
}