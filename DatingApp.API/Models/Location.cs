using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Models
{
    public class Location
    {
        [Key]
        public int Location_ID {get;set;}
        public string Location_name {get;set;}
    }
}