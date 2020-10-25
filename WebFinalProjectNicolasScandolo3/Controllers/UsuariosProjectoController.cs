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
    public class UsuariosProjectoController : ControllerBase
    {
        private readonly TodoContext _context;
        public UsuariosProjectoController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/UsuariosProjecto
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsuariosProjecto>>> GetUsuariosProyectos()
        {
            return await _context.UsuariosProyectos.ToListAsync();
        }

        // GET: api/UsuariosProjecto/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<object>>> GetUsuariosProjecto(int id)
        {
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<Proyecto, ProjectDTO>();
            });
            IMapper iMapper = config.CreateMapper();

            var usuariosProjecto = await _context.UsuariosProyectos.Where(b => b.IdUsuario == id).ToListAsync();

            if (usuariosProjecto == null)
            {
                return NotFound();
            }

            List<ProjectDTO> Proyectos= new List<ProjectDTO>();
            

            foreach (UsuariosProjecto usProyecto in usuariosProjecto)
            {
                ProjectDTO projectDTO = new ProjectDTO();
                Proyecto proyecto =  await _context.Proyectos.Where(b => b.IdProyecto == usProyecto.IdProjecto).FirstOrDefaultAsync();
                projectDTO = iMapper.Map<Proyecto, ProjectDTO>(proyecto);
                
                Proyectos.Add(projectDTO);
                projectDTO = null;
                
            }


            return Proyectos;
        }




        // GET: api/UsuariosProjecto/users/2
        [HttpGet("users/{idProyecto}")]
        public async Task<ActionResult<IEnumerable<object>>> GetUsuarioProjecto(int idProyecto)
        {

            var usuariosProjecto = await _context.UsuariosProyectos.Where(b => b.IdProjecto == idProyecto).ToListAsync();

            if (usuariosProjecto == null)
            {
                return NotFound();
            };


            List<Usuario> Usuarios = new List<Usuario>();


            foreach (UsuariosProjecto usProyecto in usuariosProjecto)
            {
                Usuario usu = await _context.Usuarios.Where(b => b.IdUsuario == usProyecto.IdUsuario).FirstOrDefaultAsync();
                Usuarios.Add(usu);
                
            }

            return Usuarios;
        }




        // GET: api/UsuariosProjecto/5/2
        [HttpGet("{idProyecto}/{idUsuario}")]
        public async Task<ActionResult<IEnumerable<object>>> GetUsuarioProjecto(int idProyecto, int idUsuario)
        {

            var usuarioProjecto = await _context.UsuariosProyectos.Where(b => b.IdUsuario == idUsuario && b.IdProjecto == idProyecto).ToListAsync();

            if (usuarioProjecto == null)
            {
                return NotFound();
            };

            return usuarioProjecto;
        }

        // PUT: api/UsuariosProjecto/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuariosProjecto(int id, UsuariosProjecto usuariosProjecto)
        {
            if (id != usuariosProjecto.IdUsuario)
            {
                return BadRequest();
            }

            _context.Entry(usuariosProjecto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuariosProjectoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/UsuariosProjecto
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<UsuariosProjecto>> PostUsuariosProjecto(UsuariosProjecto usuariosProjecto)
        {
            _context.UsuariosProyectos.Add(usuariosProjecto);
            try
            {
                await _context.SaveChangesAsync();

                RequestToProyecto requestToProyecto = await _context.RequestToProyecto.Where(b => b.IdProyecto == usuariosProjecto.IdProjecto && b.IdUsuario == usuariosProjecto.IdUsuario).FirstOrDefaultAsync();

                if (usuariosProjecto == null)
                {
                    return CreatedAtAction("GetUsuariosProjecto", new { id = usuariosProjecto.IdUsuario }, usuariosProjecto);
                }

                _context.RequestToProyecto.Remove(requestToProyecto);

                await _context.SaveChangesAsync();
            }
            catch
            {
                    return Conflict("Se agrego bien pero no se elimino la request porque no habia");
                            
            }

            return Ok();
        }

        // DELETE: api/UsuariosProjecto/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UsuariosProjecto>> DeleteUsuariosProjecto(int id)
        {
            var usuariosProjecto = await _context.UsuariosProyectos.FindAsync(id);
            if (usuariosProjecto == null)
            {
                return NotFound();
            }

            _context.UsuariosProyectos.Remove(usuariosProjecto);
            await _context.SaveChangesAsync();

            return usuariosProjecto;
        }

        private bool UsuariosProjectoExists(int id)
        {
            return _context.UsuariosProyectos.Any(e => e.IdUsuario == id);
        }
    }
}
