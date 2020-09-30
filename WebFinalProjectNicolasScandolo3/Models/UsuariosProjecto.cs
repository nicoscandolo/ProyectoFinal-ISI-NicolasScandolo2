using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebFinalProjectNicolasScandolo3.Models
{
    public class UsuariosProjecto
    {
        [Key]
        public int IdUsuarioProyectos { get; set; }
        public int IdUsuario { get; set; }
        public Usuario Usuario { get; set; }
        public int IdProjecto { get; set; }
        public bool IsAdmin { get; set; }
        public Proyecto Proyecto { get; set; }


    }
}
