using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace XTool.Migrations
{
    public partial class XToolDbContextAlmosEdition : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Actors_ActorId",
                table: "Events");

            migrationBuilder.DropForeignKey(
                name: "FK_Events_CareerPeriods_CareerPeriodId",
                table: "Events");

            migrationBuilder.DropForeignKey(
                name: "FK_Media_Actors_ActorId",
                table: "Media");

            migrationBuilder.DropForeignKey(
                name: "FK_Media_Actors_Video_ActorId",
                table: "Media");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Media",
                table: "Media");

            migrationBuilder.DropIndex(
                name: "IX_Media_ActorId",
                table: "Media");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Events",
                table: "Events");

            migrationBuilder.DropIndex(
                name: "IX_Events_ActorId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Media");

            migrationBuilder.DropColumn(
                name: "ActorId",
                table: "Media");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "ActorId",
                table: "Events");

            migrationBuilder.RenameTable(
                name: "Media",
                newName: "Videos");

            migrationBuilder.RenameTable(
                name: "Events",
                newName: "CareerEvents");

            migrationBuilder.RenameColumn(
                name: "Video_ActorId",
                table: "Videos",
                newName: "ActorId");

            migrationBuilder.RenameIndex(
                name: "IX_Media_Video_ActorId",
                table: "Videos",
                newName: "IX_Videos_ActorId");

            migrationBuilder.RenameIndex(
                name: "IX_Events_CareerPeriodId",
                table: "CareerEvents",
                newName: "IX_CareerEvents_CareerPeriodId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Evaluations",
                newName: "ExpertId");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "UploadedPhotos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "ActorId",
                table: "Videos",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TimePeriodId",
                table: "CareerEvents",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TechnologistId",
                table: "Actors",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Videos",
                table: "Videos",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CareerEvents",
                table: "CareerEvents",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "BiographyEvents",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ActorId = table.Column<int>(nullable: false),
                    Comment = table.Column<string>(maxLength: 2000, nullable: true),
                    Description = table.Column<string>(maxLength: 2000, nullable: false),
                    Period = table.Column<string>(maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BiographyEvents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BiographyEvents_Actors_ActorId",
                        column: x => x.ActorId,
                        principalTable: "Actors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Photos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    ActorId = table.Column<int>(nullable: false),
                    Comment = table.Column<string>(maxLength: 2000, nullable: true),
                    Description = table.Column<string>(maxLength: 2000, nullable: true),
                    Url = table.Column<string>(maxLength: 4096, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Photos_Actors_ActorId",
                        column: x => x.ActorId,
                        principalTable: "Actors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UploadedPhotos_UserId",
                table: "UploadedPhotos",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Evaluations_ExpertId",
                table: "Evaluations",
                column: "ExpertId");

            migrationBuilder.CreateIndex(
                name: "IX_Evaluations_ScalesId",
                table: "Evaluations",
                column: "ScalesId");

            migrationBuilder.CreateIndex(
                name: "IX_Actors_TechnologistId",
                table: "Actors",
                column: "TechnologistId");

            migrationBuilder.CreateIndex(
                name: "IX_BiographyEvents_ActorId",
                table: "BiographyEvents",
                column: "ActorId");

            migrationBuilder.CreateIndex(
                name: "IX_Photos_ActorId",
                table: "Photos",
                column: "ActorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Actors_AspNetUsers_TechnologistId",
                table: "Actors",
                column: "TechnologistId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CareerEvents_CareerPeriods_CareerPeriodId",
                table: "CareerEvents",
                column: "CareerPeriodId",
                principalTable: "CareerPeriods",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Evaluations_AspNetUsers_ExpertId",
                table: "Evaluations",
                column: "ExpertId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Evaluations_Scales_ScalesId",
                table: "Evaluations",
                column: "ScalesId",
                principalTable: "Scales",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UploadedPhotos_AspNetUsers_UserId",
                table: "UploadedPhotos",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Videos_Actors_ActorId",
                table: "Videos",
                column: "ActorId",
                principalTable: "Actors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Actors_AspNetUsers_TechnologistId",
                table: "Actors");

            migrationBuilder.DropForeignKey(
                name: "FK_CareerEvents_CareerPeriods_CareerPeriodId",
                table: "CareerEvents");

            migrationBuilder.DropForeignKey(
                name: "FK_Evaluations_AspNetUsers_ExpertId",
                table: "Evaluations");

            migrationBuilder.DropForeignKey(
                name: "FK_Evaluations_Scales_ScalesId",
                table: "Evaluations");

            migrationBuilder.DropForeignKey(
                name: "FK_UploadedPhotos_AspNetUsers_UserId",
                table: "UploadedPhotos");

            migrationBuilder.DropForeignKey(
                name: "FK_Videos_Actors_ActorId",
                table: "Videos");

            migrationBuilder.DropTable(
                name: "BiographyEvents");

            migrationBuilder.DropTable(
                name: "Photos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Videos",
                table: "Videos");

            migrationBuilder.DropIndex(
                name: "IX_UploadedPhotos_UserId",
                table: "UploadedPhotos");

            migrationBuilder.DropIndex(
                name: "IX_Evaluations_ExpertId",
                table: "Evaluations");

            migrationBuilder.DropIndex(
                name: "IX_Evaluations_ScalesId",
                table: "Evaluations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CareerEvents",
                table: "CareerEvents");

            migrationBuilder.DropIndex(
                name: "IX_Actors_TechnologistId",
                table: "Actors");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "UploadedPhotos");

            migrationBuilder.DropColumn(
                name: "TechnologistId",
                table: "Actors");

            migrationBuilder.RenameTable(
                name: "Videos",
                newName: "Media");

            migrationBuilder.RenameTable(
                name: "CareerEvents",
                newName: "Events");

            migrationBuilder.RenameColumn(
                name: "ActorId",
                table: "Media",
                newName: "Video_ActorId");

            migrationBuilder.RenameIndex(
                name: "IX_Videos_ActorId",
                table: "Media",
                newName: "IX_Media_Video_ActorId");

            migrationBuilder.RenameColumn(
                name: "ExpertId",
                table: "Evaluations",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_CareerEvents_CareerPeriodId",
                table: "Events",
                newName: "IX_Events_CareerPeriodId");

            migrationBuilder.AlterColumn<int>(
                name: "Video_ActorId",
                table: "Media",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Media",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "ActorId",
                table: "Media",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TimePeriodId",
                table: "Events",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Events",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "ActorId",
                table: "Events",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Media",
                table: "Media",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Events",
                table: "Events",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Media_ActorId",
                table: "Media",
                column: "ActorId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_ActorId",
                table: "Events",
                column: "ActorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Actors_ActorId",
                table: "Events",
                column: "ActorId",
                principalTable: "Actors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Events_CareerPeriods_CareerPeriodId",
                table: "Events",
                column: "CareerPeriodId",
                principalTable: "CareerPeriods",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Media_Actors_ActorId",
                table: "Media",
                column: "ActorId",
                principalTable: "Actors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Media_Actors_Video_ActorId",
                table: "Media",
                column: "Video_ActorId",
                principalTable: "Actors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
