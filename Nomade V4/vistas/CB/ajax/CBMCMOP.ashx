<%@ WebHandler Language="VB" Class="CBMCMOP" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CBMCMOP : Implements IHttpHandler

    Dim dt As New DataTable

    Dim OPCION As String
    Dim CODIGO As String = String.Empty

    Dim res As String
    Dim resb As New StringBuilder
    Dim OPERADOR As String = String.Empty

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        CODIGO = context.Request("CODIGO")
        OPERADOR = context.Request("OPERADOR")
        If OPERADOR = Nothing Then
            OPERADOR = String.Empty
        End If
        Select Case OPCION
            Case "S"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim oNCOperadorTarjeta As New Nomade.NC.NCOperadorTarjeta("BN")
                Dim oDT As New DataTable
                oDT = oNCOperadorTarjeta.ListarComisionesOperador(CODIGO, OPERADOR, "A")
                If oDT Is Nothing Then
                    res = "[]"
                Else
                    res = Utilities.DataTableToJSON(oDT)
                End If
            Case "LISTAR_OPERADOR_MARCA"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = New Nomade.NC.NCMarcaTarjeta("BN").ListarMarcaTarjetaPorOperador(CODIGO, "")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO_MARCA"":""" & row("CODIGO_MARCA").ToString & """,")
                        resb.Append("""CODIGO_REL"":""" & row("CODIGO_REL").ToString & """,")
                        resb.Append("""MARCA"":""" & row("MARCA").ToString & """,")
                        resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "LISTAR_FORMAS_PAGO" 'lista forma de pago
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = New Nomade.CC.CCPercepcion("BN").ListarFormasPago("", "", "", "A")
                resb.Append("[")
                For Each MiDataRow As DataRow In dt.Rows
                    If MiDataRow("CODIGO").ToString = "0005" Or MiDataRow("CODIGO").ToString = "0006" Then
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""DESCRIPCION_CORTA"" :" & """" & MiDataRow("DESCRIPCION_CORTA").ToString & """,")
                        resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO").ToString & """")
                        resb.Append("},")
                    End If
                Next
                resb.Append("{}")
                resb = resb.Replace(",{}", String.Empty)
                resb.Append("]")
                res = resb.ToString()
            Case "G"
                context.Response.ContentType = "text/plain"
                Dim OPTR_CODE, COMISION_TOTAL_DEBITO, COMISION_TOTAL_CREDITO, COMISION_EMISORES, COMISION_OPERADOR, IGV, USUA_ID As String
                OPTR_CODE = context.Request("OPTR_CODE")
                COMISION_TOTAL_DEBITO = context.Request("COMISION_TOTAL_DEBITO")
                COMISION_TOTAL_CREDITO = context.Request("COMISION_TOTAL_CREDITO")
                COMISION_EMISORES = context.Request("COMISION_EMISORES")
                COMISION_OPERADOR = context.Request("COMISION_OPERADOR")
                IGV = context.Request("IGV")
                USUA_ID = context.Request("USUA_ID")
                res = New Nomade.NC.NCOperadorTarjeta("BN").CrearComisionesOperador(OPTR_CODE, COMISION_TOTAL_DEBITO, COMISION_TOTAL_CREDITO, COMISION_EMISORES, COMISION_OPERADOR, IGV, USUA_ID)
            Case "A"
                context.Response.ContentType = "text/plain"
                Dim OPTR_CODE, COMISION_TOTAL_DEBITO, COMISION_TOTAL_CREDITO, COMISION_EMISORES, COMISION_OPERADOR, IGV, USUA_ID, ESTADO_IND As String
                OPTR_CODE = context.Request("OPTR_CODE")
                COMISION_TOTAL_DEBITO = context.Request("COMISION_TOTAL_DEBITO")
                COMISION_TOTAL_CREDITO = context.Request("COMISION_TOTAL_CREDITO")
                COMISION_EMISORES = context.Request("COMISION_EMISORES")
                COMISION_OPERADOR = context.Request("COMISION_OPERADOR")
                IGV = context.Request("IGV")
                USUA_ID = context.Request("USUA_ID")
                ESTADO_IND = context.Request("ESTADO_IND")
                res = New Nomade.NC.NCOperadorTarjeta("BN").ActualizarComisionesOperador(CODIGO, OPTR_CODE, COMISION_TOTAL_DEBITO, COMISION_TOTAL_CREDITO, COMISION_EMISORES, COMISION_OPERADOR, IGV, USUA_ID, ESTADO_IND)
            Case "AE"
                context.Response.ContentType = "text/plain"
                Dim USUA_ID As String = context.Request("USUA_ID")
                res = New Nomade.NC.NCOperadorTarjeta("BN").CambiarEstadoComisiones(CODIGO, USUA_ID)

            Case "IGV"
                context.Request.ContentType = "text/plain"
                Dim prmt As New Nomade.NC.NCParametros("bn")
                res = prmt.ListarParametros(String.Empty, "IGV")(0)("VALOR")

        End Select

        context.Response.Write(res)
    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class