using SchoolMoney.Queries;
using SchoolMoney.Response;
using MediatR;
using Domain.Repositories;
using SchoolMoney.Constants;
using SchoolMoney.Exceptions;
using SchoolMoney.Utils;

namespace SchoolMoney.QueryHandlers
{
    public class GroupQueryHandler : IRequestHandler<GetAllGroupsQuery, IEnumerable<GroupResponse>>,
                                     IRequestHandler<GetGroupByLoggedUserQuery, IEnumerable<GroupResponse>>
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
                CaregiverId = x.Caregiver.Id,
                CreatedAt = x.CreatedAt
            });

            return Task.FromResult(result);
        }

        public Task<IEnumerable<GroupResponse>> Handle(GetGroupByLoggedUserQuery request, CancellationToken cancellationToken)
        {
            var loggedUserId = JwtHelper.GetUserIdFromCookies(_httpContextAccessor)
                ?? throw new InvalidCookieException(Cookies.UserId);

            var group = _groupRepository.GetList(x => x.Caregiver.Id == loggedUserId);

            if (group == null || !group.Any())
            {
                return Task.FromResult(Enumerable.Empty<GroupResponse>());
            }

            var result = group.Select(x => new GroupResponse
            {
                Id = x.Id,
                Name = x.Name,
                CaregiverId = x.Caregiver.Id,
                CreatedAt = x.CreatedAt
            });

            return Task.FromResult(result);
        }
    }
}
