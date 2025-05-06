using Domain;

public class File : Entity
{
    public Fundraiser Fundraiser { get; set; }
    public string FileName { get; set; }
    public string Description { get; set; }
}