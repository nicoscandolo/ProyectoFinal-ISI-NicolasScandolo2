﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebFinalProjectNicolasScandolo3.Models;

namespace WebFinalProjectNicolasScandolo3.Migrations
{
    [DbContext(typeof(TodoContext))]
    partial class TodoContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebFinalProjectNicolasScandolo3.Models.Carpeta", b =>
                {
                    b.Property<int>("IdCarpeta")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Descripcion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("FechaCreacion")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("FechaModificacion")
                        .HasColumnType("datetime2");

                    b.Property<int>("IdProjecto")
                        .HasColumnType("int");

                    b.Property<string>("Nombre")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("proyectoIdProyecto")
                        .HasColumnType("int");

                    b.HasKey("IdCarpeta");

                    b.HasIndex("proyectoIdProyecto");

                    b.ToTable("Carpetas");
                });

            modelBuilder.Entity("WebFinalProjectNicolasScandolo3.Models.ComentarioConsulta", b =>
                {
                    b.Property<int>("IdComentarioConsulta")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Descripcion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("FechaCreacion")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("FechaModificacion")
                        .HasColumnType("datetime2");

                    b.Property<int>("IdConsulta")
                        .HasColumnType("int");

                    b.Property<int>("IdUsuario")
                        .HasColumnType("int");

                    b.Property<int>("Puntuacion")
                        .HasColumnType("int");

                    b.Property<int?>("consultaIdConsulta")
                        .HasColumnType("int");

                    b.Property<long?>("usuarioIdUsuario")
                        .HasColumnType("bigint");

                    b.HasKey("IdComentarioConsulta");

                    b.HasIndex("consultaIdConsulta");

                    b.HasIndex("usuarioIdUsuario");

                    b.ToTable("ComentariosConsulta");
                });

            modelBuilder.Entity("WebFinalProjectNicolasScandolo3.Models.Consulta", b =>
                {
                    b.Property<int>("IdConsulta")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Asunto")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Descripcion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("FechaCreacion")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("FechaModificacion")
                        .HasColumnType("datetime2");

                    b.Property<int>("Puntuacion")
                        .HasColumnType("int");

                    b.Property<int?>("proyectoIdProyecto")
                        .HasColumnType("int");

                    b.Property<long?>("usuarioIdUsuario")
                        .HasColumnType("bigint");

                    b.HasKey("IdConsulta");

                    b.HasIndex("proyectoIdProyecto");

                    b.HasIndex("usuarioIdUsuario");

                    b.ToTable("Consultas");
                });

            modelBuilder.Entity("WebFinalProjectNicolasScandolo3.Models.Documento", b =>
                {
                    b.Property<int>("IdDocumento")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Descripcion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("IdCarpeta")
                        .HasColumnType("int");

                    b.Property<int>("IdUsuario")
                        .HasColumnType("int");

                    b.Property<string>("NombreDocumento")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PathDocumento")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("carpetaIdCarpeta")
                        .HasColumnType("int");

                    b.Property<long?>("usuarioIdUsuario")
                        .HasColumnType("bigint");

                    b.HasKey("IdDocumento");

                    b.HasIndex("carpetaIdCarpeta");

                    b.HasIndex("usuarioIdUsuario");

                    b.ToTable("Documentos");
                });

            modelBuilder.Entity("WebFinalProjectNicolasScandolo3.Models.Proyecto", b =>
                {
                    b.Property<int>("IdProyecto")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Descripcion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("FechaCreacion")
                        .HasColumnType("datetime2");

                    b.Property<string>("Nombre")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdProyecto");

                    b.ToTable("Proyectos");
                });

            modelBuilder.Entity("WebFinalProjectNicolasScandolo3.Models.Usuario", b =>
                {
                    b.Property<long>("IdUsuario")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Apellido")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("FechaCreacion")
                        .HasColumnType("datetime2");

                    b.Property<string>("ImagenUsuarioPath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsAdmin")
                        .HasColumnType("bit");

                    b.Property<string>("Nombre")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdUsuario");

                    b.ToTable("Usuarios");
                });

            modelBuilder.Entity("WebFinalProjectNicolasScandolo3.Models.UsuariosProjecto", b =>
                {
                    b.Property<string>("IdUsuario")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("IdProjecto")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ProyectoIdProyecto")
                        .HasColumnType("int");

                    b.Property<long?>("UsuarioIdUsuario")
                        .HasColumnType("bigint");

                    b.HasKey("IdUsuario");

                    b.HasIndex("ProyectoIdProyecto");

                    b.HasIndex("UsuarioIdUsuario");

                    b.ToTable("UsuariosProyectos");
                });

            modelBuilder.Entity("WebFinalProjectNicolasScandolo3.Models.Carpeta", b =>
                {
                    b.HasOne("WebFinalProjectNicolasScandolo3.Models.Proyecto", "proyecto")
                        .WithMany()
                        .HasForeignKey("proyectoIdProyecto");
                });

            modelBuilder.Entity("WebFinalProjectNicolasScandolo3.Models.ComentarioConsulta", b =>
                {
                    b.HasOne("WebFinalProjectNicolasScandolo3.Models.Consulta", "consulta")
                        .WithMany()
                        .HasForeignKey("consultaIdConsulta");

                    b.HasOne("WebFinalProjectNicolasScandolo3.Models.Usuario", "usuario")
                        .WithMany()
                        .HasForeignKey("usuarioIdUsuario");
                });

            modelBuilder.Entity("WebFinalProjectNicolasScandolo3.Models.Consulta", b =>
                {
                    b.HasOne("WebFinalProjectNicolasScandolo3.Models.Proyecto", "proyecto")
                        .WithMany()
                        .HasForeignKey("proyectoIdProyecto");

                    b.HasOne("WebFinalProjectNicolasScandolo3.Models.Usuario", "usuario")
                        .WithMany()
                        .HasForeignKey("usuarioIdUsuario");
                });

            modelBuilder.Entity("WebFinalProjectNicolasScandolo3.Models.Documento", b =>
                {
                    b.HasOne("WebFinalProjectNicolasScandolo3.Models.Carpeta", "carpeta")
                        .WithMany()
                        .HasForeignKey("carpetaIdCarpeta");

                    b.HasOne("WebFinalProjectNicolasScandolo3.Models.Usuario", "usuario")
                        .WithMany()
                        .HasForeignKey("usuarioIdUsuario");
                });

            modelBuilder.Entity("WebFinalProjectNicolasScandolo3.Models.UsuariosProjecto", b =>
                {
                    b.HasOne("WebFinalProjectNicolasScandolo3.Models.Proyecto", "Proyecto")
                        .WithMany()
                        .HasForeignKey("ProyectoIdProyecto");

                    b.HasOne("WebFinalProjectNicolasScandolo3.Models.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("UsuarioIdUsuario");
                });
#pragma warning restore 612, 618
        }
    }
}
