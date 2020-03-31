using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebFinalProjectNicolasScandolo3.Models
{
    public class Proyecto
    {
        [Key]
        public int IdProyecto { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaCreacion { get; set; }

        private ICollection<UsuariosProjecto> usuariosProjectos;

        public ICollection<UsuariosProjecto> GetUsuariosProjectos()
        {
            return usuariosProjectos;
        }

        public void SetUsuariosProjectos(ICollection<UsuariosProjecto> value)
        {
            usuariosProjectos = value;
        }

        private ICollection<Consulta> consultas;

        public ICollection<Consulta> GetConsultas()
        {
            return consultas;
        }

        public void SetConsultas(ICollection<Consulta> value)
        {
            consultas = value;
        }






        private ICollection<Carpeta> carpetas;
        public ICollection<Carpeta> GetCarpetas()
        {
            return carpetas;
        }

        public void SetCarpetas(ICollection<Carpeta> value)
        {
            carpetas = value;
        }






        private ICollection<Documento> Documentos;
        public  ICollection<Documento> GetDocumentos()
        {
            return Documentos;
        }

        public void SetDocumentos(ICollection<Documento> documentos)
        {
            Documentos = documentos;
        }



    }
}
