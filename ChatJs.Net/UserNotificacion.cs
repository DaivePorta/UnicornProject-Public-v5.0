using System;

namespace Nomade.ChatJs
{
    public class UserNotificacion
    {
        /// <summary>
        /// Usuario que envia la notificación
        /// </summary>
        public string user_origen;

        /// <summary>
        /// Usuario que recibe la notificación
        /// </summary>
        public string user_destino;
        
        /// <summary>
        /// Modulo al que pertenece la notificación
        /// </summary>
        public string modulo;
        
        /// <summary>
        /// Texto que se mostrara al notificar al usuario
        /// </summary>
        public string texto;
        
        /// <summary>
        /// Link  a donde te redirecciona la notificación
        /// </summary>
        public string link;

        /// <summary>
        /// Indicador para saber si la notificación ya se ha entregado o no
        /// </summary>
        public int visto;

        /// <summary>
        /// Codigo de referencia de la operacion
        /// </summary>
        public string codigo;

        /// <summary>
        /// icono que representa el modulo
        /// </summary>
        public string icono;

        /// <summary>
        /// fecha en la que se realiza la notificacion
        /// </summary>
        public DateTime fecha;

        /// <summary>
        /// Tipo de clase que se pintara (color)
        /// </summary>
        public string tipo;
    }
}
