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
    public class RequestToProyectoController : ControllerBase
    {
        private readonly TodoContext _context;

        public RequestToProyectoController(TodoContext context)
        {
            _context = context;
        }


        // GET: api/Carpeta
        [HttpGet("{IdProyecto}")]
        public async Task<ActionResult<IEnumerable<RequestToProyecto>>> GetRequestToProyecto(int IdPRoyecto)
        {
            var requestToProyecto = await _context.RequestToProyecto.Where(b => b.IdProyecto == IdPRoyecto).ToListAsync();

            if (requestToProyecto == null)
            {
                return NotFound();
            }

            return requestToProyecto;

        }

        // POST: api/Carpeta
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<RequestToProyecto>> PostRequestToProyecto(RequestToProyecto requestToProyecto)
        {

            _context.RequestToProyecto.Add(requestToProyecto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCarpeta", new { id = requestToProyecto.IdRequestToProyecto }, requestToProyecto);
        }

    }
}
