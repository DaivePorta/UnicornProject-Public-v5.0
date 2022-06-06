<%@ WebHandler Language="VB" Class="Accionista" %>

Imports System
Imports System.Web
Imports System.Data

Public Class Accionista : Implements IHttpHandler
   
    Dim flag As String
    
    Dim dt As DataTable
    ' Dim p As New Nomade.NC("Bn")
    Dim res As String
    Dim resb As New StringBuilder
    Dim p As New Nomade.NC.NCEAccionista("BN")
    Dim pidm, fechai, fechat, empresa, activo, user, participacion, usuario As String
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
        participacion = context.Request("parti")
        usuario = context.Request("usua")
        Try
            
            Select Case flag.ToString
                Case "1"
                    
                    res = CrearAccionista(pidm, fechai, fechat, empresa, activo, user, participacion)
                    
                Case "2"
                    res = ActualizarAccionista(pidm, fechai, fechat, empresa, activo, user, participacion)
                    
                Case "3"
                  
                    If pidm = "" Then
                        res = "pidm vacio"
                    Else
                        
                        dt = p.ListarAccionista(pidm, String.Empty, empresa)
                        If Not dt Is Nothing Then
                            resb.Append("[")
                            resb.Append("{")
                            resb.Append("""EMPRESA"" :" & """" & dt.Rows(0)("EMPRESA") & """,")
                            resb.Append("""FECHA_INICIO"" :" & """" & dt.Rows(0)("FECHA_INICIO") & """,")
                            resb.Append("""FECHA_FIN"" :" & """" & dt.Rows(0)("FECHA_FIN") & """,")
                            resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """,")
                            resb.Append("""PORCENTAJE"" :" & """" & dt.Rows(0)("PORCENTAJE") & """")
                  
                            resb.Append("}")
                            resb.Append("]")
                            res = resb.ToString()
                        Else
                            resb.Append("[")
                            resb.Append("{")
                            resb.Append("""EMPRESA"" :" & """" & empresa & """,")
                            resb.Append("""FECHA_INICIO"" :" & """"",")
                            resb.Append("""FECHA_FIN"" :" & """"",")
                            resb.Append("""ESTADO"" :" & """ACTIVO"",")
                            resb.Append("""PORCENTAJE"" :" & """""")
                  
                            resb.Append("}")
                            resb.Append("]")
                            res = resb.ToString()
                        End If

                    End If
                Case "4"
                    Dim p As New Nomade.NC.NCEmpresa("BN")
                    dt = p.ListarTotalEmpresa(String.Empty, "")
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "slcEmpresaacci", "codigo", "descripcion", "EMPRESA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "slcEmpresaacci", "codigo", "descripcion", "EMPRESA")
                    End If
            End Select
            
            context.Response.Write(res)
            
            
        Catch ex As Exception
            
            context.Response.Write("error" & ex.ToString)
            
        End Try
        
        
        
    End Sub
 
    
    Public Function CrearAccionista(ByVal p_pidm As String, ByVal p_fechai As String, ByVal p_fechat As String, ByVal p_empresa As String, ByVal p_activo As String, ByVal p_user As String, ByVal p_participacion As String) As String
        Dim datos As String
        datos = p.CrearAccionista(p_pidm, p_fechai, p_fechat, p_empresa, p_activo, p_user, p_participacion)
         
        Return datos
   
    End Function
    
    Public Function ActualizarAccionista(ByVal p_pidm As String, ByVal p_fechai As String, ByVal p_fechat As String, ByVal p_empresa As String, ByVal p_activo As String, ByVal p_user As String, ByVal p_participacion As String) As String
        Dim datos As String
        datos = p.ActualizarAccionista(p_pidm, p_fechai, p_fechat, p_empresa, p_activo, p_user, p_participacion)
         
        Return datos
   
    End Function
    
    
    
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
    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function
End Class