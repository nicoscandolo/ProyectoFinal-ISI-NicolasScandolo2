using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
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
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        [Key]
        public long IdUsuario { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Nombre { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Password { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public bool IsAdmin { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public DateTime FechaCreacion { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ImagenUsuarioPath { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Email { get; set; }


        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
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
