<%@ WebHandler Language="VB" Class="GBLNBIO" %>

Imports System
Imports System.Web
Imports System.Data

Public Class GBLNBIO : Implements IHttpHandler
    Dim Biometrico As New Nomade.GB.GBBiometrico("Bn")
    Dim dt As DataTable
    Dim resb As New StringBuilder
    Dim res As String
    Dim Opcion As String
    Dim Codigo As String
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        'context.Response.ContentType = "text/plain"
        'context.Response.Write("Hello World")
     
        Opcion = context.Request("Opcion")
        Codigo = context.Request("Codigo")
        Dim Marca, Modelo, Serie, Sistema, Versi, Estado, Usuario, Compatible As String
        
        
        Try
            Select Case Opcion
                Case "L"
                       context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New DataTable
                    dt = Biometrico.Listar_Biometrico("", "", "0")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                    
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("FTVBIOM_CODE").ToString & """,")
                            
                            resb.Append("""MARCA"" :" & """" & MiDataRow("FTVBIOM_MARCA").ToString & """,")
                   
                            resb.Append("""MODELO"" :" & """" & MiDataRow("FTVBIOM_MODELO").ToString & """,")
                            
                            resb.Append("""SERIE"" :" & """" & MiDataRow("FTVBIOM_SERIE").ToString & """,")
                            resb.Append("""SISTEMA"" :" & """" & MiDataRow("FTVBIOM_SOFTWARE").ToString & """,")
                            Dim Est As String = ""
                            If MiDataRow("FTVBIOM_ESTADO_IND").ToString.Equals("A") Then
                                Est = "ACTIVO"
                            Else
                                Est = "INACTIVO"
                            End If
                            resb.Append("""COMPATIBLE"" :" & """" & MiDataRow("COMP").ToString & """,")
                            resb.Append("""VERSION"" :" & """" & MiDataRow("FTVBIOM_VERSION").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & Est & """,")
                            resb.Append("""USUARIO"" :" & """" & MiDataRow("FTVBIOM_USUA_ID").ToString & """,")
                            resb.Append("""FECHA"" :" & """" & MiDataRow("FTVBIOM_FECHA_ACTV").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "S"
                       context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New DataTable
                    dt = Biometrico.Listar_Biometrico(Codigo, "", "0")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                    
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("FTVBIOM_CODE").ToString & """,")
                            
                            resb.Append("""MARCA"" :" & """" & MiDataRow("FTVBIOM_MARCA").ToString & """,")
                   
                            resb.Append("""MODELO"" :" & """" & MiDataRow("FTVBIOM_MODELO").ToString & """,")
                            
                            resb.Append("""SERIE"" :" & """" & MiDataRow("FTVBIOM_SERIE").ToString & """,")
                            resb.Append("""SISTEMA"" :" & """" & MiDataRow("FTVBIOM_SOFTWARE").ToString & """,")
                            Dim Est As String = ""
                            If MiDataRow("FTVBIOM_ESTADO_IND").ToString.Equals("A") Then
                                Est = "ACTIVO"
                            Else
                                Est = "INACTIVO"
                            End If
                            resb.Append("""COMPATIBLE"" :" & """" & MiDataRow("COMP").ToString & """,")
                            resb.Append("""VERSION"" :" & """" & MiDataRow("FTVBIOM_VERSION").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & Est & """,")
                            resb.Append("""USUARIO"" :" & """" & MiDataRow("FTVBIOM_USUA_ID").ToString & """,")
                            resb.Append("""FECHA"" :" & """" & MiDataRow("FTVBIOM_FECHA_ACTV").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "R"
         
                    Marca = context.Request("Marca")
                    Modelo = context.Request("Modelo")
                    Serie = context.Request("Serie")
                    Sistema = context.Request("Sistema")
                    Versi = context.Request("Version")
                    Estado = context.Request("Estado")
                    Usuario = context.Request("Usuario")
                    Compatible = context.Request("Compatible")
                    res = Biometrico.Crear_Biometrico(String.Empty, Marca, Modelo, Serie, Sistema, Versi, Estado, Usuario, Compatible)
                    
                Case "M"
                    Codigo = context.Request("Codigo")
                    Marca = context.Request("Marca")
                    Modelo = context.Request("Modelo")
                    Serie = context.Request("Serie")
                    Sistema = context.Request("Sistema")
                    Versi = context.Request("Version")
                    Estado = context.Request("Estado")
                    Usuario = context.Request("Usuario")
                    Compatible = context.Request("Compatible")
                    res = Biometrico.Modificar_Biometrico(Codigo, Marca, Modelo, Serie, Sistema, Versi, Estado, Usuario, String.Empty, Compatible)
                Case "C"
                    Dim i As Integer = 0
                    'Codigo = context.Request("Codigo")
                    dt = New DataTable
                    dt = Biometrico.Listar_Biometrico(IIf(Codigo.Equals("undefined") OR Codigo.Equals("0") , Nothing, Codigo), "A", "0", "2")
                    ' resb.Append("<option value='0'>NINGUNO</option>")
                    If Not (dt Is Nothing) Then
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("<option value='" & MiDataRow("FTVBIOM_CODE").ToString & "'>" & MiDataRow("FTVBIOM_MARCA").ToString & "/" & MiDataRow("FTVBIOM_MODELO").ToString & "</option>")
                            i = i + 1
                        Next
                    Else
                        'resb.Append("<option value='" & MiDataRow("FTVBIOM_CODE").ToString & "'>" & MiDataRow("FTVBIOM_MARCA").ToString & "/" & MiDataRow("FTVBIOM_MODELO").ToString & "</option>")
                    End If
                    res = resb.ToString()
                Case "P"
                    Compatible = context.Request("Compatible")
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New DataTable
                    dt = Biometrico.Listar_Biometrico(Compatible, "A", Compatible, "1")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                    
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("FTVBIOM_CODE").ToString & """,")
                            
                            resb.Append("""MARCA"" :" & """" & MiDataRow("FTVBIOM_MARCA").ToString & """,")
                   
                            resb.Append("""MODELO"" :" & """" & MiDataRow("FTVBIOM_MODELO").ToString & """,")
                            
                            resb.Append("""SERIE"" :" & """" & MiDataRow("FTVBIOM_SERIE").ToString & """,")
                            resb.Append("""SISTEMA"" :" & """" & MiDataRow("FTVBIOM_SOFTWARE").ToString & """,")
                            Dim Est As String = ""
                            If MiDataRow("FTVBIOM_ESTADO_IND").ToString.Equals("A") Then
                                Est = "ACTIVO"
                            Else
                                Est = "INACTIVO"
                            End If
                            resb.Append("""COMPATIBLE"" :" & """" & MiDataRow("COMP").ToString & """,")
                            resb.Append("""VERSION"" :" & """" & MiDataRow("FTVBIOM_VERSION").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & Est & """,")
                            resb.Append("""USUARIO"" :" & """" & MiDataRow("FTVBIOM_USUA_ID").ToString & """,")
                            resb.Append("""FECHA"" :" & """" & MiDataRow("FTVBIOM_FECHA_ACTV").ToString & """")
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
        Catch ex As Exception
            context.Response.Write(ex.Message)

        End Try
    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class