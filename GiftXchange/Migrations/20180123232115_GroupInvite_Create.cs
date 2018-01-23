using GiftXchange.Helpers;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace GiftXchange.Migrations
{
    public partial class GroupInvite_Create : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GroupInvites",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    dateAccepted = table.Column<DateTime>(nullable: true),
                    dateDeclined = table.Column<DateTime>(nullable: true),
                    dateInvited = table.Column<DateTime>(nullable: false, defaultValue: DateTime.Now),
                    emailAddress = table.Column<string>(nullable: false),
                    groupid = table.Column<int>(nullable: false),
                    guid = table.Column<string>(nullable: false, defaultValue: Guid.NewGuid().ToString()),
                    invitedBy = table.Column<string>(nullable: false),
                    message = table.Column<string>(nullable: true),
                    status = table.Column<int>(nullable: false, defaultValue: (int)Enums.GroupInviteStatus.Pending),
                    userId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupInvites", x => x.id);
                    table.ForeignKey(
                        name: "FK_GroupInvites_Groups_groupid",
                        column: x => x.groupid,
                        principalTable: "Groups",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GroupInvites_groupid",
                table: "GroupInvites",
                column: "groupid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GroupInvites");
        }
    }
}
