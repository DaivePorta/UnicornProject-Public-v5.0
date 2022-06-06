<%@ WebHandler Language="VB" Class="OPMOPER" %>

Imports System
Imports System.Web
Imports System.Data

Public Class OPMOPER : Implements IHttpHandler, System.Web.SessionState.IRequiresSessionState
    Dim OPCION As String

    Dim OPR_CODE, TIPO_OPCODE, DESCRIPCION, ESTADO_IND, ESTADO,
            MOSTRAR_IND, PROC_INT_IND, GEN_ASIENTO_IND, COMPUESTA_IND,
            CODE_OPDEP, CODE_OPER, ITEM, DETALLE, AUTOMATICA_IND, PERIODICIDAD,
            CANTPLAZO, PLAZO, TIPO_PERSONA, DOCUMENTO, MONEDA, sDetalleMoneda, sDetalleEstado As String

    Dim empresa, USUA_ID As String

    Dim dt As DataTable
    Dim res As String
    Dim respuesta(2) As String
    Dim resb As New StringBuilder

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Try
            OPCION = context.Request("OPCION")

            Dim aux As String = context.Request("sEmpresa")
            empresa = IIf(aux Is Nothing, Utilities.mGetEmpresa(context), aux)

            USUA_ID = HttpContext.Current.User.Identity.Name

            Select Case OPCION
                Case "LTP"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim coperacion As New Nomade.OP.OPOperaciones("Bn")

                    dt = coperacion.ListarTipoOperaciones("", "")
                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If
                Case "GOP"
                    context.Response.ContentType = "text/plain"
                    Dim coperacion As New Nomade.OP.OPOperaciones("Bn")
                    TIPO_OPCODE = context.Request("TIPO_OPCODE")
                    DESCRIPCION = context.Request("DESCRIPCION")
                    ESTADO_IND = context.Request("ESTADO_IND")
                    MOSTRAR_IND = context.Request("MOSTRAR_IND")
                    PROC_INT_IND = context.Request("PROC_INT_IND")
                    GEN_ASIENTO_IND = context.Request("GEN_ASIENTO_IND")
                    COMPUESTA_IND = context.Request("COMPUESTA_IND")
                    AUTOMATICA_IND = context.Request("AUTOMATICA_IND")
                    PERIODICIDAD = context.Request("PERIODICIDAD")
                    CANTPLAZO = context.Request("CANTPLAZO")
                    PLAZO = context.Request("PLAZO")
                    TIPO_PERSONA = context.Request("TIPO_PERSONA")
                    DOCUMENTO = context.Request("DOCUMENTO")
                    sDetalleMoneda = context.Request("sDetalleMoneda")
                    sDetalleEstado = context.Request("sDetalleEstado")

                    Dim oDTMoneda As DataTable
                    oDTMoneda = Utilities.JSONToDataTable(sDetalleMoneda)

                    Dim oDTEstado As DataTable
                    oDTEstado = Utilities.JSONToDataTable(sDetalleEstado)

                    'res = coperacion.CrearOperacion(empresa, TIPO_OPCODE, DESCRIPCION, MOSTRAR_IND, PROC_INT_IND, GEN_ASIENTO_IND, COMPUESTA_IND, AUTOMATICA_IND, PERIODICIDAD, CANTPLAZO, PLAZO, TIPO_PERSONA, DOCUMENTO, ESTADO_IND, USUA_ID, oDTMoneda, oDTEstado)

                Case "AOP"
                    context.Response.ContentType = "text/plain"
                    Dim coperacion As New Nomade.OP.OPOperaciones("Bn")
                    OPR_CODE = context.Request("OPR_CODE")
                    TIPO_OPCODE = context.Request("TIPO_OPCODE")
                    DESCRIPCION = context.Request("DESCRIPCION")
                    ESTADO_IND = context.Request("ESTADO_IND")
                    MOSTRAR_IND = context.Request("MOSTRAR_IND")
                    PROC_INT_IND = context.Request("PROC_INT_IND")
                    GEN_ASIENTO_IND = context.Request("GEN_ASIENTO_IND")
                    COMPUESTA_IND = context.Request("COMPUESTA_IND")
                    AUTOMATICA_IND = context.Request("AUTOMATICA_IND")
                    PERIODICIDAD = context.Request("PERIODICIDAD")
                    CANTPLAZO = context.Request("CANTPLAZO")
                    PLAZO = context.Request("PLAZO")
                    TIPO_PERSONA = context.Request("TIPO_PERSONA")
                    DOCUMENTO = context.Request("DOCUMENTO")
                    sDetalleMoneda = context.Request("sDetalleMoneda")
                    sDetalleEstado = context.Request("sDetalleEstado")

                    Dim oDTMoneda As DataTable
                    oDTMoneda = Utilities.JSONToDataTable(sDetalleMoneda)

                    Dim oDTEstado As DataTable
                    oDTEstado = Utilities.JSONToDataTable(sDetalleEstado)

                   ' res = coperacion.ActualizarOperacion(empresa, OPR_CODE, TIPO_OPCODE, DESCRIPCION, MOSTRAR_IND, PROC_INT_IND, GEN_ASIENTO_IND, COMPUESTA_IND, AUTOMATICA_IND, PERIODICIDAD, CANTPLAZO, PLAZO, TIPO_PERSONA, DOCUMENTO, ESTADO_IND, USUA_ID, oDTMoneda, oDTEstado)

                Case "LOP"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    TIPO_OPCODE = context.Request("TIPO_OPCODE")
                    Dim coperacion As New Nomade.OP.OPOperaciones("Bn")

                    dt = coperacion.ListarOperaciones(empresa, "", IIf(TIPO_OPCODE = Nothing, "", TIPO_OPCODE), "")
                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If

                Case "OTM"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim coperacion As New NOMADE.OP.OPOperaciones("Bn")
                    OPR_CODE = context.Request("OPR_CODE")
                    MONEDA = context.Request("MONEDA")

                    dt = coperacion.ListarOperacionxTipoMoneda(IIf(empresa = Nothing, "", empresa), IIf(OPR_CODE = Nothing, "", OPR_CODE), IIf(MONEDA = Nothing, "", MONEDA))

                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If

                Case "OES"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim coperacion As New NOMADE.OP.OPOperaciones("Bn")
                    OPR_CODE = context.Request("OPR_CODE")
                    ESTADO = context.Request("ESTADO")

                    dt = coperacion.ListarOperacionxEstado(IIf(empresa = Nothing, "", empresa), IIf(OPR_CODE = Nothing, "", OPR_CODE), IIf(ESTADO = Nothing, "", ESTADO))

                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If

                Case "LOPU"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim coperacion As New NOMADE.OP.OPOperaciones("Bn")

                    OPR_CODE = context.Request("OPR_CODE")
                    CODE_OPER = context.Request("OPER_CODE")
                    ESTADO_IND = context.Request("ESTADO_IND")

                    dt = coperacion.ListarOperaciones(IIf(empresa = Nothing, "", empresa), IIf(OPR_CODE = Nothing, "", OPR_CODE), IIf(CODE_OPER = Nothing, "", CODE_OPER), IIf(ESTADO_IND = Nothing, "", ESTADO_IND))

                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If

                Case "LGO"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    OPR_CODE = context.Request("OPR_CODE")
                    CODE_OPER = context.Request("OPER_CODE")
                    ESTADO_IND = context.Request("ESTADO_IND")

                    Dim oOperacion As New NOMADE.OP.OPOperaciones("Bn")

                    dt = oOperacion.ListarGrupoOperaciones(IIf(empresa = Nothing, "", empresa), IIf(CODE_OPER = Nothing, "", CODE_OPER), IIf(OPR_CODE = Nothing, "", OPR_CODE), IIf(ESTADO_IND = Nothing, "", ESTADO_IND))
                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If

                Case "CEOPD"
                    context.Response.ContentType = "text/plain"

                    CODE_OPDEP = context.Request("CODE_OPDEP")
                    ESTADO_IND = context.Request("ESTADO_IND")
                    ITEM = context.Request("ITEM")

                    Dim coperacion As New Nomade.OP.OPOperaciones("Bn")

                    res = coperacion.CambiarEstadoOperacionesDet(empresa, CODE_OPDEP, ITEM, ESTADO_IND, USUA_ID)

                Case "GGO"
                    context.Response.ContentType = "text/plain"

                    Dim oOperacion As New NOMADE.OP.OPOperaciones("Bn")
                    Dim oDt As New DataTable

                    DESCRIPCION = context.Request("DESCRIPCION")
                    ESTADO_IND = context.Request("ESTADO_IND")
                    DETALLE = context.Request("DETALLE")

                    oDt = Utilities.JSONToDataTable(DETALLE)

                    res = oOperacion.CrearProcesoOperaciones(empresa, DESCRIPCION, ESTADO_IND, USUA_ID, oDt)

                Case "AGO"
                    context.Response.ContentType = "text/plain"

                    Dim oOperacion As New NOMADE.OP.OPOperaciones("Bn")
                    Dim oDt As New DataTable

                    CODE_OPDEP = context.Request("CODE_OPDEP")
                    DESCRIPCION = context.Request("DESCRIPCION")
                    ESTADO_IND = context.Request("ESTADO_IND")
                    DETALLE = context.Request("DETALLE")

                    oDt = Utilities.JSONToDataTable(DETALLE)

                    res = oOperacion.ActualizarProcesoOperaciones(empresa, CODE_OPDEP, DESCRIPCION, ESTADO_IND, USUA_ID, oDt)


            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error " + ex.Message)
        End Try
    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class