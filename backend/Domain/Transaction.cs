
namespace Domain
{
    public class Transaction : Entity
    {
        public string Name { get; set; }
        public string SourceAccountNumber { get; set; }
        public string TargetAccountNumber { get; set; }
        public int Amount { get; set; }
        public DateTime Date { get; set; }
        public User Sender { get; set; }
    }
}
