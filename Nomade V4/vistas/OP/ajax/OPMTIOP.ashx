<%@ WebHandler Language="VB" Class="OPMTIOP" %>

Imports System
Imports System.Web
Imports System.Data

Public Class OPMTIOP : Implements IHttpHandler, System.Web.SessionState.IRequiresSessionState

    Dim OPCION As String

    Dim AGENCIA_CODE, TIPO_CAJA, DESCRIPCION, ID_RESPONSABLE, ESTADO_IND, ID_CAJERO, CODE_TIOP, ESTADO_CAJERO As String

    Dim empresa, USUA_ID As String

    Dim dt As DataTable
    Dim res As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Try
            OPCION = context.Request("OPCION")

            Dim aux As String = context.Request("sEmpresa")
            empresa = IIf(aux Is Nothing, Utilities.mGetEmpresa(context), aux)
            
            USUA_ID = HttpContext.Current.User.Identity.Name

            Select Case OPCION

                Case "GTP"
                    context.Response.ContentType = "text/plain"
                    Dim coperacion As New Nomade.OP.OPOperaciones("Bn")

                    DESCRIPCION = context.Request("DESCRIPCION")
                    ESTADO_IND = context.Request("ESTADO_IND")
                    res = coperacion.CrearTipoOperacion(DESCRIPCION, ESTADO_IND, USUA_ID)

                Case "ATPT"
                    context.Response.ContentType = "text/plain"
                    Dim coperacion As New Nomade.OP.OPOperaciones("Bn")

                    DESCRIPCION = context.Request("DESCRIPCION")
                    ESTADO_IND = context.Request("ESTADO_IND")
                    CODE_TIOP = context.Request("CODE_TIOP")
                    res = coperacion.ActualizarTipoOperacion(CODE_TIOP, DESCRIPCION, ESTADO_IND, "1", USUA_ID)

                Case "ATPE"
                    context.Response.ContentType = "text/plain"
                    Dim coperacion As New Nomade.OP.OPOperaciones("Bn")

                    ESTADO_IND = context.Request("ESTADO_IND")
                    CODE_TIOP = context.Request("CODE_TIOP")
                    res = coperacion.ActualizarTipoOperacion(CODE_TIOP, "", ESTADO_IND, "2", USUA_ID)

                Case "LTP"
                    context.Response.ContentType = "application/json; charset=utf-8"

                    Dim coperacion As New Nomade.OP.OPOperaciones("Bn")

                    dt = coperacion.ListarTipoOperaciones("", "")
                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If
                Case "LTPU"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    CODE_TIOP = context.Request("CODE_TIOP")

                    Dim coperacion As New Nomade.OP.OPOperaciones("Bn")

                    dt = coperacion.ListarTipoOperaciones(CODE_TIOP, "")
                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If

            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write(ex.Message)
        End Try
    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class