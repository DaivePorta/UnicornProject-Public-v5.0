<%@ WebHandler Language="VB" Class="CAMABRI" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CAMABRI : Implements IHttpHandler
    
    Dim OPCION As String
    Dim CODIGO As String
    Dim CTLG_CODE, SCSL_CODE As String
    Dim CAJA_CODE, CASA_CAMBIO_PIDM, MODO, ASIG_PIDM,
        MONE_BASE_CODE, MONE_BASE_MONTO, TIPO_CAMBIO, COD_MONTO_SOL, COD_MONTO_DOL, IND_APER_CIER, CER_CAJA_SOLES, CER_CAJA_DOLARES,
        INCONSISTENCIA_SOLES, INCONSISTENCIA_DOLARES, USUA_ID, COD_ULT_MOV, COD_CAJA, COD_CTLG, COD_ESTABLE, INI_CAJA_SOLES, INI_CAJA_DOLARES, INCONSISTENCIA_IND, TIPO_INCONS_SOLES, TIPO_INCONS_DOLARES, OBSERVACION As String
    
    Dim dt As DataTable
    Dim dt1 As DataTable
    Dim codigoMontoSoles, codigoMontoDolares As String
    Dim fondoFijoSol As Decimal = 0.0
    Dim fondoFijoDol As Decimal = 0.0
    Dim efectivoIngresoSoles As Decimal = 0.0
    Dim efectivoIngresoDolares As Decimal = 0.0
    Dim efectivoEgresoSoles As Decimal = 0.0
    Dim efectivoEgresoDolares As Decimal = 0.0
    Dim saldoEfectivoSoles As Decimal = 0.0, saldoEfectivoDolares As Decimal = 0.0
    Dim res As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        OPCION = context.Request("OPCION")
     
        USUA_ID = context.Request("USUA_ID")
        COD_ULT_MOV = context.Request("COD_ULT_MOV")
        COD_CAJA = context.Request("COD_CAJA")
        COD_CTLG = context.Request("COD_CTLG")
        COD_ESTABLE = context.Request("COD_ESTABLE")
        INI_CAJA_SOLES = context.Request("INI_CAJA_SOLES")
        INI_CAJA_DOLARES = context.Request("INI_CAJA_DOLARES")
        INCONSISTENCIA_IND = context.Request("INCONSISTENCIA_IND")
        TIPO_INCONS_SOLES = context.Request("TIPO_INCONS_SOLES")
        TIPO_INCONS_DOLARES = context.Request("TIPO_INCONS_DOLARES")
        OBSERVACION = context.Request("OBSERVACION")
        INCONSISTENCIA_SOLES = context.Request("INCONSISTENCIA_SOLES")
        INCONSISTENCIA_DOLARES = context.Request("INCONSISTENCIA_DOLARES")
        COD_MONTO_SOL = context.Request("COD_MONTO_SOL")
        COD_MONTO_DOL = context.Request("COD_MONTO_DOL")
        IND_APER_CIER = context.Request("IND_APER_CIER")
        CER_CAJA_SOLES = context.Request("CER_CAJA_SOLES")
        CER_CAJA_DOLARES = context.Request("CER_CAJA_DOLARES")
        
        Dim oetc As New Nomade.CA.CAOETipoCambio("BN")
        Dim caj As New Nomade.NC.NCCaja("BN")
        Dim caj2 As New NOMADE.CA.CAMovimientos("BN")
        Dim eicaj As New NOMADE.CA.AsignacionFondo("BN")
        
        Try
            Select Case OPCION
             
                Case "5" 'APERTURAR CAJA
                    context.Response.ContentType = "text/plain"
                    res = caj2.abrir_caja(COD_CTLG, COD_ESTABLE, COD_CAJA, INI_CAJA_SOLES, INI_CAJA_DOLARES, USUA_ID, INCONSISTENCIA_IND, IIf(TIPO_INCONS_SOLES = "", String.Empty, TIPO_INCONS_SOLES), IIf(INCONSISTENCIA_SOLES = "", "0", INCONSISTENCIA_SOLES), IIf(TIPO_INCONS_DOLARES = "", String.Empty, TIPO_INCONS_DOLARES), IIf(INCONSISTENCIA_DOLARES = "", "0", INCONSISTENCIA_DOLARES), IIf(OBSERVACION = "", "", OBSERVACION))
                    
                    If COD_MONTO_SOL <> String.Empty Then
                        eicaj.ACTUALIZAR_ASIGNACIONES_ESTADO(COD_MONTO_SOL, "P")
                    End If
                    If COD_MONTO_DOL <> String.Empty Then
                        eicaj.ACTUALIZAR_ASIGNACIONES_ESTADO(COD_MONTO_DOL, "P")
                    End If
              
                    
                Case "6" 'CERRAR CAJA
                    context.Response.ContentType = "text/plain"
                    res = caj2.cerrar_caja(COD_ULT_MOV, CER_CAJA_SOLES, CER_CAJA_DOLARES, INCONSISTENCIA_IND, IIf(TIPO_INCONS_SOLES = "", String.Empty, TIPO_INCONS_SOLES), IIf(INCONSISTENCIA_SOLES = "", "0", INCONSISTENCIA_SOLES), IIf(TIPO_INCONS_DOLARES = "", String.Empty, TIPO_INCONS_DOLARES), IIf(INCONSISTENCIA_DOLARES = "", "0", INCONSISTENCIA_DOLARES), OBSERVACION, USUA_ID)
                    
                
                Case "7" ' Listar movimientos caja (Limit 10)  Generar tabla aperturas caja
                    context.Response.ContentType = "application/text; charset=utf-8"
                    Dim caMovimientos As New NOMADE.CA.CAMovimientos("Bn")
                    Dim cajaAbiertaInd As Integer = 0
                    dt = caMovimientos.ListarMovimientosCaja("", COD_CTLG, COD_ESTABLE, COD_CAJA, "", "")
                    If Not (dt Is Nothing) Then
                        
                   
                        Dim CodUltimoMovimiento As String = dt.Rows(0)("CODIGO").ToString()
                        For i As Integer = 0 To dt.Rows.Count - 1
                       
                            If dt.Rows(i)("CERRADO_IND").ToString() = "S" Then 'Cerrado
                          
                            Else 'Abierto
                                cajaAbiertaInd += 1
                         
                            End If
                       
                        Next
                        If cajaAbiertaInd > 0 Then
                            res = "S," + CodUltimoMovimiento
                        Else
                            'Si caja esta cerrada
                            res = "N"
                        End If
                        
                    Else
                        res = "N"
                    End If
            End Select
            
            
            'APERTURA
            If (COD_ULT_MOV = String.Empty And IND_APER_CIER = "A") Then
                context.Response.ContentType = "application/json; charset=utf-8"
                dt1 = eicaj.LISTAR_INGRESO_EGRESO_CAJA("", COD_CTLG, COD_ESTABLE, COD_CAJA, "A", "E", "")
                
               
                If Not (dt1 Is Nothing) Then
                
                    For i As Integer = 0 To dt1.Rows.Count - 1
                        
                        If (dt1.Rows(i)("MONEDA").ToString().Equals("0002")) Then
                            codigoMontoSoles = dt1.Rows(i)("CODIGO").ToString()
                            fondoFijoSol += Convert.ToDecimal(dt1.Rows(i)("MONTO"))
                        End If
                        If (dt1.Rows(i)("MONEDA").ToString().Equals("0003")) Then
                            codigoMontoDolares = dt1.Rows(i)("CODIGO").ToString()
                            fondoFijoDol += Convert.ToDecimal(dt1.Rows(i)("MONTO"))
                        End If
                    Next
                    
                    
                End If
                
                resb.Append("[")
                resb.Append("{")
                resb.Append("""MONTO_CIERRE_SOL"" :" & """" & "S/. " & 0.0 & """,")
                resb.Append("""MONTO_CIERRE_DOL"" :" & """" & "$. " & 0.0 & """,")
                resb.Append("""MONTO_INICIO_SOL"" :" & """" & "S/. " & fondoFijoSol + 0.0 & """,")
                resb.Append("""MONTO_INICIO_DOL"" :" & """" & "$. " & fondoFijoDol + 0.0 & """,")
                resb.Append("""FONDO_FIJO_DOLARES"" :" & """" & "$. " & fondoFijoDol & """,")
                resb.Append("""COD_MONTO_SOLES"" :" & """" & codigoMontoSoles & """,")
                resb.Append("""COD_MONTO_DOLARES"" :" & """" & codigoMontoDolares & """,")
                resb.Append("""FONDO_FIJO_SOLES"" :" & """" & "S/. " & fondoFijoSol & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()
            End If
            
            
            
            
            'APERTURA
            If (COD_ULT_MOV <> String.Empty And IND_APER_CIER = "A") Then
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = caj2.ListarMovimientosCaja("", COD_CTLG, COD_ESTABLE, COD_CAJA, "", "")
                dt1 = eicaj.LISTAR_INGRESO_EGRESO_CAJA("", COD_CTLG, COD_ESTABLE, COD_CAJA, "A", "E", "")
                
               
                If Not (dt1 Is Nothing) Then
                
                    For i As Integer = 0 To dt1.Rows.Count - 1
                        
                        If (dt1.Rows(i)("MONEDA").ToString().Equals("0002")) Then
                            codigoMontoSoles = dt1.Rows(i)("CODIGO").ToString()
                            fondoFijoSol += Convert.ToDecimal(dt1.Rows(i)("MONTO"))
                        End If
                        If (dt1.Rows(i)("MONEDA").ToString().Equals("0003")) Then
                            codigoMontoDolares = dt1.Rows(i)("CODIGO").ToString()
                            fondoFijoDol += Convert.ToDecimal(dt1.Rows(i)("MONTO"))
                        End If
                    Next
                    
                    
                End If
              
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""MONTO_CIERRE_SOL"" :" & """" & "S/. " & dt.Rows(0)("MONTO_CIERRE_SOL") & """,")
                    resb.Append("""MONTO_CIERRE_DOL"" :" & """" & "$. " & dt.Rows(0)("MONTO_CIERRE_DOL") & """,")
                    resb.Append("""MONTO_INICIO_SOL"" :" & """" & "S/. " & fondoFijoSol + Convert.ToDecimal(dt.Rows(0)("MONTO_CIERRE_SOL")) & """,")
                    resb.Append("""MONTO_INICIO_DOL"" :" & """" & "$. " & fondoFijoDol + Convert.ToDecimal(dt.Rows(0)("MONTO_CIERRE_DOL")) & """,")
                    resb.Append("""FONDO_FIJO_DOLARES"" :" & """" & "$. " & fondoFijoDol & """,")
                    resb.Append("""COD_MONTO_SOLES"" :" & """" & codigoMontoSoles & """,")
                    resb.Append("""COD_MONTO_DOLARES"" :" & """" & codigoMontoDolares & """,")
                    resb.Append("""FONDO_FIJO_SOLES"" :" & """" & "S/. " & fondoFijoSol & """")
                    resb.Append("}")
                    resb.Append("]")
                Else
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""MONTO_CIERRE_SOL"" :" & """" & "S/. " & 0.0 & """,")
                    resb.Append("""MONTO_CIERRE_DOL"" :" & """" & "$. " & 0.0 & """,")
                    resb.Append("""MONTO_INICIO_SOL"" :" & """" & "S/. " & fondoFijoSol + Convert.ToDecimal(0.0) & """,")
                    resb.Append("""MONTO_INICIO_DOL"" :" & """" & "$. " & fondoFijoDol + Convert.ToDecimal(0.0) & """,")
                    resb.Append("""FONDO_FIJO_DOLARES"" :" & """" & "$. " & fondoFijoDol & """,")
                    resb.Append("""COD_MONTO_SOLES"" :" & """" & codigoMontoSoles & """,")
                    resb.Append("""COD_MONTO_DOLARES"" :" & """" & codigoMontoDolares & """,")
                    resb.Append("""FONDO_FIJO_SOLES"" :" & """" & "S/. " & fondoFijoSol & """")
                    resb.Append("}")
                    resb.Append("]")
                End If
               
                res = resb.ToString()
            End If
            
            
            'CIERRE
            If (COD_ULT_MOV <> String.Empty And IND_APER_CIER = "C") Then
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = caj2.ListarDetalleMovimientosCaja(COD_ULT_MOV, "", "", "T")
               
                
               
                If Not (dt Is Nothing) Then
                
                    For i As Integer = 0 To dt.Rows.Count - 1
                        
                        If (dt.Rows(i)("PAGO").ToString().Equals("SI")) Then
                            If (dt.Rows(i)("TIPO_MOVIMIENTO").ToString().Equals("I") And dt.Rows(i)("ANULADO_IND").ToString().Equals("N") And dt.Rows(i)("DEV_EFECTIVO_IND").ToString().Equals("N")) Then
                                If (dt.Rows(i)("FOPA_CODE").ToString().Equals("0008")) Then
                                    efectivoIngresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                    efectivoIngresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                                End If
                            End If
                            If (dt.Rows(i)("TIPO_MOVIMIENTO").ToString().Equals("I") And dt.Rows(i)("ANULADO_IND").ToString().Equals("S") And dt.Rows(i)("DEV_EFECTIVO_IND").ToString().Equals("N")) Then
                                If (dt.Rows(i)("FOPA_CODE").ToString().Equals("0008")) Then
                                    efectivoIngresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                    efectivoIngresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                                End If
                            End If
                            If (dt.Rows(i)("TIPO_MOVIMIENTO").ToString().Equals("E") And dt.Rows(i)("ANULADO_IND").ToString().Equals("N") And dt.Rows(i)("DEV_EFECTIVO_IND").ToString().Equals("N")) Then
                                'If (dt.Rows(i)("FOPA_CODE").ToString().Equals("0008")) Then
                                efectivoEgresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_SOLES"))
                                efectivoEgresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_DOLARES"))
                                'End If
                            End If
                            
                        End If
                        
                    Next
                    
                    saldoEfectivoSoles = efectivoIngresoSoles - efectivoEgresoSoles
                    saldoEfectivoDolares = efectivoIngresoDolares - efectivoEgresoDolares
                End If
              
                
                resb.Append("[")
                resb.Append("{")
                resb.Append("""HABER_SOLES"" :" & """" & "S/. " & saldoEfectivoSoles & """,")
                resb.Append("""HABER_DOLARES"" :" & """" & "$. " & saldoEfectivoDolares & """,")
                resb.Append("""HABER_SOLESlll"" :" & """" & "S/. " & saldoEfectivoDolares & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()
            End If
            
            
            context.Response.Write(res)
            
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
        
    End Sub
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class