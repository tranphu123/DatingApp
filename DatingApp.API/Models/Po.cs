using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Models
{
    public class Po
    {
        [Key]
        public int ID { get; set; }
        public string PO_No { get; set; }
        public string No_Line { get; set; } 
        public string Model { get; set; }   
        public string Model_Name { get; set; }   
        public string Article { get; set; }
        public int Qty { get; set; }
        public string CFD { get; set; }
        public string Cutting_Day { get; set; }   
        public string Building { get; set; }
        public byte Status { get; set; }
    }
}