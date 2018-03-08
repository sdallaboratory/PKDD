using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace XTool.Migrations
{
    public partial class Fifth : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReligionViews",
                table: "Actors");

            migrationBuilder.DropColumn(
                name: "SocialActivity",
                table: "Actors");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ReligionViews",
                table: "Actors",
                maxLength: 10000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SocialActivity",
                table: "Actors",
                maxLength: 10000,
                nullable: true);
        }
    }
}
