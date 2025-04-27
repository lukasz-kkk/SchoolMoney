
using Domain.Exceptions;

namespace Domain
{
    public class Fundraiser : Entity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal AmountPerPerson { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public FinancialAccount FinancialAccount { get; set; }
        public User Owner { get; set; }
        public Group Group { get; set; }
        public bool IsBlocked { get; set; }
        public ICollection<FundraiserChild> ExcludedChildrens { get; set; } = new List<FundraiserChild>();


        protected Fundraiser() {}
        public Fundraiser(string name, string description, decimal goal, DateOnly startDate, DateOnly endDate, FinancialAccount financialAccount, User owner, Group group)
        {
            Name = name;
            Description = description;
            AmountPerPerson = goal;
            StartDate = startDate;
            EndDate = endDate;
            FinancialAccount = financialAccount;
            Owner = owner;
            Group = group;
        }

        public void ExcludeChild(Child child)
        {
            if (child.Group != Group)
            {
                throw new ChildDoesntBelongToFundraiserException(child.Id, Group.Id);
            }
            ExcludedChildrens.Add(new FundraiserChild(this, child));
        }
    }
}
