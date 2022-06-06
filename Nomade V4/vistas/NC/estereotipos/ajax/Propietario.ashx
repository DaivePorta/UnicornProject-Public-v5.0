<%@ WebHandler Language="VB" Class="Propietario" %>

Imports System
Imports System.Web
Imports System.Data

Public Class Propietario : Implements IHttpHandler
    
    Dim flag As String
    Dim activo, empresa, fechai, fechat, user, pidm, usuario As String
    Dim dt, dt1, dt2 As DataTable
    ' Dim p As New Nomade.NC("Bn")
    Dim res As String
     Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
   
        flag = context.Request("flag")
        
        pidm = context.Request("pidm")
        activo = context.Request("acti")
        empresa = context.Request("empr")
        usuario=context.Request("usua")
        fechai = Utilities.fechaLocal(context.Request("feci"))

        fechat = context.Request("fect")
        If fechat <> String.Empty Then
            fechat = Utilities.fechaLocal(context.Request("fect"))
        End If
        
        user = context.Request("user")
        
        Try
            
            Select Case flag.ToString
                Case "1"
                    Dim p As New NOMADE.NC.NCEPropietario("BN")
                    res = p.CrearPropietario(pidm, fechai, fechat, empresa, activo, user)
                
                Case "2"
                    Dim p As New NOMADE.NC.NCEPropietario("BN")
                    res = p.ActualizarPropietario(pidm, fechai, fechat, empresa, activo, user)
                    
                Case "3"
                    Dim p As New NOMADE.NC.NCEPropietario("BN")
                    dt = p.ListarPropietario(pidm, String.Empty, empresa)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""EMPRESA"" :" & """" & dt.Rows(0)("EMPRESA") & """,")
                        resb.Append("""FECHA_INICIO"" :" & """" & dt.Rows(0)("FECHA_INICIO") & """,")
                        resb.Append("""FECHA_FIN"" :" & """" & dt.Rows(0)("FECHA_FIN") & """,")
                        resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """")
                        resb.Append("}")
                        resb.Append("]")
                        res = resb.ToString()
                    Else
                        res = "[]"
                    End If
                    
                Case "4"
                    Dim p As New NOMADE.NC.NCEmpresa("BN")
                    dt = p.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    res = GenerarSelect(dt, "slcEmpresaprop", "codigo", "descripcion", "EMPRESA")
                    
                Case "5"
                    Dim p As New NOMADE.NF.NFUnidadVehiculo("BN")
                    dt = p.ListarUnidad(String.Empty, empresa, "A", pidm, String.Empty)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For i As Integer = 0 To dt.Rows.Count - 1
                      
                            resb.Append("{")
                            resb.Append("""PLACA"" :" & """" & dt.Rows(i)("PLACA") & """,")
                            resb.Append("""CARROCERIA"" :" & """" & dt.Rows(i)("CARROCERIA") & """,")
                            resb.Append("""UNIDAD"" :" & """" & dt.Rows(i)("UNIDAD") & """,")
                            resb.Append("""CODIGO_VIN"" :" & """" & dt.Rows(i)("CODIGO_VIN") & """,")
                            resb.Append("""NRO_TARJETA"" :" & """" & dt.Rows(i)("NRO_TARJETA") & """,")
                            resb.Append("""FECHA_INI"" :" & """" & dt.Rows(i)("FECHA_INI") & """")
                            resb.Append("}")
                            If i <> dt.Rows.Count - 1 Then
                                resb.Append(",")
                            End If
                        Next
                        resb.Append("]")
                        res = resb.ToString()
                    Else : res = "error"
                    End If
                  

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