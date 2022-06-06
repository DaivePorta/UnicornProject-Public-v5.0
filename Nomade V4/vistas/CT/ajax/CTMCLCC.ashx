<%@ WebHandler Language="VB" Class="CTMCLCC" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CTMCLCC : Implements IHttpHandler, System.Web.SessionState.IRequiresSessionState
    Dim sOpcion As String

    Dim sCodClaseCuenta As String
    Dim sCodigoSunat As String
    Dim sDescripcion As String
    Dim sDescripcionCorta As String
    Dim nNumeracion As String
    Dim sEstado As String
    Dim sCodUsuario As String

    Dim sCodEmpresa As String
    Dim sUsaCentroCosto As String
    Dim sGeneraDestino As String

    Dim oDT As DataTable

    Dim oCTClaseCuentaContable As New Nomade.CT.CTClaseCuentaContable("Bn")

    Dim sResponse As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Try
            sOpcion = context.Request("sOpcion")

            sCodClaseCuenta = context.Request("sCodClaseCuenta")
            sCodClaseCuenta = IIf(sCodClaseCuenta Is Nothing, "", sCodClaseCuenta)

            sCodigoSunat = context.Request("sCodigoSunat")
            sCodigoSunat = IIf(sCodigoSunat Is Nothing, "", sCodigoSunat)

            sDescripcion = context.Request("sDescripcion")
            sDescripcion = IIf(sDescripcion Is Nothing, "", sDescripcion)

            sDescripcionCorta = context.Request("sDescripcionCorta")
            sDescripcionCorta = IIf(sDescripcionCorta Is Nothing, "", sDescripcionCorta)

            Dim sNumeracion As String = context.Request("nNumeracion")
            sNumeracion = IIf(sNumeracion Is Nothing, "", sNumeracion)
            nNumeracion = IIf(sNumeracion.Equals(""), -1, sNumeracion)
            nNumeracion = IIf(nNumeracion < 0, -1, nNumeracion)

            sEstado = context.Request("sEstado")
            sEstado = IIf(sEstado Is Nothing, "", sEstado)

            sCodEmpresa = Utilities.mGetEmpresa(context)
            sCodUsuario = HttpContext.Current.User.Identity.Name

            sUsaCentroCosto = IIf(context.Request("sUsaCentroCosto") Is Nothing, "", context.Request("sUsaCentroCosto"))
            sGeneraDestino = IIf(context.Request("sGeneraDestino") Is Nothing, "", context.Request("sGeneraDestino"))

            context.Response.ContentType = "text/plain"
            Select Case sOpcion
                Case "0"
                    'oDT = p.Listar_TipoPlan(String.Empty, "A")
                    'If Not (oDT Is Nothing) Then
                    '    resb.Append("[")
                    '    For Each MiDataRow As DataRow In oDT.Rows
                    '        resb.Append("{")
                    '        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                    '        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION_CORTA").ToString & """")
                    '        resb.Append("}")
                    '        resb.Append(",")
                    '    Next
                    '    resb.Append("{}")
                    '    resb = resb.Replace(",{}", String.Empty)
                    '    resb.Append("]")
                    'End If
                    'sResponse = resb.ToString()

                Case "1"
                    sResponse = oCTClaseCuentaContable.fnAgregarClaseCuentaContab(sCodigoSunat, sDescripcion, sDescripcionCorta, nNumeracion, sEstado, sCodUsuario, sUsaCentroCosto, sGeneraDestino)
                Case "2"
                    oCTClaseCuentaContable.fnEditarClaseCuentaContab(sCodClaseCuenta, sCodigoSunat, sDescripcion, sDescripcionCorta, nNumeracion, sEstado, sCodUsuario, sUsaCentroCosto, sGeneraDestino)
                    sResponse = "OK"
                Case "3"
                    oDT = oCTClaseCuentaContable.fnListaClasesCuentas(sCodClaseCuenta, nNumeracion, sEstado)
                    If oDT Is Nothing Then
                        sResponse = "[]"
                    Else
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If
                Case "4"
                    sResponse = oCTClaseCuentaContable.fnCambiarEstadoClaseCtaContab(sCodClaseCuenta, sCodUsuario)
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