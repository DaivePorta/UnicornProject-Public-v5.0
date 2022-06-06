<%@ WebHandler Language="VB" Class="CAMDIFE" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CAMDIFE : Implements IHttpHandler
    
     
    Dim OPCION As String
    Dim p_CTLG_CODE, p_SCSL_CODE, p_USUA_ID, p_CAJA_CODE, p_CODE_MOVI, p_CODE_MOVI_DESTINO, p_PIDM_CTLG As String
    Dim p_MONTO_MOBA, p_MONTO_MOAL, p_MOBA_IND, p_MOAL_IND,
        p_TIPO_DESTINO_MOBA, p_TIPO_DESTINO_MOAL,
        p_DESTINO_MOBA, p_DESTINO_MOAL As String
    Dim p_CODE, p_PIDM, p_PIDM_RECEPCION, p_USUA_ID_RECEPCION, p_APROBADO_IND, p_ESTADO_IND, p_NRO_OPERACION As String
  
  
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
        
        'Para transferencias
        p_CODE = context.Request("p_CODE")
        p_PIDM = context.Request("p_PIDM")
        p_PIDM_RECEPCION = context.Request("p_PIDM_RECEPCION")
        p_USUA_ID_RECEPCION = context.Request("p_USUA_ID_RECEPCION")
        p_APROBADO_IND = context.Request("p_APROBADO_IND")
        p_ESTADO_IND = context.Request("p_ESTADO_IND")
        
        p_NRO_OPERACION = context.Request("p_NRO_OPERACION")
        
        Try
            Select Case OPCION
                          
                Case "1" ' ObtenerDatosAperturaCaja
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = caMovimientos.ListarMovimientosCaja("", p_CTLG_CODE, p_SCSL_CODE, p_CAJA_CODE, "", "")
                    res = ObtenerDatosAperturaCaja(dt)
                    
                Case "2" 'Generar tabla detalles de caja (montos)
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = caMovimientos.ListarDetalleMovimientosCaja(p_CODE_MOVI, "", "", "T")
                    res = GenerarTablaTotales(dt)
                    
                Case "3" 'GENERAR TRANSFERENCIA CAJA             
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim array As Array
                    array = caMovimientos.CrearTransferenciaCaja(p_CTLG_CODE, p_SCSL_CODE, p_CAJA_CODE, p_MONTO_MOBA, p_MONTO_MOAL, p_TIPO_DESTINO_MOBA, p_TIPO_DESTINO_MOAL,
                                                      p_DESTINO_MOBA, p_DESTINO_MOAL, p_USUA_ID, p_MOBA_IND, p_MOAL_IND)
                    If Not (array Is Nothing) Then
                        resb.Append("[{")
                        resb.Append("""RESPUESTA"" :" & """" & array(0).ToString & """,")
                        resb.Append("""CODIGO"" :" & """" & array(1).ToString & """")
                        resb.Append("}]")
                    Else
                        resb.Append("[]")
                    End If
                    res = resb.ToString()
              
                Case "4" 'CARGAR CUENTAS BANCARIAS
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim nceAdicionales As New Nomade.NC.NCEAdicionales("Bn")
                    dt = nceAdicionales.Listar_DatosBancarios(p_PIDM_CTLG, "", "", "", "", "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""CODE"" :" & """" & MiDataRow("CODE").ToString & """,")
                            resb.Append("""BANC_CODE"" :" & """" & MiDataRow("BANC_CODE").ToString & """,")
                            resb.Append("""MONE_CODE"" :" & """" & MiDataRow("MONE_CODE").ToString & """,")
                            resb.Append("""TCUE_CODE"" :" & """" & MiDataRow("TCUE_CODE").ToString & """,")
                            resb.Append("""NRO_CUENTA"" :" & """" & MiDataRow("NRO_CUENTA").ToString & """,")
                            resb.Append("""FECHA_CREACION"" :" & """" & MiDataRow("FECHA_CREACION").ToString & """,")
                            resb.Append("""ESTADO_IND"" :" & """" & MiDataRow("ESTADO_IND").ToString & """,")
                            resb.Append("""ACRONIMO"" :" & """" & MiDataRow("ACRONIMO").ToString & """,")
                            resb.Append("""SALDO"" :" & """" & MiDataRow("SALDO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString
                Case "5" ' LISTAR TRANSFERENCIAS EN JSON
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = caMovimientos.ListarTransferenciaCaja(If(p_CODE = Nothing, "", p_CODE), If(p_CTLG_CODE = Nothing, "", p_CTLG_CODE),
                                                               If(p_SCSL_CODE = Nothing, "", p_SCSL_CODE), If(p_CAJA_CODE = Nothing, "", p_CAJA_CODE),
                                                               If(p_PIDM = Nothing, "0", p_PIDM), If(p_PIDM_RECEPCION = Nothing, "0", p_PIDM_RECEPCION),
                                                               If(p_TIPO_DESTINO_MOBA = Nothing, "", p_TIPO_DESTINO_MOBA), If(p_TIPO_DESTINO_MOAL = Nothing, "", p_TIPO_DESTINO_MOAL),
                                                               If(p_DESTINO_MOBA = Nothing, "", p_DESTINO_MOBA), If(p_DESTINO_MOAL = Nothing, "", p_DESTINO_MOAL),
                                                               If(p_APROBADO_IND = Nothing, "", p_APROBADO_IND), If(p_ESTADO_IND = Nothing, "", p_ESTADO_IND),
                                                               If(p_USUA_ID = Nothing, "", p_USUA_ID), If(p_USUA_ID_RECEPCION = Nothing, "", p_USUA_ID_RECEPCION))
      
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.AppendFormat("""CODIGO"" :""{0}"",", MiDataRow("CODIGO").ToString)
                            resb.AppendFormat("""CTLG_CODE"" :""{0}"",", MiDataRow("CTLG_CODE").ToString)
                            resb.AppendFormat("""CTLG_PIDM"" :""{0}"",", MiDataRow("CTLG_PIDM").ToString)
                            resb.AppendFormat("""SCSL_CODE"" :""{0}"",", MiDataRow("SCSL_CODE").ToString)
                            resb.AppendFormat("""CAJA_CODE"" :""{0}"",", MiDataRow("CAJA_CODE").ToString)
                            resb.AppendFormat("""CAJA_ORIGEN"" :""{0}"",", MiDataRow("CAJA_ORIGEN").ToString)
                            resb.AppendFormat("""PIDM"" :""{0}"",", MiDataRow("PIDM").ToString)
                            resb.AppendFormat("""PERSONA_ORIGEN"" :""{0}"",", MiDataRow("PERSONA_ORIGEN").ToString)
                            resb.AppendFormat("""PIDM_RECEPCION"" :""{0}"",", MiDataRow("PIDM_RECEPCION").ToString)
                            resb.AppendFormat("""PERSONA_RECEPCION"" :""{0}"",", MiDataRow("PERSONA_RECEPCION").ToString)
                            resb.AppendFormat("""MONTO_MOBA"" :""{0}"",", MiDataRow("MONTO_MOBA").ToString)
                            resb.AppendFormat("""MONTO_MOAL"" :""{0}"",", MiDataRow("MONTO_MOAL").ToString)
                            resb.AppendFormat("""MOBA_IND"" :""{0}"",", MiDataRow("MOBA_IND").ToString)
                            resb.AppendFormat("""MOAL_IND"" :""{0}"",", MiDataRow("MOAL_IND").ToString)
                            resb.AppendFormat("""TIPO_DESTINO_MOBA"" :""{0}"",", MiDataRow("TIPO_DESTINO_MOBA").ToString)
                            resb.AppendFormat("""TIPO_DESTINO_MOAL"" :""{0}"",", MiDataRow("TIPO_DESTINO_MOAL").ToString)
                            resb.AppendFormat("""CODE_DESTINO_MOBA"" :""{0}"",", MiDataRow("CODE_DESTINO_MOBA").ToString)
                            resb.AppendFormat("""CODE_DESTINO_MOAL"" :""{0}"",", MiDataRow("CODE_DESTINO_MOAL").ToString)
                            resb.AppendFormat("""DESC_DESTINO_MOBA"" :""{0}"",", MiDataRow("DESC_DESTINO_MOBA").ToString)
                            resb.AppendFormat("""DESC_DESTINO_MOAL"" :""{0}"",", MiDataRow("DESC_DESTINO_MOAL").ToString)
                            resb.AppendFormat("""APROBADO_IND"" :""{0}"",", MiDataRow("APROBADO_IND").ToString)
                            resb.AppendFormat("""ESTADO_IND"" :""{0}"",", MiDataRow("ESTADO_IND").ToString)
                            resb.AppendFormat("""ESTADO"" :""{0}"",", MiDataRow("ESTADO").ToString)
                            resb.AppendFormat("""FECHA_EMISION"" :""{0}"",", MiDataRow("FECHA_EMISION").ToString)
                            resb.AppendFormat("""FECHA_RECEPCION"" :""{0}"",", MiDataRow("FECHA_RECEPCION").ToString)
                            resb.AppendFormat("""USUA_ID"" :""{0}"",", MiDataRow("USUA_ID").ToString)
                            resb.AppendFormat("""USUA_ID_RECEPCION"" :""{0}""", MiDataRow("USUA_ID_RECEPCION").ToString)
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString
                Case "6" ' LISTAR TRANSFERENCIAS EN TABLA
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = caMovimientos.ListarTransferenciaCaja(If(p_CODE = Nothing, "", p_CODE), If(p_CTLG_CODE = Nothing, "", p_CTLG_CODE),
                                                            If(p_SCSL_CODE = Nothing, "", p_SCSL_CODE), If(p_CAJA_CODE = Nothing, "", p_CAJA_CODE),
                                                            If(p_PIDM = Nothing, "0", p_PIDM), If(p_PIDM_RECEPCION = Nothing, "0", p_PIDM_RECEPCION),
                                                            If(p_TIPO_DESTINO_MOBA = Nothing, "", p_TIPO_DESTINO_MOBA), If(p_TIPO_DESTINO_MOAL = Nothing, "", p_TIPO_DESTINO_MOAL),
                                                            If(p_DESTINO_MOBA = Nothing, "", p_DESTINO_MOBA), If(p_DESTINO_MOAL = Nothing, "", p_DESTINO_MOAL),
                                                            If(p_APROBADO_IND = Nothing, "", p_APROBADO_IND), If(p_ESTADO_IND = Nothing, "", p_ESTADO_IND),
                                                            If(p_USUA_ID = Nothing, "", p_USUA_ID), If(p_USUA_ID_RECEPCION = Nothing, "", p_USUA_ID_RECEPCION))
                    res = GenerarTablaTransferencias(dt)
                    
                Case "7" 'DIFERIR EFECTIVO A CAJA  ACEPTAR TRANSFERENCIA         
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim array As Array 'p_CODE = TRANSFERENCIA_CODE
                    array = caMovimientos.DiferirEfectivoCaja(p_CODE, p_CTLG_CODE, p_PIDM_CTLG, p_SCSL_CODE, p_CAJA_CODE, p_MONTO_MOBA, p_MONTO_MOAL, p_TIPO_DESTINO_MOBA, p_TIPO_DESTINO_MOAL,
                                                      p_DESTINO_MOBA, p_DESTINO_MOAL, p_USUA_ID, p_USUA_ID_RECEPCION, p_MOBA_IND, p_MOAL_IND, IIf(p_NRO_OPERACION = Nothing, "", p_NRO_OPERACION))
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
                    
                Case "8" 'RECHAZAR TRANSFERENCIA         
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim array As Array 'p_CODE = TRANSFERENCIA_CODE
                    array = caMovimientos.RechazarTransferenciaCaja(p_CODE, p_USUA_ID_RECEPCION)
                    If Not (array Is Nothing) Then
                        resb.Append("[{")
                        resb.Append("""RESPUESTA"" :" & """" & array(0).ToString & """")
                        resb.Append("}]")
                    Else
                        resb.Append("[]")
                    End If
                    res = resb.ToString()
                    
                Case "9" 'LISTAR MONTO EN TRANSFERENCIA DE CAJA
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = caMovimientos.ListarMontoTransferenciaCaja(p_CTLG_CODE, p_SCSL_CODE, p_CAJA_CODE)
                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                    
            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
        
    End Sub
    
    Public Function GenerarTablaTransferencias(ByVal dt As DataTable) As String
        res = ""
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
        
        resb.AppendFormat("<table id=""tblDocumento"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th>CODIGO</th>")
        resb.AppendFormat("<th>EMISIÓN</th>")
        resb.AppendFormat("<th>USUARIO ORIGEN</th>")
        resb.AppendFormat("<th>CAJA ORIGEN</th>")
        resb.AppendFormat("<th>MONTO({0})</th>", simbMonedaBase)
        resb.AppendFormat("<th>MONTO({0})</th>", simbMonedaAlterna)
        resb.AppendFormat("<th>TIPO DESTINO</th>")
        resb.AppendFormat("<th>DESTINO</th>")
        resb.AppendFormat("<th>RECEPCIÓN</th>")
        resb.AppendFormat("<th>USUARIO RECEPCION</th>")
        resb.AppendFormat("<th>ESTADO</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")
                                 
        If (dt IsNot Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("CODIGO").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("FECHA_EMISION").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("USUA_ID").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("CAJA_ORIGEN").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("MONTO_MOBA").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("MONTO_MOAL").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", If(dt.Rows(i)("MOBA_IND").ToString() = "S", dt.Rows(i)("TIPO_DESTINO_MOBA").ToString(), dt.Rows(i)("TIPO_DESTINO_MOAL").ToString()))
                resb.AppendFormat("<td align='left' >{0}</td>", If(dt.Rows(i)("MOBA_IND").ToString() = "S", dt.Rows(i)("DESC_DESTINO_MOBA").ToString(), dt.Rows(i)("DESC_DESTINO_MOAL").ToString()))
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("FECHA_RECEPCION").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("USUA_ID_RECEPCION").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("ESTADO").ToString())
                resb.AppendFormat("</tr>")
            Next
        End If
        
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
        Return res
    End Function
   
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
    
      
    Public Function GenerarTablaTotales(ByVal dt As DataTable) As String
    
        Dim efectivoEgresoSoles As Decimal = 0
        Dim efectivoEgresoDolares As Decimal = 0
        Dim efectivoIngresoSoles As Decimal = 0
        Dim efectivoIngresoDolares As Decimal = 0
        Dim tarjetaIngresoSoles As Decimal = 0
        Dim tarjetaIngresoDolares As Decimal = 0
        Dim tarjetaEgresoSoles As Decimal = 0
        Dim tarjetaEgresoDolares As Decimal = 0
        Dim creditoIngresoSoles As Decimal = 0
        Dim creditoEgresoSoles As Decimal = 0
        Dim creditoIngresoDolares As Decimal = 0
        Dim creditoEgresoDolares As Decimal = 0
        Dim cuentasIngresoSoles As Decimal = 0
        Dim cuentasEgresoSoles As Decimal = 0
        Dim cuentasIngresoDolares As Decimal = 0
        Dim cuentasEgresoDolares As Decimal = 0
        Dim chequesIngresoSoles As Decimal = 0
        Dim chequesEgresoSoles As Decimal = 0
        Dim chequesIngresoDolares As Decimal = 0
        Dim chequesEgresoDolares As Decimal = 0

        Dim totalIngresoSoles As Decimal = 0
        Dim totalIngresoDolares As Decimal = 0
        Dim totalEgresoSoles As Decimal = 0
        Dim totalEgresoDolares As Decimal = 0

        Dim saldoEfectivoSoles As Decimal = 0
        Dim saldoEfectivoDolares As Decimal = 0
        Dim saldoTarjetaSoles As Decimal = 0
        Dim saldoTarjetaDolares As Decimal = 0
        Dim saldoCuentasSoles As Decimal = 0
        Dim saldoCuentasDolares As Decimal = 0
        Dim saldoChequesSoles As Decimal = 0
        Dim saldoChequesDolares As Decimal = 0
        Dim saldoCreditoSoles As Decimal = 0
        Dim saldoCreditoDolares As Decimal = 0
        Dim totalSaldoSoles As Decimal = 0
        Dim totalSaldoDolares As Decimal = 0
          
        If Not (dt Is Nothing) Then
            
            Dim continuar As Boolean = True
            For i As Integer = 0 To dt.Rows.Count - 1
                If dt.Rows(i)("ANULADO_IND") = "N" Or (dt.Rows(i)("ANULADO_IND") = "S" And dt.Rows(i)("DEV_EFECTIVO_IND") = "N") Then
                    continuar = True
                Else
                    continuar = False
                End If
                If continuar Then
                    
                    If Not (dt.Rows(i)("PAGO") Is DBNull.Value) Then
                        If (dt.Rows(i)("PAGO").ToString().Equals("SI")) Then
                            'INGRESOS---------------------------------------
                            If (dt.Rows(i)("TIPO_MOVIMIENTO").ToString().Equals("I")) Then
                                'EFECTIVO
                                If (dt.Rows(i)("FOPA_CODE").ToString().Equals("0008") Or dt.Rows(i)("FOPA_CODE").ToString().Equals("0009")) Then
                                    efectivoIngresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                    efectivoIngresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                                
                                    If (dt.Rows(i)("DESCRIPCION").ToString().Contains("ACUENTA DEL DOCUMENTO ")) Then
                                        If respuestaResta(dt, i) Then
                                            creditoIngresoSoles -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                            creditoIngresoDolares -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                                        End If
                                    End If

                                End If
                                'TARJETA DE DEBITO  / TARJETA DE CREDITO
                                If (dt.Rows(i)("FOPA_CODE").ToString().Equals("0005") Or dt.Rows(i)("FOPA_CODE").ToString().Equals("0006")) Then
                                    tarjetaIngresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                    tarjetaIngresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                                
                                    If (dt.Rows(i)("DESCRIPCION").ToString().Contains("ACUENTA DEL DOCUMENTO ")) Then
                                        If respuestaResta(dt, i) Then
                                            creditoIngresoSoles -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                            creditoIngresoDolares -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                                        End If
                                    End If
                                
                                End If
                                ' DEPOSITO EN CUENTA
                                If (dt.Rows(i)("FOPA_CODE").ToString().Equals("0001")) Then
                                    cuentasIngresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                    cuentasIngresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                                
                                    If (dt.Rows(i)("DESCRIPCION").ToString().Contains("ACUENTA DEL DOCUMENTO ")) Then
                                        If respuestaResta(dt, i) Then
                                            creditoIngresoSoles -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                            creditoIngresoDolares -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                                        End If
                                    End If
                                
                                End If
                                'CHEQUES NO NEGOCIABLES
                                If (dt.Rows(i)("FOPA_CODE").ToString().Equals("0007")) Then
                                    chequesIngresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                    chequesIngresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                                
                                    If (dt.Rows(i)("DESCRIPCION").ToString().Contains("ACUENTA DEL DOCUMENTO ")) Then
                                        If respuestaResta(dt, i) Then
                                            creditoIngresoSoles -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                            creditoIngresoDolares -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                                        End If
                                    End If
                                
                                End If
                                'EFECTIVO + TARJETA CREDITO/DEBITO
                                If (dt.Rows(i)("FOPA_CODE").ToString().Equals("109")) Then
                                    tarjetaIngresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                    tarjetaIngresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                                  
                                    If (dt.Rows(i)("DESCRIPCION").ToString().Contains("ACUENTA DEL DOCUMENTO ")) Then
                                        If respuestaResta(dt, i) Then
                                            creditoIngresoSoles -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                            creditoIngresoDolares -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                                        End If
                                    End If
                                End If
                                'CREDITO
                                If (dt.Rows(i)("FOPA_CODE").ToString().Equals("0018") Or dt.Rows(i)("FOPA_CODE").ToString().Equals("0019")) Then
                                    creditoIngresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                    creditoIngresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                                End If
                            End If
                            '-------
                            'EGRESOS---------------------------------------
                            If (dt.Rows(i)("TIPO_MOVIMIENTO").ToString().Equals("E")) Then
                                efectivoEgresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_SOLES"))
                                efectivoEgresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_DOLARES"))
                                ''EFECTIVO
                                'If (dt.Rows(i)("FOPA_CODE").ToString().Equals("0008") Or dt.Rows(i)("FOPA_CODE").ToString().Equals("0009")) Then
                                '    efectivoEgresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_SOLES"))
                                '    efectivoEgresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_DOLARES"))
                                'End If
                                ''TARJETA DE DEBITO  / TARJETA DE CREDITO
                                'If (dt.Rows(i)("FOPA_CODE").ToString().Equals("0005") Or dt.Rows(i)("FOPA_CODE").ToString().Equals("0006")) Then
                                '    tarjetaEgresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_SOLES"))
                                '    tarjetaEgresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_DOLARES"))
                                'End If
                                '' DEPOSITO EN CUENTA
                                'If (dt.Rows(i)("FOPA_CODE").ToString().Equals("0001")) Then
                                '    cuentasEgresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_SOLES"))
                                '    cuentasEgresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_DOLARES"))
                                'End If
                                ''CHEQUES NO NEGOCIABLES
                                'If (dt.Rows(i)("FOPA_CODE").ToString().Equals("0007")) Then
                                '    chequesEgresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_SOLES"))
                                '    chequesEgresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_DOLARES"))
                                'End If
                                ''EFECTIVO + TARJETA CREDITO/DEBITO
                                'If (dt.Rows(i)("FOPA_CODE").ToString().Equals("109")) Then
                                '    tarjetaEgresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_SOLES"))
                                '    tarjetaEgresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_DOLARES"))
                                'End If
                                ''CREDITO
                                'If (dt.Rows(i)("FOPA_CODE").ToString().Equals("0018") Or dt.Rows(i)("FOPA_CODE").ToString().Equals("0019")) Then
                                '    creditoEgresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_SOLES"))
                                '    creditoEgresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_DOLARES"))
                                'End If
                            End If
                            '------
                        End If
                    End If
                    
                End If
            Next
            totalIngresoSoles = efectivoIngresoSoles + tarjetaIngresoSoles + cuentasIngresoSoles + chequesIngresoSoles + creditoIngresoSoles
            totalIngresoDolares = efectivoIngresoDolares + tarjetaIngresoDolares + cuentasIngresoDolares + chequesIngresoDolares + creditoIngresoDolares
            totalEgresoSoles = efectivoEgresoSoles + tarjetaEgresoSoles + cuentasEgresoSoles + chequesEgresoSoles + creditoEgresoSoles
            totalEgresoDolares = efectivoEgresoDolares + tarjetaEgresoDolares + cuentasEgresoDolares + chequesEgresoDolares + creditoEgresoDolares
                    
            saldoEfectivoSoles = efectivoIngresoSoles - efectivoEgresoSoles
            saldoEfectivoDolares = efectivoIngresoDolares - efectivoEgresoDolares
            saldoTarjetaSoles = tarjetaIngresoSoles - tarjetaEgresoSoles
            saldoTarjetaDolares = tarjetaIngresoDolares - tarjetaEgresoDolares
            'saldoCuentasSoles = cuentasIngresoSoles - cuentasEgresoSoles
            'saldoCuentasDolares = cuentasIngresoDolares - cuentasEgresoDolares
            saldoChequesSoles = chequesIngresoSoles - chequesEgresoSoles
            saldoChequesDolares = chequesIngresoDolares - chequesEgresoDolares
            saldoCreditoSoles = creditoIngresoSoles - creditoEgresoSoles
            saldoCreditoDolares = creditoIngresoDolares - creditoEgresoDolares

            totalSaldoSoles = saldoEfectivoSoles + saldoTarjetaSoles + saldoCuentasSoles + saldoChequesSoles + saldoCreditoSoles
            totalSaldoDolares = saldoEfectivoDolares + saldoTarjetaDolares + saldoCuentasDolares + saldoChequesDolares + saldoCreditoDolares
            
        End If

        'Fila 1 TOTALES
        'resb.AppendFormat("<td style='text-align:right;'><strong>{1}{0:N}</strong></td>", totalIngresoSoles)
        'resb.AppendFormat("<td style='text-align:right;'><strong>{1}{0:N}</strong></td>", totalEgresoSoles)
        'resb.AppendFormat("<td style='text-align:right;'><strong>{1}{0:N}</strong></td>", totalIngresoDolares)
        'resb.AppendFormat("<td style='text-align:right;'><strong>{1}{0:N}</strong></td>", totalEgresoDolares)
        'resb.AppendFormat("<td style='text-align:right;'><strong>{1}{0:N}</strong></td>", totalSaldoSoles)
        'resb.AppendFormat("<td style='text-align:right;'><strong>{1}{0:N}</strong></td>", totalSaldoDolares)
        'Fila 2 EFECTIVO
        'resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", efectivoIngresoSoles)
        'resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", efectivoEgresoSoles)
        'resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", efectivoIngresoDolares)
        'resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", efectivoEgresoDolares)
        resb.AppendFormat("<input id='hfSaldoEfectivoMoba' value='{0:N}' type='hidden' />", saldoEfectivoSoles)
        resb.AppendFormat("<input id='hfSaldoEfectivoMoal' value='{0:N}' type='hidden' />", saldoEfectivoDolares)
      
     
        res = resb.ToString()
        Return res
    End Function

    
    Private Function respuestaResta(ByVal dtx As DataTable, ByVal indice As Integer) As Boolean
        Try
            Dim midato As String = dtx.Rows(indice)("DESCRIPCION").ToString()
            Dim dividido As Array = midato.Split(" ")
            midato = dividido.GetValue(dividido.Length - 1).ToString().Substring(2).Trim()
            For Each midata In dtx.Rows
                Try
                    Dim midatox As String = midata("NRO_DOCUMENTO").ToString().Trim()
                    Dim midatoxy As Array = midatox.Split(" ")
                    midatox = midatoxy.GetValue(0).ToString() + midatoxy.GetValue(1).ToString() + midatoxy.GetValue(2).ToString()
                    
                    If (midatox.Equals(midato)) Then
                        Return True
                    End If
                    
                Catch ex As Exception
                End Try
            Next
        Catch ex As Exception
        End Try
        Return False
    End Function
    
 
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class