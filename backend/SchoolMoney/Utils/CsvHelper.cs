using Domain;
using SchoolMoney.Response;
using System.Text;

namespace SchoolMoney.Utils
{
    public class CsvHelper
    {
        public static StringBuilder GenerateFundraiserCsvReport(
            Fundraiser fundraiser,
            string accountNumber,
            decimal balance)
        {
            var csv = new StringBuilder();
            csv.AppendLine("Fundraiser details:");
            csv.AppendLine($"Name:;{fundraiser.Name};");
            csv.AppendLine($"StartDate:;{fundraiser.StartDate};");
            csv.AppendLine($"EndDate:;{fundraiser.EndDate};");
            csv.AppendLine($"FinancialAccount:;{accountNumber};");
            csv.AppendLine($"Balance:;{balance} PLN;");
            csv.AppendLine();

            return csv;
        }
    }
}