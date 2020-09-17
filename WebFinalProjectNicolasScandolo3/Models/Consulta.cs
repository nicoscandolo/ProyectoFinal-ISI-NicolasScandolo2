﻿using Newtonsoft.Json;
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
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int IdConsulta { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Asunto { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Descripcion { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int Puntuacion { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public Proyecto proyecto { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public Usuario usuario { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public DateTime FechaCreacion { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public DateTime FechaModificacion { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public long IdUsuario { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int IdProyecto { get; set; }


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
