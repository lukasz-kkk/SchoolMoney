﻿using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Extensions
{
    public static class ServiceExtensions
    {
        public static void AddInfrastructure(this IServiceCollection services, string filename)
        {
            services.AddDbContext<AppDbContext>(options => options.UseSqlite(filename));
            services.AddScoped<IUserRepository, UserRepository>()
                    .AddScoped<IChildRepository, ChildRepository>()
                    .AddScoped<IGroupRepository, GroupRepository>()
                    .AddScoped<IAnnouncementRepository, AnnouncementRepository>()
                    .AddScoped<IMealRepository, MealRepository>()
                    .AddScoped<IFinancialAccountRepository, FinancialAccountRepository>()
                    .AddScoped<IFundraiserRepository, FundraiserRepository>()
                    .AddScoped<ITransactionRepository, TransactionRepository>()
                    .AddScoped<IFileRepository, FileRepository>();
        }
    }
}
