using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebFinalProjectNicolasScandolo3.Models
{
    public class Documento
    {
        [Key]
        public int IdDocumento { get; set; }
        public string NombreDocumento { get; set; }
        public string Descripcion { get; set; }
        public int IdCarpeta { get; set; }
        public Carpeta carpeta { get; set; }
        public int IdUsuario { get; set; }
        public Usuario usuario { get; set; }
        public string PathDocumento { get; set; }
        public byte[] File { get; set; }



    }
}
