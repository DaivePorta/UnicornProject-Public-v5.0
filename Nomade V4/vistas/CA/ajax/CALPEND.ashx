<%@ WebHandler Language="VB" Class="CALPEND" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CALPEND : Implements IHttpHandler


    Dim OPCION As String
    Dim p_CTLG_CODE, p_SCSL_CODE, p_USUA_ID, p_CAJA_CODE, p_CODE_MOVI, p_CODE_MOVI_DESTINO, p_PIDM_CTLG As String
    Dim p_MONTO_MOBA, p_MONTO_MOAL, p_MOBA_IND, p_MOAL_IND,
        p_TIPO_DESTINO_MOBA, p_TIPO_DESTINO_MOAL,
        p_DESTINO_MOBA, p_DESTINO_MOAL As String

    Dim p_CONTADO_IND, p_CREDITO_IND, p_TRANSFERENCIA_IND, p_OTROS_IND As String
    Dim p_CODE, p_BENEFICIARIO_PIDM, p_ASIGNADO_PIDM, p_MONE_CODE, p_ESTADOS As String

    Dim p_ORIGEN_DESTINO, p_TMCA_CODE, p_CONC_CODE, p_DESC,
        p_DCTO_CODE, p_NRO_DOC, p_DCTO_CODE_REF, p_PAGO_IND, p_MONTO_DCTO_SOLES,
        p_MONTO_DCTO_DOLARES, p_MOPA_CODE, p_FOPA_CODE, p_TTAR_CODE, p_FECHA_VENCIM,
        p_FECHA_PAGO, p_COD_REF, p_COMPLETO_IND, p_IND_INGR_EGRE As String


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
        p_CAJA_CODE = context.Request("p_CAJA_CODE")
        p_CODE_MOVI = context.Request("p_CODE_MOVI")

        p_CODE_MOVI_DESTINO = context.Request("p_CODE_MOVI_DESTINO")
        p_MONTO_MOBA = context.Request("p_MONTO_MOBA")
        p_MONTO_MOAL = context.Request("p_MONTO_MOAL")
        p_TIPO_DESTINO_MOBA = context.Request("p_TIPO_DESTINO_MOBA")
        p_TIPO_DESTINO_MOAL = context.Request("p_TIPO_DESTINO_MOAL")
        p_DESTINO_MOBA = context.Request("p_DESTINO_MOBA")
        p_DESTINO_MOAL = context.Request("p_DESTINO_MOAL")
        p_MOBA_IND = context.Request("p_MOBA_IND") 'Si se ha habilitado el chkMoba
        p_MOAL_IND = context.Request("p_MOAL_IND") 'Si se ha habilitado el chkMoal        
        p_PIDM_CTLG = context.Request("p_PIDM_CTLG")

        'FILTROS
        p_CONTADO_IND = context.Request("p_CONTADO_IND")
        p_CREDITO_IND = context.Request("p_CREDITO_IND")
        p_TRANSFERENCIA_IND = context.Request("p_TRANSFERENCIA_IND")
        p_OTROS_IND = context.Request("p_OTROS_IND")

        'MOIE
        p_CODE = context.Request("p_CODE")
        p_BENEFICIARIO_PIDM = context.Request("p_BENEFICIARIO_PIDM")
        p_ASIGNADO_PIDM = context.Request("p_ASIGNADO_PIDM")
        p_MONE_CODE = context.Request("p_MONE_CODE")
        p_ESTADOS = context.Request("p_ESTADOS")


        Try
            Select Case OPCION

                Case "1" ' ObtenerDatosAperturaCaja
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = caMovimientos.ListarMovimientosCaja("", p_CTLG_CODE, p_SCSL_CODE, p_CAJA_CODE, "", "")
                    res = ObtenerDatosAperturaCaja(dt)

                Case "2" 'lista pendientes (movimientos por cobrar)
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = caMovimientos.ListarMovimientosPorCobrar(p_CTLG_CODE, p_SCSL_CODE, p_CAJA_CODE)
                    res = GenerarTablaPendientes(dt)

                Case "3" 'DIFERIR MONTOS  HACIA CAJA /CUENTA
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim array As Array
                    array = caMovimientos.DiferirEfectivoCaja(p_CTLG_CODE, p_PIDM_CTLG, p_SCSL_CODE, p_CAJA_CODE, p_CODE_MOVI, p_CODE_MOVI_DESTINO,
                                                      p_MONTO_MOBA, p_MONTO_MOAL, p_TIPO_DESTINO_MOBA, p_TIPO_DESTINO_MOAL,
                                                      p_DESTINO_MOBA, p_DESTINO_MOAL, p_USUA_ID, p_MOBA_IND, p_MOAL_IND)
                    If Not (array Is Nothing) Then
                        resb.Append("[{")
                        resb.Append("""RESPUESTA"" :" & """" & array(0).ToString & """,")
                        resb.Append("""CODIGO1"" :" & """" & array(1).ToString & """,")
                        resb.Append("""CODIGO2"" :" & """" & array(2).ToString & """")
                        resb.Append("}]")
                    Else
                        resb.Append("[]")
                    End If
                    res = resb.ToString()

                Case "4" 'Listar movimientos pendientes  MOIE
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = caMovimientos.ListarMovimientosPorCobrarMoie(If(p_CODE = Nothing, "", p_CODE), If(p_CTLG_CODE = Nothing, "", p_CTLG_CODE), If(p_SCSL_CODE = Nothing, "", p_SCSL_CODE),
                                                                      If(p_CAJA_CODE = Nothing, "", p_CAJA_CODE), If(p_BENEFICIARIO_PIDM = Nothing, "0", p_BENEFICIARIO_PIDM),
                                                                      If(p_ASIGNADO_PIDM = Nothing, "0", p_ASIGNADO_PIDM), If(p_MONE_CODE = Nothing, "", p_MONE_CODE),
                                                                      If(p_ESTADOS = Nothing, "", p_ESTADOS))
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.AppendFormat("""CODIGO"" :""{0}"",", MiDataRow("CODIGO").ToString)
                            resb.AppendFormat("""CTLG_CODE"" :""{0}"",", MiDataRow("CTLG_CODE").ToString)
                            resb.AppendFormat("""SCSL_CODE"" :""{0}"",", MiDataRow("SCSL_CODE").ToString)
                            resb.AppendFormat("""CAJA_CODE"" :""{0}"",", MiDataRow("CAJA_CODE").ToString)
                            resb.AppendFormat("""FECHA"" :""{0}"",", MiDataRow("FECHA").ToString)
                            resb.AppendFormat("""TIPO_MOVIMIENTO"" :""{0}"",", MiDataRow("TIPO_MOVIMIENTO").ToString)
                            resb.AppendFormat("""PIDM_BENEFICIARIO"" :""{0}"",", MiDataRow("PIDM_BENEFICIARIO").ToString)
                            resb.AppendFormat("""BENEFICIARIO"" :""{0}"",", MiDataRow("BENEFICIARIO").ToString)
                            resb.AppendFormat("""PIDM_ASIGNADO"" :""{0}"",", MiDataRow("ASIGNADO").ToString)
                            resb.AppendFormat("""CODIGO_CONCEPTO"" :""{0}"",", MiDataRow("CODIGO_CONCEPTO").ToString)
                            resb.AppendFormat("""CONCEPTO"" :""{0}"",", MiDataRow("CONCEPTO").ToString)
                            resb.AppendFormat("""DETALLE"" :""{0}"",", MiDataRow("DETALLE").ToString)
                            resb.AppendFormat("""TIPO_DCTO"" :""{0}"",", MiDataRow("TIPO_DCTO").ToString)
                            resb.AppendFormat("""NRO_DOC"" :""{0}"",", MiDataRow("NRO_DOC").ToString)
                            resb.AppendFormat("""MONEDA"" :""{0}"",", MiDataRow("MONEDA").ToString)
                            resb.AppendFormat("""MONTO"" :""{0}"",", MiDataRow("MONTO").ToString)
                            resb.AppendFormat("""INGRESO_MOBA"" :""{0}"",", MiDataRow("INGRESO_MOBA").ToString)
                            resb.AppendFormat("""INGRESO_MOAL"" :""{0}"",", MiDataRow("INGRESO_MOAL").ToString)
                            resb.AppendFormat("""EGRESO_MOBA"" :""{0}"",", MiDataRow("EGRESO_MOBA").ToString)
                            resb.AppendFormat("""EGRESO_MOAL"" :""{0}"",", MiDataRow("EGRESO_MOAL").ToString)
                            resb.AppendFormat("""USUA_ID"" :""{0}"",", MiDataRow("USUA_ID").ToString)
                            resb.AppendFormat("""ESTADO_IND"" :""{0}""", MiDataRow("ESTADO_IND").ToString)
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString
                Case 5 'Aceptar ingreso MOIE a Caja
                    context.Response.ContentType = "application/json; charset=utf-8"
                    'CREA MOVIMIENTO CAJA
                    p_ORIGEN_DESTINO = context.Request("p_ORIGEN_DESTINO")
                    p_TMCA_CODE = context.Request("p_TMCA_CODE")
                    p_CONC_CODE = context.Request("p_CONC_CODE")
                    p_DESC = context.Request("p_DESC")
                    p_DCTO_CODE = context.Request("p_DCTO_CODE")
                    p_NRO_DOC = context.Request("p_NRO_DOC")
                    p_DCTO_CODE_REF = context.Request("p_DCTO_CODE_REF")
                    p_PAGO_IND = context.Request("p_PAGO_IND")
                    p_MONTO_DCTO_SOLES = context.Request("p_MONTO_DCTO_SOLES")
                    p_MONTO_DCTO_DOLARES = context.Request("p_MONTO_DCTO_DOLARES")
                    p_MOPA_CODE = context.Request("p_MOPA_CODE")
                    p_FOPA_CODE = context.Request("p_FOPA_CODE")
                    p_TTAR_CODE = context.Request("p_TTAR_CODE")
                    p_FECHA_VENCIM = context.Request("p_FECHA_VENCIM")
                    p_FECHA_PAGO = context.Request("p_FECHA_PAGO")
                    p_COD_REF = context.Request("p_COD_REF")
                    p_COMPLETO_IND = context.Request("p_COMPLETO_IND")
                    p_IND_INGR_EGRE = context.Request("p_IND_INGR_EGRE")

                    Dim array As Array
                    Dim array2 As Array
                    array = caMovimientos.CrearMovimientoCaja(p_SCSL_CODE, p_CAJA_CODE, p_ORIGEN_DESTINO, p_TMCA_CODE,
                                                              p_CONC_CODE, p_DESC, p_DCTO_CODE, p_NRO_DOC, p_DCTO_CODE_REF,
                                                              p_PAGO_IND, p_MONTO_DCTO_SOLES, p_MONTO_DCTO_DOLARES, p_MOPA_CODE,
                                                              p_FOPA_CODE, p_TTAR_CODE, p_FECHA_VENCIM, p_FECHA_PAGO, p_COD_REF,
                                                              p_COMPLETO_IND, p_USUA_ID, p_IND_INGR_EGRE)

                    If Not (array Is Nothing) Then
                        If array(0).ToString = "OK" Then
                            array2 = caMovimientos.ActualizarMovimientoPorCobrarMoie(p_CODE, "P", array(1).ToString)
                            If Not (array2 Is Nothing) Then
                                resb.Append("[{")
                                resb.Append("""RESPUESTA"" :" & """" & array2(0).ToString & """")
                                resb.Append("}]")
                            Else
                                resb.Append("[]")
                            End If
                        Else
                            resb.Append("[]")
                        End If
                    Else
                        resb.Append("[]")
                    End If
                    res = resb.ToString()

            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try

    End Sub

    Public Function ObtenerDatosAperturaCaja(ByVal dt As DataTable) As String
        res = ""
        resb.Clear()
        Dim CodUltimoMovimiento As String = ""

        Dim cajaAbiertaInd As Integer = 0
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

        If Not (dt Is Nothing) Then
            CodUltimoMovimiento = dt.Rows(0)("CODIGO").ToString()
            For i As Integer = 0 To dt.Rows.Count - 1
                If Not dt.Rows(i)("CERRADO_IND").ToString() = "S" Then 'Cerrado
                    cajaAbiertaInd += 1
                End If
            Next
        End If
        'Si caja está abierta
        If cajaAbiertaInd > 0 Then
            resb.AppendFormat("<input id='hfCajaAbiertaInd' value='{0}' type='hidden' />", "S")
        Else
            'Si caja esta cerrada
            resb.AppendFormat("<input id='hfCajaAbiertaInd' value='{0}' type='hidden' />", "N")
        End If
        resb.AppendFormat("<input id='hfCodUltimoMovimiento' value='{0}' type='hidden' />", CodUltimoMovimiento)
        'Datos de moneda  
        resb.AppendFormat("<input id='hfMobaCode' value='{0}' type='hidden' />", mobaCode)
        resb.AppendFormat("<input id='hfMoalCode' value='{0}' type='hidden' />", moalCode)
        resb.AppendFormat("<input id='hfDescMonedaBase' value='{0}' type='hidden' />", descMonedaBase)
        resb.AppendFormat("<input id='hfDescMonedaAlterna' value='{0}' type='hidden' />", descMonedaAlterna)
        resb.AppendFormat("<input id='hfSimbMonedaBase' value='{0}' type='hidden' />", simbMonedaBase)
        resb.AppendFormat("<input id='hfSimbMonedaAlterna' value='{0}' type='hidden' />", simbMonedaAlterna)
        res = resb.ToString()
        Return res
    End Function

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
        resb.AppendFormat("<th>DETALLE</th>")
        resb.AppendFormat("<th>NRO DOC</th>")
        resb.AppendFormat("<th>INGRESO ({0})</th>", simbMonedaBase)
        resb.AppendFormat("<th>INGRESO ({0})</th>", simbMonedaAlterna)
        resb.AppendFormat("<th>EGRESO ({0})</th>", simbMonedaBase)
        resb.AppendFormat("<th>EGRESO ({0})</th>", simbMonedaAlterna)
        resb.AppendFormat("<th>USUARIO</th>")
        resb.AppendFormat("<th>ACCIONES</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")
        If Not (dt Is Nothing) Then

            Dim CONTADO As Boolean = False
            Dim CREDITO As Boolean = False
            Dim TRANSFE As Boolean = False
            Dim OTROS As Boolean = False

            For i As Integer = 0 To dt.Rows.Count - 1

                If If(dt.Rows(i)("TIPO").ToString() = "VCONTADO", If(p_CONTADO_IND = "S", True, False), False) Or
                    If(dt.Rows(i)("TIPO").ToString() = "VCREDITO", If(p_CREDITO_IND = "S", True, False), False) Or
                    If(dt.Rows(i)("TIPO").ToString() = "MINGRESO", If(p_OTROS_IND = "S", True, False), False) Or
                    If(dt.Rows(i)("TIPO").ToString() = "MEGRESO", If(p_OTROS_IND = "S", True, False), False) Or
                    If(dt.Rows(i)("TIPO").ToString() = "TRANSFERENCIA", If(p_TRANSFERENCIA_IND = "S", True, False), False) Then


                    'CLICK EN LA FILA
                    If dt.Rows(i)("TABLA_MOVIMIENTO").ToString() = "FVBVTAC" Then
                        resb.AppendFormat("<tr>")
                    ElseIf dt.Rows(i)("TABLA_MOVIMIENTO").ToString() = "FBAMOIE" Then
                        resb.AppendFormat("<tr>")
                    ElseIf dt.Rows(i)("TABLA_MOVIMIENTO").ToString() = "FABMOIE" Then
                        resb.AppendFormat("<tr>")
                    End If
                    'CONTENIDO
                    resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("CODIGO").ToString())
                    resb.AppendFormat("<td style='text-align:center;' data-order='{1}'>{0}</td>", dt.Rows(i)("FECHA").ToString(), ObtenerFecha(dt.Rows(i)("FECHA").ToString()))
                    resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("PERSONA").ToString())
                    resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("CONCEPTO").ToString())
                    resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("DETALLE").ToString())
                    resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("NRO_DOC").ToString())
                    resb.AppendFormat("<td style='text-align:center;'>{0}</td>", If(dt.Rows(i)("INGRESO_SOLES").ToString() = "", "", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("INGRESO_SOLES").ToString()))))
                    resb.AppendFormat("<td style='text-align:center;'>{0}</td>", If(dt.Rows(i)("INGRESO_DOLARES").ToString() = "", "", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("INGRESO_DOLARES").ToString()))))
                    resb.AppendFormat("<td style='text-align:center;'>{0}</td>", If(dt.Rows(i)("EGRESO_SOLES").ToString() = "", "", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("EGRESO_SOLES").ToString()))))
                    resb.AppendFormat("<td style='text-align:center;'>{0}</td>", If(dt.Rows(i)("EGRESO_DOLARES").ToString() = "", "", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("EGRESO_DOLARES").ToString()))))
                    resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("USUARIO").ToString())
                    'ACCIONES
                    ' M_INGRESO, M_EGRESO | V_CONTADO , V_CREDITO | V_TRANSFERENCIA  
                    resb.AppendFormat("<td style='text-align:center;min-width: 85px !important;'>")

                    If dt.Rows(i)("TIPO").ToString() = "MINGRESO" Then

                        resb.AppendFormat("<a onclick=""ConfirmarIngresoMoie('{0}')"" title='Realizar Cobro' class='btn blue' style='margin:0px 2px 2px 0px;'><i class='icon-legal'></i></a>", dt.Rows(i)("CODIGO").ToString())

                    ElseIf dt.Rows(i)("TIPO").ToString() = "MEGRESO" Then

                        resb.AppendFormat("<a onclick=""PagarMoie('{0}')"" title='Realizar Pago' class='btn red' style='margin:0px 2px 2px 0px;'><i class='icon-legal'></i></a>", dt.Rows(i)("CODIGO").ToString())


                    ElseIf dt.Rows(i)("TIPO").ToString() = "VCONTADO" Then

                        resb.AppendFormat("<a onclick=""CobrarVenta('{0}')"" target=""_blank"" title='Realizar Cobro' class='btn blue' style='margin:0px 2px 2px 0px;'><i class='icon-legal'></i></a>", dt.Rows(i)("CODIGO_PERSONA").ToString())
                        resb.AppendFormat("<a href=""?f=nvmanul&codigo={0}"" target=""_blank"" title='Anular Venta' class='btn red' style='margin:0px 2px 2px 0px;'><i class='icon-remove'></i></a>", dt.Rows(i)("CODIGO").ToString())

                    ElseIf dt.Rows(i)("TIPO").ToString() = "VCREDITO" Then

                        resb.AppendFormat("<a onclick=""CobrarVenta('{0}')"" title='Realizar Cobro' class='btn blue' style='margin:0px 2px 2px 0px;'><i class='icon-legal'></i></a>", dt.Rows(i)("CODIGO_PERSONA").ToString())
                        resb.AppendFormat("<a href=""?f=nvmanul&codigo={0}"" target=""_blank"" title='Anular Venta' class='btn red' style='margin:0px 2px 2px 0px;'><i class='icon-remove'></i></a>", dt.Rows(i)("CODIGO").ToString())

                    ElseIf dt.Rows(i)("TIPO").ToString() = "TRANSFERENCIA" Then

                        resb.AppendFormat("<a onclick=""ConfirmarTransferencia('aceptar','{0}')"" class='btn green btnAceptarTranferencia' title='Aceptar Transferencia' style='margin:0px 2px 2px 0px;'><i class='icon-check'></i></a>", dt.Rows(i)("CODIGO").ToString())
                        resb.AppendFormat("<a onclick=""ConfirmarTransferencia('rechazar','{0}')"" class='btn red btnRechazarTransferencia' title='Rechazar Transferencia' style='margin:0px 2px 2px 0px;'><i class='icon-remove'></i></a>", dt.Rows(i)("CODIGO").ToString())

                    End If
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