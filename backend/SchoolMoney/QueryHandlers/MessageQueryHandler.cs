using SchoolMoney.Queries;
using SchoolMoney.Response;
using MediatR;
using Domain.Repositories;
using SchoolMoney.Constants;
using SchoolMoney.Exceptions;
using SchoolMoney.Utils;
using Domain.Exceptions;
using Infrastructure;
using System.Globalization;
using System.Text.Json;
using System.Text;
using Infrastructure.Migrations;
using System.Collections.Generic;
using Domain;

namespace SchoolMoney.QueryHandlers
{
    public class MessageQueryHandler : IRequestHandler<GetMessagesByReceiverQuery, IEnumerable<MessageResponse>>,
                                       IRequestHandler<GetChatListQuery, ChatListResponse>,
                                       IRequestHandler<GetPossibleReceiversQuery, PossibleReceiversResponse>
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IMessageRepository _messageRepository;
        private readonly IChildRepository _childRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserRepository _userRepository;

        public MessageQueryHandler(IGroupRepository groupRepository,
                                 IHttpContextAccessor httpContextAccessor,
                                 IMessageRepository messageRepository,
                                 IUserRepository userRepository,
                                 IChildRepository childRepository)
        {
            _groupRepository = groupRepository;
            _httpContextAccessor = httpContextAccessor;
            _messageRepository = messageRepository;
            _userRepository = userRepository;
            _childRepository = childRepository;
        }

        public Task<IEnumerable<MessageResponse>> Handle(GetMessagesByReceiverQuery request, CancellationToken cancellationToken)
        {
            List<Message> messages = null;

            var loggedUserId = JwtHelper.GetUserIdFromCookies(_httpContextAccessor)
                ?? throw new InvalidCookieException(Cookies.UserId);

            if (request.ReceiverGroupId != 0)
                messages = _messageRepository.GetList(m => m.ReceiverGroupId == request.ReceiverGroupId);

            if (request.ReceiverUserId != 0)
                messages = _messageRepository.GetList(m => 
                    (m.ReceiverUserId == request.ReceiverUserId &&
                    m.Sender.Id == loggedUserId)
                    ||
                    (m.ReceiverUserId == loggedUserId &&
                    m.Sender.Id == request.ReceiverUserId)
                    );

            if (messages == null)
            {
                return Task.FromResult(Enumerable.Empty<MessageResponse>());
            }

            var result = messages.Select(x => new MessageResponse
            {
                MessageId = x.Id,
                SenderId = x.Sender.Id,
                SenderFirstName = x.Sender.FirstName,
                SenderLastName = x.Sender.LastName,
                Content = x.Content,
                CreatedAt = x.CreatedAt
            });

            return Task.FromResult(result);
        }

        public Task<ChatListResponse> Handle(GetChatListQuery request, CancellationToken cancellationToken)
        {
            var loggedUserId = JwtHelper.GetUserIdFromCookies(_httpContextAccessor)
                ?? throw new InvalidCookieException(Cookies.UserId);
            var groupChatList = GetGroupChats(loggedUserId);
            var userChatList = GetUserChats(loggedUserId);

            var result = new ChatListResponse
            {
                GroupChatList = groupChatList,
                UserChatList = userChatList
            };

            return Task.FromResult(result);
        }

        private List<GroupChatResponse> GetGroupChats(int loggedUserId)
        {
            var children = _childRepository.GetList(x => x.Parent.Id == loggedUserId);
            var userGroups = _groupRepository.GetList(g =>
                g.Treasurer.Id == loggedUserId ||
                children.Any(c => c.IsAccepted && c.Group.Id == g.Id)
            );

            var groupMessages = _messageRepository.GetList()
                .Where(m => m.ReceiverGroupId != 0)
                .ToList();

            return userGroups
                .Select(group =>
                {
                    var lastMessage = groupMessages
                        .Where(m => m.ReceiverGroupId == group.Id)
                        .OrderByDescending(m => m.CreatedAt)
                        .FirstOrDefault();

                    return new
                    {
                        Group = group,
                        LastMessage = lastMessage
                    };
                })
                .Where(g => g.LastMessage != null)
                .Select(g => new GroupChatResponse
                {
                    GroupId = g.Group.Id,
                    GroupName = g.Group.Name,
                    LastMessageSent = g.LastMessage.CreatedAt
                })
                .ToList();
        }

        private List<UserChatResponse> GetUserChats(int loggedUserId)
        {
            var privateMessages = _messageRepository.GetList(m =>
                m.Sender.Id == loggedUserId ||
                m.ReceiverUserId == loggedUserId);

            var userIds = privateMessages
                .Select(m => m.Sender.Id == loggedUserId ? m.ReceiverUserId : m.Sender.Id)
                .Distinct()
                .ToList();

            var users = userIds
                .Select(id => _userRepository.Get(id))
                .Where(user => user != null)
                .ToList();

            return users.Select(user =>
            {
                var lastMessage = privateMessages
                    .Where(m => m.Sender.Id == user.Id || m.ReceiverUserId == user.Id)
                    .OrderByDescending(m => m.CreatedAt)
                    .FirstOrDefault();

                return new UserChatResponse
                {
                    UserId = user.Id,
                    UserFirstName = user.FirstName,
                    UserLastName = user.LastName,
                    LastMessageSent = lastMessage?.CreatedAt ?? DateTime.MinValue
                };
            }).ToList();
        }

        public Task<PossibleReceiversResponse> Handle(GetPossibleReceiversQuery request, CancellationToken cancellationToken)
        {
            var loggedUserId = JwtHelper.GetUserIdFromCookies(_httpContextAccessor)
                ?? throw new InvalidCookieException(Cookies.UserId);

            var children = _childRepository.GetList(x => x.Parent.Id == loggedUserId);

            var userGroups = _groupRepository.GetList(g =>
                g.Treasurer.Id == loggedUserId ||
                children.Any(c => c.IsAccepted && c.Group.Id == g.Id)
            );

            var users = _userRepository.GetList();

            var groupChatList = GetGroupChats(loggedUserId);
            var userChatList = GetUserChats(loggedUserId);

            var groupChatIds = groupChatList.Select(gc => gc.GroupId).ToHashSet();
            var userChatIds = userChatList.Select(uc => uc.UserId).ToHashSet();

            var availableGroups = userGroups
                .Where(g => !groupChatIds.Contains(g.Id))
                .Select(g => new GroupResponse
                {
                    Id = g.Id,
                    Name = g.Name,
                    TreasurerId = g.Treasurer.Id,
                    TreasurerFirstName = g.Treasurer.FirstName,
                    TreasurerLastName = g.Treasurer.LastName,
                    CreatedAt = g.CreatedAt
                })
                .ToList();

            var availableUsers = users
                .Where(u => u.Id != loggedUserId && !userChatIds.Contains(u.Id))
                .Select(u => new UserResponse
                {
                    Id = u.Id,
                    Login = u.Login,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Role = u.Role.ToString(),
                    IsActive = u.IsActive,
                    DateOfBirth = u.DateOfBirth,
                    AccoutNumber = u.Account.Number
                })
                .ToList();

            var result = new PossibleReceiversResponse
            {
                GroupList = availableGroups,
                UserList = availableUsers
            };

            return Task.FromResult(result);
        }

    }
}
