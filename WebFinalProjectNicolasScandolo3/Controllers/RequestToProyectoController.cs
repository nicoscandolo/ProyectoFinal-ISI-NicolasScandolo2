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
    public class RequestToProyectoController: ControllerBase
    {
        private readonly TodoContext _context;

        public RequestToProyectoController(TodoContext context)
        {
            _context = context;
        }


        // GET: api/Carpeta
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RequestToProyecto>>> GetCarpetas()
        {
            return await _context.RequestToProyecto.ToListAsync();
        }

        public async Task<ActionResult<RequestToProyecto>> PostRequestToProyecto(RequestToProyecto requestToProyecto)
        {

            _context.RequestToProyecto.Add(requestToProyecto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCarpeta", new { id = requestToProyecto.IdRequestToProyecto }, requestToProyecto);
        }

    }
}
