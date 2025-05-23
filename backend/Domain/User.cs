﻿
namespace Domain
{
    public class User : Entity
    {
        public string Login { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Role Role { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string HashedPassword { get; set; }
        public bool IsActive { get; set; }
        public FinancialAccount Account { get; set; }
    }
}
