using MediatR;

namespace SchoolMoney.Commands
{
    public class DeleteFileCommand : IRequest<Unit>
    {
        public string FileName { get; set; }
    }
}
