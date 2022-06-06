<%@ WebHandler Language="VB" Class="CCLLCCL" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CCLLCCL : Implements IHttpHandler
    Dim opcion As String
    Dim proveedor As String
    Dim secuencia As String
    Dim lineacredito As String
    Dim moneda As String
    Dim plazo As String
    Dim fecini As String
    Dim fecfin As String
    Dim estado As String
    Dim usuario As String
    Dim empresa As String
    Dim filtro As String
    Dim dt As DataTable
    Dim p As New Nomade.FI.FILineaCProveedores("bn")
    Dim m As New Nomade.NC.NCMonedas("bn")
    Dim e As New Nomade.NC.NCECliente("bn")
    Dim glLetras As New Nomade.GL.GLLetras("bn")

    Dim res As String
    Dim resb As New StringBuilder
    Dim fec As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        opcion = context.Request("opcion")
        proveedor = context.Request("proveedor")
        secuencia = context.Request("secuencia")
        lineacredito = context.Request("lineacredito")
        moneda = context.Request("moneda")
        plazo = context.Request("plazo")
        fecini = context.Request("fecini")
        fecfin = context.Request("fecfin")
        estado = context.Request("estado")
        usuario = context.Request("usuario")
        empresa = context.Request("empresa")
        filtro = context.Request("filter")
        Select Case opcion
            Case "1"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = p.fListarLineaCredito(proveedor, empresa, "C")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""SECUENCIA"" :" & """" & MiDataRow("SECUENCIA").ToString & """,")
                        resb.Append("""LINCRED"" :" & """" & MiDataRow("LINCRED").ToString & """,")
                        resb.Append("""MONEDA"" :" & """" & MiDataRow("MONEDA").ToString & """,")
                        resb.Append("""PLAZO"" :" & """" & MiDataRow("PLAZO").ToString & """,")
                        resb.Append("""FECHA_INICIO"" :" & """" & MiDataRow("FECHA_INICIO").ToString.Substring(0, 10) & """,")
                        fec = MiDataRow("FECHA_FINAL").ToString
                        If fec.Length > 0 Then
                            resb.Append("""FECHA_FINAL"" :" & """" & fec.Substring(0, 10) & """,")
                        Else
                            resb.Append("""FECHA_FINAL"" :" & """" & fec & """,")
                        End If
                        'resb.Append("""FECHA_FINAL"" :" & """" & IIf(fec.Length > 0, fec.Substring(0, 10), fec) & """,")
                        resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO").ToString & """,")
                        resb.Append("""USUARIO"" :" & """" & MiDataRow("USUARIO").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                End If

                If Not dt Is Nothing Then
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If

                res = resb.ToString()

            Case "A"
                res = p.fActualizarEstado(proveedor, secuencia, empresa, "C")
            Case "2"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = p.fObtenerSEQ(proveedor, empresa, "C")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""SECUENCIA"" :" & """" & MiDataRow("SEQ").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "3"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = m.fListaMonedaParametro
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODE"" :" & """" & MiDataRow("CODE").ToString & """,")
                        resb.Append("""DES"" :" & """" & MiDataRow("DES").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()

            Case "I"
                res = p.CREAR_LINEA_CREDITO(proveedor, _
                                           lineacredito, _
                                           plazo, _
                                           "A", _
                                           usuario, _
                                           "C", _
                                           moneda, empresa)

            Case "4"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = p.fListarLINCRED_CLI(empresa)
                If Not dt Is Nothing Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")

                        resb.Append("""CODEMP"" :" & """" & MiDataRow("CODEMP").ToString & """,")
                        resb.Append("""EMPRESA"" :" & """" & MiDataRow("EMPRESA").ToString & """,")
                        resb.Append("""TIPODOC"" :" & """" & MiDataRow("TIPODOC").ToString & """,")
                        resb.Append("""DOC"" :" & """" & MiDataRow("DOC").ToString & """,")
                        resb.Append("""RSOCIAL"" :" & """" & MiDataRow("RSOCIAL").ToString & """,")
                        resb.Append("""LINEACREDITO"" :" & """" & MiDataRow("LINEACREDITO").ToString & """,")
                        resb.Append("""MONEDA"" :" & """" & MiDataRow("MONEDA").ToString & """,")
                        resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                        resb.Append("""CATE_CLIENTE_DESC"" :" & """" & MiDataRow("CATE_CLIENTE_DESC").ToString & """,")
                        resb.Append("""PLAZO"" :" & """" & MiDataRow("PLAZO").ToString & """,")
                        resb.Append("""ESTADO_CLIENTE"" :" & """" & MiDataRow("ESTADO_CLIENTE").ToString & """")

                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()

            Case "E"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = e.ListarCliente(String.Empty, _
                                   "A", _
                                   empresa)
                If Not dt Is Nothing Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")

                        resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                        resb.Append("""RAZON_SOCIAL"" :" & """" & MiDataRow("RAZON_SOCIAL").ToString & """")

                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()

            Case "5"
                'Devuelve las monedas usadas por la empresa 
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = glLetras.ListarMoneda(empresa)
                If Not dt Is Nothing Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""TIPO"" :" & """" & MiDataRow("TIPO").ToString & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                        resb.Append("""SIMBOLO"" :" & """" & MiDataRow("SIMBOLO").ToString & """,")
                        resb.Append("""DESC_CORTA"" :" & """" & MiDataRow("DESC_CORTA").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()


        End Select
        context.Response.Write(res)
    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class