<%@ WebHandler Language="VB" Class="CTMLICO" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CTMLICO : Implements IHttpHandler, System.Web.SessionState.IRequiresSessionState
    Dim sOpcion As String

    Dim sCodLibro As String
    Dim sCodigoSunat As String
    Dim sDescripcion As String
    Dim sDescripcionCorta As String
    Dim sEstado As String
    Dim sCodUsuario As String

    Dim oDT As DataTable

    Dim oCTLibroContable As New Nomade.CT.CTLibroContable("Bn")

    Dim sResponse As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Try
            sOpcion = context.Request("sOpcion")

            sCodLibro = context.Request("sCodLibro")
            sCodLibro = IIf(sCodLibro Is Nothing, "", sCodLibro)

            sCodigoSunat = context.Request("sCodigoSunat")
            sCodigoSunat = IIf(sCodigoSunat Is Nothing, "", sCodigoSunat)

            sDescripcion = context.Request("sDescripcion")
            sDescripcion = IIf(sDescripcion Is Nothing, "", sDescripcion)

            sDescripcionCorta = context.Request("sDescripcionCorta")
            sDescripcionCorta = IIf(sDescripcionCorta Is Nothing, "", sDescripcionCorta)

            sEstado = context.Request("sEstado")
            sEstado = IIf(sEstado Is Nothing, "", sEstado)

            sCodUsuario = HttpContext.Current.User.Identity.Name

            context.Response.ContentType = "text/plain"
            Select Case sOpcion
                Case "1"
                    Dim bExisteCodSunat As Boolean = oCTLibroContable.fnExisteCodSunatLibroContable(sCodLibro, sCodigoSunat)
                    If bExisteCodSunat Then
                        sResponse = "[Advertencia]: El código Sunat ya existe en la Base de Datos."
                    Else
                        sResponse = oCTLibroContable.fnAgregarLibroContable(sCodigoSunat, sDescripcion, sDescripcionCorta, sEstado, sCodUsuario)
                    End If
                Case "2"
                    Dim bExisteCodSunat As Boolean = oCTLibroContable.fnExisteCodSunatLibroContable(sCodLibro, sCodigoSunat)
                    If bExisteCodSunat Then
                        sResponse = "[Advertencia]: El código Sunat ya existe en la Base de Datos."
                    Else
                        oCTLibroContable.fnEditarLibroContable(sCodLibro, sCodigoSunat, sDescripcion, sDescripcionCorta, sEstado, sCodUsuario)
                        sResponse = "OK"
                    End If
                Case "3"
                    oDT = oCTLibroContable.fnListaLibroContable(sCodLibro, sEstado)
                    If oDT Is Nothing Then
                        sResponse = "{}"
                    Else
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If
                Case "4"
                    Dim bEstado As Boolean = oCTLibroContable.fnCambiarEstadoLibroContable(sCodLibro, sCodUsuario)
                    sResponse = bEstado 'IIf(bEstado, "A", "I")
            End Select
            context.Response.Write(sResponse)
        Catch ex As Exception
            context.Response.Write("[Error]:" + ex.Message)
        End Try
    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class