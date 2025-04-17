namespace SchoolMoney.Response
{
    public class TransactionResponse
    {
        public string Name { get; set; }
        public string SourceAccountNumber { get; set; }
        public string TargetAccountNumber { get; set; }
        public int Amount { get; set; }
        public DateTime Date { get; set; }
        public string SenderFirstName { get; set; }
        public string SenderLastName { get; set; }
        public int SenderId { get; set; }
    }
}