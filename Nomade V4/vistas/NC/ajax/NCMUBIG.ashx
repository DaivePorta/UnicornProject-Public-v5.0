<%@ WebHandler Language="VB" Class="NCMUBIG" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMUBIG : Implements IHttpHandler
    'Declaramos variables para usarlas en el proceso
    Dim code_ubig, code_pais, opcion As String
    Dim CODE, CODIGO_SUNAT, CODIGO_ANT, DESCRIPCION, NIVEL, ESTADO, USUA_ID As String
    
    
    Dim dt As DataTable

    Dim p As New Nomade.NC.NCUbigeo("Bn")
    Dim q As New Nomade.NC.NCPais("Bn")
    Dim res As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        code_ubig = context.Request("code_ubig")
        NIVEL = context.Request("NIVEL")
        code_pais = context.Request("code_pais")
        opcion = context.Request("opcion")
        
        CODE = context.Request("CODE")
        CODIGO_SUNAT = context.Request("CODIGO_SUNAT")
        CODIGO_ANT = context.Request("CODIGO_ANT")
        DESCRIPCION = context.Request("DESCRIPCION")
        NIVEL = context.Request("NIVEL")
        ESTADO = context.Request("ESTADO")
        USUA_ID = context.Request("USUA_ID")
                
        Try
            
            Select Case opcion.ToString()
                Case "0"
                    context.Response.ContentType = "text/html"
                    dt = p.Listar_Ubigeo(String.Empty, String.Empty, code_ubig, Convert.ToInt32(NIVEL.ToString()), code_pais, "A")
                    res = GenerarHtmlUbigeo(dt, code_ubig, NIVEL)
                Case "1"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = q.Listar_Pais(code_pais, String.Empty, "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO_UBIGEO"" :" & """" & MiDataRow("Codigo_Sunat").ToString & """")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "2"
                    context.Response.ContentType = "text/html"
                    dt = p.Listar_Ubigeo(String.Empty, String.Empty, String.Empty, Convert.ToInt32(NIVEL.ToString()), code_pais, String.Empty)
                    res = GenerarHtmlUbigeoGeneral("DEPARTAMENTO", dt)
                Case "3"
                    context.Response.ContentType = "text/html"
                    dt = p.Listar_Ubigeo(String.Empty, String.Empty, code_ubig, Convert.ToInt32(NIVEL.ToString()), code_pais, String.Empty)
                    res = GenerarHtmlUbigeoGeneral("PROVINCIA", dt)
                Case "4"
                    context.Response.ContentType = "text/html"
                    dt = p.Listar_Ubigeo(String.Empty, String.Empty, code_ubig, Convert.ToInt32(NIVEL.ToString()), code_pais, String.Empty)
                    res = GenerarHtmlUbigeoGeneral("DISTRITO", dt)
                Case "N"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    resArray = GrabarUbigeo(CODIGO_SUNAT, CODIGO_ANT, DESCRIPCION, Convert.ToInt32(NIVEL.ToString()), code_pais, ESTADO, USUA_ID)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & resArray(0).ToString & """,")
                    resb.Append("""SUCCESS"" :" & """" & resArray(1).ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                Case "M"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    resArray = ActualizarUbigeo(CODE, CODIGO_SUNAT, CODIGO_ANT, DESCRIPCION, Convert.ToInt32(NIVEL.ToString()), code_pais, ESTADO, USUA_ID)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & resArray(0).ToString & """,")
                    resb.Append("""SUCCESS"" :" & """" & resArray(1).ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                Case "5"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = q.Listar_Pais(String.Empty, String.Empty, "A")
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("Codigo").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("Descripcion").ToString & """,")
                            resb.Append("""CODIGO_SUNAT"" :" & """" & MiDataRow("Codigo_Sunat").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "6"
                    context.Response.ContentType = "text/html"
                    dt = p.Listar_Datos_Ubigeo(code_pais)
                    res = GenerarHtml(dt)
                Case Else
            End Select
                                    
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
        
    End Sub
    
    Public Function GenerarHtml(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<table id=""tblUbigeo"" cellspacing=""0"" class=""display DTTT_selectable"">"
            res += "<thead>"
            res += "<tr>"
            res += "<td align='center'>UBIGEO</td>"
            res += "<td align='left'>DEPARTAMENTO</td>"
            res += "<td align='center'>UBIGEO</td>"
            res += "<td align='left'>PROVINCIA</td>"
            res += "<td align='center'>UBIGEO</td>"
            res += "<td align='left'>DISTRITO</td>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr>"
                res += "<td align='center'>" & dt.Rows(i)("UBIG_DE").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("DESC_DE").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("UBIG_PR").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("DESC_PR").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("UBIG_DI").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("DESC_DI").ToString() & "</td>"
                res += "</tr>"
            Next
            res += "</tbody>"
            res += "</table>"
        Else
            res = "No se encontraron datos!!!"
        End If
        Return res
    End Function

    Public Function GenerarHtmlUbigeo(ByVal dt As DataTable, ByVal code As String, ByVal NIVEL As String) As String
        If Not dt Is Nothing Then
            res = "<table id=""tbl" & code.ToString() & """ border=""0"" cellpadding=""0"" cellspacing=""0""  class=""display"">"
            res += "<thead>"
            res += "<tr>"
            res += IIf(NIVEL = "2", "<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>", String.Empty)
            res += "<td align='center'>UBIGEO</td>"
            res += "<td align='center'>DESCRIPCIÓN</td>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr>"
                res += IIf(NIVEL = "2", "<td><img id='" & dt.Rows(i)("UBIGEO").ToString() & "' src=""recursos/ico/details_open.png"" name='" & dt.Rows(i)("UBIGEO").ToString() & "' /></td>", String.Empty)
                res += "<td>" & dt.Rows(i)("UBIGEO").ToString() & "</td>"
                res += "<td>" & dt.Rows(i)("DESCRIPCION").ToString() & "</td>"
                res += "</tr>"
            Next
            res += "</tbody>"
            res += "</table>"
        Else
            res = "No se encontraron datos!!!"
        End If
        Return res
    End Function
    
    Public Function GenerarHtmlUbigeoGeneral(ByVal name As String, ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<table id=""tblUbig" & name & """ border=""0"" cellpadding=""0"" cellspacing=""0""  class=""display"">"
            res += "<thead>"
            res += "<tr>"
            res += "<th colspan=""3"">" & name & "</th>"
            res += "</tr>"
            res += "<tr>"
            res += "<th align='center' style='display:none'>CODIGO</th>"
            res += "<th align='center'>UBIGEO</th>"
            res += "<th align='center'>DESCRIPCIÓN</th>"
            res += "<th align='center'>ESTADO</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr id='" & dt.Rows(i)("UBIGEO").ToString() & "'>"
                res += "<td id='" & dt.Rows(i)("CODIGO").ToString() & "' style='display:none'>" & dt.Rows(i)("CODIGO").ToString() & "</td>"
                res += "<td>" & dt.Rows(i)("UBIGEO").ToString() & "</td>"
                res += "<td>" & dt.Rows(i)("DESCRIPCION").ToString() & "</td>"
                res += "<td>" & dt.Rows(i)("NESTADO").ToString() & "</td>"
                res += "</tr>"
            Next
            res += "</tbody>"
            res += "</table>"
        Else
            res = "No se encontraron datos!!!"
        End If
        Return res
    End Function
    
    Public Function GrabarUbigeo(ByVal CODIGO_SUNAT As String, ByVal CODIGO_ANT As String, ByVal DESCRIPCION As String, ByVal NIVEL As Integer, ByVal code_pais As String, ByVal ESTADO As String, ByVal USUA_ID As String) As Array
        Dim datos(2) As String
        datos = p.Crear_Ubigeo(CODIGO_SUNAT, CODIGO_ANT, DESCRIPCION, NIVEL, code_pais, ESTADO, USUA_ID)
        
        Return datos
    End Function
    
    Public Function ActualizarUbigeo(ByVal CODE As String, ByVal CODIGO_SUNAT As String, ByVal CODIGO_ANT As String, ByVal DESCRIPCION As String, ByVal NIVEL As Integer, ByVal code_pais As String, ByVal ESTADO As String, ByVal USUA_ID As String) As Array
        Dim datos(2) As String
        datos = p.Actualizar_Ubigeo(CODE, CODIGO_SUNAT, CODIGO_ANT, DESCRIPCION, NIVEL, code_pais, ESTADO, USUA_ID)
        
        Return datos
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function
    
End Class