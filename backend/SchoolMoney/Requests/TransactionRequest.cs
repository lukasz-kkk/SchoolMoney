using FluentValidation;
using SchoolMoney.Properties;

namespace SchoolMoney.Requests
{
    public class TransactionRequest
    {
        public string Name { get; set; }
        public string SourceAccountNumber { get; set; }
        public string TargetAccountNumber { get; set; }
        public int Amount { get; set; }
    }

    public class TransactionRequestValidator : AbstractValidator<TransactionRequest>
    {
        public TransactionRequestValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage(Resource.ValidatorTransactionNameRequired)
                .MaximumLength(100).WithMessage(Resource.ValidatorTransactionNameTooLong);

            RuleFor(x => x.SourceAccountNumber)
                .NotEmpty().WithMessage(Resource.ValidatorTransactionSourceRequired)
                .MaximumLength(34).WithMessage(Resource.ValidatorTransactionSourceTooLong);

            RuleFor(x => x.TargetAccountNumber)
                .NotEmpty().WithMessage(Resource.ValidatorTransactionTargetRequired)
                .MaximumLength(34).WithMessage(Resource.ValidatorTransactionTargetTooLong);

            RuleFor(x => x.Amount)
                .GreaterThan(0).WithMessage(Resource.ValidatorTransactionAmountGreaterThanZero)
                .LessThan(1000000).WithMessage(Resource.ValidatorTransactionAmountTooBig);
        }
    }
}
