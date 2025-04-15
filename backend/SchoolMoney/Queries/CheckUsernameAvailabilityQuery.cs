using MediatR;
namespace SchoolMoney.Queries
{
    public class CheckloginAvailabilityQuery : IRequest<bool>
    {
        public string login { get; set; }
    }
}
