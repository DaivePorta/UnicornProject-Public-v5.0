<%@ WebHandler Language="VB" Class="NNMCEPL" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NNMCEPL : Implements IHttpHandler
    
    Dim OPCION, p_CTLG_CODE, p_USUA_ID, p_MES, p_ANIO, p_TIPO As String
    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    

    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_TIPO = context.Request("p_TIPO")
        p_MES = context.Request("p_MES")
        p_ANIO = context.Request("p_ANIO")


        
        Try
        
            Select Case OPCION
                Case "0" 'lista planilla a cerrar
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
                    dt = NNPlanilla.Lista_Planillas_Cerradas(p_CTLG_CODE, "1")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("DESC_PLANILLA").ToString & """,")
                            resb.Append("""ANIO"" :" & """" & MiDataRow("ANIO").ToString & """,")
                            resb.Append("""MES"" :" & """" & MiDataRow("MES").ToString & """,")
                            resb.Append("""MES_NUM"" :" & """" & MiDataRow("MES_NUM").ToString & """,")
                           
                            resb.Append("""DESC_PLANILLA"" :" & """" & MiDataRow("DESC_PLANILLA").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "1"
                    context.Response.ContentType = "text/html"
                    res = Cerrar_Planilla(p_MES, p_CTLG_CODE, p_ANIO, p_USUA_ID)
                Case "2" 'lista planillas cerrdas
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
                    dt = NNPlanilla.Lista_Planillas_Cerradas(p_CTLG_CODE, IIf(p_TIPO = Nothing, "2", p_TIPO))
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""DESC_PLANILLA"" :" & """" & MiDataRow("DESC_PLANILLA").ToString & """,")
                            resb.Append("""ANIO"" :" & """" & MiDataRow("ANIO").ToString & """,")
                            resb.Append("""MES"" :" & """" & MiDataRow("MES").ToString & """,")
                            resb.Append("""USUA_ID"" :" & """" & MiDataRow("USUA_ID").ToString & """,")
                            resb.Append("""MES_NUM"" :" & """" & MiDataRow("MES_NUM").ToString & """,")
                            resb.Append("""CODIGO_PLANILLA"" :" & """" & MiDataRow("CODIGO_PLANILLA").ToString & """,")
                            resb.Append("""FECHA_ACTV"" :" & """" & MiDataRow("FECHA_ACTV").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
            End Select
            context.Response.Write(res)
            
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub
 
    
    
    
    
    Public Function Cerrar_Planilla(p_mes As String, p_ctlg As String, p_anio As String,
                                   p_usua_id As String) As String
    
        Dim msg As String
        Try
            Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
            msg = NNPlanilla.Cerrar_Planilla(p_ctlg, p_mes, p_anio, p_usua_id)
            NNPlanilla = Nothing
           
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