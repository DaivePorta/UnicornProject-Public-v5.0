using System.Collections.Generic;

namespace Nomade.ChatJs
{
    public interface IChatHub
    {
        /// <summary>
        /// Retorna la lista de mensajes entre dos usuarios
        /// </summary>
        List<ChatMensaje> GetMessageHistory(int otherUserId);

        /// <summary>
        /// Retorna la lista de notificaciones por usuario
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        void GetNotificacionHistory(string userId);

        /// <summary>
        /// Borra los mensajes de una conversacion
        /// </summary>
        /// <param name="userOrigen"></param>
        /// <param name="userDestino"></param>
        /// <param name="sala"></param>
        void RemoveMensajesChat(int userOrigen, int userDestino, int sala);

        /// <summary>
        /// Envia mensaje a otro usuario
        /// </summary>
        void SendMessage(int otherUserId, string message, string clientGuid);

        /// <summary>
        /// Envia señal de escribiendo a otro usuario
        /// </summary>
        void SendTypingSignal(int otherUserId);

        /// <summary>
        /// Actualiza la lista de usuarios
        /// </summary>
        void BroadcastUsersList();

        /// <summary>
        /// Verifica la sesión del usuario
        /// </summary>
        void verificaSesion(string sessionId, string empresa);

        /// <summary>
        /// Cierra la sesión actual
        /// </summary>
        void cerrarSesionActual(string sessionId);

        /// <summary>
        /// Cierra la sesión de otro usuario
        /// </summary>
        void cerrarOtraSesion(string sessionId);

        /// <summary>
        /// Graba la sesión en el localstorage del navegador
        /// </summary>
        void trabajarParalelo();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user_destino"></param>
        /// <param name="modulo"></param>
        /// <param name="texto"></param>
        /// <param name="link"></param>
        void enviarNotificacion(string user_destino, string modulo, string texto, string link, string user_origen, string codReferencia);
        /// <summary>
        /// Cuando un cliente se conecta
        /// </summary>

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user_destino"></param>
        /// <param name="modulo"></param>
        /// <param name="texto"></param>
        /// <param name="link"></param>
        void EnviarNotificacionNuevo(long idNotificacion,
                                    string user_destino,
                                    string modulo, 
                                    string texto, 
                                    string link, 
                                    string user_origen, 
                                    string codReferencia, 
                                    string grupo, 
                                    string tipo = "warning", 
                                    string icono = "icon-book");

        /// <summary>
        /// Borra los mensajes de una conversacion
        /// </summary>
        /// <param name="grupo">Grupo de notificaciones</param>
        void EliminarNotificacionesPorGrupo(string grupo);

        /// <summary>
        /// Cuando un cliente se conecta
        /// </summary>

        System.Threading.Tasks.Task OnConnected();

        /// <summary>
        /// Cuando un usuario se desconecta
        /// </summary>
        System.Threading.Tasks.Task OnDisconnected(bool stopCalled);
    }
}