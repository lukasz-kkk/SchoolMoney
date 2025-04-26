using Domain.Properties;

namespace Domain.Exceptions
{
    public class ChildDoesntBelongToFundraiserException : DomainException
    {
        public ChildDoesntBelongToFundraiserException(int childId, int groupId) : base(string.Format(Resource.ChildDoesntBelongToFundraiser, childId, groupId)) 
        {
        }
    }
}
