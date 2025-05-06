using SchoolMoney.Response;
using MediatR;

namespace SchoolMoney.Queries
{
    public class GetFilesByFundraiserQuery : IRequest<IEnumerable<FileResponse>>
    {
        public int FundraiserId { get; set; }
    }
}
