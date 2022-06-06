<%@ WebHandler Language="VB" Class="CCMCULV" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CCMCULV : Implements IHttpHandler, System.Web.SessionState.IRequiresSessionState
    Private sOpcion As String
    Private sCodigo As String
    Private sCodRef As String
    Private iNroCuotas As Integer
    Private sCuotaFija As String
    Private iPeriodoCuota As Integer
    Private sEstado As String
    Private sCodUsuario As String

    Private sJSONDetalle As String

    Private sResponse As String

    Private oTransaccion As New Nomade.DataAccess.Transaccion()

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Try
            sOpcion = context.Request("sOpcion")
            sCodigo = context.Request("sCodigo")
            sCodRef = context.Request("sCodRef")
            iNroCuotas = context.Request("iNroCuotas")
            sCuotaFija = context.Request("sCuotaFija")
            iPeriodoCuota = context.Request("iPeriodoCuota")
            sEstado = context.Request("sEstado")

            sCodUsuario = HttpContext.Current.User.Identity.Name

            sJSONDetalle = context.Request("sJSONDetalle")

            context.Response.ContentType = "text/plain"
            Select Case sOpcion
                Case "CCLVC"
                    Dim oDT_Det As New DataTable()
                    oDT_Det = Utilities.json2Datatable(sJSONDetalle)
                    Dim oCCCuotaLibre As New Nomade.CC.CCCuotaLibre("Bn")
                    oTransaccion.fnBeginTransaction(Nomade.DataAccess.Transaccion.eIsolationLevel.READ_UNCOMMITTED)

                    sCodigo = oCCCuotaLibre.fnCrearCuotaLibreVtaCab(sCodRef, iNroCuotas, sCuotaFija, iPeriodoCuota, sCodUsuario, oTransaccion)
                    Dim iItem As Integer = 0
                    Dim iNroDias As Integer
                    Dim sFechaVcmto As String
                    Dim nMonto As Decimal
                    For Each oDR As DataRow In oDT_Det.Rows
                        iItem = iItem + 1
                        iNroDias = CInt(oDR("NRO_DIAS"))
                        sFechaVcmto = oDR("FECHA").ToString()
                        nMonto = CDec(oDR("MONTO"))
                        oCCCuotaLibre.fnCrearCuotaLibreVtaDet(sCodigo, iItem, iNroDias, Utilities.fechaLocal(sFechaVcmto), nMonto, sCodUsuario, oTransaccion)
                    Next
                    oTransaccion.fnCommitTransaction()
                    sResponse = sCodigo
                Case "ACLVC"
                    Dim oDT_Det As New DataTable()
                    oDT_Det = Utilities.json2Datatable(sJSONDetalle)
                    Dim oCCCuotaLibre As New Nomade.CC.CCCuotaLibre("Bn")

                    oTransaccion.fnBeginTransaction(Nomade.DataAccess.Transaccion.eIsolationLevel.READ_UNCOMMITTED)

                    oCCCuotaLibre.fnActualizarCuotaLibreVtaCab(sCodigo, sCodRef, iNroCuotas, sCuotaFija, iPeriodoCuota, sCodUsuario, oTransaccion)

                    oCCCuotaLibre.fnEliminarCuotaLibreVtaDet(sCodigo, oTransaccion)

                    Dim iItem As Integer
                    Dim iNroDias As Integer
                    Dim sFechaVcmto As String
                    Dim nMonto As Decimal
                    For Each oDR As DataRow In oDT_Det.Rows
                        iItem = CInt(oDR("iItem"))
                        iNroDias = CInt(oDR("iNroDias"))
                        sFechaVcmto = oDR("sFechaVcmto").ToString()
                        nMonto = CDec(oDR("nMonto"))
                        oCCCuotaLibre.fnCrearCuotaLibreVtaDet(sCodigo, iItem, iNroDias, sFechaVcmto, nMonto, sCodUsuario, oTransaccion)
                    Next
                    oTransaccion.fnCommitTransaction()

                    sResponse = "OK"
                Case "LCLVC"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim oCCCuotaLibre As New Nomade.CC.CCCuotaLibre("Bn")
                    Dim oDT As New DataTable()
                    oDT = oCCCuotaLibre.fnListarCuotaLibreVtaCab(sCodigo, sCodRef, sEstado)
                    If oDT Is Nothing Then
                        sResponse = "[]"
                    Else
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If
                Case "LCLVD"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim oCCCuotaLibre As New Nomade.CC.CCCuotaLibre("Bn")
                    Dim oDT As New DataTable()
                    oDT = oCCCuotaLibre.fnListarCuotaLibreVtaDet(sCodigo)
                    If oDT Is Nothing Then
                        sResponse = "[]"
                    Else
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If
            End Select
            context.Response.Write(sResponse)

        Catch ex As Exception
            Dim sMensaje As String = ex.ToString
            If oTransaccion.iTransactionState = Nomade.DataAccess.Transaccion.eTransactionState._ON Then
                oTransaccion.fnRollBackTransaction()
            End If

            If sMensaje.IndexOf("[Advertencia]") > -1 Then
                context.Response.Write(sMensaje)
            Else
                context.Response.Write("[Error]: " & sMensaje)
            End If
        End Try
    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class