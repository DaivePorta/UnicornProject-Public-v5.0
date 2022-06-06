<%@ WebHandler Language="VB" Class="NSMROLE" %>

Imports System.Data
Imports System
Imports System.Web

Public Class NSMROLE : Implements IHttpHandler
  
    Dim flag As String
    
    Dim dt As DataTable
    Dim p As New Nomade.NS.NSRoles("Bn")
    Dim res As String
    Dim codigo, nombre, sistema, activo, user, codrec, descripcion, modulo As String
    Dim resb As New StringBuilder
    Dim comentario As String
    Dim clases As String
    Dim items As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
       
        flag = context.Request("flag")
        sistema = context.Request("sist")
        modulo = context.Request("modl")
        codigo = context.Request("codigo")
        descripcion = context.Request("desc")
        comentario = context.Request("come")
        activo = context.Request("acti")
        user = context.Request("user")
        clases = context.Request("clas")
        items = context.Request("item")
        
        descripcion = vChar(descripcion)
        comentario = vChar(comentario)
        
       
        Try
            
            Select Case flag.ToString
                
                Case "1"
                    res = p.CrearRol(descripcion, comentario, activo, user, clases, items)
                    
                Case "2"
                    
                    res = p.ActualizarRol(codigo, descripcion, comentario, activo, user, clases, items)
                    
                Case "3"
                          
                    res = p.CambiarEstadoRol(codigo)
                    
                Case "4"
                    Dim p2 As New Nomade.NS.NSSistema("BN")
                   
                    dt = p2.ListarSistema(String.Empty, "A")
                    res = GenerarSelect(dt, "codigo", "nombr", "SISTEMA")
                    
                Case "5"
                    
                    Dim p2 As New Nomade.NS.NSClases("Bn")
                    res = GenerarSelect(p2.Listar_Clases(String.Empty, "A", String.Empty), "code", "descr", "CLASES")
                    
                Case "6"
                    
                    Dim p2 As New Nomade.NS.NSSistema("Bn")
                    res = GenerarLista(p2.ListarSistema(String.Empty, "A"), "codigo", "nombre", "SISTEMA")
  
                Case "7"
                    
                    Dim p2 As New Nomade.NS.NSModulo("Bn")
                    res = GenerarLista(p2.ListarModulo(String.Empty, sistema, "A"), "codigo", "descripcion", "SISTEMA")
                    
                Case "8"
                    
                    Dim p2 As New Nomade.NS.NSItem("Bn")
                    res = GenerarLista2(p2.ListarItem(String.Empty, "A", sistema, modulo), "codigo", "nombre", "SISTEMA")
                    
                Case "9"
                          
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarRol(codigo, String.Empty)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    resb.Append("""DESCRIPCION"" :" & """" & dt.Rows(0)("DESCRIPCION") & """,")
                    resb.Append("""COMENTARIO"" :" & """" & dt.Rows(0)("COMENTARIO").ToString().Replace(vbCrLf, "\n").Replace("""", "\""") & """,")
                    resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """,")
                    resb.Append("""ITEMS"" :" & """" & dt.Rows(0)("ITEMS") & """,")
                    resb.Append("""CLASES"" :" & "" & dt.Rows(0)("CLASES") & "")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                
                Case "10"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarRol_Detallado(codigo)
                   
                    Dim sistema_anterior As String = ""
                    Dim modulo_anterior As String = ""
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For i As Integer = 0 To dt.Rows.Count - 1
                            
                            If sistema_anterior <> dt.Rows(i)("CODIGO_SISTEMA") Then
                            
                                If sistema_anterior <> "" Then
                                    modulo_anterior = ""
                                    resb.Append("{}")
                                    resb.Append("]}]},{")
                                    resb.Append("""value"" :" & """" & dt.Rows(i)("CODIGO_SISTEMA") & """,")
                                    resb.Append("""id"" :" & """" & "_" & dt.Rows(i)("CODIGO_SISTEMA") & """,")
                                    resb.Append("""label"" :" & """" & dt.Rows(i)("NOMBRE_SISTEMA") & """,")
                                    resb.Append("""items"": [") 'MODULOS
                                Else
                                
                                    resb.Append("{")
                                    resb.Append("""value"" :" & """" & dt.Rows(i)("CODIGO_SISTEMA") & """,")
                                    resb.Append("""id"" :" & """" & "_" & dt.Rows(i)("CODIGO_SISTEMA") & """,")
                                    resb.Append("""label"" :" & """" & dt.Rows(i)("NOMBRE_SISTEMA") & """,")
                                    resb.Append("""items"": [") 'MODULOS
                                    
                                End If
                                
                                sistema_anterior = dt.Rows(i)("CODIGO_SISTEMA")
                            End If
                            
                            If modulo_anterior <> dt.Rows(i)("CODIGO_MODULO") Then
                                If modulo_anterior <> "" Then
                                    resb.Append("{}")
                                    
                                    resb.Append("]},{")
                                    resb.Append("""value"" :" & """" & dt.Rows(i)("CODIGO_MODULO") & """,")
                                    resb.Append("""id"" :" & """" & "_" & dt.Rows(i)("CODIGO_MODULO") & """,")
                                    resb.Append("""label"" :" & """" & dt.Rows(i)("NOMBRE_MODULO") & """,")
                                    resb.Append("""items"": [")
                                Else
                                    resb.Append("{")
                                    resb.Append("""value"" :" & """" & dt.Rows(i)("CODIGO_MODULO") & """,")
                                    resb.Append("""id"" :" & """" & "_" & dt.Rows(i)("CODIGO_MODULO") & """,")
                                    resb.Append("""label"" :" & """" & dt.Rows(i)("NOMBRE_MODULO") & """,")
                                    resb.Append("""items"": [")
                                End If
                                
                                modulo_anterior = dt.Rows(i)("CODIGO_MODULO")
                            End If
                            
                            resb.Append("{")
                            resb.Append("""value"" :" & """" & dt.Rows(i)("CODIGO_ITEM") & """,")
                            resb.Append("""id"" :" & """" & "_" & dt.Rows(i)("CODIGO_ITEM") & """,")
                            resb.Append("""label"" :" & """" & dt.Rows(i)("NOMBRE_ITEM") & """,")
                            resb.Append("""icon"" :" & """" & IIf(dt.Rows(i)("TIPO_ACCESO") = "E", "icon-pencil", "icon-search") & """")
                            resb.Append("},")
                            
                            
                            
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]}]}")
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
            End Select
            
            context.Response.Write(res)
            
            
        Catch ex As Exception
            
            context.Response.Write("error" & ex.ToString)
            
        End Try
    End Sub
    
    ''' <summary>
    ''' Reemplaza los saltos de linea para que no ocacione problemas con el json
    ''' </summary>
    ''' <param name="campo">cadena a modificar</param>
    ''' <returns>retorna la cadena procesada</returns>
    ''' <remarks></remarks>
    Public Function vChar(ByVal campo As String) As String
        Dim res As String
        If campo IsNot Nothing Then
            res = campo.Trim().Replace("""", "'").Replace("\", " ")
            res = res.Replace(vbCrLf, "\n")
        Else
            res = campo
        End If
        Return res
    End Function
        
    Public Function GenerarSelect(ByVal dt As DataTable, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then
           
            
            res = "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
            Next
        Else
            res = "error"
        End If
        Return res
    End Function
    
    
    Public Function GenerarLista(ByVal dt As DataTable, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then
           
            
            res = ""
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<p  class=""item"" valor=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</p>"
            Next
        Else
            res = "error"
        End If
        Return res
    End Function
    
    Public Function GenerarLista2(ByVal dt As DataTable, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then
           
            
            res = ""
            For i As Integer = 0 To dt.Rows.Count - 1
                
                res += "<div id=""" & dt.Rows(i)(cvalue).ToString() & """ class=""row-fluid span12 item"">"
                res += "<div class=""span8"">" & dt.Rows(i)(chtml).ToString() & "</div>"
                res += "<div class=""span2 ver"" align=""center""><input type=""checkbox""/></div>"
                res += "<div class=""span2 editar"" align=""center""><input type=""checkbox""/></div></div>"

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

End Class