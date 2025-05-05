using MediatR;

namespace SchoolMoney.Commands
{
    public class CreateFundraiserCommand : IRequest<Unit>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal AmountPerPerson { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public int GroupId { get; set; }
    }
}
