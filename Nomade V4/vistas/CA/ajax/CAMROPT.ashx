<%@ WebHandler Language="VB" Class="CAMROPT" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CAMROPT : Implements IHttpHandler

    Dim flag, res As String
    Dim resb As New StringBuilder
    Dim sb As New StringBuilder
    Dim dt As DataTable
    Dim codigo As String
    Dim empresa As String
    Dim moneda As String
    Dim operador As String
    Dim fecha_fin As String
    Dim fecha_ini As String
    Dim monto As String
    Dim usuario As String
    Dim tipo As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"

        flag = context.Request("flag")
        codigo = context.Request("codigo")
        empresa = context.Request("empresa")
        moneda = context.Request("moneda")
        operador = context.Request("operador")
        fecha_ini = context.Request("fecha_ini")
        monto = context.Request("monto")
        usuario = context.Request("usuario")
        tipo = context.Request("tipo")

        If fecha_ini <> "" Then
            fecha_ini = Utilities.fechaLocal(fecha_ini)
        End If
        fecha_fin = context.Request("fecha_fin")
        If fecha_fin <> "" Then
            fecha_fin = Utilities.fechaLocal(fecha_fin)
        End If
        Try

            Select Case flag.ToString()


                Case "3"
                    Dim p As New Nomade.NC.NCPOS("Bn")
                    res = p.CrearAjuste("A", monto, fecha_ini, fecha_fin, usuario, empresa, moneda, operador, tipo)

                Case "4"
                    Dim p As New Nomade.NC.NCPOS("Bn")
                    dt = p.ListarAjuste("", "", fecha_ini, fecha_fin, empresa, moneda, operador)
                    If dt Is Nothing Then
                        res = "OK"
                    Else
                        res = "NO"
                    End If

                Case "5"
                    Dim p As New Nomade.NC.NCEmpresa("BN")
                    dt = p.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "codigo", "descripcion", "EMPRESA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "codigo", "descripcion", "EMPRESA")
                    End If

                Case "6"
                    Dim p As New Nomade.NC.NCOperadorTarjeta("Bn")
                    dt = p.ListarOperadorTarjeta("", "", empresa)
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "codigo", "NOMBRE_COMERCIAL", "OPERADOR")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "NOMBRE_COMERCIAL", "ASC"), "codigo", "NOMBRE_COMERCIAL", "OPERADOR")
                    End If

                Case "M"
                    Dim p As New Nomade.NC.NCMonedas("BN")
                    dt = p.ListarMoneda(codigo, String.Empty, "A")
                    res = dt.Rows(0)("Simbolo").ToString

                Case "MO"
                    Dim p As New Nomade.GL.GLLetras("Bn")
                    dt = p.ListarMoneda(empresa)
                    res = GenerarSelect(dt, "codigo", "descripcion", "MONEDA")

                Case "L"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim pNCPOS As New Nomade.NC.NCPOS("Bn")
                    Dim oDT As New DataTable
                    oDT = pNCPOS.ListarCierreLote("", moneda, operador, fecha_ini, fecha_fin)
                    If oDT Is Nothing Then
                        res = "[]"
                    Else
                        res = Utilities.DataTableToJSON(oDT)
                    End If
            End Select

            context.Response.Write(res)

        Catch ex As Exception

            context.Response.Write("error" & ex.ToString)

        End Try
    End Sub

    Public Function GenerarSelect(ByVal dt As DataTable, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then

            res = "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                If clase = "EMPRESA" Then
                    res += "<option pidm=""" & dt.Rows(i)("PIDM").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                Else
                    If clase = "OPERADOR" Then
                        res += "<option moneda=""" & dt.Rows(i)("MONEDA") & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                    Else
                        If clase = "MONEDA" Then
                            res += "<option tipo=""" & dt.Rows(i)("TIPO").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                        Else
                            If clase = "CAJA" Then
                                res += "<option monto=""" & dt.Rows(i)("MONTOCAJA").ToString() & """codigo=""" & dt.Rows(i)("CODIGO_APERTURA").ToString() & """ stbl=""" & dt.Rows(i)("SUCURSAL").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & " - SD: S/." & dt.Rows(i)("MONTOCAJA").ToString() & "</option>"
                            Else
                                If dt.Rows(i)(chtml).ToString() <> String.Empty Then
                                    res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                                End If

                            End If
                        End If
                    End If
                End If
            Next

        Else
            res = "error"
        End If
        Return res
    End Function

    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function


    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class