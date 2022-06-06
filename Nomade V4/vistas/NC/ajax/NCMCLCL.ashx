<%@ WebHandler Language="VB" Class="NCMCLCL" %>

Imports System
Imports System.Web
Imports System.Data
Public Class NCMCLCL : Implements IHttpHandler
    
    Dim flag As String
    
    Dim dt As DataTable
    Dim p As New Nomade.NC.NCTipoClienteProveedor("Bn")
    Dim res As String
    Dim codigo, nombre, tipo, activo, user, ctlg, predet As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
       

        
        'ASIGNACION DE VARIABLES CAPTURADAS 
        
        flag = context.Request("flag")
        
        codigo = context.Request("codi")
        nombre = context.Request("nomb")
        ' tipo = context.Request("tipo")
        activo = context.Request("acti")
        user = context.Request("user")
        ctlg = context.Request("ctlg")
        predet = context.Request("predet")
        'FIN
        

        Try
            
            Select Case flag.ToString
                
                Case "1"
                    
                    res = CrearTipoClienteProveedor(nombre, "C", activo, user, ctlg, predet)
                    
                Case "2"
                    
                    res = ActualizarTipoClienteProveedor(nombre, codigo, "C", activo, user, ctlg, predet)
                    
                Case "3"
                          
                    res = CambiarEstadoEstablecimiento(codigo, "C", ctlg)
                    
                Case "4"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarTipoClienteProveedor(codigo, "C", String.Empty, ctlg)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    resb.Append("""DESCRIPCION"" :" & """" & dt.Rows(0)("DESCRIPCION") & """,")
                    resb.Append("""EMPRESA"" :" & """" & dt.Rows(0)("EMPRESA") & """,")
                    resb.Append("""PREDETERMINADO"" :" & """" & dt.Rows(0)("PREDETERMINADO") & """,")
                    resb.Append("""CONTROL"" :" & """" & dt.Rows(0)("CONTROL") & """,")
                    resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                Case "5"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarTipoClienteProveedor(codigo, "C", String.Empty, ctlg, "B")
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""VERIFICADOR"" :" & """" & dt.Rows(0)("VERIFICADOR") & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
            End Select
            
            context.Response.Write(res)
            
            
        Catch ex As Exception
            
            context.Response.Write("error" & ex.ToString)
            
        End Try
        
    End Sub
 
    Public Function CrearTipoClienteProveedor(ByVal p_desc As String, ByVal p_tipo As String, ByVal p_activo As String, ByVal p_user As String, _
                                              ByVal p_ctlg_code As String, ByVal p_predet As String) As String
        Dim datos As String
        
        datos = p.CrearTipoClienteProveedor(p_desc, p_tipo, p_activo, p_user, ctlg, p_predet)
              
        Return datos
       
    End Function
    
    
    
    Public Function CambiarEstadoEstablecimiento(ByVal p_codigo As String, ByVal p_tipo As String, ByVal p_ctlg As String) As String
        
        Dim datos As String
        
        datos = p.CambiarEstadoTipoClienteProveedor(p_codigo, p_tipo, p_ctlg)
        
        Return datos
        
    End Function
    
    
    Public Function ActualizarTipoClienteProveedor(ByVal p_desc As String, ByVal p_code As String, ByVal p_tipo As String, _
                                                   ByVal p_activo As String, ByVal p_user As String, _
                                                   ByVal p_ctlg_code As String, ByVal p_predet As String) As String
        Dim datos As String
        
        datos = p.ActualizarTipoClienteProveedor(p_desc, p_code, p_tipo, p_activo, p_user, ctlg, p_predet)
        
        Return datos
        
    End Function
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class