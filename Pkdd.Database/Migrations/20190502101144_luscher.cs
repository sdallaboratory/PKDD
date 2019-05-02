using Microsoft.EntityFrameworkCore.Migrations;

namespace Pkdd.Database.Migrations
{
    public partial class luscher : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Luscher_Black",
                table: "TestResults",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Luscher_Blue",
                table: "TestResults",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Luscher_Brown",
                table: "TestResults",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Luscher_Green",
                table: "TestResults",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Luscher_Grey",
                table: "TestResults",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Luscher_Pink",
                table: "TestResults",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Luscher_Red",
                table: "TestResults",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Luscher_Yellow",
                table: "TestResults",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Luscher_Black",
                table: "TestResults");

            migrationBuilder.DropColumn(
                name: "Luscher_Blue",
                table: "TestResults");

            migrationBuilder.DropColumn(
                name: "Luscher_Brown",
                table: "TestResults");

            migrationBuilder.DropColumn(
                name: "Luscher_Green",
                table: "TestResults");

            migrationBuilder.DropColumn(
                name: "Luscher_Grey",
                table: "TestResults");

            migrationBuilder.DropColumn(
                name: "Luscher_Pink",
                table: "TestResults");

            migrationBuilder.DropColumn(
                name: "Luscher_Red",
                table: "TestResults");

            migrationBuilder.DropColumn(
                name: "Luscher_Yellow",
                table: "TestResults");
        }
    }
}
