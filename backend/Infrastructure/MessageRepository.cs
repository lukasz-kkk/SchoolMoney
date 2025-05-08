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

        public Message? FirstOrDefault(Func<Message, bool> predicate = null)
        {
            return _appDbContext.Messages
                .FirstOrDefault(predicate);
        }

    }
}
