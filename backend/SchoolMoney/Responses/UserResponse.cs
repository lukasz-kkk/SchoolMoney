namespace SchoolMoney.Response
{
    public class UserResponse
    {
        public int Id { get;  set; }
        public string Login { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }
        public bool IsActive { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public String AccoutNumber { get; set; }
    }
}