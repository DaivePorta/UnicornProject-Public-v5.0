﻿<%@ WebHandler Language="VB" Class="CPLGHIS" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CPLGHIS : Implements IHttpHandler
    
    Dim OPCION, p_CTLG_CODE, p_USUA_ID, p_PIDM, p_DESDE, p_HASTA As String
    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array
 
    Dim cpPagosDiversos As New Nomade.CP.CPPagosDiversos("Bn")
    Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
    Dim glLetras As New Nomade.GL.GLLetras("Bn")
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        OPCION = context.Request("OPCION")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_PIDM = context.Request("p_PIDM")
        p_DESDE = context.Request("p_DESDE")
        p_HASTA = context.Request("p_HASTA")
        
        Try
        
            Select Case OPCION
                Case "0" 'lista empresas
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncEmpresa.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "1" 'REPORTE DE CUENTAS DIVERSAS POR PERSONA HISTORICO 
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = cpPagosDiversos.ListarCuentasDiversasPorPersonaHistorico(p_CTLG_CODE, p_PIDM, Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA), "")
                    res = GenerarTablaCuentaPorPagar(dt)
            End Select
            context.Response.Write(res)
            
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub
    
    Public Function GenerarTablaCuentaPorPagar(ByVal dt As DataTable) As String
        Dim totalBase As Decimal = 0
        Dim totalAlterna As Decimal = 0
        res = ""
        resb.Clear()
        
        Dim fechaTipoCambio As String = ""
        Dim valorTipoCambio As String = ""
        Dim dtMonedas As New DataTable
        dtMonedas = glLetras.ListarMoneda(p_CTLG_CODE)
        Dim descMonedaBase As String = ""
        Dim descMonedaAlterna As String = ""
        Dim simbMonedaBase As String = ""
        Dim simbMonedaAlterna As String = ""
        For Each row In dtMonedas.Rows
            If row("TIPO") = "MOBA" Then
                descMonedaBase = row("DESC_CORTA")
                simbMonedaBase = row("SIMBOLO")
            Else
                descMonedaAlterna = row("DESC_CORTA")
                simbMonedaAlterna = row("SIMBOLO")
            End If
        Next
        
        
        Dim retrasoAcumulado As Decimal = 0
        Dim retrasoPromedio As Decimal = 0
        '------
        resb.AppendFormat("<table id=""tblCuentasPorPagar"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th>FECHA <br/>EMISIÓN</th>")
        resb.AppendFormat("<th>DOCUMENTO</th>")
        resb.AppendFormat("<th>MONEDA</th>")
        resb.AppendFormat("<th>MONTO</th>")
        resb.AppendFormat("<th>TIPO CAMBIO</th>")
        resb.AppendFormat("<th>FECHA <br/>VENCIMIENTO</th>")
        resb.AppendFormat("<th>ATRASO</th>")
        resb.AppendFormat("<th>PAGADO</th>")
        resb.AppendFormat("<th>FECHA <br/>PAGO</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")
                                 
        If (dt Is Nothing) Then
            'No hay datos
            fechaTipoCambio = "-"
            valorTipoCambio = "-"
        Else
            fechaTipoCambio = dt.Rows(0)("FECHA_TIPO_CAMBIO")
            valorTipoCambio = dt.Rows(0)("VALOR_TIPO_CAMBIO")
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td align='center' data-order='{1}'>{0}</td>", If(dt.Rows(i)("EMISION").ToString() = "", "", dt.Rows(i)("EMISION").ToString().Substring(0, 10)), ObtenerFecha(dt.Rows(i)("EMISION").ToString))
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DOCUMENTO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MONEDA").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("MONTO").ToString())))
                resb.AppendFormat("<td align='center' >{0}</td>", If(dt.Rows(i)("VALOR_CAMBIO_DCTO").ToString() = "", "", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("VALOR_CAMBIO_DCTO").ToString()))))
                resb.AppendFormat("<td align='center' data-order='{1}'>{0}</td>", If(dt.Rows(i)("VENCIMIENTO").ToString() = "", "", dt.Rows(i)("VENCIMIENTO").ToString().Substring(0, 10)), ObtenerFecha(dt.Rows(i)("VENCIMIENTO").ToString))
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DIAS_RETRASO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("PAGADO").ToString())
                resb.AppendFormat("<td align='center' data-order='{1}'>{0}</td>", If(dt.Rows(i)("FECHA_PAGO").ToString() = "", "", dt.Rows(i)("FECHA_PAGO").ToString().Substring(0, 10)), ObtenerFecha(dt.Rows(i)("FECHA_PAGO").ToString))
                resb.AppendFormat("</tr>")
                
                If dt.Rows(i)("MONEDA").ToString() = descMonedaBase Then
                    totalBase += Decimal.Parse(dt.Rows(i)("MONTO").ToString())
                Else
                    totalAlterna += Decimal.Parse(dt.Rows(i)("MONTO").ToString())
                End If
                
                retrasoAcumulado += Decimal.Parse(dt.Rows(i)("DIAS_RETRASO").ToString())
            Next
            retrasoPromedio = retrasoAcumulado / dt.Rows.Count
            
        End If
        
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        resb.AppendFormat("<input id='hfRetrasoPromedio' value='{0}' type='hidden' />", String.Format("{0:#,###}", retrasoPromedio))
        'TotalCuentasPorPagar
        resb.AppendFormat("<input id='hfTotalBase' value='{0}' type='hidden' />", String.Format("{0:#,##0.00}", totalBase))
        resb.AppendFormat("<input id='hfTotalAlterna' value='{0}' type='hidden' />", String.Format("{0:#,##0.00}", totalAlterna))
        'Datos de moneda  
        resb.AppendFormat("<input id='hfDescMonedaBase' value='{0}' type='hidden' />", descMonedaBase)
        resb.AppendFormat("<input id='hfDescMonedaAlterna' value='{0}' type='hidden' />", descMonedaAlterna)
        resb.AppendFormat("<input id='hfSimbMonedaBase' value='{0}' type='hidden' />", simbMonedaBase)
        resb.AppendFormat("<input id='hfSimbMonedaAlterna' value='{0}' type='hidden' />", simbMonedaAlterna)
        'Datos de tipo de cambio
        resb.AppendFormat("<input id='hfFechaTipoCambio' value='{0}' type='hidden' />", fechaTipoCambio)
        resb.AppendFormat("<input id='hfValorTipoCambio' value='{0} {1}' type='hidden' />", simbMonedaBase, valorTipoCambio)
        res = resb.ToString()
        Return res
    End Function
    
    Function ObtenerFecha(ByVal fecha As String) As String
        If fecha <> "" Then
            Dim dia = fecha.Split(" ")(0).Split("/")(0)
            Dim mes = fecha.Split(" ")(0).Split("/")(1)
            Dim anio = fecha.Split(" ")(0).Split("/")(2)
            If dia.Length = 1 Then
                dia = "0" + dia
            End If
            If mes.Length = 1 Then
                mes = "0" + mes
            End If
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
        End If
        Return fecha
    End Function
    
    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class