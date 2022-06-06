<%@ WebHandler Language="VB" Class="NFLVANU" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO

Public Class NFLVANU : Implements IHttpHandler
    
    Dim res As String
    Dim resb As New StringBuilder
    Dim opcion As String
    Dim p As New Nomade.FI.FIIgv("BN")
    Dim dt As DataTable
    
    Dim pMes As String
    Dim pAnio As String
    Dim pctlg As String
    Dim pscsl As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        'context.Response.ContentType = "text/plain"
        'context.Response.Write("Hello World")
        Try
            opcion = context.Request("opcion")
        
            pMes = context.Request("pMes")
            pAnio = context.Request("pAnio")
            pctlg = context.Request("pctlg")
            pscsl = context.Request("pscsl")
        Catch ex As Exception

        End Try
        
        
        Try
            Select Case opcion
                Case "1"
                    dt = p.fListarAnio
                    context.Response.ContentType = "application/json; charset=utf-8"
                    
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("ANIO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("ANIO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "2"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.fListarMes
                    
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("MES").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("MES").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "3"
                    'context.Response.ContentType = "application/json; charset=utf-8"
                    If pMes.Equals(String.Empty) Or pAnio.Equals(String.Empty) Then
                        GenerarTablaProSinDatos()
                    Else
                        dt = p.fListarIGV(pAnio, pMes, pctlg, pscsl)
                        If dt Is Nothing Then
                            GenerarTablaProSinDatos()
                        Else
                            If dt.Rows.Count = 0 Then
                                GenerarTablaProSinDatos()
                            Else
                                GenerarTablaPro(dt)
                            End If
                        End If
                    End If

                    'If Not dt Is Nothing Then
                    '    resb.Append("[")
                    '    For Each MiDataRow As DataRow In dt.Rows
                    '        resb.Append("{")
                    '        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                    '        resb.Append("""BASE"" :" & """" & MiDataRow("baseimponible").ToString & """,")
                    '        resb.Append("""TRIBUTO"" :" & """" & MiDataRow("tributo").ToString & """")
                            
                    '        resb.Append("}")
                    '        resb.Append(",")
                    '    Next
                    '    resb.Append("{}")
                    '    resb = resb.Replace(",{}", String.Empty)
                    '    resb.Append("]")
                    'End If
                    'res = resb.ToString()
                Case "4"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.fNombreEmpresa(pctlg)
                    
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""NOMEMPRESA"" :" & """" & MiDataRow("NOMEMPRESA").ToString & """,")
                            resb.Append("""RUC"" :" & """" & MiDataRow("RUC").ToString & """")
                                                       
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "5"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.fListarRenta(pMes, pAnio)
                    
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""mes"" :" & """" & MiDataRow("mes").ToString & """,")
                            resb.Append("""MesNom"" :" & """" & MiDataRow("MesNom").ToString & """,")
                            resb.Append("""anio"" :" & """" & MiDataRow("anio").ToString & """,")
                            resb.Append("""imp"" :" & """" & MiDataRow("imp").ToString & """,")
                            resb.Append("""fact"" :" & """" & MiDataRow("fact").ToString & """,")
                            resb.Append("""Pag_Cue"" :" & """" & MiDataRow("Pag_Cue").ToString & """,")
                            resb.Append("""Metodo"" :" & """" & MiDataRow("Metodo").ToString & """")
                            
                                                       
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "SENDMAIL"
                    context.Request.ContentType = "text/plain"
               
                    Dim mail As New Nomade.Mail.NomadeMail("BN")
                    Dim remite As String = ""
                    Dim remitente As String = context.Request("REMITENTE")
                    
                    'CMENDIETA
                    If remitente.Equals("") Then
                        remite = "soporte@orbitum.org"
                    Else
                        remite = remitente
                    End If
                    
                    Dim nremitente As String = context.Request("NREMITENTE")
                    Dim destinatarios As String = context.Request("DESTINATARIOS")
                    Dim asunto As String = context.Request("ASUNTO")
                    Dim mensaje As String = context.Request("MENSAJE")
                    
                    Dim empresa As String = context.Request("EMPRESA")
                    Dim htmlMensaje As String = context.Request("HTMLMENSAJE")
                    
                    Dim CUERPO As String =
                        "<p>" & mensaje & "</p><hr>" &
                        "<h2>" & empresa & "</h2>" & htmlMensaje
                    'mail.enviar(remitente, nremitente, destinatarios, asunto, CUERPO)
                    mail.enviar(remite, nremitente, destinatarios, asunto, CUERPO)
                    
                    res = "OK"
                
                    mail = Nothing
            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub
    
    Public Function GenerarTablaPro(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            ' tabla principal de datos de IGV
            'res += "<div class=""span12"" id=""tablasIGVRA"">"
            res = "<div class=""span6""><h3>Resumen de Compras y Ventas</h3>"
            res += "<table id=""tblbmodal""  border=""0"" style=""width:100%;border : 2px solid black"">" 'class=""display DTTT_selectable""
            res += "<thead>"
            res += "<tr style=""background-color: black;color: white;font-size:large;"">"
            res += "<th colspan=""2"" style=""padding: 10px;margin:  15px;""></th>"
            res += "<th style=""padding: 10px;margin:  15px;"">BASE IMPONIBLE</th>"
            res += "<th style=""padding: 10px;margin:  15px;"">TRIBUTO</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            Dim y As Integer = 1
            Dim venta As Decimal = 0
            Dim vtributo As Decimal = 0
            Dim compra As Decimal = 0
            Dim ctributo As Decimal = 0
            Dim factorRenta As Decimal = 0
            For i As Integer = 0 To dt.Rows.Count - 1
                Try
                    factorRenta = Decimal.Parse(dt.Rows(i)("factor_renta").ToString())
                    res += "<tr style="""">"
                    If dt.Rows(i)("descripcion").ToString().Trim().Equals("VENTAS") Or dt.Rows(i)("descripcion").ToString().Trim().Equals("COMPRAS") Then
                        If y > 1 Then
                            res += "<td colspan=""4"" ></td>"
                            res += "</tr>"
                            res += "<tr>"
                        End If
                        res += "<td colspan=""4"" style=""color:black;background-color:#b0b0b0;font-size:large;font:bold;padding: 10px;margin:  15px;"">" & dt.Rows(i)("descripcion").ToString().ToUpper & "</td>"
                        res += "</tr>"
                        y += 1
                    Else
                        res += "<td colspan=""2"" style=""padding: 10px;margin:  15px;"">" & dt.Rows(i)("descripcion").ToString().ToUpper() & "</td>"
                        res += "<td style=""text-align: right;padding: 10px;margin:  15px;"">" & "S/. " & dt.Rows(i)("baseimponible").ToString() & "</td>"
                        res += "<td style=""text-align: right;padding: 10px;margin:  15px;"">" & "S/. " & dt.Rows(i)("tributo").ToString() & "</td>"
                        res += "</tr>"
                        If y > 2 Then
                            compra += Decimal.Parse(dt.Rows(i)("baseimponible").ToString())
                            ctributo += Decimal.Parse(dt.Rows(i)("tributo").ToString())
                        Else
                            venta += Decimal.Parse(dt.Rows(i)("baseimponible").ToString())
                            vtributo += Decimal.Parse(dt.Rows(i)("tributo").ToString())
                        End If
                    End If
                    
                    
                Catch ex As Exception
                    res += ""
                End Try
            Next
            ' fila final en tabla
            res += "<tr>"
            res += "<td colspan=""4"" ></td>"
            res += "</tr>"
            res += "</tbody>"
            res += "</table><br/><br/>"
            
            'Nueva tabla para Renta 3ra
            factorRenta = factorRenta / 100
            res += "<h3>Cálculo de Anticipo de Renta 3ra</h3>"
            res += "<table id=""tblbmodalRA""  border=""0"" style=""width:100%;border : 2px solid black"">" 'class=""display DTTT_selectable""
            res += "<thead>"
            res += "<tr style=""background-color: black;color: white;font-size:large;"">"
            res += "<th colspan=""2"" style=""padding: 10px;margin:  15px;""></th>"
            res += "<th style=""padding: 10px;margin:  15px;"">VENTAS</th>"
            res += "<th style=""padding: 10px;margin:  15px;""></th>"
            res += "<th style=""padding: 10px;margin:  15px;"">COEFICIENTE</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            res += "<tr>"
            res += "<td colspan=""2"" style=""padding: 10px;margin:  15px;""></td>"
            res += "<td style=""text-align: center;padding: 10px;margin:  15px;"">" & "S/. " & venta & "</td>"
            res += "<td style=""text-align: center;padding: 10px;margin:  15px;"">X</td>"
            res += "<td style=""text-align: center;padding: 10px;margin:  15px;"">" & factorRenta & "</td>"
            res += "<tr>"
            res += "<tr>"
            res += "<td colspan=""2"" style=""color:black;background-color:#b0b0b0;font-size:large;font:bold;padding: 10px;margin:  15px;"">" & "TOTAL DEUDA RENTA 3RA" & "</td>"
            res += "<td colspan=""3"" style=""text-align: right;color:black;background-color:#b0b0b0;font-size:large;font:bold;padding: 10px;margin:  15px;"">" & "S/. " & Math.Round((factorRenta * venta), 0) & ".00</td>"
            res += "</tr>"
            res += "<tr>"
            res += "<td colspan=""5"" style=""padding: 10px;margin:  15px;"" ></td>"
            res += "</tr>"
            res += "</tbody>"
            res += "</table>"
            'Fin tabla nueva
            
            res += "<br/></div>"
            
            
            Dim resultadog As Decimal = vtributo - ctributo
            Dim saldoant As Decimal = 0
            Dim tribpagar As Decimal = resultadog - saldoant
            Dim perdeclperi As Decimal = 0
            Dim perdeclperiant As Decimal = 0
            Dim salpercnoapl As Decimal = (perdeclperi + perdeclperiant)
            Dim retdeclperi As Decimal = 0
            Dim retdeclperiant As Decimal = 0
            Dim salretnoapl As Decimal = (retdeclperi + retdeclperiant)
            Dim tributofinal As Decimal = tribpagar + salpercnoapl + salretnoapl
            
            ' Tabla adyacente con datos de calculo y totales
            res += "<div class=""span6""><h3>Cuadre de Tributo IGV a Pagar</h3>"
            res += "<table id=""tblbmodal2""  border=""0"" style=""width:100%;border : 2px solid black"">" 'class=""display DTTT_selectable""
            res += "<thead>"
            'res += "<tr style=""text-align: right"">"
            res += "<tr style=""background-color: black;color: white;font-size:large;text-align: right;"">"
            res += "<th colspan=""2"" style=""padding: 10px;margin:  15px;""></th>"
            res += "<th style=""padding: 10px;margin:  15px;"">BASE IMPONIBLE</th>"
            res += "<th style=""padding: 10px;margin:  15px;"">IGV</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            
            'VENTAS
            res += "<tr>"
            res += "<td style=""padding: 10px;margin:  15px;"">(+)</td>"
            res += "<td style=""padding: 10px;margin:  15px;"">VENTAS</td>"
            res += "<td style=""text-align: right;padding: 10px;margin:  15px;"">" & "S/. " & venta & "</td>"
            res += "<td style=""text-align: right;padding: 10px;margin:  15px;"">" & "S/. " & vtributo & "</td>"
            res += "</tr>"
            
            'COMPRAS
            res += "<tr>"
            res += "<td style=""padding: 10px;margin:  15px;"">(-)</td>"
            res += "<td style=""padding: 10px;margin:  15px;"">COMPRAS</td>"
            res += "<td style=""text-align: right;padding: 10px;margin:  15px;"">" & "S/. " & compra & "</td>"
            res += "<td style=""text-align: right;padding: 10px;margin:  15px;"">" & "S/. " & ctributo & "</td>"
            res += "</tr>"
            
            'Impuesto resultante
            res += "<tr style=""color:black;font-size:16px;font:bold;"">" 'background-color:#b0b0b0;
            res += "<td style=""padding: 10px;margin:  15px;""></td>"
            res += "<td colspan=""2"" style=""padding: 10px;margin:  15px;"">IMPUESTO RESULTANTE</td>"
            res += "<td style=""text-align: right;border-top:2px solid black;padding: 10px;margin:  15px;"">" & "S/. " & resultadog & "</td>"
            res += "</tr>"
            
            'Saldo anterior
            res += "<tr >"
            res += "<td style=""padding: 10px;margin:  15px;"">(-)</td>"
            res += "<td colspan=""2"" style=""padding: 10px;margin:  15px;"">SALDO A FAVOR PERIODO ANTERIOR</td>"
            res += "<td style=""text-align: right;padding: 10px;margin:  15px;"">" & "S/. " & saldoant & "</td>"
            res += "</tr>"
            
           
            'Tributo a pagar
            res += "<tr style=""color:black;font-size:large;font:bold;"">" 'background-color:#b0b0b0;
            res += "<td style=""padding: 10px;margin:  15px;""></td>"
            If resultadog > 0 Then
                res += "<td colspan=""2"" style=""padding: 10px;margin:  15px;"">TRIBUTO A PAGAR</td>"
            Else
                res += "<td colspan=""2"" style=""padding: 10px;margin:  15px;"">SALDO A FAVOR</td>"
            End If
            res += "<td style=""text-align: right;border:2px solid black;padding: 10px;margin:  15px;"">" & "S/. " & tribpagar & "</td>"
            res += "</tr>"
            
            'PERCEPCIONES DECLARADAS EN EL PERIODO
            res += "<tr >"
            res += "<td style=""padding: 10px;margin:  15px;"" >(-)</td>"
            res += "<td colspan=""2"" style=""padding: 10px;margin:  15px;"">PERCEPCIONES DECLARADAS EN EL PERIODO</td>"
            res += "<td style=""text-align: right;padding: 10px;margin:  15px;"">" & "S/. " & perdeclperi & "</td>"
            res += "</tr>"
            
            'PERCEPCIONES DECLARADAS EN PERIODOS ANTERIORES
            res += "<tr >"
            res += "<td style=""padding: 10px;margin:  15px;"">(-)</td>"
            res += "<td colspan=""2"" style=""padding: 10px;margin:  15px;"">PERCEPCIONES DECLARADAS EN PERIODOS ANTERIORES</td>"
            res += "<td style=""text-align: right;padding: 10px;margin:  15px;"">" & "S/. " & perdeclperiant & "</td>"
            res += "</tr>"
            
            'SALDO DE PERCEPCIONES NO APLICADAS
            res += "<tr style=""color:black;font-size:large;font:bold;"">" 'background-color:#b0b0b0;
            res += "<td style=""padding: 10px;margin:  15px;""></td>"
            res += "<td colspan=""2"" style=""padding: 10px;margin:  15px;"">SALDO DE PERCEPCIONES NO APLICADAS</td>"
            res += "<td style=""text-align: right;border:2px solid black;padding: 10px;margin:  15px;"">" & "S/. " & salpercnoapl & "</td>"
            res += "</tr>"
            
            'RETENCIONES DECLARADAS EN EL PERIODO
            res += "<tr >"
            res += "<td style=""padding: 10px;margin:  15px;"">(-)</td>"
            res += "<td colspan=""2"" style=""padding: 10px;margin:  15px;"">RETENCIONES DECLARADAS EN EL PERIODO</td>"
            res += "<td style=""text-align: right;padding: 10px;margin:  15px;"">" & "S/. " & perdeclperi & "</td>"
            res += "</tr>"
            
            'RETENCIONES DECLARADAS EN PERIODOS ANTERIORES
            res += "<tr >"
            res += "<td style=""padding: 10px;margin:  15px;"">(-)</td>"
            res += "<td colspan=""2"" style=""padding: 10px;margin:  15px;"">RETENCIONES DECLARADAS EN PERIODOS ANTERIORES</td>"
            res += "<td style=""text-align: right;padding: 10px;margin:  15px;"">" & "S/. " & perdeclperiant & "</td>"
            res += "</tr>"
            
            'SALDO DE RETENCIONES NO APLICADAS
            res += "<tr style=""color:black;font-size:large;font:bold;"">" 'background-color:#b0b0b0;
            res += "<td style=""padding: 10px;margin:  15px;""></td>"
            res += "<td colspan=""2"" style=""padding: 10px;margin:  15px;"">SALDO DE RETENCIONES NO APLICADAS</td>"
            res += "<td style=""text-align: right;border:2px solid black;padding: 10px;margin:  15px;"">" & "S/. " & salpercnoapl & "</td>"
            res += "</tr>"
            
            'SALDO FINAL DE TRIBUTO A PAGAR
            res += "<tr>"
            res += "<td colspan=""4"" style=""padding: 10px;margin:  15px;""></td>"
            res += "</tr>"
            res += "<tr style=""color:black;background-color:#b0b0b0;font-size:large;font:bold;"">"
            res += "<td style=""padding: 10px;margin:  15px;""></td>"
            res += "<td colspan=""2"" style=""padding: 10px;margin:  15px;"">TOTAL DEUDA TRIBUTARIA</td>"
            res += "<td style=""text-align: right;padding: 10px;margin:  15px;"">" & "S/. " & Math.Round(tributofinal, 0) & ".00</td>"
            res += "</tr>"
            
            ' fila final en tabla
            res += "<tr>"
            res += "<td colspan=""4"" style=""padding: 10px;margin:  15px;""></td>"
            res += "</tr>"
            res += "</tbody>"
            res += "</table></div>"
            
            'res += "</div>"
        Else
            GenerarTablaProSinDatos()
        End If
        Return res
    End Function
    
      
    Public Function GenerarTablaProSinDatos() As String
        
        res = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"" style=""width:100%"">"
        res += "<thead>"
        res += "<tr align=""center"">"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "</tr>"
        res += "</thead>"
        res += "<tbody>"
        res += "<tr >"
        res += "<td align='center'></td>"
        res += "<td align='center' >NO HAY DATOS DISPONIBLES</td>"
        res += "<td align='center'></td>"
        res += "</tr>"
        res += "</tbody>"
        res += "</table>"
        
        Return res
    End Function
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class