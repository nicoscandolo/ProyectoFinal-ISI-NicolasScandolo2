using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebFinalProjectNicolasScandolo3.Models;
using WebFinalProjectNicolasScandolo3.Services;

namespace WebFinalProjectNicolasScandolo3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        private readonly TodoContext _context;
        private readonly IMailService mailService;
        public MailController(IMailService mailService, TodoContext context)
        {
            this.mailService = mailService;
            _context = context;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendMail(MailRequest request)
        {
            try
            {
                request.ToEmails = new List<string>
                {
                };

                if (request.tipo != "welcome")
                {

                    var usuariosProjecto = await _context.UsuariosProyectos.Where(b => b.IdProjecto == request.projectId).ToListAsync();



                    foreach (UsuariosProjecto usProyecto in usuariosProjecto)
                    {
                        Usuario usuario = await _context.Usuarios.Where(b => b.IdUsuario == usProyecto.IdUsuario).FirstOrDefaultAsync();

                        request.ToEmails.Add(usuario.Email);

                    }

                }
                else 
                {
                    Usuario usuario = await _context.Usuarios.Where(b => b.IdUsuario == request.userId).FirstOrDefaultAsync();
                    request.ToEmails.Add(usuario.Email);

                }

                await mailService.SendEmailAsync(request);
                return Ok();
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
