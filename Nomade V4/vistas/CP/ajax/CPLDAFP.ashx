<%@ WebHandler Language="VB" Class="CPLDAFP" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CPLDAFP : Implements IHttpHandler
    
    Dim OPCION, p_CTLG_CODE, p_COD_AFP_SUNAT, p_PERIODO_FIN, p_PERIODO_INI As String
    Dim dt As DataTable
    Dim res As String
    Dim resb As New StringBuilder

    
 

    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        OPCION = context.Request("OPCION")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_COD_AFP_SUNAT = context.Request("p_COD_AFP_SUNAT")
        p_PERIODO_INI = context.Request("p_PERIODO_INI")
        p_PERIODO_FIN = context.Request("p_PERIODO_FIN")
        
        Try
        
            Select Case OPCION
                Case "0" 'lista deudas
                    
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim cpCuentaPorPagar As New Nomade.CP.CPCuentaPorPagar("Bn")
                    dt = cpCuentaPorPagar.Listar_Deudas_afp(IIf(p_CTLG_CODE = Nothing, "", p_CTLG_CODE),
                                                           IIf(p_COD_AFP_SUNAT = Nothing, "", p_COD_AFP_SUNAT),
                                                           p_PERIODO_INI,
                                                             p_PERIODO_FIN)
                    If Not (dt Is Nothing) Then
                        res = Utilities.Datatable2Json(dt)
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