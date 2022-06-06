<%@ WebHandler Language="VB" Class="CPMNDDP" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CPMNDDP : Implements IHttpHandler
    
    Dim OPCION As String
    Dim USUA_ID As String
    
    Dim p_CODE, p_CTLG_CODE, p_SCSL_CODE, p_SCSL_EXONERADA_IND, p_PERS_PIDM As String
    Dim p_MOTIVO_CODE, p_MOTIVO_DESC, p_MOTIVO_ADICIONAL, p_FECHA_EMISION,
        p_MONE_CODE, p_DETALLES, p_MONTO_IGV, p_NUM_SERIE, p_NUM_DCTO, p_CODIGO_CORRELATIVO, p_TIPO_IND As String
    
    Dim p_IMPORTE_EXO, p_IMPORTE_INA, p_IMPORTE_GRA, p_IGV, p_IMPORTE_TOTAL, p_PCTJ_IGV As String
    'DOCUMENTO DE REFERENCIA
    Dim p_DCTO_REF_CODE, p_DCTO_REF_SERIE, p_DCTO_REF_NRO, p_DCTO_REF_TIPO_CODE As String
    'DETALLES 
    Dim p_ITEM As String
    
    
    
    Dim ncCliente As New Nomade.NC.NCECliente("Bn")
    Dim caNotaCredito As New Nomade.CA.NotaCredito("Bn")
    Dim caNotaDebito As New Nomade.CA.CANotaDebito("Bn")
    
    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        OPCION = context.Request("OPCION")
        USUA_ID = vChar(context.Request("USUA_ID"))
        'NOTA DE DÉBITO        
        p_CODE = context.Request("p_CODE")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        p_SCSL_EXONERADA_IND = context.Request("p_SCSL_EXONERADA_IND")
        p_PERS_PIDM = context.Request("p_PERS_PIDM")
        p_FECHA_EMISION = context.Request("p_FECHA_EMISION")
        p_NUM_SERIE = context.Request("p_SERIE")
        p_NUM_DCTO = context.Request("p_NUMERO")
        p_MOTIVO_CODE = context.Request("p_MOTIVO_CODE")
        p_MOTIVO_DESC = vChar(context.Request("p_MOTIVO_DESC"))
        p_MOTIVO_ADICIONAL = vChar(context.Request("p_MOTIVO_ADICIONAL"))
        p_MONE_CODE = context.Request("p_MONE_CODE")
        p_DETALLES = vChar(context.Request("p_DETALLES"))
                
        p_IMPORTE_EXO = context.Request("p_IMPORTE_EXO")
        p_IMPORTE_INA = context.Request("p_IMPORTE_INA")
        p_IMPORTE_GRA = context.Request("p_IMPORTE_GRA")
        p_IGV = context.Request("p_IGV")
        p_IMPORTE_TOTAL = context.Request("p_IMPORTE_TOTAL")
        p_PCTJ_IGV = context.Request("p_PCTJ_IGV")
        
        p_TIPO_IND = vChar(context.Request("p_TIPO_IND"))
        p_CODIGO_CORRELATIVO = context.Request("p_CODIGO_CORRELATIVO")
        
        'DOCUMENTO DE REFERENCIA
        p_DCTO_REF_CODE = context.Request("p_DCTO_REF_CODE")
        p_DCTO_REF_SERIE = context.Request("p_DCTO_REF_SERIE")
        p_DCTO_REF_NRO = context.Request("p_DCTO_REF_NRO")
        p_DCTO_REF_TIPO_CODE = context.Request("p_DCTO_REF_TIPO_CODE")
        'DETALLES       
        p_ITEM = context.Request("p_ITEM")
        
        Try
        
            Select Case OPCION
                            
                Case "1" ' LISTAR DOCUMENTOS DE COMPRA - DOCUMENTOS DE REFERENCIA   
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = caNotaCredito.ListarDocumentosCompra("", "", "", "", "", p_CTLG_CODE, p_SCSL_CODE, p_DCTO_REF_TIPO_CODE, USUA_ID)
                    res = GenerarTablaDocumentos()
                    
                Case Else
                    
            End Select
            
            context.Response.Write(res)
            
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
        
    End Sub
 
    'TABLA DE BÚSQUEDA DE DOCUMENTOS    
    'Public Function GenerarTablaDocumentos() As String
    '    resb.Clear()
    '    resb.Append("<table id=""tblBuscarDocumento"" class=""display DTTT_selectable"" border=""0"">")
    '    resb.Append("<thead>")
    '    resb.AppendFormat("<th>CÓDIGO</th>")
    '    resb.AppendFormat("<th>SERIE</th>")
    '    resb.AppendFormat("<th>NRO</th>")
    '    resb.AppendFormat("<th>EMISIÓN</th>")
    '    resb.AppendFormat("<th>DCTO</th>")
    '    resb.Append("</thead>")
    '    resb.Append("<tbody>")
                                 
    '    If Not (dt Is Nothing) Then
    '        For i As Integer = 0 To dt.Rows.Count - 1
    '            If dt.Rows(i)("COMPLETO_IND").ToString = "S" And dt.Rows(i)("ANULADO").ToString = "NO" Then
    '                'If dt.Rows(i)("NOTA_CREDITO_IND").ToString = "N" Then
    '                Dim serie_numero As String() = dt.Rows(i)("NUM_DCTO").ToString().Split(New Char() {"-"})
    '                resb.AppendFormat("<tr class='doc_fila' onclick=""setSeleccionDocumento('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}')"" id='doc_fila_{0}_{1}'>", dt.Rows(i)("CODIGO").ToString(), dt.Rows(i)("SECUENCIA").ToString(), serie_numero(0), serie_numero(1), dt.Rows(i)("TIPO_DCTO").ToString(), dt.Rows(i)("IMPORTE").ToString(), dt.Rows(i)("MONEDA").ToString(), dt.Rows(i)("SIMBOLO_MONEDA").ToString(), dt.Rows(i)("SCSL_EXONERADA_IND").ToString(), If(dt.Rows(i)("EMISION").ToString() = "", "", dt.Rows(i)("EMISION").ToString().Substring(0, 10)))
    '                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODIGO").ToString())
    '                resb.AppendFormat("<td align='center' >{0}</td>", serie_numero(0))
    '                resb.AppendFormat("<td align='center' >{0}</td>", serie_numero(1))
    '                resb.AppendFormat("<td align='center' >{0}</td>", If(dt.Rows(i)("EMISION").ToString() = "", "", dt.Rows(i)("EMISION").ToString().Substring(0, 10)))
    '                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DOCUMENTO").ToString())
    '                resb.Append("</tr>")
    '                'End If
    '            End If
    '        Next
    '    End If
    '    resb.Append("</tbody>")
    '    resb.Append("</table>")
    '    res = resb.ToString()
    '    Return res
    'End Function
     
    'Tabla de busqueda de documentos    
    Public Function GenerarTablaDocumentos() As String
        
        res = ""
        resb.Clear()
        '------
        resb.Append("<table id=""tblBuscarDocumento"" class=""display DTTT_selectable"" border=""0"">")
        resb.Append("<thead>")
        resb.Append("<th>CÓDIGO</th>")
        resb.Append("<th>SERIE</th>")
        resb.Append("<th>NRO</th>")
        resb.Append("<th>EMISIÓN</th>")
        resb.Append("<th>DCTO</th>")
        resb.Append("</thead>")
        resb.Append("<tbody>")
        If Not (dt Is Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                If dt.Rows(i)("COMPLETO").ToString = "COMPLETO" And dt.Rows(i)("ANULADO").ToString = "NO ANULADO" Then
                'TO DO
                    'If dt.Rows(i)("NOTA_CREDITO_IND").ToString = "N" Then
                    Dim serie_numero As String() = {"", ""}
                    If dt.Rows(i)("NUM_DCTO").ToString().Split("-").Length = 2 Then
                        serie_numero = dt.Rows(i)("NUM_DCTO").ToString().Split(New Char() {"-"})
                    End If
                    resb.AppendFormat("<tr class='doc_fila' onclick=""setSeleccionDocumento('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}')"" id='doc_fila_{0}_{1}'>", dt.Rows(i)("CODIGO").ToString(), dt.Rows(i)("SECUENCIA").ToString(), serie_numero(0), serie_numero(1), dt.Rows(i)("TIPO_DCTO").ToString(), dt.Rows(i)("IMPORTE").ToString(), dt.Rows(i)("MONEDA").ToString(), dt.Rows(i)("SIMBOLO_MONEDA").ToString(), dt.Rows(i)("INC_IGV_IND").ToString(), If(dt.Rows(i)("EMISION").ToString() = "", "", dt.Rows(i)("EMISION").ToString().Substring(0, 10)))
                    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODIGO").ToString())
                    resb.AppendFormat("<td align='center' >{0}</td>", serie_numero(0))
                    resb.AppendFormat("<td align='center' >{0}</td>", serie_numero(1))
                    resb.AppendFormat("<td align='center' >{0}</td>", If(dt.Rows(i)("EMISION").ToString() = "", "", dt.Rows(i)("EMISION").ToString().Substring(0, 10)))
                    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DESC_DCTO").ToString())
                    resb.Append("</tr>")
                    'End If
                End If
            Next
        End If
        resb.Append("</tbody>")
        resb.Append("</table>")
        res = resb.ToString()
        Return res
    End Function
    
    Public Function vChar(ByVal campo As String) As String
        Dim res As String
        If campo IsNot Nothing Then
            res = campo.Trim().Replace("""", "'").Replace("\", " ")
            res = res.Replace(vbCrLf, "\n")
        Else
            res = campo
        End If
        Return res
    End Function
    
    Function ObtenerFecha(ByVal fecha As String) As String
        Dim dia = fecha.Split(" ")(0).Split("/")(0)
        Dim mes = fecha.Split(" ")(0).Split("/")(1)
        Dim anio = fecha.Split(" ")(0).Split("/")(2)
        Dim hora = ""
        Dim min = ""
        Dim seg = ""
        If fecha.Split(" ").Length = 3 Then
            hora = fecha.Split(" ")(1).Split(":")(0)
            min = fecha.Split(" ")(1).Split(":")(1)
            seg = fecha.Split(" ")(1).Split(":")(2)
            If fecha.Split(" ")(2).Contains("p") Then
                If Integer.Parse(hora) < 12 Then
                    hora = (Integer.Parse(hora) + 12).ToString
                End If
            End If
        End If
        fecha = anio + mes + dia + hora + min + seg
        Return fecha
    End Function
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class