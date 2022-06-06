<%@ WebHandler Language="VB" Class="CAMOETC" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CAMOETC : Implements IHttpHandler
    
    Dim OPCION As String
    Dim CODIGO As String
    Dim CTLG_CODE, SCSL_CODE As String
    Dim CAJA_CODE, CASA_CAMBIO_PIDM, MODO, ASIG_PIDM,
        MONE_BASE_CODE, MONE_BASE_MONTO, TIPO_CAMBIO,
        MONE_CAMBIO_CODE, MONE_CAMBIO_MONTO, USUA_ID,
        p_FECHA_OPE, p_HORA_OPE As String
    
    Dim dt As DataTable
    
    Dim res As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        OPCION = context.Request("OPCION")
        CODIGO = context.Request("CODIGO")
        CTLG_CODE = context.Request("CTLG_CODE")
        SCSL_CODE = context.Request("SCSL_CODE")
        CAJA_CODE = context.Request("CAJA_CODE")
        CASA_CAMBIO_PIDM = context.Request("CASA_CAMBIO_PIDM")
        MODO = context.Request("MODO")
        ASIG_PIDM = context.Request("ASIG_PIDM")
        MONE_BASE_CODE = context.Request("MONE_BASE_CODE")
        MONE_BASE_MONTO = context.Request("MONE_BASE_MONTO")
        TIPO_CAMBIO = context.Request("TIPO_CAMBIO")
        MONE_CAMBIO_CODE = context.Request("MONE_CAMBIO_CODE")
        MONE_CAMBIO_MONTO = context.Request("MONE_CAMBIO_MONTO")
        USUA_ID = context.Request("USUA_ID")
        p_FECHA_OPE = Utilities.fechaLocal(context.Request("FECHA_OPE"))
        p_HORA_OPE = context.Request("HORA_OPE")
        
        Dim oetc As New Nomade.CA.CAOETipoCambio("BN")
        
        Try
            Select Case OPCION
                Case "0" 'Obtener OETipoCambio
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = oetc.ListarOETipoCambio(CODIGO, "", IIf(CTLG_CODE Is Nothing, "", CTLG_CODE))
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                            resb.Append("""SCSL_CODE"" :" & """" & MiDataRow("SCSL_CODE").ToString & """,")
                            resb.Append("""CAJA_CODE"" :" & """" & MiDataRow("CAJA_CODE").ToString & """,")
                            resb.Append("""CASA_CAMBIO_PIDM"" :" & """" & MiDataRow("CASA_CAMBIO_PIDM").ToString & """,")
                            resb.Append("""CASA_CAMBIO"" :" & """" & MiDataRow("CASA_CAMBIO").ToString & """,")
                            resb.Append("""CASA_CAMBIO_NC"" :" & """" & MiDataRow("CASA_CAMBIO_NC").ToString & """,")
                            resb.Append("""MODO"" :" & """" & MiDataRow("MODO").ToString & """,")
                            resb.Append("""ASIGNACION_PIDM"" :" & """" & MiDataRow("ASIGNACION_PIDM").ToString & """,")
                            resb.Append("""ASIGNACION"" :" & """" & MiDataRow("ASIGNACION").ToString & """,")
                            resb.Append("""MONE_BASE_CODE"" :" & """" & MiDataRow("MONE_BASE_CODE").ToString & """,")
                            resb.Append("""MONE_BASE_MONTO"" :" & """" & MiDataRow("MONE_BASE_MONTO").ToString & """,")
                            resb.Append("""TIPO_CAMBIO"" :" & """" & MiDataRow("TIPO_CAMBIO").ToString & """,")
                            resb.Append("""VARIACION_TC"" :" & """" & MiDataRow("VARIACION_TC").ToString & """,")
                            resb.Append("""FECHA_OPERACION"" :" & """" & MiDataRow("SOLO_FECHA_OPERACION").ToString & """,")
                            resb.Append("""HORA_OPERACION"" :" & """" & MiDataRow("FECHA_OPERACION").ToString.Substring(10) & """,") ' MiDataRow("HORA_OPERACION").ToString
                            resb.Append("""MONE_CAMBIO_CODE"" :" & """" & MiDataRow("MONE_CAMBIO_CODE").ToString & """,")
                            resb.Append("""MONE_CAMBIO_MONTO"" :" & """" & MiDataRow("MONE_CAMBIO_MONTO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "1" 'Listar Proveedores
                    Dim prov As New Nomade.NC.NCEProveedor("BN")
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = prov.ListarProveedor("0", "A", CTLG_CODE, "")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            If row("ACTIVIDAD").ToString <> "" Then
                                If row("ACTIVIDAD").ToString Like "*65994*" Or row("ACTIVIDAD").ToString Like "*6419*" Then
                                    resb.Append("{")
                                    resb.Append("""RAZON_SOCIAL"" :" & """" & row("RAZON_SOCIAL").ToString & """,")
                                    resb.Append("""DIRECCION"" :" & """" & row("DIRECCION").ToString & """,")
                                    resb.Append("""NOMBRE_COMERCIAL"" :" & """" & row("NOMBRE_COMERCIAL").ToString & """,")
                                    resb.Append("""PIDM"" :" & """" & row("PIDM").ToString & """")
                                    resb.Append("}")
                                    resb.Append(",")
                                End If
                            End If
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                        resb = resb.Replace("[{}]", String.Empty)
                    End If
                    res = resb.ToString()
                Case "2" 'Listar Cajas
                    Dim caja As New Nomade.NC.NCCaja("BN")
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = caja.ListarCajerosCaja("", USUA_ID, CTLG_CODE, SCSL_CODE)
                    resb.Append("[")
                    If Not (dt Is Nothing) Then
                        For Each row As DataRow In dt.Rows
                            'If row("ESTADO_SESION").ToString = "ABIERTO" Then
                            resb.Append("{")
                            resb.Append("""CAJA_CODE"":""" & row("CAJA_CODE").ToString & """,")
                            resb.Append("""ESTADO"":""" & row("ESTADO_SESION").ToString & """,")
                            resb.Append("""DESCRIPCION_CAJA"":""" & row("DESCRIPCION_CAJA").ToString & """")
                            resb.Append("},")
                            'End If
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                    End If
                    resb.Append("]")
                    resb.Replace("[{}]", "[]")
                    res = resb.ToString()
                Case "3" 'Listar Monedas
                    Dim l As New Nomade.GL.GLLetras("BN")
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = l.ListarMoneda(CTLG_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                            resb.Append("""TIPO"":""" & row("TIPO").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "4" 'Listar Empleados
                    Dim emp As New Nomade.NC.NCEEmpleado("BN")
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = emp.Listar_Empleados("0", "0", "A", CTLG_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PIDM"":""" & row("PIDM").ToString & """,")
                            resb.Append("""NOMBRE_EMPLEADO"":""" & row("NOMBRE_EMPLEADO").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "MONTO_CAJA"
                    context.Response.ContentType = "text/plain"
                    CAJA_CODE = context.Request("CAJA_CODE")
                    Dim MONE_TIPO As String = context.Request("MONE_TIPO")
                    dt = New Nomade.NC.NCCaja("BN").ListarCajerosCaja(CAJA_CODE, USUA_ID, "", "")
                    If Not dt Is Nothing Then
                        res = IIf(MONE_TIPO = "MOBA", dt.Rows(0)("MONTO_BASE").ToString, dt.Rows(0)("MONTO_ALTERNO").ToString)
                    Else
                        res = "0.00"
                    End If
                Case "5" 'GRABAR
                    context.Response.ContentType = "text/plain"
                    res = oetc.CrearOETipoCambio(CAJA_CODE, CASA_CAMBIO_PIDM, MODO, IIf(ASIG_PIDM = "", Nothing, ASIG_PIDM), MONE_BASE_CODE, MONE_BASE_MONTO, TIPO_CAMBIO, MONE_CAMBIO_CODE, MONE_CAMBIO_MONTO, USUA_ID, p_FECHA_OPE, p_HORA_OPE)
                Case "6" 'ACTUALIZAR
                    context.Response.ContentType = "text/plain"
                    res = oetc.ActualizarOETipoCambio(CODIGO, CAJA_CODE, CASA_CAMBIO_PIDM, MODO, IIf(ASIG_PIDM = "", Nothing, ASIG_PIDM), MONE_BASE_CODE, MONE_BASE_MONTO, TIPO_CAMBIO, MONE_CAMBIO_CODE, MONE_CAMBIO_MONTO, USUA_ID)
                Case "7" 'Obtener OETipoCambio
                    context.Response.ContentType = "text/plain"
                    dt = oetc.ListarOETipoCambio("", "", CTLG_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""CTLG_DESC"" :" & """" & MiDataRow("CTLG_DESC").ToString & """,")
                            resb.Append("""SCSL_DESC"" :" & """" & MiDataRow("SCSL_DESC").ToString & """,")
                            resb.Append("""CAJA_DESC"" :" & """" & MiDataRow("CAJA_DESC").ToString & """,")
                            resb.Append("""CASA_CAMBIO_NC"" :" & """" & MiDataRow("CASA_CAMBIO_NC").ToString & """,")
                            
                            resb.Append("""MONEDA_BASE"" :" & """" & MiDataRow("MONEDA_BASE").ToString & """,")
                            resb.Append("""MONTO_BASE"" :" & """" & MiDataRow("MONE_BASE_MONTO").ToString & """,")
                            resb.Append("""MONEDA_CONVERT"" :" & """" & MiDataRow("MONEDA_CONVERT").ToString & """,")
                            resb.Append("""MONTO_CONVERT"" :" & """" & MiDataRow("MONE_CAMBIO_MONTO").ToString & """,")
                            resb.Append("""TIPO_CAMBIO"" :" & """" & MiDataRow("TIPO_CAMBIO").ToString & """,")
                            resb.Append("""FECHA_OPERACION"" :" & """" & MiDataRow("FECHA_OPERACION").ToString & """,")
                            resb.Append("""FECHA_SISTEMA"" :" & """" & MiDataRow("FECHA_SISTEMA").ToString & """,")
                            
                            resb.Append("""MODO"" :" & """" & MiDataRow("MODO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
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
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class