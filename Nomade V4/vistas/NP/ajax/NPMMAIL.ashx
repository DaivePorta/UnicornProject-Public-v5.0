<%@ WebHandler Language="VB" Class="NPMMAIL" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NPMMAIL : Implements IHttpHandler
    
    Dim opcion As String
    Dim dt As DataTable
    Dim res As String
    Dim resb As New StringBuilder
    Dim p As New Nomade.MP.MPOrdenFabricacion("BN")
    Dim tipo, cargo, pidm, glosa, etapa, correo As String
    Dim codigo As String
    Dim sb As New StringBuilder()
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        'context.Response.ContentType = "text/plain"
        'context.Response.Write("Hello World")
        
        tipo = context.Request("tipo")
        cargo = context.Request("cargo")
        pidm = context.Request("pidm")
        glosa = context.Request("glosa")
        etapa = context.Request("etapa")
        correo = context.Request("correo")
        codigo = context.Request("codigo")
        
        opcion = context.Request("opcion")
        Try
            
            Select Case opcion
                
                Case "L"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.SEL_MailProduccion(codigo)
                    
                    If Not dt Is Nothing Then
                        sb.Append("[")

                        For Each row As DataRow In dt.Rows
                            sb.Append("{")
                            sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            sb.Append("""TIPO"":""" & row("TIPO").ToString & """,")
                            sb.Append("""NOMBRE_COND"":""" & row("NOMBRE_COND").ToString & """,")
                            sb.Append("""GLOSA"":""" & row("GLOSA").ToString & """,")
                            sb.Append("""CODIGO_COND"":""" & row("CODIGO_COND").ToString & """,")
                            sb.Append("""ETAPA"":""" & row("ETAPA").ToString & """")
           
                            sb.Append("},")

                        Next
                        sb.Append("-")
                        sb.Replace("},-", "}")

                        sb.Append("]")

                    End If

                    res = sb.ToString()
                
                Case "1"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarEtapasProduccion
                    
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        
                        For Each nrow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""codigo"" :" & """" & nrow("codigo").ToString & """,")
                            resb.Append("""descripcion"" :" & """" & nrow("descripcion").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "2"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarEmpleadosActivos
                    
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        
                        For Each nrow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PIDM"" :" & """" & nrow("PIDM").ToString & """,")
                            resb.Append("""NOMBRE_EMPLEADO"" :" & """" & nrow("NOMBRE_EMPLEADO").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "3"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarCargos
                    
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        
                        For Each nrow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & nrow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & nrow("DESCRIPCION").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "4"
                    context.Response.ContentType = "text/plain"
                    res = p.Ins_MailProduccion(tipo, cargo, pidm, glosa, etapa)
                    
                Case "5"
                    context.Response.ContentType = "text/plain"
                    res = p.MOD_MailProduccion(codigo, tipo, cargo, pidm, glosa, etapa)
                    
                    
            End Select
            
            context.Response.Write(res)
            
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
  
        End Try
 
            
    End Sub
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class