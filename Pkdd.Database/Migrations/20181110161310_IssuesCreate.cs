using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Pkdd.Database.Migrations
{
    public partial class IssuesCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Issues",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    TimeTrack_Created = table.Column<DateTime>(nullable: false),
                    TimeTrack_Updated = table.Column<DateTime>(nullable: false),
                    TimeTrack_Deleted = table.Column<DateTime>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false),
                    Type = table.Column<int>(nullable: false),
                    Question = table.Column<string>(nullable: false),
                    User_Name = table.Column<string>(nullable: true),
                    User_Email = table.Column<string>(nullable: true),
                    User_MainRole = table.Column<string>(nullable: true),
                    IsSolved = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Issues", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FeedbackAnswers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    TimeTrack_Created = table.Column<DateTime>(nullable: false),
                    TimeTrack_Updated = table.Column<DateTime>(nullable: false),
                    TimeTrack_Deleted = table.Column<DateTime>(nullable: false),
                    TimeTrack_AnswerId = table.Column<int>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false),
                    IssueId = table.Column<int>(nullable: false),
                    AnswerText = table.Column<string>(nullable: false),
                    User_Name = table.Column<string>(nullable: true),
                    User_Email = table.Column<string>(nullable: true),
                    User_MainRole = table.Column<string>(nullable: true),
                    Order = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeedbackAnswers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FeedbackAnswers_Issues_IssueId",
                        column: x => x.IssueId,
                        principalTable: "Issues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FeedbackAnswers_IssueId",
                table: "FeedbackAnswers",
                column: "IssueId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FeedbackAnswers");

            migrationBuilder.DropTable(
                name: "Issues");
        }
    }
}
