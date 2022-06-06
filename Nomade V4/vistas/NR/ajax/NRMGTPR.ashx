<%@ WebHandler Language="VB" Class="NRMGTPR" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NRMGTPR : Implements IHttpHandler
    

    Dim flag As String
    
    Dim dt As DataTable
    Dim p As New Nomade.NR.NRCategoriaProveedor("Bn")
    Dim res As String
    Dim codigo, nombre, tipo, activo, user, predet As String
    Dim resb As New StringBuilder
    Dim empresa As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
       

        
        'ASIGNACION DE VARIABLES CAPTURADAS 
        
        flag = context.Request("flag")
        
        codigo = context.Request("codi")
        nombre = context.Request("nomb")
        empresa = context.Request("empr")
        activo = context.Request("acti")
        user = context.Request("user")
        predet = context.Request("predet")
        'FIN
        

        Try
            
            Select Case flag.ToString
                
                Case "1"
                    res = CrearTipoClienteProveedor(nombre, "P", activo, user, empresa, predet)
                    
                Case "2"
                    res = ActualizarTipoClienteProveedor(nombre, codigo, "P", activo, user, empresa, predet)
                    
                Case "3"
                    res = CambiarEstadoEstablecimiento(codigo, "P", empresa)
                    
                Case "4"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarTipoClienteProveedor(codigo, "P", String.Empty, empresa)
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
                    'Case "5"
                    '    Dim p As New Nomade.NC.NCEmpresa("BN")
                    '    dt = p.ListarTotalEmpresa(String.Empty, "A")
                    '    res = GenerarSelect(dt, "codigo", "descripcion", "EMPRESA")
                Case "6"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarTipoClienteProveedor(codigo, "P", String.Empty, empresa, "B")
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
 
    Public Function CrearTipoClienteProveedor(ByVal p_desc As String, ByVal p_tipo As String, ByVal p_activo As String, _
                                              ByVal p_user As String, ByVal p_ctlg As String, _
                                              ByVal p_predet As String) As String
        Dim datos As String
        
        datos = p.CrearTipoClienteProveedor(p_desc, p_tipo, p_activo, p_user, p_ctlg, p_predet)
              
        Return datos
       
    End Function
    
    
    
    Public Function CambiarEstadoEstablecimiento(ByVal p_codigo As String, ByVal p_tipo As String, ByVal p_ctlg As String) As String
        
        Dim datos As String
        
        datos = p.CambiarEstadoTipoClienteProveedor(p_codigo, p_tipo, p_ctlg)
        
        Return datos
        
    End Function
    
    
    Public Function ActualizarTipoClienteProveedor(ByVal p_desc As String, ByVal p_code As String, ByVal p_tipo As String, _
                                                   ByVal p_activo As String, ByVal p_user As String, _
                                                   ByVal p_ctlg As String, ByVal p_predet As String) As String
        Dim datos As String
        
        datos = p.ActualizarTipoClienteProveedor(p_desc, p_code, p_tipo, p_activo, p_user, p_ctlg, p_predet)
        
        Return datos
        
    End Function
        
        
    'Public Function GenerarSelect(ByVal dt As DataTable, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
    '    If Not dt Is Nothing Then
    '     res="<option></option>"
         
    '        For i As Integer = 0 To dt.Rows.Count - 1
    '            res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
    '        Next
          
    '    Else
    '        res = "error"
    '    End If
    '    Return res
    'End Function
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

  

End Class