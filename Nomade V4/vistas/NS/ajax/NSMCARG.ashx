<%@ WebHandler Language="VB" Class="NSMCARG" %>

Imports System.Data
Imports System
Imports System.Web

Public Class NSMCARG : Implements IHttpHandler
    Dim flag As String
    
    Dim dt As DataTable
    Dim p As New Nomade.NS.NSCargos("Bn")
    Dim res As String
    Dim codigo, nombre, sistema, activo, user, codrec, estado, descripcion, modulo As String
    Dim resb As New StringBuilder
    Dim nivel As String
    Dim clases As String
    Dim detalle As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
       
        flag = context.Request("flag")
        sistema = context.Request("sist")
        modulo = context.Request("modl")
        codigo = context.Request("codigo")
        descripcion = context.Request("desc")
        nivel = context.Request("nive")
        activo = context.Request("acti")
        user = context.Request("user")
        estado = context.Request("estado")
        detalle = context.Request("deta")
                       
       
        Try
            
            Select Case flag.ToString
                
                Case "1"
                    res = p.CrearCargo(descripcion, nivel, activo, user, detalle)
                    
                Case "2"
                    
                    res = p.ActualizarCargo(descripcion,codigo, nivel, activo, user, detalle)
                    
                Case "3"
                          
                    res = p.CambiarEstadoCargo(codigo)
                    
                Case "4"
                    Dim p2 As New Nomade.NS.NSRoles("BN")
                   
                    dt = p2.ListarRol(String.Empty, "A")
                    res = GenerarSelect(dt, "codigo", "descripcion", "ROLES")
                    
                Case "5"
                    
                    Dim p2 As New NOMADE.NS.NSClases("Bn")
                    res = GenerarSelect(p2.Listar_Clases(String.Empty, "A", String.Empty), "code", "descr", "CLASES")
                    

                    
                Case "9"
                          
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarCargo(codigo, String.Empty, String.Empty)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    resb.Append("""DESCRIPCION"" :" & """" & dt.Rows(0)("DESCRIPCION") & """,")
                    resb.Append("""NIVEL"" :" & """" & dt.Rows(0)("NIVEL") & """,")
                    resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """,")
                    resb.Append("""DETALLE"" :" & "" & dt.Rows(0)("DETALLE") & "")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                Case "10" 'Lista Tbl Codigo
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim sist As New Nomade.NS.NSSistema("BN")
                    dt = sist.fnListarTblCodigo(codigo, estado)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""VALOR"" :" & """" & MiDataRow("VALOR").ToString & """,")
                            resb.Append("""ABREVIATURA"" :" & """" & MiDataRow("ABREVIATURA").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO").ToString & """")
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
            
            context.Response.Write("error" & ex.ToString)
            
        End Try
    End Sub
        
        
        
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
    
       
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class