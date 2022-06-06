<%@ WebHandler Language="VB" Class="NCMTCON" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMTCON : Implements IHttpHandler
    Dim OPCION As String
    Dim CODE_TIPO_CONTRI As String
    Dim SUNAT, NOMBRE, ESTADO_IND, USUA_ID, TIPO, ACRO As String
    
    Dim dt As DataTable
    Dim t As New Nomade.NC.NCTipodeContribuyente("Bn")
    Dim res As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        OPCION = context.Request("OPCION")
        
        CODE_TIPO_CONTRI = context.Request("CODIGO")
        SUNAT = context.Request("SUNAT")
        NOMBRE = context.Request("NOMBRE")
        ESTADO_IND = context.Request("ESTADO_IND")
        USUA_ID = context.Request("USUA_ID")
        TIPO = context.Request("TIPO")
        ACRO = context.Request("ACRO")

        Select Case OPCION
                
            Case "CE"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = t.Listar_Tipo_Contribuyente(CODE_TIPO_CONTRI, String.Empty, String.Empty, String.Empty)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"":" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""CODIGO_SUNAT"":" & """" & MiDataRow("CODIGO_SUNAT").ToString & """,")
                        resb.Append("""NOMBRE"":" & """" & MiDataRow("NOMBRE").ToString & """,")
                        resb.Append("""ACRONIMO"":" & """" & MiDataRow("ACRONIMO").ToString & """,")
                        resb.Append("""TIPO_PERSONA"":" & """" & MiDataRow("TIPO_PERSONA").ToString & """,")
                        resb.Append("""ESTADO_IND"":" & """" & MiDataRow("ESTADO_IND").ToString & """")
                        
                        resb.Append("}")
                    Next
                    resb.Append("]")
                        
                End If
                res = resb.ToString()
                    
            Case "CT"
                context.Response.ContentType = "text/html"
                res = Cambiar_Tipo_Contribuyente(CODE_TIPO_CONTRI)
            Case "CR"
                context.Response.ContentType = "text/html"
                res = Crear_Tipo_Contribuyente(SUNAT, NOMBRE, ACRO, ESTADO_IND, TIPO, USUA_ID)
            Case "AT"
                context.Response.ContentType = "text/html"
                res = Actualizar_Tipo_Contribuyente(CODE_TIPO_CONTRI, SUNAT, NOMBRE, ACRO, ESTADO_IND, TIPO, USUA_ID)
            Case Else
        End Select
        context.Response.Write(res)
            

        
    End Sub
    Public Function Cambiar_Tipo_Contribuyente(ByVal p_CODE As String) As String
       
        Dim datos(1) As String
        
        datos = t.Cambiar_Tipo_Contribuyente(p_CODE)
        
        Return datos(0)
     
    End Function
    Public Function Crear_Tipo_Contribuyente(ByVal p_SUNAT As String, ByVal p_NOMBRE As String, ByVal p_ACRO As String, ByVal p_ESTADO_IND As String, ByVal p_TIPO As String, ByVal p_USUA_ID As String) As String
       
        Dim Datos(1) As String
        Datos = t.Crear_Tipo_Contribuyente(p_SUNAT, p_NOMBRE, p_ACRO, p_ESTADO_IND, p_TIPO, p_USUA_ID)
        Return Datos(0)
    
    End Function
    Public Function Actualizar_Tipo_Contribuyente(ByVal p_CODE As String, ByVal p_SUNAT As String, ByVal p_NOMBRE As String, ByVal p_ACRO As String, ByVal p_ESTADO_IND As String, ByVal p_TIPO As String, ByVal p_USUA_ID As String) As String
    
        Dim Datos(1) As String
        Datos = t.Actualizar_Tipo_Contribuyente(p_CODE, p_SUNAT, p_NOMBRE, p_ACRO, p_ESTADO_IND, p_TIPO, p_USUA_ID)
        Return Datos(0)
        
    End Function
    
    
    
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class