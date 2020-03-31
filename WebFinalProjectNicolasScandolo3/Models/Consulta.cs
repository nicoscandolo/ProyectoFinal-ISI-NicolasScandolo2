using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebFinalProjectNicolasScandolo3.Models
{
    public class Consulta
    {
        [Key]
        public int IdConsulta { get; set; }
        public string Asunto { get; set; }
        public string Descripcion { get; set; }
        public int Puntuacion { get; set; }
        public Proyecto proyecto { get; set; }
       
        public Usuario usuario { get; set; }
        public DateTime FechaCreacion { get; set; }

        public DateTime FechaModificacion { get; set; }



        private ICollection<ComentarioConsulta> comentariosConsulta;

        public ICollection<ComentarioConsulta> GetComentariosConsulta()
        {
            return comentariosConsulta;
        }

        public void SetComentariosConsulta(ICollection<ComentarioConsulta> value)
        {
            comentariosConsulta = value;
        }

        

        

    }
}
