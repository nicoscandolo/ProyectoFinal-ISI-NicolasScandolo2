using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebFinalProjectNicolasScandolo3.Models
{
    public class ComentarioConsulta
    {
        [Key]
        public int IdComentarioConsulta { get; set; }
        public string Descripcion { get; set; }
        public int Puntuacion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime FechaModificacion { get; set; }
        public int IdConsulta { get; set; }
        public Consulta consulta { get; set; }
        public int IdUsuario { get; set; }
        public Usuario usuario { get; set; }



    }
}
