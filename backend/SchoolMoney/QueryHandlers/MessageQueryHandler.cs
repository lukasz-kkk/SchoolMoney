using SchoolMoney.Queries;
using SchoolMoney.Response;
using MediatR;
using Domain.Repositories;
using Domain.Exceptions;

namespace SchoolMoney.QueryHandlers
{
    public class MessageQueryHandler : IRequestHandler<GetMessagesByThreadQuery, IEnumerable<MessageResponse>>
    {
        private readonly IThreadRepository _threadRepository;

        public MessageQueryHandler(IThreadRepository threadRepository)
        {
            _threadRepository = threadRepository;
        }

        public Task<IEnumerable<MessageResponse>> Handle(GetMessagesByThreadQuery request, CancellationToken cancellationToken)
        {
            var thread = _threadRepository.Get(request.ThreadId)
                ?? throw new ThreadNotFoundException(request.ThreadId);

            if (thread?.Messages == null || !thread.Messages.Any())
                return Task.FromResult(Enumerable.Empty<MessageResponse>());

            var result = thread.Messages.Select(x => new MessageResponse
            {
                Id = x.Id,
                Content = x.Content,
                CreatedAt = x.CreatedAt,
                SenderId = x.Sender.Id
            });

            return Task.FromResult(result);
        }
    }
}
