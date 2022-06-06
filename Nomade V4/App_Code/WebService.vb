Imports System.Web
Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.Data
Imports AjaxControlToolkit

' Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente.
' <System.Web.Script.Services.ScriptService()> _
<WebService(Namespace:="http://tempuri.org/")> _
<WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Public Class WebService
     Inherits System.Web.Services.WebService

    <WebMethod()> _
    Public Function ListarEmpresa(ByVal valores As String, ByVal nombres As String) As CascadingDropDownNameValue()

        Dim listacascada As New List(Of CascadingDropDownNameValue)

        Dim empresa As New NOMADE.NC.NCEmpresa("bn")
        Dim dt As DataTable = empresa.ListarEmpresa("", "", "")
        empresa = Nothing


        If Not dt Is Nothing Then

            For i As Integer = 0 To dt.Rows.Count - 1
                listacascada.Add(New CascadingDropDownNameValue(dt.Rows(i)("descripcion").ToString(), dt.Rows(i)("codigo").ToString()))

            Next


        End If

        Return listacascada.ToArray()

    End Function

    <WebMethod()> _
    Public Function ListarEstablecimiento(ByVal valores As String, ByVal nombres As String) As CascadingDropDownNameValue()

        Dim listacascada As New List(Of CascadingDropDownNameValue)
        Dim empresa As String
        Dim kv As StringDictionary = CascadingDropDown.ParseKnownCategoryValuesString(valores)
        empresa = kv("empresa")

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

End Class