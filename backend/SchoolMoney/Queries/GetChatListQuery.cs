using MediatR;
using SchoolMoney.Response;
namespace SchoolMoney.Queries
{
    public class GetChatListQuery : IRequest<ChatListResponse>
    {
    }
}
