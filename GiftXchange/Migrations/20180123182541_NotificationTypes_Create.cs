using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace GiftXchange.Migrations
{
    public partial class NotificationTypes_Create : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NotificationTypes",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    createdById = table.Column<string>(nullable: true),
                    dateCreated = table.Column<DateTime>(nullable: false),
                    name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotificationTypes", x => x.id);
                    table.ForeignKey(
                        name: "FK_NotificationTypes_AspNetUsers_createdById",
                        column: x => x.createdById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NotificationTypes_createdById",
                table: "NotificationTypes",
                column: "createdById");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NotificationTypes");
        }
    }
}
