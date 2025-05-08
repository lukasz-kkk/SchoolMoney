using Domain;

public class Message : Entity
{
    public User Sender { get; set; }
    public int ReceiverGroupId { get; set; }
    public int ReceiverUserId { get; set; }
    public string Content { get; set; }
    public DateTime CreatedAt { get; set; }
}