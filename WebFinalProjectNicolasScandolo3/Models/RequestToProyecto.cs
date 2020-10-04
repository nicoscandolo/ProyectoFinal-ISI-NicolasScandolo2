using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.Design;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace WebFinalProjectNicolasScandolo3.Models
{
    public class RequestToProyecto
    {
        [Key]
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int IdRequestToProyecto { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int IdProyecto { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int IdUsuario { get; set; }

    }
}
