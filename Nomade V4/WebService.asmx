<%@ WebService Language="VB" CodeBehind="~/App_Code/WebService.vb" Class="WebService" %>

Imports System.Web.Script.Services
Imports AjaxControlToolkit
Imports System.Web
Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.Data


<ScriptService()> _
Public Class WebService
    Inherits System.Web.Services.WebService

    <WebMethod()> _
    Public Function ListarEmpresa(ByVal knownCategoryValues As String, ByVal category As String) As CascadingDropDownNameValue()

        Dim listacascada As New List(Of CascadingDropDownNameValue)

        Dim empresa As New NOMADE.NC.NCEmpresa("bn")
        Dim dt As DataTable = empresa.ListarTotalEmpresa(String.Empty, "A")
        empresa = Nothing


        If Not dt Is Nothing Then

            For i As Integer = 0 To dt.Rows.Count - 1
                listacascada.Add(New CascadingDropDownNameValue(dt.Rows(i)("descripcion").ToString(), dt.Rows(i)("codigo").ToString()))

            Next


        End If

        Return listacascada.ToArray()

    End Function

    <WebMethod()> _
    Public Function ListarEstablecimiento(ByVal knownCategoryValues As String, ByVal category As String) As CascadingDropDownNameValue()

        Dim listacascada As New List(Of CascadingDropDownNameValue)
        Dim empresa As String
        Dim kv As StringDictionary = CascadingDropDown.ParseKnownCategoryValuesString(knownCategoryValues)

        If Not kv.ContainsKey("empresa") Then
            Throw New ArgumentException("sin establecimiento")
        Else
            empresa = kv("empresa")
        End If

        Dim establecimiento As New NOMADE.NC.NCSucursal("bn")
        Dim dt As DataTable = establecimiento.ListarSucursal(empresa, "", "")
        establecimiento = Nothing


        If Not dt Is Nothing Then

            For i As Integer = 0 To dt.Rows.Count - 1
                listacascada.Add(New CascadingDropDownNameValue(dt.Rows(i)("descripcion").ToString(), dt.Rows(i)("codigo").ToString()))

            Next


        End If

        Return listacascada.ToArray()

    End Function

    <WebMethod()>
    Public Function TipoCambio() As String

        Dim sResponse As String = ""

        If TieneInternet() = True Then
            Try
                Dim tcam As Nomade.FI.SWTipoCambio = New Nomade.FI.SWTipoCambio("BN")
                sResponse = tcam.fGeneraTipoCambio() '
            Catch ex As Exception
                sResponse = "E" 'Ocurrio un error al obtener datos de sunat
            End Try
        Else
            sResponse = "N" 'Tipo de Cambio no se ha Actualizado / sin internet
        End If

        Return sResponse

    End Function

    Public Function TieneInternet() As Boolean
        Dim Url As New System.Uri("http://www.google.com/")
        Dim oWebReq As System.Net.WebRequest
        oWebReq = System.Net.WebRequest.Create(Url)
        Dim oResp As System.Net.WebResponse
        Try
            oResp = oWebReq.GetResponse
            oResp.Close()
            oWebReq = Nothing
            Return True
        Catch ex As Exception
            oWebReq = Nothing
            Return False
        End Try
    End Function

End Class