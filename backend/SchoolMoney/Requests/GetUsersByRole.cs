using FluentValidation;
using SchoolMoney.Properties;

namespace SchoolMoney.Requests
{
    public class GetUsersByRoleRequest
    {
        public string UserRole { get; set; }
    }

    public class GetUsersByRoleRequestValidator : AbstractValidator<GetUsersByRoleRequest>
    {
        public GetUsersByRoleRequestValidator()
        {
            RuleFor(x => x.UserRole)
                .Must(role => Enum.TryParse<Domain.Role>(role, out _))
                .WithMessage(context =>
                {
                    var rolesList = string.Join(", ", Enum.GetNames(typeof(Domain.Role)));
                    return string.Format(Resource.ValidatorRoleFromRolesList, rolesList);
                });
        }
    }
}