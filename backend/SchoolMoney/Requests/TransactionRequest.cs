namespace SchoolMoney.Requests
{
    public class TransactionRequest
    {
        public string Name { get; set; }
        public string SourceAccountNumber { get; set; }
        public string TargetAccountNumber { get; set; }
        public decimal Amount { get; set; }
    }
}
