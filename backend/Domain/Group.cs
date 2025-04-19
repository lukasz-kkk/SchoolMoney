
namespace Domain
{
    public class Group : Entity
    {
        public string Name { get; set; }
        public User Treasurer { get; set; }
        public DateTime CreatedAt { get; set; }
        public string JoinCode { get; set; }
    }
}
