using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
using static GiftXchange.Helpers.Enums;

namespace GiftXchange.Migrations
{
  public partial class GroupMember_Create : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.CreateTable(
          name: "GroupMembers",
          columns: table => new
          {
            id = table.Column<int>(nullable: false)
                  .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            addedBy = table.Column<string>(nullable: true),
            ageGroup = table.Column<string>(maxLength: 128, nullable: true),
            dateAdded = table.Column<DateTime>(nullable: false, defaultValue: DateTime.Now),
            dateJoined = table.Column<DateTime>(nullable: false, defaultValue: DateTime.Now),
            familyName = table.Column<string>(maxLength: 128, nullable: true),
            groupid = table.Column<int>(nullable: false),
            memberId = table.Column<string>(nullable: false),
            role = table.Column<string>(maxLength: 128, nullable: true),
            status = table.Column<int>(nullable: false, defaultValue: (int)GroupMemberStatus.Active)
          },
                constraints: table =>
                {
                  table.PrimaryKey("PK_GroupMembers", x => x.id);
                  table.ForeignKey(
                      name: "FK_GroupMembers_Groups_groupid",
                      column: x => x.groupid,
                      principalTable: "Groups",
                      principalColumn: "id",
                      onDelete: ReferentialAction.NoAction);
                  table.ForeignKey(
                      name: "FK_GroupMembers_AspNetUsers_memberId",
                      column: x => x.memberId,
                      principalTable: "AspNetUsers",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.NoAction);
                });

      migrationBuilder.CreateIndex(
          name: "IX_GroupMembers_groupid",
          table: "GroupMembers",
          column: "groupid");

      migrationBuilder.CreateIndex(
          name: "IX_GroupMembers_memberId",
          table: "GroupMembers",
          column: "memberId");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropTable(
          name: "GroupMembers");
    }
  }
}
