
namespace Domain
{
    public class Thread : Entity
    {
        public List<Message> Messages { get; set; }
        public User Parent { get; set; }
        public User Treasurer { get; set; }
        public string Subject { get; set; }
        public DateTime ParentLastRead { get; set; }
        public DateTime TreasurerLastRead { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
