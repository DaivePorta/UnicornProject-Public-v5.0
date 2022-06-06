<%@ WebHandler Language="VB" Class="CALPOSG" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CALPOSG : Implements IHttpHandler
    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    
    
    Dim OPCION As String
    Dim USUA_ID As String
    '----------------
    Dim p_CTLG_CODE, p_MONE_CODE, p_TIPO, p_SUBTIPO, p_FILTRO1 As String

    '----------------
    Dim caMovimientos As New Nomade.CA.CAMovimientos("Bn")
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        OPCION = context.Request("OPCION")
        USUA_ID = vChar(context.Request("USUA_ID"))
        'MOTIVO DE ANULACION
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_MONE_CODE = context.Request("p_MONE_CODE")
        p_TIPO = context.Request("p_TIPO")
        p_SUBTIPO = context.Request("p_SUBTIPO")
        p_FILTRO1 = context.Request("p_FILTRO1")
         
        Try
        
            Select Case OPCION
                Case "1" 'LISTAR REPORTE DE POSICION GLOBAL
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = caMovimientos.ResumenPosicionGlobal(p_CTLG_CODE, p_MONE_CODE, p_TIPO, p_SUBTIPO, p_FILTRO1)
                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                Case Else
            End Select
            context.Response.Write(res)
            
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
        
    End Sub
 
    Public Function vChar(ByVal campo As String) As String
        Dim res As String
        If campo IsNot Nothing Then
            res = campo.Trim().Replace("""", "'").Replace("\", " ")
            res = res.Replace(vbCrLf, "\n")
            res = res.ToString().Replace(vbLf, "\n").Replace("""", "\""")
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