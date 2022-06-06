<%@ WebHandler Language="VB" Class="NCRINCO" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCRINCO : Implements IHttpHandler
    
    Dim OPCION, CAJA_CODE, DESDE, HASTA, TIPO As String
    Dim CTLG_CODE, SCSL_CODE, ESTADO, CAJERO As String
    
    Dim cajas As New Nomade.NC.NCCaja("BN")
    
    Dim dt As DataTable
    
    Dim res As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        OPCION = context.Request("OPCION")
        
        Select Case OPCION
            Case "0"
                CTLG_CODE = context.Request("CTLG_CODE")
                SCSL_CODE = context.Request("SCSL_CODE")
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = cajas.ListarCaja(" ", CTLG_CODE, SCSL_CODE, " ", "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & row("DESCRIPCION").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "10"
                CTLG_CODE = context.Request("CTLG_CODE")
                SCSL_CODE = context.Request("SCSL_CODE")
                CAJA_CODE = context.Request("CAJA_CODE")
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = cajas.ListarCajerosCaja(IIf(CAJA_CODE.Equals(""), String.Empty, CAJA_CODE), "", CTLG_CODE, SCSL_CODE, "SINREPETIR")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""USUARIO"" :" & """" & row("USUARIO").ToString & """,")
                        resb.Append("""CAJERO"" :" & """" & row("CAJERO").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                
                res = resb.ToString()
            Case "1"
                TIPO = context.Request("TIPO")
                CAJA_CODE = context.Request("CAJA_CODE")
                DESDE = context.Request("DESDE")
                HASTA = context.Request("HASTA")
                CAJERO = context.Request("CAJERO")
                CTLG_CODE = context.Request("CTLG_CODE")
                SCSL_CODE = context.Request("SCSL_CODE")
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = cajas.ReporteInconsistenciasCaja(TIPO, CAJA_CODE, DESDE, HASTA, CAJERO, CTLG_CODE, SCSL_CODE)
                resb.Append("[")
                If Not dt Is Nothing Then
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CAJA"" :" & """" & row("CAJA").ToString & """,")
                        resb.Append("""OCURRENCIA"" :" & """" & row("OCURRENCIA").ToString & """,")
                        resb.Append("""INC_SOLES"" :" & """" & row("INCS_SOLES").ToString & """,")
                        resb.Append("""SOLES"" :" & """" & row("SOLES").ToString & """,")
                        resb.Append("""INC_DOLARES"" :" & """" & row("INSC_DOLARES").ToString & """,")
                        resb.Append("""DOLARES"" :" & """" & row("DOLARES").ToString & """,")
                        'resb.Append("""FALTANTE"" :" & """" & row("FALTANTE").ToString & """,")
                        'resb.Append("""SOBRANTE"" :" & """" & row("SOBRANTE").ToString & """,")
                        resb.Append("""USUARIO"" :" & """" & row("USUARIO").ToString & """,")
                        resb.Append("""FECHA"" :" & """" & row("FECHA").ToString & """,")
                        resb.Append("""OBSERVACIONES"" :" & """" & row("OBSERVACIONES").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                End If
                resb.Append("]")
                res = resb.ToString()
        End Select
        context.Response.Write(res)
    End Sub
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class