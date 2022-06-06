<%@ WebHandler Language="VB" Class="CTMDICU" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CTMDICU : Implements IHttpHandler, System.Web.SessionState.IRequiresSessionState
    Dim sOpcion As String

    Dim sCodEmpresa As String
    Dim sCodOperacion As String
    Dim sCodTipoMoneda As String
    Dim sCodLibro As String
    Dim sDescripcion As String
    Dim sEstado As String
    Dim sCodUsuario As String
    Dim sJsonDinamicaCuentaDet As String
    Dim oDT As DataTable

    Dim oCTDinamicaCuenta As New Nomade.CT.CTDinamicaCuenta("Bn")

    Dim sResponse As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Try
            sOpcion = context.Request("sOpcion")

            sCodEmpresa = Utilities.mGetEmpresa(context)

            sCodOperacion = context.Request("sCodOperacion")
            sCodOperacion = IIf(sCodOperacion Is Nothing, "", sCodOperacion)

            sCodTipoMoneda = context.Request("sCodTipoMoneda")
            sCodTipoMoneda = IIf(sCodTipoMoneda Is Nothing, "", sCodTipoMoneda)

            sCodLibro = context.Request("sCodLibro")
            sCodLibro = IIf(sCodLibro Is Nothing, "", sCodLibro)

            sDescripcion = context.Request("sDescripcion")
            sDescripcion = IIf(sDescripcion Is Nothing, "", sDescripcion)

            sEstado = context.Request("sEstado")
            sEstado = IIf(sEstado Is Nothing, "", sEstado)

            sCodUsuario = HttpContext.Current.User.Identity.Name

            sJsonDinamicaCuentaDet = context.Request("sJsonDinamicaCuentaDet")
            sJsonDinamicaCuentaDet = IIf(sJsonDinamicaCuentaDet Is Nothing, "", sJsonDinamicaCuentaDet)

            context.Response.ContentType = "text/plain"
            Select Case sOpcion
                Case "1"
                    Dim oDT_TablaDinamicaCuentaDet As DataTable = Utilities.JSONToDataTable(sJsonDinamicaCuentaDet)
                    oCTDinamicaCuenta.fnAgregarDinamicaCuenta(sCodEmpresa, sCodOperacion, sCodTipoMoneda, sCodLibro, sDescripcion, sEstado, sCodUsuario, Utilities.DataTableToCadena(oDT_TablaDinamicaCuentaDet))
                    sResponse = "OK"
                Case "2"
                    Dim oDT_TablaDinamicaCuentaDet As DataTable = Utilities.JSONToDataTable(sJsonDinamicaCuentaDet)
                    oCTDinamicaCuenta.fnEditarDinamicaCuenta(sCodEmpresa, sCodOperacion, sCodTipoMoneda, sCodLibro, sDescripcion, sEstado, sCodUsuario, Utilities.DataTableToCadena(oDT_TablaDinamicaCuentaDet)) 'oDT_TablaDinamicaCuentaDet)
                    sResponse = "OK"
                Case "3"
                    oDT = oCTDinamicaCuenta.fnListaDinamicaCuenta(sCodEmpresa, sCodOperacion, sCodTipoMoneda, sCodLibro, sEstado)
                    If oDT Is Nothing Then
                        sResponse = "{}"
                    Else
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If
                Case "4"
                    Dim bEstado As Boolean = oCTDinamicaCuenta.fnCambiarEstadoDinamicaCuenta(sCodEmpresa, sCodOperacion, sCodTipoMoneda, sCodUsuario)
                    sResponse = bEstado 'IIf(bEstado, "A", "I")
                Case "5"
                    oDT = oCTDinamicaCuenta.fnListaDinamicaCuentaDet(sCodEmpresa, sCodOperacion, sCodTipoMoneda, sCodLibro, sEstado)
                    If oDT Is Nothing Then
                        sResponse = "{}"
                    Else
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If
                'Case "6"
                '    Dim oDT_TablaDinamicaCuentaDet As DataTable = Utilities.JSONToDataTable(sJsonDinamicaCuentaDet)
                '    oDT = oCTDinamicaCuenta.fnExisteDinamicaCuentaDet(sCodEmpresa, sCodLibro, sCodTipoMoneda, sCodDinamicaCuenta, oDT_TablaDinamicaCuentaDet)
                '    If oDT Is Nothing Then
                '        sResponse = "{}"
                '    Else
                '        sResponse = Utilities.DataTableToJSON(oDT)
                '    End If
                Case "7"
                    oDT = oCTDinamicaCuenta.fnListaOperacionesxDinamicaCuenta(sCodEmpresa, sCodLibro, sCodTipoMoneda, sEstado)
                    If oDT Is Nothing Then
                        sResponse = "{}"
                    Else
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If
            End Select
            context.Response.Write(sResponse)
        Catch ex As Exception
            Dim sMensaje As String = ex.Message
            If (sMensaje.IndexOf("[Advertencia]:") >= 0) Then
                context.Response.Write(ex.Message)
            Else
                context.Response.Write("[Error]: " + ex.Message)
            End If
        End Try
    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class