using Domain;

namespace SchoolMoney.Response
{
    public class FundraiserChildsResponse
    {
        public List<ChildResponse> PaidChilds { get; set; }
        public List<ChildResponse> UnpaidChilds { get; set; }
    }
}