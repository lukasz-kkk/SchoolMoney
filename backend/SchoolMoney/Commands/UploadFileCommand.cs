using MediatR;

namespace SchoolMoney.Commands
{
    public class UploadFileCommand : IRequest<Unit>
    {
        public int FundraiserId { get; set; }
        public IFormFile File { get; set; }
        public string Description { get; set; }
    }
}
