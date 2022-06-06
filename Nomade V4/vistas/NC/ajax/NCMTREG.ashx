<%@ WebHandler Language="VB" Class="NCMTREG" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMTREG : Implements IHttpHandler
    Dim OPCION As String
    Dim SUNAT, NOMBRE, ESTADO_IND, USUA_ID, CODE, TIPO,EXO_IGV_IND As String
    
    Dim dt As DataTable
    Dim NCTipoRegimen As New Nomade.NC.NCTipoRegimen("Bn")
    
    Dim res As String
    Dim resb As New StringBuilder
    
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        
        CODE = context.Request("CODE")
        SUNAT = context.Request("SUNAT")
        NOMBRE = context.Request("DESC")
        ESTADO_IND = context.Request("ESTADO_IND")
        USUA_ID = context.Request("USUA_ID")
        TIPO = context.Request("TIPO")
        EXO_IGV_IND = context.Request("EXO_IGV_IND")

        Select Case OPCION
                
            Case "L" ' lista el tipo de regimen
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = NCTipoRegimen.Listar_Tipo_Regimen(IIf(CODE = Nothing , "", CODE), IIf(SUNAT = Nothing , "", SUNAT), IIf(ESTADO_IND = Nothing , "", ESTADO_IND))
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"":" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""CODIGO_SUNAT"":" & """" & MiDataRow("CODIGO_SUNAT").ToString & """,")
                        resb.Append("""NOMBRE"":" & """" & MiDataRow("NOMBRE").ToString & """,")
                        resb.Append("""EXO_IGV_IND"":" & """" & MiDataRow("EXO_IGV_IND").ToString & """,")
                        resb.Append("""ESTADO_IND"":" & """" & MiDataRow("ESTADO_IND").ToString & """")
                        
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                        
                End If
                res = resb.ToString()
                    
           
            Case "CR" 'CREA TIPO REGIMEN
                context.Response.ContentType = "text/html"
                res = Crear_Tipo_Regimen(SUNAT, NOMBRE, ESTADO_IND, USUA_ID, EXO_IGV_IND)
            Case "AT" 'ACTUALIZA TIPO REGIMEN
                context.Response.ContentType = "text/html"
                res = Actualizar_Tipo_Regimen(CODE, SUNAT, NOMBRE, ESTADO_IND, USUA_ID, TIPO, EXO_IGV_IND)
            Case Else
        End Select
        context.Response.Write(res)
            

        
    End Sub
 
    Public Function Crear_Tipo_Regimen(ByVal p_SUNAT As String, ByVal p_NOMBRE As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String, ByVal p_EXO_IGV_IND As String) As String
       
        Dim Datos(1) As String
        Datos = NCTipoRegimen.Crear_Tipo_Regimen(p_SUNAT, p_NOMBRE, p_ESTADO_IND, p_USUA_ID, p_EXO_IGV_IND)
        Return Datos(0)
    
    End Function
    Public Function Actualizar_Tipo_Regimen(ByVal p_CODE As String, ByVal p_SUNAT As String, ByVal p_NOMBRE As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String, ByVal p_TIPO As String, ByVal p_EXO_IGV_IND As String) As String
    
        Dim Datos(1) As String
        Datos = NCTipoRegimen.Actualizar_Tipo_Regimen(p_CODE, p_SUNAT, p_NOMBRE, p_ESTADO_IND, p_USUA_ID, p_TIPO, p_EXO_IGV_IND)
        Return IIf(Datos(0).Equals(""), Datos(1), Datos(0))
        
    End Function

 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class