using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace XTool.Migrations
{
    public partial class Second : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Actors",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Birthday = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(maxLength: 200, nullable: false),
                    Position = table.Column<string>(maxLength: 500, nullable: true),
                    ReligionViews = table.Column<string>(maxLength: 10000, nullable: true),
                    Sex = table.Column<int>(nullable: false),
                    SocialActivity = table.Column<string>(maxLength: 10000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Actors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Scales",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Depression = table.Column<int>(nullable: false),
                    Hypochondriasis = table.Column<int>(nullable: false),
                    Hypomania = table.Column<int>(nullable: false),
                    Hysteria = table.Column<int>(nullable: false),
                    MasculinityFeminity = table.Column<int>(nullable: false),
                    Paranoia = table.Column<int>(nullable: false),
                    Psychasthenia = table.Column<int>(nullable: false),
                    PsychopathicDeviate = table.Column<int>(nullable: false),
                    Schizophrenia = table.Column<int>(nullable: false),
                    SocialInteroversion = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Scales", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UploadedPhotos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Content = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UploadedPhotos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CareerPeriods",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ActorId = table.Column<int>(nullable: false),
                    Period = table.Column<string>(maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CareerPeriods", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CareerPeriods_Actors_ActorId",
                        column: x => x.ActorId,
                        principalTable: "Actors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CustomSections",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ActorId = table.Column<int>(nullable: false),
                    Comment = table.Column<string>(maxLength: 2000, nullable: true),
                    Content = table.Column<string>(maxLength: 10000, nullable: false),
                    Title = table.Column<string>(maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomSections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CustomSections_Actors_ActorId",
                        column: x => x.ActorId,
                        principalTable: "Actors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Evaluations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ActorId = table.Column<int>(nullable: false),
                    Comment = table.Column<string>(maxLength: 2000, nullable: true),
                    LastChange = table.Column<DateTime>(nullable: false),
                    ScalesId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Evaluations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Evaluations_Actors_ActorId",
                        column: x => x.ActorId,
                        principalTable: "Actors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Media",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Comment = table.Column<string>(maxLength: 2000, nullable: true),
                    Description = table.Column<string>(maxLength: 2000, nullable: true),
                    Discriminator = table.Column<string>(nullable: false),
                    Url = table.Column<string>(maxLength: 4096, nullable: false),
                    ActorId = table.Column<int>(nullable: true),
                    Video_ActorId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Media", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Media_Actors_ActorId",
                        column: x => x.ActorId,
                        principalTable: "Actors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Media_Actors_Video_ActorId",
                        column: x => x.Video_ActorId,
                        principalTable: "Actors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Publications",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ActorId = table.Column<int>(nullable: false),
                    Comment = table.Column<string>(maxLength: 2000, nullable: true),
                    Name = table.Column<string>(maxLength: 500, nullable: false),
                    Url = table.Column<string>(maxLength: 4096, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Publications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Publications_Actors_ActorId",
                        column: x => x.ActorId,
                        principalTable: "Actors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Comment = table.Column<string>(maxLength: 2000, nullable: true),
                    Description = table.Column<string>(maxLength: 2000, nullable: false),
                    Discriminator = table.Column<string>(nullable: false),
                    Period = table.Column<string>(maxLength: 20, nullable: false),
                    ActorId = table.Column<int>(nullable: true),
                    CareerPeriodId = table.Column<int>(nullable: true),
                    TimePeriodId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Events_Actors_ActorId",
                        column: x => x.ActorId,
                        principalTable: "Actors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Events_CareerPeriods_CareerPeriodId",
                        column: x => x.CareerPeriodId,
                        principalTable: "CareerPeriods",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CareerPeriods_ActorId",
                table: "CareerPeriods",
                column: "ActorId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomSections_ActorId",
                table: "CustomSections",
                column: "ActorId");

            migrationBuilder.CreateIndex(
                name: "IX_Evaluations_ActorId",
                table: "Evaluations",
                column: "ActorId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_ActorId",
                table: "Events",
                column: "ActorId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_CareerPeriodId",
                table: "Events",
                column: "CareerPeriodId");

            migrationBuilder.CreateIndex(
                name: "IX_Media_ActorId",
                table: "Media",
                column: "ActorId");

            migrationBuilder.CreateIndex(
                name: "IX_Media_Video_ActorId",
                table: "Media",
                column: "Video_ActorId");

            migrationBuilder.CreateIndex(
                name: "IX_Publications_ActorId",
                table: "Publications",
                column: "ActorId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomSections");

            migrationBuilder.DropTable(
                name: "Evaluations");

            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "Media");

            migrationBuilder.DropTable(
                name: "Publications");

            migrationBuilder.DropTable(
                name: "Scales");

            migrationBuilder.DropTable(
                name: "UploadedPhotos");

            migrationBuilder.DropTable(
                name: "CareerPeriods");

            migrationBuilder.DropTable(
                name: "Actors");
        }
    }
}
