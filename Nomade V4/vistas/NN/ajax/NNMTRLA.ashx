<%@ WebHandler Language="VB" Class="NNMTRLA" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NNMTRLA : Implements IHttpHandler
    Dim OPCION As String
    Dim p_GRUP_DESC, p_DEPEND_CODE, p_ESTADO_IND, p_USUA_ID, p_GRUP_CODE, p_TIPO As String

    Dim dt As DataTable
    
    
    Dim res As String
    Dim resb As New StringBuilder
    
    
    
    
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")

        p_ESTADO_IND = context.Request("p_ESTADO_IND")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_GRUP_DESC = context.Request("p_GRUP_DESC")
        p_DEPEND_CODE = context.Request("p_DEPEND_CODE")
        p_GRUP_CODE = context.Request("p_GRUP_CODE")
        p_TIPO = context.Request("p_TIPO")

       

        Select Case OPCION
                
            Case "1" ' lista GRUPO / SUBGRUPOS
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
                dt = NNPlanilla.Listar_Grupo_Tributos_Laborales(IIf(p_GRUP_CODE = Nothing, "", p_GRUP_CODE), p_TIPO, IIf(p_ESTADO_IND = Nothing, "", p_ESTADO_IND))
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"":" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""DESCRIPCION"":" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                        resb.Append("""ESTADO"":" & """" & MiDataRow("ESTADO").ToString & """,")
                        resb.Append("""TIPO"":" & """" & MiDataRow("TIPO").ToString & """,")
                        resb.Append("""NESTADO"":" & """" & MiDataRow("NESTADO").ToString & """")
                       
                        
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                        
                End If
                res = resb.ToString()
                    
           
            Case "NG" 'CREA CONCEPTO PLANILLA
                context.Response.ContentType = "text/html"
                res = Crear_Grupo_sGrupo(p_GRUP_DESC, p_DEPEND_CODE, p_ESTADO_IND, p_USUA_ID)
            Case "AT" 'ACTUALIZA CONCEPTO PLANILLA
                context.Response.ContentType = "text/html"
                res = Actualizar_Grupo_sGrupo(p_GRUP_CODE, p_GRUP_DESC, p_ESTADO_IND, p_USUA_ID)
            Case Else
        End Select
        context.Response.Write(res)
    End Sub
    
    
    
    
    
    Public Function Crear_Grupo_sGrupo(ByVal p_GRUP_DESC As String, ByVal p_DEPEND_CODE As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String) As String
       
        Dim Datos(1) As String
        Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
        Datos = NNPlanilla.Crear_Grupo_Tributos_Laborales(p_GRUP_DESC, p_DEPEND_CODE, p_ESTADO_IND, p_USUA_ID)
        NNPlanilla = Nothing
        Return Datos(0)
    
    End Function
    
    Public Function Actualizar_Grupo_sGrupo(ByVal p_CODE As String, ByVal p_DESC As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String) As String
       
        Dim Datos(1) As String
        Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
        Datos = NNPlanilla.Actualizar_Grupo_Tributos_Laborales(p_CODE, p_DESC, p_ESTADO_IND, p_USUA_ID)
        NNPlanilla = Nothing
        Return Datos(0)
    
    End Function
    
    
    
    
    
    
    
    
    
    
    
    
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class