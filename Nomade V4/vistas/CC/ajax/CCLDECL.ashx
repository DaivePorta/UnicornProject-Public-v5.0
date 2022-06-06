<%@ WebHandler Language="VB" Class="CCLDECL" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CCLDECL : Implements IHttpHandler
    
    Dim OPCION, p_CTLG_CODE, p_USUA_ID, p_PROV_PIDM As String
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
        p_USUA_ID = context.Request("p_USUA_ID")
        p_PROV_PIDM = context.Request("p_PROV_PIDM")
              
        
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
                Case "1" 'lista reporte de deudas de cliente , para el caso de letras: muestra las letras no pagadas, pero que se han canjeado
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = ccCuentaPorCobrar.ListarDeudasDeCliente(p_CTLG_CODE, "N", "A", p_PROV_PIDM)
                    res = GenerarTablaDeudasDeClientes(dt)
            End Select
            context.Response.Write(res)
            
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub
    
    Public Function GenerarTablaDeudasDeClientes(ByVal dt As DataTable) As String
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
        
        resb.AppendFormat("<table id=""tblCuentasPorCobrar"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th>TABLA</th>")
        resb.AppendFormat("<th>CODIGO</th>")
        resb.AppendFormat("<th>DOCUMENTO</th>")
        resb.AppendFormat("<th>FECHA<br/>EMISIÓN</th>")
        resb.AppendFormat("<th>IMPORTE<br/> " + descMonedaBase + "</th>")
        resb.AppendFormat("<th>IMPORTE<br/> " + descMonedaAlterna + "</th>")
        resb.AppendFormat("<th>AMORTIZADO<br/> " + descMonedaBase + "</th>")
        resb.AppendFormat("<th>AMORTIZADO<br/> " + descMonedaAlterna + "</th>")
        resb.AppendFormat("<th>POR PAGAR<br/> " + descMonedaBase + "</th>")
        resb.AppendFormat("<th>POR PAGAR<br/> " + descMonedaAlterna + "</th>")
        resb.AppendFormat("<th>PAGADO</th>")
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
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODIGO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DOCUMENTO").ToString())
                resb.AppendFormat("<td align='center' data-order='{1}'>{0}</td>", If(dt.Rows(i)("FECHA_EMISION").ToString() = "", "", dt.Rows(i)("FECHA_EMISION").ToString().Substring(0, 10)), ObtenerFecha(dt.Rows(i)("FECHA_EMISION").ToString()))
                resb.AppendFormat("<td align='center' >{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_MONE_BASE").ToString())))
                resb.AppendFormat("<td align='center' >{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_MONE_ALTER").ToString())))
                resb.AppendFormat("<td align='center' >{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("AMORTIZADO_MONE_BASE").ToString())))
                resb.AppendFormat("<td align='center' >{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("AMORTIZADO_MONE_ALTER").ToString())))
                resb.AppendFormat("<td align='center' >{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("POR_PAGAR_BASE").ToString())))
                resb.AppendFormat("<td align='center' >{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("POR_PAGAR_ALTER").ToString())))
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("PAGADO").ToString())
                resb.AppendFormat("</tr>")
            Next
        End If
        
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
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