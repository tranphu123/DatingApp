using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Models
{
    public class Order_Part
    {
        [Key]
        public int ID { get; set; }
        public string Po_No { get; set; }
         public string Model_No { get; set; }   
        public string Model_Name { get; set; }   
        public string Part_No { get; set; }
        public int Order { get; set; }
        public int status { get; set; }

    }
}