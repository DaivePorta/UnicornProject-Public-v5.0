<%@ WebHandler Language="VB" Class="CCLRCCL" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CCLRCCL : Implements IHttpHandler

    Dim OPCION, p_CTLG_CODE, p_SCSL_CODE, p_USUA_ID, p_CLIE_PIDM, p_DESDE, p_HASTA As String
    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Dim ccCuentaPorCobrar As New NOMADE.CC.CCCuentaPorCobrar("Bn")
    Dim ncEmpresa As New NOMADE.NC.NCEmpresa("Bn")
    Dim glLetras As New NOMADE.GL.GLLetras("Bn")

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_CLIE_PIDM = context.Request("p_CLIE_PIDM")


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
                Case "1" 'reporte de cuentas por cobrar
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = ccCuentaPorCobrar.ListarCuentasPorCobrarPorCliente(p_CTLG_CODE, p_SCSL_CODE, p_CLIE_PIDM, Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA), "N")
                    res = GenerarTablaCuentaPorCobrar(dt)

            End Select
            context.Response.Write(res)

        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub

    Public Function GenerarTablaCuentaPorCobrar(ByVal dt As DataTable) As String

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
        resb.AppendFormat("<th>TABLA</th>")
        resb.AppendFormat("<th>CODIGO_REF</th>")
        resb.AppendFormat("<th>DOCUMENTO</th>")
        resb.AppendFormat("<th>RAZON SOCIAL</th>")
        resb.AppendFormat("<th>DOC. ID</th>")
        resb.AppendFormat("<th>FECHA<br/>EMISIÓN</th>")
        resb.AppendFormat("<th>FECHA<br/>VENCIMIENTO</th>")
        resb.AppendFormat("<th>MONTO {0}</th>", descMonedaBase)
        resb.AppendFormat("<th>MONTO {0}</th>", descMonedaAlterna)
        resb.AppendFormat("<th>GLOSA</th>")
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
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TABLA").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODIGO_REF").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DOCUMENTO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RAZON_SOCIAL").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DOCUMENTO_ID").ToString())
                resb.AppendFormat("<td align='center' data-order='{1}'>{0}</td>", If(dt.Rows(i)("EMISION").ToString() = "", "", dt.Rows(i)("EMISION").ToString().Substring(0, 10)), ObtenerFecha(dt.Rows(i)("EMISION").ToString()))
                resb.AppendFormat("<td align='center' data-order='{1}'>{0}</td>", If(dt.Rows(i)("VENCIMIENTO").ToString() = "", "", dt.Rows(i)("VENCIMIENTO").ToString().Substring(0, 10)), ObtenerFecha(dt.Rows(i)("VENCIMIENTO").ToString()))
                resb.AppendFormat("<td align='center' >{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_SOLES").ToString())))
                resb.AppendFormat("<td align='center' >{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_DOLARES").ToString())))
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("GLOSA").ToString())
                resb.AppendFormat("</tr>")
                totalBase += Decimal.Parse(dt.Rows(i)("MONTO_SOLES").ToString())
                totalAlterna += Decimal.Parse(dt.Rows(i)("MONTO_DOLARES").ToString())
            Next
        End If

        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
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

    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
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

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class