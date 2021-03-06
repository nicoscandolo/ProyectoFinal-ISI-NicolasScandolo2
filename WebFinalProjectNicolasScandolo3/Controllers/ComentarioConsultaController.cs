﻿using System;
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
    public class ComentarioConsultaController : ControllerBase
    {
        private readonly TodoContext _context;

        public ComentarioConsultaController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/ComentarioConsulta
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ComentarioConsulta>>> GetComentariosConsulta()
        {
            return await _context.ComentariosConsulta.ToListAsync();
        }

        // GET: api/ComentarioConsulta/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ComentarioConsultaDTO>>> GetComentarioConsulta(int id)
        {
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<ComentarioConsulta, ComentarioConsultaDTO>();
            });
            IMapper iMapper = config.CreateMapper();

            var comentariosConsulta = await _context.ComentariosConsulta.Where(b => b.IdConsulta == id).ToListAsync();

            if (comentariosConsulta == null)
            {
                return NotFound();
            }

            List<ComentarioConsultaDTO> comentariosConsultaFinal = new List<ComentarioConsultaDTO>();

            foreach (ComentarioConsulta comConsulta in comentariosConsulta)
            {
                ComentarioConsultaDTO comentConsultaNew = new ComentarioConsultaDTO();
                Usuario userComentario = await _context.Usuarios.Where(b => b.IdUsuario == comConsulta.IdUsuario).FirstOrDefaultAsync();
                comentConsultaNew = iMapper.Map<ComentarioConsulta, ComentarioConsultaDTO>(comConsulta);
                comentConsultaNew.pathUsuario = userComentario.ImagenUsuarioPath;
                comentariosConsultaFinal.Add(comentConsultaNew);
                comentConsultaNew = null;

            }

            return comentariosConsultaFinal;
        }

        // PUT: api/ComentarioConsulta/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComentarioConsulta(int id, ComentarioConsulta comentarioConsulta)
        {
            if (id != comentarioConsulta.IdComentarioConsulta)
            {
                return BadRequest();
            }

            _context.Entry(comentarioConsulta).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ComentarioConsultaExists(id))
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

        // POST: api/ComentarioConsulta
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<ComentarioConsulta>> PostComentarioConsulta(ComentarioConsulta comentarioConsulta)
        {
            //buscar usuario
            var usuario = await _context.Usuarios.FindAsync(comentarioConsulta.IdUsuario);
            //asunto vendria a ser el nombre
            comentarioConsulta.NombreUsuario = usuario.Nombre;

            _context.ComentariosConsulta.Add(comentarioConsulta);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetComentarioConsulta", new { id = comentarioConsulta.IdComentarioConsulta }, comentarioConsulta);
        }

        // DELETE: api/ComentarioConsulta/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ComentarioConsulta>> DeleteComentarioConsulta(int id)
        {
            var comentarioConsulta = await _context.ComentariosConsulta.FindAsync(id);
            if (comentarioConsulta == null)
            {
                return NotFound();
            }

            _context.ComentariosConsulta.Remove(comentarioConsulta);
            await _context.SaveChangesAsync();

            return comentarioConsulta;
        }

        private bool ComentarioConsultaExists(int id)
        {
            return _context.ComentariosConsulta.Any(e => e.IdComentarioConsulta == id);
        }
    }
}
