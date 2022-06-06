<%@ WebHandler Language="VB" Class="OPMCOBE" %>

Imports System
Imports System.Web
Imports System.Data

Public Class OPMCOBE : Implements IHttpHandler, System.Web.SessionState.IRequiresSessionState
    Dim sOpcion As String

    Dim sCodEmpresa As String
    Dim nIdConcepto As Integer
    Dim sDescripcion As String
    Dim sPeriodicidad As String
    Dim sFechaIni As String
    Dim sFechaFin As String
    Dim sEstado As String
    Dim sCompletado As String
    Dim sCodUsuario As String

    Dim oOPConceptoBeneficios As New Nomade.OP.OPConceptoBeneficios("Bn")

    Dim oDT As New DataTable

    Dim sResponse As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Try
            sOpcion = context.Request("sOpcion")
            
            Dim aux As String = context.Request("sEmpresa")
            sCodEmpresa = IIf(aux Is Nothing, Utilities.mGetEmpresa(context), aux)
            nIdConcepto = context.Request("nIdConcepto")
            sDescripcion = context.Request("sDescripcion")
            sPeriodicidad = context.Request("sPeriodicidad")
            sFechaIni = context.Request("sFechaIni")
            sFechaFin = context.Request("sFechaFin")
            sFechaFin = IIf(sFechaFin Is Nothing, "", sFechaFin).ToString.Trim
            sEstado = context.Request("sEstado")
            sEstado = IIf(sEstado Is Nothing, "", sEstado).ToString.Trim
            'sCodUsuario = context.Request("sCodUsuario")
            sCodUsuario = HttpContext.Current.User.Identity.Name

            context.Response.ContentType = "text/plain"
            Select Case sOpcion
                Case "1" 'listar rangos
                    Dim sRes(1) As String
                    sRes = oOPConceptoBeneficios.fnCrearConceptoBeneficios(sCodEmpresa, sDescripcion, sPeriodicidad, sEstado, sCodUsuario)
                    sResponse = sRes(0)
                Case "2"
                    oOPConceptoBeneficios.fnEditarConceptoBeneficios(sCodEmpresa, nIdConcepto, sDescripcion, sPeriodicidad, sFechaFin, sEstado, sCodUsuario)
                    sResponse = "OK"
                Case "3"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    oDT = oOPConceptoBeneficios.fnListaConceptoBeneficios(sCodEmpresa, nIdConcepto, sEstado)
                    If oDT IsNot Nothing Then
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If
                Case "LTPC"
                    Dim oTipoSocio As New NOMADE.NS.NSSistema("Bn")
                    context.Response.ContentType = "application/json; charset=utf-8"
                    oDT = oTipoSocio.fnListarTblCodigo("TPC", "A")
                    If oDT IsNot Nothing Then
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If
                Case "LTPP"
                    Dim oTipoSocio As New NOMADE.NS.NSSistema("Bn")
                    context.Response.ContentType = "application/json; charset=utf-8"
                    oDT = oTipoSocio.fnListarTblCodigo("TPP", "A")
                    If oDT IsNot Nothing Then
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If
            End Select
            context.Response.Write(sResponse)
        Catch ex As Exception
            context.Response.Write("[Error]: " + ex.Message)
        End Try
    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class