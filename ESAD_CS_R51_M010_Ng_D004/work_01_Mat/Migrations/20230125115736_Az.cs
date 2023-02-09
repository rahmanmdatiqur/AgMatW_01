using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace work_01_Mat.Migrations
{
    public partial class Az : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Zoos",
                columns: table => new
                {
                    ZooId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ZooName = table.Column<string>(maxLength: 50, nullable: false),
                    Location = table.Column<string>(maxLength: 250, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zoos", x => x.ZooId);
                });

            migrationBuilder.CreateTable(
                name: "Animals",
                columns: table => new
                {
                    AnimalId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AnimalName = table.Column<string>(maxLength: 50, nullable: false),
                    SpeciesName = table.Column<string>(maxLength: 50, nullable: false),
                    Introduced = table.Column<DateTime>(type: "date", nullable: false),
                    Gender = table.Column<string>(maxLength: 50, nullable: false),
                    Picture = table.Column<string>(maxLength: 200, nullable: true),
                    ZooId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Animals", x => x.AnimalId);
                    table.ForeignKey(
                        name: "FK_Animals_Zoos_ZooId",
                        column: x => x.ZooId,
                        principalTable: "Zoos",
                        principalColumn: "ZooId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Animals_ZooId",
                table: "Animals",
                column: "ZooId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Animals");

            migrationBuilder.DropTable(
                name: "Zoos");
        }
    }
}
