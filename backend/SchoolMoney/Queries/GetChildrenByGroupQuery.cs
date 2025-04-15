using MediatR;
using SchoolMoney.Response;

namespace SchoolMoney.Queries
{
    public class GetChildrenByGroupQuery : IRequest<IEnumerable<ChildResponse>>
    {
        public int GroupId { get; set; }
    }
}