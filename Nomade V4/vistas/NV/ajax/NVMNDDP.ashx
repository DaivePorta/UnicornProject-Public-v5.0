<%@ WebHandler Language="VB" Class="NVMNDDP" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NVMNDDP : Implements IHttpHandler
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

    Dim caNotaCredito As New Nomade.CA.NotaCredito("Bn")
    Dim caNotaDebito As New Nomade.CA.CANotaDebito("Bn")

    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Dim p_MES, p_ANIO As Integer
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

        p_MES = IIf(context.Request("p_MES") = Nothing, 0, IIf(context.Request("p_MES") = "", 0, context.Request("p_MES")))
        p_ANIO = IIf(context.Request("p_ANIO") = Nothing, 0, IIf(context.Request("p_ANIO") = "", 0, context.Request("p_ANIO")))

        Try

            Select Case OPCION

                Case "1" ' LISTAR DOCUMENTOS DE COMPRA - DOCUMENTOS DE REFERENCIA
                    'context.Response.ContentType = "application/text; charset=utf-8"
                    'dt = caNotaCredito.ListarDocumentosVenta("", "", "", "", "", p_CTLG_CODE, p_SCSL_CODE, p_DCTO_REF_TIPO_CODE, USUA_ID)
                    'res = GenerarTablaDocumentos()
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = caNotaCredito.ListarDocumentosCompra("", "", "", "", "", p_CTLG_CODE, p_SCSL_CODE, p_DCTO_REF_TIPO_CODE, USUA_ID)
                    res = GenerarTablaDocumentos(dt)

                Case "3" 'REGISTRAR NOTA DE DÉBITO
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim array As Array
                    'TO DO SCSL EXONERADA
                    array = caNotaDebito.CrearNotaDebito(p_CTLG_CODE, p_SCSL_CODE, p_PERS_PIDM, Utilities.fechaLocal(p_FECHA_EMISION),
                                                         p_NUM_SERIE, p_NUM_DCTO, p_MOTIVO_CODE, p_MOTIVO_DESC, p_MOTIVO_ADICIONAL, p_MONE_CODE, p_TIPO_IND,
                                                         p_IMPORTE_EXO, p_IMPORTE_INA, p_IMPORTE_GRA, p_IGV, p_IMPORTE_TOTAL, p_PCTJ_IGV, USUA_ID, p_SCSL_EXONERADA_IND,
                                                         p_DCTO_REF_CODE, p_DCTO_REF_TIPO_CODE, p_CODIGO_CORRELATIVO, p_DETALLES, p_MES, p_ANIO)

                    If Not (array Is Nothing) Then
                        resb.Append("[{")
                        resb.Append("""CODIGO"" :" & """" & array(0).ToString & """,")
                        resb.Append("""SERIE_NRO"" :" & """" & array(1).ToString & """,")
                        resb.Append("""RESPUESTA"" :" & """" & array(2).ToString & """")
                        resb.Append("}]")
                    End If
                    res = resb.ToString()

                Case "4" 'LISTAR NOTA DE DÉBITO ( JSON )
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = caNotaDebito.ListarNotaDebito(If(p_CODE Is Nothing, "", p_CODE), If(p_CTLG_CODE Is Nothing, "", p_CTLG_CODE),
                                                       If(p_SCSL_CODE Is Nothing, "", p_SCSL_CODE), If(p_PERS_PIDM Is Nothing, "", p_PERS_PIDM), If(p_TIPO_IND Is Nothing, "", p_TIPO_IND))
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""CTLG_CODE"" :" & """" & row("CTLG_CODE").ToString & """,")
                            resb.Append("""SCSL_CODE"" :" & """" & row("SCSL_CODE").ToString & """,")
                            resb.Append("""EMISION"":{""display"":""" & row("EMISION").ToString & """,""order"":""" & String.Join("", row("EMISION").ToString.Split("/").Reverse()) & """},")
                            resb.Append("""TRANSACCION"":{""display"":""" & row("TRANSACCION").ToString & """,""order"":""" & ObtenerFecha(row("TRANSACCION")) & """},")
                            resb.Append("""TIPO_IND"" :" & """" & row("TIPO_IND").ToString & """,")
                            resb.Append("""SERIE"" :" & """" & row("SERIE").ToString & """,")
                            resb.Append("""NUMERO"" :" & """" & row("NUMERO").ToString & """,")
                            resb.Append("""MONE_CODE"" :" & """" & row("MONE_CODE").ToString & """,")
                            resb.Append("""MONEDA_SIMBOLO"" :" & """" & row("MONEDA_SIMBOLO").ToString & """,")
                            resb.Append("""MONEDA"" :" & """" & row("MONEDA").ToString & """,")
                            resb.Append("""MOTIVO_CODE"" :" & """" & row("MOTIVO_CODE").ToString & """,")
                            resb.Append("""MOTIVO_DESC"" :" & """" & row("MOTIVO_DESC").ToString & """,")
                            resb.Append("""MOTIVO_ADICIONAL"" :" & """" & row("MOTIVO_ADICIONAL").ToString & """,")
                            resb.Append("""IMPORTE_EXO"" :" & """" & row("IMPORTE_EXO").ToString & """,")
                            resb.Append("""IMPORTE_INA"" :" & """" & row("IMPORTE_INA").ToString & """,")
                            resb.Append("""IMPORTE_GRA"" :" & """" & row("IMPORTE_GRA").ToString & """,")
                            resb.Append("""IMPORTE_TOTAL"" :" & """" & row("IMPORTE_TOTAL").ToString & """,")
                            resb.Append("""IGV"" :" & """" & row("IGV").ToString & """,")
                            resb.Append("""PCTJ_IGV"" :" & """" & row("PCTJ_IGV").ToString & """,")
                            resb.Append("""DOCUMENTO"" :" & """" & row("DOCUMENTO").ToString & """,")
                            resb.Append("""DOCUMENTO_REF"" :" & """" & row("DOCUMENTO_REF").ToString & """,")
                            resb.Append("""DCTO_REF_CODE"" :" & """" & row("DCTO_REF_CODE").ToString & """,")
                            resb.Append("""DCTO_REF_SERIE"" :" & """" & row("DCTO_REF_SERIE").ToString & """,")
                            resb.Append("""DCTO_REF_NRO"" :" & """" & row("DCTO_REF_NRO").ToString & """,")
                            resb.Append("""DCTO_REF_TIPO_CODE"" :" & """" & row("DCTO_REF_TIPO_CODE").ToString & """,")
                            resb.Append("""EMISION_REF"" :" & """" & row("EMISION_REF").ToString & """,")
                            resb.Append("""RAZON_SOCIAL"" :" & """" & row("RAZON_SOCIAL").ToString & """,")
                            resb.Append("""PIDM"" :" & """" & row("PIDM").ToString & """,")
                            resb.Append("""PAGADO"" :" & """" & row("PAGADO").ToString & """,")
                            resb.Append("""PAGADO_IND"" :" & """" & row("PAGADO_IND").ToString & """,")
                            resb.Append("""SCSL_EXONERADA_IND"" :" & """" & row("SCSL_EXONERADA_IND").ToString & """,")
                            resb.Append("""FECHA_PAGO"" :" & """" & row("FECHA_PAGO").ToString & """,")
                            resb.Append("""USUA_ID"" :" & """" & row("USUA_ID").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "5" 'LISTAR DETALLES NOTA DE DÉBITO ( JSON )
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = caNotaDebito.ListarDetalleNotaDebito(If(p_CODE Is Nothing, "", p_CODE), If(p_ITEM Is Nothing, "", p_ITEM))
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""CTLG_CODE"" :" & """" & row("CTLG_CODE").ToString & """,")
                            resb.Append("""SCSL_CODE"" :" & """" & row("SCSL_CODE").ToString & """,")
                            resb.Append("""ITEM"" :" & """" & row("ITEM").ToString & """,")
                            resb.Append("""DESC"" :" & """" & row("DESC_ITEM").ToString & """,")
                            resb.Append("""CANT"" :" & """" & row("CANTIDAD").ToString & """,")
                            resb.Append("""UNME_CODE"" :" & """" & row("UNME_CODE").ToString & """,")
                            resb.Append("""UNME"" :" & """" & row("UNME_DESC").ToString & """,")
                            resb.Append("""PREC_SIN_IGV"" :" & """" & row("VALOR_UNITARIO").ToString & """,")
                            resb.Append("""PREC_VENTA_UNITARIO"" :" & """" & row("PRECIO_VENTA_UNITARIO").ToString & """,")
                            resb.Append("""AFEC"" :" & """" & row("AFECTACION_IGV").ToString & """,")
                            resb.Append("""IGV"" :" & """" & row("IGV").ToString & """,")
                            resb.Append("""SUBT_SIN_IGV"" :" & """" & row("VALOR_VENTA").ToString & """,")
                            resb.Append("""MCDR_CODE"" :" & """" & row("MCDR_CODE").ToString & """,")
                            resb.Append("""PROD_CODE"" :" & """" & row("PROD_CODE").ToString & """,")
                            resb.Append("""PCTJ_IGV"" :" & """" & row("PCTJ_IGV").ToString & """,")
                            resb.Append("""ESTADO_IND"" :" & """" & row("ESTADO_IND").ToString & """,")
                            resb.Append("""FECHA_ACTV"" :" & """" & row("FECHA_ACTV").ToString & """,")
                            resb.Append("""USUA_ID"" :" & """" & row("USUA_ID").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case Else

            End Select

            context.Response.Write(res)

        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try

    End Sub

    'TABLA DE BÚSQUEDA DE DOCUMENTOS    
    'Tabla de busqueda de documentos    
    Public Function GenerarTablaDocumentos(ByVal dtDocumentoCompraVenta As DataTable) As String

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

                    If dt.Rows(i)("NOTA_CREDITO_IND").ToString = "N" Then
                        Dim continuar As Boolean = False
                        If p_FECHA_EMISION <> "" And dt.Rows(i)("EMISION").ToString() <> "" Then
                            Dim fechaConsultada As Integer = Integer.Parse(ObtenerFecha(p_FECHA_EMISION))
                            Dim fechaEvaluar As Integer = Integer.Parse(ObtenerFecha(dt.Rows(i)("EMISION").ToString()))
                            If fechaConsultada >= fechaEvaluar Then
                                continuar = True
                            End If
                        End If
                        If continuar Then
                            Dim serie_numero As String() = dt.Rows(i)("NUM_DCTO").ToString().Split(New Char() {"-"})
                            Dim fechaEmision As String = If(dt.Rows(i)("EMISION").ToString() = "", "", dt.Rows(i)("EMISION").ToString().Substring(0, 10))
                            resb.AppendFormat("<tr class='doc_fila' onclick=""setSeleccionDocumento('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}')"" id='doc_fila_{0}_{1}'>",
                                              dt.Rows(i)("CODIGO").ToString(), dt.Rows(i)("SECUENCIA").ToString(), serie_numero(0), serie_numero(1), dt.Rows(i)("TIPO_DCTO").ToString(), dt.Rows(i)("IMPORTE").ToString(), dt.Rows(i)("MONEDA").ToString(), dt.Rows(i)("SIMBOLO_MONEDA").ToString(), dt.Rows(i)("INC_IGV_IND").ToString(), fechaEmision, Double.Parse(dt.Rows(i)("IMPORTE_PAGAR").ToString) - Double.Parse(dt.Rows(i)("PERCEPCION").ToString), Double.Parse(dt.Rows(i)("MONTO_SIN_NOTAS").ToString), dt.Rows(i)("NOTA_CREDITO_IND"))
                            resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODIGO").ToString())
                            resb.AppendFormat("<td align='center' >{0}</td>", serie_numero(0))
                            resb.AppendFormat("<td align='center' >{0}</td>", serie_numero(1))
                            resb.AppendFormat("<td align='center' >{0}</td>", fechaEmision)
                            resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DESC_DCTO").ToString())
                            resb.Append("</tr>")
                        End If
                    End If
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