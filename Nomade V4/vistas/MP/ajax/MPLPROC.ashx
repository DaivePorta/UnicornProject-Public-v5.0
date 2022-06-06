<%@ WebHandler Language="VB" Class="MPLPROC" %>

Imports System
Imports System.Web
Imports System.Data

Public Class MPLPROC : Implements IHttpHandler
    
    Dim OPCION As String
    Dim dt As DataTable
    
    Dim CODIGO, CTLG_CODE, USUA_ID As String
    Dim PROCESO, DESCRIPCION, ESTADO As String
    
    Dim resb As New StringBuilder()
    Dim res As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        CODIGO = context.Request("CODIGO")
        CTLG_CODE = context.Request("CTLG_CODE")
        USUA_ID = context.Request("USUA_ID")
        
        Try
            Select Case OPCION
                Case "S"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.MP.MPProcesoProductivo("BN").ListarProcesoProductivo(CODIGO, CTLG_CODE, "")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                            resb.Append("""PROCESO"" :" & """" & MiDataRow("PROCESO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "G"
                    context.Response.ContentType = "text/plain"
                    PROCESO = context.Request("PROCESO")
                    DESCRIPCION = context.Request("DESCRIPCION")
                    res = New Nomade.MP.MPProcesoProductivo("BN").CrearProcesoProductivo(CTLG_CODE, PROCESO, DESCRIPCION, USUA_ID)
                Case "A"
                    context.Response.ContentType = "text/plain"
                    PROCESO = context.Request("PROCESO")
                    DESCRIPCION = context.Request("DESCRIPCION")
                    ESTADO = context.Request("ESTADO")
                    res = New Nomade.MP.MPProcesoProductivo("BN").ActualizarProcesoProductivo(CODIGO, PROCESO, DESCRIPCION, ESTADO, USUA_ID)
                Case "AE"
                    context.Response.ContentType = "text/plain"
                    res = New Nomade.MP.MPProcesoProductivo("BN").CambiarEstadoProcesoProductivo(CODIGO, USUA_ID)
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