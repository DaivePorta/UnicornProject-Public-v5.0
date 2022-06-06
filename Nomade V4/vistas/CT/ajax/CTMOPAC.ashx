<%@ WebHandler Language="VB" Class="CTMOPAC" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CTMOPAC : Implements IHttpHandler, System.Web.SessionState.IRequiresSessionState
    Dim OPCION As String

    Dim CODE_OPER, CODE_MONEDA, CODE_LIBRO, CODE_DINMCUET, CODE_ASNCONTOPR, ESTADO_IND, MOSTRAR_IND, PROC_INT_IND, GEN_ASIENTO_IND, COMPUESTA_IND, CODE_OPDEP, ITEM As String

    Dim empresa, USUA_ID As String

    Dim dt As DataTable
    Dim res As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Try
            OPCION = context.Request("OPCION")

            empresa = Utilities.mGetEmpresa(context)
            USUA_ID = HttpContext.Current.User.Identity.Name

            Select Case OPCION
                Case "LOP"
                    context.Response.ContentType = "application/json; charset=utf-8"

                    Dim coperacion As New Nomade.OP.OPOperaciones("Bn")

                    dt = coperacion.ListarOperaciones(empresa, "", "", "")
                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If
                Case "LAC"
                    context.Response.ContentType = "application/json; charset=utf-8"

                    CODE_MONEDA = context.Request("CODE_MONEDA")
                    CODE_LIBRO = context.Request("CODE_LIBRO")

                    Dim casientoc As New Nomade.CT.CTDinamicaCuenta("Bn")

                    dt = casientoc.fnListaDinamicaCuenta(empresa, CODE_LIBRO, CODE_MONEDA, "", "A")
                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If

                Case "LLC"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim clibroc As New Nomade.CT.CTLibroContable("Bn")

                    dt = clibroc.fnListaLibroContable("", "A")
                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If
                Case "GAOA"
                    context.Response.ContentType = "text/plain"
                    CODE_OPER = context.Request("CODE_OPER")
                    CODE_DINMCUET = context.Request("CODE_DINMCUET")
                    Dim operacionasientocont As New Nomade.CT.CTOperacionAsientoContable("Bn")

                    res = operacionasientocont.AgregarAsientoContableOperacion(empresa, CODE_OPER, CODE_DINMCUET, USUA_ID)

                Case "LOPA"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    CODE_OPER = context.Request("CODE_OPER")
                    Dim operacionasientocont As New Nomade.CT.CTOperacionAsientoContable("Bn")

                    dt = operacionasientocont.ListarAsientoContableOperacion(empresa, IIf(CODE_OPER = Nothing, "", CODE_OPER), "", "")
                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If

                Case "CEACOP"
                    context.Response.ContentType = "text/plain"
                    CODE_DINMCUET = context.Request("CODE_DINMCUET")
                    CODE_OPER = context.Request("CODE_OPER")
                    ESTADO_IND = context.Request("ESTADO_IND")
                    CODE_ASNCONTOPR = context.Request("CODE_ASNCONTOPR")

                    Dim operacionasientocont As New Nomade.CT.CTOperacionAsientoContable("Bn")

                    res = operacionasientocont.CambiarEstadoAsientoContableOperacion(empresa, CODE_ASNCONTOPR, CODE_OPER, CODE_DINMCUET, ESTADO_IND, USUA_ID)

                Case "LOPASCT"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim operacionasientocont As New Nomade.CT.CTOperacionAsientoContable("Bn")

                    dt = operacionasientocont.ListarOperacionAsientosContables(empresa, "", "T", "")
                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If

                Case "LOPASCU"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    CODE_OPER = context.Request("CODE_OPER")
                    Dim operacionasientocont As New Nomade.CT.CTOperacionAsientoContable("Bn")

                    dt = operacionasientocont.ListarOperacionAsientosContables(empresa, CODE_OPER, "U", "")
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