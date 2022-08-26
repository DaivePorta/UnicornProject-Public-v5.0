Imports System.IO
Imports System.Net
Imports System.Net.Http
Imports System.Net.Http.Headers
Imports System.Net.Mail
Imports System.Text
Imports System.Text.RegularExpressions
Imports System.Web
Imports RestSharp

Public Class NomadeMail

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Dim multimedia_id As String
    Dim BUSINESS_ID = "1248778869194005"
    Dim USER_ACCESS_TOKEN = "EAAL1dM0xmrsBANMLJeAhF0pWitO4y1vtsJRop9q9JQcLY58lzuDegtTcrxliKXCppPg5GQTyiJVmKqOIoZAoPaNipoMuZBjmLFxHNxqkACSWKKP9MV5F9aMrIqOiVXn7OtdUFqUgQfvyZBK7wfkWmOZB4aCkbqj2OLf9SutargZDZD"
    Dim WABA_ID = "104194112369979"

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

    Public Sub enviarMultimedia(ByVal RECIPIENT_PHONE_NUMBER As String, Optional ByVal Archivo As String = Nothing, Optional ByVal CODE As String = Nothing)
        Try
            Dim client = New RestClient("https://graph.facebook.com/v13.0/110383545074866/media")
            client.Timeout = -1
            Dim request = New RestRequest(Method.POST)
            request.AddHeader("Authorization", "Bearer EAAL1dM0xmrsBANMLJeAhF0pWitO4y1vtsJRop9q9JQcLY58lzuDegtTcrxliKXCppPg5GQTyiJVmKqOIoZAoPaNipoMuZBjmLFxHNxqkACSWKKP9MV5F9aMrIqOiVXn7OtdUFqUgQfvyZBK7wfkWmOZB4aCkbqj2OLf9SutargZDZD")
            request.AddParameter("type", "application/pdf")
            request.AddParameter("messaging_product", "whatsapp")
            request.AddFile("file", Archivo.Replace("/", "\"), "application/pdf")
            Dim response As IRestResponse = client.Execute(request)
            Dim stringResponse As String = response.Content.ToString()
            Dim sb As New System.Text.StringBuilder(stringResponse.Length) 'StringBuilder hace el proceso 3 veces más rapido que las alternativas
            For Each ch As Char In stringResponse
                If Char.IsDigit(ch) Then sb.Append(ch)
            Next
            multimedia_id = sb.ToString()
        Catch ex As Exception
            Throw (ex)
        End Try
    End Sub
    Public Sub enviarMensaje(ByVal RECIPIENT_PHONE_NUMBER As String, ByVal MENSAJEWHATSAPP As String, ByVal CODE As String, ByVal NAME As String, Optional ByVal Archivo As String = Nothing)
        Try
            Dim client = New RestClient("https://graph.facebook.com/v13.0/110383545074866/messages")
            Dim body As String
            client.Timeout = -1
            Dim request = New RestRequest(Method.POST)
            request.AddHeader("Content-Type", "application/json")
            request.AddHeader("Authorization", "Bearer " + USER_ACCESS_TOKEN)
            If MENSAJEWHATSAPP = "" Then
                body = "{" & vbLf &
                        "    ""messaging_product"": ""whatsapp""," & vbLf &
                        "    ""to"": " & """" & RECIPIENT_PHONE_NUMBER & """," & vbLf &
                        "    ""type"": ""template""," & vbLf &
                        "    ""template"": {" & vbLf & "        
                        ""name"": ""ordendeserviciosintextoadicional""," & vbLf &
                        "        ""language"": {" & vbLf &
                        "            ""code"": ""Es""" & vbLf &
                        "        }," & vbLf &
                        "        ""components"": [" & vbLf &
                        "            {" & vbLf &
                        "                ""type"": ""header""," & vbLf &
                        "                ""parameters"": [" & vbLf &
                        "                    {" & vbLf &
                        "                        ""type"": ""document""," & vbLf &
                        "                        ""document"": {" & vbLf &
                        "                            ""id"": " & multimedia_id & "," & vbLf &
                        "                            ""filename"": " & """" & CODE & """" & vbLf &
                        "                        }" & vbLf &
                        "                    }" & vbLf &
                        "                ]" & vbLf &
                        "            }," & vbLf &
                        "            {" & vbLf &
                        "                ""type"": ""body""," & vbLf &
                        "                ""parameters"": [" & vbLf &
                        "                    {" & vbLf &
                        "                        ""type"": ""text""," & vbLf &
                        "                        ""text"": " & """" & NAME & """" & vbLf &
                        "                    }" & vbLf & "                ]" & vbLf &
                        "            }" & vbLf &
                        "        ]" & vbLf &
                        "    }" & vbLf &
                        "}"
            Else
                body = "{" & vbLf &
                        "    ""messaging_product"": ""whatsapp""," & vbLf &
                        "    ""to"": " & """" & RECIPIENT_PHONE_NUMBER & """," & vbLf &
                        "    ""type"": ""template""," & vbLf &
                        "    ""template"": {" & vbLf & "        
                        ""name"": ""ordendeserviciocontextoadicional""," & vbLf &
                        "        ""language"": {" & vbLf &
                        "            ""code"": ""Es""" & vbLf &
                        "        }," & vbLf &
                        "        ""components"": [" & vbLf &
                        "            {" & vbLf &
                        "                ""type"": ""header""," & vbLf &
                        "                ""parameters"": [" & vbLf &
                        "                    {" & vbLf &
                        "                        ""type"": ""document""," & vbLf &
                        "                        ""document"": {" & vbLf &
                        "                            ""id"": " & multimedia_id & "," & vbLf &
                        "                            ""filename"": " & """" & CODE & """" & vbLf &
                        "                        }" & vbLf &
                        "                    }" & vbLf &
                        "                ]" & vbLf &
                        "            }," & vbLf &
                        "            {" & vbLf &
                        "                ""type"": ""body""," & vbLf &
                        "                ""parameters"": [" & vbLf &
                        "                    {" & vbLf &
                        "                        ""type"": ""text""," & vbLf &
                        "                        ""text"": " & """" & NAME & """" & vbLf &
                        "                    }," & vbLf & "                    {" & vbLf &
                        "                        ""type"": ""text""," & vbLf &
                        "                        ""text"": " & """" & MENSAJEWHATSAPP & """" & vbLf &
                        "                    }" & vbLf & "                ]" & vbLf &
                        "            }" & vbLf &
                        "        ]" & vbLf &
                        "    }" & vbLf &
                        "}"
            End If
            request.AddParameter("application/json", body, ParameterType.RequestBody)
            Dim response As IRestResponse = client.Execute(request)
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

    Public Function ListarTelefonos(ByVal p_PIDM As Integer, ByVal p_NUM_SEQ As Integer, ByVal p_ESTADO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PPP_LISTAR_TELEFONO", CommandType.StoredProcedure)
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
