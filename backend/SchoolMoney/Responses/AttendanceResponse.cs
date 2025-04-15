namespace SchoolMoney.Response
{
    public class AttendanceResponse
    {
        public int Id { get;  set; }
        public int ChildId { get; set; }
        public DateOnly Date { get; set; }
        public bool Status { get; set; }
    }
}