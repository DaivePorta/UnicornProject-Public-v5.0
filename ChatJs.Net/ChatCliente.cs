using System;
namespace Nomade.ChatJs
{
   public class ChatCliente
    {
        public enum StatusType
        {
            Offline = 0,
            Online = 1
        }

        public ChatCliente()
        {
            this.Status = StatusType.Offline;
        }

        public int Id { get; set; }

        public string Pidm { get; set; }

        public string Usuario { get; set; }

        public string IP { get; set; }

        public string Navegador { get; set; }

        public string Foto { get; set; }

        public string Nombre { get; set; }

        public string Idioma { get; set; }

        public string Catalogo { get; set; }

        public string Sucursal { get; set; }

        public StatusType Status { get; set; }

        public DateTime LastActiveOn { get; set; }

        public int RoomId { get; set; }
    }
}
