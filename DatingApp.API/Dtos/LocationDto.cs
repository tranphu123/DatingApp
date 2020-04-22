using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class LocationDto
    {
        [Key]
        public int Location_ID {get;set;}
        public string Location_name {get;set;}
    }
}