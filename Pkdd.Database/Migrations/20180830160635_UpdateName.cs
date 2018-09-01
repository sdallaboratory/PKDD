using Microsoft.EntityFrameworkCore.Migrations;

namespace Pkdd.Database.Migrations
{
    public partial class UpdateName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BaseBioBlock_Person_PersonId",
                table: "BaseBioBlock");

            migrationBuilder.DropForeignKey(
                name: "FK_ContentBlock_BaseBioBlock_BaseBioBlockId",
                table: "ContentBlock");

            migrationBuilder.DropForeignKey(
                name: "FK_ContentBlock_ContentBlock_ContentBlockId",
                table: "ContentBlock");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Person",
                table: "Person");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MetaInformation",
                table: "MetaInformation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ContentBlock",
                table: "ContentBlock");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BaseBioBlock",
                table: "BaseBioBlock");

            migrationBuilder.RenameTable(
                name: "Person",
                newName: "Persons");

            migrationBuilder.RenameTable(
                name: "MetaInformation",
                newName: "MetaInfos");

            migrationBuilder.RenameTable(
                name: "ContentBlock",
                newName: "ContentBlocks");

            migrationBuilder.RenameTable(
                name: "BaseBioBlock",
                newName: "MainBioBlocks");

            migrationBuilder.RenameIndex(
                name: "IX_ContentBlock_ContentBlockId",
                table: "ContentBlocks",
                newName: "IX_ContentBlocks_ContentBlockId");

            migrationBuilder.RenameIndex(
                name: "IX_ContentBlock_BaseBioBlockId",
                table: "ContentBlocks",
                newName: "IX_ContentBlocks_BaseBioBlockId");

            migrationBuilder.RenameIndex(
                name: "IX_BaseBioBlock_PersonId",
                table: "MainBioBlocks",
                newName: "IX_MainBioBlocks_PersonId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Persons",
                table: "Persons",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MetaInfos",
                table: "MetaInfos",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ContentBlocks",
                table: "ContentBlocks",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MainBioBlocks",
                table: "MainBioBlocks",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ContentBlocks_MainBioBlocks_BaseBioBlockId",
                table: "ContentBlocks",
                column: "BaseBioBlockId",
                principalTable: "MainBioBlocks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ContentBlocks_ContentBlocks_ContentBlockId",
                table: "ContentBlocks",
                column: "ContentBlockId",
                principalTable: "ContentBlocks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MainBioBlocks_Persons_PersonId",
                table: "MainBioBlocks",
                column: "PersonId",
                principalTable: "Persons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContentBlocks_MainBioBlocks_BaseBioBlockId",
                table: "ContentBlocks");

            migrationBuilder.DropForeignKey(
                name: "FK_ContentBlocks_ContentBlocks_ContentBlockId",
                table: "ContentBlocks");

            migrationBuilder.DropForeignKey(
                name: "FK_MainBioBlocks_Persons_PersonId",
                table: "MainBioBlocks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Persons",
                table: "Persons");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MetaInfos",
                table: "MetaInfos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MainBioBlocks",
                table: "MainBioBlocks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ContentBlocks",
                table: "ContentBlocks");

            migrationBuilder.RenameTable(
                name: "Persons",
                newName: "Person");

            migrationBuilder.RenameTable(
                name: "MetaInfos",
                newName: "MetaInformation");

            migrationBuilder.RenameTable(
                name: "MainBioBlocks",
                newName: "BaseBioBlock");

            migrationBuilder.RenameTable(
                name: "ContentBlocks",
                newName: "ContentBlock");

            migrationBuilder.RenameIndex(
                name: "IX_MainBioBlocks_PersonId",
                table: "BaseBioBlock",
                newName: "IX_BaseBioBlock_PersonId");

            migrationBuilder.RenameIndex(
                name: "IX_ContentBlocks_ContentBlockId",
                table: "ContentBlock",
                newName: "IX_ContentBlock_ContentBlockId");

            migrationBuilder.RenameIndex(
                name: "IX_ContentBlocks_BaseBioBlockId",
                table: "ContentBlock",
                newName: "IX_ContentBlock_BaseBioBlockId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Person",
                table: "Person",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MetaInformation",
                table: "MetaInformation",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BaseBioBlock",
                table: "BaseBioBlock",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ContentBlock",
                table: "ContentBlock",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BaseBioBlock_Person_PersonId",
                table: "BaseBioBlock",
                column: "PersonId",
                principalTable: "Person",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ContentBlock_BaseBioBlock_BaseBioBlockId",
                table: "ContentBlock",
                column: "BaseBioBlockId",
                principalTable: "BaseBioBlock",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ContentBlock_ContentBlock_ContentBlockId",
                table: "ContentBlock",
                column: "ContentBlockId",
                principalTable: "ContentBlock",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
