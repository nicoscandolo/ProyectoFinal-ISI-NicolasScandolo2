﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebFinalProjectNicolasScandolo3.Models;

namespace WebFinalProjectNicolasScandolo3.DTOs
{
    public class ComentarioConsultaDTO
    {
        [Key]
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int IdComentarioConsulta { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Descripcion { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string NombreUsuario { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int Puntuacion { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public DateTime FechaCreacion { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public DateTime FechaModificacion { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int IdConsulta { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public Consulta consulta { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public long IdUsuario { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public Usuario usuario { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string pathUsuario { get; set; }

    }
}
