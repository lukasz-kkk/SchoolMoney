using SchoolMoney.Commands;
using MediatR;
using Domain.Repositories;
using Domain.Exceptions;
using Domain;

namespace SchoolMoney.CommandHandlers
{
    public class MealCommandHandler : 
        IRequestHandler<CreateMealCommand, Unit>,
        IRequestHandler<UpdateMealCommand, Unit>,
        IRequestHandler<DeleteMealCommand, Unit>
    {
        private readonly IMealRepository _mealRepository;
        private readonly IGroupRepository _groupRepository;

        public MealCommandHandler(IMealRepository mealRepository, IGroupRepository groupRepository)
        {
            _mealRepository = mealRepository;
            _groupRepository = groupRepository;
        }

        public async Task<Unit> Handle(CreateMealCommand request, CancellationToken cancellationToken)
        {
            var group = _groupRepository.Get(request.GroupId)
                ?? throw new GroupNotFoundException(request.GroupId);
            var meals = _mealRepository.GetList(meal => 
                meal.Group.Id == request.GroupId && meal.Date == request.Date);
            if(meals != null && meals.Any())
                throw new MealAlreadyCreatedException(request.Date, group.Id);

            var meal = new Meal
            {
                Group = group,
                Date = request.Date,
                Breakfast = request.Breakfast,
                Lunch = request.Lunch,
                Dinner = request.Dinner
            };

            _mealRepository.Add(meal);
            await _mealRepository.SaveChangesAsync();

            return Unit.Value;
        }

        public async Task<Unit> Handle(UpdateMealCommand request, CancellationToken cancellationToken)
        {
            var group = _groupRepository.Get(request.GroupId)
                ?? throw new GroupNotFoundException(request.GroupId);
            var meals = _mealRepository.GetList(meal =>
                meal.Id != request.Id && meal.Group.Id == request.GroupId && meal.Date == request.Date);
            if (meals != null && meals.Any())
                throw new MealAlreadyCreatedException(request.Date, group.Id);

            var meal = _mealRepository.Get(request.Id)
                ?? throw new MealNotFoundException(request.Id);

            meal.Group = group;
            meal.Date = request.Date;
            meal.Breakfast = request.Breakfast;
            meal.Lunch = request.Lunch;
            meal.Dinner = request.Dinner;

            await _mealRepository.SaveChangesAsync();

            return Unit.Value;
        }

        public async Task<Unit> Handle(DeleteMealCommand request, CancellationToken cancellationToken)
        {
            var meal = _mealRepository.Get(request.MealId)
                ?? throw new MealNotFoundException(request.MealId);

            _mealRepository.Delete(meal);
            await _mealRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}