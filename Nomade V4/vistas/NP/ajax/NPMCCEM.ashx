<%@ WebHandler Language="VB" Class="NPMCCEM" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NPMCCEM : Implements IHttpHandler

    Dim OPCION, CTLG_CODE, SCSL_CODE, PTVCECD_CODE, PORCENTAJE, USUARIO, NRO_CONTRATO, CECC_CODE As String
    Dim PIDM As String

    Dim res As String
    Dim dt As DataTable
    Dim resb As New StringBuilder
    Dim resArray As Array

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Try

            'context.Response.ContentType = "text/plain"
            'context.Response.Write("Hello World")
            OPCION = context.Request("OPCION")
            CTLG_CODE = context.Request("CTLG_CODE")
            SCSL_CODE = context.Request("SCSL_CODE")
            PIDM = context.Request("PIDM")
            PTVCECD_CODE = context.Request("PTVCECD_CODE")
            PORCENTAJE = context.Request("PORCENTAJE")
            USUARIO = context.Request("USUARIO")
            NRO_CONTRATO = context.Request("NRO_CONTRATO")
            CECC_CODE = context.Request("CECC_CODE")

            Select Case OPCION.ToString()

                Case "1"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    Dim pemp As New Nomade.NC.NCEEmpleado("BN")
                    dt = pemp.Lista_Empl_Centro_Costos(PIDM, Nothing, Nothing)
                    res = GenerarTablaCentroCosto(dt)
                Case "1.5" 'PARA NPLCCEM
                    context.Response.ContentType = "application/text; charset=utf-8"
                    Dim pemp As New Nomade.NC.NCEEmpleado("BN")
                    dt = pemp.Lista_Empl_Centro_Costos(PIDM, CTLG_CODE, SCSL_CODE)
                    If Not (dt Is Nothing) Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                Case "2"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim pemp As New Nomade.NF.NFPeriodo("BN")
                    dt = pemp.Listar_Periodo("", "", "")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""ANO"" :" & """" & MiDataRow("ANO").ToString & """,")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""MES"" :" & """" & MiDataRow("MES").ToString & """,")
                            resb.Append("""NUMERO_MES"" :" & """" & MiDataRow("NUMERO_MES").ToString & """")
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
                    Dim e As New Nomade.NC.NCEEmpleado("Bn")



                    resArray = e.Crear_Centro_Costo_Empl(PIDM, PTVCECD_CODE, PORCENTAJE, USUARIO, NRO_CONTRATO, CECC_CODE)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""SUCCESS"" :" & """" & resArray(0).ToString & """,")
                    resb.Append("""VALIDACION"" :" & """" & resArray(1).ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()

                Case "4"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim e As New Nomade.NC.NCEEmpleado("Bn")

                    resArray = e.Eliminar_Centro_Costo_Empl(PIDM, NRO_CONTRATO, CECC_CODE, PTVCECD_CODE)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""SUCCESS"" :" & """" & resArray(0).ToString & """,")
                    resb.Append("""VALIDACION"" :" & """" & resArray(1).ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                Case "OBT"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim e As New Nomade.NC.NCEEmpleado("Bn")
                    Dim dt As New DataTable()
                    dt = e.Obtener_Niveles_Centros_Costos(CTLG_CODE)
                    'res = GenerarCombosNiveles(dt)
                    resb.Clear()

                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("ptvcecc_code").ToString & """,")
                            resb.Append("""NOMBRE_PLAN"" :" & """" & MiDataRow("ptvcecc_nombre_plan").ToString & """,")
                            resb.Append("""NIVELES"" :" & """" & MiDataRow("ptvcecc_niveles").ToString & """,")
                            resb.Append("""CECD_CODIGO"" :" & """" & MiDataRow("ptvcecd_code").ToString & """,")
                            resb.Append("""DESC"" :" & """" & MiDataRow("ptvcecd_desc").ToString & """,")
                            resb.Append("""NIVEL"" :" & """" & MiDataRow("PTVCECD_NIVEL").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = ""
                    res = resb.ToString
            End Select

            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write(ex.ToString)
        End Try
    End Sub
    Public Function GenerarCombosNiveles(ByVal dt As DataTable) As String
        res = ""
        resb.Clear()
        Dim iNivel As Integer = Convert.ToInt32(dt.Rows(0)("ptvcecc_niveles").ToString())

        For j As Integer = 1 To iNivel
            resb.AppendFormat("<div class='span1'>Nivel" + j.ToString + " </div>")
            resb.AppendFormat("<div class='span2'>")
            resb.AppendFormat("<select id='cboNivel_" + j.ToString())
            For i As Integer = 0 To dt.Rows.Count - 1
                'resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CCD_CODE").ToString())
                If j = Convert.ToInt32(dt.Rows(i)("PTVCECD_NIVEL").ToString()) Then
                    resb.AppendFormat("<option value=" + dt.Rows(i)("ptvcecd_code").ToString() + ">" + dt.Rows(i)("ptvcecd_desc").ToString() + "</option>")
                End If
            Next
            resb.AppendFormat("</div>")
            resb.AppendFormat("</select>")
        Next
        res = resb.ToString
        Return res
    End Function

    Public Function GenerarTablaCentroCosto(ByVal dt As DataTable) As String


        res = ""
        resb.Clear()
        '------
        resb.AppendFormat("<table id=""tblCentroCostos"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th>CC_CODE</th>")
        resb.AppendFormat("<th>CODIGO</th>")
        resb.AppendFormat("<th>CENTRO COSTO</th>")
        resb.AppendFormat("<th>PORCENTAJE %</th>")
        resb.AppendFormat("<th></th>")
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
            resb.AppendFormat("</tr>")
        Else
            'CCVal = dt.Rows(0)("CC_CODE").ToString()
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CC_CODE").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CCD_CODE").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CENTRO_COSTO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("PORCENTAJE").ToString())
                resb.AppendFormat("<td style='text-align:center;'>")
                resb.AppendFormat("<a class='btn red' onclick=""eliminaCentroCosto('{0}','{1}')""><i class='icon-trash'></i></a>", dt.Rows(i)("CC_CODE").ToString(), dt.Rows(i)("CCD_CODE").ToString())
                resb.AppendFormat("</td>")
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