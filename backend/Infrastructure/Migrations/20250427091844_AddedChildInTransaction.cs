using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedChildInTransaction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ChildId",
                table: "Transactions",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_ChildId",
                table: "Transactions",
                column: "ChildId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Children_ChildId",
                table: "Transactions",
                column: "ChildId",
                principalTable: "Children",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Children_ChildId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_ChildId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "ChildId",
                table: "Transactions");
        }
    }
}
