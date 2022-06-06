<%@ WebHandler Language="VB" Class="NSLUPGS" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NSLUPGS : Implements IHttpHandler
    
    Dim p_ctlg_code, p_scsl_code, p_fdel, p_fal As String
    Dim res As String
    Dim resb As New StringBuilder
    Dim dt As DataTable
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        Dim fecha_del, fecha_al As String
        p_ctlg_code = context.Request("p_CTLG_CODE")
        p_scsl_code = context.Request("p_SCSL_CODE")
        p_fdel = context.Request("p_FDEL")
        p_fal = context.Request("p_FAL")
        
        context.Response.ContentType = "application/json; charset=utf-8"
        fecha_del = Utilities.fechaLocal(p_fdel)
        fecha_al = Utilities.fechaLocal(p_fal)
        dt = New Nomade.CP.CPModuloGasto("Bn").ListarUsuariosPorGatos(p_ctlg_code, p_scsl_code, fecha_del, fecha_al)
        
        If Not (dt Is Nothing) Then
            resb.Append("[")
            For Each row As DataRow In dt.Rows
                resb.Append("{")
                resb.Append("""BENEFICIARIO"":""" & row("BENEFICIARIO").ToString & """,")
                resb.Append("""GLOSA"":""" & row("GLOSA").ToString & """,")
                resb.Append("""USER_SOLIC"":""" & row("USER_SOLIC").ToString & """,")
                resb.Append("""FECHA_SOLIC"":""" & row("FECHA_SOLIC").ToString & """,")
                resb.Append("""USER_APR"":""" & row("USER_APR").ToString & """,")
                resb.Append("""FECHA_APR"":""" & row("FECHA_APR").ToString & """,")
                resb.Append("""USER_PAGO"":""" & row("USER_PAGO").ToString & """,")
                resb.Append("""FECHA_PAGP"":""" & row("FECHA_PAGP").ToString & """,")
                resb.Append("""MONTO"":""" & row("MONTO").ToString & """")
                resb.Append("},")
            Next
            resb.Append("{}")
            resb = resb.Replace(",{}", String.Empty)
            resb.Append("]")
        End If
        res = resb.ToString()
        context.Response.Write(res)
    End Sub
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class