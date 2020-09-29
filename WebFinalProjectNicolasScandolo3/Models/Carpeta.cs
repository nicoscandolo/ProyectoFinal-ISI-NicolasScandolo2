using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.Design;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebFinalProjectNicolasScandolo3.Models
{
    public class Carpeta
    {
        [Key]
        public int IdCarpeta { get; set; }
  
        public string Nombre { get; set; }

        public int CarpetaPadre { get; set; }

        public DateTime FechaCreacion { get; set; }

        public DateTime FechaModificacion { get; set; }
      
        public int IdProjecto { get; set; }
        public Proyecto proyecto { get; set; }



     
        private ICollection<Documento> Documentos;

        public ICollection<Documento> GetDocumentos()
        {
            return Documentos;
        }

        public void SetDocumentos(ICollection<Documento> documentos)
        {
            Documentos = documentos;
        }



    }
}
