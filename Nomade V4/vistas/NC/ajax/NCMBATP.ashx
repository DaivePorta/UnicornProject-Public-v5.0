<%@ WebHandler Language="VB" Class="NCMBATP" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO


Public Class NCMBATP : Implements IHttpHandler
    
    Dim res As String
    Dim resb As New StringBuilder
    Dim p As New Nomade.NC.NCBatch("BN")
    Dim opcion As String
    Dim dt As DataTable
    Dim nombreproc As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        'context.Response.ContentType = "text/plain"
        'context.Response.Write("Hello World")
        
        opcion = context.Request("opcion")
        nombreproc = context.Request("nombreproc")
        Try
            
            Select Case opcion
                Case "1"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.fObtieneProcedure(nombreproc)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""NombreProcedure"" :" & """" & MiDataRow("NombreProcedure").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                        
                    End If
                    res = resb.ToString()
                    
                Case "2"
                    context.Response.ContentType = "text/plain"
                    res = p.EjecutaProc(nombreproc)
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