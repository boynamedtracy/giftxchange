using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace GiftXchange.Migrations
{
    public partial class GXUser_GoogleIdandTwitterID_Add : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "googleId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "twitterId",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "googleId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "twitterId",
                table: "AspNetUsers");
        }
    }
}
