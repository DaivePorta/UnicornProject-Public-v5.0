<%@ WebHandler Language="VB" Class="Aseguradora" %>

Imports System
Imports System.Web
Imports System.Data

Public Class Aseguradora : Implements IHttpHandler
    
    Dim flag As String
    
    Dim dt As DataTable
    Dim resb As New StringBuilder
    Dim p As New Nomade.NC.NCEAseguradora("BN")
    
    
    Dim res As String
    Dim pidm, fechai, fechat, empresa, activo, user, usuario As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
   

        flag = context.Request("flag")
        pidm = context.Request("pidm")
        fechai = Utilities.fechaLocal(context.Request("fein"))
        fechat = context.Request("fete")
        If fechat <> String.Empty Then
            fechat = Utilities.fechaLocal(context.Request("fete"))
        End If
      
        empresa = context.Request("empr")
        activo = context.Request("acti")
        user = context.Request("user")
        usuario=context.Request("usua")
        
        Try
            
            Select Case flag.ToString
                Case "1"
                    
                    res = p.CrearAseguradora(pidm, fechai, fechat, empresa, activo, user)
                    
                Case "2"
                    res = p.ActualizarAseguradora(pidm, fechai, fechat, empresa, activo, user)
                    
                Case "3"
                  
                    dt = p.ListarAseguradora(pidm, String.Empty, empresa)
                                        
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""EMPRESA"" :" & """" & dt.Rows(0)("EMPRESA") & """,")
                    resb.Append("""FECHA_INICIO"" :" & """" & dt.Rows(0)("FECHA_INICIO") & """,")
                    resb.Append("""FECHA_FIN"" :" & """" & dt.Rows(0)("FECHA_FIN") & """,")
                    resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """")
                   
                  
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                    
                    
                Case "4"
                    Dim p As New Nomade.NC.NCEmpresa("BN")
                    dt = p.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    res = GenerarSelect(dt, "slcEmpresaaseg", "codigo", "descripcion", "EMPRESA")

            End Select
            
            context.Response.Write(res)
            
            
        Catch ex As Exception
            
            context.Response.Write("error" & ex.ToString)
            
        End Try
        
        
        
    End Sub
 
    
    Public Function GenerarSelect(ByVal dt As DataTable, ByVal id As String, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then
            res = "<select class=""span12"" id=""" & id & """>"
            res += "<option value=""0""><option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
            Next
            res += "</select>"
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