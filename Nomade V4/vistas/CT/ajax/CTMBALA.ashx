<%@ WebHandler Language="VB" Class="CTMBALA" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CTMBALA : Implements IHttpHandler

    Dim OPCION As String
    Dim p_PERS_PIDM, p_CTLG_CODE, p_SCSL_CODE, p_USUA_ID, p_MONE_CODE, p_COD_MNEMO, p_CTLG, p_REALIZACION, p_ACREEDOR_DEUDOR As String
    Dim p_DESDE, p_HASTA As String
    Dim p_FACTURA As String

    Dim cpCuentaPorPagar As New Nomade.CP.CPCuentaPorPagar("Bn")
    Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
    Dim ncProvedor As New Nomade.NC.NCEProveedor("Bn")
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
        p_MONE_CODE = context.Request("p_MONE_CODE")

        p_DESDE = context.Request("p_DESDE")
        p_HASTA = context.Request("p_HASTA")
        p_FACTURA = context.Request("p_FACTURA")

        p_COD_MNEMO = context.Request("p_COD_MNEMO") 'DPORTA
        p_CTLG = context.Request("p_CTLG")
        p_REALIZACION = context.Request("p_REALIZACION")
        p_ACREEDOR_DEUDOR = context.Request("p_ACREEDOR_DEUDOR")

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
                Case "3" 'lista facturas de compra
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = cpCuentaPorPagar.ListarParaBalanceContable(p_CTLG_CODE, p_SCSL_CODE, p_REALIZACION, p_ACREEDOR_DEUDOR, Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA))
                    res = GenerarTablaBalanceContable(dt)
                Case "4" 'listar suma de cuentas
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = cpCuentaPorPagar.ListarCuentasAsientosBalanceContable(p_FACTURA, p_CTLG, p_SCSL_CODE, p_REALIZACION, p_ACREEDOR_DEUDOR,
                                                                               IIf(p_DESDE = "", Nothing, Utilities.fechaLocal(p_DESDE)), IIf(p_HASTA = "", Nothing, Utilities.fechaLocal(p_HASTA))) 'DPORTA
                    res = GenerarTablaCuentasAsientosBalanceCont(dt)

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

    'Tabla de busqueda de documentos    
    Public Function GenerarTablaBalanceContable(ByVal dtFacturas As DataTable) As String

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
        resb.AppendFormat("<th>NRO. CUENTA</th>")
        resb.AppendFormat("<th>DESC. CUENTA</th>")
        resb.AppendFormat("<th>REALIZACIÓN</th>")
        resb.AppendFormat("<th>NETO_MN (S/)</th>") ', descMonedaBase)
        resb.AppendFormat("<th>NETO_ME ($)</th>") ', descMonedaAlterna)
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
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td class='center'><img id='{0}' src='recursos/img/details_open.png' /></td>", dt.Rows(i)("CODE_CUENTA").ToString())
                resb.AppendFormat("<td class='center'>{0}</td>", dt.Rows(i)("NRO_CUENTA").ToString())
                resb.AppendFormat("<td class='center'>{0}</td>", dt.Rows(i)("DESC_CUENTA").ToString())
                resb.AppendFormat("<td class='center'>{0}</td>", dt.Rows(i)("REALIZACION").ToString())
                If dt.Rows(i)("MONTO_NETO_HABER_MN").ToString() = "" Then
                    resb.AppendFormat("<td class='center'>{0}</td>", dt.Rows(i)("MONTO_NETO_DEBE_MN").ToString())
                    resb.AppendFormat("<td class='center'>{0}</td>", dt.Rows(i)("MONTO_NETO_DEBE_ME").ToString())
                Else
                    resb.AppendFormat("<td class='center'>{0}</td>", dt.Rows(i)("MONTO_NETO_HABER_MN").ToString())
                    resb.AppendFormat("<td class='center'>{0}</td>", dt.Rows(i)("MONTO_NETO_HABER_ME").ToString())
                End If
                resb.AppendFormat("</tr>")
                If dt.Rows(i)("MONTO_NETO_HABER_MN").ToString() = "" Then
                    montoTotalBase += Decimal.Parse(dt.Rows(i)("MONTO_NETO_DEBE_MN").ToString())
                    montoTotalAlterna += Decimal.Parse(dt.Rows(i)("MONTO_NETO_DEBE_ME").ToString())
                Else
                    montoTotalBase += Decimal.Parse(dt.Rows(i)("MONTO_NETO_HABER_MN").ToString())
                    montoTotalAlterna += Decimal.Parse(dt.Rows(i)("MONTO_NETO_HABER_ME").ToString())
                End If
            Next
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        'Montos totales
        resb.AppendFormat("<input id='hfMontoTotalBase' value='{0}' type='hidden' />", String.Format("{0:#,##0.00}", montoTotalBase))
        resb.AppendFormat("<input id='hfMontoTotalAlterna' value='{0}' type='hidden' />", String.Format("{0:#,##0.00}", montoTotalAlterna))
        'Datos de moneda  
        resb.AppendFormat("<input id='hfDescMonedaBase' value='{0}' type='hidden' />", descMonedaBase)
        resb.AppendFormat("<input id='hfDescMonedaAlterna' value='{0}' type='hidden' />", descMonedaAlterna)
        resb.AppendFormat("<input id='hfSimbMonedaBase' value='{0}' type='hidden' />", simbMonedaBase)
        resb.AppendFormat("<input id='hfSimbMonedaAlterna' value='{0}' type='hidden' />", simbMonedaAlterna)
        res = resb.ToString()
        Return res
    End Function

    Public Function GenerarTablaCuentasAsientosBalanceCont(ByVal dtAmortizaciones As DataTable) As String

        res = ""
        resb.Clear()
        '------
        resb.AppendFormat("<table id=""tblBandeja"" class=""display DTTT_selectable"" border=""0"" style=""width:100%;"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th>CUENTA</th>")
        resb.AppendFormat("<th>DESCRIPCIÓN</th>")
        resb.AppendFormat("<th>MONTO_MN (S/)</th>")
        resb.AppendFormat("<th>MONTO_ME ($)</th>")
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
                resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("CODE_CUENTA").ToString())
                resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("DESC_CUENTA").ToString())
                resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("MONTO_MN").ToString())
                resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("MONTO_ME").ToString())
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