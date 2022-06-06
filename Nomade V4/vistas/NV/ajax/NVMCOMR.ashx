<%@ WebHandler Language="VB" Class="NVMCOMR" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NVMCOMR : Implements IHttpHandler

    Dim OPCION As String

    Dim p_CODE, p_TIPO, p_CTLG_CODE, p_USUA_ID, p_PIDM_EMISOR, p_DESDE, p_HASTA, p_PERIODO_ANIO, p_PERIODO_MES As String
    Dim p_SERIE, p_NRO, p_COD_AUT, p_FECHA_EMISION, p_AGENTE_RETEN_IND, p_DCTO_ORIGEN_CODE, MONEDA_CODE, TIPO_CAMBIO, p_TOTAL, p_DOCS_ORIGEN, p_AJUSTE As String

    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Dim ncComprobanteRetencion As New Nomade.NC.NCComprobanteRetencion("Bn")
    Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
    Dim glLetras As New Nomade.GL.GLLetras("Bn")

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")

        p_CODE = context.Request("p_CODE")
        p_TIPO = context.Request("p_TIPO")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_USUA_ID = context.User.Identity.Name
        p_PIDM_EMISOR = context.Request("p_PIDM")
        p_DESDE = context.Request("p_DESDE")
        p_HASTA = context.Request("p_HASTA")
        p_PERIODO_ANIO = context.Request("p_PERIODO_ANIO")
        p_PERIODO_MES = context.Request("p_PERIODO_MES")
        p_SERIE = context.Request("p_SERIE")
        p_NRO = context.Request("p_NRO")
        p_COD_AUT = context.Request("p_COD_AUT")
        p_FECHA_EMISION = context.Request("p_FECHA_EMISION")
        p_DCTO_ORIGEN_CODE = context.Request("p_DCTO_ORIGEN_CODE")
        MONEDA_CODE = context.Request("MONEDA_CODE")
        TIPO_CAMBIO = context.Request("TIPO_CAMBIO")
        p_AGENTE_RETEN_IND = context.Request("p_AGENTE_RETEN_IND")
        p_TOTAL = context.Request("p_TOTAL")
        p_DOCS_ORIGEN = context.Request("p_DOCS_ORIGEN")
        p_AJUSTE = context.Request("p_AJUSTE")

        Try

            Select Case OPCION
                Case "0" 'LISTA DE COMPROBANTES DE RETENCION - JSON
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncComprobanteRetencion.ListarComprobanteRetencion(If(p_CODE Is Nothing, "", p_CODE), p_CTLG_CODE, p_TIPO,
                                                                           If(p_PIDM_EMISOR Is Nothing, "", p_PIDM_EMISOR),
                                                                           p_PERIODO_ANIO, p_PERIODO_MES,
                                                                           Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA))

                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""CTLG_CODE"" :" & """" & row("CTLG_CODE").ToString & """,")
                            resb.Append("""EMISION"":{""display"":""" & row("EMISION").ToString & """,""order"":""" & String.Join("", row("EMISION").ToString.Split("/").Reverse()) & """},")
                            resb.Append("""TRANSACCION"":{""display"":""" & row("TRANSACCION").ToString & """,""order"":""" & ObtenerFecha(row("TRANSACCION")) & """},")
                            resb.Append("""TIPO_IND"" :" & """" & row("TIPO_IND").ToString & """,")
                            resb.Append("""SERIE"" :" & """" & row("SERIE").ToString & """,")
                            resb.Append("""NUMERO"" :" & """" & row("NUMERO").ToString & """,")
                            resb.Append("""MONE_CODE"" :" & """" & row("MONE_CODE").ToString & """,")
                            resb.Append("""MONEDA_SIMBOLO"" :" & """" & row("MONEDA_SIMBOLO").ToString & """,")
                            resb.Append("""MONEDA"" :" & """" & row("MONEDA").ToString & """,")
                            resb.Append("""USUA_ID"" :" & """" & row("USUA_ID").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "1" 'LISTA DE COMPROBANTES DE RETENCION
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncComprobanteRetencion.ListarComprobanteRetencion(If(p_CODE Is Nothing, "", p_CODE), p_CTLG_CODE, p_TIPO,
                                                                              If(p_PIDM_EMISOR Is Nothing, "", p_PIDM_EMISOR),
                                                                              p_PERIODO_ANIO, p_PERIODO_MES,
                                                                              Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA))

                    If Not dt Is Nothing Then

                        res = Utilities.Datatable2Json(dt) 'GenerarTablaDocumento(dt)
                    Else
                        res = "[]"

                    End If

                    'res = GenerarTablaComprobantesRetencion(dt)

                Case "2" 'LISTA DE DCTOS (COMPRA VENTA) SIN COMPROBANTE DE RETENCION
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = ncComprobanteRetencion.ListarDctosSinComprobanteRetencion(p_CTLG_CODE, p_TIPO, p_PERIODO_ANIO, p_PERIODO_MES, IIf(p_PIDM_EMISOR = Nothing, "", p_PIDM_EMISOR))
                    res = GenerarTablaBuscarDcto(dt)

                Case "3" 'CREAR COMPROBANTE DE RETENCION                    
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim array As Array
                    'TO DO SCSL EXONERADA
                    array = ncComprobanteRetencion.CrearComprobanteRetencion(p_CTLG_CODE, p_TIPO, p_PIDM_EMISOR, p_PERIODO_ANIO, p_PERIODO_MES,
                                                                             p_SERIE, p_NRO, Utilities.fechaLocal(p_FECHA_EMISION), p_USUA_ID, p_TOTAL, p_DOCS_ORIGEN, IIf(p_AJUSTE = "", "0", p_AJUSTE))

                    If Not (array Is Nothing) Then
                        resb.Append("[{")
                        resb.Append("""CODIGO"" :" & """" & array(0).ToString & """,")
                        resb.Append("""SERIE_NRO"" :" & """" & array(1).ToString & """,")
                        resb.Append("""RESPUESTA"" :" & """" & array(2).ToString & """")
                        resb.Append("}]")
                    End If
                    res = resb.ToString()
                Case "TICA" 'lista tipo de cambio
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim mone As New Nomade.NC.NCMonedas("Bn")
                    Dim p As New Nomade.NC.NCParametros("Bn")
                    Dim dt_valor As New DataTable
                    dt_valor = p.ListarParametros(MONEDA_CODE, String.Empty)
                    dt = mone.dame_valor_monetario_cambio(dt_valor(0)("VALOR").ToString, Convert.ToDateTime(p_FECHA_EMISION).ToString("yyyy/MM/dd"), TIPO_CAMBIO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""FECHA_VIGENTE"" :" & """" & Convert.ToDateTime(MiDataRow("FECHA_VIGENTE")).ToString("yyyy/MM/dd") & """,")
                            resb.Append("""VALOR_CAMBIO_VENTA"" :" & """" & MiDataRow("VALOR_CAMBIO_VENTA").ToString & """,")
                            resb.Append("""TIPO_CAMBIO"" :" & """" & MiDataRow("TIPO_CAMBIO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    Else
                        resb.Append("[")

                        resb.Append("{")
                        resb.Append("""FECHA_VIGENTE"" :"""",")
                        resb.Append("""VALOR_CAMBIO_VENTA"" :"""",")
                        resb.Append("""TIPO_CAMBIO"" :""""")

                        resb.Append("}")
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "4" 'LISTA PERSONAS
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim ncPersona As New Nomade.NC.NCPersona("Bn")
                    dt = ncPersona.listar_Persona("N", "", IIf(p_AGENTE_RETEN_IND = Nothing, "", p_AGENTE_RETEN_IND))
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "NOMBRE", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""ID"" :" & """" & MiDataRow("ID").ToString & """,")
                            resb.Append("""RAZON_SOCIAL"" :" & """" & MiDataRow("NOMBRE").ToString & """,")
                            resb.Append("""TIPO_DOCUMENTO"" :" & """" & MiDataRow("TIPO_DOCUMENTO").ToString & """,")
                            resb.Append("""NRO_DOCUMENTO"" :" & """" & MiDataRow("NRO_DOCUMENTO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "5" 'LISTA DE COMPROBANTES DE RETENCION DETALLE
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncComprobanteRetencion.ListarComprobanteRetencionDetalles(If(p_CODE Is Nothing, "", p_CODE))

                    If Not dt Is Nothing Then

                        res = Utilities.Datatable2Json(dt) 'GenerarTablaDocumento(dt)
                    Else
                        res = "[]"

                    End If

            End Select
            context.Response.Write(res)

        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub


    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function


    Public Function GenerarTablaBuscarDcto(ByVal dt As DataTable) As String

        res = ""
        resb.Clear()

        '------
        resb.AppendFormat("<table id=""tblBuscarDcto"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th>CODIGO</th>")
        resb.AppendFormat("<th>SERIE</th>")
        resb.AppendFormat("<th>NRO</th>")
        resb.AppendFormat("<th>TIPO_DCTO</th>")
        resb.AppendFormat("<th>RAZÓN SOCIAL</th>")
        resb.AppendFormat("<th>EMISION</th>")
        resb.AppendFormat("<th>DOCUMENTO</th>")
        resb.AppendFormat("<th>MONEDA</th>")
        resb.AppendFormat("<th>MONTO RETENCION</th>")
        resb.AppendFormat("<th>MONEDA_CODE</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")
        If not (dt Is Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODIGO").ToString()) '0
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("SERIE").ToString()) '1
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NRO").ToString()) '2
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_DCTO").ToString()) '3
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RAZON_SOCIAL").ToString()) '4
                resb.AppendFormat("<td align='center' data-order='{1}' >{0}</td>", If(dt.Rows(i)("EMISION").ToString() = "", "", dt.Rows(i)("EMISION").ToString().Substring(0, 10)), ObtenerFecha(dt.Rows(i)("EMISION").ToString)) '5
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DOCUMENTO").ToString()) '6
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MONEDA_DESC_CORTA").ToString()) '7
                resb.AppendFormat("<td align='center' >{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_RETENCION").ToString()))) '8
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MONEDA").ToString()) '9                
                resb.AppendFormat("</tr>")
            Next
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")

        res = resb.ToString()
        Return res
    End Function



    Public Function GenerarTablaComprobantesRetencion(ByVal dt As DataTable) As String

        res = ""
        resb.Clear()

        '------
        resb.AppendFormat("<table id=""tblDatos"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th></th>")
        resb.AppendFormat("<th>RUC</th>")
        resb.AppendFormat("<th>NOMBRE O RAZÓN SOCIAL</th>")
        resb.AppendFormat("<th>PERÍODO DECLARADO</th>")
        resb.AppendFormat("<th>FECHA COMPROBANTE</th>")
        resb.AppendFormat("<th>NRO COMPROBANTE</th>")
        'resb.AppendFormat("<th>FECHA <br/>DCTO MODIFICA</th>")
        resb.AppendFormat("<th>DCTO MODIFICA</th>")
        resb.AppendFormat("<th>MONTO TOTAL</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")
        If Not (dt Is Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td align='center' >{0}</td>", " <img src='recursos/img/details_open.png' class='detDoc' />")
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DOID_NRO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RAZON_SOCIAL").ToString())
                resb.AppendFormat("<td align='center' >{1}-{0}</td>", dt.Rows(i)("PERIODO_ANIO").ToString(), ObtenerDescMes(dt.Rows(i)("PERIODO_MES").ToString()))
                resb.AppendFormat("<td align='center' data-order='{1}' >{0}</td>", If(dt.Rows(i)("EMISION").ToString() = "", "", dt.Rows(i)("EMISION").ToString().Substring(0, 10)), ObtenerFecha(dt.Rows(i)("EMISION").ToString))
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DOCUMENTO").ToString())

                'resb.AppendFormat("<td align='center' data-order='{1}' >{0}</td>", If(dt.Rows(i)("EMISION_ORIGEN").ToString() = "", "", dt.Rows(i)("EMISION_ORIGEN").ToString().Substring(0, 10)), ObtenerFecha(dt.Rows(i)("EMISION_ORIGEN").ToString))
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DOCUMENTO_ORIGEN").ToString())
                resb.AppendFormat("<td align='center' >S/.{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_TOTAL").ToString())))
                resb.AppendFormat("</tr>")

            Next
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")

        res = resb.ToString()
        Return res
    End Function

    Function ObtenerDescMes(ByVal nroMes As String) As String
        Dim desc As String = ""

        Select Case nroMes
            Case "1"
                desc = "ENE"
            Case "2"
                desc = "FEB"
            Case "3"
                desc = "MAR"
            Case "4"
                desc = "ABR"
            Case "5"
                desc = "MAY"
            Case "6"
                desc = "JUN"
            Case "7"
                desc = "JUL"
            Case "8"
                desc = "AGO"
            Case "9"
                desc = "SEP"
            Case "10"
                desc = "OCT"
            Case "11"
                desc = "NOV"
            Case "12"
                desc = "DIC"
        End Select

        Return desc
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