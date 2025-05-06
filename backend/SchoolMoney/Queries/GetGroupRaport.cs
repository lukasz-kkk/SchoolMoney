using MediatR;
using SchoolMoney.Response;
namespace SchoolMoney.Queries
{
    public class GetGroupRaport : IRequest<string>
    {
        public int GroupId { get; set; }
    }
}
