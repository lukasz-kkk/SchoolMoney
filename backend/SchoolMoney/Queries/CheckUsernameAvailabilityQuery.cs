using MediatR;
namespace SchoolMoney.Queries
{
    public class CheckUsernameAvailabilityQuery : IRequest<bool>
    {
        public string Username { get; set; }
    }
}
