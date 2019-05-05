using Microsoft.EntityFrameworkCore.Migrations;

namespace Pkdd.Database.Migrations
{
    public partial class physiognomy : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Physiognomy_Group1",
                table: "TestResults",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Physiognomy_Group10",
                table: "TestResults",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Physiognomy_Group11",
                table: "TestResults",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Physiognomy_Group12",
                table: "TestResults",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Physiognomy_Group2",
                table: "TestResults",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Physiognomy_Group3",
                table: "TestResults",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Physiognomy_Group4",
                table: "TestResults",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Physiognomy_Group5",
                table: "TestResults",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Physiognomy_Group6",
                table: "TestResults",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Physiognomy_Group7",
                table: "TestResults",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Physiognomy_Group8",
                table: "TestResults",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Physiognomy_Group9",
                table: "TestResults",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Physiognomy_Group1",
                table: "TestResults");

            migrationBuilder.DropColumn(
                name: "Physiognomy_Group10",
                table: "TestResults");

            migrationBuilder.DropColumn(
                name: "Physiognomy_Group11",
                table: "TestResults");

            migrationBuilder.DropColumn(
                name: "Physiognomy_Group12",
                table: "TestResults");

            migrationBuilder.DropColumn(
                name: "Physiognomy_Group2",
                table: "TestResults");

            migrationBuilder.DropColumn(
                name: "Physiognomy_Group3",
                table: "TestResults");

            migrationBuilder.DropColumn(
                name: "Physiognomy_Group4",
                table: "TestResults");

            migrationBuilder.DropColumn(
                name: "Physiognomy_Group5",
                table: "TestResults");

            migrationBuilder.DropColumn(
                name: "Physiognomy_Group6",
                table: "TestResults");

            migrationBuilder.DropColumn(
                name: "Physiognomy_Group7",
                table: "TestResults");

            migrationBuilder.DropColumn(
                name: "Physiognomy_Group8",
                table: "TestResults");

            migrationBuilder.DropColumn(
                name: "Physiognomy_Group9",
                table: "TestResults");
        }
    }
}
