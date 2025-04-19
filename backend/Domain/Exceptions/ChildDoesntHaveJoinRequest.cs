using Domain.Properties;

namespace Domain.Exceptions
{
    public class ChildDoesntHaveJoinRequest : DomainException
    {
        public ChildDoesntHaveJoinRequest(int childId) : base(string.Format(Resource.ExceptionChildDoesntHaveJoinRequest, childId)) 
        {
        }
    }
}
