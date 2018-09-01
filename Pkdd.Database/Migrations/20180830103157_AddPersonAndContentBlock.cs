using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Pkdd.Database.Migrations
{
    public partial class AddPersonAndContentBlock : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ContentBlock",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IsDeleted = table.Column<bool>(nullable: false),
                    TimeTrack_Created = table.Column<DateTime>(nullable: false),
                    TimeTrack_Updated = table.Column<DateTime>(nullable: false),
                    TimeTrack_Deleted = table.Column<DateTime>(nullable: false),
                    Tilte = table.Column<string>(nullable: false),
                    Subtitle = table.Column<string>(nullable: true),
                    Type = table.Column<int>(nullable: false),
                    Content = table.Column<string>(nullable: false),
                    Comment = table.Column<string>(nullable: true),
                    Order = table.Column<byte>(nullable: false),
                    ContentBlockId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContentBlock", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContentBlock_ContentBlock_ContentBlockId",
                        column: x => x.ContentBlockId,
                        principalTable: "ContentBlock",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Person",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    TimeTrack_Created = table.Column<DateTime>(nullable: false),
                    TimeTrack_Updated = table.Column<DateTime>(nullable: false),
                    TimeTrack_Deleted = table.Column<DateTime>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(maxLength: 200, nullable: false),
                    Sex = table.Column<int>(nullable: false),
                    Birthday = table.Column<DateTime>(nullable: false),
                    Position = table.Column<string>(maxLength: 500, nullable: true),
                    BioBlockId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Person", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Person_ContentBlock_BioBlockId",
                        column: x => x.BioBlockId,
                        principalTable: "ContentBlock",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ContentBlock_ContentBlockId",
                table: "ContentBlock",
                column: "ContentBlockId");

            migrationBuilder.CreateIndex(
                name: "IX_Person_BioBlockId",
                table: "Person",
                column: "BioBlockId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Person");

            migrationBuilder.DropTable(
                name: "ContentBlock");
        }
    }
}
