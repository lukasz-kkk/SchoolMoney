using System.Security.Cryptography;
using System.Text;

namespace SchoolMoney.Utils
{
    public static class ShaHelper
    {
        public static string QuickHash(string input)
        {
            var inputBytes = Encoding.UTF8.GetBytes(input);
            var inputHash = SHA256.HashData(inputBytes);
            return Convert.ToHexString(inputHash);
        }
    }
}
