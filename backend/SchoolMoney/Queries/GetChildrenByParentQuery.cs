using MediatR;
using SchoolMoney.Response;

namespace SchoolMoney.Queries
{
    public class GetChildrenByParentQuery : IRequest<IEnumerable<ChildResponse>>
    {
        public int ParentId { get; set; }
    }
}