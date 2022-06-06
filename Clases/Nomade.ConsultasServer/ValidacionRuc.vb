Imports MSXML2
Imports System.IO
Imports System.Net
Imports System.Text
Imports System

Public Class ValidacionRuc
    Dim xDat As String
    Dim xRazSoc As String, xEst As String, xCon As String, xDir As String, xTele As String, xDni As String, xNombComercial As String
    Dim xRazSocX As Long, xEstX As Long, xConX As Long, xDirX As Long
    Dim xRazSocY As Long, xEstY As Long, xConY As Long, xDirY As Long
    Dim valores(7) As String
    'Private Sub RUC(ByVal xNum As String)
    '    On Error Resume Next
    '    Dim xWml As New XMLHTTP
    '    xWml.open("POST", "http://www.sunat.gob.pe/w/wapS01Alias?ruc=" & xNum, False)
    '    xWml.send()
    '    If xWml.status = 200 Then
    '        xDat = xWml.responseText
    '        If Len(xDat) <= 635 Then
    '            MsgBox("El numero Ruc ingresado no existe en la Base de datos de la SUNAT")
    '            xWml = Nothing
    '            Exit Sub
    '        End If
    '        xDat = Replace(xDat, "N&#xFA;mero Ruc. </b> " & xNum & " - ", "RazonSocial:")
    '        xDat = Replace(xDat, "Estado.</b>", "Estado:")
    '        xDat = Replace(xDat, "Agente Retenci&#xF3;n IGV.", "ARIGV:")
    '        xDat = Replace(xDat, "Situaci&#xF3;n.<b> ", "Situacion:")
    '        xDat = Replace(xDat, "Direcci&#xF3;n.</b><br/>", "Direccion:")
    '        xDat = Replace(xDat, "     ", " ")
    '        xDat = Replace(xDat, "    ", " ")
    '        xDat = Replace(xDat, "   ", " ")
    '        xDat = Replace(xDat, "  ", " ")
    '        xDat = Replace(xDat, "( ", "(")
    '        xDat = Replace(xDat, " )", ")")

    '        xRazSocX = InStr(1, xDat, "RazonSocial:", vbTextCompare)
    '        xRazSocY = InStr(1, xDat, " <br/></small>", vbTextCompare)
    '        xRazSocX = xRazSocX + 12
    '        xRazSoc = Mid(xDat, xRazSocX, (xRazSocY - xRazSocX))

    '        xEstX = InStr(1, xDat, "Estado:", vbTextCompare)
    '        xEstY = InStr(1, xDat, "ARIGV:", vbTextCompare)
    '        xEstX = xEstX + 7
    '        xEst = Mid(xDat, xEstX, ((xEstY - 34) - xEstX))

    '        xConX = InStr(1, xDat, "Situacion:", vbTextCompare)
    '        xConY = InStr(1, xDat, "</b></small><br/>", vbTextCompare)
    '        xDirY = xConX - 23
    '        xConX = xConX + 10
    '        xCon = Mid(xDat, xConX, (xConY - xConX))

    '        xDirX = InStr(1, xDat, "Direccion:", vbTextCompare)
    '        xDirX = xDirX + 10
    '        xDir = Mid(xDat, xDirX, (xDirY - xDirX))

    '        xRazSoc = Replace(xRazSoc, "&#209;", "Ñ")
    '        xRazSoc = Replace(xRazSoc, "&#xD1;", "Ñ")
    '        xRazSoc = Replace(xRazSoc, "&#193;", "Á")
    '        xRazSoc = Replace(xRazSoc, "&#201;", "É")
    '        xRazSoc = Replace(xRazSoc, "&#205;", "Í")
    '        xRazSoc = Replace(xRazSoc, "&#211;", "Ó")
    '        xRazSoc = Replace(xRazSoc, "&#218;", "Ú")
    '        xRazSoc = Replace(xRazSoc, "&#xC1;", "Á")
    '        xRazSoc = Replace(xRazSoc, "&#xC9;", "É")
    '        xRazSoc = Replace(xRazSoc, "&#xCD;", "Í")
    '        xRazSoc = Replace(xRazSoc, "&#xD3;", "Ó")
    '        xRazSoc = Replace(xRazSoc, "&#xDA;", "Ú")

    '        xDir = Replace(xDir, "&#209;", "Ñ")
    '        xDir = Replace(xDir, "&#xD1;", "Ñ")
    '        xDir = Replace(xDir, "&#193;", "Á")
    '        xDir = Replace(xDir, "&#201;", "É")
    '        xDir = Replace(xDir, "&#205;", "Í")
    '        xDir = Replace(xDir, "&#211;", "Ó")
    '        xDir = Replace(xDir, "&#218;", "Ú")
    '        xDir = Replace(xDir, "&#xC1;", "Á")
    '        xDir = Replace(xDir, "&#xC9;", "É")
    '        xDir = Replace(xDir, "&#xCD;", "Í")
    '        xDir = Replace(xDir, "&#xD3;", "Ó")
    '        xDir = Replace(xDir, "&#xDA;", "Ú")


    '        valores(0) = xRazSoc.Trim()
    '        valores(1) = xEst.Trim()
    '        valores(2) = xCon.Trim()
    '        valores(3) = xDir.Trim()
    '    Else
    '        MsgBox("No responde el servicio de la SUNAT")
    '    End If
    '    xWml = Nothing
    'End Sub
    Public Function consultarRUC(ByVal xNum As String) As String()
        On Error Resume Next

        ' Dim xWml As New XMLHTTP60
        ' xWml.open("POST", "http://www.sunat.gob.pe/w/wapS01Alias?ruc=" & xNum, False)
        'xWml.send()

        Dim request As WebRequest = WebRequest.Create("http://www.sunat.gob.pe/w/wapS01Alias?ruc=" & xNum)
        request.Method = "POST"

        Dim postData As String
        Dim bytearray As Byte() = Encoding.UTF8.GetBytes(String.Empty)
        request.ContentType = "application/xml"
        request.ContentLength = bytearray.Length
        Dim dataStream As Stream = request.GetRequestStream()
        dataStream.Write(bytearray, 0, bytearray.Length)
        dataStream.Close()
        Dim response As WebResponse = request.GetResponse()
        dataStream = response.GetResponseStream()
        Dim reader As New StreamReader(dataStream, Encoding.GetEncoding("ISO-8859-1"))
        Dim responseFromServer As String = reader.ReadToEnd()
       

        If CType(response, HttpWebResponse).StatusCode = 200 Then
            ' xDat = xWml.responseText
            xDat = responseFromServer
            If Len(xDat) <= 635 Then
                'MsgBox("El numero RUC ingresado no existe en la Base de datos de la SUNAT", MsgBoxStyle.Information, "MENSAJE")
                '  xWml = Nothing
                Return valores
            End If
            Dim xTabla() As String

            xDat = Replace(xDat, "     ", " ")
            xDat = Replace(xDat, "    ", " ")
            xDat = Replace(xDat, "   ", " ")
            xDat = Replace(xDat, "  ", " ")
            xDat = Replace(xDat, "( ", "(")
            xDat = Replace(xDat, " )", ")")

            xTabla = Split(xDat, "<small>")
            'Buscar Razon Social
            Dim p As Integer = buscar("<b>N&#xFA;mero Ruc. </b>", xTabla)
            xTabla(p) = Replace(xTabla(p), "<b>N&#xFA;mero Ruc. </b> " & xNum & " - ", "")
            xTabla(p) = Replace(xTabla(p), " <br/></small>", "")
            xRazSoc = CStr(xTabla(p))
            'Buscar Estado
            p = buscar("<b>Estado.</b>", xTabla)
            xTabla(p) = Replace(xTabla(p), "<b>Estado.</b>", "")
            xTabla(p) = Replace(xTabla(p), "</small><br/>", "")
            xEst = CStr(xTabla(p))
            'Buscar Dirección
            p = buscar("<b>Direcci&#xF3;n.</b><br/>", xTabla)
            xTabla(p) = Replace(xTabla(p), "<b>Direcci&#xF3;n.</b><br/>", "")
            xTabla(p) = Replace(xTabla(p), "</small><br/>", "")
            xDir = CStr(xTabla(p))
            'Buscar Situación
            p = buscar("Situaci&#xF3;n.<b>", xTabla)
            xTabla(p) = Replace(xTabla(p), "Situaci&#xF3;n.<b> ", "")
            xTabla(p) = Replace(xTabla(p), "</b></small><br/>", "")
            xCon = CStr(xTabla(p))
            'Buscar Telefono
            p = buscar("<b>Tel&#xE9;fono(s).</b><br/>", xTabla)
            xTabla(p) = Replace(xTabla(p), "<b>Tel&#xE9;fono(s).</b><br/>", "")
            xTabla(p) = Replace(xTabla(p), "</small><br/>", "")
            xTele = CStr(xTabla(p))

            'Buscar DNI
            p = buscar("<b>DNI</b> :", xTabla)
            xTabla(p) = Replace(xTabla(p), "<b>DNI</b> :", "")
            xTabla(p) = Replace(xTabla(p), "</small><br/>", "")
            xDni = CStr(xTabla(p))

            'Buscar DNI
            p = buscar("<b>Nombre Comercial.</b><br/>", xTabla)
            xTabla(p) = Replace(xTabla(p), "<b>Nombre Comercial.</b><br/>", "")
            xTabla(p) = Replace(xTabla(p), "</small><br/>", "")
            xNombComercial = CStr(xTabla(p))

            xRazSoc = Replace(xRazSoc, "&#209;", "Ñ")
            xRazSoc = Replace(xRazSoc, "&#xD1;", "Ñ")
            xRazSoc = Replace(xRazSoc, "&#193;", "Á")
            xRazSoc = Replace(xRazSoc, "&#201;", "É")
            xRazSoc = Replace(xRazSoc, "&#205;", "Í")
            xRazSoc = Replace(xRazSoc, "&#211;", "Ó")
            xRazSoc = Replace(xRazSoc, "&#218;", "Ú")
            xRazSoc = Replace(xRazSoc, "&#xC1;", "Á")
            xRazSoc = Replace(xRazSoc, "&#xC9;", "É")
            xRazSoc = Replace(xRazSoc, "&#xCD;", "Í")
            xRazSoc = Replace(xRazSoc, "&#xD3;", "Ó")
            xRazSoc = Replace(xRazSoc, "&#xDA;", "Ú")
            xRazSoc = Replace(xRazSoc, "&amp;", "&")

            xRazSoc = Mid(xRazSoc, 1, Len(xRazSoc) - 3)

            xDir = Replace(xDir, "&#209;", "Ñ")
            xDir = Replace(xDir, "&#xD1;", "Ñ")
            xDir = Replace(xDir, "&#193;", "Á")
            xDir = Replace(xDir, "&#201;", "É")
            xDir = Replace(xDir, "&#205;", "Í")
            xDir = Replace(xDir, "&#211;", "Ó")
            xDir = Replace(xDir, "&#218;", "Ú")
            xDir = Replace(xDir, "&#xC1;", "Á")
            xDir = Replace(xDir, "&#xC9;", "É")
            xDir = Replace(xDir, "&#xCD;", "Í")
            xDir = Replace(xDir, "&#xD3;", "Ó")
            xDir = Replace(xDir, "&#xDA;", "Ú")
            xDir = Replace(xDir, "&amp;", "&")


            xNombComercial = Replace(xNombComercial, "&#209;", "Ñ")
            xNombComercial = Replace(xNombComercial, "&#xD1;", "Ñ")
            xNombComercial = Replace(xNombComercial, "&#193;", "Á")
            xNombComercial = Replace(xNombComercial, "&#201;", "É")
            xNombComercial = Replace(xNombComercial, "&#205;", "Í")
            xNombComercial = Replace(xNombComercial, "&#211;", "Ó")
            xNombComercial = Replace(xNombComercial, "&#218;", "Ú")
            xNombComercial = Replace(xNombComercial, "&#xC1;", "Á")
            xNombComercial = Replace(xNombComercial, "&#xC9;", "É")
            xNombComercial = Replace(xNombComercial, "&#xCD;", "Í")
            xNombComercial = Replace(xNombComercial, "&#xD3;", "Ó")
            xNombComercial = Replace(xNombComercial, "&#xDA;", "Ú")
            xNombComercial = Replace(xNombComercial, "&amp;", "&")


            xEst = Mid(xEst, 1, Len(xEst) - 6)
            xCon = Mid(xCon, 1, Len(xCon) - 3)
            xDir = Mid(xDir, 1, Len(xDir) - 3)
            'valores = New String()
            valores(0) = xRazSoc.Trim() 'razon social
            valores(1) = xEst.Trim() 'estado
            valores(2) = xCon.Trim() 'condición
            valores(3) = xDir.Trim() 'dirección
            valores(4) = xTele.Trim() 'teléfono
            valores(5) = xDni.Trim() 'Dni
            valores(6) = xNombComercial.Trim()  'Nombre Comercial
        Else
            'MsgBox("No responde el servicio de la SUNAT", MsgBoxStyle.Information, "MENSAJE")
            Return valores
        End If
        reader.Close()
        dataStream.Close()
        response.Close()
        ' xWml = Nothing
        Return valores
    End Function
    Private Function buscar(ByVal opcion As String, ByVal xTabla() As String) As Integer
        Dim i As Integer = 0
        For Each fila As String In xTabla
            If fila.IndexOf(opcion) > -1 Then
                Return i
            End If
            i = i + 1
        Next
        Return -1
    End Function
    Private Function Verificar_ruc(ByVal xNum As String) As Boolean
        Dim li_suma, li_residuo, li_diferencia, li_compara As Integer
        li_suma = (CInt(Mid(xNum, 1, 1)) * 5) + (CInt(Mid(xNum, 2, 1)) * 4) + (CInt(Mid(xNum, 3, 1)) * 3) + (CInt(Mid(xNum, 4, 1)) * 2) + (CInt(Mid(xNum, 5, 1)) * 7) + (CInt(Mid(xNum, 6, 1)) * 6) + (CInt(Mid(xNum, 7, 1)) * 5) + (CInt(Mid(xNum, 8, 1)) * 4) + (CInt(Mid(xNum, 9, 1)) * 3) + (CInt(Mid(xNum, 10, 1)) * 2)
        li_compara = CInt(Mid(xNum, 11, 1))
        li_residuo = li_suma Mod 11
        li_diferencia = Int(11 - li_residuo)
        If li_diferencia > 9 Then li_diferencia = li_diferencia - 10
        If li_diferencia <> li_compara Then
            Verificar_ruc = False
        Else
            Verificar_ruc = True
        End If
    End Function
    'Private Sub Limpiar()
    '    xRazSoc = ""
    '    xEst = ""
    '    xCon = ""
    '    xDir = ""
    '    txtRazSoc.Text = ""
    '    txtEst.Text = ""
    '    txtCon.Text = ""
    '    txtDir.Text = ""
    'End Sub
    'Private Sub Habilitar(ByVal xOpc As Boolean)
    '    'lbl2.Visible = xOpc
    '    'lbl3.Visible = xOpc
    '    'lbl4.Visible = xOpc
    '    'lbl5.Visible = xOpc
    '    'txtRazSoc.Visible = xOpc
    '    'txtEst.Visible = xOpc
    '    'txtCon.Visible = xOpc
    '    'txtDir.Visible = xOpc
    'End Sub
    'Private Sub Form_Load()
    '    Habilitar(False)
    'End Sub
End Class
