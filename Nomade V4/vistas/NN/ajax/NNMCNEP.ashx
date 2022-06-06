<%@ WebHandler Language="VB" Class="Handler" %>

Imports System
Imports System.Web
Imports System.Data

Public Class Handler : Implements IHttpHandler
    Dim OPCION As String
    Dim CTLG_CODE, p_TIPLA_CODE, p_DETALLE, SCSL_CODE, p_TIPLA, filtrotypeahead, p_PIDM_EMPL, p_TIPO_UPDATE, p_USUA_ID, p_EMPLEADOS, p_IND_TODOS, p_CONCEPTO_CODE, p_FECHA_INICIO, p_FECHA_FIN, p_ESTADO As String
    Dim p_MONTO As Decimal
    Dim p_CODE_ASIGNACION As Integer
    Dim dt As DataTable
    
    
    Dim res As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        OPCION = context.Request("OPCION")
        
        CTLG_CODE = context.Request("CTLG_CODE")
        SCSL_CODE = context.Request("SCSL_CODE")
        p_EMPLEADOS = context.Request("p_EMPLEADOS")
        p_IND_TODOS = context.Request("p_IND_TODOS")
        p_CONCEPTO_CODE = context.Request("p_CONCEPTO_CODE")
        p_MONTO = context.Request("p_MONTO")
        p_FECHA_INICIO = context.Request("p_FECHA_INICIO")
        p_FECHA_FIN = context.Request("p_FECHA_FIN")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_ESTADO = context.Request("p_ESTADO")
        p_CODE_ASIGNACION = context.Request("p_CODE_ASIGNACION")
        p_TIPO_UPDATE = context.Request("p_TIPO_UPDATE")
        p_PIDM_EMPL = context.Request("p_PIDM_EMPL")
        p_TIPLA_CODE = context.Request("p_TIPLA_CODE")
        p_TIPLA = context.Request("p_TIPLA")
        filtrotypeahead = context.Request("q")
        p_DETALLE = context.Request("p_DETALLE")
        
              Select OPCION
                
            Case "1" ' lista empleados
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = New Nomade.NC.NCEEmpleado("Bn").Listar_Empleados(0, 0, "A", CTLG_CODE, SCSL_CODE, String.Empty, IIf(filtrotypeahead = Nothing, "", filtrotypeahead))
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
            Case "2"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
                dt = NNPlanilla.Listar_Asig_Concep_Emple(IIf(p_CONCEPTO_CODE = Nothing, "", p_CONCEPTO_CODE), IIf(CTLG_CODE = Nothing, "", CTLG_CODE), IIf(SCSL_CODE = Nothing, "", IIf(SCSL_CODE = "T", "", SCSL_CODE)), IIf(p_ESTADO = Nothing, "A", p_ESTADO), IIf(p_CODE_ASIGNACION = Nothing, 0, p_CODE_ASIGNACION), IIf(p_TIPLA_CODE = Nothing, "", p_TIPLA_CODE))
                
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""NOMBRES"" :" & """" & MiDataRow("NOMBRES").ToString & """,")
                        resb.Append("""CONCEPTO"" :" & """" & MiDataRow("CONCEPTO").ToString & """,")
                        resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                        resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                        resb.Append("""SCSL_CODE"" :" & """" & MiDataRow("SCSL_CODE").ToString & """,")
                        resb.Append("""FECHA_INICIO"" :" & """" & MiDataRow("FECHA_INICIO").ToString & """,")
                        resb.Append("""FECHA_FIN"" :" & """" & MiDataRow("FECHA_FIN").ToString & """,")
                        resb.Append("""MONTO"" :" & """" & MiDataRow("MONTO").ToString & """,")
                        resb.Append("""NESTADO"" :" & """" & MiDataRow("NESTADO").ToString & """,")
                        resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO").ToString & """,")
                        resb.Append("""CONCEPTO_CODIGO"" :" & """" & MiDataRow("CONCEPTO_CODIGO").ToString & """,")
                        resb.Append("""DESC_TIPLA"" :" & """" & MiDataRow("DESC_TIPLA").ToString & """,")
                        resb.Append("""CODIGO_TIPLA"" :" & """" & MiDataRow("CODIGO_TIPLA").ToString & """,")
                        resb.Append("""INDICADOR"" :" & """" & MiDataRow("INDICADOR").ToString & """,")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                NNPlanilla = Nothing
                res = resb.ToString()
            Case "3"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
                dt = NNPlanilla.Listar_Tipo_Planilla("", "", "R")
                
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                     
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                NNPlanilla = Nothing
                res = resb.ToString()
            Case "4"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
                dt = NNPlanilla.Listar_ConceptoAdicionalxTipoPlanilla(p_TIPLA_CODE, "A")
                
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                     
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                NNPlanilla = Nothing
                res = resb.ToString()
            Case "G" 'CREA asigancion concepto empleado
                context.Response.ContentType = "text/html"
                res = Crear_Asig_Concep_Empleado(p_EMPLEADOS, p_IND_TODOS, p_CONCEPTO_CODE, p_MONTO, p_FECHA_INICIO, IIf(p_FECHA_FIN = "", Nothing, p_FECHA_FIN), CTLG_CODE, SCSL_CODE, p_USUA_ID, p_ESTADO, p_TIPLA)
            Case "A" 'aCTUALIZA asigancion concepto empleado
                context.Response.ContentType = "text/html"
                res = Actualizar_Concepto_Planilla(p_CONCEPTO_CODE, p_CODE_ASIGNACION, p_PIDM_EMPL, IIf(p_FECHA_FIN = "", Nothing, p_FECHA_FIN), p_FECHA_INICIO, p_MONTO, p_ESTADO, p_USUA_ID, p_TIPO_UPDATE)
            Case "E" 'elimina asigancion concepto empleado
                context.Response.ContentType = "text/html"
                res = Eliminar_Asigancion_Conceptos(p_DETALLE)
           
           
            Case Else
        End Select
        context.Response.Write(res)
    End Sub
    
    
    Public Function Crear_Asig_Concep_Empleado(ByVal p_EMPLEADOS As String, ByVal p_IND_TODOS As String, ByVal p_CONCEPTO_CODE As String, ByVal p_MONTO As Decimal, ByVal p_FECHA_INICIO As String, ByVal p_FECHA_FIN As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_USUA_ID As String, ByVal p_ESTADO As String, p_TIPLA As String) As String
        Dim resp As String
        Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
        resp = NNPlanilla.Crear_Asig_Concepto_Emple(p_EMPLEADOS, p_IND_TODOS, p_CONCEPTO_CODE, p_MONTO, p_FECHA_INICIO, p_FECHA_FIN, p_CTLG_CODE, p_SCSL_CODE, p_USUA_ID, p_ESTADO, p_TIPLA)
        Return resp
        NNPlanilla = Nothing
    End Function
    
    
    Public Function Actualizar_Concepto_Planilla(ByVal p_CONCEPTO_CODE As String, ByVal p_CODE_ASIGNACION As Integer, ByVal p_PIDM_EMPL As String, ByVal p_FECHA_FIN As String, ByVal p_FECHA_INICIO As String, ByVal p_MONTO As Decimal, ByVal p_ESTADO As String, ByVal p_USUA_ID As String, ByVal p_TIPO_UPDATE As String) As String
    
        Dim Datos(1) As String
        Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
        Datos = NNPlanilla.Actualizar_Asig_Concepto_Emple(p_CONCEPTO_CODE, p_CODE_ASIGNACION, p_PIDM_EMPL, p_FECHA_FIN, p_FECHA_INICIO, p_MONTO, p_ESTADO, p_USUA_ID, p_TIPO_UPDATE)
        NNPlanilla = Nothing
        Return IIf(Datos(0).Equals(""), Datos(1), Datos(0))
        
    End Function
    
    Public Function Eliminar_Asigancion_Conceptos(ByVal p_DETALLE As String) As String
        
        Dim resp As String
        Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
        Try
            resp = NNPlanilla.Elimina_asigancion_concep_empl(p_DETALLE)
        Catch ex As Exception
            resp = "E"
        End Try
      
       
        Return resp
        NNPlanilla = Nothing
        
    End Function
    
    
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class