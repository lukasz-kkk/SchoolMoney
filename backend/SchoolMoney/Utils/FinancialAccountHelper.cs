using System.Security.Cryptography;
using System.Text;

namespace SchoolMoney.Utils
{
    public static class FinancialAccountHelper
    {
        public static string GenerateAccountNumber()
        {
            var rand = new Random();
            var randomPart1 = rand.Next(1000, 9999);
            var randomPart2 = rand.Next(1000, 9999);
            var randomPart3 = rand.Next(1000, 9999);
            var randomPart4 = rand.Next(1000, 9999);
            string accountNumber = $"PL26 1200 0000 {randomPart1} {randomPart2} {randomPart3} {randomPart4}";

            return accountNumber;
        }
    }
}
