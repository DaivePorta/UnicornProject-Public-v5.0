using System;

namespace Nomade.ChatJs
{
    public class ChatMensaje
    {
        /// <summary>
        /// Usuario que envia el mensaje
        /// </summary>
        public ChatCliente UserFrom { get; set; }

        /// <summary>
        /// Usuario que recibe el mensaje
        /// </summary>
        public ChatCliente UserTo { get; set; }

        /// <summary>
        /// Mensaje timestamp
        /// </summary>
        public DateTime Timestamp { get; set; }

        /// <summary>
        /// Texto enviado
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// Cliente GUID
        /// </summary>
        /// <remarks>
        /// </remarks>
        public string ClientGuid { get; set; }
    }
}
