using Domain;

namespace SchoolMoney.Response
{
    public class FundraiserResponse
    {
        public int Id { get;  set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal AmountPerPerson { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public int FinancialAccountId { get; set; }
        public string AccountNumber { get; set; }
        public int AccountBalance { get; set; }
        public int OwnerId { get; set; }
        public int GroupId { get; set; }
        public bool IsBlocked { get; set; }
    }
}