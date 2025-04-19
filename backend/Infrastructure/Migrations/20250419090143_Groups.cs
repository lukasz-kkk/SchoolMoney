using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Groups : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Groups_Users_CaregiverId",
                table: "Groups");

            migrationBuilder.DropForeignKey(
                name: "FK_Threads_Users_CaregiverId",
                table: "Threads");

            migrationBuilder.RenameColumn(
                name: "CaregiverLastRead",
                table: "Threads",
                newName: "TreasurerLastRead");

            migrationBuilder.RenameColumn(
                name: "CaregiverId",
                table: "Threads",
                newName: "TreasurerId");

            migrationBuilder.RenameIndex(
                name: "IX_Threads_CaregiverId",
                table: "Threads",
                newName: "IX_Threads_TreasurerId");

            migrationBuilder.RenameColumn(
                name: "CaregiverId",
                table: "Groups",
                newName: "TreasurerId");

            migrationBuilder.RenameIndex(
                name: "IX_Groups_CaregiverId",
                table: "Groups",
                newName: "IX_Groups_TreasurerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Groups_Users_TreasurerId",
                table: "Groups",
                column: "TreasurerId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Threads_Users_TreasurerId",
                table: "Threads",
                column: "TreasurerId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Groups_Users_TreasurerId",
                table: "Groups");

            migrationBuilder.DropForeignKey(
                name: "FK_Threads_Users_TreasurerId",
                table: "Threads");

            migrationBuilder.RenameColumn(
                name: "TreasurerLastRead",
                table: "Threads",
                newName: "CaregiverLastRead");

            migrationBuilder.RenameColumn(
                name: "TreasurerId",
                table: "Threads",
                newName: "CaregiverId");

            migrationBuilder.RenameIndex(
                name: "IX_Threads_TreasurerId",
                table: "Threads",
                newName: "IX_Threads_CaregiverId");

            migrationBuilder.RenameColumn(
                name: "TreasurerId",
                table: "Groups",
                newName: "CaregiverId");

            migrationBuilder.RenameIndex(
                name: "IX_Groups_TreasurerId",
                table: "Groups",
                newName: "IX_Groups_CaregiverId");

            migrationBuilder.AddForeignKey(
                name: "FK_Groups_Users_CaregiverId",
                table: "Groups",
                column: "CaregiverId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Threads_Users_CaregiverId",
                table: "Threads",
                column: "CaregiverId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
