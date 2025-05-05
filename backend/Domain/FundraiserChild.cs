
namespace Domain
{
    public class FundraiserChild
    {
        public int FundraiserId { get; private set; }
        public Fundraiser Fundraiser { get; private set; }

        public int ChildId { get; private set; }
        public Child Child { get; private set; }

        protected FundraiserChild() {}
        public FundraiserChild(Fundraiser fundraiser, Child child)
        {
            Fundraiser = fundraiser;
            FundraiserId = fundraiser.Id;
            Child = child;
            ChildId = child.Id;
        }
    }
}
