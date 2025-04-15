using MediatR;
using SchoolMoney.Response;

namespace SchoolMoney.Queries
{
    public class GetMealByChildQuery : IRequest<IEnumerable<MealResponse>>
    {
        public int ChildId { get; set; }
        public DateOnly DateFrom { get; set; }
        public DateOnly DateTo { get; set; }
    }
}