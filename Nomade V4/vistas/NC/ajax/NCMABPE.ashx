<%@ WebHandler Language="VB" Class="NCMABPE" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMABPE : Implements IHttpHandler
   
    Dim OPCION, p_anio, p_ctlg, p_mes, p_fec_reapertura, p_fec_declara, p_usua_id As String

    
    Dim dt As DataTable
    Dim NFPeriodo As New Nomade.NF.NFPeriodo("")
    
    Dim res As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        p_ctlg = context.Request("p_ctlg")
        p_anio = context.Request("p_anio")
        p_mes = context.Request("p_mes")
        p_fec_reapertura = context.Request("p_fec_reapertura")
        p_fec_declara = context.Request("p_fec_declara")
        p_usua_id = context.Request("p_usua_id")
        
        ' Utilities.fechaLocal('')
        Select Case OPCION
                
            Case "1" ' lista fecha declaracion
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = NFPeriodo.Listar_Periodo_Cerrados_para_reapertura(p_ctlg)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                      
                        resb.Append("""PERIODO_DESC"" :" & """" & MiDataRow("PERIODO_DESC").ToString & """,")
                        resb.Append("""COD"" :" & """" & MiDataRow("COD").ToString & """")
                    
                        
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                        
                End If
                res = resb.ToString()
            Case "2"
                context.Response.ContentType = "text/html"
                res = Reaperturar_Periodo(p_mes, p_ctlg, p_anio, p_fec_reapertura, p_usua_id)
        
            Case Else
        End Select
        context.Response.Write(res)
    End Sub
    
    
    
    
    
    Public Function Reaperturar_Periodo(p_mes As String, p_ctlg As String, p_anio As String,
                                p_fec_reapertura As String,
                                p_usua_id As String) As String
    
        Dim msg As String
        '  Try
        Dim NFPeriodo As New Nomade.NF.NFPeriodo("Bn")
        msg = NFPeriodo.Reaperturar_Periodo(p_mes, p_ctlg, p_anio,
                                                 Utilities.fechaLocal(p_fec_reapertura),
                                                   p_usua_id)
        NFPeriodo = Nothing
           
        '  Catch ex As Exception
        'msg = "Error"
       ' End Try
       
       
       
        Return msg
        
    End Function
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class