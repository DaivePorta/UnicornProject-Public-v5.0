<%@ WebHandler Language="VB" Class="CPLRFCA" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CPLRFCA : Implements IHttpHandler
       
    Dim OPCION As String
    Dim p_PERS_PIDM, p_CTLG_CODE, p_SCSL_CODE, p_USUA_ID, p_MONE_CODE As String
    Dim p_DESDE, p_HASTA As String
    Dim p_FACTURA As String
  
    Dim cpCuentaPorPagar As New Nomade.CP.CPCuentaPorPagar("Bn")
    Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
    Dim ncProvedor As New Nomade.NC.NCEProveedor("Bn")
    Dim ncSucursal As New Nomade.NC.NCSucursal("Bn")
    Dim glLetras As New NOMADE.GL.GLLetras("Bn")
    
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
        p_MONE_CODE = context.Request("p_MONE_CODE")
        
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
                Case "2" 'lista proveedores
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncProvedor.ListarProveedor(0, "", p_CTLG_CODE, "", "N")
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "RAZON_SOCIAL", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""ID"" :" & """" & MiDataRow("ID").ToString & """,")
                            resb.Append("""RAZON_SOCIAL"" :" & """" & MiDataRow("RAZON_SOCIAL").ToString & """,")
                            resb.Append("""DNI"" :" & """" & MiDataRow("DNI").ToString & """,")
                            resb.Append("""RUC"" :" & """" & MiDataRow("RUC").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "3" 'lista facturas de compra
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = cpCuentaPorPagar.ListarCreditoProveedorFechas(p_CTLG_CODE, p_SCSL_CODE, "", Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA), p_PERS_PIDM)
                    res = GenerarTablaFacturasCompra(dt)
                Case "4" 'lista amortizaciones (detalles de filas de tabla) DESDE fabampr
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = cpCuentaPorPagar.ListarAmortizacionesProveedor(p_FACTURA)
                    res = GenerarTablaAmortizaciones(dt)
                Case "5"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = cpCuentaPorPagar.ListarEstadoCuentaProveedor(p_CTLG_CODE, p_SCSL_CODE, IIf(p_DESDE = "", Nothing, Utilities.fechaLocal(p_DESDE)),
                                                                      IIf(p_HASTA = "", Nothing, Utilities.fechaLocal(p_HASTA)), p_PERS_PIDM, p_MONE_CODE)
                    res = GeneraEstadoCuentaProveedor(dt)
                    
                Case "5.5"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = cpCuentaPorPagar.ListarEstadoCuentaProveedor(p_CTLG_CODE, p_SCSL_CODE, IIf(p_DESDE = "", Nothing, Utilities.fechaLocal(p_DESDE)),
                                                                      IIf(p_HASTA = "", Nothing, Utilities.fechaLocal(p_HASTA)), p_PERS_PIDM, p_MONE_CODE)
                    
                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                    
                    
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
 
    Public Function GeneraEstadoCuentaProveedor(ByVal dtEstado As DataTable) As String
        Dim saldofecha As Decimal = 0
        Dim smoneda As String = ""
        
        res = ""
        resb.Clear()
        
        resb.AppendFormat("<table id=""tblBandeja"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th>FECHA</th>")
        resb.AppendFormat("<th>DESCRIPCIÓN</th>")
        resb.AppendFormat("<th>DOCUMENTO/ACCIÓN</th>")
        resb.AppendFormat("<th>NÚMERO DOC/ACCIÓN</th>")
        resb.AppendFormat("<th>CARGO</th>")
        resb.AppendFormat("<th>ABONO</th>")
        resb.AppendFormat("<th>SALDO</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")
        
        If Not (dtEstado Is Nothing) Then
            For i As Integer = 0 To dtEstado.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("fecha").ToString())
                resb.AppendFormat("<td style='text-align:left;'>{0}</td>", dt.Rows(i)("descripcion").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("tipo_doc").ToString())
                resb.AppendFormat("<td style='text-align:left;'>{0}</td>", dt.Rows(i)("numero_doc").ToString())
                resb.AppendFormat("<td style='text-align:left;'>{0}</td>", dt.Rows(i)("smoneda").ToString() & dt.Rows(i)("cargo").ToString())
                resb.AppendFormat("<td style='text-align:left;'>{0}</td>", dt.Rows(i)("smoneda").ToString() & dt.Rows(i)("abono").ToString())
                resb.AppendFormat("<td style='text-align:left;'>{0}</td>", dt.Rows(i)("smoneda").ToString() & dt.Rows(i)("saldo").ToString())
                resb.AppendFormat("</tr>")
                saldofecha = Decimal.Parse(dt.Rows(i)("saldo").ToString())
                smoneda = dt.Rows(i)("smoneda").ToString()
            Next
        Else
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td style='text-align:center;' colspan='7'>NO HAY DATOS DISPONIBLES</td>")
            'resb.AppendFormat("<td style='text-align:center;'> </td>")
            'resb.AppendFormat("<td style='text-align:center;'> </td>")
            'resb.AppendFormat("<td style='text-align:center;'> </td>")
            'resb.AppendFormat("<td style='text-align:center;'> </td>")
            'resb.AppendFormat("<td style='text-align:center;'> </td>")
            'resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("</tr>")
        End If
        
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        
        resb.AppendFormat("<input id='hfValorSaldo' value='{0}' type='hidden' />", saldofecha)
        resb.AppendFormat("<input id='hfSimboloSaldo' value='{0}' type='hidden' />", smoneda)
        
        res = resb.ToString()
        
        Return res
    End Function
    
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
        resb.AppendFormat("<table id=""tblBandeja"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th></th>")
        resb.AppendFormat("<th>DOCUMENTO</th>")
        resb.AppendFormat("<th>FECHA</th>")
        resb.AppendFormat("<th>MONEDA</th>")
        resb.AppendFormat("<th>MONTO</th>") ' MONTO EN MONEDA REGISTRADA
        resb.AppendFormat("<th>DEUDA {0}</th>", descMonedaBase)
        resb.AppendFormat("<th>DEUDA {0}</th>", descMonedaAlterna)
        resb.AppendFormat("<th>PAGADO</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")
       
        If (dt Is Nothing) Then
            'No hay datos
            fechaTipoCambio = "-"
            valorTipoCambio = "-"
            'resb.AppendFormat("<tr>")
            'resb.AppendFormat("<td> </td>")
            'resb.AppendFormat("<td class='center'>NO HAY DATOS DISPONIBLES</td>")
            'resb.AppendFormat("<td> </td>")
            'resb.AppendFormat("<td> </td>")s
            'resb.AppendFormat("<td> </td>")
            'resb.AppendFormat("<td> </td>")
            'resb.AppendFormat("<td> </td>")
            'resb.AppendFormat("<td> </td>")
            'resb.AppendFormat("</tr>")
        Else
            fechaTipoCambio = dt.Rows(0)("FECHA_TIPO_CAMBIO")
            valorTipoCambio = dt.Rows(0)("VALOR_TIPO_CAMBIO")
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td class='center'><img id='{0}' src='recursos/img/details_open.png' /></td>", dt.Rows(i)("CODIGO").ToString())
                resb.AppendFormat("<td class='center'>{0}</td>", dt.Rows(i)("DOCUMENTO").ToString())
                resb.AppendFormat("<td class='center' data-order='" + ObtenerFecha(dt.Rows(i)("FECHA").ToString) + "' >{0}</td>", If(dt.Rows(i)("FECHA").ToString() = "", "", dt.Rows(i)("FECHA").ToString().Substring(0, 10)))
                resb.AppendFormat("<td class='center'>{0}</td>", dt.Rows(i)("DESC_CORTA_MONEDA").ToString())
                resb.AppendFormat("<td class='center'>{0}</td>", dt.Rows(i)("MONTO").ToString())
                resb.AppendFormat("<td class='center'>{0}</td>", dt.Rows(i)("DEUDA_SOLES").ToString())
                resb.AppendFormat("<td class='center'>{0}</td>", dt.Rows(i)("DEUDA_DOLARES").ToString())
                resb.AppendFormat("<td class='center'>{0}</td>", dt.Rows(i)("PAGADO").ToString())
                resb.AppendFormat("</tr>")
                
                If dt.Rows(i)("PAGADO").ToString() = "NO" Then
                    totalBase += Decimal.Parse(dt.Rows(i)("DEUDA_SOLES").ToString())
                    totalAlterna += Decimal.Parse(dt.Rows(i)("DEUDA_DOLARES").ToString())
                End If
                
                If dt.Rows(i)("DESC_CORTA_MONEDA").ToString() = descMonedaBase Then
                    montoTotalBase += Decimal.Parse(dt.Rows(i)("MONTO").ToString())
                Else
                    montoTotalAlterna += Decimal.Parse(dt.Rows(i)("MONTO").ToString())
                End If
            Next
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
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
        resb.AppendFormat("<table id=""tblBandeja"" class=""display DTTT_selectable"" border=""0"" style=""width:100%;"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th>FECHA</th>")
        resb.AppendFormat("<th>ORIGEN</th>")
        resb.AppendFormat("<th>DESTINO</th>")
        resb.AppendFormat("<th>FORMA_PAGO</th>")
        resb.AppendFormat("<th>DOCUMENTO</th>")
        resb.AppendFormat("<th>MONTO</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")
       
        If (dt Is Nothing) Then
            'No hay datos
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td style='text-align:center;'>NO HAY DATOS DISPONIBLES</td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("</tr>")
        Else
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td style='text-align:center;' data-order='" + ObtenerFecha(dt.Rows(i)("FECHA").ToString) + "'>{0}</td>", If(dt.Rows(i)("FECHA").ToString() = "", "", dt.Rows(i)("FECHA").ToString().Substring(0, 10)))
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("ORIGEN").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("DESTINO").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("FORMA_PAGO").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("DOCUMENTO").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0} {1}</td>", dt.Rows(i)("SIMBOLO_MONEDA").ToString(), dt.Rows(i)("MONTO").ToString())
                resb.AppendFormat("</tr>")
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