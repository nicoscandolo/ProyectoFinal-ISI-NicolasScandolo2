﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebFinalProjectNicolasScandolo3.Models;

namespace WebFinalProjectNicolasScandolo3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentoController : ControllerBase
    {
        private readonly TodoContext _context;

        public DocumentoController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/Documento
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Documento>>> GetDocumentos()
        {
            return await _context.Documentos.ToListAsync();
        }

        // GET: api/Documento/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Documento>> GetDocumento(int id)
        {
            var documento = await _context.Documentos.FindAsync(id);

            if (documento == null)
            {
                return NotFound();
            }

            return documento;
        }

        // PUT: api/Documento/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDocumento(int id, Documento documento)
        {
            if (id != documento.IdDocumento)
            {
                return BadRequest();
            }

            _context.Entry(documento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DocumentoExists(id))
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

        // POST: api/Documento
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Documento>> PostDocumento(Documento documento)
        {
            _context.Documentos.Add(documento);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDocumento", new { id = documento.IdDocumento }, documento);
        }

        // POST: api/Documento/upload
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost("upload"), DisableRequestSizeLimit]
        public ActionResult<Documento> PostDocupload()
        {

            ////////////////////////////////////////////////////////////////
            {
                try
                {
                    var file = Request.Form.Files[0];
                    var folderName = Path.Combine("Resources", "Images");
                    var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                    if (file.Length > 0)
                    {
                        
                        var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                        var fullPath = Path.Combine(pathToSave, fileName);
                        var dbPath = Path.Combine(folderName, fileName);

                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }

                        return Ok(new { dbPath });
                    }
                    else
                    {
                        return BadRequest();
                    }
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"Internal server error: {ex}");
                }
            }



            /////////////////////////////////////////////////////////////

            //_context.Documentos.Add(documento);
            //await _context.SaveChangesAsync();

           // return new Documento();
        }

        // DELETE: api/Documento/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Documento>> DeleteDocumento(int id)
        {
            var documento = await _context.Documentos.FindAsync(id);
            if (documento == null)
            {
                return NotFound();
            }

            _context.Documentos.Remove(documento);
            await _context.SaveChangesAsync();

            return documento;
        }

        private bool DocumentoExists(int id)
        {
            return _context.Documentos.Any(e => e.IdDocumento == id);
        }
    }
}
