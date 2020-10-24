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


                switch (request.tipo)
                {
                    case "upload":

                        if (request.userId != null)
                        {
                            var usuarioUpload = await _context.Usuarios.Where(b => b.IdUsuario == request.userId).FirstOrDefaultAsync();
                            request.Name = usuarioUpload.Nombre;
                        }

                        if (request.projectId != null)
                        {
                            var proyectoUpload = await _context.Proyectos.Where(b => b.IdProyecto == request.projectId).FirstOrDefaultAsync();
                            request.Proyecto = proyectoUpload.Nombre;
                        }


                        var usuariosProjecto = await _context.UsuariosProyectos.Where(b => b.IdProjecto == request.projectId).ToListAsync();

                        foreach (UsuariosProjecto usProyecto in usuariosProjecto)
                        {
                            Usuario usuarioMail = await _context.Usuarios.Where(b => b.IdUsuario == usProyecto.IdUsuario).FirstOrDefaultAsync();

                            request.ToEmails.Add(usuarioMail.Email);
                        }
                        break;

                    case "consulta":

                        if (request.userId != null)
                        {
                            Usuario usuarioConsultas = await _context.Usuarios.Where(b => b.IdUsuario == request.userId).FirstOrDefaultAsync();
                            request.Name = usuarioConsultas.Nombre;
                        }

                        if (request.projectId != null)
                        {
                            var proyectoConsulta = await _context.Proyectos.Where(b => b.IdProyecto == request.projectId).FirstOrDefaultAsync();
                            request.Proyecto = proyectoConsulta.Nombre;
                        }


                        var usuariosProjectoConsulta = await _context.UsuariosProyectos.Where(b => b.IdProjecto == request.projectId).ToListAsync();


                        foreach (UsuariosProjecto usProyecto in usuariosProjectoConsulta)
                        {
                            Usuario usuarioConsultadeProyecto = await _context.Usuarios.Where(b => b.IdUsuario == usProyecto.IdUsuario).FirstOrDefaultAsync();

                            request.ToEmails.Add(usuarioConsultadeProyecto.Email);
                        }
                        break;

                    case "ComentarioConsulta":

                        if (request.userId != null)
                        {
                            Usuario usuarioComentario = await _context.Usuarios.Where(b => b.IdUsuario == request.userId).FirstOrDefaultAsync();
                            request.Name = usuarioComentario.Nombre;
                        }

                        if (request.projectId != null)
                        {
                            var proyectoComentario = await _context.Proyectos.Where(b => b.IdProyecto == request.projectId).FirstOrDefaultAsync();
                            request.Proyecto = proyectoComentario.Nombre;
                        }


                        var consulta = await _context.Consultas.Where(b => b.IdConsulta == request.idConsulta).FirstOrDefaultAsync();



                        Usuario usuarioConsulta = await _context.Usuarios.Where(b => b.IdUsuario == consulta.IdUsuario).FirstOrDefaultAsync();

                        request.ToEmails.Add(usuarioConsulta.Email);

                        break;

                    case "welcome":
                        Usuario usuario = await _context.Usuarios.Where(b => b.IdUsuario == request.userId).FirstOrDefaultAsync();
                        request.ToEmails.Add(usuario.Email);
                        break;

                    case "welcomeGroup":
                        usuario = await _context.Usuarios.Where(b => b.IdUsuario == request.userId).FirstOrDefaultAsync();
                        request.ToEmails.Add(usuario.Email);

                        var proyecto = await _context.Proyectos.Where(b => b.IdProyecto == request.projectId).FirstOrDefaultAsync();
                        request.Proyecto = proyecto.Nombre;



                        break;

                    case "SolicitudNueva":

                        Usuario usuarioSolicitud = await _context.Usuarios.Where(b => b.IdUsuario == request.userId).FirstOrDefaultAsync();
                        request.Name = usuarioSolicitud.Nombre;

                        var proyectoSolicitud = await _context.Proyectos.Where(b => b.IdProyecto == request.projectId).FirstOrDefaultAsync();
                        request.Proyecto = proyectoSolicitud.Nombre;



                        var usuariosProjectoSolicitud = await _context.UsuariosProyectos.Where(b => b.IdProjecto == request.projectId).ToListAsync();


                        if (request.tipo == "SolicitudNueva")
                            foreach (UsuariosProjecto usProyecto in usuariosProjectoSolicitud)
                            {
                                Usuario usuarioUnicoSolicitud = await _context.Usuarios.Where(b => b.IdUsuario == usProyecto.IdUsuario && usProyecto.IsAdmin == true).FirstOrDefaultAsync();

                                request.ToEmails.Add(usuarioUnicoSolicitud.Email);
                            }
                        break;
                    default:
                        // Default stuff
                        break;

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
