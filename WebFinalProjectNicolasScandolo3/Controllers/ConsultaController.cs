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
        public async Task<ActionResult<IEnumerable<ConsultaDTO>>> GetConsultasByProject(int id)
        {
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<ComentarioConsulta, ComentarioConsultaDTO>();
            });
            IMapper iMapper = config.CreateMapper();

            var consultas = await _context.Consultas.Where(b => b.IdProyecto == id).ToListAsync();

            if (consultas == null)
            {
                return NotFound();
            }



            List<ConsultaDTO> ConsultaFinal = new List<ConsultaDTO>();

            foreach (Consulta conss in consultas)
            {
                ConsultaDTO ConsultaNew = new ConsultaDTO();
                Usuario userComentario = await _context.Usuarios.Where(b => b.IdUsuario == conss.IdUsuario).FirstOrDefaultAsync();
                ConsultaNew.pathUsuario = userComentario.ImagenUsuarioPath;
                ConsultaNew.IdUsuario = conss.IdUsuario;
                ConsultaNew.IdProyecto = conss.IdProyecto;
                ConsultaNew.IdConsulta = conss.IdConsulta;
                ConsultaNew.FechaCreacion = conss.FechaCreacion;
                ConsultaNew.FechaModificacion = conss.FechaModificacion;
                ConsultaNew.CantidadComentarios = conss.CantidadComentarios;
                ConsultaNew.Asunto = conss.Asunto;
                ConsultaNew.Descripcion = conss.Descripcion;
                ConsultaNew.usuario = conss.usuario;
                ConsultaNew.proyecto = conss.proyecto;
                ConsultaNew.Puntuacion = conss.Puntuacion;




                ConsultaFinal.Add(ConsultaNew);
                ConsultaNew = null;

            }



            return ConsultaFinal;
        }

        // PUT: api/Consulta/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}/{suma}")]
        public async Task<IActionResult> PutConsulta(int id,int suma, Consulta consulta)
        {
            if (id != consulta.IdConsulta)
            {
                return BadRequest();
            }

            if(suma == 1) { consulta.CantidadComentarios += 1;  }
            else { consulta.Puntuacion += 1; };


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
        public bool PostConsulta(Consulta consulta)
        {
            try
            {
                //buscar usuario
                var usuario = _context.Usuarios.Find(consulta.IdUsuario);
                //asunto vendria a ser el nombre
                consulta.Asunto = usuario.Nombre;
                consulta.CantidadComentarios = 0;

                _context.Consultas.Add(consulta);
                _context.SaveChanges();

                return true;

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }

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
