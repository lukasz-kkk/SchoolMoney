namespace SchoolMoney.Response
{
    public class GroupResponse
    {
        public int Id { get;  set; }
        public string Name { get; set; }
        public int TreasurerId { get; set; }
        public string TreasurerFirstName { get; set; }
        public string TreasurerLastName { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}