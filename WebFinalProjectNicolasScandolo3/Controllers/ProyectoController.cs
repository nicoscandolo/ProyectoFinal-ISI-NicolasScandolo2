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
    public class ProyectoController : ControllerBase
    {
        private readonly TodoContext _context;

        public ProyectoController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/Proyecto
        // metodo para buscar todos los proyectos pero sin los proyectos que el usuario ya esta adherido
        [HttpGet("todos/{idUsuario}")]
        public async Task<ActionResult<IEnumerable<Proyecto>>> GetProyectos(int idUsuario)
        {
            var TodoslosProyectos = await _context.Proyectos.ToListAsync();
            var requestToProyectos = await _context.RequestToProyecto.Where(b => b.IdUsuario == idUsuario).ToListAsync();
            var usuarioProjectos = await _context.UsuariosProyectos.Where(b => b.IdUsuario == idUsuario).ToListAsync();

            if (TodoslosProyectos == null)
            {
                return NotFound();
            }

            



            foreach (RequestToProyecto requestToSearch in requestToProyectos)
            {
                var request  = TodoslosProyectos.Where(b => b.IdProyecto == requestToSearch.IdProyecto).FirstOrDefault();
                if ( request != null) { TodoslosProyectos.Remove(TodoslosProyectos.Where(b => b.IdProyecto == requestToSearch.IdProyecto).FirstOrDefault()); }

            }

            foreach (UsuariosProjecto usuarioProjectoToSearch in usuarioProjectos)
            {
                var usuarioProjecto = TodoslosProyectos.Where(b => b.IdProyecto == usuarioProjectoToSearch.IdProjecto).FirstOrDefault();
                if (usuarioProjecto != null) { TodoslosProyectos.Remove(TodoslosProyectos.Where(b => b.IdProyecto == usuarioProjectoToSearch.IdProjecto).FirstOrDefault()); }

            }

            return TodoslosProyectos;
        }

        // GET: api/Proyecto/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Proyecto>> GetProyecto(int id)
        {
            var proyecto = await _context.Proyectos.FindAsync(id);

            if (proyecto == null)
            {
                return NotFound();
            }

            return proyecto;
        }

        // GET: api/Proyecto/5
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Proyecto>>> GetProyectos()
        {
            var proyecto = await _context.Proyectos.ToListAsync();

            if (proyecto == null)
            {
                return NotFound();
            }

            return proyecto;
        }

        // PUT: api/Proyecto/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProyecto(int id, Proyecto proyecto)
        {
            if (id != proyecto.IdProyecto)
            {
                return BadRequest();
            }

            _context.Entry(proyecto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProyectoExists(id))
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

        // POST: api/Proyecto
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost("{idUs}")]
        public async Task<ActionResult<Proyecto>> PostProyecto(int idUs,Proyecto proyecto)
        {
            //save project
            proyecto.FechaCreacion = DateTime.Now;
            _context.Proyectos.Add(proyecto);
            await _context.SaveChangesAsync();

            //get project saved to save in usuarioPorjects tables
            var Projecto = await _context.Proyectos.Where(b => b.FechaCreacion == proyecto.FechaCreacion).FirstAsync();

            if (Projecto == null)
            {
                return NotFound();
            }

            UsuariosProjecto usuarioProjecto = new UsuariosProjecto()
            {
                IdProjecto = Projecto.IdProyecto,
                IdUsuario = idUs,
                IsAdmin = true,


            };
            _context.UsuariosProyectos.Add(usuarioProjecto);
            await _context.SaveChangesAsync();


            return CreatedAtAction("GetProyecto", new { id = proyecto.IdProyecto }, proyecto);
        }

        // DELETE: api/Proyecto/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Proyecto>> DeleteProyecto(int id)
        {
            var proyecto = await _context.Proyectos.FindAsync(id);
            if (proyecto == null)
            {
                return NotFound();
            }

            _context.Proyectos.Remove(proyecto);
            await _context.SaveChangesAsync();

            return proyecto;
        }

        private bool ProyectoExists(int id)
        {
            return _context.Proyectos.Any(e => e.IdProyecto == id);
        }
    }
}
