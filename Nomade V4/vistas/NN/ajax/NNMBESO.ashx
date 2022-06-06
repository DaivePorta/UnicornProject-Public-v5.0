<%@ WebHandler Language="VB" Class="NNMBESO" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NNMBESO : Implements IHttpHandler
    
    Dim OPCION As String
    Dim p_ESTADO_IND, p_USUA_ID, p_DESCRIPCION, p_TIPO_UPDATE, p_CODE As String

    Dim dt As DataTable
    
    
    Dim res As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        

        p_ESTADO_IND = context.Request("p_ESTADO_IND")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_DESCRIPCION = context.Request("p_DESCRIPCION")
        p_TIPO_UPDATE = context.Request("p_TIPO_UPDATE")
        p_CODE = context.Request("p_CODE")
        
        
        Select Case OPCION
                
            Case "L" ' lista el tipo de regimen
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
                dt = NNPlanilla.Listar_Beneficios_sociales(IIf(p_CODE = Nothing, "", p_CODE), IIf(p_ESTADO_IND = Nothing, "", p_ESTADO_IND))
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"":" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""DESCRIPCION"":" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                        resb.Append("""ESTADO_IND"":" & """" & MiDataRow("ESTADO_IND").ToString & """,")
                        resb.Append("""ESTADO"":" & """" & MiDataRow("ESTADO").ToString & """")
                        
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                        
                End If
                res = resb.ToString()
                    
           
            Case "CR" 'CREA CONCEPTO PLANILLA
                context.Response.ContentType = "text/html"
                res = Crear_Bene_Sociales(p_DESCRIPCION, p_ESTADO_IND, p_USUA_ID)
            Case "AT" 'ACTUALIZA CONCEPTO PLANILLA
                context.Response.ContentType = "text/html"
                res = Actualizar_Bene_Sociales(p_CODE, p_ESTADO_IND, p_USUA_ID, p_DESCRIPCION, p_TIPO_UPDATE)
            Case Else
        End Select
        context.Response.Write(res)
        
        
        
    End Sub
 
    
    
    Public Function Crear_Bene_Sociales(ByVal p_DESCRIPCION As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String) As String
       
        Dim Datos(1) As String
        Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
        Datos = NNPlanilla.Crear_Beneficios_sociales(p_DESCRIPCION, p_ESTADO_IND, p_USUA_ID)
        NNPlanilla = Nothing
        Return Datos(0)
    
    End Function
    
    Public Function Actualizar_Bene_Sociales(ByVal p_CODE As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String, ByVal p_DESCRIPCION As String, ByVal p_TIPO_UPDATE As String) As String
    
        Dim Datos(1) As String
        Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
        Datos = NNPlanilla.Actualizar_Beneficios_sociales(p_CODE, p_ESTADO_IND, p_USUA_ID, p_DESCRIPCION, p_TIPO_UPDATE)
        NNPlanilla = Nothing
        Return IIf(Datos(0).Equals(""), Datos(1), Datos(0))
        
    End Function
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class