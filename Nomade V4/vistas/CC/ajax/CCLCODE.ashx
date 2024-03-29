﻿<%@ WebHandler Language="VB" Class="CCLCODE" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CCLCODE : Implements IHttpHandler

    Dim OPCION, p_CTLG_CODE, p_SCSL_CODE, p_HASTA, p_USUA_ID As String
    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Dim ccCuentaPorCobrar As New Nomade.CC.CCCuentaPorCobrar("Bn")
    Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
    Dim glLetras As New Nomade.GL.GLLetras("Bn")

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        p_USUA_ID = context.Request("p_USUA_ID")
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
                Case "1" 'reporte de cuentas por cobrar detallado
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = ccCuentaPorCobrar.ListarCuentasPorCobrarDetallado(p_CTLG_CODE, p_SCSL_CODE, Utilities.fechaLocal(p_HASTA))
                    res = GenerarTablaCuentaPorCobrarDetallado(dt)

            End Select
            context.Response.Write(res)

        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub

    Public Function GenerarTablaCuentaPorCobrarDetallado(ByVal dt As DataTable) As String

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

        '------
        resb.AppendFormat("<table id=""tblCuentasPorCobrar"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th>DOCUMENTO</th>")
        resb.AppendFormat("<th>CLIENTE</th>")
        resb.AppendFormat("<th>RESPONSABLE DE PAGO</th>")
        resb.AppendFormat("<th>SUCURSAL</th>")
        resb.AppendFormat("<th>TIPO DOCUMENTO</th>")
        resb.AppendFormat("<th>DOCUMENTO</th>")
        resb.AppendFormat("<th>FECHA EMISIÓN</th>")
        resb.AppendFormat("<th>FECHA VENCIMIENTO</th>")
        resb.AppendFormat("<th>MONTO {0}</th>", descMonedaBase)
        resb.AppendFormat("<th>AMORTIZACIÓN {0}</th>", descMonedaBase)
        resb.AppendFormat("<th>DEUDA {0}</th>", descMonedaBase)
        resb.AppendFormat("<th>MONTO {0}</th>", descMonedaAlterna)
        resb.AppendFormat("<th>AMORTIZACIÓN {0}</th>", descMonedaAlterna)
        resb.AppendFormat("<th>DEUDA {0}</th>", descMonedaAlterna)
        resb.AppendFormat("<th>DÍAS CRÉDITO</th>")
        resb.AppendFormat("<th>DÍAS VENCIDO</th>")
        resb.AppendFormat("<th>GLOSA</th>")
        resb.AppendFormat("<th>VENDEDOR</th>")
        resb.AppendFormat("<th>CTA. CONTABLE</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        If (dt Is Nothing) Then
            'No hay datos
            'fechaTipoCambio = "-"
            valorTipoCambio = "-"
        Else
            'fechaTipoCambio = dt.Rows(0)("FECHA_TIPO_CAMBIO")
            valorTipoCambio = dt.Rows(0)("VALOR_TIPO_CAMBIO")
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("NRO_DOC").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("RAZON_SOCIAL").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("RESP_PAGO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DESC_SUCURSAL").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DESC_DCTO").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("DOCUMENTO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("FECHA_EMISION").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("FECHA_VENCIMIENTO").ToString())
                resb.AppendFormat("<td align='right' >{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_SOL").ToString())))
                resb.AppendFormat("<td align='right' >{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("AMOR_SOL").ToString())))
                resb.AppendFormat("<td align='right' >{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("DEUDA_SOLES").ToString())))
                resb.AppendFormat("<td align='right' >{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_DOL").ToString())))
                resb.AppendFormat("<td align='right' >{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("AMOR_DOL").ToString())))
                resb.AppendFormat("<td align='right' >{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("DEUDA_DOLARES").ToString())))
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DIAS_CREDITO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DIAS_VENCIDOS").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("GLOSA_VENTA").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("VENDEDOR").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("CTA_CONTABLE").ToString())
                resb.AppendFormat("</tr>")
                totalBase += Decimal.Parse(dt.Rows(i)("DEUDA_SOLES").ToString())
                totalAlterna += Decimal.Parse(dt.Rows(i)("DEUDA_DOLARES").ToString())

            Next
        End If

        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        'TotalCuentasPorCobrar
        resb.AppendFormat("<input id='hfTotalBase' value='{0}' type='hidden' />", String.Format("{0:#,##0.00}", totalBase))
        resb.AppendFormat("<input id='hfTotalAlterna' value='{0}' type='hidden' />", String.Format("{0:#,##0.00}", totalAlterna))
        'Datos de moneda  
        resb.AppendFormat("<input id='hfDescMonedaBase' value='{0}' type='hidden' />", descMonedaBase)
        resb.AppendFormat("<input id='hfDescMonedaAlterna' value='{0}' type='hidden' />", descMonedaAlterna)
        resb.AppendFormat("<input id='hfSimbMonedaBase' value='{0}' type='hidden' />", simbMonedaBase)
        resb.AppendFormat("<input id='hfSimbMonedaAlterna' value='{0}' type='hidden' />", simbMonedaAlterna)
        'Datos de tipo de cambio
        'resb.AppendFormat("<input id='hfFechaTipoCambio' value='{0}' type='hidden' />", fechaTipoCambio)
        resb.AppendFormat("<input id='hfValorTipoCambio' value='{0} {1}' type='hidden' />", simbMonedaBase, valorTipoCambio)
        res = resb.ToString()
        Return res
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