using Microsoft.EntityFrameworkCore.Migrations;

namespace Pkdd.Database.Migrations
{
    public partial class ChangeIssueses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Question",
                table: "Issues",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<int>(
                name: "User_UserId",
                table: "Issues",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "AnswerText",
                table: "FeedbackAnswers",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<int>(
                name: "User_AnswerId",
                table: "FeedbackAnswers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "User_UserId",
                table: "FeedbackAnswers",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "User_UserId",
                table: "Issues");

            migrationBuilder.DropColumn(
                name: "User_AnswerId",
                table: "FeedbackAnswers");

            migrationBuilder.DropColumn(
                name: "User_UserId",
                table: "FeedbackAnswers");

            migrationBuilder.AlterColumn<string>(
                name: "Question",
                table: "Issues",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "AnswerText",
                table: "FeedbackAnswers",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
