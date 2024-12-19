﻿
namespace Domain
{
    public class Child : Entity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public int ParentId { get; set; }
        public int GroupId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
