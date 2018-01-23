using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace GiftXchange.Migrations
{
    public partial class List_ListItems_Created : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Lists",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    dateCreated = table.Column<DateTime>(nullable: false, defaultValue: DateTime.Now),
                    dateUpdated = table.Column<DateTime>(nullable: false, defaultValue: DateTime.Now),
                    guid = table.Column<string>(nullable: false, defaultValue: Guid.NewGuid().ToString()),
                    name = table.Column<string>(maxLength: 128, nullable: false),
                    ownerId = table.Column<string>(nullable: false),
                    priority = table.Column<int>(nullable: false, defaultValue: -1),
                    slug = table.Column<string>(maxLength: 128, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lists", x => x.id);
                    table.ForeignKey(
                        name: "FK_Lists_AspNetUsers_ownerId",
                        column: x => x.ownerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ListItems",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    color = table.Column<string>(maxLength: 128, nullable: true),
                    dateCreated = table.Column<DateTime>(nullable: false, defaultValue: DateTime.Now),
                    dateModified = table.Column<DateTime>(nullable: false, defaultValue: DateTime.Now),
                    guid = table.Column<string>(nullable: false, defaultValue: Guid.NewGuid().ToString()),
                    listid = table.Column<int>(nullable: false),
                    name = table.Column<string>(maxLength: 128, nullable: false),
                    notes = table.Column<string>(nullable: true),
                    priority = table.Column<int>(nullable: false, defaultValue: 0),
                    size = table.Column<string>(maxLength: 128, nullable: true),
                    url = table.Column<string>(maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListItems", x => x.id);
                    table.ForeignKey(
                        name: "FK_ListItems_Lists_listid",
                        column: x => x.listid,
                        principalTable: "Lists",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ListItems_listid",
                table: "ListItems",
                column: "listid");

            migrationBuilder.CreateIndex(
                name: "IX_Lists_ownerId",
                table: "Lists",
                column: "ownerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ListItems");

            migrationBuilder.DropTable(
                name: "Lists");
        }
    }
}
