<%@ WebHandler Language="VB" Class="NCMNOOL" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMNOOL : Implements IHttpHandler

    Dim dt As DataTable

    Dim res As String
    Dim resb As New StringBuilder()

    Dim OPCION, NEMONICO, NOMENCLATURA, INICIO, USUA_ID As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        Select Case OPCION
            Case "S"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = New Nomade.NC.NCParametros("BN").ListarParametros("NOL%", "")
                resb.Append("[")
                If Not (dt Is Nothing) Then
                    resb.Append("{")
                    For Each row As DataRow In dt.Rows
                        If row("CODIGO").ToString = "NOLT" Then
                            resb.Append("""NOMENCLATURA"":""" & row("VALOR").ToString & """,")
                        ElseIf row("CODIGO").ToString = "NOLI" Then
                            resb.Append("""INICIO"":""" & row("VALOR").ToString & """,")
                        End If
                    Next
                    resb.Append("[]")
                    resb.Replace(",[]", "")
                    resb.Append("}")
                End If
                resb.Append("]")
                resb.Replace("[{}]", "[]")
                res = resb.ToString
            Case "G"
                context.Response.ContentType = "text/plain"
                NOMENCLATURA = context.Request("NOMENCLATURA")
                INICIO = context.Request("INICIO")
                USUA_ID = context.Request("USUA_ID")
                'ACTUALIZAR NOMENCLATURA
                dt = New Nomade.NC.NCParametros("BN").ListarParametros("NOLT", "")
                If dt Is Nothing Then
                    res = New Nomade.NC.NCParametros("BN").CrearParametros("NOLT", "", "NOMENCLATURA CODIGO ORDEN DE LOTE", NOMENCLATURA, "NCMNOOL", String.Empty, String.Empty, USUA_ID).ToUpper
                Else
                    res = New Nomade.NC.NCParametros("BN").ActualizarParametros("NOLT", "", "NOMENCLATURA CODIGO ORDEN DE LOTE", NOMENCLATURA, "NCMNOOL", String.Empty, String.Empty, USUA_ID)
                End If
                'ACTUALIZAR VALOR DE INICIO
                If res = "OK" Then
                    dt = New Nomade.NC.NCParametros("BN").ListarParametros("NOLI", "")
                    If dt Is Nothing Then
                        res = New Nomade.NC.NCParametros("BN").CrearParametros("NOLI", "", "INICIO CODIGOS ORDEN DE LOTE", INICIO, "NCMNOOL", String.Empty, String.Empty, USUA_ID).ToUpper
                    Else
                        res = New Nomade.NC.NCParametros("BN").ActualizarParametros("NOLI", "", "INICIO CODIGOS ORDEN DE LOTE", INICIO, "NCMNOOL", String.Empty, String.Empty, USUA_ID)
                    End If
                End If
            Case "VERIFICAR_REGISTROS"
                NOMENCLATURA = context.Request("NOMENCLATURA")
                dt = New Nomade.MP.MPOrdenFabricacion("BN").ObtenerInicioNomenclaturaOrdenLote(NOMENCLATURA)
                res = dt.Rows(0)("MINIMO").ToString

            Case "GLETRA"
                context.Response.ContentType = "text/plain"
                NEMONICO = context.Request("NEMONICO")
                NOMENCLATURA = context.Request("NOMENCLATURA")
                INICIO = context.Request("INICIO")
                USUA_ID = context.Request("USUA_ID")

                'ACTUALIZAR NEMONICO
                dt = New Nomade.NC.NCParametros("BN").ListarParametros("LENE", "")
                If dt Is Nothing Then
                    res = New Nomade.NC.NCParametros("BN").CrearParametros("LENE", "", "NEMONICO DE CODIGO DE LETRAS", NEMONICO, "GLMNOOL", String.Empty, String.Empty, USUA_ID).ToUpper
                Else
                    res = New Nomade.NC.NCParametros("BN").ActualizarParametros("LENE", "", "NEMONICO DE CODIGO DE LETRAS", NEMONICO, "GLMNOOL", String.Empty, String.Empty, USUA_ID)
                End If
                'ACTUALIZAR NOMENCLATURA
                dt = New Nomade.NC.NCParametros("BN").ListarParametros("LENO", "")
                If dt Is Nothing Then
                    res = New Nomade.NC.NCParametros("BN").CrearParametros("LENO", "", "NUMRERO DE CODIGO DE LETRAS", NOMENCLATURA, "GLMNOOL", String.Empty, String.Empty, USUA_ID).ToUpper
                Else
                    res = New Nomade.NC.NCParametros("BN").ActualizarParametros("LENO", "", "NOMENCLATURA CODIGO ORDEN DE LOTE", NOMENCLATURA, "GLMNOOL", String.Empty, String.Empty, USUA_ID)
                End If
                'ACTUALIZAR VALOR DE INICIO
                If res = "OK" Then
                    dt = New Nomade.NC.NCParametros("BN").ListarParametros("LENI", "")
                    If dt Is Nothing Then
                        res = New Nomade.NC.NCParametros("BN").CrearParametros("LENI", "", "INICIO CODIGO DE LETRAS", INICIO, "GLMNOOL", String.Empty, String.Empty, USUA_ID).ToUpper
                    Else
                        res = New Nomade.NC.NCParametros("BN").ActualizarParametros("LENI", "", "INICIO CODIGO DE LETRAS", INICIO, "GLMNOOL", String.Empty, String.Empty, USUA_ID)
                    End If
                End If

            Case "LCODLETRAS" 'Lista Código Letras
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = New Nomade.NC.NCParametros("BN").ListarParametros("LEN%", "")
                resb.Append("[")
                If Not (dt Is Nothing) Then
                    resb.Append("{")
                    For Each row As DataRow In dt.Rows
                        If row("CODIGO").ToString = "LENE" Then
                            resb.Append("""NEMONICO"":""" & row("VALOR").ToString & """,")
                        ElseIf row("CODIGO").ToString = "LENO" Then
                            resb.Append("""NOMENCLATURA"":""" & row("VALOR").ToString & """,")
                        ElseIf row("CODIGO").ToString = "LENI" Then
                            resb.Append("""INICIO"":""" & row("VALOR").ToString & """,")
                        End If
                    Next
                    resb.Append("[]")
                    resb.Replace(",[]", "")
                    resb.Append("}")
                End If
                resb.Append("]")
                resb.Replace("[{}]", "[]")
                res = resb.ToString

        End Select
        context.Response.Write(res)
    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class