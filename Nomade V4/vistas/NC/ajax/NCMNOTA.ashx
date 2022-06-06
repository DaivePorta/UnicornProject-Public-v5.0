<%@ WebHandler Language="VB" Class="NBMNOTA" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NBMNOTA : Implements IHttpHandler
    Dim res, flag, codigo As String
    Dim resb As New StringBuilder
    Dim dt As DataTable
    Dim usuario As String
    Dim pidm As String
    Dim p As New Nomade.NC.NCNotaria("BN")
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        flag = context.Request("flag")
        codigo = context.Request("codigo")
        usuario = context.Request("user")
        pidm = context.Request("pidm")
        
        Try
            
            Select Case flag
        
                Case "1" 'CREAR
                   
                    res = p.CrearNotaria(pidm, "A", usuario)
                
                Case "2" 'ELIMINAR
              
                    res = p.EliminarNotaria(codigo)
                    
                Case "3" 'LISTAR
                    
                    context.Response.ContentType = "application/json; charset=utf-8"
                  
                    dt = p.ListarNotaria(String.Empty, "A")

                    If Not dt Is Nothing Then
                        resb.Append("[")

                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            resb.Append("""PIDM"":""" & row("PIDM").ToString & """,")
                            resb.Append("""NOMBRE"":""" & row("NOMBRE").ToString & """,")
                            resb.Append("""DOCUMENTO"":""" & row("DOCUMENTO").ToString & """,")
                            resb.Append("""NUMERO"":""" & row("NUMERO").ToString & """,")
                            resb.Append("""TELEFONO"":""" & row("TELEFONO").ToString & """,")
                            resb.Append("""DIRECCION"":""" & row("DIRECCION").ToString & """,")
                            resb.Append("""EMAIL"":""" & row("EMAIL").ToString & """")
                            resb.Append("},")

                        Next
                        resb.Append("-")
                        resb.Replace("},-", "}")

                        resb.Append("]")
                        res = resb.ToString()
                    Else
                        res = ""
                    End If
                    

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