using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Pkdd.Database.Migrations
{
    public partial class Update : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContentBlock_Person_PersonId",
                table: "ContentBlock");

            migrationBuilder.DropIndex(
                name: "IX_ContentBlock_PersonId",
                table: "ContentBlock");

            migrationBuilder.DropColumn(
                name: "PersonId",
                table: "ContentBlock");

            migrationBuilder.AlterColumn<string>(
                name: "Tilte",
                table: "ContentBlock",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<int>(
                name: "BaseBioBlockId",
                table: "ContentBlock",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "BaseBioBlock",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IsDeleted = table.Column<bool>(nullable: false),
                    TimeTrack_Created = table.Column<DateTime>(nullable: false),
                    TimeTrack_Updated = table.Column<DateTime>(nullable: false),
                    TimeTrack_Deleted = table.Column<DateTime>(nullable: false),
                    PersonId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BaseBioBlock", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BaseBioBlock_Person_PersonId",
                        column: x => x.PersonId,
                        principalTable: "Person",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MetaInformation",
                columns: table => new
                {
                    TimeTrack_Created = table.Column<DateTime>(nullable: false),
                    TimeTrack_Updated = table.Column<DateTime>(nullable: false),
                    TimeTrack_Deleted = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IsDeleted = table.Column<bool>(nullable: false),
                    Version = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MetaInformation", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ContentBlock_BaseBioBlockId",
                table: "ContentBlock",
                column: "BaseBioBlockId");

            migrationBuilder.CreateIndex(
                name: "IX_BaseBioBlock_PersonId",
                table: "BaseBioBlock",
                column: "PersonId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ContentBlock_BaseBioBlock_BaseBioBlockId",
                table: "ContentBlock",
                column: "BaseBioBlockId",
                principalTable: "BaseBioBlock",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContentBlock_BaseBioBlock_BaseBioBlockId",
                table: "ContentBlock");

            migrationBuilder.DropTable(
                name: "BaseBioBlock");

            migrationBuilder.DropTable(
                name: "MetaInformation");

            migrationBuilder.DropIndex(
                name: "IX_ContentBlock_BaseBioBlockId",
                table: "ContentBlock");

            migrationBuilder.DropColumn(
                name: "BaseBioBlockId",
                table: "ContentBlock");

            migrationBuilder.AlterColumn<string>(
                name: "Tilte",
                table: "ContentBlock",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PersonId",
                table: "ContentBlock",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ContentBlock_PersonId",
                table: "ContentBlock",
                column: "PersonId");

            migrationBuilder.AddForeignKey(
                name: "FK_ContentBlock_Person_PersonId",
                table: "ContentBlock",
                column: "PersonId",
                principalTable: "Person",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
