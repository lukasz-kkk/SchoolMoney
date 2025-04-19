using Domain.Properties;

namespace Domain.Exceptions
{
    public class GroupNotFoundException : DomainException
    {
        public GroupNotFoundException(int groupId) : base(string.Format(Resource.ExceptionGroupNotFound, groupId)) 
        {
        }

        public GroupNotFoundException(string joinCode) : base(string.Format(Resource.ExceptionGroupWithJoinCodeNotFound, joinCode))
        {
        }
    }
}
