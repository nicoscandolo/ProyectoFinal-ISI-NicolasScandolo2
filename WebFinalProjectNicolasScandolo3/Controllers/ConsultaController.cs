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
    public class ConsultaController : ControllerBase
    {
        private readonly TodoContext _context;

        public ConsultaController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/Consulta
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Consulta>>> GetConsultas()
        {
            return await _context.Consultas.ToListAsync();
        }

        // GET: api/Consulta/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Consulta>>> GetConsultasByProject(int id)
        {
            var consultas = await _context.Consultas.Where(b => b.IdProyecto == id).ToListAsync();

            if (consultas == null)
            {
                return NotFound();
            }

            return consultas;
        }

        // PUT: api/Consulta/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConsulta(int id, Consulta consulta)
        {
            if (id != consulta.IdConsulta)
            {
                return BadRequest();
            }

            _context.Entry(consulta).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConsultaExists(id))
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

        // POST: api/Consulta
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Consulta>> PostConsulta(Consulta consulta)
        {
            //buscar usuario
            var usuario = await _context.Usuarios.FindAsync(consulta.IdUsuario);
            //asunto vendria a ser el nombre
            consulta.Asunto = usuario.Nombre;

            _context.Consultas.Add(consulta);
            await _context.SaveChangesAsync();  

            return CreatedAtAction("GetConsulta", new { id = consulta.IdConsulta }, consulta);
        }

        // DELETE: api/Consulta/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Consulta>> DeleteConsulta(int id)
        {
            var consulta = await _context.Consultas.FindAsync(id);
            if (consulta == null)
            {
                return NotFound();
            }

            _context.Consultas.Remove(consulta);
            await _context.SaveChangesAsync();

            return consulta;
        }

        private bool ConsultaExists(int id)
        {
            return _context.Consultas.Any(e => e.IdConsulta == id);
        }
    }
}
