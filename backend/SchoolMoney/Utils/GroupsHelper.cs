namespace SchoolMoney.Utils
{
    public static class GroupsHelper
    {
        private static readonly Random _random = new();

        private const string _chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        private const int LENGTH = 7;

        public static string GenerateJoinCode()
        {
            return new string(Enumerable.Range(0, LENGTH)
                .Select(_ => _chars[_random.Next(_chars.Length)])
                .ToArray());
        }
    }
}
