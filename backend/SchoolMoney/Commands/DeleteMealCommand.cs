using MediatR;

namespace SchoolMoney.Commands
{
    public class DeleteMealCommand : IRequest<Unit>
    {
        public int MealId { get; set; }
    }
}
