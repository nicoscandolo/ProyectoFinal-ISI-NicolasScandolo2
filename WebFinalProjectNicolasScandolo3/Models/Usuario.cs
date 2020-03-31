using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebFinalProjectNicolasScandolo3.Models
{
    public class Usuario
    {
        [Key]
        public long IdUsuario { get; set; }

        public string Nombre { get; set; }

        public string Apellido { get; set; }

        public bool IsAdmin { get; set; }

        public DateTime FechaCreacion { get; set; }

       
        public string ImagenUsuarioPath { get; set; }



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

        //[Required]
        //[Column(TypeName = "Consulta")]
        public ICollection<Consulta> GetConsultas()
        {
            return consultas;
        }

        //[Required]
        //[Column(TypeName = "Consulta")]
        public void SetConsultas(ICollection<Consulta> value)
        {
            consultas = value;
        }






        private ICollection<Documento> documento;

        public ICollection<Documento> GetDocumento()
        {
            return documento;
        }

        public void SetDocumento(ICollection<Documento> value)
        {
            documento = value;
        }
    }
}
