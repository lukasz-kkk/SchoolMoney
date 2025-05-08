using Domain;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class MessageRepository : Repository<Message>, IMessageRepository
    {
        public MessageRepository(AppDbContext appDbContext) 
            : base(appDbContext, appDbContext.Messages)
        {
        }

        public new List<Message> GetList(Func<Message, bool> predicate = null)
        {
            if (predicate == null)
                return _appDbContext.Messages.ToList();
            return _appDbContext.Messages
                .Include(message => message.Sender)
                .Where(predicate)
                .ToList();
        }

        public Message? FirstOrDefault(Func<Message, bool> predicate = null)
        {
            return _appDbContext.Messages
                .FirstOrDefault(predicate);
        }

    }
}
