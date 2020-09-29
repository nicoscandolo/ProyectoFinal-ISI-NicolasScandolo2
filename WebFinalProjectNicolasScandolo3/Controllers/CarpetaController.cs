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
    public class CarpetaController : ControllerBase
    {
        private readonly TodoContext _context;

        public CarpetaController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/Carpeta
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Carpeta>>> GetCarpetas()
        {
            return await _context.Carpetas.ToListAsync();
        }

        // GET: api/Carpeta/5
        [HttpGet("{id}/{idCarp}")]
        public async Task<ActionResult<IEnumerable<Carpeta>>> GetCarpeta(int id, int idCarp)
        {
            var carpetas = await _context.Carpetas.Where(b => b.IdProjecto == id && b.CarpetaPadre  == idCarp).ToListAsync();

            if (carpetas == null)
            {
                return NotFound();
            }

            return carpetas;
        }

        // PUT: api/Carpeta/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCarpeta(int id, Carpeta carpeta)
        {
            if (id != carpeta.IdCarpeta)
            {
                return BadRequest();
            }

            _context.Entry(carpeta).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarpetaExists(id))
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

        // POST: api/Carpeta
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Carpeta>> PostCarpeta(Carpeta carpeta)
        {
            _context.Carpetas.Add(carpeta);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCarpeta", new { id = carpeta.IdCarpeta }, carpeta);
        }

        // DELETE: api/Carpeta/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Carpeta>> DeleteCarpeta(int id)
        {
            var carpeta = await _context.Carpetas.FindAsync(id);
            if (carpeta == null)
            {
                return NotFound();
            }

            _context.Carpetas.Remove(carpeta);
            await _context.SaveChangesAsync();

            return carpeta;
        }

        private bool CarpetaExists(int id)
        {
            return _context.Carpetas.Any(e => e.IdCarpeta == id);
        }
    }
}
