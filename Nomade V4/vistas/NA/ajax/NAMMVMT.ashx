<%@ WebHandler Language="VB" Class="NAMMVMT" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NAMMVMT : Implements IHttpHandler
    
    
    Dim code As String
    Dim opcion As String
    Dim codigo, empresa, metodo, estado, usuario As String
    Dim dt As DataTable
    Dim p As New Nomade.NA.NAMetodosValuacion("bn")
    Dim q As New Nomade.NC.NCEmpresa("bn")
    
    
    Dim res As String
    Dim resb As New StringBuilder
    Dim usua As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
       
        
        opcion = context.Request("opcion")
        code = context.Request("code")
        
        codigo = context.Request("codigo")
        empresa = context.Request("empresa")
        metodo = context.Request("metodo")
        estado = context.Request("estado")
        usuario = context.Request("usuario")
        usua = context.Request("usua")
        
        context.Response.ContentType = "text/html"
        
        
        
       
        Select Case opcion
                
            Case "1"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = p.Listar_Metodos(code, String.Empty, String.Empty, String.Empty)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""code"":" & """" & MiDataRow("CODE").ToString & """,")
                        resb.Append("""CTLG_CODE"":" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                        resb.Append("""EMPRESA"":" & """" & MiDataRow("EMPRESA").ToString & """,")
                        resb.Append("""MEVA_CODE"":" & """" & MiDataRow("MEVA_CODE").ToString & """,")
                        resb.Append("""METODO"":" & """" & MiDataRow("METODO").ToString & """,")
                        resb.Append("""ESTADO_IND"":" & """" & MiDataRow("ESTADO_IND").ToString & """")
                        resb.Append("}")
                    Next
                    resb.Append("]")
                End If
                
                res = resb.ToString()
                
            Case "A"
                
                res = Actualizar_Metodos(codigo, empresa, metodo, estado, usuario)
                
            Case "3"
                    
                res = Crear_Metodo(empresa, metodo, estado, usuario)
                    
            Case "2"
                res = CambiarEstadoMetodos(code)
                    
                    
                    
            Case "4"
                    
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = q.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                If Not (dt Is Nothing) Then
                    dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
                
            Case "5"
                
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = p.Listar_Tipos_Metodos(String.Empty, String.Empty, "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""code"":" & """" & MiDataRow("Codigo").ToString & """,")
                        resb.Append("""Codigo_Sunat"":" & """" & MiDataRow("Codigo_Sunat").ToString & """,")
                        resb.Append("""Descripcion"":" & """" & MiDataRow("Descripcion").ToString & """,")
                        resb.Append("""Descri_corta"":" & """" & MiDataRow("Descri_corta").ToString & """,")
                        resb.Append("""ESTADO_IND"":" & """" & MiDataRow("ESTADO_IND").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                        
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                
                res = resb.ToString()
            Case Else
                    
        End Select
            
        context.Response.Write(res)
            
           
        
    End Sub
    
    
    Public Function Crear_Metodo(ByVal p_CTLG_CODE As String, ByVal p_MEVA_CODE As String, ByVal p_ESTADO_IND As String, p_USUA_ID As String) As String
       
        Dim Datos(1) As String
        Datos = p.Crear_Metodos_Valuacion(p_CTLG_CODE, p_MEVA_CODE, p_ESTADO_IND, p_USUA_ID)
        Return Datos(0)
    
    End Function
        
    Public Function Actualizar_Metodos(ByVal p_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_MEVA_CODE As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String) As String
       
        Dim Datos(1) As String
        Datos = p.Actualizar_Metodos_Valuacion(p_CODE, p_CTLG_CODE, p_MEVA_CODE, p_ESTADO_IND, p_USUA_ID)
        Return Datos(0)
    
    End Function
    
    
    Public Function CambiarEstadoMetodos(ByVal p_CODE As String) As String
       
        Dim datos(1) As String
        
        datos = p.CambiarEstadoMetodos(p_CODE)
        
        Return datos(0)
     
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