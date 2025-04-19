using SchoolMoney.Queries;
using SchoolMoney.Response;
using MediatR;
using Domain.Repositories;
using SchoolMoney.Constants;
using SchoolMoney.Exceptions;
using SchoolMoney.Utils;
using Domain.Exceptions;

namespace SchoolMoney.QueryHandlers
{
    public class GroupQueryHandler : IRequestHandler<GetAllGroupsQuery, IEnumerable<GroupResponse>>,
                                     IRequestHandler<GetGroupByLoggedUserQuery, IEnumerable<GroupResponse>>,
                                     IRequestHandler<GetGroupJoinCodeQuery, GroupJoinCodeResponse>
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GroupQueryHandler(IGroupRepository groupRepository, IHttpContextAccessor httpContextAccessor)
        {
            _groupRepository = groupRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public Task<IEnumerable<GroupResponse>> Handle(GetAllGroupsQuery request, CancellationToken cancellationToken)
        {
            var groups = _groupRepository.GetList();

            if (groups == null)
            {
                return Task.FromResult(Enumerable.Empty<GroupResponse>());
            }

            var result = groups.Select(x => new GroupResponse
            {
                Id = x.Id,
                Name = x.Name,
                TreasurerId = x.Treasurer.Id,
                TreasurerFirstName = x.Treasurer.FirstName,
                TreasurerLastName = x.Treasurer.LastName,
                CreatedAt = x.CreatedAt
            });

            return Task.FromResult(result);
        }

        public Task<IEnumerable<GroupResponse>> Handle(GetGroupByLoggedUserQuery request, CancellationToken cancellationToken)
        {
            var loggedUserId = JwtHelper.GetUserIdFromCookies(_httpContextAccessor)
                ?? throw new InvalidCookieException(Cookies.UserId);

            var group = _groupRepository.GetList(x => x.Treasurer.Id == loggedUserId);

            if (group == null || !group.Any())
            {
                return Task.FromResult(Enumerable.Empty<GroupResponse>());
            }

            var result = group.Select(x => new GroupResponse
            {
                Id = x.Id,
                Name = x.Name,
                TreasurerId = x.Treasurer.Id,
                TreasurerFirstName = x.Treasurer.FirstName,
                TreasurerLastName = x.Treasurer.LastName,
                CreatedAt = x.CreatedAt
            });

            return Task.FromResult(result);
        }

        public Task<GroupJoinCodeResponse> Handle(GetGroupJoinCodeQuery request, CancellationToken cancellationToken)
        {
            var loggedUserId = JwtHelper.GetUserIdFromCookies(_httpContextAccessor)
                ?? throw new InvalidCookieException(Cookies.UserId);

            var group = _groupRepository.Get(request.GroupId)
                    ?? throw new GroupNotFoundException(request.GroupId);

            if (group.Treasurer.Id != loggedUserId)
                throw new UserIsNotTreasurerException(loggedUserId);

            var result = new GroupJoinCodeResponse
            {
                JoinCode = group.JoinCode
            };

            return Task.FromResult(result);
        }
    }
}
