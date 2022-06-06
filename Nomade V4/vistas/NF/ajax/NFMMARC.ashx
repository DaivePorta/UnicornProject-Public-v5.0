<%@ WebHandler Language="VB" Class="NFMMARC" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NFMMARC : Implements IHttpHandler
    
    Dim flag As String
    Dim res As String
    Dim dt As DataTable
    Dim resb As New StringBuilder
    Dim nomb As String
    Dim user As String
    Dim acti As String
    Dim codigo As String
    Dim P_DESCRIPCION As String
    Dim p As New NOMADE.NF.NFMarcaUnidad("Bn")
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
      
        context.Response.ContentType = "text/plain"
        flag = context.Request("flag")
        nomb = context.Request("nomb")
        user = context.Request("user")
        acti = context.Request("acti")
        codigo = context.Request("codigo")
        P_DESCRIPCION = vChar(context.Request("P_DESCRIPCION"))
        
        Try
            
            Select Case flag.ToString
                Case "1" 'CREAR MARCA DE UNIDAD DE VEHICULO
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim array As Array
                    array = p.CrearMarcaUnidad(nomb, acti, user, If(P_DESCRIPCION = Nothing, "", P_DESCRIPCION))
                    
                    If Not (array Is Nothing) Then
                        resb.Append("[{")
                        resb.Append("""CODIGO"" :" & """" & array(0).ToString & """,")
                        resb.Append("""RESPUESTA"" :" & """" & array(1).ToString & """")
                        resb.Append("}]")
                    Else
                        resb.Append("[]")
                    End If
                    res = resb.ToString()
                    
                Case "2" ' ACTUALIZAR MARCA DE UNIDAD DE VEHICULO
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim array As Array
                    array = p.ActualizarMarcaUnidad(codigo, nomb, acti, user, If(P_DESCRIPCION = Nothing, "", P_DESCRIPCION))
                   
                    If Not (array Is Nothing) Then
                        resb.Append("[{")
                        resb.Append("""CODIGO"" :" & """" & array(0).ToString & """,")
                        resb.Append("""RESPUESTA"" :" & """" & array(1).ToString & """")
                        resb.Append("}]")
                    Else
                        resb.Append("[]")
                    End If
                    res = resb.ToString()
                    
                Case "3" 'CAMBIAR ESTADO
                  
                    res = p.CambiarEstadoMarcaUnidad(codigo) 'cambiar estado Inactivo/Activo                                                      
                    
                Case "4" ' LISTAR MARCAS DE UNIDADES DE VEHICULO
                    context.Response.ContentType = "application/json; charset=utf-8"

                    dt = p.ListarMarcaUnidad(codigo, String.Empty, String.Empty)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    resb.Append("""DESCRIPCION"" :" & """" & dt.Rows(0)("DESCRIPCION") & """,") ' NOMBRE DE LA MARCA
                    resb.Append("""DESC_MARCA"" :" & """" & dt.Rows(0)("DESC_MARCA").ToString().Replace(vbLf, "\n").Replace("""", "\""") & """,")
                    resb.Append("""ACTIVO"" :" & """" & dt.Rows(0)("ESTADO") & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                    
                    
            End Select
            
            context.Response.Write(res)
            
            
        Catch ex As Exception
            
            context.Response.Write("error" & ex.ToString)
            
        End Try
        
    End Sub
    
    Public Function vChar(ByVal campo As String) As String
        Dim res As String
        If campo IsNot Nothing Then
            res = campo.Trim().Replace("""", "'").Replace("\", " ")
            res = res.Replace(vbCrLf, "\n")
            res = res.ToString().Replace(vbLf, "\n").Replace("""", "\""")
        Else
            res = campo
        End If
        Return res
    End Function
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class