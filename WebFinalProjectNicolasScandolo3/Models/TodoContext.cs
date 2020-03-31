using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebFinalProjectNicolasScandolo3.Models
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options) { }
        
        

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Carpeta> Carpetas { get; set; }
        public DbSet<ComentarioConsulta> ComentariosConsulta { get; set; }
        public DbSet<Consulta> Consultas { get; set; }
        public DbSet<Documento> Documentos { get; set; }
        public DbSet<Proyecto> Proyectos { get; set; }
        public DbSet<UsuariosProjecto> UsuariosProyectos { get; set; }



    }
}
