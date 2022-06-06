<%@ WebHandler Language="VB" Class="CPLRGCA" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CPLRGCA : Implements IHttpHandler
    
       
    Dim OPCION As String
    Dim p_PERS_PIDM, p_CTLG_CODE, p_SCSL_CODE, p_USUA_ID As String
    Dim p_DESDE, p_HASTA As String
    Dim p_FACTURA As String
  
    Dim cpPagosDiversos As New Nomade.CP.CPPagosDiversos("Bn")
    Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
    Dim ncPersona As New Nomade.NC.NCPersona("Bn")
    Dim ncSucursal As New Nomade.NC.NCSucursal("Bn")
    Dim glLetras As New Nomade.GL.GLLetras("Bn")
    
    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        OPCION = context.Request("OPCION")
           
     
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_PERS_PIDM = context.Request("p_PERS_PIDM")
        
        p_DESDE = context.Request("p_DESDE")
        p_HASTA = context.Request("p_HASTA")
        p_FACTURA = context.Request("p_FACTURA")
        
        If p_PERS_PIDM = "" Or p_PERS_PIDM Is Nothing Then
            p_PERS_PIDM = "0"
        End If
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
                Case "1" 'lista sucursales
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncSucursal.ListarSucursal(p_CTLG_CODE, "", "A")
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
                    
                Case "2" 'LISTA PERSONAS
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncPersona.listar_Persona("S", "")
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
                    
                Case "3" 'LISTA CUENTAS DIVERSAS POR PAGAR
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = cpPagosDiversos.ListarCuentasDiversasFechas(p_CTLG_CODE, p_SCSL_CODE, Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA), p_PERS_PIDM)
                    res = GenerarTablaFacturasCompra(dt)
                    
                Case "4" 'LISTA AMORTIZACIONES DE CUENTAS DIVERSAS (detalles de filas de tabla) DESDE fabampr
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = cpPagosDiversos.ListarAmortizacionesCuentasDiversas(p_FACTURA)
                    res = GenerarTablaAmortizaciones(dt)
                    
            End Select
            
            context.Response.Write(res)
            
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
        
    End Sub
 
    'Tabla de busqueda de documentos    
    Public Function GenerarTablaFacturasCompra(ByVal dtFacturas As DataTable) As String
        
        Dim totalBase As Decimal = 0 'Deuda total en moneda base
        Dim totalAlterna As Decimal = 0 'Deuda total en moneda alterna
        Dim montoTotalBase As Decimal = 0
        Dim montoTotalAlterna As Decimal = 0
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
        resb.Append("<table id=""tblBandeja"" class=""display DTTT_selectable"" border=""0"">")
        resb.Append("<thead>")
        resb.Append("<th></th>")
        resb.Append("<th>DOCUMENTO</th>")
        resb.Append("<th>FECHA</th>")
        resb.Append("<th>MONEDA</th>")
        resb.Append("<th>MONTO</th>") ' MONTO EN MONEDA REGISTRADA
        resb.AppendFormat("<th>DEUDA {0}</th>", descMonedaBase)
        resb.AppendFormat("<th>DEUDA {0}</th>", descMonedaAlterna)
        resb.Append("<th>PAGADO</th>")
        resb.Append("</thead>")
        resb.Append("<tbody>")
        If (dt Is Nothing) Then
            fechaTipoCambio = "-"
            valorTipoCambio = "-"
        Else
            fechaTipoCambio = dt.Rows(0)("FECHA_TIPO_CAMBIO")
            valorTipoCambio = dt.Rows(0)("VALOR_TIPO_CAMBIO")
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.Append("<tr>")
                resb.AppendFormat("<td style='text-align:center;'><img id='{0}' src='recursos/img/details_open.png' /></td>", dt.Rows(i)("CODIGO").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("DOCUMENTO").ToString())
                resb.AppendFormat("<td style='text-align:center;' data-order='{1}'>{0}</td>", If(dt.Rows(i)("FECHA").ToString() = "", "", dt.Rows(i)("FECHA").ToString().Substring(0, 10)), ObtenerFecha(dt.Rows(i)("FECHA").ToString))
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("DESC_CORTA_MONEDA").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("MONTO").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("DEUDA_SOLES").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("DEUDA_DOLARES").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("PAGADO").ToString())
                resb.Append("</tr>")
                
                totalBase += Decimal.Parse(dt.Rows(i)("DEUDA_SOLES").ToString())
                totalAlterna += Decimal.Parse(dt.Rows(i)("DEUDA_DOLARES").ToString())
                
                If dt.Rows(i)("DESC_CORTA_MONEDA").ToString() = descMonedaBase Then
                    montoTotalBase += Decimal.Parse(dt.Rows(i)("MONTO").ToString())
                Else
                    montoTotalAlterna += Decimal.Parse(dt.Rows(i)("MONTO").ToString())
                End If
            Next
        End If
        resb.Append("</tbody>")
        resb.Append("</table>")
        'Montos totales
        resb.AppendFormat("<input id='hfMontoTotalBase' value='{0}' type='hidden' />", String.Format("{0:#,##0.00}", montoTotalBase))
        resb.AppendFormat("<input id='hfMontoTotalAlterna' value='{0}' type='hidden' />", String.Format("{0:#,##0.00}", montoTotalAlterna))
        'TotalDeudas
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
    
    Public Function GenerarTablaAmortizaciones(ByVal dtAmortizaciones As DataTable) As String
        
        res = ""
        resb.Clear()
        '------
        resb.Append("<table id=""tblBandeja"" class=""display DTTT_selectable"" border=""0"" style=""width:100%;"">")
        resb.Append("<thead>")
        resb.Append("<th>FECHA</th>")
        resb.Append("<th>ORIGEN</th>")
        resb.Append("<th>DESTINO</th>")
        resb.Append("<th>FORMA_PAGO</th>")
        resb.Append("<th>DOCUMENTO</th>")
        resb.Append("<th>MONTO</th>")
        resb.Append("</thead>")
        resb.Append("<tbody>")
       
        If (dt Is Nothing) Then
            'No hay datos
            resb.Append("<tr>")
            resb.Append("<td style='text-align:center;'>NO HAY DATOS DISPONIBLES</td>")
            resb.Append("<td style='text-align:center;'> </td>")
            resb.Append("<td style='text-align:center;'> </td>")
            resb.Append("<td style='text-align:center;'> </td>")
            resb.Append("<td style='text-align:center;'> </td>")
            resb.Append("<td style='text-align:center;'> </td>")
            resb.Append("</tr>")
        Else
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.Append("<tr>")
                resb.AppendFormat("<td style='text-align:center;' data-order='{1}'>{0}</td>", If(dt.Rows(i)("FECHA").ToString() = "", "", dt.Rows(i)("FECHA").ToString().Substring(0, 10)), ObtenerFecha(dt.Rows(i)("FECHA").ToString))
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("ORIGEN").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("DESTINO").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("FORMA_PAGO").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("DOCUMENTO").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0} {1}</td>", dt.Rows(i)("SIMBOLO_MONEDA").ToString(), dt.Rows(i)("MONTO").ToString())
                resb.Append("</tr>")
            Next
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
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