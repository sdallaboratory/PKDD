using Microsoft.EntityFrameworkCore.Migrations;

namespace Pkdd.Database.Migrations
{
    public partial class UpdateContentBlock : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Person_ContentBlock_BioBlockId",
                table: "Person");

            migrationBuilder.DropIndex(
                name: "IX_Person_BioBlockId",
                table: "Person");

            migrationBuilder.DropColumn(
                name: "BioBlockId",
                table: "Person");

            migrationBuilder.AlterColumn<string>(
                name: "Order",
                table: "ContentBlock",
                nullable: true,
                oldClrType: typeof(byte));

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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<int>(
                name: "BioBlockId",
                table: "Person",
                nullable: true);

            migrationBuilder.AlterColumn<byte>(
                name: "Order",
                table: "ContentBlock",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Person_BioBlockId",
                table: "Person",
                column: "BioBlockId");

            migrationBuilder.AddForeignKey(
                name: "FK_Person_ContentBlock_BioBlockId",
                table: "Person",
                column: "BioBlockId",
                principalTable: "ContentBlock",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
