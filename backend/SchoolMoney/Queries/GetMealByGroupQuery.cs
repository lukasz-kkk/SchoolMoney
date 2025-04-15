using MediatR;
using SchoolMoney.Response;

namespace SchoolMoney.Queries
{
    public class GetMealByGroupQuery : IRequest<IEnumerable<MealResponse>>
    {
        public int GroupId { get; set; }
        public DateOnly DateFrom { get; set; }
        public DateOnly DateTo { get; set; }
    }
}