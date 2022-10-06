Imports System.Globalization
Imports System.IO
Imports System.Net.Http
Imports System.Net.Mail
Imports System.Text
Imports System.Web.UI
Imports RestSharp

Public Class NomadeMail

    Private cn As Nomade.Connection
    Private Shared ReadOnly httpClient As HttpClient = New HttpClient()

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
    Public Async Sub enviarWhatsapp(ByVal RECIPIENT_PHONE_NUMBER As String, ByVal CODE As String, ByVal MENSAJEWHATSAPP As String,
                                      Optional ByVal Archivo As String = Nothing)

        Dim l_numeros() As String = RECIPIENT_PHONE_NUMBER.Split(",")
        Dim multimedia_id As String

        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SP_LISTAR_VARIABLES_WHATSAPP", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", "000001", ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", "A", ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            Dim phone_number_id = dt.Rows(0).Item("Id_Telefono").ToString
            Dim token = dt.Rows(0).Item("Token").ToString
            Dim version = dt.Rows(0).Item("Version_Whatsapp").ToString

            'Enviar documento al servidor de Facebook para obtener el ID 
            If Not (dt Is Nothing) Then
                Using request_MediaID = New HttpRequestMessage(New HttpMethod("POST"), "https://graph.facebook.com/" + version + "/" + phone_number_id + "/media")
                    'RESTSHARP -----------------------------------------------------------------------------------------------------------------------------
                    'Dim client = New RestClient("https://graph.facebook.com/" + version + "/" + phone_number_id + "/media")
                    'client.Timeout = -1
                    'Dim request = New RestRequest(Method.POST)
                    'request.AddHeader("Authorization", "Bearer EAAL1dM0xmrsBANMLJeAhF0pWitO4y1vtsJRop9q9JQcLY58lzuDegtTcrxliKXCppPg5GQTyiJVmKqOIoZAoPaNipoMuZBjmLFxHNxqkACSWKKP9MV5F9aMrIqOiVXn7OtdUFqUgQfvyZBK7wfkWmOZB4aCkbqj2OLf9SutargZDZD")
                    'request.AddParameter("type", "application/pdf")
                    'request.AddParameter("messaging_product", "whatsapp")
                    'request.AddFile("file", Archivo.Replace("/", "\"), "application/pdf")
                    'Dim response As IRestResponse = client.Execute(request)
                    'Dim stringResponse As String = response.Content.ToString()
                    'Dim sb As New System.Text.StringBuilder(stringResponse.Length) 'StringBuilder hace el proceso 3 veces más rapido que las alternativas
                    'For Each ch As Char In stringResponse
                    '    If Char.IsDigit(ch) Then sb.Append(ch)
                    'Next
                    'multimedia_id = sb.ToString()
                    '---------------------------------------------------------------------------------------------------------------------------------------
                    request_MediaID.Headers.Add("Authorization", "Bearer " + token)
                    Dim multipartContent = New MultipartFormDataContent()
                    Dim file1 = New ByteArrayContent(File.ReadAllBytes(Archivo.Replace("/", "\")))
                    file1.Headers.Add("Content-Type", "application/pdf")
                    multipartContent.Add(file1, "file", CODE)
                    multipartContent.Add(New StringContent("whatsapp"), "messaging_product")
                    multipartContent.Add(New StringContent("application/pdf"), "type")
                    request_MediaID.Content = multipartContent
                    Dim response = Await httpClient.SendAsync(request_MediaID)
                    Dim res_string As String = Await response.Content.ReadAsStringAsync()
                    Dim sb As New StringBuilder(res_string.Length) 'StringBuilder hace el proceso 3 veces más rapido que las alternativas
                    For Each ch As Char In res_string
                        If Char.IsDigit(ch) Then sb.Append(ch)
                    Next
                    multimedia_id = sb.ToString()
                End Using

                'Enviar el mensaje a todos los números ingresados
                For Each element As String In l_numeros
                    Dim num = "51" + element
                    Using request_EnviarDocumento = New HttpRequestMessage(New HttpMethod("POST"), "https://graph.facebook.com/" + version + "/" + phone_number_id + "/messages")
                        'RESTSHARP -----------------------------------------------------------------------------------------------------------------------------
                        'Dim client = New RestClient("https://graph.facebook.com/" + version + "/" + phone_number_id + "/messages")
                        'Dim body As String
                        'client.Timeout = -1
                        'Dim request = New RestRequest(Method.POST)
                        'request.AddHeader("Content-Type", "application/json")
                        'request.AddHeader("Authorization", "Bearer EAAL1dM0xmrsBAJ0VRboYAstRNzin8Lda0arFmtqOjZAdqnsOpnd6HrSNsySfJih4OreBPSBZCvYuSJQCv72YrvoQI2gu4fOrTnZBBgpiMcASHF3OAzktk6RRMKVcOEkbESJ5gFwU2P71v3MF7rNL9BUioyt7Re0Oo9QT5C6Yn0a6Pno81bK9WZCPacSRUVuntFDxuryV9AZDZD")
                        'Condicional del mensaje
                        'request.AddParameter("application/json", body, ParameterType.RequestBody)
                        'Dim response As IRestResponse = client.Execute(request)
                        '---------------------------------------------------------------------------------------------------------------------------------------
                        request_EnviarDocumento.Headers.Add("Authorization", "Bearer " + token)
                        'request.Headers.Add("Content-Type", "application/json")
                        Dim body As String
                        If MENSAJEWHATSAPP = "" Then
                            body = "{" & vbLf &
                                    "    ""messaging_product"": ""whatsapp""," & vbLf &
                                    "    ""to"": " & """" & num & """," & vbLf &
                                    "    ""type"": ""template""," & vbLf &
                                    "    ""template"": {" & vbLf &
                                    "        ""name"": ""mensaje_sin_nombre_cliente""," & vbLf &
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
                                    "            }" & vbLf &
                                    "        ]" & vbLf &
                                    "    }" & vbLf &
                                    "}"
                        Else
                            body = "{" & vbLf &
                                    "    ""messaging_product"": ""whatsapp""," & vbLf &
                                    "    ""to"": " & """" & num & """," & vbLf &
                                    "    ""type"": ""template""," & vbLf &
                                    "    ""template"": {" & vbLf &
                                    "        ""name"": ""mensaje_sin_nombre_cliente_y_con_texto_adicional""," & vbLf &
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
                                    "                        ""text"": " & """" & MENSAJEWHATSAPP & """" & vbLf &
                                    "                    }" & vbLf &
                                    "                ]" & vbLf &
                                    "            }" & vbLf &
                                    "        ]" & vbLf &
                                    "    }" & vbLf &
                                    "}"
                        End If
                        request_EnviarDocumento.Content = New StringContent(body, Encoding.UTF8, "application/json")
                        Dim response = Await httpClient.SendAsync(request_EnviarDocumento)
                        response.EnsureSuccessStatusCode()
                    End Using
                Next
            End If

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
