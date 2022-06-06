<%@ WebHandler Language="VB" Class="NNMBAPL" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NNMBAPL : Implements IHttpHandler
    Dim OPCION, CODE, PLANI_CODE, DESCRIPCION, CTLG_CODE,
        BANC_CODE, CUEN_CODE, TIPLA_CODE, DIA_PAGO, ESTADO_IND, USUA_ID, PIDM, MONEDA, NRO_CUENTA, ITEM, INDICADOR As String
    
    Dim res As String
    Dim dt As DataTable
    Dim resb As New StringBuilder
    Dim resArray As Array
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
                        
        OPCION = context.Request("OPCION")
        CODE = context.Request("CODE")
        PLANI_CODE = context.Request("PLANI_CODE")
        DESCRIPCION = context.Request("DESCRIPCION")
        CTLG_CODE = context.Request("CTLG_CODE")
        BANC_CODE = context.Request("BANC_CODE")
        CUEN_CODE = context.Request("CUEN_CODE")
        TIPLA_CODE = context.Request("TIPLA_CODE")
        DIA_PAGO = context.Request("DIA_PAGO")
        ESTADO_IND = context.Request("ESTADO_IND")
        USUA_ID = context.Request("USUA_ID")
        PIDM = context.Request("PIDM")
        MONEDA = context.Request("MONEDA")
        NRO_CUENTA = context.Request("NRO_CUENTA")
        ITEM = context.Request("ITEM")
        INDICADOR = context.Request("INDICADOR")
        
            Select Case OPCION.ToString()
            
                Case "1" 'Inserta Planilla Bancaria
                    Dim m As New Nomade.NN.NNPlanillaBancaria("Bn")
                res = m.Crea_Planilla_Bancaria(PLANI_CODE, DESCRIPCION, CTLG_CODE, BANC_CODE, CUEN_CODE, TIPLA_CODE, DIA_PAGO, ESTADO_IND, USUA_ID, MONEDA)
                    m = Nothing
                Case "2" 'Actualiza Planilla Bancaria
                    Dim m As New Nomade.NN.NNPlanillaBancaria("Bn")
                res = m.Actualiza_Planilla_Bancaria(CODE, PLANI_CODE, DESCRIPCION, CTLG_CODE, BANC_CODE, CUEN_CODE, TIPLA_CODE, DIA_PAGO, ESTADO_IND, USUA_ID, MONEDA)
                    m = Nothing
            
                Case "3" 'Lista Planilla Bancaria
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim pad As New Nomade.NN.NNPlanillaBancaria("BN")
                dt = pad.Listar_PlanillaBancaria(If(CODE Is Nothing, String.Empty, CODE), If(PLANI_CODE Is Nothing, String.Empty, PLANI_CODE), If(DESCRIPCION Is Nothing, String.Empty, DESCRIPCION),
                                                 If(CTLG_CODE Is Nothing, String.Empty, CTLG_CODE), If(BANC_CODE Is Nothing, String.Empty, BANC_CODE))
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODE"":""" & row("CODE").ToString & """,")
                        resb.Append("""PLANI_CODE"":""" & row("PLANI_CODE").ToString & """,")
                        resb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                        resb.Append("""CTLG_CODE"":""" & row("CTLG_CODE").ToString & """,")
                        resb.Append("""CTLG_DESC"":""" & row("CTLG_DESC").ToString & """,")
                        resb.Append("""MONE_CODE"":""" & row("MONE_CODE").ToString & """,")
                        resb.Append("""MONE_DESC"":""" & row("MONE_DESC").ToString & """,")
                        resb.Append("""BANC_CODE"":""" & row("BANC_CODE").ToString & """,")
                        resb.Append("""BANC_DESC"":""" & row("BANC_DESC").ToString & """,")
                        resb.Append("""CUEN_CODE"":""" & row("CUEN_CODE").ToString & """,")
                        resb.Append("""NRO_CUENTA"":""" & row("NRO_CUENTA").ToString & """,")
                        resb.Append("""RHTIPLA_CODE"":""" & row("RHTIPLA_CODE").ToString & """,")
                        resb.Append("""RHTIPLA_DESC"":""" & row("RHTIPLA_DESC").ToString & """,")
                        resb.Append("""DIA_PAGO"":""" & row("DIA_PAGO").ToString & """,")
                        resb.Append("""ESTADO_IND"":""" & row("ESTADO_IND").ToString & """,")
                        resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                        resb.Append("},")
                        Next
                        resb.Append("-")
                        resb.Replace("},-", "}")
                        resb.Append("]")
                    End If
                res = resb.ToString()
            Case "4" 'Lista cuentas Personas
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pemp As New Nomade.NN.NNPlanillaBancaria("BN")
                dt = pemp.Listar_DatosBancarios_Empleado(PIDM, BANC_CODE, MONEDA, ESTADO_IND, INDICADOR)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                        resb.Append("""CUEN_CODE"" :" & """" & MiDataRow("CUEN_CODE").ToString & """,")
                        resb.Append("""BANC_CODE"" :" & """" & MiDataRow("BANC_CODE").ToString & """,")
                        resb.Append("""NRO_CTA"" :" & """" & MiDataRow("NRO_CTA").ToString & """,")
                        resb.Append("""NRO_CTA_DESC"" :" & """" & MiDataRow("NRO_CTA_DESC").ToString & """,")
                        resb.Append("""NRO_CTA_INTER"" :" & """" & MiDataRow("NRO_CTA_INTER").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
                
            Case "5" 'Lista Detalle Planilla Bancaria
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pad As New NOMADE.NN.NNPlanillaBancaria("BN")
                dt = pad.Listar_Detalle_PlanillaBancaria(CODE)
                If Not dt Is Nothing Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""ITEM"":""" & row("ITEM").ToString & """,")
                        resb.Append("""FILA"":""" & row("FILA").ToString & """,")
                        resb.Append("""NOMBRE"":""" & row("NOMBRE").ToString & """,")
                        resb.Append("""DOC_IDEN"":""" & row("DOC_IDEN").ToString & """,")
                        resb.Append("""BANC_ACRO"":""" & row("BANC_ACRO").ToString & """,")
                        resb.Append("""NRO_CUENTA"":""" & row("NRO_CUENTA").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("-")
                    resb.Replace("},-", "}")
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "6" 'Inserta Detalle Planilla Bancaria
                Dim m As New Nomade.NN.NNPlanillaBancaria("Bn")
                res = m.Inserta_Detalle_PlanillaBancaria(CODE, PIDM, BANC_CODE, NRO_CUENTA)
                m = Nothing
                
            Case "7" 'Elimina Detalle Planilla Bancaria
                Dim m As New Nomade.NN.NNPlanillaBancaria("Bn")
                res = m.Elimina_Detalle_PlanillaBancaria(ITEM)
                m = Nothing
                
            Case "8" 'Actualiza Estado Planilla Bancaria
                Dim m As New Nomade.NN.NNPlanillaBancaria("Bn")
                res = m.Actualiza_Estado_PlanillaBancaria(CODE)
                m = Nothing
                
            Case "99" 'LISTA EMPLEADOS PLANILLA BANCARIA
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim NNPlanillaBancaria As New Nomade.NN.NNPlanillaBancaria("Bn")
                dt = NNPlanillaBancaria.Listar_Planilla_Bancaria_Empleados(CTLG_CODE)
                If Not (dt Is Nothing) Then
                      
                    res = Utilities.Datatable2Json(dt)
                End If
                
            Case "SENDMAIL"
                context.Request.ContentType = "text/plain"
                
                Dim pad As New Nomade.NN.NNPlanillaBancaria("BN")
                dt = pad.Listar_Detalle_PlanillaBancaria(CODE)
                
                Dim mail As New Nomade.Mail.NomadeMail("BN")
                Dim HTML_TABLA_DETALLES As String = GenerarTablaDet(dt)
                
             
                
                Dim remitente As String = context.Request("REMITENTE")
                Dim nremitente As String = context.Request("NREMITENTE")
                Dim destinatarios As String = context.Request("DESTINATARIOS")
                Dim asunto As String = context.Request("ASUNTO")
                Dim mensaje As String = context.Request("MENSAJE")
                    
                Dim empresa As String = context.Request("EMPRESA")
                Dim banco As String = context.Request("BANCO")
                Dim tipoPlanilla As String = context.Request("TIPOPLANILLA")
                               
                Dim CUERPO As String =
                    "<p>" & mensaje & "</p><hr>" &
                    "<h2>" & empresa & "</h2>" &
                    "<h3>" & PLANI_CODE & " " & DESCRIPCION & "</h3>" &
                    "<p><strong>BANCO:</strong> " & banco & "</p><p><strong>NRO. CUENTA:</strong> " & NRO_CUENTA & "</p>" &
                    "<p><strong>TIPO PLANILLA:</strong> " & tipoPlanilla & "</p>" &
                    "</p><p><strong>DIA PAGO:</strong> " & DIA_PAGO & "</p>" & HTML_TABLA_DETALLES                    
                mail.enviar(remitente, nremitente, destinatarios, asunto, CUERPO)
                res = "OK"
                
                pad = Nothing
                mail = Nothing
                     
                dt.Clear()
                       
               
            
                
        End Select
        
            context.Response.Write(res)
        
            'context.Response.ContentType = "text/plain"
            'context.Response.Write("Hello World")
    End Sub
 
    
    Private Function GenerarTablaDet(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<table style=""border: 1px solid #ddd;border-collapse: separate;border-left: 0;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;clear: both;margin-bottom: 6px !important;max-width: none !important; width: 100%;"">"
            res &= "<thead style=""display: table-header-group;vertical-align: middle;border-color: inherit; background-color: #dddddd"">"
            res &= "<tr style=""display: table-row;vertical-align: inherit;border-color: inherit;"">"
            res &= "<th style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">Nro</th>"
            res &= "<th>Cuenta</th>"
            res &= "<th style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">Banco</th>"
            res &= "<th style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">Titular</th>"
            res &= "<th style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">Doc. Identidad</th>"
            res &= "</tr>"
            res &= "</thead>"
            res &= "<tbody style=""display: table-header-group;vertical-align: middle;border-color: inherit;"">"
            For i As Integer = 0 To dt.Rows.Count - 1
                res &= "<tr style=""display: table-row;vertical-align: inherit;border-color: inherit;"">"
                res &= "<td style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">" & dt.Rows(i)("FILA").ToString() & "</td>"
                res &= "<td style=""padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">" & dt.Rows(i)("NRO_CUENTA").ToString() & "</td>"
                res &= "<td style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">" & dt.Rows(i)("BANC_ACRO").ToString() & "</td>"
                res &= "<td style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">" & dt.Rows(i)("NOMBRE").ToString() & "</td>"
                res &= "<td style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">" & dt.Rows(i)("DOC_IDEN").ToString() & "</td>"           
                res &= "</tr>"
            Next
            res &= "</tbody>"
            res &= "</table>"
        Else
            res = "No se encontraron datos."
        End If
        Return res
    End Function
    
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class