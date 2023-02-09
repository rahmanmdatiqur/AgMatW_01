using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using work_01_Mat.Models;

namespace work_01_Mat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnimalsController : ControllerBase
    {
        private readonly ZooDbContext _context;
        private readonly IWebHostEnvironment env;

        public AnimalsController(ZooDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            this.env= env;
        }

        // GET: api/Animals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Animal>>> GetAnimals()
        {
            return await _context.Animals.ToListAsync();
        }

        // GET: api/Animals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Animal>> GetAnimal(int id)
        {
            var animal = await _context.Animals.FindAsync(id);

            if (animal == null)
            {
                return NotFound();
            }

            return animal;
        }

        // PUT: api/Animals/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnimal(int id, Animal animal)
        {
            if (id != animal.AnimalId)
            {
                return BadRequest();
            }

            _context.Entry(animal).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnimalExists(id))
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

        // POST: api/Animals
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Animal>> PostAnimal(Animal animal)
        {
            _context.Animals.Add(animal);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAnimal", new { id = animal.AnimalId }, animal);
        }
        [HttpPost("Uploads/{id}")]
        public async Task<ActionResult<ImagePathResponse>> PostImage(int id,IFormFile file)
        {
            var animal=await _context.Animals.FindAsync(id);
            if (animal == null)
            {
                return NotFound();
            }
            try
            {
                string ext=Path.GetExtension(file.FileName);
                string f = Guid.NewGuid() + ext;
                if (!Directory.Exists(env.WebRootPath + "\\Uploads\\"))
                {
                    Directory.CreateDirectory(env.WebRootPath + "\\Uploads\\");
                }
                using FileStream fileStream=System.IO.File.Create(env.WebRootPath+"\\Uploads\\"+f);
                file.CopyTo(fileStream);
                fileStream.Flush();
                animal.Picture = f;
                fileStream.Close();
                await _context.SaveChangesAsync();
                return new ImagePathResponse { ImagePath = f };
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        // DELETE: api/Animals/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Animal>> DeleteAnimal(int id)
        {
            var animal = await _context.Animals.FindAsync(id);
            if (animal == null)
            {
                return NotFound();
            }

            _context.Animals.Remove(animal);
            await _context.SaveChangesAsync();

            return animal;
        }

        private bool AnimalExists(int id)
        {
            return _context.Animals.Any(e => e.AnimalId == id);
        }
    }
}
