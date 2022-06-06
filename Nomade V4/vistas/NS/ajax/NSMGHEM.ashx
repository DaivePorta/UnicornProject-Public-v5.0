<%@ WebHandler Language="VB" Class="NSMGHEM" %>

Imports System
Imports System.Web
Imports System.Data


Public Class NSMGHEM : Implements IHttpHandler

    Dim OPCION As String
    Dim dt As DataTable
    Dim res As String
    Dim resb As New StringBuilder
    Dim PlantillaHorario As New Nomade.NS.NSPlantillaHorario("Bn")
    Dim HOEC_CODE, HORA_INICIO, HORA_FIN, LUNES_IND, MARTES_IND,
        MIERCOLES_IND, JUEVES_IND, VIERNES_IND, SABADO_IND,
        DOMINGO_IND, ZOHO_CODE, p_ESTADO As String

    Dim CODE, FECHA_INICIO, FECHA_LIMITE, INC_FERIADOS_IND, ESTADO_IND, USUA_ID As String
    Dim EMPL_PIDM As Integer

    Dim p_PEBHOED_HOEC_CODE As String = ""
    Dim p_RHDEPL_RHPLAHO_CODE As String = ""
    Dim p_RHPLAHO_CTLG_CODE As String = ""

    Dim resArray As Array
    Dim SEQ As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        p_RHPLAHO_CTLG_CODE = context.Request("p_RHPLAHO_CTLG_CODE")
        p_PEBHOED_HOEC_CODE= context.Request("p_PEBHOED_HOEC_CODE")
        OPCION = context.Request("OPCION")

        p_RHDEPL_RHPLAHO_CODE = context.Request("p_RHDEPL_RHPLAHO_CODE")

        CODE = context.Request("CODE")
        EMPL_PIDM = context.Request("EMPL_PIDM")
        FECHA_INICIO = context.Request("FECHA_INICIO")
        FECHA_LIMITE = context.Request("FECHA_LIMITE")
        INC_FERIADOS_IND = context.Request("INC_FERIADOS_IND")
        ESTADO_IND = context.Request("ESTADO_IND")
        USUA_ID = context.Request("USUA_ID")

        HOEC_CODE = context.Request("HOEC_CODE")
        HORA_INICIO = context.Request("HORA_INICIO")
        HORA_FIN = context.Request("HORA_FIN")
        LUNES_IND = context.Request("LUNES_IND")
        MARTES_IND = context.Request("MARTES_IND")
        MIERCOLES_IND = context.Request("MIERCOLES_IND")
        JUEVES_IND = context.Request("JUEVES_IND")
        VIERNES_IND = context.Request("VIERNES_IND")
        SABADO_IND = context.Request("SABADO_IND")
        DOMINGO_IND = context.Request("DOMINGO_IND")
        ZOHO_CODE = context.Request("ZOHO_CODE")
        SEQ = context.Request("SEQ")
        p_ESTADO = context.Request("p_ESTADO")
        p_RHPLAHO_CTLG_CODE = context.Request("p_RHPLAHO_CTLG_CODE")

        Select Case OPCION.ToString
            Case "1"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim e As New Nomade.NC.NCEEmpleado("Bn")
                'dt = e.Listar_Empleados(0, 0, "A")
                dt = e.Listar_Empleados_Contrato_Activo(p_RHPLAHO_CTLG_CODE, String.Empty)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("PIDM").ToString & """,")
                        resb.Append("""NOMBRE"" :" & """" & MiDataRow("NOMBRE_EMPLEADO").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
                e = Nothing
            Case "2"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim z As New Nomade.NC.NCZonaHoraria("Bn")
                dt = z.Listar_ZonaHoraria(String.Empty, String.Empty, "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("Codigo").ToString & """,")
                        resb.Append("""NOMBRE"" :" & """" & MiDataRow("Zona_horaria").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
                z = Nothing
            Case "CE"
                context.Response.ContentType = "text/html"
                Dim t As New Nomade.NS.NSGestionhorarioempleado("Bn")
                res = t.CambiarEstadoHorarioEmpleado(CODE)
                t = Nothing
            Case "CH"
                context.Response.ContentType = "text/html"
                Dim t As New Nomade.NS.NSGestionhorarioempleado("Bn")
                If Not FECHA_INICIO.Equals(String.Empty) Then
                    FECHA_INICIO = Utilities.fechaLocal(FECHA_INICIO)
                End If
                If Not FECHA_LIMITE.Equals(String.Empty) Then
                    FECHA_LIMITE = Utilities.fechaLocal(FECHA_LIMITE)
                End If
                res = t.CrearHorario(EMPL_PIDM, FECHA_INICIO, FECHA_LIMITE, INC_FERIADOS_IND, ESTADO_IND, USUA_ID, ZOHO_CODE, p_RHPLAHO_CTLG_CODE)
                t = Nothing
            Case "AH"
                context.Response.ContentType = "text/html"
                Dim t As New Nomade.NS.NSGestionhorarioempleado("Bn")
                If Not FECHA_INICIO.Equals(String.Empty) Then
                    FECHA_INICIO = Utilities.fechaLocal(FECHA_INICIO)
                End If
                If Not FECHA_LIMITE.Equals(String.Empty) Then
                    FECHA_LIMITE = Utilities.fechaLocal(FECHA_LIMITE)
                End If
                res = t.ActualizarHorario(CODE, EMPL_PIDM, FECHA_INICIO, FECHA_LIMITE, INC_FERIADOS_IND, ESTADO_IND, USUA_ID, ZOHO_CODE, p_RHPLAHO_CTLG_CODE)
                t = Nothing
            Case "RH"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim t As New Nomade.NS.NSGestionhorarioempleado("Bn")
                dt = t.ListarHorarioEmpleado(CODE, EMPL_PIDM, IIf(p_RHPLAHO_CTLG_CODE Is Nothing, String.Empty, p_RHPLAHO_CTLG_CODE), String.Empty)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODE"" :" & """" & dt.Rows(0)("CODE") & """,")
                    resb.Append("""EMPL_PIDM"" :" & """" & dt.Rows(0)("EMPL_PIDM") & """,")
                    resb.Append("""NOMBRE_PERSONA"" :" & """" & dt.Rows(0)("NOMBRE_PERSONA") & """,")
                    resb.Append("""FECHA_INICIO"" :" & """" & dt.Rows(0)("FECHA_INICIO") & """,")
                    resb.Append("""FECHA_LIMITE"" :" & """" & dt.Rows(0)("FECHA_LIMITE") & """,")
                    resb.Append("""INC_FERIADOS_IND"" :" & """" & dt.Rows(0)("INC_FERIADOS_IND") & """,")
                    resb.Append("""ESTADO_IND"" :" & """" & dt.Rows(0)("ESTADO_IND") & """,")
                    resb.Append("""ZOHO_CODE"" :" & """" & dt.Rows(0)("ZOHO_CODE") & """,")
                    resb.Append("""CTLG_CODE"" :" & """" & dt.Rows(0)("CTLG_CODE") & """,")
                    resb.Append("""NESTADO_IND"" :" & """" & dt.Rows(0)("NESTADO_IND") & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                End If
                t = Nothing
            Case "3"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim dh As New Nomade.NS.NSGestionhorarioempleado("Bn")
                dt = dh.ListarHorarioEmpleadoDetalle(CODE, 0, "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""HOEC_CODE"" :" & """" & MiDataRow("HOEC_CODE") & """,")
                        resb.Append("""SEQ"" :" & """" & MiDataRow("SEQ") & """,")
                        resb.Append("""HORA_INICIO"" :" & """" & MiDataRow("HORA_INICIO") & """,")
                        resb.Append("""HORA_FIN"" :" & """" & MiDataRow("HORA_FIN") & """,")
                        resb.Append("""LUNES_IND"" :" & """" & MiDataRow("LUNES_IND") & """,")
                        resb.Append("""NLUNES_IND"" :" & """" & MiDataRow("NLUNES_IND") & """,")
                        resb.Append("""MARTES_IND"" :" & """" & MiDataRow("MARTES_IND") & """,")
                        resb.Append("""NMARTES_IND"" :" & """" & MiDataRow("NMARTES_IND") & """,")
                        resb.Append("""MIERCOLES_IND"" :" & """" & MiDataRow("MIERCOLES_IND") & """,")
                        resb.Append("""NMIERCOLES_IND"" :" & """" & MiDataRow("NMIERCOLES_IND") & """,")
                        resb.Append("""JUEVES_IND"" :" & """" & MiDataRow("JUEVES_IND") & """,")
                        resb.Append("""NJUEVES_IND"" :" & """" & MiDataRow("NJUEVES_IND") & """,")
                        resb.Append("""VIERNES_IND"" :" & """" & MiDataRow("VIERNES_IND") & """,")
                        resb.Append("""NVIERNES_IND"" :" & """" & MiDataRow("NVIERNES_IND") & """,")
                        resb.Append("""SABADO_IND"" :" & """" & MiDataRow("SABADO_IND") & """,")
                        resb.Append("""NSABADO_IND"" :" & """" & MiDataRow("NSABADO_IND") & """,")
                        resb.Append("""DOMINGO_IND"" :" & """" & MiDataRow("DOMINGO_IND") & """,")
                        resb.Append("""NDOMINGO_IND"" :" & """" & MiDataRow("NDOMINGO_IND") & """,")
                        resb.Append("""ZOHO_CODE"" :" & """" & MiDataRow("ZOHO_CODE") & """,")
                        resb.Append("""NZOHO_CODE"" :" & """" & MiDataRow("NZOHO_CODE") & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
                dh = Nothing
            Case "CHD"
                context.Response.ContentType = "text/html"
                Dim t As New Nomade.NS.NSGestionhorarioempleado("Bn")
                res = t.CrearHorarioDetalle(HOEC_CODE, HORA_INICIO, HORA_FIN, LUNES_IND, MARTES_IND, MIERCOLES_IND, JUEVES_IND, VIERNES_IND, SABADO_IND, DOMINGO_IND, ESTADO_IND, USUA_ID)
                t = Nothing
            Case "CBD"
                context.Response.ContentType = "text/html"
                Dim t As New Nomade.NS.NSGestionhorarioempleado("Bn")
                res = t.Crear_Break_Detalle(HOEC_CODE, HORA_INICIO, HORA_FIN, LUNES_IND, MARTES_IND, MIERCOLES_IND, JUEVES_IND, VIERNES_IND, SABADO_IND, DOMINGO_IND, ESTADO_IND, USUA_ID)
                t = Nothing
            Case "EHD"
                context.Response.ContentType = "text/html"
                Dim t As New Nomade.NS.NSGestionhorarioempleado("Bn")
                res = t.EliminarHorarioDetalle(HOEC_CODE, SEQ)
                t = Nothing
            Case "EBD"
                context.Response.ContentType = "text/html"
                Dim t As New Nomade.NS.NSGestionhorarioempleado("Bn")
                res = t.Eliminar_Break_Detalle(HOEC_CODE)
                t = Nothing
            Case "LCP"
                dt = PlantillaHorario.Listar_Plantilla_Horario(String.Empty, p_RHPLAHO_CTLG_CODE, "A")
                resb.Append("<div class='span2'>")
                resb.Append("<div class='control-group'>")
                resb.Append("<label class='control-label' for='cboPlantilla'>")
                resb.Append("Plantilla</label>")
                resb.Append("</div>")
                resb.Append("</div>")
                resb.Append("<div class='span10'>")
                resb.Append("<select id='cboPlantilla' class='span10' onchange='javascript:Valor();'>")
                If Not (dt Is Nothing) Then
                    For I = 0 To dt.Rows.Count - 1
                        resb.Append("<option value='" & dt.Rows(I)("RHPLAHO_CODE").ToString & "'>" & dt.Rows(I)("RHPLAHO_NOMBRE").ToString & "</option>")
                    Next
                End If
                resb.Append("</select>")
                resb.Append("</div>")
                res = resb.ToString()
            Case "LDP"
                dt = PlantillaHorario.Listar_Detalle_Plantilla_Horario(p_RHDEPL_RHPLAHO_CODE)

                resb.Append("<table id='tblHorario' border='0' class='display DTTT_selectable' >")
                resb.Append("<thead>")
                resb.Append("<tr>")
                resb.Append("<td style='display:none;'>Código</td>")
                resb.Append("<td style='display:none;'></td>")
                resb.Append("<td style='display:none;'></td>")
                resb.Append("<td>Hora Inicio</td>")
                resb.Append("<td>Hora Fin</td>")
                resb.Append("<td>Lun.</td>")
                resb.Append("<td>Mar.</td>")
                resb.Append("<td>Miér.</td>")
                resb.Append("<td>Juev.</td>")
                resb.Append("<td>Vier.</td>")
                resb.Append("<td>Sáb.</td>")
                resb.Append("<td>Dom.</td>")
                resb.Append("<td style='display:none;'></td>")
                resb.Append("<td style='display:none;'></td>")
                resb.Append("<td style='display:none;'></td>")
                resb.Append("</tr>")
                resb.Append("</thead>")

                resb.Append("</tbody>")



                If Not (dt Is Nothing) Then
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("<tr>")
                        resb.Append("<td style='display:none;'>" & MiDataRow("RHDEPLA_CODE").ToString & "</td>")
                        resb.Append("<td style='display:none;'>" & MiDataRow("RHDEPLA_RHPLAHO_CODE").ToString & "</td>")
                        resb.Append("<td style='display:none;'>" & MiDataRow("RHDEPLA_SEQ").ToString & "</td>")
                        resb.Append("<td>" & MiDataRow("RHDEPLA_HORA_INICIO").ToString & "</td>")
                        resb.Append("<td>" & MiDataRow("RHDEPLA_HORA_FIN").ToString & "</td>")
                        resb.Append("<td>" & pfdevuelvoIcono(MiDataRow("RHDEPLA_LUNES_IND").ToString) & "</td>")
                        resb.Append("<td>" & pfdevuelvoIcono(MiDataRow("RHDEPLA_MARTES_IND").ToString) & "</td>")
                        resb.Append("<td>" & pfdevuelvoIcono(MiDataRow("RHDEPLA_MIERCOLES_IND").ToString) & "</td>")
                        resb.Append("<td>" & pfdevuelvoIcono(MiDataRow("RHDEPLA_JUEVES_IND").ToString) & "</td>")
                        resb.Append("<td>" & pfdevuelvoIcono(MiDataRow("RHDEPLA_VIERNES_IND").ToString) & "</td>")
                        resb.Append("<td>" & pfdevuelvoIcono(MiDataRow("RHDEPLA_SABADO_IND").ToString) & "</td>")
                        resb.Append("<td>" & pfdevuelvoIcono(MiDataRow("RHDEPLA_DOMINGO_IND").ToString) & "</td>")
                        resb.Append("<td style='display:none;'>" & MiDataRow("RHDEPLA_ESTADO_IND").ToString & "</td>")
                        resb.Append("<td style='display:none;'>" & MiDataRow("RHDEPLA_USUA_ID").ToString & "</td>")
                        resb.Append("<td style='display:none;'>" & MiDataRow("RHDEPLA_FECHA_ACTV").ToString & "</td>")
                        resb.Append("</tr>")
                    Next
                End If
                resb.Append("</tbody>")
                resb.Append("</table>")
                res = resb.ToString()
            Case "C"
                'context.Response.ContentType = "text/html"                
                res = PlantillaHorario.Crear_Horario_Plantilla(p_RHDEPL_RHPLAHO_CODE, p_PEBHOED_HOEC_CODE, String.Empty)
            Case "LPE"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim c As New NOMADE.NS.NSGestionhorarioempleado("Bn")
                dt = c.ListarHorarioEmpleado(String.Empty, 0, p_RHPLAHO_CTLG_CODE, p_ESTADO)
                If Not dt Is Nothing Then
                    resb.Append("[")

                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODE"":""" & row("CODE").ToString & """,")
                        resb.Append("""NOMBRE_PERSONA"":""" & row("NOMBRE_PERSONA").ToString & """,")
                        resb.Append("""FECHA_INICIO"":{""display"":""" & row("FECHA_INICIO").ToString & """,""order"":""" & String.Join("", row("FECHA_INICIO").ToString.Split("/").Reverse()) & """},")
                        resb.Append("""FECHA_LIMITE"":{""display"":""" & row("FECHA_LIMITE").ToString & """,""order"":""" & String.Join("", row("FECHA_LIMITE").ToString.Split("/").Reverse()) & """},")
                        resb.Append("""NESTADO_IND"":""" & row("NESTADO_IND").ToString & """")
                        resb.Append("},")

                    Next

                    resb.Append("-")
                    resb.Replace("},-", "}")

                    resb.Append("]")
                End If
                res = resb.ToString()
                c = Nothing
            Case "6"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim e As New Nomade.NS.NSGestionhorarioempleado("Bn")
                dt = e.Listar_Break_Empleado_Detalle(IIf(HOEC_CODE = Nothing, "", HOEC_CODE), IIf(SEQ = Nothing, "0", SEQ), IIf(ESTADO_IND = Nothing, "", ESTADO_IND))
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("HOEC_CODE").ToString & """,")
                        resb.Append("""HORA_INICIO"" :" & """" & MiDataRow("HORA_INICIO").ToString & """,")
                        resb.Append("""HORA_FIN"" :" & """" & MiDataRow("HORA_FIN").ToString & """,")
                        resb.Append("""LUNES"" :" & """" & MiDataRow("NLUNES_IND").ToString & """,")
                        resb.Append("""MARTES"" :" & """" & MiDataRow("NMARTES_IND").ToString & """,")
                        resb.Append("""MIERCOLES"" :" & """" & MiDataRow("NMIERCOLES_IND").ToString & """,")
                        resb.Append("""JUEVES"" :" & """" & MiDataRow("NJUEVES_IND").ToString & """,")
                        resb.Append("""VIERNES"" :" & """" & MiDataRow("NVIERNES_IND").ToString & """,")
                        resb.Append("""SABADO"" :" & """" & MiDataRow("NSABADO_IND").ToString & """,")
                        resb.Append("""DOMINGO"" :" & """" & MiDataRow("NDOMINGO_IND").ToString & """,")
                        resb.Append("""ZONA_HORARIA"" :" & """" & MiDataRow("NZOHO_CODE").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
                e = Nothing
            Case Else
        End Select
        context.Response.Write(res)




    End Sub
    Public Function pfdevuelvoIcono(ByVal cTexto As String) As String
        Dim cResultado As String = ""
        If cTexto = "S" Then
            cResultado = "<i class='icon-ok-sign' title='Sí'></i>"
        Else
            cResultado = "<i class='icon-ban-circle' title='No'></i>"
        End If
        Return cResultado
    End Function
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class