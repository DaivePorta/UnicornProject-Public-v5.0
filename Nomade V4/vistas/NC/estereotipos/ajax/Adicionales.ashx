<%@ WebHandler Language="VB" Class="Adicionales" %>

Imports System
Imports System.Web
Imports System.Data

Public Class Adicionales : Implements IHttpHandler
    Dim flag As String
    Dim res As String
    Dim p_Code_Pais, p_Code_Depa, p_Code_Prov, p_Code_Dist As String
    Dim PPBIDEN_PIDM As Integer

    Dim ITEMSDETAIL_DIRECCION, ITEMSCOUNT_DIRECCION, ITEMSDETAIL_DATOSBANCO, ITEMSCOUNT_DATOSBANCO, ITEMSDETAIL_TELEFONOS, ITEMSCOUNT_TELEFONOS, ITEMSDETAIL_EMAILS, ITEMSCOUNT_EMAILS As String
    Dim USUA_ID, empresa As String


    Dim dt As DataTable
    Dim resb As New StringBuilder

    Dim resArray As Array

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        flag = context.Request("flag")

        'ubigeo
        p_Code_Pais = context.Request("p_code_pais")
        p_Code_Depa = context.Request("p_code_depa")
        p_Code_Prov = context.Request("p_code_prov")
        p_Code_Dist = context.Request("p_code_dist")
        'fin
        PPBIDEN_PIDM = context.Request("PPBIDEN_PIDM")

        ITEMSDETAIL_DIRECCION = context.Request("ITEMSDETAIL_DIRECCION")
        ITEMSCOUNT_DIRECCION = context.Request("ITEMSCOUNT_DIRECCION")

        ITEMSDETAIL_DATOSBANCO = context.Request("ITEMSDETAIL_DATOSBANCO")
        ITEMSCOUNT_DATOSBANCO = context.Request("ITEMSCOUNT_DATOSBANCO")

        ITEMSDETAIL_TELEFONOS = context.Request("ITEMSDETAIL_TELEFONOS")
        ITEMSCOUNT_TELEFONOS = context.Request("ITEMSCOUNT_TELEFONOS")

        ITEMSDETAIL_EMAILS = context.Request("ITEMSDETAIL_EMAILS")
        ITEMSCOUNT_EMAILS = context.Request("ITEMSCOUNT_EMAILS")

        USUA_ID = context.Request("USUA_ID")

        empresa= context.Request("empresa")

        Select Case flag

            Case "3"
                Dim p2 As New NOMADE.NC.NCVias("BN")
                dt = p2.Listar_Vias(String.Empty, String.Empty, "A")
                res = GenerarSelect(dt, "codigo", "descripcion", "VIAS")

            Case "4"
                Dim p2 As New NOMADE.NC.NCZona("BN")
                dt = p2.Listar_Zonas(String.Empty, String.Empty, "A")
                res = GenerarSelect(dt, "codigo", "descripcion", "ZONA")

            Case "5"
                Dim p2 As New NOMADE.NC.NCPais("BN")
                dt = p2.Listar_Pais(String.Empty, String.Empty, "A")
                res = GenerarSelect(dt, "codigo", "descripcion", "PAIS")

            Case "6"
                Dim p2 As New NOMADE.NC.NCUbigeo("BN")
                dt = p2.Listar_Ubigeo(String.Empty, String.Empty, String.Empty, 1, p_Code_Pais, "A")
                res = GenerarSelect(dt, "ubigeo", "descripcion", "DEPARTAMENTO")

            Case "7"
                Dim p2 As New NOMADE.NC.NCUbigeo("BN")
                dt = p2.Listar_Ubigeo(String.Empty, String.Empty, p_Code_Depa, 2, p_Code_Pais, "A")
                res = GenerarSelect(dt, "ubigeo", "descripcion", "PROVINCIA")

            Case "8"
                Dim p2 As New NOMADE.NC.NCUbigeo("BN")
                dt = p2.Listar_Ubigeo(String.Empty, String.Empty, p_Code_Prov, 3, p_Code_Pais, "A")
                res = GenerarSelect(dt, "ubigeo", "descripcion", "DISTRITO")

            Case "9"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim b As New NOMADE.NC.NCBanco("Bn")
                dt = b.ListarBanco(String.Empty, "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("BANCO").ToString & """,")
                        If MiDataRow("NOMBRE_COMERCIAL") Is DBNull.Value Then
                            resb.Append("""DESCRIPCION"" :" & """""")
                        Else
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("NOMBRE_COMERCIAL").ToString & """")
                        End If
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "10"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim tc As New NOMADE.NC.NCTipoCuenta("Bn")
                dt = tc.listar_TipoCuenta(String.Empty, "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODE").ToString & """,")
                        If MiDataRow("DESCR") Is DBNull.Value Then
                            resb.Append("""DESCRIPCION"" :" & """""")
                        Else
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCR").ToString & """,")
                        End If
                        resb.Append("""MONE_COD"" :" & """" & MiDataRow("MONE_COD").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "11"

                Dim p As New Nomade.GL.GLLetras("Bn")
                dt = p.ListarMoneda(empresa)
                res = GenerarSelect(dt, "codigo", "descripcion", "MONEDA")


            Case "12"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim a As New NOMADE.NC.NCEAdicionales("Bn")
                dt = a.Listar_Adicionales(PPBIDEN_PIDM, "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        If MiDataRow("DIRECCIONES") Is DBNull.Value Then
                            resb.Append("""DIRECCIONES"" :" & """"",")
                        Else
                            resb.Append("""DIRECCIONES"" :" & MiDataRow("DIRECCIONES").ToString & ",")
                        End If
                        If MiDataRow("DATOSBANCO") Is DBNull.Value Then
                            resb.Append("""DATOSBANCO"" :" & """"",")
                        Else
                            resb.Append("""DATOSBANCO"" :" & MiDataRow("DATOSBANCO").ToString & ",")
                        End If
                        If MiDataRow("TELEFONOS") Is DBNull.Value Then
                            resb.Append("""TELEFONOS"" :" & """"",")
                        Else
                            resb.Append("""TELEFONOS"" :" & MiDataRow("TELEFONOS").ToString & ",")
                        End If
                        If MiDataRow("EMAILS") Is DBNull.Value Then
                            resb.Append("""EMAILS"" :" & """""")
                        Else
                            resb.Append("""EMAILS"" :" & MiDataRow("EMAILS").ToString)
                        End If
                        resb.Append("}")
                    Next
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "13"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim p2 As New NOMADE.NC.NCVias("BN")
                dt = p2.Listar_Vias(String.Empty, String.Empty, "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("Codigo").ToString & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("Descripcion").ToString & """,")
                        resb.Append("""DESCRIPCION_CORTO"" :" & """" & MiDataRow("Descripcion_Corto").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "14"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim p2 As New NOMADE.NC.NCZona("BN")
                dt = p2.Listar_Zonas(String.Empty, String.Empty, "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("Codigo").ToString & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("Descripcion").ToString & """,")
                        resb.Append("""DESCRIPCION_CORTO"" :" & """" & MiDataRow("Descripcion_Corto").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "M"
                context.Response.ContentType = "application/json; charset=utf-8"
                resArray = actualizar_Adicionales(ITEMSCOUNT_DIRECCION, ITEMSDETAIL_DIRECCION, ITEMSCOUNT_DATOSBANCO, ITEMSDETAIL_DATOSBANCO, ITEMSCOUNT_TELEFONOS, ITEMSDETAIL_TELEFONOS, ITEMSCOUNT_EMAILS, ITEMSDETAIL_EMAILS, PPBIDEN_PIDM, USUA_ID)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""SUCCESS"" :" & """" & resArray(0).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()
        End Select

        context.Response.Write(res)

    End Sub

    Public Function GenerarSelect(ByVal dt As DataTable, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then


            res = "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                If clase <> "DISTRITO" Then
                    res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                Else
                    res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & "%" & dt.Rows(i)("codigo").ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                End If
            Next

        Else
            res = "error"
        End If
        Return res
    End Function


    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

    Public Function actualizar_Adicionales(ByVal ITEMSCOUNT_DIRECCION As String, ByVal ITEMSDETAIL_DIRECCION As String, ByVal ITEMSCOUNT_DATOSBANCO As String, ByVal ITEMSDETAIL_DATOSBANCO As String,
                                           ByVal ITEMSCOUNT_TELEFONOS As String, ByVal ITEMSDETAIL_TELEFONOS As String, ByVal ITEMSCOUNT_EMAILS As String, ByVal ITEMSDETAIL_EMAILS As String, ByVal PIDM As Integer,
                                           ByVal USUA As String) As Array
        Dim datos(1) As String
        Dim ad As New Nomade.NC.NCEAdicionales("Bn")
        datos = ad.Actualizar_Adicionales(ITEMSCOUNT_DIRECCION, ITEMSDETAIL_DIRECCION, ITEMSCOUNT_DATOSBANCO, ITEMSDETAIL_DATOSBANCO, ITEMSCOUNT_TELEFONOS, ITEMSDETAIL_TELEFONOS, ITEMSCOUNT_EMAILS, ITEMSDETAIL_EMAILS, PIDM, USUA)
        Return datos
    End Function

End Class