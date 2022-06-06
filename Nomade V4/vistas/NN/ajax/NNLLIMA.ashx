<%@ WebHandler Language="VB" Class="NNMLIMA" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NNMLIMA : Implements IHttpHandler
    Dim OPCION As String
    Dim FECHA_DESDE, SCSL_CODE, filtrotypeahead, CTLG_CODE, FECHA_HASTA, IND_ACTIVO, PIDM As String
    Dim dt As DataTable
    
    
    Dim res As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        
        FECHA_DESDE = context.Request("FECHA_DESDE")
        FECHA_HASTA = context.Request("FECHA_HASTA")
        IND_ACTIVO = context.Request("IND_ACTIVO")
        PIDM = context.Request("PIDM")
        CTLG_CODE = context.Request("CTLG_CODE")
        SCSL_CODE = context.Request("SCSL_CODE")
        filtrotypeahead = context.Request("filtrotypeahead")
        
        
        Select Case OPCION
                
            Case "1" ' 
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = New Nomade.NN.NNPlanilla("Bn").Listar_Marcaciones(FECHA_DESDE, FECHA_HASTA, IIf(IND_ACTIVO = Nothing, "", IND_ACTIVO), IIf(PIDM = Nothing, "", PIDM), IIf(SCSL_CODE = "T", "", SCSL_CODE),CTLG_CODE )
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""NOMBRES"" :" & """" & MiDataRow("NOMBRES").ToString & """,")
                        resb.Append("""HORA_INICIO"" :" & """" & MiDataRow("HORA_INICIO").ToString & """,")
                        resb.Append("""HORA_FIN"" :" & """" & MiDataRow("HORA_FIN").ToString & """,")
                        resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                        resb.Append("""FECHA"" :" & """" & MiDataRow("FECHA").ToString & """")
                      
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "3" ' 
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = New Nomade.NN.NNPlanilla("Bn").Listar_Marcaciones_Brutas(FECHA_DESDE, FECHA_HASTA, IIf(IND_ACTIVO = Nothing, "", IND_ACTIVO), IIf(PIDM = Nothing, "", PIDM), IIf(SCSL_CODE = "T", "", SCSL_CODE), CTLG_CODE)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""NOMBRES"" :" & """" & MiDataRow("NOMBRES").ToString & """,")
                        resb.Append("""MARCACION"" :" & """" & MiDataRow("MARCACION").ToString & """,")
                        resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                        resb.Append("""FECHA"" :" & """" & MiDataRow("FECHA").ToString & """")
                      
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "2" ' lista empleados
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = New Nomade.NC.NCEEmpleado("Bn").Listar_Empleados(0, 0, IND_ACTIVO, CTLG_CODE, IIf(SCSL_CODE = "T", "", SCSL_CODE), String.Empty, IIf(filtrotypeahead = Nothing, "", filtrotypeahead))
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""NOMBRE_EMPLEADO"" :" & """" & MiDataRow("NOMBRE_EMPLEADO").ToString & """,")
                        resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                        resb.Append("""DNI"" :" & """" & MiDataRow("DNI").ToString & """,")
                        resb.Append("""RUC"" :" & """" & MiDataRow("RUC").ToString & """,")
                        resb.Append("""DIRECCION"" :" & """" & MiDataRow("DIRECCION").ToString & """,")
                        resb.Append("""SCSL_CODE"" :" & """" & MiDataRow("SCSL_CODE").ToString & """,")
                        resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                        resb.Append("""CONCEPTOS_PLANILLA"" :" & """" & MiDataRow("CONCEPTOS_PLANILLA").ToString & """,")
                        resb.Append("""USUA_ID"" :" & """" & MiDataRow("USUA_ID").ToString & """")
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
 
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class