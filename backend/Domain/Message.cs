using Domain;

public class Message : Entity
{
    public User sender { get; set; }
    public int ReceiverClassId { get; set; }
    public int ReceiverUserId { get; set; }
    public string Content { get; set; }
    public DateTime CreatedAt { get; set; }
}