﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Pkdd.Database;

namespace Pkdd.Database.Migrations
{
    [DbContext(typeof(PkddDbContext))]
    [Migration("20181107210406_FirstSuperMigration")]
    partial class FirstSuperMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.0-rtm-30799")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<int>("RoleId");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<int>("UserId");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<int>", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<int>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("Pkdd.Database.MetaInformation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("IsDeleted");

                    b.Property<int>("Version");

                    b.HasKey("Id");

                    b.ToTable("MetaInfos");
                });

            modelBuilder.Entity("Pkdd.Models.Persons.BaseBioBlock", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("IsDeleted");

                    b.Property<int>("PersonId");

                    b.HasKey("Id");

                    b.HasIndex("PersonId")
                        .IsUnique();

                    b.ToTable("MainBioBlocks");
                });

            modelBuilder.Entity("Pkdd.Models.Persons.ContentBlock", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("BaseBioBlockId");

                    b.Property<string>("Comment");

                    b.Property<string>("Content")
                        .IsRequired();

                    b.Property<int?>("ContentBlockId");

                    b.Property<bool>("IsDeleted");

                    b.Property<string>("Order");

                    b.Property<string>("Subtitle");

                    b.Property<string>("Tilte");

                    b.Property<int>("Type");

                    b.HasKey("Id");

                    b.HasIndex("BaseBioBlockId");

                    b.HasIndex("ContentBlockId");

                    b.ToTable("ContentBlocks");
                });

            modelBuilder.Entity("Pkdd.Models.Persons.Person", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Birthday");

                    b.Property<bool>("IsDeleted");

                    b.Property<bool>("IsPublished");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.Property<string>("PhotoUrl");

                    b.Property<string>("Position")
                        .HasMaxLength(500);

                    b.Property<int>("Priority");

                    b.Property<int>("Sex");

                    b.HasKey("Id");

                    b.ToTable("Persons");
                });

            modelBuilder.Entity("Pkdd.Models.Results.TestResult", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Comment");

                    b.Property<bool>("IsDeleted");

                    b.Property<bool>("LuscherComplete");

                    b.Property<bool>("MmpiComplete");

                    b.Property<int>("PersonId");

                    b.Property<bool>("PhysiognomyComplete");

                    b.Property<int>("PkddUserId");

                    b.HasKey("Id");

                    b.HasIndex("PersonId");

                    b.HasIndex("PkddUserId");

                    b.ToTable("TestResults");
                });

            modelBuilder.Entity("Pkdd.Models.Users.PkddUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AccessFailedCount");

                    b.Property<DateTime>("Birthdate");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("FullName");

                    b.Property<bool>("IsBanned");

                    b.Property<bool>("IsConfirmed");

                    b.Property<bool>("IsDeleted");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("Name");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("Pkdd.Models.Users.Roles.PkddRoleBase", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<bool>("IsDeleted");

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");

                    b.HasDiscriminator<string>("Discriminator").HasValue("PkddRoleBase");
                });

            modelBuilder.Entity("Pkdd.Models.Users.Roles.PkddRoleAdmin", b =>
                {
                    b.HasBaseType("Pkdd.Models.Users.Roles.PkddRoleBase");


                    b.ToTable("PkddRoleAdmin");

                    b.HasDiscriminator().HasValue("PkddRoleAdmin");
                });

            modelBuilder.Entity("Pkdd.Models.Users.Roles.PkddRoleExpert", b =>
                {
                    b.HasBaseType("Pkdd.Models.Users.Roles.PkddRoleBase");


                    b.ToTable("PkddRoleExpert");

                    b.HasDiscriminator().HasValue("PkddRoleExpert");
                });

            modelBuilder.Entity("Pkdd.Models.Users.Roles.PkddRoleTech", b =>
                {
                    b.HasBaseType("Pkdd.Models.Users.Roles.PkddRoleBase");


                    b.ToTable("PkddRoleTech");

                    b.HasDiscriminator().HasValue("PkddRoleTech");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.HasOne("Pkdd.Models.Users.Roles.PkddRoleBase")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.HasOne("Pkdd.Models.Users.PkddUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.HasOne("Pkdd.Models.Users.PkddUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<int>", b =>
                {
                    b.HasOne("Pkdd.Models.Users.Roles.PkddRoleBase")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Pkdd.Models.Users.PkddUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.HasOne("Pkdd.Models.Users.PkddUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Pkdd.Database.MetaInformation", b =>
                {
                    b.OwnsOne("Pkdd.Abstractions.TimeTrack", "TimeTrack", b1 =>
                        {
                            b1.Property<int>("MetaInformationId")
                                .ValueGeneratedOnAdd()
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.Property<DateTime>("Created");

                            b1.Property<DateTime>("Deleted");

                            b1.Property<DateTime>("Updated");

                            b1.ToTable("MetaInfos");

                            b1.HasOne("Pkdd.Database.MetaInformation")
                                .WithOne("TimeTrack")
                                .HasForeignKey("Pkdd.Abstractions.TimeTrack", "MetaInformationId")
                                .OnDelete(DeleteBehavior.Cascade);
                        });
                });

            modelBuilder.Entity("Pkdd.Models.Persons.BaseBioBlock", b =>
                {
                    b.HasOne("Pkdd.Models.Persons.Person", "Person")
                        .WithOne("BioBlock")
                        .HasForeignKey("Pkdd.Models.Persons.BaseBioBlock", "PersonId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.OwnsOne("Pkdd.Abstractions.TimeTrack", "TimeTrack", b1 =>
                        {
                            b1.Property<int>("BaseBioBlockId")
                                .ValueGeneratedOnAdd()
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.Property<DateTime>("Created");

                            b1.Property<DateTime>("Deleted");

                            b1.Property<DateTime>("Updated");

                            b1.ToTable("MainBioBlocks");

                            b1.HasOne("Pkdd.Models.Persons.BaseBioBlock")
                                .WithOne("TimeTrack")
                                .HasForeignKey("Pkdd.Abstractions.TimeTrack", "BaseBioBlockId")
                                .OnDelete(DeleteBehavior.Cascade);
                        });
                });

            modelBuilder.Entity("Pkdd.Models.Persons.ContentBlock", b =>
                {
                    b.HasOne("Pkdd.Models.Persons.BaseBioBlock")
                        .WithMany("ContentBlocks")
                        .HasForeignKey("BaseBioBlockId");

                    b.HasOne("Pkdd.Models.Persons.ContentBlock")
                        .WithMany("SubBlocks")
                        .HasForeignKey("ContentBlockId");

                    b.OwnsOne("Pkdd.Abstractions.TimeTrack", "TimeTrack", b1 =>
                        {
                            b1.Property<int>("ContentBlockId")
                                .ValueGeneratedOnAdd()
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.Property<DateTime>("Created");

                            b1.Property<DateTime>("Deleted");

                            b1.Property<DateTime>("Updated");

                            b1.ToTable("ContentBlocks");

                            b1.HasOne("Pkdd.Models.Persons.ContentBlock")
                                .WithOne("TimeTrack")
                                .HasForeignKey("Pkdd.Abstractions.TimeTrack", "ContentBlockId")
                                .OnDelete(DeleteBehavior.Cascade);
                        });
                });

            modelBuilder.Entity("Pkdd.Models.Persons.Person", b =>
                {
                    b.OwnsOne("Pkdd.Abstractions.TimeTrack", "TimeTrack", b1 =>
                        {
                            b1.Property<int>("PersonId")
                                .ValueGeneratedOnAdd()
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.Property<DateTime>("Created");

                            b1.Property<DateTime>("Deleted");

                            b1.Property<DateTime>("Updated");

                            b1.ToTable("Persons");

                            b1.HasOne("Pkdd.Models.Persons.Person")
                                .WithOne("TimeTrack")
                                .HasForeignKey("Pkdd.Abstractions.TimeTrack", "PersonId")
                                .OnDelete(DeleteBehavior.Cascade);
                        });
                });

            modelBuilder.Entity("Pkdd.Models.Results.TestResult", b =>
                {
                    b.HasOne("Pkdd.Models.Persons.Person", "Person")
                        .WithMany()
                        .HasForeignKey("PersonId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Pkdd.Models.Users.PkddUser", "PkddUser")
                        .WithMany()
                        .HasForeignKey("PkddUserId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.OwnsOne("Pkdd.Models.Results.LuscherResult", "Luscher", b1 =>
                        {
                            b1.Property<int>("TestResultId")
                                .ValueGeneratedOnAdd()
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.ToTable("TestResults");

                            b1.HasOne("Pkdd.Models.Results.TestResult")
                                .WithOne("Luscher")
                                .HasForeignKey("Pkdd.Models.Results.LuscherResult", "TestResultId")
                                .OnDelete(DeleteBehavior.Cascade);
                        });

                    b.OwnsOne("Pkdd.Models.Results.MmpiResult", "Mmpi", b1 =>
                        {
                            b1.Property<int>("TestResultId")
                                .ValueGeneratedOnAdd()
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.Property<int>("Depression");

                            b1.Property<int>("Hypochondriasis");

                            b1.Property<int>("Hypomania");

                            b1.Property<int>("Hysteria");

                            b1.Property<int>("Masculinity");

                            b1.Property<int>("Paranoia");

                            b1.Property<int>("Psychasthenia");

                            b1.Property<int>("Psychopathia");

                            b1.Property<int>("Schizophrenia");

                            b1.Property<int>("Sociality");

                            b1.ToTable("TestResults");

                            b1.HasOne("Pkdd.Models.Results.TestResult")
                                .WithOne("Mmpi")
                                .HasForeignKey("Pkdd.Models.Results.MmpiResult", "TestResultId")
                                .OnDelete(DeleteBehavior.Cascade);
                        });

                    b.OwnsOne("Pkdd.Models.Results.PhysiognomyResult", "Physiognomy", b1 =>
                        {
                            b1.Property<int>("TestResultId")
                                .ValueGeneratedOnAdd()
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.ToTable("TestResults");

                            b1.HasOne("Pkdd.Models.Results.TestResult")
                                .WithOne("Physiognomy")
                                .HasForeignKey("Pkdd.Models.Results.PhysiognomyResult", "TestResultId")
                                .OnDelete(DeleteBehavior.Cascade);
                        });

                    b.OwnsOne("Pkdd.Abstractions.TimeTrack", "TimeTrack", b1 =>
                        {
                            b1.Property<int>("TestResultId")
                                .ValueGeneratedOnAdd()
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.Property<DateTime>("Created");

                            b1.Property<DateTime>("Deleted");

                            b1.Property<DateTime>("Updated");

                            b1.ToTable("TestResults");

                            b1.HasOne("Pkdd.Models.Results.TestResult")
                                .WithOne("TimeTrack")
                                .HasForeignKey("Pkdd.Abstractions.TimeTrack", "TestResultId")
                                .OnDelete(DeleteBehavior.Cascade);
                        });
                });

            modelBuilder.Entity("Pkdd.Models.Users.PkddUser", b =>
                {
                    b.OwnsOne("Pkdd.Abstractions.TimeTrack", "TimeTrack", b1 =>
                        {
                            b1.Property<int>("PkddUserId")
                                .ValueGeneratedOnAdd()
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.Property<DateTime>("Created");

                            b1.Property<DateTime>("Deleted");

                            b1.Property<DateTime>("Updated");

                            b1.ToTable("AspNetUsers");

                            b1.HasOne("Pkdd.Models.Users.PkddUser")
                                .WithOne("TimeTrack")
                                .HasForeignKey("Pkdd.Abstractions.TimeTrack", "PkddUserId")
                                .OnDelete(DeleteBehavior.Cascade);
                        });
                });

            modelBuilder.Entity("Pkdd.Models.Users.Roles.PkddRoleBase", b =>
                {
                    b.OwnsOne("Pkdd.Abstractions.TimeTrack", "TimeTrack", b1 =>
                        {
                            b1.Property<int>("PkddRoleBaseId")
                                .ValueGeneratedOnAdd()
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.Property<DateTime>("Created");

                            b1.Property<DateTime>("Deleted");

                            b1.Property<DateTime>("Updated");

                            b1.ToTable("AspNetRoles");

                            b1.HasOne("Pkdd.Models.Users.Roles.PkddRoleBase")
                                .WithOne("TimeTrack")
                                .HasForeignKey("Pkdd.Abstractions.TimeTrack", "PkddRoleBaseId")
                                .OnDelete(DeleteBehavior.Cascade);
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
