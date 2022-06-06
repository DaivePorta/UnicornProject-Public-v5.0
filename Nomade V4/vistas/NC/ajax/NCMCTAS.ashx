<%@ WebHandler Language="VB" Class="NCMCTAS" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMCTAS : Implements IHttpHandler
    
    Dim ID As String
    Dim OPCION As String
    Dim CTLG_CODE, CODE, NIPC_CODE, DESC, CENTRO_COSTO_IND, DESTINO_IND, FECHA_INICIO, FECHA_TERMINO, ENTR_DATOS, PREDEC_CODE, AJUSTE_DIF_CAMBIO_IND, CUENTA_MONETARIA_IND, ACTIV_FLUJO_EFECTVO_IND, ESTADO_IND, USUA_ID, TIPL_CODE As String
    
    Dim CUCO_CODE As String
    
    Dim dt As DataTable
    
    Dim p As New Nomade.NC.NCPlanCuentas("Bn")
    Dim q As New Nomade.NC.NCEmpresa("Bn")
    Dim r As New Nomade.NC.NCNivelPlanContable("Bn")
    Dim s As New Nomade.NC.NCClaseCuentaContable("Bn")
    
    Dim res As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    
    Dim ITEMSDETAIL As String
    Dim ArrayItemsDetail As Array
    Dim i As Integer
    Dim NIVEL As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        
        ID = IIf(context.Request("ID") = Nothing, "", context.Request("ID"))
        
        CTLG_CODE = context.Request("CTLG_CODE")
        CODE = context.Request("CODE")
                
        NIPC_CODE = context.Request("NIPC_CODE")
        CUCO_CODE = context.Request("CUCO_CODE")
        
        DESC = context.Request("DESC")
        CENTRO_COSTO_IND = context.Request("CENTRO_COSTO_IND")
        DESTINO_IND = context.Request("DESTINO_IND")
        FECHA_INICIO = context.Request("FECHA_INICIO")
        FECHA_TERMINO = context.Request("FECHA_TERMINO")
        ENTR_DATOS = context.Request("ENTR_DATOS")
        PREDEC_CODE = context.Request("PREDEC_CODE")
        AJUSTE_DIF_CAMBIO_IND = context.Request("AJUSTE_DIF_CAMBIO_IND")
        CUENTA_MONETARIA_IND = context.Request("CUENTA_MONETARIA_IND")
        ACTIV_FLUJO_EFECTVO_IND = context.Request("ACTIV_FLUJO_EFECTVO_IND")
        ESTADO_IND = context.Request("ESTADO_IND")
        USUA_ID = context.Request("USUA_ID")
        
        TIPL_CODE = context.Request("TIPL_CODE")
        
        ITEMSDETAIL = context.Request("ITEMSDETAIL")
        NIVEL = context.Request("NIVEL")
        Try
            Select Case OPCION
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
                    dt = r.Listar_NivelPlanContable(String.Empty, CTLG_CODE, String.Empty, String.Empty, "A", String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO_PLAN_CONTABLE"" :" & """" & MiDataRow("CODE").ToString & """,")
                            resb.Append("""PLAN_CONTABLE"" :" & """" & MiDataRow("NOMBRE_PLAN").ToString & """,")
                            resb.Append("""CODIGO_TIPO_PLAN"" :" & """" & MiDataRow("TIPL_CODE").ToString & """,")
                            resb.Append("""TIPO_PLAN"" :" & """" & MiDataRow("NTIPL_CODE_CORTA").ToString & """,")
                            resb.Append("""NIVELES"" :" & """" & MiDataRow("NIVELES").ToString & """,")
                            resb.Append("""NIVEL1"" :" & """" & MiDataRow("NIVEL1").ToString & """,")
                            resb.Append("""NIVEL2"" :" & """" & MiDataRow("NIVEL2").ToString & """,")
                            resb.Append("""NIVEL3"" :" & """" & MiDataRow("NIVEL3").ToString & """,")
                            resb.Append("""NIVEL4"" :" & """" & MiDataRow("NIVEL4").ToString & """,")
                            resb.Append("""NIVEL5"" :" & """" & MiDataRow("NIVEL5").ToString & """,")
                            resb.Append("""NIVEL6"" :" & """" & MiDataRow("NIVEL6").ToString & """,")
                            resb.Append("""NIVEL7"" :" & """" & MiDataRow("NIVEL7").ToString & """,")
                            resb.Append("""NIVEL8"" :" & """" & MiDataRow("NIVEL8").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "3"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = s.Listar_ClaseCuentaContable(String.Empty, String.Empty, TIPL_CODE, String.Empty, String.Empty, "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"" :" & """" & MiDataRow("CODE").ToString & """,")
                            resb.Append("""CODIGO_SUNAT"" :" & """" & MiDataRow("CODIGO_SUNAT").ToString & """,")
                            resb.Append("""NOMBRE_CORTO"" :" & """" & MiDataRow("NOMBRE_CORTO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "4"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.Listar_PlanCuentas(ID, CTLG_CODE, CODE, String.Empty, String.Empty, "A", String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CUCO_CODE"" :" & """" & MiDataRow("CUCO_CODE").ToString & """,")
                            resb.Append("""CODIGO_SUNAT"" :" & """" & MiDataRow("CODIGO_SUNAT").ToString & """,")
                            resb.Append("""NOMBRE_CORTO"" :" & """" & MiDataRow("NOMBRE_CORTO").ToString & """")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "5"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.Listar_PlanCuentas(ID, String.Empty, String.Empty, String.Empty, String.Empty, String.Empty, String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""ID"" :" & """" & MiDataRow("ID").ToString & """,")
                            resb.Append("""ESTADO_IND"" :" & """" & MiDataRow("ESTADO_IND").ToString & """,")
                            resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                            resb.Append("""NCTLG_CODE"" :" & """" & MiDataRow("NCTLG_CODE").ToString & """,")
                            resb.Append("""NIPC_CODE"" :" & """" & MiDataRow("NIPC_CODE").ToString & """,")
                            resb.Append("""NNIPC_CODE"" :" & """" & MiDataRow("NNIPC_CODE").ToString & """,")
                            resb.Append("""TIPL_CODE"" :" & """" & MiDataRow("TIPL_CODE").ToString & """,")
                            resb.Append("""NTIPL_CODE"" :" & """" & MiDataRow("NTIPL_CODE").ToString & """,")
                            resb.Append("""CODE"" :" & """" & MiDataRow("CODE").ToString & """,")
                            resb.Append("""CUCO_CODE"" :" & """" & MiDataRow("CUCO_CODE").ToString & """,")
                            resb.Append("""CODIGO_SUNAT"" :" & """" & MiDataRow("CODIGO_SUNAT").ToString & """,")
                            resb.Append("""NOMBRE_CORTO"" :" & """" & MiDataRow("NOMBRE_CORTO").ToString & """,")
                            resb.Append("""DESCR"" :" & """" & MiDataRow("DESCR").ToString & """,")
                            resb.Append("""FECHA_INICIO"" :" & """" & MiDataRow("FECHA_INICIO").ToString & """,")
                            resb.Append("""CENTRO_COSTO_IND"" :" & """" & MiDataRow("CENTRO_COSTO_IND").ToString & """,")
                            resb.Append("""FECHA_TERMINO"" :" & """" & MiDataRow("FECHA_TERMINO").ToString & """,")
                            resb.Append("""ENTR_DATOS"" :" & """" & MiDataRow("ENTR_DATOS").ToString & """,")
                            resb.Append("""DIF_CAMBIO_IND"" :" & """" & MiDataRow("DIF_CAMBIO_IND").ToString & """,")
                            resb.Append("""NDIF_CAMBIO_IND"" :" & """" & MiDataRow("NDIF_CAMBIO_IND").ToString & """,")
                            resb.Append("""CUENTA_MONETARIA_IND"" :" & """" & MiDataRow("CUENTA_MONETARIA_IND").ToString & """,")
                            resb.Append("""ACTIV_FLUJO_EFECTVO_IND"" :" & """" & MiDataRow("ACTIV_FLUJO_EFECTVO_IND").ToString & """,")
                            resb.Append("""NACTIV_FLUJO_EFECTVO_IND"" :" & """" & MiDataRow("NACTIV_FLUJO_EFECTVO_IND").ToString & """")
                            'If MiDataRow("JSON") Is DBNull.Value Then
                            '    resb.Append("""JSON"" :" & """""")
                            'Else
                            'resb.Append("""JSON"" :" & MiDataRow("JSON").ToString & "")
                            'End If
                           
                    resb.Append("}")
                        Next
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "6"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = s.Listar_ClaseCuentaContable(CUCO_CODE, String.Empty, String.Empty, String.Empty, String.Empty, "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"" :" & """" & MiDataRow("CODE").ToString & """,")
                            resb.Append("""CODIGO_SUNAT"" :" & """" & MiDataRow("CODIGO_SUNAT").ToString & """,")
                            resb.Append("""NOMBRE_CORTO"" :" & """" & MiDataRow("NOMBRE_CORTO").ToString & """")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "N"
                    context.Response.ContentType = "application/json; charset=utf-8"
                                        
                    ArrayItemsDetail = ITEMSDETAIL.Split(";"c)
                    
                    If FECHA_TERMINO <> String.Empty Then
                        FECHA_TERMINO = Utilities.fechaLocal(FECHA_TERMINO)
                    End If
                    
                    resArray = GrabarPlanCuentas(CTLG_CODE, CODE, NIPC_CODE, CUCO_CODE, DESC, CENTRO_COSTO_IND, DESTINO_IND, Utilities.fechaLocal(FECHA_INICIO), FECHA_TERMINO, _
                                       ENTR_DATOS, PREDEC_CODE, AJUSTE_DIF_CAMBIO_IND, CUENTA_MONETARIA_IND, ACTIV_FLUJO_EFECTVO_IND, ESTADO_IND, USUA_ID, IIf(ITEMSDETAIL.Trim().Length = 0, 0, ArrayItemsDetail.Length), ITEMSDETAIL)
                        
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & resArray(0).ToString & """,")
                    resb.Append("""JSON"" :" & IIf(resArray(1).ToString().Length = 0, """""", resArray(1).ToString) & ",")
                    resb.Append("""SUCCESS"" :" & """" & resArray(2).ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
               
                Case "M"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    
                    ArrayItemsDetail = ITEMSDETAIL.Split(";"c)
                    
                    If FECHA_TERMINO <> String.Empty Then
                        FECHA_TERMINO = Utilities.fechaLocal(FECHA_TERMINO)
                    End If
                    
                    resArray = ActualizarPlanCuentas(ID, CTLG_CODE, CODE, NIPC_CODE, CUCO_CODE, DESC, CENTRO_COSTO_IND, DESTINO_IND, Utilities.fechaLocal(FECHA_INICIO), FECHA_TERMINO, _
                                       ENTR_DATOS, PREDEC_CODE, AJUSTE_DIF_CAMBIO_IND, CUENTA_MONETARIA_IND, ACTIV_FLUJO_EFECTVO_IND, ESTADO_IND, USUA_ID, IIf(ITEMSDETAIL.Trim().Length = 0, 0, ArrayItemsDetail.Length), ITEMSDETAIL)
                        
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & resArray(0).ToString & """,")
                    resb.Append("""JSON"" :" & IIf(resArray(1).ToString().Length = 0, """""", resArray(1).ToString) & ",")
                    resb.Append("""SUCCESS"" :" & """" & resArray(2).ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                    
                Case "7" 'Listar por empresa
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.fListar_PCXEmpresa(CTLG_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"" :" & """" & MiDataRow("CODE").ToString & """,")
                            resb.Append("""NOMBRE"" :" & """" & MiDataRow("NOMBRE").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "8"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.fListar_NivelesXEmpresa(CTLG_CODE, CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"" :" & """" & MiDataRow("PTVNIPL_NIVELES").ToString & """,")
                            resb.Append("""NOMBRE"" :" & """" & MiDataRow("PTVNIPL_NIVELES").ToString & """")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                    
                Case "9"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.fListarPC(CTLG_CODE, CODE, IIf(NIVEL = "999", String.Empty, NIVEL))
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"":""" & row("CODE").ToString & """,")
                            resb.Append("""NOMBRE_CUENTA"":""" & row("NOMBRE_CUENTA").ToString & """,")
                            resb.Append("""CLASE_CUENTA"":""" & row("CLASE_CUENTA").ToString & """,")
                            resb.Append("""NIVEL"":""" & row("NIVEL").ToString & """,")
                            resb.Append("""C_COSTO"":""" & row("C_COSTO").ToString & """,")
                            resb.Append("""NDIF_CAMBIO_IND"":""" & row("NDIF_CAMBIO_IND").ToString & """,")
                            resb.Append("""NACTIV_FLUJO_EFECTVO_IND"":""" & row("NACTIV_FLUJO_EFECTVO_IND").ToString & """,")
                            resb.Append("""NESTADO_IND"":""" & row("NESTADO_IND").ToString & """,")
                            resb.Append("""CTLG_CODE"":""" & row("CTLG_CODE").ToString & """,")
                            resb.Append("""CUCO_CODE"":""" & row("CUCO_CODE").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "LP"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim par As New Nomade.NC.NCParametros("BN")
                    dt = par.ListarParametros("FLUX", String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            resb.Append("""VALOR"":""" & row("VALOR").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "INI"
                    context.Response.ContentType = "text/plain"
                    dt = p.Listar_PlanCuentas(String.Empty, CTLG_CODE, String.Empty, String.Empty, String.Empty, String.Empty, String.Empty)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""ID"":""" & row("ID").ToString & """,")
                            resb.Append("""CODE"":""" & row("CODE").ToString & """,")
                            resb.Append("""DESCR"":""" & row("DESCR").ToString & """,")
                            resb.Append("""CLASE_CUENTA"":""" & row("CLASE_CUENTA").ToString & """,")
                            resb.Append("""NIVEL"":""" & row("NIVEL").ToString & """,")
                            resb.Append("""NCENTRO_COSTO_IND"":""" & row("NCENTRO_COSTO_IND").ToString & """,")
                            resb.Append("""NDIF_CAMBIO_IND"":""" & row("NDIF_CAMBIO_IND").ToString & """,")
                            resb.Append("""NACTIV_FLUJO_EFECTVO_IND"":""" & row("NACTIV_FLUJO_EFECTVO_IND").ToString & """,")
                            resb.Append("""NESTADO_IND"":""" & row("NESTADO_IND").ToString & """,")
                            resb.Append("""CTLG_CODE"":""" & row("CTLG_CODE").ToString & """,")
                            resb.Append("""NIPC_CODE"":""" & row("NIPC_CODE").ToString & """,")
                            resb.Append("""CUCO_CODE"":""" & row("CUCO_CODE").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("-")
                        resb.Replace("},-", "}")
                        resb.Append("]")
                    Else
                        resb.Append("[]")
                    End If
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
    
    Public Function GrabarPlanCuentas(ByVal p_FTVCTAS_CTLG_CODE As String, ByVal p_FTVCTAS_CODE As String, ByVal p_FTVCTAS_NIPC_CODE As String, _
                                      ByVal p_FTVCTAS_CUCO_CODE As String, ByVal p_FTVCTAS_DESC As String, ByVal p_FTVCTAS_CENTRO_COSTO_IND As String, _
                                      ByVal p_FTVCTAS_DESTINO_IND As String, ByVal p_FTVCTAS_FECHA_INICIO As String, ByVal p_FTVCTAS_FECHA_TERMINO As String, _
                                      ByVal p_FTVCTAS_ENTR_DATOS As String, ByVal p_FTVCTAS_PREDEC_CODE As String, ByVal p_FTVCTAS_AJUSTE_DIF_CAMBIO_IND As String, _
                                      ByVal p_FTVCTAS_CUENTA_MONETARIA_IND As String, ByVal p_FTVCTAS_ACTIV_FLUJO_EFECTVO_IND As String, ByVal p_FTVCTAS_ESTADO_IND As String, _
                                      ByVal p_FTVCTAS_USUA_ID As String, ByVal p_ITEMSCOUNT As Integer, ByVal p_ITEMSDETAIL As String) As Array
        Dim datos(3) As String
        datos = p.Crear_PlanCuentas(p_FTVCTAS_CTLG_CODE, p_FTVCTAS_CODE, p_FTVCTAS_NIPC_CODE, p_FTVCTAS_CUCO_CODE, p_FTVCTAS_DESC, p_FTVCTAS_CENTRO_COSTO_IND, p_FTVCTAS_DESTINO_IND, _
                                    p_FTVCTAS_FECHA_INICIO, p_FTVCTAS_FECHA_TERMINO, p_FTVCTAS_ENTR_DATOS, p_FTVCTAS_PREDEC_CODE, p_FTVCTAS_AJUSTE_DIF_CAMBIO_IND, _
                                    p_FTVCTAS_CUENTA_MONETARIA_IND, p_FTVCTAS_ACTIV_FLUJO_EFECTVO_IND, p_FTVCTAS_ESTADO_IND, p_FTVCTAS_USUA_ID, p_ITEMSCOUNT, p_ITEMSDETAIL)
        Return datos
    End Function
 
    Public Function ActualizarPlanCuentas(ByVal P_ID As String,
                                          ByVal p_FTVCTAS_CTLG_CODE As String, ByVal p_FTVCTAS_CODE As String, ByVal p_FTVCTAS_NIPC_CODE As String, _
                                          ByVal p_FTVCTAS_CUCO_CODE As String, ByVal p_FTVCTAS_DESC As String, ByVal p_FTVCTAS_CENTRO_COSTO_IND As String, _
                                          ByVal p_FTVCTAS_DESTINO_IND As String, ByVal p_FTVCTAS_FECHA_INICIO As String, ByVal p_FTVCTAS_FECHA_TERMINO As String, _
                                          ByVal p_FTVCTAS_ENTR_DATOS As String, ByVal p_FTVCTAS_PREDEC_CODE As String, ByVal p_FTVCTAS_AJUSTE_DIF_CAMBIO_IND As String, _
                                          ByVal p_FTVCTAS_CUENTA_MONETARIA_IND As String, ByVal p_FTVCTAS_ACTIV_FLUJO_EFECTVO_IND As String, ByVal p_FTVCTAS_ESTADO_IND As String, _
                                          ByVal p_FTVCTAS_USUA_ID As String, ByVal p_ITEMSCOUNT As Integer, ByVal p_ITEMSDETAIL As String) As Array
        Dim datos(3) As String
        datos = p.Actualizar_PlanCuentas(P_ID, p_FTVCTAS_CTLG_CODE, p_FTVCTAS_CODE, p_FTVCTAS_NIPC_CODE, p_FTVCTAS_CUCO_CODE, p_FTVCTAS_DESC, p_FTVCTAS_CENTRO_COSTO_IND, p_FTVCTAS_DESTINO_IND, _
                                    p_FTVCTAS_FECHA_INICIO, p_FTVCTAS_FECHA_TERMINO, p_FTVCTAS_ENTR_DATOS, p_FTVCTAS_PREDEC_CODE, p_FTVCTAS_AJUSTE_DIF_CAMBIO_IND, _
                                    p_FTVCTAS_CUENTA_MONETARIA_IND, p_FTVCTAS_ACTIV_FLUJO_EFECTVO_IND, p_FTVCTAS_ESTADO_IND, p_FTVCTAS_USUA_ID, p_ITEMSCOUNT, p_ITEMSDETAIL)
        Return datos
    End Function
    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function
End Class