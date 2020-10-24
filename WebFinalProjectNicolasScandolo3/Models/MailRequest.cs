using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebFinalProjectNicolasScandolo3.Models
{
    public class MailRequest
    {
        public int? projectId { get; set; }
        public int? userId { get; set; }
        public List<string>? ToEmails { get; set; }
        public string? Name { get; set; }
        public string? Proyecto { get; set; }
        public int? idConsulta { get; set; }
        public string? Subject { get; set; }
        public string? Body { get; set; }
        public List<IFormFile>? Attachments { get; set; }
        public string tipo { get; set; }

        public string UserName { get; set; }




    }
}
