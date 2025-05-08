namespace Domain.Repositories
{
    public interface IMessageRepository : IRepository<Message>
    {
        public Message? FirstOrDefault(Func<Message, bool> predicate = null);
    }
}
