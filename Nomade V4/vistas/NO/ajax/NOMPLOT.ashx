<%@ WebHandler Language="VB" Class="NOMPLOT" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NOMPLOT : Implements IHttpHandler
    
    Dim flag, res, ctlg_code, scsl_code, num_cuenta, text_comp, tipo_camb, usua_id, p_TIPO_BIEN As String
    
    Dim c As New NOMADE.NC.NCCuenta("Bn")
    Dim p As New Nomade.CA.CompraRapida("Bn")
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        context.Response.ContentType = "text/html"
        
        flag = context.Request("flag")
        ctlg_code = context.Request("ctlg_code")
        scsl_code = context.Request("scsl_code")
        num_cuenta = context.Request("cod_cuenta")
        text_comp = context.Request("text_comp")
        tipo_camb = context.Request("tipo_camb")
        usua_id = context.Request("usua_id")
        p_TIPO_BIEN = context.Request("p_TIPO_BIEN")
        
        Try
            If (flag = "1") Then
                Dim dt As DataTable
                dt = c.Listar_cuentas(ctlg_code, num_cuenta, "")
                If Not dt Is Nothing Then
                    res = dt.Rows(0)("Descripcion").ToString()
                Else
                    res = ""
                End If
            ElseIf (flag = "2") Then
                res = p.CompraRapida(ctlg_code, scsl_code, tipo_camb, text_comp, usua_id, p_TIPO_BIEN)
            Else
                res = res = ""
            End If
            
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