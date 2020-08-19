using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebFinalProjectNicolasScandolo3.Models
{
    public class Documento
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        [Key]
        public int IdDocumento { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string NombreDocumento { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Descripcion { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int IdCarpeta { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public Carpeta carpeta { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int IdUsuario { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public Usuario usuario { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string PathDocumento { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public byte[] File { get; set; }




    }
}
