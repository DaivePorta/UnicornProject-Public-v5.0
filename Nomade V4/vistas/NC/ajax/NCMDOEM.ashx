<%@ WebHandler Language="VB" Class="NCMDOEM" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMDOEM : Implements IHttpHandler

    Dim OPCION As String
    Dim P_CODE As String
    Dim P_CTLG_CODE, P_DCTO_CODE, P_USUA_ID As String
    Dim P_GASTOS, P_ALMACEN, P_COMPRA_VENTA, P_CASOS_ESP_IND As String
    Dim P_FECHA_ELEC As String
    Dim sEmpresa As String
    Dim dt As DataTable

    Dim res, cod, msg As String
    Dim resb As New StringBuilder

    Dim dcct As New Nomade.NC.NCTipoDCEmpresa("BN")

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")
        P_CODE = context.Request("P_CODE")
        P_CTLG_CODE = context.Request("P_CTLG_CODE")
        P_DCTO_CODE = context.Request("P_DCTO_CODE")
        P_USUA_ID = context.Request("P_USUA_ID")
        P_GASTOS = context.Request("P_GASTOS")
        P_ALMACEN = context.Request("P_ALMACEN")
        P_COMPRA_VENTA = context.Request("P_COMPRA_VENTA")
        P_CASOS_ESP_IND = context.Request("P_CASOS_ESP_IND")
        P_FECHA_ELEC = IIf(context.Request("P_FECHA_ELEC") = "", Nothing, Utilities.fechaLocal(context.Request("P_FECHA_ELEC")))
        sEmpresa = context.Request("sEmpresa")

        Try
            Select Case OPCION
                Case "L"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = dcct.ListarTipoDCEmpresa(P_CODE, " ", " ", " ")
                    If Not (dt Is Nothing) Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "{}"
                    End If

                Case "LTDCE"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = dcct.ListarTipoDCEmpresa(" ", sEmpresa, " ", " ")
                    If Not (dt Is Nothing) Then
                        res = Utilities.Datatable2Json(dt)
                    End If

                Case "LTDC"
                    Dim dcto As New Nomade.NC.NCTipoDC("BN")
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = dcto.ListarTipoDC(" ", "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""CODIGO_SUNAT"" :" & """" & MiDataRow("CODIGO_SUNAT").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "CA"
                    context.Response.ContentType = "text/plain"
                    res = dcct.CambiarEstadoTipoDCEmpresa(P_CODE, P_USUA_ID)
                Case "G"
                    context.Response.ContentType = "text/plain"
                    res = dcct.CrearTipoDCEmpresa(P_CTLG_CODE, P_DCTO_CODE, P_GASTOS, P_ALMACEN, P_COMPRA_VENTA, P_CASOS_ESP_IND, P_USUA_ID, P_FECHA_ELEC)
                Case "A"
                    context.Response.ContentType = "text/plain"
                    res = dcct.ActualizarTipoDCEmpresa(P_CODE, P_GASTOS, P_ALMACEN, P_COMPRA_VENTA, P_CASOS_ESP_IND, P_USUA_ID, P_FECHA_ELEC)
            End Select

            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class