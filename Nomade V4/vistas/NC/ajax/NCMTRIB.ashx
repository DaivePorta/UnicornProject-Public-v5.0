<%@ WebHandler Language="VB" Class="NCMTRIB" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMTRIB : Implements IHttpHandler
    Dim OPCION As String
    Dim p_COD_TRIBUTO_ASOC, p_TIPO, p_COD_TRIBUTO, p_CODIGO, p_ESTADO_IND, p_DESCRIPCION, P_TIPO_TRIBUTO, p_USUA_ID As String
    Dim P_ABREVIATURA, P_DIA_VENC, P_PORCENTAJE As String
    Dim dt As DataTable
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")
        
        p_COD_TRIBUTO = context.Request("p_COD_TRIBUTO")
        p_COD_TRIBUTO_ASOC = context.Request("p_COD_TRIBUTO_ASOC")
        p_DESCRIPCION = context.Request("p_DESCRIPCION")
        p_ESTADO_IND = context.Request("p_ESTADO_IND")
        P_TIPO_TRIBUTO = context.Request("P_TIPO_TRIBUTO")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_CODIGO = context.Request("p_CODIGO")
        p_TIPO = context.Request("p_TIPO")
        P_ABREVIATURA = context.Request("P_ABREVIATURA")
        P_DIA_VENC = context.Request("P_DIA_VENC")
        P_PORCENTAJE = context.Request("P_PORCENTAJE")
      
        Dim res As String = ""
        Dim resb As New StringBuilder
        
        Select Case OPCION
                
            Case "1"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = New Nomade.NC.NCEquivalenciaPlanCuentas("Bn").Listar_Tributos(IIf(P_TIPO_TRIBUTO = "T", "", P_TIPO_TRIBUTO), IIf(p_ESTADO_IND = "T", "", p_ESTADO_IND), IIf(p_CODIGO = Nothing, "", p_CODIGO))
                If Not dt Is Nothing Then
                    res = Utilities.Datatable2Json(dt)
                Else
                    res = "[]"
                End If
               
            Case "2"
                context.Response.ContentType = "text/html"
                res = Crea_Tributos(p_COD_TRIBUTO,
                                   p_COD_TRIBUTO_ASOC,
                                   p_DESCRIPCION,
                                   p_ESTADO_IND,
                                   P_TIPO_TRIBUTO, p_USUA_ID, P_ABREVIATURA, P_DIA_VENC, P_PORCENTAJE)
            Case "3"
                context.Response.ContentType = "text/html"
                res = Actualiza_Tributos(p_CODIGO, p_COD_TRIBUTO,
                                   p_COD_TRIBUTO_ASOC,
                                   p_DESCRIPCION,
                                   p_ESTADO_IND,
                                   P_TIPO_TRIBUTO, p_USUA_ID, p_TIPO, P_ABREVIATURA, P_DIA_VENC, P_PORCENTAJE)
           
            Case Else
        End Select
        context.Response.Write(res)
    End Sub
 
    
    Public Function Crea_Tributos(p_COD_TRIBUTO As String,
                                   p_COD_TRIBUTO_ASOC As String,
                                   p_DESCRIPCION As String,
                                   p_ESTADO_IND As String,
                                   P_TIPO_TRIBUTO As String, p_USUA_ID As String,
                                   P_ABREVIATURA As String, P_DIA_VENC As String, P_PORCENTAJE As String) As String
    
        Dim msg As String
        Try
            Dim NCEquivalenciaPlanCuentas As New Nomade.NC.NCEquivalenciaPlanCuentas("Bn")
            msg = NCEquivalenciaPlanCuentas.Crear_Tributos(p_COD_TRIBUTO,
                                                      IIf(p_COD_TRIBUTO_ASOC = "", Nothing, p_COD_TRIBUTO_ASOC),
                                                       p_DESCRIPCION,
                                                       p_ESTADO_IND,
                                                       P_TIPO_TRIBUTO, p_USUA_ID, P_ABREVIATURA, P_DIA_VENC, P_PORCENTAJE)
            NCEquivalenciaPlanCuentas = Nothing
           
        Catch ex As Exception
            msg = "Error"
        End Try
       
        Return msg
        
    End Function
    
    
    Public Function Actualiza_Tributos(p_CODIGO As String,
                                      p_COD_TRIBUTO As String,
                                   p_COD_TRIBUTO_ASOC As String,
                                   p_DESCRIPCION As String,
                                   p_ESTADO_IND As String,
                                   P_TIPO_TRIBUTO As String, p_USUA_ID As String, p_TIPO As String,
                                   P_ABREVIATURA As String, P_DIA_VENC As String, P_PORCENTAJE As String) As String
    
        Dim msg As String
        Try
            Dim NCEquivalenciaPlanCuentas As New Nomade.NC.NCEquivalenciaPlanCuentas("Bn")
            msg = NCEquivalenciaPlanCuentas.Actualizar_Tributos(p_CODIGO, p_COD_TRIBUTO,
                                                      IIf(p_COD_TRIBUTO_ASOC = "", Nothing, p_COD_TRIBUTO_ASOC),
                                                       p_DESCRIPCION,
                                                       p_ESTADO_IND,
                                                       P_TIPO_TRIBUTO, p_USUA_ID, p_TIPO, P_ABREVIATURA, P_DIA_VENC, P_PORCENTAJE)
            NCEquivalenciaPlanCuentas = Nothing
           
        Catch ex As Exception
            msg = "Error"
        End Try
       
        Return msg
        
    End Function
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class