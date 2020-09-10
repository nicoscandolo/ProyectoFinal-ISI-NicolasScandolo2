using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
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

            var h = await  _context.Documentos.ToListAsync();
            return await _context.Documentos.ToListAsync();
        }

        // GET: api/Documento/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Documento>>> GetDocumento(int id)
        {

            var documento = await _context.Documentos.Where(b => b.IdProyecto == id).ToListAsync();

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




        [HttpGet("Download/{id}")]
        public async Task<ActionResult> Download(int id)
        {
            var file = await _context.Documentos.FindAsync(id);

            if (file == null)
            {
                return NotFound();
            }

                //copio el archivo a memoria
                //Stream stream = new MemoryStream(file.File);
                //stream.Position = 0;

                return File(new MemoryStream(file.File), GetContentType(file.NombreDocumento), file.NombreDocumento);
            

        }

        private string GetContentType(string path)
        {
            var provider = new FileExtensionContentTypeProvider();
            string contentType;
            if (!provider.TryGetContentType(path, out contentType))
            {
                contentType = "application/octet-stream";
            }
            return contentType;
        }


        // POST: api/Documento/upload
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost("upload/{id}"), DisableRequestSizeLimit]
        public async Task<ActionResult<Documento>> PostDocupload(int id)
        {

            ////////////////////////////////////////////////////////////////
            
            Documento doc = new Documento();

            var file = Request.Form.Files[0];
            var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                var fileBytes = ms.ToArray();
                doc.File = fileBytes;
                // act on the Base64 data
            }


            doc.NombreDocumento = fileName;
            doc.Descripcion = fileName;
            doc.IdProyecto = id;

            _context.Documentos.Add(doc);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDocumento", new { id = doc.IdDocumento }, doc);

            ////////////////////////////////////////////////////

            //{
            //    try
            //    {
            //        var file = Request.Form.Files[0];
            //        var folderName = Path.Combine("Resources", "Images");
            //        var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            //        if (file.Length > 0)
            //        {
                        
            //            var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            //            var fullPath = Path.Combine(pathToSave, fileName);
            //            var dbPath = Path.Combine(folderName, fileName);

            //            using (var stream = new FileStream(fullPath, FileMode.Create))
            //            {
            //                file.CopyTo(stream);
            //            }

            //            return Ok(new { dbPath });
            //        }
            //        else
            //        {
            //            return BadRequest();
            //        }
            //    }
            //    catch (Exception ex)
            //    {
            //        return StatusCode(500, $"Internal server error: {ex}");
            //    }
            //}



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
