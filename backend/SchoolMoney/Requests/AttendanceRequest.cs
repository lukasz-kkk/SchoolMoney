namespace SchoolMoney.Requests
{
    public class AttendanceRequest
    {
        public int ChildId { get; set; }
        public DateOnly Date { get; set; }
        public bool Status { get; set; }
    }
}