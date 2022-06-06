<%@ WebHandler Language="VB" Class="DSMZONA" %>

Imports System
Imports System.Web
Imports System.Data

Public Class DSMZONA : Implements IHttpHandler
    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    
    Dim p_CODIGO_AUX, p_CTLG_CODE, p_SCSL_CODE,
        p_NOMBRE, p_DESC, p_PIDM_VEND, p_ESTADO_IND,
        p_USUA_ID, p_CODE, p_TIPO_IND, OPCION As String

    Dim dsZonaDistribucion As New Nomade.DS.DSZonasDistribucion("Bn")
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        OPCION = context.Request("OPCION")
        p_CODIGO_AUX = context.Request("p_CODIGO_AUX")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        p_NOMBRE = vChar(context.Request("p_NOMBRE"))
        p_DESC = vChar(context.Request("p_DESC"))
        p_PIDM_VEND = vChar(context.Request("p_PIDM_VEND"))
        p_ESTADO_IND = context.Request("p_ESTADO_IND")
        p_USUA_ID = vChar(context.Request("p_USUA_ID"))
        p_CODE = context.Request("p_CODE")
        p_TIPO_IND = IIf(context.Request("p_TIPO_IND") Is Nothing, "1", context.Request("p_TIPO_IND"))
        
        
        Try
        
            Select Case OPCION
                Case "1" 'REGISTRAR
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim listaresp As New List(Of String)
                    listaresp = dsZonaDistribucion.crearZonasDistribucion(p_CODIGO_AUX, p_CTLG_CODE, p_SCSL_CODE, p_NOMBRE,
                                                                          p_DESC, p_PIDM_VEND, p_ESTADO_IND, p_USUA_ID)
                    
                    resb.Append("[{")
                    resb.Append("""CODIGO"" :" & """" & listaresp(0) & """,")
                    resb.Append("""RESPUESTA"" :" & """" & listaresp(1) & """")
                    resb.Append("}]")
                    res = resb.ToString()
                    
                Case "2" 'ACTUALIZAR
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim listaresp As New List(Of String)
                    listaresp = dsZonaDistribucion.actualizarZonasDistribucion(p_CODE, p_CODIGO_AUX, p_CTLG_CODE, p_SCSL_CODE,
                                                                               p_NOMBRE, p_DESC, p_PIDM_VEND, p_ESTADO_IND, p_USUA_ID)
                    resb.Append("[{")
                    resb.Append("""CODIGO"" :" & """" & listaresp(0) & """,")
                    resb.Append("""RESPUESTA"" :" & """" & listaresp(1) & """")
                    resb.Append("}]")
                    res = resb.ToString()
                    
                Case "3" 'LISTAR
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = dsZonaDistribucion.listarZonasDistribucion(p_CODE, p_CODIGO_AUX, p_CTLG_CODE, p_SCSL_CODE, p_ESTADO_IND,
                                                                    p_PIDM_VEND, p_TIPO_IND)
                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                Case "4" 'VENDEDORES PARA DISTRIBUCIÓN
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = dsZonaDistribucion.listarVendedoresDistribucion(p_CTLG_CODE, p_SCSL_CODE, p_PIDM_VEND, p_TIPO_IND)
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