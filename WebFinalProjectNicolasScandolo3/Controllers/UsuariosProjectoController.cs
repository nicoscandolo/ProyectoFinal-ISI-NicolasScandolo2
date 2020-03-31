using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public async Task<ActionResult<UsuariosProjecto>> GetUsuariosProjecto(string id)
        {
            var usuariosProjecto = await _context.UsuariosProyectos.FindAsync(id);

            if (usuariosProjecto == null)
            {
                return NotFound();
            }

            return usuariosProjecto;
        }

        // PUT: api/UsuariosProjecto/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuariosProjecto(string id, UsuariosProjecto usuariosProjecto)
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
            }
            catch (DbUpdateException)
            {
                if (UsuariosProjectoExists(usuariosProjecto.IdUsuario))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUsuariosProjecto", new { id = usuariosProjecto.IdUsuario }, usuariosProjecto);
        }

        // DELETE: api/UsuariosProjecto/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UsuariosProjecto>> DeleteUsuariosProjecto(string id)
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

        private bool UsuariosProjectoExists(string id)
        {
            return _context.UsuariosProyectos.Any(e => e.IdUsuario == id);
        }
    }
}
