using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebFinalProjectNicolasScandolo3.DTOs;
using WebFinalProjectNicolasScandolo3.Models;

namespace WebFinalProjectNicolasScandolo3.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class RequestToProyectoController : ControllerBase
    {
        private readonly TodoContext _context;

        public RequestToProyectoController(TodoContext context)
        {
            _context = context;
        }


        // GET: api/Carpeta
        [HttpGet("{IdProyecto}")]
        public async Task<ActionResult<IEnumerable<RequestToProyecto>>> GetRequestToProyecto(int IdProyecto)
        {
            var requestToProyecto = await _context.RequestToProyecto.Where(b => b.IdProyecto == IdProyecto).ToListAsync();

            if (requestToProyecto == null)
            {
                return NotFound();
            }

            return requestToProyecto;

        }

        // GET: api/missolicitudes/IdUsuario
        [HttpGet("missolicitudes/{IdUsuario}")]
        public async Task<ActionResult<IEnumerable<Object>>> GetRequestsUsuario(int idUsuario)
        {
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<Proyecto, ProjectDTO>();
            });
            IMapper iMapper = config.CreateMapper();

            var requestToProyecto = await _context.RequestToProyecto.Where(b => b.IdUsuario == idUsuario).ToListAsync();

            if (requestToProyecto == null)
            {
                return NotFound();
            }

            List<ProjectDTO> Proyectos = new List<ProjectDTO>();


            foreach (RequestToProyecto usProyecto in requestToProyecto)
            {
                ProjectDTO projectDTO = new ProjectDTO();
                Proyecto proyecto = await _context.Proyectos.Where(b => b.IdProyecto == usProyecto.IdProyecto).FirstOrDefaultAsync();
                projectDTO = iMapper.Map<Proyecto, ProjectDTO>(proyecto);

                Proyectos.Add(projectDTO);
                projectDTO = null;

            }


            return Proyectos;
        }

        // POST: api/Carpeta
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<RequestToProyecto>> PostRequestToProyecto(RequestToProyecto requestToProyecto)
        {

            _context.RequestToProyecto.Add(requestToProyecto);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/UsuariosProjecto/5
        [HttpDelete("{IdProyecto}/{IdUsuario}")]
        public async Task<ActionResult<RequestToProyecto>> DeleteRequestToProyecto(int IdProyecto, int IdUsuario)
        {
            RequestToProyecto requestToProyecto = await _context.RequestToProyecto.Where(b => b.IdProyecto == IdProyecto && b.IdUsuario == IdUsuario).FirstOrDefaultAsync();
            if (requestToProyecto == null)
            {
                return NotFound();
            }

            _context.RequestToProyecto.Remove(requestToProyecto);
            await _context.SaveChangesAsync();

            return Ok();
        }

    }
}
