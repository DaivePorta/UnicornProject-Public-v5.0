<%@ WebHandler Language="VB" Class="NCMNIPL" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMNIPL : Implements IHttpHandler
    Dim OPCION As String
    Dim CODE, CTLG_CODE, TIPL_CODE, NOMBRE_PLAN, NIVELES, NIVEL1, NIVEL2, NIVEL3, NIVEL4, NIVEL5, NIVEL6, NIVEL7, NIVEL8, ESTADO_IND, FECHA_INICIO, FECHA_FIN, USUA_ID As String
    
    
    Dim res As String
    Dim dt As DataTable
    Dim resb As New StringBuilder
    
    Dim p As New Nomade.NC.NCEmpresa("Bn")
    Dim q As New Nomade.NC.NCTipoPlan("Bn")
    Dim r As New Nomade.NC.NCNivelPlanContable("Bn")
    
    Dim resArray As Array
    Dim usua As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        
        CODE = context.Request("CODE")
        CTLG_CODE = context.Request("CTLG_CODE")
        TIPL_CODE = context.Request("TIPL_CODE")
        NOMBRE_PLAN = context.Request("NOMBRE_PLAN")
        NIVELES = context.Request("NIVELES")
        NIVEL1 = context.Request("NIVEL1")
        NIVEL2 = context.Request("NIVEL2")
        NIVEL3 = context.Request("NIVEL3")
        NIVEL4 = context.Request("NIVEL4")
        NIVEL5 = context.Request("NIVEL5")
        NIVEL6 = context.Request("NIVEL6")
        NIVEL7 = context.Request("NIVEL7")
        NIVEL8 = context.Request("NIVEL8")
        ESTADO_IND = context.Request("ESTADO_IND")
        FECHA_INICIO = context.Request("FECHA_INICIO")
        FECHA_FIN = context.Request("FECHA_FIN")
        USUA_ID = context.Request("USUA_ID")
        usua = context.Request("usua")
        
        Try
            Select Case OPCION.ToString()
                Case "0"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarEmpresa(String.Empty, "A", context.User.Identity.Name)
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
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
                    res = resb.ToString()
                Case "1"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = q.Listar_TipoPlan(String.Empty, "A")
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
                    res = resb.ToString()
                Case "2"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = r.Listar_NivelPlanContable(CODE, String.Empty, String.Empty, String.Empty, String.Empty, String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"" :" & """" & MiDataRow("CODE").ToString & """,")
                            resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                            resb.Append("""NCTLG_CODE"" :" & """" & MiDataRow("NCTLG_CODE").ToString & """,")
                            resb.Append("""TIPL_CODE"" :" & """" & MiDataRow("TIPL_CODE").ToString & """,")
                            resb.Append("""NTIPL_CODE"" :" & """" & MiDataRow("NTIPL_CODE").ToString & """,")
                            resb.Append("""NOMBRE_PLAN"" :" & """" & MiDataRow("NOMBRE_PLAN").ToString & """,")
                            resb.Append("""NIVELES"" :" & """" & MiDataRow("NIVELES").ToString & """,")
                            resb.Append("""NIVEL1"" :" & """" & MiDataRow("NIVEL1").ToString & """,")
                            resb.Append("""NIVEL2"" :" & """" & MiDataRow("NIVEL2").ToString & """,")
                            resb.Append("""NIVEL3"" :" & """" & MiDataRow("NIVEL3").ToString & """,")
                            resb.Append("""NIVEL4"" :" & """" & MiDataRow("NIVEL4").ToString & """,")
                            resb.Append("""NIVEL5"" :" & """" & MiDataRow("NIVEL5").ToString & """,")
                            resb.Append("""NIVEL6"" :" & """" & MiDataRow("NIVEL6").ToString & """,")
                            resb.Append("""NIVEL7"" :" & """" & MiDataRow("NIVEL7").ToString & """,")
                            resb.Append("""NIVEL8"" :" & """" & MiDataRow("NIVEL8").ToString & """,")
                            resb.Append("""ESTADO_IND"" :" & """" & MiDataRow("ESTADO_IND").ToString & """,")
                            resb.Append("""FECHA_INICIO"" :" & """" & MiDataRow("FECHA_INICIO").ToString & """,")
                            resb.Append("""FECHA_FIN"" :" & """" & MiDataRow("FECHA_FIN").ToString & """")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "N"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    If FECHA_FIN <> String.Empty Then
                        FECHA_FIN = Utilities.fechaLocal(FECHA_FIN)
                    End If
                    resArray = GrabarNivelesPlanContable(CTLG_CODE, TIPL_CODE, NOMBRE_PLAN, Integer.Parse(NIVELES), Integer.Parse(NIVEL1), Integer.Parse(NIVEL2), Integer.Parse(NIVEL3), _
                                                           Integer.Parse(NIVEL4), Integer.Parse(NIVEL5), Integer.Parse(NIVEL6), Integer.Parse(NIVEL7), Integer.Parse(NIVEL8), ESTADO_IND, _
                                                           Utilities.fechaLocal(FECHA_INICIO), FECHA_FIN, USUA_ID)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & resArray(0).ToString & """,")
                    resb.Append("""SUCCESS"" :" & """" & resArray(1).ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                Case "M"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    If FECHA_FIN <> String.Empty Then
                        FECHA_FIN = Utilities.fechaLocal(FECHA_FIN)
                    End If
                    resArray = ActualizarNivelesPlanContable(CODE, CTLG_CODE, TIPL_CODE, NOMBRE_PLAN, Integer.Parse(NIVELES), Integer.Parse(NIVEL1), Integer.Parse(NIVEL2), Integer.Parse(NIVEL3), _
                                                           Integer.Parse(NIVEL4), Integer.Parse(NIVEL5), Integer.Parse(NIVEL6), Integer.Parse(NIVEL7), Integer.Parse(NIVEL8), ESTADO_IND, _
                                                           Utilities.fechaLocal(FECHA_INICIO), FECHA_FIN, USUA_ID)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & resArray(0).ToString & """,")
                    resb.Append("""SUCCESS"" :" & """" & resArray(1).ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                Case Else
            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub
    
    Public Function GrabarNivelesPlanContable(ByVal p_PTVNIPL_CTLG_CODE As String, ByVal p_PTVNIPL_TIPL_CODE As String, ByVal p_PTVNIPL_NOMBRE_PLAN As String, _
                                              ByVal p_PTVNIPL_NIVELES As Integer, ByVal p_PTVNIPL_NIVEL1 As Integer, ByVal p_PTVNIPL_NIVEL2 As Integer, _
                                              ByVal p_PTVNIPL_NIVEL3 As Integer, ByVal p_PTVNIPL_NIVEL4 As Integer, ByVal p_PTVNIPL_NIVEL5 As Integer, _
                                              ByVal p_PTVNIPL_NIVEL6 As Integer, ByVal p_PTVNIPL_NIVEL7 As Integer, ByVal p_PTVNIPL_NIVEL8 As Integer, _
                                              ByVal p_PTVNIPL_ESTADO_IND As String, ByVal p_PTVNIPL_FECHA_INICIO As String, ByVal p_PTVNIPL_FECHA_FIN As String, _
                                              ByVal p_PTVNIPL_USUA_ID As String) As Array
        Dim datos(2) As String
        datos = r.Crear_NivelPlanContable(p_PTVNIPL_CTLG_CODE, p_PTVNIPL_TIPL_CODE, p_PTVNIPL_NOMBRE_PLAN, p_PTVNIPL_NIVELES, p_PTVNIPL_NIVEL1, _
                                          p_PTVNIPL_NIVEL2, p_PTVNIPL_NIVEL3, p_PTVNIPL_NIVEL4, p_PTVNIPL_NIVEL5, p_PTVNIPL_NIVEL6, p_PTVNIPL_NIVEL7, _
                                          p_PTVNIPL_NIVEL8, p_PTVNIPL_ESTADO_IND, p_PTVNIPL_FECHA_INICIO, p_PTVNIPL_FECHA_FIN, p_PTVNIPL_USUA_ID)
        Return datos
    End Function
 
    Public Function ActualizarNivelesPlanContable(ByVal p_PTVNIPL_CODE As String, ByVal p_PTVNIPL_CTLG_CODE As String, ByVal p_PTVNIPL_TIPL_CODE As String, ByVal p_PTVNIPL_NOMBRE_PLAN As String, _
                                              ByVal p_PTVNIPL_NIVELES As Integer, ByVal p_PTVNIPL_NIVEL1 As Integer, ByVal p_PTVNIPL_NIVEL2 As Integer, _
                                              ByVal p_PTVNIPL_NIVEL3 As Integer, ByVal p_PTVNIPL_NIVEL4 As Integer, ByVal p_PTVNIPL_NIVEL5 As Integer, _
                                              ByVal p_PTVNIPL_NIVEL6 As Integer, ByVal p_PTVNIPL_NIVEL7 As Integer, ByVal p_PTVNIPL_NIVEL8 As Integer, _
                                              ByVal p_PTVNIPL_ESTADO_IND As String, ByVal p_PTVNIPL_FECHA_INICIO As String, ByVal p_PTVNIPL_FECHA_FIN As String, _
                                              ByVal p_PTVNIPL_USUA_ID As String) As Array
        Dim datos(2) As String
        datos = r.Actualizar_NivelPlanContable(p_PTVNIPL_CODE, p_PTVNIPL_CTLG_CODE, p_PTVNIPL_TIPL_CODE, p_PTVNIPL_NOMBRE_PLAN, p_PTVNIPL_NIVELES, p_PTVNIPL_NIVEL1, _
                                          p_PTVNIPL_NIVEL2, p_PTVNIPL_NIVEL3, p_PTVNIPL_NIVEL4, p_PTVNIPL_NIVEL5, p_PTVNIPL_NIVEL6, p_PTVNIPL_NIVEL7, _
                                          p_PTVNIPL_NIVEL8, p_PTVNIPL_ESTADO_IND, p_PTVNIPL_FECHA_INICIO, p_PTVNIPL_FECHA_FIN, p_PTVNIPL_USUA_ID)
        Return datos
    End Function
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function
End Class