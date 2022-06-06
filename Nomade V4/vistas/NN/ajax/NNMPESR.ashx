<%@ WebHandler Language="VB" Class="NNMPESR" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NNMPESR : Implements IHttpHandler
    Dim OPCION As String
    Dim p_CTLG_CODE, p_CODIGO, p_ESTADO, p_FECHA_INI, p_FECHA_FIN, p_GLOSA, p_MOTIVO, p_PIDM, p_USUA_ID As String

    Dim dt As DataTable
    
    
    Dim res As String
    Dim resb As New StringBuilder
    
    
    
    
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_ESTADO = context.Request("p_ESTADO")
        p_FECHA_INI = context.Request("p_FECHA_INI")
        p_FECHA_FIN = context.Request("p_FECHA_FIN")
        p_GLOSA = context.Request("p_GLOSA")
        p_MOTIVO = context.Request("p_MOTIVO")
        p_PIDM = context.Request("p_PIDM")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_CODIGO = context.Request("p_CODIGO")
      
        
        Select Case OPCION
            Case "1"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
                dt = NNPlanilla.Listar_Periodo_Sin_Remuneracion(IIf(p_CTLG_CODE = Nothing, "", IIf(p_CTLG_CODE = "T", "", p_CTLG_CODE)), IIf(p_MOTIVO = Nothing, "", IIf(p_MOTIVO = "T", "", p_MOTIVO)), IIf(p_CODIGO = Nothing, "", p_CODIGO))
                
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""NESTADO"" :" & """" & MiDataRow("NESTADO").ToString & """,")
                        resb.Append("""ESTADO_IND"" :" & """" & MiDataRow("ESTADO_IND").ToString & """,")
                        resb.Append("""NOMBRE_EMPLEADO"" :" & """" & MiDataRow("NOMBRE_EMPLEADO").ToString & """,")
                        resb.Append("""EMPRESA"" :" & """" & MiDataRow("EMPRESA").ToString & """,")
                        resb.Append("""MOTIVO_CODIGO"" :" & """" & MiDataRow("MOTIVO_CODIGO").ToString & """,")
                        resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                        resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                        resb.Append("""GLOSA"" :" & """" & MiDataRow("GLOSA").ToString & """,")
                        resb.Append("""FEC_INI"" :" & """" & MiDataRow("FEC_INI").ToString & """,")
                        resb.Append("""FEC_FIN"" :" & """" & MiDataRow("FEC_FIN").ToString & """,")
                        resb.Append("""IND_MODIF"" :" & """" & MiDataRow("IND_MODIF").ToString & """,")
                        resb.Append("""MOTIVO_DESC"" :" & """" & MiDataRow("MOTIVO_DESC").ToString & """")
                       

                     
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                NNPlanilla = Nothing
                res = resb.ToString()
            Case "G" '
                context.Response.ContentType = "text/html"
                res = Crear_Periodo_Sin_Remuneracion(p_CTLG_CODE, p_ESTADO, p_FECHA_INI, p_FECHA_FIN, p_GLOSA, p_MOTIVO, p_PIDM, p_USUA_ID)
            Case "AT" '
                context.Response.ContentType = "text/html"
                res = Actualizar_Periodo_Sin_Remuneracion(p_CTLG_CODE, p_ESTADO, p_FECHA_INI, p_FECHA_FIN, p_GLOSA, p_MOTIVO, p_PIDM, p_USUA_ID, p_CODIGO)
          
           
            Case Else
        End Select
        context.Response.Write(res)
    End Sub
 
    
    
        
    Public Function Crear_Periodo_Sin_Remuneracion(p_CTLG_CODE As String, p_ESTADO As String,
                                                p_FECHA_INI As String, p_FECHA_FIN As String,
                                                p_GLOSA As String, p_MOTIVO As String,
                                                p_PIDM As String, p_USUA_ID As String) As String
        Dim resp As String
        Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
        resp = NNPlanilla.CreaPeriodoSinRemuneracion(p_CTLG_CODE, p_ESTADO, p_FECHA_INI, p_FECHA_FIN, p_GLOSA, p_MOTIVO, p_PIDM, p_USUA_ID)
        Return resp
        NNPlanilla = Nothing
    End Function
    
    
    
    Public Function Actualizar_Periodo_Sin_Remuneracion(p_CTLG_CODE As String, p_ESTADO As String,
                                             p_FECHA_INI As String, p_FECHA_FIN As String,
                                             p_GLOSA As String, p_MOTIVO As String,
                                             p_PIDM As String, p_USUA_ID As String, p_CODIGO As String) As String
        Dim resp As String
        Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
        resp = NNPlanilla.ActualizarPeriodoSinRemuneracion(p_CTLG_CODE, p_ESTADO, p_FECHA_INI, p_FECHA_FIN, p_GLOSA, p_MOTIVO, p_PIDM, p_USUA_ID, p_CODIGO)
        Return resp
        NNPlanilla = Nothing
    End Function
    
    
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class