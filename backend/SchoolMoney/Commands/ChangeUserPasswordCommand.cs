using MediatR;

namespace SchoolMoney.Commands
{
    public class ChangeUserPasswordCommand : IRequest<Unit>
    {
        public int UserId { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
