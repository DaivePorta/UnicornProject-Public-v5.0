<%@ WebHandler Language="VB" Class="NCMEQCC" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMEQCC : Implements IHttpHandler
    
    Dim OPCION As String
    
    Dim CODE, CTLG_CODE, CECC_CODE_BASE, CECD_CODE_BASE, CECC_CODE_EQUIVALENTE, CECD_CODE_EQUIVALENTE, ESTADO_IND, FECHA_INICIO, FECHA_FIN, USUA_ID As String
    
    Dim CECC_CODE As String
    
    Dim dt As DataTable
    
    Dim res As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    
    Dim p As New Nomade.NC.NCEquivalenciaCentroCostos("Bn")
    Dim q As New Nomade.NC.NCEmpresa("Bn")
    Dim r As New Nomade.NC.NCCentroCostos("Bn")
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        OPCION = context.Request("OPCION")
        
        CODE = context.Request("CODE")
        CTLG_CODE = context.Request("CTLG_CODE")
        CECC_CODE_BASE = context.Request("CECC_CODE_BASE")
        CECD_CODE_BASE = context.Request("CECD_CODE_BASE")
        CECC_CODE_EQUIVALENTE = context.Request("CECC_CODE_EQUIVALENTE")
        CECD_CODE_EQUIVALENTE = context.Request("CECD_CODE_EQUIVALENTE")
        ESTADO_IND = context.Request("ESTADO_IND")
        FECHA_INICIO = context.Request("FECHA_INICIO")
        FECHA_FIN = context.Request("FECHA_FIN")
        USUA_ID = context.Request("USUA_ID")
        CECC_CODE = context.Request("CECC_CODE")
        
        Try
            
            Select Case OPCION
                Case "0"
                    context.Response.ContentType = "text/html"
                    dt = p.Listar_Equivalencia_CentroCostos(String.Empty, String.Empty, String.Empty, USUA_ID)
                    res = GenerarHtmlEquivalenciaCentroCostos(dt)
                Case "1"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = q.ListarEmpresa(String.Empty, "A", context.User.Identity.Name)
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
                Case "2"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = r.Listar_CentroCostos_Cabecera(String.Empty, CTLG_CODE, String.Empty, String.Empty, String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"" :" & """" & MiDataRow("CODE").ToString & """,")
                            resb.Append("""NOMBRE_PLAN"" :" & """" & MiDataRow("NOMBRE_PLAN").ToString & """")
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
                    dt = r.Listar_CentroCostos_Detalle(String.Empty, CECC_CODE, String.Empty, 0, String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"" :" & """" & MiDataRow("CODE").ToString & """,")
                            resb.Append("""DESCC"" :" & """" & MiDataRow("CODE").ToString & " - " & MiDataRow("DESCC").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "N"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    If FECHA_FIN <> String.Empty Then
                        FECHA_FIN = Utilities.fechaLocal(FECHA_FIN)
                    End If
                    resArray = GrabarEquivalenciaCentroCostos(CTLG_CODE, CECC_CODE_BASE, CECD_CODE_BASE, CECC_CODE_EQUIVALENTE, CECD_CODE_EQUIVALENTE, _
                                                     ESTADO_IND, Utilities.fechaLocal(FECHA_INICIO), FECHA_FIN, USUA_ID)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & resArray(0).ToString & """,")
                    resb.Append("""SUCCESS"" :" & """" & resArray(1).ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                Case "4"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.Listar_Equivalencia_CentroCostos(CODE, String.Empty, String.Empty, USUA_ID)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"" :" & """" & MiDataRow("CODE").ToString & """,")
                            resb.Append("""ESTADO_IND"" :" & """" & MiDataRow("ESTADO_IND").ToString & """,")
                            resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                            resb.Append("""NCTLG_CODE"" :" & """" & MiDataRow("NCTLG_CODE").ToString & """,")
                            resb.Append("""CECC_CODE_BASE"" :" & """" & MiDataRow("CECC_CODE_BASE").ToString & """,")
                            resb.Append("""NOMBRE_PLAN_BASE"" :" & """" & MiDataRow("NOMBRE_PLAN_BASE").ToString & """,")
                            resb.Append("""CECD_CODE_BASE"" :" & """" & MiDataRow("CECD_CODE_BASE").ToString & """,")
                            resb.Append("""DESCRIPCION_BASE"" :" & """" & MiDataRow("DESCRIPCION_BASE").ToString & """,")
                            resb.Append("""CECC_CODE_EQUIVALENTE"" :" & """" & MiDataRow("CECC_CODE_EQUIVALENTE").ToString & """,")
                            resb.Append("""NOMBRE_PLAN_EQUIVALENTE"" :" & """" & MiDataRow("NOMBRE_PLAN_EQUIVALENTE").ToString & """,")
                            resb.Append("""CECD_CODE_EQUIVALENTE"" :" & """" & MiDataRow("CECD_CODE_EQUIVALENTE").ToString & """,")
                            resb.Append("""DESCRIPCION_EQUIVALENTE"" :" & """" & MiDataRow("DESCRIPCION_EQUIVALENTE").ToString & """,")
                            resb.Append("""FECHA_INICIO"" :" & """" & MiDataRow("FECHA_INICIO").ToString & """,")
                            resb.Append("""FECHA_FIN"" :" & """" & MiDataRow("FECHA_FIN").ToString & """")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "M"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    If FECHA_FIN <> String.Empty Then
                        FECHA_FIN = Utilities.fechaLocal(FECHA_FIN)
                    End If
                    resArray = ActualizarEquivalenciaCentroCostos(CODE, CTLG_CODE, CECC_CODE_BASE, CECD_CODE_BASE, CECC_CODE_EQUIVALENTE, CECD_CODE_EQUIVALENTE, _
                                                     ESTADO_IND, Utilities.fechaLocal(FECHA_INICIO), FECHA_FIN, USUA_ID)
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
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property
    
    Public Function GenerarHtmlEquivalenciaCentroCostos(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<table id=""tblEquivalenciaCentroCostos"" cellspacing=""0""  class=""display DTTT_selectable"">"
            res += "<thead>"
            res += "<tr>"
            res += "<td align='center'>EMPRESA</td>"
            res += "<td align='center'>PLAN COSTO BASE</td>"
            res += "<td align='center'>CODIGO</td>"
            res += "<td align='center'>COSTO BASE</td>"
            res += "<td align='center'>PLAN COSTO EQUIVALENTE</td>"
            res += "<td align='center'>CODIGO</td>"
            res += "<td align='center'>COSTO EQUIVALENTE</td>"
            res += "<td align='center'>FECHA INICIO</td>"
            res += "<td align='center'>FECHA TÉRMINO</td>"
            res += "<td align='center'>ESTADO</td>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr id='" & dt.Rows(i)("CODE").ToString() & "'>"
                res += "<td align='left'>" & dt.Rows(i)("NCTLG_CODE").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("NOMBRE_PLAN_BASE").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("CECD_CODE_BASE").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("DESCRIPCION_BASE").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("NOMBRE_PLAN_EQUIVALENTE").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("CECD_CODE_EQUIVALENTE").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("DESCRIPCION_EQUIVALENTE").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("FECHA_INICIO").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("FECHA_FIN").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("NESTADO_IND").ToString() & "</td>"
                res += "</tr>"
            Next
            res += "</tbody>"
            res += "</table>"
        Else
            res = "No se encontraron datos!!!"
        End If
        Return res
    End Function
    
    Public Function GrabarEquivalenciaCentroCostos(ByVal p_PTVEQCC_CTLG_CODE As String, ByVal p_PTVEQCC_CECC_CODE_BASE As String, ByVal p_PTVEQCC_CECD_CODE_BASE As String, _
                                                    ByVal p_PTVEQCC_CECC_CODE_EQUIVALENTE As String, ByVal p_PTVEQCC_CECD_CODE_EQUIVALENTE As String, _
                                                    ByVal p_PTVEQCC_ESTADO_IND As String, ByVal p_PTVEQCC_FECHA_INICIO As String, ByVal p_PTVEQCC_FECHA_FIN As String, _
                                                    ByVal p_PTVEQCC_USUA_ID As String) As Array
        Dim datos(2) As String
        datos = p.Crear_Equivalencia_CentroCostos(p_PTVEQCC_CTLG_CODE, p_PTVEQCC_CECC_CODE_BASE, p_PTVEQCC_CECD_CODE_BASE, _
                                                     p_PTVEQCC_CECC_CODE_EQUIVALENTE, p_PTVEQCC_CECD_CODE_EQUIVALENTE, _
                                                     p_PTVEQCC_ESTADO_IND, p_PTVEQCC_FECHA_INICIO, p_PTVEQCC_FECHA_FIN, _
                                                     p_PTVEQCC_USUA_ID)
        Return datos
    End Function
    
    Public Function ActualizarEquivalenciaCentroCostos(ByVal p_PTVEQCC_CODE As String, ByVal p_PTVEQCC_CTLG_CODE As String, ByVal p_PTVEQCC_CECC_CODE_BASE As String, ByVal p_PTVEQCC_CECD_CODE_BASE As String, _
                                                    ByVal p_PTVEQCC_CECC_CODE_EQUIVALENTE As String, ByVal p_PTVEQCC_CECD_CODE_EQUIVALENTE As String, _
                                                    ByVal p_PTVEQCC_ESTADO_IND As String, ByVal p_PTVEQCC_FECHA_INICIO As String, ByVal p_PTVEQCC_FECHA_FIN As String, _
                                                    ByVal p_PTVEQCC_USUA_ID As String) As Array
        Dim datos(2) As String
        datos = p.Actualizar_Equivalencia_CentroCostos(p_PTVEQCC_CODE, p_PTVEQCC_CTLG_CODE, p_PTVEQCC_CECC_CODE_BASE, p_PTVEQCC_CECD_CODE_BASE, _
                                                     p_PTVEQCC_CECC_CODE_EQUIVALENTE, p_PTVEQCC_CECD_CODE_EQUIVALENTE, _
                                                     p_PTVEQCC_ESTADO_IND, p_PTVEQCC_FECHA_INICIO, p_PTVEQCC_FECHA_FIN, _
                                                     p_PTVEQCC_USUA_ID)
        Return datos
    End Function
    
    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function
End Class