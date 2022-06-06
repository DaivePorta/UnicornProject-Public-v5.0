<%@ WebHandler Language="VB" Class="MPMCOEN" %>

Imports System
Imports System.Web
Imports System.Data

Public Class MPMCOEN : Implements IHttpHandler
    
    Dim OPCION As String
    
    Dim dt As New DataTable
    
    Dim res As String
    Dim sb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        
        Dim CODIGO, CTLG_CODE, SCSL_CODE, DESCRIPCION, UNME_CODE, VALOR, MONTO, ESTADO, USUA_ID As String
        
        CODIGO = context.Request("CODIGO")
        CTLG_CODE = context.Request("CTLG_CODE")
        SCSL_CODE = context.Request("SCSL_CODE")
        ESTADO = context.Request("ESTADO")
        
        Try
            Select Case OPCION
                Case "S"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.MP.MPConceptoEnergetico("BN").ListarConceptoEnergetico(CODIGO, CTLG_CODE, SCSL_CODE, ESTADO)
                    If Not dt Is Nothing Then
                        sb.Append("[")
                        For Each row As DataRow In dt.Rows
                            sb.Append("{")
                            sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            sb.Append("""CTLG_CODE"":""" & row("CTLG_CODE").ToString & """,")
                            sb.Append("""SCSL_CODE"":""" & row("SCSL_CODE").ToString & """,")
                            sb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                            sb.Append("""UNME_CODE"":""" & row("UNME_CODE").ToString & """,")
                            sb.Append("""UNIDAD_MEDIDA"":""" & row("UNIDAD_MEDIDA").ToString & """,")
                            sb.Append("""VALOR"":""" & row("VALOR").ToString & """,")
                            sb.Append("""MONTO"":""" & row("MONTO").ToString & """,")
                            sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                            sb.Append("},")
                        Next
                        sb.Append("{}")
                        sb.Replace(",{}", "")
                        sb.Append("]")
                    End If
                    res = sb.ToString()
                Case "G"
                    context.Response.ContentType = "text/plain"
                    DESCRIPCION = context.Request("DESCRIPCION").ToUpper
                    UNME_CODE = context.Request("UNME_CODE")
                    VALOR = context.Request("VALOR")
                    MONTO = context.Request("MONTO")
                    USUA_ID = context.Request("USUA_ID")
                    res = New Nomade.MP.MPConceptoEnergetico("BN").CrearConceptoEnergetico(CTLG_CODE, SCSL_CODE, DESCRIPCION, UNME_CODE, VALOR, MONTO, USUA_ID)
                Case "A"
                    context.Response.ContentType = "text/plain"
                    DESCRIPCION = context.Request("DESCRIPCION").ToUpper
                    UNME_CODE = context.Request("UNME_CODE")
                    VALOR = context.Request("VALOR")
                    MONTO = context.Request("MONTO")
                    ESTADO = context.Request("ESTADO")
                    USUA_ID = context.Request("USUA_ID")
                    res = New Nomade.MP.MPConceptoEnergetico("BN").ActualizarConceptoEnergetico(CODIGO, CTLG_CODE, SCSL_CODE, DESCRIPCION, UNME_CODE, VALOR, MONTO, ESTADO, USUA_ID)
                Case "AE"
                    context.Response.ContentType = "text/plain"
                    USUA_ID = context.Request("USUA_ID")
                    res = New Nomade.MP.MPConceptoEnergetico("BN").CambiarEstadoConceptoEnergetico(CODIGO, USUA_ID)
            End Select
            
            context.Response.Write(res)
        Catch ex As Exception
            Console.Error.Write(ex.Message)
        End Try
    End Sub
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class