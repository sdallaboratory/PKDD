using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace XTool.Migrations
{
    public partial class Second : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ExpertId",
                table: "Evaluations",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Evaluations_ExpertId",
                table: "Evaluations",
                column: "ExpertId");

            migrationBuilder.AddForeignKey(
                name: "FK_Evaluations_AspNetUsers_ExpertId",
                table: "Evaluations",
                column: "ExpertId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Evaluations_AspNetUsers_ExpertId",
                table: "Evaluations");

            migrationBuilder.DropIndex(
                name: "IX_Evaluations_ExpertId",
                table: "Evaluations");

            migrationBuilder.DropColumn(
                name: "ExpertId",
                table: "Evaluations");
        }
    }
}
