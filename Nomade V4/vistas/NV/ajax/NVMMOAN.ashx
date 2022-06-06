<%@ WebHandler Language="VB" Class="NVMMOAN" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NVMMOAN : Implements IHttpHandler
    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    
    
    Dim OPCION As String
    Dim USUA_ID As String
    '----------------
    Dim p_CODE, p_CTLG_CODE As String
    '----------------   
    Dim p_MOTIVO As String
    Dim p_DESC_MOTIVO As String
    Dim p_TIPO_DCTO As String
    Dim p_ESTADO_IND As String
    '----------------
    Dim nvVenta As New Nomade.NV.NVVenta("Bn")
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        OPCION = context.Request("OPCION")
        USUA_ID = vChar(context.Request("USUA_ID"))
        'MOTIVO DE ANULACION        
        p_CODE = context.Request("p_CODE")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_MOTIVO = vChar(context.Request("p_MOTIVO"))
        p_DESC_MOTIVO = vChar(context.Request("p_DESC_MOTIVO"))
        p_TIPO_DCTO = context.Request("p_TIPO_DCTO")
        p_ESTADO_IND = context.Request("p_ESTADO_IND")
        
        Try
        
            Select Case OPCION
                Case "1" 'REGISTRAR MOTIVO ANULACION
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim array As Array
                    array = nvVenta.CrearMotivoAnulacion(p_CTLG_CODE, p_MOTIVO, p_DESC_MOTIVO,
                                           p_TIPO_DCTO, p_ESTADO_IND, USUA_ID)
                   
                    If Not (array Is Nothing) Then
                        resb.Append("[{")
                        resb.Append("""CODIGO"" :" & """" & array(0).ToString & """,")
                        resb.Append("""RESPUESTA"" :" & """" & array(1).ToString & """")
                        resb.Append("}]")
                    Else
                        resb.Append("[]")
                    End If
                    res = resb.ToString()
                Case "2" 'ACTUALIZAR MOTIVO ANULACION
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim array As Array
                    array = nvVenta.ActualizarMotivoAnulacion(p_CODE, p_CTLG_CODE, p_MOTIVO, p_DESC_MOTIVO,
                                           p_TIPO_DCTO, p_ESTADO_IND, USUA_ID)
                   
                    If Not (array Is Nothing) Then
                        resb.Append("[{")
                        resb.Append("""CODIGO"" :" & """" & array(0).ToString & """,")
                        resb.Append("""RESPUESTA"" :" & """" & array(1).ToString & """")
                        resb.Append("}]")
                    Else
                        resb.Append("[]")
                    End If
                    res = resb.ToString()
                Case "3" 'LISTAR MOTIVOS ANULACION
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ListarMotivoAnulacion(p_CODE, p_CTLG_CODE, p_TIPO_DCTO, p_ESTADO_IND)
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