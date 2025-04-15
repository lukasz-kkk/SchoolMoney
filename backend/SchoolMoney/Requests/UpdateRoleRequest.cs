using FluentValidation;
using SchoolMoney.Properties;

namespace SchoolMoney.Requests
{
    public class UpdateRoleRequest
    {
        public string NewRole { get; set; }
    }

    public class UpdateRoleRequestValidator : AbstractValidator<UpdateRoleRequest>
    {
        public UpdateRoleRequestValidator()
        {
            RuleFor(x => x.NewRole)
                .Must(role => Enum.TryParse<Domain.Role>(role, out _))
                .WithMessage(context =>
                {
                    var rolesList = string.Join(", ", Enum.GetNames(typeof(Domain.Role)));
                    return string.Format(Resource.ValidatorRoleFromRolesList, rolesList);
                });
        }
    }
}
