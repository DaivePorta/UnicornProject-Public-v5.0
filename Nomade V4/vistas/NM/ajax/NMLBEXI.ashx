<%@ WebHandler Language="VB" Class="NMLBEXI" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NMLBEXI : Implements IHttpHandler
    
    Dim OPCION As String
    Dim p_NUM_SERIE, p_CTLG_CODE, p_PROD_CODE, p_GRUP_CODE, p_SUBGRUP_CODE As String

    
    
    Dim res As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        p_NUM_SERIE = context.Request("p_NUM_SERIE")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_PROD_CODE = context.Request("p_PROD_CODE")
        p_GRUP_CODE = context.Request("p_GRUP_CODE")
        p_SUBGRUP_CODE = context.Request("p_SUBGRUP_CODE")
        

        Select Case OPCION
                
            Case "1" ' 
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim dt As New DataTable
                dt = New Nomade.NM.NMGestionProductos("Bn").Seguimiento_existencias_con_serie(p_NUM_SERIE, p_CTLG_CODE)
                If Not (dt Is Nothing) Then
                    
                    res = Utilities.Datatable2Json(dt)
                Else
                    res = "[]"
                End If
              
            Case "2" 'Listar Productos Venta Web SOLO SERIADOS
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim NMGestionProductos As New Nomade.NM.NMGestionProductos("Bn")
                Dim dt As New DataTable
                Dim dt_filtrado As New DataTable
                dt = NMGestionProductos.ListarProductosVistas(p_CTLG_CODE, IIf(p_GRUP_CODE = Nothing, "", p_GRUP_CODE), IIf(p_SUBGRUP_CODE = Nothing, "", p_SUBGRUP_CODE))
                If Not (dt Is Nothing) Then
                    dt_filtrado = dt.DefaultView.ToTable(True, "CODIGO", "NOMBRE_COMERCIAL")
                    res = Utilities.Datatable2Json(dt_filtrado)
                Else
                    res = "[]"
                End If
               
            Case "3" ' 
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim dt As New DataTable
                dt = New Nomade.NM.NMGestionProductos("Bn").Lista_series_producto(p_PROD_CODE, p_CTLG_CODE)
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