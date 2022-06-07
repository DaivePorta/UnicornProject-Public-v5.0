<%@ WebHandler Language="VB" Class="CCLRFVA" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CCLRFVA : Implements IHttpHandler

    Dim OPCION As String
    Dim p_PERS_PIDM, p_CTLG_CODE, p_SCSL_CODE, p_USUA_ID, documento As String
    Dim p_DESDE, p_HASTA As String
    Dim p_FACTURA As String

    Dim ccCuentaPorCobrar As New Nomade.CC.CCCuentaPorCobrar("Bn")
    Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
    Dim ncSucursal As New Nomade.NC.NCSucursal("Bn")
    Dim ncCliente As New Nomade.NC.NCECliente("Bn")
    Dim glLetras As New Nomade.GL.GLLetras("Bn")

    Dim anticipo As New Nomade.NV.NVAnticipo("Bn")
    Dim dt, dt2 As DataTable
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

        If p_SCSL_CODE = "TODOS" Then
            p_SCSL_CODE = ""
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
                            resb.Append("""CORTO"" :" & """" & MiDataRow("CORTO").ToString & """,")
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
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & "TODOS" & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & "TODOS" & """")
                        resb.Append("}")
                        resb.Append(",")
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
                Case "2" 'lista clientes
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncCliente.ListarClienteAuto("", "", "", "", p_CTLG_CODE)
                    If Not (dt Is Nothing) Then
                        'dt = SortDataTableColumn(dt, "RAZON_SOCIAL", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""ID"" :" & """" & MiDataRow("ID").ToString & """,")
                            'resb.Append("""EMPRESA"" :" & """" & MiDataRow("EMPRESA").ToString & """,")
                            resb.Append("""RAZON_SOCIAL"" :" & """" & MiDataRow("RAZON_SOCIAL").ToString & """,")
                            resb.Append("""DNI"" :" & """" & MiDataRow("DNI").ToString & """,")
                            resb.Append("""DIRECCION"" :" & """" & MiDataRow("DIRECCION").ToString & """,")
                            resb.Append("""CODIGO_CATEGORIA"" :" & """" & MiDataRow("CODIGO_CATEGORIA").ToString & """,")
                            resb.Append("""CATE_DESC"" :" & """" & MiDataRow("CATE_DESC").ToString & """,")
                            resb.Append("""RUC"" :" & """" & MiDataRow("RUC").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "2.5" 'lista clientes más rápido
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncCliente.ListarClienteAuto("", "", "", "Z", p_CTLG_CODE)
                    If Not (dt Is Nothing) Then
                        'dt = SortDataTableColumn(dt, "RAZON_SOCIAL", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            'resb.Append("""ID"" :" & """" & MiDataRow("ID").ToString & """,")
                            resb.Append("""RAZON_SOCIAL"" :" & """" & MiDataRow("RAZON_SOCIAL").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "3" 'lista facturas de venta
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = ccCuentaPorCobrar.ListarCreditoClienteFechas("", p_CTLG_CODE, p_SCSL_CODE, "", "CR", p_PERS_PIDM, "C", Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA), "", "", "")
                    res = GenerarTablaFacturasVenta(dt)
                Case "4" 'listas amortizaciones cliente (detalles de filas de tabla) DESDE fabampr
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = ccCuentaPorCobrar.ListarAmortizacionesCliente(p_FACTURA)
                    dt2 = anticipo.ListarAnticipoDocumento(p_FACTURA)
                    res = GenerarTablaAmortizaciones(dt)

            End Select

            context.Response.Write(res)

        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try

    End Sub

    'Tabla de busqueda de documentos    
    Public Function GenerarTablaFacturasVenta(ByVal dtFacturas As DataTable) As String

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
        resb.AppendFormat("<th>CLIENTE</th>")
        resb.AppendFormat("<th>DOCUMENTO</th>")
        resb.AppendFormat("<th>FECHA</th>")
        resb.AppendFormat("<th>MONEDA</th>")
        resb.AppendFormat("<th>MONTO</th>")
        resb.AppendFormat("<th>DEUDA {0}</th>", descMonedaBase)
        resb.AppendFormat("<th>DEUDA {0}</th>", descMonedaAlterna)
        resb.AppendFormat("<th>PAGADO</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        If (dt Is Nothing) Then
            'No hay datos
            fechaTipoCambio = "-"
            valorTipoCambio = "-"
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'>NO HAY DATOS DISPONIBLES</td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("</tr>")
        Else
            fechaTipoCambio = dt.Rows(0)("FECHA_TIPO_CAMBIO")
            valorTipoCambio = dt.Rows(0)("VALOR_TIPO_CAMBIO")
            Dim indicador_anticipo = ""
            For i As Integer = 0 To dt.Rows.Count - 1
                If dt.Rows(i)("ANTICIPO_IND").ToString() = "S" Then
                    indicador_anticipo = "<span style=""margin:3px"">ª</span>"
                Else
                    indicador_anticipo = ""
                End If

                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td style='text-align:center;'><img id='{0}' src='recursos/img/details_open.png' /></td>", dt.Rows(i)("CODIGO_VENTA").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("RAZON_SOCIAL").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("DOCUMENTO").ToString() & indicador_anticipo)
                resb.AppendFormat("<td style='text-align:center;' data-order='" + ObtenerFecha(dt.Rows(i)("FECHA").ToString) + "'>{0}</td>", If(dt.Rows(i)("FECHA").ToString() = "", "", dt.Rows(i)("FECHA").ToString().Substring(0, 10)))
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("DESC_CORTA_MONEDA").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("MONTO").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("DEUDA_SOLES").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("DEUDA_DOLARES").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("PAGADO").ToString())
                resb.AppendFormat("</tr>")
                totalBase += Decimal.Parse(dt.Rows(i)("DEUDA_SOLES").ToString())
                totalAlterna += Decimal.Parse(dt.Rows(i)("DEUDA_DOLARES").ToString())

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
        resb.AppendFormat("<th></th>")
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

                documento = dt.Rows(i)("DOCUMENTO").ToString()

                If documento = "" Or documento Is Nothing Then
                    resb.AppendFormat("<td style='text-align:center;'></td>")
                Else
                    If (documento.Substring(0, 1) = "J") Then
                        resb.AppendFormat("<td style='text-align:center;'><a class='btn blue' href ='?f=GLMCANJ&codigo=" + dt.Rows(i)("DOCUMENTO").ToString() + "' target='_blank'>Ver</a></td>")
                    Else
                        resb.AppendFormat("<td style='text-align:center;'></td>")
                    End If
                End If





                resb.AppendFormat("</tr>")
            Next
            If Not dt2 Is Nothing Then
                For i As Integer = 0 To dt2.Rows.Count - 1
                    resb.AppendFormat("<tr style=""background-color: antiquewhite;"">")
                    resb.AppendFormat("<td style='text-align:center;'></td>")
                    resb.AppendFormat("<td style='text-align:center;'></td>")
                    resb.AppendFormat("<td style='text-align:center;'></td>")
                    resb.AppendFormat("<td style='text-align:center;'>ANTICIPO</td>")
                    resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt2.Rows(i)("NUM_DCTO").ToString())
                    resb.AppendFormat("<td style='text-align:center;'>{0} {1}</td>", dt2.Rows(i)("SIMBOLO_MONEDA").ToString(), Math.Round(IIf(dt2.Rows(i)("MONEDA_BASE") = "S", dt2.Rows(i)("monto_moba"), dt2.Rows(i)("monto_moal")), 2))
                    resb.AppendFormat("<td style='text-align:center;'></td>")
                    resb.AppendFormat("</tr>")
                Next
            End If
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