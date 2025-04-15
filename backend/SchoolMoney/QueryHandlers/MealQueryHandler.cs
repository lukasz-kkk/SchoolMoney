using SchoolMoney.Queries;
using SchoolMoney.Response;
using MediatR;
using Domain.Repositories;
using Domain.Exceptions;

namespace SchoolMoney.QueryHandlers
{
    public class MealQueryHandler : 
        IRequestHandler<GetMealByChildQuery, IEnumerable<MealResponse>>,
        IRequestHandler<GetMealByGroupQuery, IEnumerable<MealResponse>>
    {
        private readonly IMealRepository _mealRepository;
        private readonly IGroupRepository _groupRepository;
        private readonly IChildRepository _childRepository;

        public MealQueryHandler(IMealRepository mealRepository, IGroupRepository groupRepository,
            IChildRepository childRepository)
        {
            _mealRepository = mealRepository;
            _groupRepository = groupRepository;
            _childRepository = childRepository;
        }

        public Task<IEnumerable<MealResponse>> Handle(GetMealByChildQuery request, CancellationToken cancellationToken)
        {
            var child = _childRepository.Get(request.ChildId)
               ?? throw new ChildNotFoundException(request.ChildId);

            var meals = _mealRepository.GetList(x => 
                x.Group.Id == child.Group.Id
                && x.Date >= request.DateFrom 
                && x.Date <= request.DateTo);

            if (meals == null || !meals.Any())
            {
                return Task.FromResult(Enumerable.Empty<MealResponse>());
            }

            var result = meals.Select(x => new MealResponse
            {
                Id = x.Id,
                GroupId = x.Group.Id,
                Date = x.Date,
                Breakfast = x.Breakfast,
                Lunch = x.Lunch,
                Dinner = x.Dinner
            });

            return Task.FromResult(result);
        }

        public Task<IEnumerable<MealResponse>> Handle(GetMealByGroupQuery request, CancellationToken cancellationToken)
        {
            if (_groupRepository.Get(request.GroupId) == null)
               throw new GroupNotFoundException(request.GroupId);

            var meals = _mealRepository.GetList(x => 
                x.Group.Id == request.GroupId
                && x.Date >= request.DateFrom
                && x.Date <= request.DateTo);

            if (meals == null || !meals.Any())
            {
                return Task.FromResult(Enumerable.Empty<MealResponse>());
            }

            var result = meals.Select(x => new MealResponse
            {
                Id = x.Id,
                GroupId = x.Group.Id,
                Date = x.Date,
                Breakfast = x.Breakfast,
                Lunch = x.Lunch,
                Dinner = x.Dinner
            });

            return Task.FromResult(result);
        }
    }
}
