<%@ WebHandler Language="VB" Class="NNMTIPL" %>

Imports System
Imports System.Web
Imports System.Data


Public Class NNMTIPL : Implements IHttpHandler
    Dim OPCION, CODE, ESTADO_IND, USUA_ID, CODE_SUNAT, PAGO_IND, PEPA_CODE, DESC, DETALLE , BOLE_IND As String
    
    Dim res As String
    Dim dt As DataTable
    Dim resb As New StringBuilder
    Dim resArray As Array
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        CODE = context.Request("CODE")
        CODE_SUNAT = context.Request("CODE_SUNAT")
        ESTADO_IND = context.Request("ESTADO_IND")
        USUA_ID = context.Request("USUA_ID")
        PAGO_IND = context.Request("PAGO_IND")
        PEPA_CODE = context.Request("PEPA_CODE")
        DESC = context.Request("DESC")
        DETALLE = context.Request("DETALLE")
        BOLE_IND = context.Request("BOLE_IND")
        
        Select Case OPCION.ToString()
            
            Case "1" 'Lista Tipo Planilla
                context.Response.ContentType = "application/text; charset=utf-8"
                Dim pad As New Nomade.NN.NNPlanilla("BN")
                dt = pad.Listar_Tipo_Planilla(CODE, ESTADO_IND, "")
                res = GenerarTablaTipoPlanilla(dt)
            Case "2" 'Actualiza Estado
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim e As New Nomade.NN.NNPlanilla("Bn")
                                                                                                                                       
                resArray = e.Actualiza_Estado_TipoPla(CODE, USUA_ID)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""SUCCESS"" :" & """" & resArray(0).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()
            Case "3" 'Periodicidad de Pago
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pemp As New Nomade.NN.NNPlanilla("BN")
                dt = pemp.Listar_PeriodicidadPago(CODE,CODE_SUNAT, ESTADO_IND)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("codigo").ToString & """,")
                        resb.Append("""CODIGO_SUNAT"" :" & """" & MiDataRow("codigo_sunat").ToString & """,")
                        resb.Append("""NOMBRE"" :" & """" & MiDataRow("descripcion").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "4" 'Inserta Tipo Planilla
                Dim m As New Nomade.NN.NNPlanilla("Bn")
                res = m.CreaTipoPlanilla(DESC, ESTADO_IND, USUA_ID, PAGO_IND, PEPA_CODE, DETALLE, BOLE_IND)
                m = Nothing
            Case "5" 'Actualiza Tipo Planilla
                Dim m As New Nomade.NN.NNPlanilla("Bn")
                res = m.ActualizaTipoPlanilla(CODE, DESC, ESTADO_IND, USUA_ID, PAGO_IND, PEPA_CODE, DETALLE, BOLE_IND)
                m = Nothing
            Case "6" 'Lista Tipo Planilla
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pad As New Nomade.NN.NNPlanilla("BN")
                dt = pad.Listar_Tipo_Planilla(CODE, ESTADO_IND, "")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    resb.Append("""DESCRIPCION"" :" & """" & dt.Rows(0)("DESCRIPCION") & """,")
                    resb.Append("""PAGO_IND"" :" & """" & dt.Rows(0)("PAGO_IND") & """,")
                    resb.Append("""PEPA_IND"" :" & """" & dt.Rows(0)("PEPA_IND") & """,")
                    resb.Append("""ESTADO_IND"" :" & """" & dt.Rows(0)("ESTADO_IND") & """,")
                    resb.Append("""BOLE_IND"" :" & """" & dt.Rows(0)("BOLE_IND") & """")
                    resb.Append("}")
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "7" 'Lista Mes Tipla
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pad As New Nomade.NN.NNPlanilla("BN")
                dt = pad.Listar_Mes_TipoPla(CODE)
                If Not dt Is Nothing Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        
                        'If row("MES").ToString.Length = 1 Then
                        '    row("MES") = "0" + row("MES").ToString
                        'End If
                        resb.Append("{")
                        resb.Append("""NUM_MES"":""" & row("NUM_MES").ToString & """,")
                        resb.Append("""MES"":""" & row("MES").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("-")
                    resb.Replace("},-", "}")
                    resb.Append("]")
                End If
                res = resb.ToString()
        End Select
        
        context.Response.Write(res)

    End Sub
 
    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function
    
    Public Function GenerarTablaTipoPlanilla(ByVal dt As DataTable) As String
        res = ""
        resb.Clear()
        '------
        resb.AppendFormat("<table id=""tblTipoPlanilla"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th>CODIGO</th>")
        resb.AppendFormat("<th>DESCRIPCION</th>")
        resb.AppendFormat("<th>TIPO PAGO</th>")
        resb.AppendFormat("<th>PERIODO PAGO</th>")
         resb.AppendFormat("<th>BOLETA</th>")
        resb.AppendFormat("<th>ESTADO</th>")
        resb.AppendFormat("<th>CAMBIAR ESTADO</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")
        
        If (dt Is Nothing) Then
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'>NO HAY DATOS DISPONIBLES</td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
             resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("</tr>")
        Else
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODIGO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DESCRIPCION").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("PAGO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("PEPA_DESC").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("BOLE_DESC").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ESTADO").ToString())

                resb.AppendFormat("<td style='text-align:center;'>")
                resb.AppendFormat("<a class='btn green' onclick=""actualizaestadoTipla('{0}')""><i class='icon-refresh'></i></a>", dt.Rows(i)("CODIGO").ToString())
                resb.AppendFormat("</td>")
                resb.AppendFormat("</tr>")
            Next
        End If
        
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
        Return res
        
    End Function
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class