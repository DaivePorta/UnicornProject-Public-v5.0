<%@ WebHandler Language="VB" Class="NCMTCBA" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMTCBA : Implements IHttpHandler
    
    Dim code As String
    Dim opcion As String
    Dim codigo, descripcion, estado, usuario As String
    Dim dt As DataTable
    Dim p As New Nomade.NC.NCTipoCuentasBancarias("bn")
    Dim res As String
    Dim resb As New StringBuilder
    
        
      Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
      
        opcion = context.Request("opcion")
        code = context.Request("code")
        
        codigo = context.Request("codigo")
        descripcion = context.Request("descripcion")
        estado = context.Request("estado")
        usuario = context.Request("usuario")
        context.Response.ContentType = "text/html"
        
        
        Try
            Select Case opcion
                Case "1"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarTCBancarias(code, String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""code"":" & """" & MiDataRow("Codigo").ToString & """,")
                            resb.Append("""Descripcion"":" & """" & MiDataRow("Descripcion").ToString & """,")
                            resb.Append("""MONEDA"":" & """" & MiDataRow("MONEDA").ToString & """,")
                            resb.Append("""CHEQUERA_IND"":" & """" & MiDataRow("CHEQUERA_IND").ToString & """,")
                            resb.Append("""ESTADO_IND"":" & """" & MiDataRow("ESTADO_IND").ToString & """")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "2"
                    Dim MONEDA As String = context.Request("MONEDA")
                    Dim CHEQUERA As String = context.Request("CHEQUERA")
                    res = CrearTCB(descripcion, estado, usuario, MONEDA, CHEQUERA)
                
                Case "3"
                    Dim MONEDA As String = context.Request("MONEDA")
                    Dim CHEQUERA As String = context.Request("CHEQUERA")
                    res = ActualizarTCB(codigo, descripcion, estado, usuario, MONEDA, CHEQUERA)
                
                Case "4"
                    res = CambiarEstadoTCB(code)
                    
                Case "MONEDAS"
                    Dim CTLG = context.Request("CTLG_CODE")
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New NOMADE.GL.GLLetras("BN").ListarMoneda(CTLG)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"":" & """" & MiDataRow("DESCRIPCION").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case Else
                    
            End Select
            
            context.Response.Write(res)
            
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
            
        End Try
        
    End Sub
    Public Function CrearTCB(ByVal p_DESC As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String, ByVal p_MONEDA As String, ByVal p_CHEQUERA_IND As String) As String
       
        Dim Datos(1) As String
        Datos = p.CrearTCBancarias(p_DESC, p_ESTADO_IND, p_USUA_ID, p_MONEDA, p_CHEQUERA_IND)
        Return Datos(0)
    
    End Function
    
    Public Function ActualizarTCB(ByVal p_CODE As String, ByVal p_DESC As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String, ByVal p_MONEDA As String, ByVal p_CHEQUERA_IND As String) As String
       
        Dim Datos(1) As String
        Datos = p.ActualizarTCBancarias(p_CODE, p_DESC, p_ESTADO_IND, p_USUA_ID, p_MONEDA, p_CHEQUERA_IND)
        Return Datos(0)
    
    End Function
    
    Public Function CambiarEstadoTCB(ByVal p_CODE As String) As String
       
        Dim datos(1) As String
        
        datos = p.CambiarEstadoTCBancarias(p_CODE)
        
        Return datos(0)
     
    End Function
    
    
    
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class