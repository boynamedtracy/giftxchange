using GiftXchange.Helpers;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace GiftXchange.Migrations
{
    public partial class Exchange_Create : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Exchanges",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    category = table.Column<int>(nullable: false, defaultValue: (int)Enums.ExchangeCategory.NotSet),
                    createdBy = table.Column<string>(nullable: true),
                    dateCreated = table.Column<DateTime>(nullable: false, defaultValue: DateTime.Now),
                    description = table.Column<string>(nullable: true),
                    groupId = table.Column<int>(nullable: false),
                    memberFilter = table.Column<string>(nullable: true),
                    name = table.Column<string>(maxLength: 128, nullable: false),
                    otherCategory = table.Column<string>(maxLength: 128, nullable: true),
                    type = table.Column<int>(nullable: false, defaultValue: (int)Enums.ExchangeType.Yearly)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exchanges", x => x.id);
                    table.ForeignKey(
                        name: "FK_Exchanges_Groups_groupId",
                        column: x => x.groupId,
                        principalTable: "Groups",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Exchanges_groupId",
                table: "Exchanges",
                column: "groupId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Exchanges");
        }
    }
}
