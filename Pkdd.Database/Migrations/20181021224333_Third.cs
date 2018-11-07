using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Pkdd.Database.Migrations
{
    public partial class Third : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TimeTrack_ContentBlockId",
                table: "ContentBlocks");

            migrationBuilder.DropColumn(
                name: "TimeTrack_Created",
                table: "ContentBlocks");

            migrationBuilder.DropColumn(
                name: "TimeTrack_Deleted",
                table: "ContentBlocks");

            migrationBuilder.DropColumn(
                name: "TimeTrack_Updated",
                table: "ContentBlocks");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TimeTrack_ContentBlockId",
                table: "ContentBlocks",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "TimeTrack_Created",
                table: "ContentBlocks",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "TimeTrack_Deleted",
                table: "ContentBlocks",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "TimeTrack_Updated",
                table: "ContentBlocks",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
