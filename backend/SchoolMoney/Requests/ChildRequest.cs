namespace SchoolMoney.Requests
{
    public class ChildRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public int ParentId { get; set; }
        public int GroupId { get; set; }
    }
}