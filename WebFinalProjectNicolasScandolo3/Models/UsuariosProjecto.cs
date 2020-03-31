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
        public string IdUsuario { get; set; }
        public Usuario Usuario { get; set; }
        public string IdProjecto { get; set; }
        public Proyecto Proyecto { get; set; }


    }
}
