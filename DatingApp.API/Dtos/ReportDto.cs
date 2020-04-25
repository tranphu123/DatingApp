using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class ReportDto
    {
        [Key]
        public string Po_No { get; set; }
        public string Model_No { get; set; }
        public string Model_Name_PO { get; set; }
        public string Model_Name_Part { get; set; }
        public string Part_No { get; set; }
        public string Article { get; set; }
        public int Order { get; set; }
        public int Qty { get; set; }
        public string CFD { get; set; }
        public string Cutting_Day { get; set; }
        public string Building { get; set; }

    }
}