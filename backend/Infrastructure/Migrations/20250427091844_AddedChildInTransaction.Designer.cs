﻿// <auto-generated />
using System;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Infrastructure.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20250427091844_AddedChildInTransaction")]
    partial class AddedChildInTransaction
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.17");

            modelBuilder.Entity("Domain.Announcement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Content")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("TEXT");

                    b.Property<string>("FilePath")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Announcements");
                });

            modelBuilder.Entity("Domain.Child", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("TEXT");

                    b.Property<DateOnly>("DateOfBirth")
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .HasColumnType("TEXT");

                    b.Property<int?>("GroupId")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsAccepted")
                        .HasColumnType("INTEGER");

                    b.Property<string>("LastName")
                        .HasColumnType("TEXT");

                    b.Property<int?>("ParentId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("GroupId");

                    b.HasIndex("ParentId");

                    b.ToTable("Children");
                });

            modelBuilder.Entity("Domain.FinancialAccount", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Balance")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Number")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("FinancialAccounts");
                });

            modelBuilder.Entity("Domain.Fundraiser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<DateOnly>("EndDate")
                        .HasColumnType("TEXT");

                    b.Property<int?>("FinancialAccountId")
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("Goal")
                        .HasColumnType("TEXT");

                    b.Property<int?>("GroupId")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsBlocked")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<int?>("OwnerId")
                        .HasColumnType("INTEGER");

                    b.Property<DateOnly>("StartDate")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("FinancialAccountId");

                    b.HasIndex("GroupId");

                    b.HasIndex("OwnerId");

                    b.ToTable("Fundraisers");
                });

            modelBuilder.Entity("Domain.FundraiserChild", b =>
                {
                    b.Property<int>("FundraiserId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ChildId")
                        .HasColumnType("INTEGER");

                    b.HasKey("FundraiserId", "ChildId");

                    b.HasIndex("ChildId");

                    b.ToTable("FundraiserChild");
                });

            modelBuilder.Entity("Domain.Group", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("TEXT");

                    b.Property<string>("JoinCode")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<int?>("TreasurerId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("TreasurerId");

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("Domain.Meal", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Breakfast")
                        .HasColumnType("TEXT");

                    b.Property<DateOnly>("Date")
                        .HasColumnType("TEXT");

                    b.Property<string>("Dinner")
                        .HasColumnType("TEXT");

                    b.Property<int?>("GroupId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Lunch")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("GroupId");

                    b.ToTable("Meals");
                });

            modelBuilder.Entity("Domain.Message", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Content")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("TEXT");

                    b.Property<int?>("SenderId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("ThreadId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("SenderId");

                    b.HasIndex("ThreadId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("Domain.Thread", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("TEXT");

                    b.Property<int?>("ParentId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("ParentLastRead")
                        .HasColumnType("TEXT");

                    b.Property<string>("Subject")
                        .HasColumnType("TEXT");

                    b.Property<int?>("TreasurerId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("TreasurerLastRead")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("ParentId");

                    b.HasIndex("TreasurerId");

                    b.ToTable("Threads");
                });

            modelBuilder.Entity("Domain.Transaction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Amount")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("ChildId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Date")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<int?>("SenderId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SourceAccountNumber")
                        .HasColumnType("TEXT");

                    b.Property<string>("TargetAccountNumber")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("ChildId");

                    b.HasIndex("SenderId");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("Domain.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("AccountId")
                        .HasColumnType("INTEGER");

                    b.Property<DateOnly>("DateOfBirth")
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .HasColumnType("TEXT");

                    b.Property<string>("HashedPassword")
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsActive")
                        .HasColumnType("INTEGER");

                    b.Property<string>("LastName")
                        .HasColumnType("TEXT");

                    b.Property<string>("Login")
                        .HasColumnType("TEXT");

                    b.Property<int>("Role")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("AccountId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Domain.Child", b =>
                {
                    b.HasOne("Domain.Group", "Group")
                        .WithMany()
                        .HasForeignKey("GroupId");

                    b.HasOne("Domain.User", "Parent")
                        .WithMany()
                        .HasForeignKey("ParentId");

                    b.Navigation("Group");

                    b.Navigation("Parent");
                });

            modelBuilder.Entity("Domain.Fundraiser", b =>
                {
                    b.HasOne("Domain.FinancialAccount", "FinancialAccount")
                        .WithMany()
                        .HasForeignKey("FinancialAccountId");

                    b.HasOne("Domain.Group", "Group")
                        .WithMany()
                        .HasForeignKey("GroupId");

                    b.HasOne("Domain.User", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerId");

                    b.Navigation("FinancialAccount");

                    b.Navigation("Group");

                    b.Navigation("Owner");
                });

            modelBuilder.Entity("Domain.FundraiserChild", b =>
                {
                    b.HasOne("Domain.Child", "Child")
                        .WithMany()
                        .HasForeignKey("ChildId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Fundraiser", "Fundraiser")
                        .WithMany("ExcludedChildrens")
                        .HasForeignKey("FundraiserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Child");

                    b.Navigation("Fundraiser");
                });

            modelBuilder.Entity("Domain.Group", b =>
                {
                    b.HasOne("Domain.User", "Treasurer")
                        .WithMany()
                        .HasForeignKey("TreasurerId");

                    b.Navigation("Treasurer");
                });

            modelBuilder.Entity("Domain.Meal", b =>
                {
                    b.HasOne("Domain.Group", "Group")
                        .WithMany()
                        .HasForeignKey("GroupId");

                    b.Navigation("Group");
                });

            modelBuilder.Entity("Domain.Message", b =>
                {
                    b.HasOne("Domain.User", "Sender")
                        .WithMany()
                        .HasForeignKey("SenderId");

                    b.HasOne("Domain.Thread", null)
                        .WithMany("Messages")
                        .HasForeignKey("ThreadId");

                    b.Navigation("Sender");
                });

            modelBuilder.Entity("Domain.Thread", b =>
                {
                    b.HasOne("Domain.User", "Parent")
                        .WithMany()
                        .HasForeignKey("ParentId");

                    b.HasOne("Domain.User", "Treasurer")
                        .WithMany()
                        .HasForeignKey("TreasurerId");

                    b.Navigation("Parent");

                    b.Navigation("Treasurer");
                });

            modelBuilder.Entity("Domain.Transaction", b =>
                {
                    b.HasOne("Domain.Child", "Child")
                        .WithMany()
                        .HasForeignKey("ChildId");

                    b.HasOne("Domain.User", "Sender")
                        .WithMany()
                        .HasForeignKey("SenderId");

                    b.Navigation("Child");

                    b.Navigation("Sender");
                });

            modelBuilder.Entity("Domain.User", b =>
                {
                    b.HasOne("Domain.FinancialAccount", "Account")
                        .WithMany()
                        .HasForeignKey("AccountId");

                    b.Navigation("Account");
                });

            modelBuilder.Entity("Domain.Fundraiser", b =>
                {
                    b.Navigation("ExcludedChildrens");
                });

            modelBuilder.Entity("Domain.Thread", b =>
                {
                    b.Navigation("Messages");
                });
#pragma warning restore 612, 618
        }
    }
}
