<%@ WebHandler Language="VB" Class="NFMCOMB" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NFMCOMB : Implements IHttpHandler
    Dim flag As String
    Dim dt As DataTable
    Dim resb As New StringBuilder
    Dim res As String
    Dim comb As String
    Dim cmtc As String
    Dim acti As String
    Dim user As String
    Dim desc As String
    Dim codigo As String
    Dim p_ESTADO_IND As String
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        comb = context.Request("nomb")
        desc = context.Request("defi")
        cmtc = context.Request("cmtc")
        acti = context.Request("acti")
        user = context.Request("user")
        codigo = context.Request("codigo")
        flag = context.Request("flag")
        p_ESTADO_IND = context.Request("p_ESTADO_IND")
        Try
            
            Select Case flag.ToString
                
                Case "1"
                    Dim p As New NOMADE.NF.NFCombustibleUnidad("BN")
                    res = p.CrearCombustibleUnidad(comb, desc, cmtc, acti, user)
                    
                Case "2"
                    Dim p As New NOMADE.NF.NFCombustibleUnidad("BN")
                    res = p.ActualizarCombustibleUnidad(codigo, comb, desc, cmtc, acti, user)
               
                Case "3"
                    Dim p As New NOMADE.NF.NFCombustibleUnidad("BN")
                    res = p.CambiarEstadoCombustibleUnidad(codigo) 'cambiar estado Inactivo/Activo                                                      
                    
                Case "4"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New NOMADE.NF.NFCombustibleUnidad("BN")
                    dt = p.ListarCombustibleUnidad(codigo, String.Empty, String.Empty)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    resb.Append("""COMBUSTIBLE"" :" & """" & dt.Rows(0)("COMBUSTIBLE") & """,")
                    resb.Append("""MTC"" :" & """" & dt.Rows(0)("MTC") & """,")
                    resb.Append("""DESCRIPCION"" :" & """" & dt.Rows(0)("DESCRIPCION").ToString().Replace(vbCrLf, "\n").Replace("""", "\""") & """,")
                    resb.Append("""ACTIVO"" :" & """" & dt.Rows(0)("ESTADO") & """")
   
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                Case "LST"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New Nomade.NF.NFCombustibleUnidad("BN")
                    dt = p.ListarCombustibleUnidad(codigo, String.Empty, If(p_ESTADO_IND Is Nothing, "", p_ESTADO_IND))
                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
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