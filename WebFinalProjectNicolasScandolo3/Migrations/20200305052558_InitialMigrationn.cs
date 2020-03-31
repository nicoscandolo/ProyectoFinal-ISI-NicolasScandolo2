using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebFinalProjectNicolasScandolo3.Migrations
{
    public partial class InitialMigrationn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Proyectos",
                columns: table => new
                {
                    IdProyecto = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(nullable: true),
                    Descripcion = table.Column<string>(nullable: true),
                    FechaCreacion = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Proyectos", x => x.IdProyecto);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    IdUsuario = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(nullable: true),
                    Apellido = table.Column<string>(nullable: true),
                    IsAdmin = table.Column<bool>(nullable: false),
                    FechaCreacion = table.Column<DateTime>(nullable: false),
                    ImagenUsuarioPath = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.IdUsuario);
                });

            migrationBuilder.CreateTable(
                name: "Carpetas",
                columns: table => new
                {
                    IdCarpeta = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(nullable: true),
                    Descripcion = table.Column<string>(nullable: true),
                    FechaCreacion = table.Column<DateTime>(nullable: false),
                    FechaModificacion = table.Column<DateTime>(nullable: false),
                    IdProjecto = table.Column<int>(nullable: false),
                    proyectoIdProyecto = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Carpetas", x => x.IdCarpeta);
                    table.ForeignKey(
                        name: "FK_Carpetas_Proyectos_proyectoIdProyecto",
                        column: x => x.proyectoIdProyecto,
                        principalTable: "Proyectos",
                        principalColumn: "IdProyecto",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Consultas",
                columns: table => new
                {
                    IdConsulta = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Asunto = table.Column<string>(nullable: true),
                    Descripcion = table.Column<string>(nullable: true),
                    Puntuacion = table.Column<int>(nullable: false),
                    proyectoIdProyecto = table.Column<int>(nullable: true),
                    usuarioIdUsuario = table.Column<long>(nullable: true),
                    FechaCreacion = table.Column<DateTime>(nullable: false),
                    FechaModificacion = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Consultas", x => x.IdConsulta);
                    table.ForeignKey(
                        name: "FK_Consultas_Proyectos_proyectoIdProyecto",
                        column: x => x.proyectoIdProyecto,
                        principalTable: "Proyectos",
                        principalColumn: "IdProyecto",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Consultas_Usuarios_usuarioIdUsuario",
                        column: x => x.usuarioIdUsuario,
                        principalTable: "Usuarios",
                        principalColumn: "IdUsuario",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UsuariosProyectos",
                columns: table => new
                {
                    IdUsuario = table.Column<string>(nullable: false),
                    UsuarioIdUsuario = table.Column<long>(nullable: true),
                    IdProjecto = table.Column<string>(nullable: true),
                    ProyectoIdProyecto = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsuariosProyectos", x => x.IdUsuario);
                    table.ForeignKey(
                        name: "FK_UsuariosProyectos_Proyectos_ProyectoIdProyecto",
                        column: x => x.ProyectoIdProyecto,
                        principalTable: "Proyectos",
                        principalColumn: "IdProyecto",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UsuariosProyectos_Usuarios_UsuarioIdUsuario",
                        column: x => x.UsuarioIdUsuario,
                        principalTable: "Usuarios",
                        principalColumn: "IdUsuario",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Documentos",
                columns: table => new
                {
                    IdDocumento = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NombreDocumento = table.Column<string>(nullable: true),
                    Descripcion = table.Column<string>(nullable: true),
                    IdCarpeta = table.Column<int>(nullable: false),
                    carpetaIdCarpeta = table.Column<int>(nullable: true),
                    IdUsuario = table.Column<int>(nullable: false),
                    usuarioIdUsuario = table.Column<long>(nullable: true),
                    PathDocumento = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Documentos", x => x.IdDocumento);
                    table.ForeignKey(
                        name: "FK_Documentos_Carpetas_carpetaIdCarpeta",
                        column: x => x.carpetaIdCarpeta,
                        principalTable: "Carpetas",
                        principalColumn: "IdCarpeta",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Documentos_Usuarios_usuarioIdUsuario",
                        column: x => x.usuarioIdUsuario,
                        principalTable: "Usuarios",
                        principalColumn: "IdUsuario",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ComentariosConsulta",
                columns: table => new
                {
                    IdComentarioConsulta = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descripcion = table.Column<string>(nullable: true),
                    Puntuacion = table.Column<int>(nullable: false),
                    FechaCreacion = table.Column<DateTime>(nullable: false),
                    FechaModificacion = table.Column<DateTime>(nullable: false),
                    IdConsulta = table.Column<int>(nullable: false),
                    consultaIdConsulta = table.Column<int>(nullable: true),
                    IdUsuario = table.Column<int>(nullable: false),
                    usuarioIdUsuario = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ComentariosConsulta", x => x.IdComentarioConsulta);
                    table.ForeignKey(
                        name: "FK_ComentariosConsulta_Consultas_consultaIdConsulta",
                        column: x => x.consultaIdConsulta,
                        principalTable: "Consultas",
                        principalColumn: "IdConsulta",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ComentariosConsulta_Usuarios_usuarioIdUsuario",
                        column: x => x.usuarioIdUsuario,
                        principalTable: "Usuarios",
                        principalColumn: "IdUsuario",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Carpetas_proyectoIdProyecto",
                table: "Carpetas",
                column: "proyectoIdProyecto");

            migrationBuilder.CreateIndex(
                name: "IX_ComentariosConsulta_consultaIdConsulta",
                table: "ComentariosConsulta",
                column: "consultaIdConsulta");

            migrationBuilder.CreateIndex(
                name: "IX_ComentariosConsulta_usuarioIdUsuario",
                table: "ComentariosConsulta",
                column: "usuarioIdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_Consultas_proyectoIdProyecto",
                table: "Consultas",
                column: "proyectoIdProyecto");

            migrationBuilder.CreateIndex(
                name: "IX_Consultas_usuarioIdUsuario",
                table: "Consultas",
                column: "usuarioIdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_Documentos_carpetaIdCarpeta",
                table: "Documentos",
                column: "carpetaIdCarpeta");

            migrationBuilder.CreateIndex(
                name: "IX_Documentos_usuarioIdUsuario",
                table: "Documentos",
                column: "usuarioIdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_UsuariosProyectos_ProyectoIdProyecto",
                table: "UsuariosProyectos",
                column: "ProyectoIdProyecto");

            migrationBuilder.CreateIndex(
                name: "IX_UsuariosProyectos_UsuarioIdUsuario",
                table: "UsuariosProyectos",
                column: "UsuarioIdUsuario");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ComentariosConsulta");

            migrationBuilder.DropTable(
                name: "Documentos");

            migrationBuilder.DropTable(
                name: "UsuariosProyectos");

            migrationBuilder.DropTable(
                name: "Consultas");

            migrationBuilder.DropTable(
                name: "Carpetas");

            migrationBuilder.DropTable(
                name: "Usuarios");

            migrationBuilder.DropTable(
                name: "Proyectos");
        }
    }
}
