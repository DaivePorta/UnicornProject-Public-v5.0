<%@ WebHandler Language="VB" Class="NPMEMCO" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NPMEMCO : Implements IHttpHandler

    Dim OPCION, PIDM, CTLG_CODE, SCSL_CODE, ESTADO_IND, CONT_FECHA_INI, CONT_FECHA_FIN,
        TICO_CODE, TITR_CODE, TMOF_CODE, CARG_CODE, REM_BASICA, MOVILIDAD,
        VIATICOS, REFRIGERIO, BONIFICACION_RIESGO_CAJA, BONO_PRODUCTIVIDAD, ASIG_FAM_IND, ASIG_FAM, REM_TOTAL, USUA_ID, MOTIVO_CESE, CONT_FECHA_CESE, NUMERO,
        RHREGLA_CODE, RENOV_IND, sCodigo As String

    Dim res As String
    Dim dt As DataTable
    Dim resb As New StringBuilder
    Dim resArray As Array

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        'context.Response.ContentType = "text/plain"
        'context.Response.Write("Hello World")
        OPCION = context.Request("OPCION")
        CTLG_CODE = context.Request("CTLG_CODE")
        SCSL_CODE = context.Request("SCSL_CODE")
        ESTADO_IND = context.Request("ESTADO_IND")
        PIDM = context.Request("PIDM")
        CONT_FECHA_INI = context.Request("CONT_FECHA_INI")
        CONT_FECHA_FIN = context.Request("CONT_FECHA_FIN")
        TICO_CODE = context.Request("TICO_CODE")
        TITR_CODE = context.Request("TITR_CODE")
        TMOF_CODE = context.Request("TMOF_CODE")
        CARG_CODE = context.Request("CARG_CODE")
        REM_BASICA = context.Request("REM_BASICA")
        MOVILIDAD = context.Request("MOVILIDAD")
        VIATICOS = context.Request("VIATICOS")
        REFRIGERIO = context.Request("REFRIGERIO")
        BONIFICACION_RIESGO_CAJA = context.Request("BONIFICACION_RIESGO_CAJA")
        BONO_PRODUCTIVIDAD = context.Request("BONO_PRODUCTIVIDAD")
        ASIG_FAM_IND = context.Request("ASIG_FAM_IND")
        ASIG_FAM = context.Request("ASIG_FAM")
        REM_TOTAL = context.Request("REM_TOTAL")
        USUA_ID = context.Request("USUA_ID")
        MOTIVO_CESE = context.Request("MOTIVO_CESE")
        CONT_FECHA_CESE = context.Request("CONT_FECHA_CESE")
        NUMERO = context.Request("NUMERO")
        RHREGLA_CODE = context.Request("RHREGLA_CODE")
        RENOV_IND = context.Request("RENOV_IND")
        sCodigo = IIf(context.Request("sCodigo") Is Nothing, "", context.Request("sCodigo"))

        Select Case OPCION.ToString()

            Case "LEMP" 'Lista Info Empleado
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pemp As New Nomade.NC.NCEEmpleado("BN")
                dt = pemp.Listar_Empleados(PIDM, "0", ESTADO_IND, CTLG_CODE, SCSL_CODE, String.Empty)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                        resb.Append("""NOMBRE_EMPLEADO"" :" & """" & MiDataRow("NOMBRE_EMPLEADO").ToString & """,")
                        resb.Append("""DNI"" :" & """" & MiDataRow("DNI").ToString & """,")
                        resb.Append("""RUC"" :" & """" & MiDataRow("RUC").ToString & """,")
                        resb.Append("""DIRECCION"" :" & """" & MiDataRow("DIRECCION").ToString & """,")
                        resb.Append("""SEQ"" :" & """" & MiDataRow("SEQ").ToString & """,")
                        resb.Append("""CARGO_CODE"" :" & """" & MiDataRow("CARGO_CODE").ToString & """,")
                        resb.Append("""CARGO"" :" & """" & MiDataRow("CARGO").ToString & """,")
                        resb.Append("""ESTADO_IND"" :" & """" & MiDataRow("ESTADO_IND").ToString & """,")
                        resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO").ToString & """,")
                        resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                        resb.Append("""CTLG_DESC_CORTA"" :" & """" & MiDataRow("CTLG_DESC_CORTA").ToString & """,")
                        resb.Append("""SCSL_CODE"" :" & """" & MiDataRow("SCSL_CODE").ToString & """,")
                        resb.Append("""SCSL_DESC"" :" & """" & MiDataRow("SCSL_DESC").ToString & """,")
                        resb.Append("""OCUP_CODE"" :" & """" & MiDataRow("OCUP_CODE").ToString & """,")
                        resb.Append("""OCUPACION"" :" & """" & MiDataRow("OCUPACION").ToString & """,")
                        resb.Append("""NIED_CODE"" :" & """" & MiDataRow("NIED_CODE").ToString & """,")
                        resb.Append("""NIVEL_ED"" :" & """" & MiDataRow("NIVEL_ED").ToString & """,")
                        resb.Append("""FECHA_INGRESO"" :" & """" & MiDataRow("FECHA_INGRESO").ToString & """,")
                        resb.Append("""REG_SALUD"" :" & """" & MiDataRow("REG_SALUD").ToString & """,")
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
                context.Response.ContentType = "application/text; charset=utf-8"
                Dim pemp As New Nomade.NC.NCEEmpleado("BN")
                dt = pemp.Lista_Contrato_Empl(IIf(PIDM = "", "0", PIDM), CTLG_CODE, SCSL_CODE, ESTADO_IND)
                res = GenerarTablaContratos(dt)
            Case "3" 'Lista Modalidad Formativa
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pemp As New Nomade.NC.NCModalidadForm("BN")
                dt = pemp.Listar_ModalidadFormativa("", "", "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("Codigo").ToString & """,")
                        resb.Append("""CODIGO_SUNAT"" :" & """" & MiDataRow("Codigo_Sunat").ToString & """,")
                        resb.Append("""NOMBRE"" :" & """" & MiDataRow("Descripcion").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "4" 'Tipo Trabajador
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pemp As New Nomade.NC.NCTipoTR("BN")
                dt = pemp.Listar_tipoTrab("", "", "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("Codigo").ToString & """,")
                        resb.Append("""CODIGO_SUNAT"" :" & """" & MiDataRow("Codigo_Sunat").ToString & """,")
                        resb.Append("""NOMBRE"" :" & """" & MiDataRow("Descripcion").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "5" 'Cargo
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pemp As New Nomade.NS.NSCargos("BN")
                dt = pemp.ListarCargo("", "A", "")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""NOMBRE"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "6" 'Motivo Cese
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pemp As New Nomade.NC.NCEEmpleado("BN")
                dt = pemp.Listar_MotivoCese("", "", "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""CODIGO_SUNAT"" :" & """" & MiDataRow("CODIGO_SUNAT").ToString & """,")
                        resb.Append("""NOMBRE"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "7" 'Nuevo Contrato
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim e As New Nomade.NC.NCEEmpleado("Bn")


                CONT_FECHA_INI = Utilities.fechaLocal(CONT_FECHA_INI)
                CONT_FECHA_FIN = Utilities.fechaLocal(CONT_FECHA_FIN)

                resArray = e.Crear_Contrato(PIDM, CTLG_CODE, SCSL_CODE, CONT_FECHA_INI, CONT_FECHA_FIN, TICO_CODE, TITR_CODE, TMOF_CODE, CARG_CODE, REM_BASICA,
                                            MOVILIDAD, VIATICOS, REFRIGERIO, BONIFICACION_RIESGO_CAJA, BONO_PRODUCTIVIDAD, ASIG_FAM_IND, ASIG_FAM, REM_TOTAL, ESTADO_IND, USUA_ID, RHREGLA_CODE, RENOV_IND)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""SUCCESS"" :" & """" & resArray(0).ToString & """,")
                resb.Append("""NRO_CONTRATO"" :" & """" & resArray(1).ToString & """,")
                resb.Append("""VALIDACION"" :" & """" & resArray(2).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()

            Case "8" 'Actualiza Contrato
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim e As New Nomade.NC.NCEEmpleado("Bn")


                CONT_FECHA_INI = Utilities.fechaLocal(CONT_FECHA_INI)
                CONT_FECHA_FIN = Utilities.fechaLocal(CONT_FECHA_FIN)
                CONT_FECHA_CESE  = Utilities.fechaLocal(CONT_FECHA_CESE)

                resArray = e.Actualizar_Contrato(PIDM, CTLG_CODE, SCSL_CODE, CONT_FECHA_INI, CONT_FECHA_FIN, TICO_CODE, TITR_CODE, TMOF_CODE, CARG_CODE, REM_BASICA,
                                            MOVILIDAD, VIATICOS, REFRIGERIO, BONIFICACION_RIESGO_CAJA, BONO_PRODUCTIVIDAD, REM_TOTAL, ESTADO_IND, USUA_ID, MOTIVO_CESE, CONT_FECHA_CESE, RHREGLA_CODE)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""SUCCESS"" :" & """" & resArray(0).ToString & """,")
                resb.Append("""NRO_CONTRATO"" :" & """" & resArray(1).ToString & """,")
                resb.Append("""VALIDACION"" :" & """" & resArray(2).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()

            Case "9" 'Lista Datos del Contrato del empleado
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pemp As New Nomade.NC.NCEEmpleado("BN")
                dt = pemp.Lista_Contrato_Empl(PIDM, CTLG_CODE, SCSL_CODE, ESTADO_IND, NUMERO)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                        resb.Append("""NOMBRE_EMPLEADO"" :" & """" & MiDataRow("NOMBRE_EMPLEADO").ToString & """,")
                        resb.Append("""SECUENCIA"" :" & """" & MiDataRow("SECUENCIA").ToString & """,")
                        resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                        resb.Append("""SCSL_CODE"" :" & """" & MiDataRow("SCSL_CODE").ToString & """,")
                        resb.Append("""NRO"" :" & """" & MiDataRow("NRO").ToString & """,")
                        resb.Append("""FECHA_INI"" :" & """" & MiDataRow("FECHA_INI").ToString & """,")
                        resb.Append("""FECHA_FIN"" :" & """" & MiDataRow("FECHA_FIN").ToString & """,")
                        resb.Append("""TICO_CODE"" :" & """" & MiDataRow("TICO_CODE").ToString & """,")
                        resb.Append("""TICO_DESC"" :" & """" & MiDataRow("TICO_DESC").ToString & """,")
                        resb.Append("""FECHA_CESE"" :" & """" & MiDataRow("FECHA_CESE").ToString & """,")
                        resb.Append("""MOTIVO_CESE_CODE"" :" & """" & MiDataRow("MOTIVO_CESE_CODE").ToString & """,")
                        resb.Append("""MOTIVO_CESE_DESC"" :" & """" & MiDataRow("MOTIVO_CESE_DESC").ToString & """,")
                        resb.Append("""TITR_CODE"" :" & """" & MiDataRow("TITR_CODE").ToString & """,")
                        resb.Append("""TITR_DESC"" :" & """" & MiDataRow("TITR_DESC").ToString & """,")
                        resb.Append("""TMOF_CODE"" :" & """" & MiDataRow("TMOF_CODE").ToString & """,")
                        resb.Append("""TMOF_DESC"" :" & """" & MiDataRow("TMOF_DESC").ToString & """,")
                        resb.Append("""CARG_CODE"" :" & """" & MiDataRow("CARG_CODE").ToString & """,")
                        resb.Append("""CARG_DESC"" :" & """" & MiDataRow("CARG_DESC").ToString & """,")
                        resb.Append("""REM_BASICA"" :" & """" & MiDataRow("REM_BASICA").ToString & """,")
                        resb.Append("""MOVILIDAD"" :" & """" & MiDataRow("MOVILIDAD").ToString & """,")
                        resb.Append("""VIATICOS"" :" & """" & MiDataRow("VIATICOS").ToString & """,")
                        resb.Append("""REFRIGERIO"" :" & """" & MiDataRow("REFRIGERIO").ToString & """,")
                        resb.Append("""BONIFICACION_RIESGO_CAJA"" :" & """" & MiDataRow("BONIFICACION_RIESGO_CAJA").ToString & """,")
                        resb.Append("""BONO_PRODUCTIVIDAD"" :" & """" & MiDataRow("BONO_PRODUCTIVIDAD").ToString & """,")
                        resb.Append("""REM_TOTAL"" :" & """" & MiDataRow("REM_TOTAL").ToString & """,")
                        resb.Append("""ESTADO_IND"" :" & """" & MiDataRow("ESTADO_IND").ToString & """,")
                        resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO").ToString & """,")
                        resb.Append("""REGLAB_CODE"" :" & """" & MiDataRow("REGLAB_CODE").ToString & """,")
                        resb.Append("""REGLAB_DESC"" :" & """" & MiDataRow("REGLAB_DESC").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()

            Case "10" 'Régimen Laboral
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pemp As New Nomade.NC.NCRegimenLaboral("BN")
                dt = pemp.ListarRegimenLaboral("", "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""ORDEN"" :" & """" & MiDataRow("ORDEN").ToString & """,")
                        resb.Append("""ACRONIMO"" :" & """" & MiDataRow("ACRONIMO").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "11" 'Lista Empleados con contrato Activo
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pemp As New NOMADE.NC.NCEEmpleado("BN")
                dt = pemp.Listar_Empleados_Contrato_Activo(CTLG_CODE, SCSL_CODE)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                        resb.Append("""NOMBRE_EMPLEADO"" :" & """" & MiDataRow("NOMBRE_EMPLEADO").ToString & """,")
                        resb.Append("""HORAS_CONTRATO"" :" & """" & MiDataRow("HORAS_CONTRATO").ToString & """,")
                        resb.Append("""REM_BASICA"" :" & """" & MiDataRow("REM_BASICA").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()

            Case "LECO" 'Lista Estado de Contrato
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pemp As New Nomade.NC.NCEEmpleado("BN")
                dt = pemp.fnListarEstadoContrato(sCodigo, IIf(ESTADO_IND Is Nothing, "", ESTADO_IND))
                If Not (dt Is Nothing) Then
                    res = Utilities.DataTableToJSON(dt)
                Else
                    res = "[]"
                End If


        End Select

        context.Response.Write(res)
    End Sub

    Public Function GenerarTablaContratos(ByVal dt As DataTable) As String


        res = ""
        resb.Clear()
        '------
        resb.AppendFormat("<table id=""tblContratos"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th>PIDM</th>")
        resb.AppendFormat("<th>NRO</th>")
        resb.AppendFormat("<th>EMPLEADO</th>")
        resb.AppendFormat("<th>CARGO</th>")
        resb.AppendFormat("<th>EMPRESA</th>")
        resb.AppendFormat("<th>SUCURSAL</th>")
        resb.AppendFormat("<th>REG. LAB</th>")
        resb.AppendFormat("<th>FECHA INICIO</th>")
        resb.AppendFormat("<th>FECHA FIN</th>")
        resb.AppendFormat("<th>FECHA CESE</th>")
        resb.AppendFormat("<th>SUELDO</th>")
        resb.AppendFormat("<th>ESTADO CONTRATO</th>")
        resb.AppendFormat("<th>CTLG_CODE</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        'Dim CCVal As String
        'CCVal = ""
        If (dt Is Nothing) Then
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'>NO HAY DATOS DISPONIBLES</td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center';> </td>")
            resb.AppendFormat("<td style='text-align:center';> </td>")
            resb.AppendFormat("</tr>")
        Else
            'CCVal = dt.Rows(0)("CC_CODE").ToString()
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("PIDM").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NRO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NOMBRE_EMPLEADO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CARG_DESC").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CTLG_DESC").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("SCSL_DESC").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("REGLAB_DESC").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("FECHA_INI").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("FECHA_FIN").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("FECHA_CESE").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("REM_BASICA").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ESTADO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CTLG_CODE").ToString())
                'resb.AppendFormat("<td style='text-align:center;'>")
                'resb.AppendFormat("<a class='btn red' onclick=""eliminaCentroCosto('{0}','{1}')""><i class='icon-trash'></i></a>", dt.Rows(i)("CC_CODE").ToString(), dt.Rows(i)("CCD_CODE").ToString())
                'resb.AppendFormat("</td>")
                resb.AppendFormat("</tr>")
            Next
        End If

        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        'resb.AppendFormat("<input type='hidden' id='hfCTLG_CODE' value= '{0}'/>", CCVal)
        res = resb.ToString()
        Return res

    End Function


    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class