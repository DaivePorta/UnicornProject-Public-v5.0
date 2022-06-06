<%@ WebHandler Language="VB" Class="NNMPAFP" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NNMPAFP : Implements IHttpHandler
    
    Dim OPCION As String
    Dim p_PLANILLA_CODE, p_USUA_ID, p_CTLG_CODE, p_CODIGO, p_MES, p_ANIO, p_ESTADO_IND, p_COD_AFP_SUNAT As String
  
  
   
    
    Dim dt As DataTable
    Dim res As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
           
        p_CODIGO = context.Request("p_CODIGO")
        p_PLANILLA_CODE = context.Request("p_PLANILLA_CODE")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        
        p_MES = context.Request("p_MES")
        p_ANIO = context.Request("p_ANIO")
        p_ESTADO_IND = context.Request("p_ESTADO_IND")
        p_COD_AFP_SUNAT = context.Request("p_COD_AFP_SUNAT")
        
        Select Case OPCION
                
         
            Case "1"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = Crear_Planilla_Afp(p_PLANILLA_CODE, p_USUA_ID)
               
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""NRO_EMPLEADOS"" :" & """" & MiDataRow("NRO_EMPLEADOS").ToString & """,")
                            resb.Append("""AFP_DESC"" :" & """" & MiDataRow("AFP_DESC").ToString & """,")
                            resb.Append("""TOTAL_APORTACION"" :" & """" & MiDataRow("TOTAL_APORTACION").ToString & """,")
                            resb.Append("""TOTAL_RETENCION"" :" & """" & MiDataRow("TOTAL_RETENCION").ToString & """")

                       
                      
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
      
            Case "2"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
                    dt = NNPlanilla.Lista_Planillas_Afp_Generadas(IIf(p_CTLG_CODE = "T", "", p_CTLG_CODE))
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""COD_PLANILLA"" :" & """" & MiDataRow("COD_PLANILLA").ToString & """,")
                            resb.Append("""DESC_CTLG"" :" & """" & MiDataRow("DESC_CTLG").ToString & """,")
                            resb.Append("""DESC_PLANILLA"" :" & """" & MiDataRow("DESC_PLANILLA").ToString & """,")
                            resb.Append("""NUM_AFP"" :" & """" & MiDataRow("NUM_AFP").ToString & """,")
                            resb.Append("""NUM_EMP"" :" & """" & MiDataRow("NUM_EMP").ToString & """,")
                            resb.Append("""FECHA_GENERACION"" :" & """" & MiDataRow("FECHA_GENERACION").ToString & """,")
                            resb.Append("""USUA_GENERO"" :" & """" & MiDataRow("USUA_GENERO").ToString & """")
         

                       
                      
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                res = resb.ToString()
            Case "3"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
                dt = NNPlanilla.Lista_Cabecera_planillas_afp(IIf(p_CTLG_CODE = Nothing, "", p_CTLG_CODE),
                                                             IIf(p_ANIO = Nothing, "", p_ANIO),
                                                             IIf(p_MES = Nothing, "", p_MES),
                                                             IIf(p_ESTADO_IND = Nothing, "", p_ESTADO_IND),
                                                             IIf(p_COD_AFP_SUNAT = Nothing, "", p_COD_AFP_SUNAT),
                                                             IIf(p_PLANILLA_CODE = Nothing, "", p_PLANILLA_CODE),
                                                              IIf(p_CODIGO = Nothing, "", p_CODIGO))
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""COD_PLANILLA"" :" & """" & MiDataRow("COD_PLANILLA").ToString & """,")
                        resb.Append("""DESC_AFP"" :" & """" & MiDataRow("DESC_AFP").ToString & """,")
                        resb.Append("""NRO_PLANILLA"" :" & """" & MiDataRow("NRO_PLANILLA").ToString & """,")
                        resb.Append("""NRO_EMPLEADOS"" :" & """" & MiDataRow("NRO_EMPLEADOS").ToString & """,")
                        resb.Append("""TOTAL_FONDO"" :" & """" & MiDataRow("TOTAL_FONDO").ToString & """,")
                        resb.Append("""TOTAL_RETENCION"" :" & """" & MiDataRow("TOTAL_RETENCION").ToString & """,")
                        resb.Append("""NESTADO"" :" & """" & MiDataRow("NESTADO").ToString & """,")
                        resb.Append("""RHPAFPC_ESTADO"" :" & """" & MiDataRow("RHPAFPC_ESTADO").ToString & """,")
                        resb.Append("""FECHA_GENERACION"" :" & """" & MiDataRow("FECHA_GENERACION").ToString & """,")
                        resb.Append("""FECHA_PRESENTACION"" :" & """" & MiDataRow("FECHA_PRESENTACION").ToString & """,")
                        resb.Append("""USUA_GENERO"" :" & """" & MiDataRow("USUA_GENERO").ToString & """,")
                        resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                        resb.Append("""DESC_CTLG"" :" & """" & MiDataRow("DESC_CTLG").ToString & """,")
                        resb.Append("""PERIODO_DEVENGUE"" :" & """" & MiDataRow("PERIODO_DEVENGUE").ToString & """,")
                        resb.Append("""DESC_PLANILLA"" :" & """" & MiDataRow("DESC_PLANILLA").ToString & """,")
                        resb.Append("""IMAGEN"" :" & """" & MiDataRow("IMAGEN").ToString & """,")
                        resb.Append("""USUA_PRESENTO"" :" & """" & MiDataRow("USUA_PRESENTO").ToString & """")
         

                       
                      
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case Else
        End Select
        context.Response.Write(res)
    End Sub
 
    
    
    
    
    Public Function Crear_Planilla_Afp(p_PLANILLA_CODE As String, p_USUA_ID As String) As DataTable
       
        Dim dt As New DataTable
        Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
        
        Try
            dt = NNPlanilla.Generar_Planilla_Afp(p_PLANILLA_CODE, p_USUA_ID)
            NNPlanilla = Nothing
        Catch ex As Exception
            
        End Try
     
        Return dt
        
    
        
    
    End Function
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class