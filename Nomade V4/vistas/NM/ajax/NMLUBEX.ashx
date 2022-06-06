<%@ WebHandler Language="VB" Class="NMLUBEX" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NMLUBEX : Implements IHttpHandler
    
    Dim OPCION As String
    Dim p_NUM_SERIE, p_CTLG_CODE, p_PROD_CODE, p_GRUP_CODE, p_SUBGRUP_CODE, p_PIDM As String

    
    
    Dim res As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        p_NUM_SERIE = context.Request("p_NUM_SERIE")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_PROD_CODE = context.Request("p_PROD_CODE")
        p_GRUP_CODE = context.Request("p_GRUP_CODE")
        p_SUBGRUP_CODE = context.Request("p_SUBGRUP_CODE")
        p_PIDM = context.Request("p_PIDM")

        Select Case OPCION
                
            Case "1" ' 
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim dt As New DataTable
                dt = New Nomade.NM.NMGestionProductos("Bn").Listar_ubicacion_productos(p_CTLG_CODE, p_GRUP_CODE, p_SUBGRUP_CODE, IIf(p_PROD_CODE = "", Nothing, p_PROD_CODE), IIf(p_PIDM = "", Nothing, p_PIDM))
                If Not (dt Is Nothing) Then
                    
                    res = Utilities.Datatable2Json(dt)
                Else
                    res = "[]"
                End If
              
          
            Case Else
        End Select
        context.Response.Write(res)
        
    End Sub
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class