Imports System.Net.Mail

Public Class NomadeMail

    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Sub enviar(ByVal remitente As String, ByVal nombreRemitente As String, ByVal destinatarios As String,
                      ByVal asunto As String, ByVal mensaje As String, Optional ByVal Archivo As String = Nothing, Optional imagenes As Attachment = Nothing)
        Try
            Dim server As New SmtpClient("smtp.gmail.com", 587)
            Dim mail As New MailMessage()
            server.Credentials = New System.Net.NetworkCredential("soporte@orbitum.org", "Help2014")
            server.EnableSsl = True

            mail.To.Add(destinatarios)
            mail.Subject = asunto
            mail.From = New MailAddress(remitente, nombreRemitente)
            Dim body As String = mensaje
            body &= "<p style=""text-align: right"">Correo generado por <strong>UNICORN ERP</strong> - <a href='http://www.orbitum.org'>Orbitum Net S.R.L.</a></p>"
            mail.Body = body
            mail.IsBodyHtml = True


            If Not imagenes Is Nothing Then
                mail.Attachments.Clear()
                imagenes.ContentId = "pic"
                mail.Attachments.Add(imagenes)
            End If



            If Not Archivo Is Nothing Then
                mail.Attachments.Clear()
                Dim a As New Attachment(Archivo)
                mail.Attachments.Add(a)
            End If
            server.Send(mail)
        Catch ex As Exception
            Throw (ex)
        End Try
    End Sub

    Public Function ListarCorreos(ByVal p_PIDM As Integer, ByVal p_NUM_SEQ As Integer, ByVal p_ESTADO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PPP_LISTAR_CORREO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SEQ", p_NUM_SEQ, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarCorreosAsociados(ByVal p_PIDM As Integer, ByVal p_NUM_SEQ As Integer, ByVal p_ESTADO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PPP_LISTAR_CORREOS_ASOCIADOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SEQ", p_NUM_SEQ, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

End Class
