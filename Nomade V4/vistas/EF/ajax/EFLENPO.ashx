﻿<%@ WebHandler Language="VB" Class="EFACTEL" %>

Imports System
Imports System.Web
Imports System.Data

Public Class EFACTEL : Implements IHttpHandler

    Private sOpcion As String
    Private sResponse As String
    Private sCodEmpresa, sSucursal, sTipoDoc, sCliente, sEmision, sDesde, sHasta As String
    Private sCodVenta As String
    Private sCodNC As String
    Private sCodND As String
    Dim sRuta, sNroDoc As String

    Dim resb As New StringBuilder
    Dim dt As DataTable

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Try
            sOpcion = context.Request("sOpcion")
            sCodEmpresa = context.Request("sCodEmpresa")
            sCodVenta = context.Request("sCodVenta")
            sCodNC = context.Request("sCodNC")
            sCodND = context.Request("sCodND")
            sSucursal = context.Request("sSucursal")
            sTipoDoc = context.Request("sTipoDoc")
            sCliente = context.Request("sCliente")
            sEmision = context.Request("sEmision")
            sRuta = context.Request("sRuta")
            sNroDoc = context.Request("sNroDoc")
            sDesde = context.Request("sDesde")
            sHasta = context.Request("sHasta")

            Select Case sOpcion
                Case "FACT"
                    Dim onEFFactura As New Nomade.Efact.LogNegocio.nEFFactura()
                    onEFFactura.fnGetFactura(sCodEmpresa, sCodVenta)
                    sResponse = "OK"
                Case "BFACT"
                    Dim onDEFFactura As New Nomade.Efact.LogNegocio.nEFBajaFactura()
                    sResponse = onDEFFactura.fnGetFactura(sCodEmpresa, sCodVenta)
                Case "VFACT"
                    Dim onEFFactura As New NOMADE.Efact.LogNegocio.nEFFactura()
                    sResponse = onEFFactura.fnVerificarDoc(sCodEmpresa, sCodVenta)
                Case "VBAJAFACT"
                    Dim onEFFactura As New NOMADE.Efact.LogNegocio.nEFBajaFactura()
                    sResponse = onEFFactura.fnVerificarBajaDoc(sCodEmpresa, sCodVenta)
                Case "BOL"
                    Dim onEFBoleta As New Nomade.Efact.LogNegocio.nEFBoleta()
                    onEFBoleta.fnGetBoleta(sCodEmpresa, sCodVenta)
                    sResponse = "OK"
                Case "BBOL"
                    Dim onBEFBoleta As New Nomade.Efact.LogNegocio.nEFBajaBoleta()
                    sResponse = onBEFBoleta.fnGetBoleta(sCodEmpresa, sCodVenta)
                Case "VBOL"
                    Dim onEFBoleta As New NOMADE.Efact.LogNegocio.nEFBoleta()
                    sResponse = onEFBoleta.fnVerificarDoc(sCodEmpresa, sCodVenta)
                Case "VBAJABOL"
                    Dim onEFBoleta As New NOMADE.Efact.LogNegocio.nEFBajaBoleta()
                    sResponse = onEFBoleta.fnVerificarBajaDoc(sCodEmpresa, sCodVenta)
                Case "NC"
                    Dim onEFNC As New Nomade.Efact.LogNegocio.nEFNC()
                    onEFNC.fnGetNC(sCodEmpresa, sCodNC)
                    sResponse = "OK"
                Case "BNC"
                    Dim onDEFNC As New Nomade.Efact.LogNegocio.nEFBajaNC()
                    sResponse = onDEFNC.fnGetNC(sCodEmpresa, sCodNC)
                Case "VNC"
                    Dim onEFNC As New NOMADE.Efact.LogNegocio.nEFNC()
                    sResponse = onEFNC.fnVerificarDoc(sCodEmpresa, sCodNC)
                Case "VBAJANC"
                    Dim onEFNC As New NOMADE.Efact.LogNegocio.nEFBajaNC()
                    sResponse = onEFNC.fnVerificarBajaDoc(sCodEmpresa, sCodNC)
                Case "ND"
                    Dim onEFND As New Nomade.Efact.LogNegocio.nEFND()
                    onEFND.fnGetND(sCodEmpresa, sCodND)
                    sResponse = "OK"
                Case "BND"
                    Dim onBEFND As New Nomade.Efact.LogNegocio.nEFBajaND()
                    sResponse = onBEFND.fnGetND(sCodEmpresa, sCodND)
                Case "VND"
                    Dim onEFND As New NOMADE.Efact.LogNegocio.nEFND()
                    sResponse = onEFND.fnVerificarDoc(sCodEmpresa, sCodND)
                Case "VBAJAND"
                    Dim onEFND As New NOMADE.Efact.LogNegocio.nEFBajaND()
                    sResponse = onEFND.fnVerificarBajaDoc(sCodEmpresa, sCodND)
                Case "MEFACT"
                    Dim EF As New NOMADE.EF.EFFactElectronica("BN")
                    sResponse = EF.ModificarEstadoDocumento(sCodVenta, sTipoDoc)
                Case "BLFE"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim EF As New NOMADE.EF.EFFactElectronica("BN")
                    dt = EF.ListarDocumentosElectronicos(sCodEmpresa, sSucursal, sTipoDoc, sCliente, sEmision, Utilities.fechaLocal(sDesde), Utilities.fechaLocal(sHasta))
                    If Not dt Is Nothing Then
                        sResponse = Utilities.Datatable2Json(dt)
                    Else
                        sResponse = "[]"
                    End If
                Case "SUBIR_EFACT"
                    Dim Efact As New Nomade.Efact.Conexion.Conexion()
                    sResponse = Efact.fnSubirArchivo(sRuta)

                Case "BAJAR_EFACT"
                    Dim Efact As New NOMADE.Efact.Conexion.Conexion()
                    Dim sRutaDescarga = ConfigurationManager.AppSettings("path_efact") & "out\"
                    Select Case sTipoDoc
                        Case "0001" ' factura
                            sRutaDescarga &= "invoice\01"
                        Case "0003" ' boleta
                            sRutaDescarga &= "boleta\03"
                        Case "0007" 'nota credito
                            sRutaDescarga &= "creditnote\07"
                        Case "0008" 'nota debito
                            sRutaDescarga &= "debitnote\08"
                    End Select
                    sResponse = Efact.fnDescargaArchivo(sRutaDescarga & sNroDoc & ".xml")

                Case "TEST_CONEC_FTP_EFACT"
                    Dim oConexion As New NOMADE.Efact.Conexion.Conexion()
                    oConexion.fnTestConexionFTP()
                    sResponse = "OK"

                Case Else

            End Select
            context.Response.Write(sResponse)
        Catch ex As Exception
            Dim sMensaje As String = ex.Message
            If (sMensaje.IndexOf("[Advertencia]") > -1) Then
                context.Response.Write(sMensaje)
            Else
                context.Response.Write("[Error]: " + sMensaje)
            End If

        End Try

    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class