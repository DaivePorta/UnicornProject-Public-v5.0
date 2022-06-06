<%@ WebHandler Language="VB" Class="NVLRANK" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NVLRANK : Implements IHttpHandler
    
    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array
        
    Dim OPCION As String
    Dim USUA_ID As String
    '----------------
    Dim p_SCSL_CODE, p_CTLG_CODE As String
    Dim p_DESDE, p_HASTA, p_MONE_CODE, p_VENDEDOR As String
    
    Dim nvVenta As New Nomade.NV.NVVenta("Bn")
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        USUA_ID = vChar(context.Request("USUA_ID"))
        '---
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_DESDE = context.Request("p_DESDE")
        p_HASTA = context.Request("p_HASTA")
        p_MONE_CODE = context.Request("p_MONE_CODE")
        p_VENDEDOR = context.Request("p_VENDEDOR")
        If p_VENDEDOR = "null" Or p_VENDEDOR = "TODOS" Or p_VENDEDOR Is Nothing Then
            p_VENDEDOR = ""
        End If
        
        Try
            Select Case OPCION
            
                Case "3" ' Obtiene tabla con documentos de venta, NO lista anulados
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ListarRankingClientes(p_CTLG_CODE, p_SCSL_CODE, p_MONE_CODE, p_VENDEDOR, Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA))
                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt) 'GenerarTablaDocumento(dt)
                    Else
                        res = "[]"
                    End If
                                                                
            End Select
            context.Response.Write(res)
            
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub
 
       
    ''' <summary>
    ''' Elimina espacion vacios (trim), cambia (") por ('), reemplaza (/) por vacio
    ''' </summary>
    ''' <param name="campo"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function vChar(ByVal campo As String) As String
        Dim res As String
        If campo IsNot Nothing Then
            res = campo.Trim().Replace("""", "'").Replace("\", " ")
            res = res.Replace(vbCrLf, "\n")
        Else
            res = campo
        End If
        Return res
    End Function
        
   
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class