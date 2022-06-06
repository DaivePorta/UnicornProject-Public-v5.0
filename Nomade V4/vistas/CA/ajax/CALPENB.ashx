<%@ WebHandler Language="VB" Class="CALPENB" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CALPENB : Implements IHttpHandler
     
    Dim OPCION As String
    Dim p_CTLG_CODE, p_SCSL_CODE, p_USUA_ID, p_CUEN_CODE, empresapidm, cuenta, anho, mes As String
      
    Dim glLetras As New Nomade.GL.GLLetras("Bn")
    Dim caMovimientos As New Nomade.CA.CAMovimientos("Bn")
    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        OPCION = context.Request("OPCION")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        p_CUEN_CODE = context.Request("p_CUEN_CODE")
        cuenta = context.Request("cuenta")
        empresapidm = context.Request("empresapidm")
               
        Try
            Select Case OPCION
                Case "1" 'OBTENER DATOS MONEDAS
                    context.Response.ContentType = "application/text; charset=utf-8"
                    res = ObtenerDatosMonedas()
                Case "2" 'Lista transferencias de efectivo pendientes a cuentas bancarias 
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = caMovimientos.ListarMovimientosPorCobrarCuen(p_CTLG_CODE, p_SCSL_CODE, p_CUEN_CODE)
                    res = GenerarTablaPendientes(dt)
                Case 3
                    Dim p As New Nomade.NB.NBMovimientoBancario("BN")
                    mes = Date.Now.Month.ToString
                    If mes.Length = 1 Then
                        mes = "0" + mes
                    End If
                    anho = Date.Now.Year.ToString
                    dt = p.ListarMovimientoBancario(mes, anho, "", cuenta, empresapidm)
                    res = dt.Rows(0)("CODIGO") & "|" & dt.Rows(0)("CERRADO_IND")
                    
            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
        
    End Sub
      
    Public Function GenerarTablaPendientes(ByVal dt As DataTable) As String
        resb.Clear()
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
        resb.AppendFormat("<table id=""tblPendientes"" class=""display"" border=""0"" style=""border: 1px solid#cbcbcb;"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th>CODIGO</th>")
        resb.AppendFormat("<th>DÍA/HORA</th>")
        resb.AppendFormat("<th>ORIGEN</th>")
        resb.AppendFormat("<th>CONCEPTO</th>")
        resb.AppendFormat("<th>DESTINO</th>")
        resb.AppendFormat("<th>DETALLE</th>")
        'resb.AppendFormat("<th>NRO DOC</th>")
        resb.AppendFormat("<th>INGRESO ({0})</th>", simbMonedaBase)
        resb.AppendFormat("<th>INGRESO ({0})</th>", simbMonedaAlterna)
        resb.AppendFormat("<th>USUARIO</th>")
        resb.AppendFormat("<th>ACCIONES</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")
        If Not (dt Is Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                If dt.Rows(i)("TIPO_DESTINO_MOBA").ToString() = "CUENTA" Or dt.Rows(i)("TIPO_DESTINO_MOAL").ToString() = "CUENTA" Then
                    resb.AppendFormat("<tr>")
                    'CONTENIDO
                    resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("CODIGO").ToString())
                    resb.AppendFormat("<td style='text-align:center;' data-order='{1}'>{0}</td>", dt.Rows(i)("FECHA").ToString(), ObtenerFecha(dt.Rows(i)("FECHA").ToString()))
                    resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("ORIGEN_DESCRIPCION").ToString())
                    resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("CONCEPTO").ToString())
                      resb.AppendFormat("<td align='left' >{0}</td>", If(dt.Rows(i)("MOBA_IND").ToString() = "S", dt.Rows(i)("DESC_DESTINO_MOBA").ToString(), dt.Rows(i)("DESC_DESTINO_MOBA").ToString()))
                    resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("DETALLE").ToString())
                    'resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("NRO_DOC").ToString())
                    resb.AppendFormat("<td style='text-align:center;'>{0}</td>", If(dt.Rows(i)("INGRESO_SOLES").ToString() = "", "", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("INGRESO_SOLES").ToString()))))
                    resb.AppendFormat("<td style='text-align:center;'>{0}</td>", If(dt.Rows(i)("INGRESO_DOLARES").ToString() = "", "", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("INGRESO_DOLARES").ToString()))))
                    resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("USUARIO").ToString())
                    'ACCIONES
                    resb.AppendFormat("<td style='text-align:center;min-width: 85px !important;'>")
                    resb.AppendFormat("<a onclick=""ConfirmarTransferencia('aceptar','{0}')"" class='btn green btnAceptarTranferencia' title='Aceptar Transferencia' style='margin:0px 2px 2px 0px;'><i class='icon-check'></i></a>", dt.Rows(i)("CODIGO").ToString())
                    resb.AppendFormat("<a onclick=""ConfirmarTransferencia('rechazar','{0}')"" class='btn red btnRechazarTransferencia' title='Rechazar Transferencia' style='margin:0px 2px 2px 0px;'><i class='icon-remove'></i></a>", dt.Rows(i)("CODIGO").ToString())
                    resb.AppendFormat("</td>")
                    'FIN ACCIONES
                    resb.AppendFormat("</tr>")
                End If

            Next
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
        Return res
    End Function
    
    Public Function ObtenerDatosMonedas() As String
        res = ""
        resb.Clear()
        Dim dtMonedas As New DataTable
        dtMonedas = glLetras.ListarMoneda(p_CTLG_CODE)
        Dim mobaCode As String = ""
        Dim moalCode As String = ""
        Dim descMonedaBase As String = ""
        Dim descMonedaAlterna As String = ""
        Dim simbMonedaBase As String = ""
        Dim simbMonedaAlterna As String = ""
        For Each row In dtMonedas.Rows
            If row("TIPO") = "MOBA" Then
                mobaCode = row("CODIGO")
                descMonedaBase = row("DESC_CORTA")
                simbMonedaBase = row("SIMBOLO")
            Else
                moalCode = row("CODIGO")
                descMonedaAlterna = row("DESC_CORTA")
                simbMonedaAlterna = row("SIMBOLO")
            End If
        Next
        resb.AppendFormat("<input id='hfMobaCode' value='{0}' type='hidden' />", mobaCode)
        resb.AppendFormat("<input id='hfMoalCode' value='{0}' type='hidden' />", moalCode)
        resb.AppendFormat("<input id='hfDescMonedaBase' value='{0}' type='hidden' />", descMonedaBase)
        resb.AppendFormat("<input id='hfDescMonedaAlterna' value='{0}' type='hidden' />", descMonedaAlterna)
        resb.AppendFormat("<input id='hfSimbMonedaBase' value='{0}' type='hidden' />", simbMonedaBase)
        resb.AppendFormat("<input id='hfSimbMonedaAlterna' value='{0}' type='hidden' />", simbMonedaAlterna)
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
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class