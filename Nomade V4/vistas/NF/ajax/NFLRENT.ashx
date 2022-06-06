<%@ WebHandler Language="VB" Class="NFLRENT" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO


Public Class NFLRENT : Implements IHttpHandler
    Dim res As String
    Dim resb As New StringBuilder
    Dim opcion As String
    Dim p As New Nomade.FI.FIIgv("BN")
    Dim dt As DataTable
    
    Dim pAnio As String
    Dim pMes As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        'context.Response.ContentType = "text/plain"
        'context.Response.Write("Hello World")
        
        opcion = context.Request("opcion")
        pAnio = context.Request("pAnio")
        pMes = context.Request("pMes")
        
        Try
            Select Case opcion
                Case "1"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.fListarRenta(pMes, pAnio)
                    
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""mes"" :" & """" & MiDataRow("mes").ToString & " " & MiDataRow("MesNom").ToString & """,")
                            resb.Append("""imp"" :" & """" & MiDataRow("imp").ToString & """,")
                            resb.Append("""Pag_Cue"" :" & """" & MiDataRow("Pag_Cue").ToString & """,")
                            resb.Append("""Metodo"" :" & """" & MiDataRow("Metodo").ToString & """,")
                            resb.Append("""fact"" :" & """" & MiDataRow("fact").ToString & """")
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
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class