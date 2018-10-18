using Microsoft.EntityFrameworkCore.Migrations;

namespace Pkdd.Database.Migrations
{
    public partial class Result_FKs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Comment",
                table: "TestResults",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PersonId",
                table: "TestResults",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PkddUserId",
                table: "TestResults",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Priority",
                table: "Persons",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_TestResults_PersonId",
                table: "TestResults",
                column: "PersonId");

            migrationBuilder.CreateIndex(
                name: "IX_TestResults_PkddUserId",
                table: "TestResults",
                column: "PkddUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_TestResults_Persons_PersonId",
                table: "TestResults",
                column: "PersonId",
                principalTable: "Persons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TestResults_AspNetUsers_PkddUserId",
                table: "TestResults",
                column: "PkddUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TestResults_Persons_PersonId",
                table: "TestResults");

            migrationBuilder.DropForeignKey(
                name: "FK_TestResults_AspNetUsers_PkddUserId",
                table: "TestResults");

            migrationBuilder.DropIndex(
                name: "IX_TestResults_PersonId",
                table: "TestResults");

            migrationBuilder.DropIndex(
                name: "IX_TestResults_PkddUserId",
                table: "TestResults");

            migrationBuilder.DropColumn(
                name: "Comment",
                table: "TestResults");

            migrationBuilder.DropColumn(
                name: "PersonId",
                table: "TestResults");

            migrationBuilder.DropColumn(
                name: "PkddUserId",
                table: "TestResults");

            migrationBuilder.DropColumn(
                name: "Priority",
                table: "Persons");
        }
    }
}
