<%@ WebHandler Language="VB" Class="NCMCNGA" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMCNGA : Implements IHttpHandler
    Dim OPCION As String
    Dim p_GRUP_DESC, p_CODE, p_ESTADO_IND, p_DESC, p_CODIGO_CTA, p_TIPO_MOV, p_USUA_ID, p_TIPO, p_CTLG_CODE,
        p_NUM_CTA, p_CLASE_CTA, p_DESC_ADICIONAL, p_TIPO_BIEN, p_CODIGO_DETRACCION, p_PORCENTAJE_DETRACCION As String
    Dim p_NIVEL As Integer
    Dim dt As DataTable
    
    
    Dim res As String
    Dim resb As New StringBuilder
    
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")

        p_ESTADO_IND = context.Request("p_ESTADO_IND")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_DESC = context.Request("p_DESC")
        p_CODE = context.Request("p_CODE")
        p_TIPO = context.Request("p_TIPO")
        p_TIPO_MOV = context.Request("p_TIPO_MOV")
        p_NUM_CTA = context.Request("p_NUM_CTA")
        p_NIVEL = context.Request("p_NIVEL")
        p_CLASE_CTA = context.Request("p_CLASE_CTA")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_CODIGO_CTA = context.Request("p_CODIGO_CTA")
        p_DESC_ADICIONAL = context.Request("p_DESC_ADICIONAL")
        p_TIPO_BIEN = context.Request("p_TIPO_BIEN")
        If p_TIPO_BIEN = "" Or p_TIPO_BIEN = "undefined" Then
            p_TIPO_BIEN = Nothing
        End If
        p_CODIGO_DETRACCION = context.Request("p_CODIGO_DETRACCION") 'DPORTA 14/01/2022
        p_PORCENTAJE_DETRACCION = context.Request("p_PORCENTAJE_DETRACCION") 'DPORTA 14/01/2022
        
        Select Case OPCION
                
            Case "1" ' lista GRUPO / SUBGRUPOS
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim NCPlanCuentas As New Nomade.NC.NCPlanCuentas("Bn")
                dt = NCPlanCuentas.LISTAR_CONCEPTO_GASTO(IIf(p_CODE = Nothing, "", p_CODE), IIf(p_ESTADO_IND = Nothing, "", p_ESTADO_IND), p_TIPO, p_CTLG_CODE)
                If Not dt Is Nothing Then
                    res = Utilities.Datatable2Json(dt)
                Else
                    res = "[]"
                End If
                'If Not (dt Is Nothing) Then
                '    resb.Append("[")
                '    For Each MiDataRow As DataRow In dt.Rows
                '        resb.Append("{")
                '        resb.Append("""CODIGO"":" & """" & MiDataRow("CODIGO").ToString & """,")
                '        resb.Append("""DESCRIPCION"":" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                '        resb.Append("""ESTADO"":" & """" & MiDataRow("ESTADO").ToString & """,")
                '        resb.Append("""CONTABLE"":" & """" & MiDataRow("CONTABLE").ToString & """,")
                '        resb.Append("""CONTABLE_DESC"":" & """" & MiDataRow("CONTABLE_DESC").ToString & """,")
                '        resb.Append("""CTLG_CODE"":" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                '        resb.Append("""CTLG_CODE"":" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                '        resb.Append("""NESTADO"":" & """" & MiDataRow("NESTADO").ToString & """,")
                '        resb.Append("""DESC_ADICIONAL"":" & """" & MiDataRow("DESC_ADICIONAL").ToString & """,")
                '        resb.Append("""DEPENDENCIA_DESC"":" & """" & MiDataRow("DEPENDENCIA_DESC").ToString & """,")
                '        resb.Append("""TIPO"":" & """" & MiDataRow("TIPO").ToString & """")                        
                '        resb.Append("}")
                '        resb.Append(",")
                '    Next
                '    resb.Append("{}")
                '    resb = resb.Replace(",{}", String.Empty)
                '    resb.Append("]")                        
                'End If
                'res = resb.ToString()                    
            'Case "2" ' lista CUENTAS
            '    context.Response.ContentType = "application/json; charset=utf-8"
            '    Dim NCPlanCuentas As New Nomade.NC.NCPlanCuentas("Bn")
            '    dt = NCPlanCuentas.LISTAR_CUENTAS_CONTABLES_X_NIVEL(p_NUM_CTA, p_NIVEL, p_CLASE_CTA, p_CTLG_CODE)
                
            '    If Not (dt Is Nothing) Then
            '        resb.Append("[")
            '        For Each MiDataRow As DataRow In dt.Rows
            '            resb.Append("{")
            '            resb.Append("""CODIGO"":" & """" & MiDataRow("CODIGO").ToString & """,")
            '            resb.Append("""DESCRIPCION"":" & """" & MiDataRow("DESCRIPCION").ToString & """")
            '            'resb.Append("""ESTADO"":" & """" & MiDataRow("ESTADO").ToString & """,")
            '            'resb.Append("""TIPO"":" & """" & MiDataRow("TIPO").ToString & """,")
            '            'resb.Append("""NESTADO"":" & """" & MiDataRow("NESTADO").ToString & """")    
            '            resb.Append("}")
            '            resb.Append(",")
            '        Next
            '        resb.Append("{}")
            '        resb = resb.Replace(",{}", String.Empty)
            '        resb.Append("]")
            '    End If
            '    res = resb.ToString()
            Case "3" ' 
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim NCPlanCuentas As New Nomade.NC.NCPlanCuentas("Bn")
                dt = NCPlanCuentas.LISTAR_CONCEPTO_GASTO(IIf(p_CODE = Nothing, "", p_CODE), IIf(p_ESTADO_IND = Nothing, "", p_ESTADO_IND), p_TIPO, p_CTLG_CODE)
                If Not dt Is Nothing Then
                    res = Utilities.Datatable2Json(dt)
                Else
                    res = "[]"
                End If
                'If Not (dt Is Nothing) Then
                '    resb.Append("[")
                '    For Each MiDataRow As DataRow In dt.Rows
                '        resb.Append("{")
                '        resb.Append("""CODIGO"":" & """" & MiDataRow("CODIGO").ToString & """,")
                      
                '        resb.Append("""DESCRIPCION"":" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                '        resb.Append("""ESTADO"":" & """" & MiDataRow("ESTADO").ToString & """,")
                '        resb.Append("""CONTABLE"":" & """" & MiDataRow("CONTABLE").ToString & """,")
                '        resb.Append("""CTLG_CODE"":" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                '        resb.Append("""NESTADO"":" & """" & MiDataRow("NESTADO").ToString & """,")
                '        resb.Append("""TIPO"":" & """" & MiDataRow("TIPO").ToString & """")
                        
                '        resb.Append("}")
                '        resb.Append(",")
                '    Next
                '    resb.Append("{}")
                '    resb = resb.Replace(",{}", String.Empty)
                '    resb.Append("]")
                        
                'End If
                'res = resb.ToString()
            Case "NG" 'CREA CONCEPTO PLANILLA
                context.Response.ContentType = "text/html"
                res = Crear_concepto_gasto(p_DESC, p_CODE, p_ESTADO_IND, p_USUA_ID, p_TIPO_MOV, p_CTLG_CODE, p_CODIGO_CTA, p_TIPO_BIEN, p_CODIGO_DETRACCION, p_PORCENTAJE_DETRACCION, p_DESC_ADICIONAL)
            Case "AT" 'ACTUALIZA CONCEPTO PLANILLA
                context.Response.ContentType = "text/html"
                res = Actualizar_Concepto_Gasto(p_CODE, p_DESC, p_ESTADO_IND, p_USUA_ID, p_CTLG_CODE, p_CODIGO_CTA, p_TIPO_BIEN, p_CODIGO_DETRACCION, p_PORCENTAJE_DETRACCION, p_DESC_ADICIONAL)
            Case "E" 'Elimina CONCEPTO PLANILLA
                context.Response.ContentType = "text/html"
                res = Eliminar_Concepto_Gasto(p_CODE)
            Case Else
        End Select
        context.Response.Write(res)
    End Sub
 
    
    
    
    Public Function Crear_concepto_gasto(ByVal p_DESC As String,
                                    ByVal p_DEPEND_CODE As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String,
                                    ByVal p_TIPO_MOV As String, ByVal p_CTLG_CODE As String, ByVal p_CODIGO_CTA As String, ByVal p_TIPO_BIEN As String,
                                    ByVal p_CODIGO_DETRACCION As String, ByVal p_PORCENTAJE_DETRACCION As String, Optional p_desc_adicional As String = "") As String
       
        Dim Datos As String
        Dim NCPlanCuentas As New Nomade.NC.NCPlanCuentas("Bn")
        Datos = NCPlanCuentas.Crear_Concepto_Gasto(p_DESC, p_DEPEND_CODE, p_ESTADO_IND, p_USUA_ID, p_TIPO_MOV, p_CTLG_CODE, p_CODIGO_CTA, p_TIPO_BIEN, p_CODIGO_DETRACCION, p_PORCENTAJE_DETRACCION, p_desc_adicional)
        NCPlanCuentas = Nothing
        Return Datos
    
    End Function
    
    Public Function Actualizar_Concepto_Gasto(ByVal p_CODE As String, ByVal p_DESC As String,
                                   ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String,
                                   ByVal p_CTLG_CODE As String, ByVal p_CTA_CONT As String, ByVal p_TIPO_BIEN As String,
                                   ByVal p_CODIGO_DETRACCION As String, ByVal p_PORCENTAJE_DETRACCION As String, Optional p_desc_adicional As String = "") As String
    
        Dim Datos As String
        Dim NCPlanCuentas As New Nomade.NC.NCPlanCuentas("Bn")
        Datos = NCPlanCuentas.Actualizar_Concepto_Gasto(p_CODE, p_DESC, p_ESTADO_IND, p_USUA_ID, p_CTLG_CODE, p_CTA_CONT, p_TIPO_BIEN, p_CODIGO_DETRACCION, p_PORCENTAJE_DETRACCION, p_desc_adicional)
        NCPlanCuentas = Nothing
        Return Datos
        
    End Function
    
    
    Public Function Eliminar_Concepto_Gasto(ByVal p_CODE As String) As String
    
        Dim Datos As String
        Dim NCPlanCuentas As New Nomade.NC.NCPlanCuentas("Bn")
        Datos = NCPlanCuentas.Eliminar_Concepto_Gasto(p_CODE)
        NCPlanCuentas = Nothing
        Return Datos
        
    End Function
    
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class