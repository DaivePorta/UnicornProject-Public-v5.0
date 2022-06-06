<%@ WebHandler Language="VB" Class="CALVICA" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CALVICA : Implements IHttpHandler

    Dim OPCION As String
    Dim p_PERS_PIDM, p_CTLG_CODE, p_SCSL_CODE, p_USUA_ID, p_CAJA_CODE, p_DESDE, p_HASTA As String
    Dim p_FILTRO As String


    Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
    Dim ncSucursal As New Nomade.NC.NCSucursal("Bn")
    Dim glLetras As New Nomade.GL.GLLetras("Bn")
    Dim ncCaja As New Nomade.NC.NCCaja("Bn")
    Dim caMovimientos As New Nomade.CA.CAMovimientos("Bn")

    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")
        p_SCSL_CODE = ""
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_PERS_PIDM = context.Request("p_PERS_PIDM")
        p_CAJA_CODE = context.Request("p_CAJA_CODE")

        p_DESDE = context.Request("p_DESDE")
        p_HASTA = context.Request("p_HASTA")

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
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
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
                Case "2" 'Listar Cajas POR USUARIO
                    Dim caja As New Nomade.NC.NCCaja("BN")
                    context.Response.ContentType = "application/json; charset=utf-8"
                    p_FILTRO = context.Request("p_FILTRO")

                    dt = caja.ListarCajerosCaja(" ", p_USUA_ID, p_CTLG_CODE, If(p_FILTRO = "CAJAS", "", p_SCSL_CODE), If(p_FILTRO = Nothing, "NORMAL", p_FILTRO))
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CAJA_CODE"":""" & row("CAJA_CODE").ToString & """,")
                            resb.Append("""DESCRIPCION_CAJA"":""" & row("DESCRIPCION_CAJA").ToString & """,")
                            resb.Append("""ESTADO_CAJA"":""" & row("ESTADO_CAJA").ToString & """,")

                            If p_FILTRO <> "CAJAS" Then
                                resb.Append("""MONTO_CAJA"":""" & row("MONTO_CAJA").ToString & """,")
                            Else
                                resb.Append("""MONTO_CAJA"":""0"",")
                            End If
                            resb.Append("""TIPO_CAJA"":""" & row("TIPO_CAJA").ToString & """,")
                            If p_FILTRO = "CAJAS" Then
                                resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """,")
                                resb.Append("""SUCURSAL"":""" & row("SUCURSAL").ToString & """")
                            Else
                                resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                            End If
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "3" ' Listar movimientos caja (Limit 10)  Generar tabla aperturas caja
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = caMovimientos.ListarMovimientosCaja("", p_CTLG_CODE, p_SCSL_CODE, p_CAJA_CODE, "", "")
                    res = GenerarTablaAperturasCaja(dt)
                Case "4" ' Listar movimientos caja (Filtro por fechas)  Generar tabla aperturas caja
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = caMovimientos.ListarMovimientosCajaFechas("", p_CTLG_CODE, p_SCSL_CODE, p_CAJA_CODE, "", "", Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA))
                    res = GenerarTablaAperturasCaja(dt)

            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try

    End Sub

    Public Function GenerarTablaAperturasCaja(ByVal dt As DataTable) As String

        res = ""
        resb.Clear()
        Dim CodUltimoMovimiento As String = ""

        Dim cajaAbiertaInd As Integer = 0
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
        resb.AppendFormat("<table id=""tblAperturasCaja"" class=""display DTTT_selectable"" style=""border: 1px solid#cbcbcb;"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th>CODIGO</th>")
        resb.AppendFormat("<th>CAJERO</th>")
        resb.AppendFormat("<th>FECHA APERTURA</th>")
        resb.AppendFormat("<th>FECHA CIERRE</th>")
        resb.AppendFormat("<th>MONTO APERTURA ({0})</th>", descMonedaBase)
        resb.AppendFormat("<th>MONTO APERTURA ({0})</th>", descMonedaAlterna)
        resb.AppendFormat("<th>CERRADO</th>")
        resb.AppendFormat("<th>CAJERO CIERRE</th>")
        resb.AppendFormat("<th>MONTO CIERRE ({0})</th>", descMonedaBase)
        resb.AppendFormat("<th>MONTO CIERRE ({0})</th>", descMonedaAlterna)
        resb.AppendFormat("<th>ACCIONES</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        If (dt Is Nothing) Then
            'No hay datos          
            'resb.AppendFormat("<tr>")
            'resb.AppendFormat("<td style='text-align:center;'> </td>")
            'resb.AppendFormat("<td style='text-align:center;'>NO HAY DATOS DISPONIBLES</td>")
            'resb.AppendFormat("<td style='text-align:center;'> </td>")
            'resb.AppendFormat("<td style='text-align:center;'> </td>")
            'resb.AppendFormat("<td style='text-align:center;'> </td>")
            'resb.AppendFormat("<td style='text-align:center;'> </td>")
            'resb.AppendFormat("<td style='text-align:center;'> </td>")
            'resb.AppendFormat("<td style='text-align:center;'> </td>")
            'resb.AppendFormat("<td style='text-align:center;'> </td>")
            'resb.AppendFormat("<td style='text-align:center;'> </td>")
            'resb.AppendFormat("<td style='text-align:center;'> </td>")
            'resb.AppendFormat("</tr>")
        Else
            CodUltimoMovimiento = dt.Rows(0)("CODIGO").ToString()
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("CODIGO").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("CAJERO").ToString())
                resb.AppendFormat("<td style='text-align:center;' data-order='{1}'>{0}</td>", Convert.ToDateTime(dt.Rows(i)("FECHA_APERTURA").ToString()).ToString("dd/MM/yyyy hh:mm:ss"), ObtenerFecha(dt.Rows(i)("FECHA_APERTURA").ToString()))
                resb.AppendFormat("<td style='text-align:center;' data-order='{1}'>{0}</td>",
                                  If(dt.Rows(i)("FECHA_CIERRE").ToString() = "", dt.Rows(i)("FECHA_CIERRE").ToString(), Convert.ToDateTime(dt.Rows(i)("FECHA_CIERRE").ToString()).ToString("dd/MM/yyyy hh:mm:ss")),
                                  ObtenerFecha(dt.Rows(i)("FECHA_CIERRE").ToString()))
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", If(dt.Rows(i)("MONTO_APERTURA_SOL").ToString() = "", "", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_APERTURA_SOL").ToString()))))
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", If(dt.Rows(i)("MONTO_APERTURA_DOL").ToString() = "", "", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_APERTURA_DOL").ToString()))))
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", If(dt.Rows(i)("CERRADO_IND").ToString() = "S", "SI", "NO"))
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("CAJERO_CIERRE").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", If(dt.Rows(i)("MONTO_CIERRE_SOL").ToString() = "", "", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_CIERRE_SOL").ToString()))))
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", If(dt.Rows(i)("MONTO_CIERRE_DOL").ToString() = "", "", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_CIERRE_DOL").ToString()))))
                If dt.Rows(i)("CERRADO_IND").ToString() = "S" Then 'Cerrado
                    resb.AppendFormat("<td style='text-align:center;'>")
                    resb.AppendFormat("<span title='Detalle Movimientos'><a class='btn blue'  tooltip='Ver detalles' onclick=""VerDetallesCaja('{0}','{1}', '{2}')""><i class='icon-search'></i></a></span>", dt.Rows(i)("CODIGO_CAJA").ToString(), dt.Rows(i)("CODIGO").ToString(), dt.Rows(i)("CERRADO_IND").ToString())
                    resb.AppendFormat("</td>")
                Else 'Abierto
                    cajaAbiertaInd += 1
                    resb.AppendFormat("<td style='text-align:center;'>")
                    resb.AppendFormat("<span title='Cerrar Caja' style='margin-right:5px;'><a class='btn blue' tooltip='Cerrar Caja' onclick=""CerrarCaja('{0}','{1}')""><i class='icon-lock'></i></a></span>", dt.Rows(i)("CODIGO_CAJA").ToString(), dt.Rows(i)("CODIGO").ToString())
                    resb.AppendFormat("<span title='Detalle Movimientos'><a class='btn blue' tooltip='Ver detalles' onclick=""VerDetallesCaja('{0}','{1}', '{2}')""><i class='icon-search' ></i></a></span>", dt.Rows(i)("CODIGO_CAJA").ToString(), dt.Rows(i)("CODIGO").ToString(), dt.Rows(i)("CERRADO_IND").ToString())

                    resb.AppendFormat("</td>")
                End If
                resb.AppendFormat("</tr>")
            Next
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        'Si caja está abierta
        If cajaAbiertaInd > 0 Then
            resb.AppendFormat("<input id='hfCajaAbiertaInd' value='{0}' type='hidden' />", "S")
        Else
            'Si caja esta cerrada
            resb.AppendFormat("<input id='hfCajaAbiertaInd' value='{0}' type='hidden' />", "N")
        End If
        resb.AppendFormat("<input id='hfCodUltimoMovimiento' value='{0}' type='hidden' />", CodUltimoMovimiento)

        'Datos de moneda  
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