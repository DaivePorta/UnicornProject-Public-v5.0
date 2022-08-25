
namespace Nomade.Efact.Models
{
    public class ResponseEfact
    {
        public string Message { get; set; }
        public string Code { get; set; }
        public string Ticket { get; set; }
        public object[] Warnings { get; set; }
    }
}
