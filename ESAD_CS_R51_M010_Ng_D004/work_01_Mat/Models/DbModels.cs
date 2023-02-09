using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace work_01_Mat.Models
{
    public class Zoo
    {
        public Zoo()
        {
            this.Animals=new List<Animal>();
        }
        public int ZooId { get; set; }
        [Required,StringLength(50)]
        public string ZooName { get; set; }
        [Required, StringLength(250)]
        public string Location { get; set; }
        //nev
        public virtual ICollection<Animal> Animals { get; set; }
    }
    public class Animal
    {
        public int AnimalId { get; set; }
        [Required, StringLength(50)]
        public string AnimalName { get; set; }
        [Required, StringLength(50)]
        public string SpeciesName { get; set; }
        [Required, Column(TypeName ="date")]
        public DateTime  Introduced { get; set; }
        [Required, StringLength(50)]
        public string Gender { get; set; }
        [StringLength(200)]
        public string Picture { get; set; }
        [Required,ForeignKey("Zoo")]
        public int ZooId { get; set; }
        //nev
        public virtual Zoo Zoo { get; set; }

    }
    public class ZooDbContext : DbContext
    {
        public ZooDbContext(DbContextOptions<ZooDbContext> options):base(options)
        {

        }
        public DbSet<Zoo> Zoos { get; set;}
        public DbSet<Animal> Animals { get; set; }
    }
}
