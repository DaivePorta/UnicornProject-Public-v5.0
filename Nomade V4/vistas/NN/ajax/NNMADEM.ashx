<%@ WebHandler Language="VB" Class="NNMADEM" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NNMADEM : Implements IHttpHandler
    Dim OPCION, PIDM, MES, ANIO, CTLG_CODE, SCSL_CODE, USUA_ID, ESTADO_IND, MONTO,
        MONE_CODE, MOTIVO, CODE, NRO_DOC, TOPE, DETALLE As String

    Dim res As String
    Dim dt As DataTable
    Dim resb As New StringBuilder
    Dim resArray As Array


    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        PIDM = context.Request("PIDM")
        MES = context.Request("MES")
        ANIO = context.Request("ANIO")
        CTLG_CODE = IIf(context.Request("CTLG_CODE") Is Nothing, "", context.Request("CTLG_CODE"))
        SCSL_CODE = IIf(context.Request("SCSL_CODE") Is Nothing, "", context.Request("SCSL_CODE"))
        USUA_ID = context.Request("USUA_ID")
        ESTADO_IND = context.Request("ESTADO_IND")
        MONTO = context.Request("MONTO")
        MONE_CODE = context.Request("MONE_CODE")
        MOTIVO = context.Request("MOTIVO")
        CODE = context.Request("CODE")
        NRO_DOC = context.Request("NRO_DOC")
        TOPE = context.Request("TOPE")
        DETALLE = context.Request("DETALLE")

        Select OPCION.ToString()

            Case "1" 'Lista Adelantos
                context.Response.ContentType = "application/text; charset=utf-8"
                Dim pad As New Nomade.NN.NNAdelantoSueldo("BN")
                dt = pad.ListarAdelanto(IIf(PIDM = "", "0", PIDM), MES, ANIO, ESTADO_IND, CODE, CTLG_CODE, SCSL_CODE)
                res = GenerarTablaAdelantos(dt)
            Case "2" 'Lista Moneda Base  y Alterna 
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pemp As New Nomade.GL.GLLetras("BN")
                dt = pemp.ListarMoneda("")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                        resb.Append("""TIPO"" :" & """" & MiDataRow("TIPO").ToString & """,")
                        resb.Append("""SIMBOLO"" :" & """" & MiDataRow("SIMBOLO").ToString & """,")
                        resb.Append("""DESC_CORTA"" :" & """" & MiDataRow("DESC_CORTA").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "3" 'lista empresas
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pad As New Nomade.NC.NCEmpresa("BN")
                dt = pad.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                If Not (dt Is Nothing) Then
                    dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                        resb.Append("""TOPE_ADEL"" :" & """" & MiDataRow("TOPE_ADEL").ToString & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "4" 'Crea Adelanto
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim e As New Nomade.NN.NNAdelantoSueldo("Bn")


                resArray = e.Crear_Adelanto(PIDM, CTLG_CODE, SCSL_CODE, MONTO, MONE_CODE, MOTIVO, USUA_ID, TOPE)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""SUCCESS"" :" & """" & resArray(0).ToString & """,")
                resb.Append("""NRO"" :" & """" & resArray(1).ToString & """,")
                resb.Append("""VALIDACION"" :" & """" & resArray(2).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()
            Case "5" 'Actualiza Adelanto
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim e As New Nomade.NN.NNAdelantoSueldo("Bn")

                resArray = e.Actualizar_Adelanto(PIDM, NRO_DOC, MONTO, MONE_CODE, MOTIVO, USUA_ID, TOPE)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""SUCCESS"" :" & """" & resArray(0).ToString & """,")
                resb.Append("""NRO"" :" & """" & resArray(1).ToString & """,")
                resb.Append("""VALIDACION"" :" & """" & resArray(2).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()

            Case "6" 'Lista Datos del Adelanto
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pad As New Nomade.NN.NNAdelantoSueldo("BN")
                dt = pad.ListarAdelanto(IIf(PIDM = "", "0", PIDM), MES, ANIO, ESTADO_IND, CODE, "", "")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""NRO_DOCUMENTO"" :" & """" & MiDataRow("NRO_DOCUMENTO").ToString & """,")
                        resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                        resb.Append("""NOMBRE_EMPLEADO"" :" & """" & MiDataRow("NOMBRE_EMPLEADO").ToString & """,")
                        resb.Append("""FECHA_REG"" :" & """" & MiDataRow("FECHA_REG").ToString & """,")
                        resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                        resb.Append("""SCSL_CODE"" :" & """" & MiDataRow("SCSL_CODE").ToString & """,")
                        resb.Append("""MONTO"" :" & """" & MiDataRow("MONTO").ToString & """,")
                        resb.Append("""MONE_CODE"" :" & """" & MiDataRow("MONE_CODE").ToString & """,")
                        resb.Append("""MOTIVO"" :" & """" & MiDataRow("MOTIVO").ToString & """,")
                        resb.Append("""ESTADO_IND"" :" & """" & MiDataRow("ESTADO_IND").ToString & """,")
                        resb.Append("""EMPRESA"" :" & """" & MiDataRow("EMPRESA").ToString & """,")
                        resb.Append("""SUCURSAL"" :" & """" & MiDataRow("SUCURSAL").ToString & """,")
                        resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()

            Case "7" 'Lista Adelantos
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pad As New Nomade.NN.NNAdelantoSueldo("BN")
                dt = pad.ListarAdelanto(IIf(PIDM = "", "0", PIDM), MES, ANIO, ESTADO_IND, IIf(CODE Is Nothing, "0", CODE), CTLG_CODE, SCSL_CODE)
                If dt Is Nothing Then
                    res = "{}"
                Else
                    res = Utilities.DataTableToJSON(dt)
                End If
                'res = GenerarTablaAdelantos2(dt)


            Case "8" 'Rechaza Adelanto
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim e As New Nomade.NN.NNAdelantoSueldo("Bn")

                resArray = e.Rechazar_Adelanto(CODE, USUA_ID)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""SUCCESS"" :" & """" & resArray(0).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()

            Case "9" 'lista tipo planilla
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pad As New Nomade.NN.NNPlanilla("BN")
                dt = pad.Listar_Tipo_Planilla(CODE, ESTADO_IND, "")
                If Not (dt Is Nothing) Then
                    dt = SortDataTableColumn(dt, "CODIGO", "ASC")
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""PAGO_IND"" :" & """" & MiDataRow("PAGO_IND").ToString & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()

            Case "10" 'Lista Adelantos
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pad As New Nomade.NN.NNAdelantoSueldo("BN")
                dt = pad.Listar_Detalle_Adelanto(CODE)
                If Not dt Is Nothing Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows

                        If row("MES").ToString.Length = 1 Then
                            row("MES") = "0" + row("MES").ToString
                        End If
                        resb.Append("{")
                        resb.Append("""CODE"":""" & row("CODIGO").ToString & """,")
                        resb.Append("""MES"":""" & row("MES").ToString & """,")
                        resb.Append("""ANIO"":""" & row("ANIO").ToString & """,")
                        resb.Append("""MESANIO"":""" & row("MES").ToString + row("ANIO").ToString & """,")
                        resb.Append("""PERIODO"":""" & row("NOMBRE_MES").ToString + " " + row("ANIO").ToString & """,")
                        resb.Append("""CODE_PLANILLA"":""" & row("RHTIPLA_CODE").ToString & """,")
                        resb.Append("""PLANILLA"":""" & row("RHTIPLA_DESCRIPCION").ToString & """,")
                        resb.Append("""MONTO"":""" & row("MONTO").ToString & """,")
                        resb.Append("""ESTADO_IND"":""" & row("ESTADO_IND").ToString & """,")
                        resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("-")
                    resb.Replace("},-", "}")
                    resb.Append("]")
                End If
                res = resb.ToString()
                'res = GenerarTablaDetalleAdelantos(dt)
            Case "11" 'Graba detalle de adelanto
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim e As New Nomade.NN.NNAdelantoSueldo("Bn")

                resArray = e.Grabar_Detalle_Adelanto(CODE, MONTO, DETALLE, USUA_ID, MONE_CODE, PIDM, NRO_DOC, CTLG_CODE, SCSL_CODE)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""SUCCESS"" :" & """" & resArray(0).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()

            Case "12" 'lista empresa por codigo
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pad As New Nomade.NC.NCEmpresa("BN")
                dt = pad.ListarEmpresa(CODE, "", "")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""DIAS_CORTE"" :" & """" & MiDataRow("DIAS_CORTE").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
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

    Public Function GenerarTablaAdelantos(ByVal dt As DataTable) As String
        res = ""
        resb.Clear()
        '------
        resb.AppendFormat("<table id=""tblAdelantos"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th>CODIGO</th>")
        resb.AppendFormat("<th>NRO. DOC.</th>")
        resb.AppendFormat("<th>EMPLEADO</th>")
        resb.AppendFormat("<th>FECHA REG.</th>")
        resb.AppendFormat("<th>SOLICITADO</th>")
        resb.AppendFormat("<th>MONEDA</th>")
        resb.AppendFormat("<th>MOTIVO</th>")
        resb.AppendFormat("<th>ESTADO</th>")
        resb.AppendFormat("<th>APROBADO</th>")
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
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("</tr>")
        Else
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODIGO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NRO_DOCUMENTO").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("NOMBRE_EMPLEADO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("FECHA_REG").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MONTO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MONE_DESC").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("MOTIVO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ESTADO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MONTO_APR").ToString())
                'resb.AppendFormat("<td style='text-align:center;'>")
                'resb.AppendFormat("<a class='btn red' onclick=""eliminaCentroCosto('{0}','{1}')""><i class='icon-trash'></i></a>", dt.Rows(i)("CC_CODE").ToString(), dt.Rows(i)("CCD_CODE").ToString())
                'resb.AppendFormat("</td>")
                resb.AppendFormat("</tr>")
            Next
        End If

        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
        Return res

    End Function



    Public Function GenerarTablaAdelantos2(ByVal dt As DataTable) As String
        res = ""
        resb.Clear()
        '------
        resb.AppendFormat("<table id=""tblAdelantos"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th>CODIGO</th>")
        resb.AppendFormat("<th>NRO. DOC.</th>")
        resb.AppendFormat("<th>EMPLEADO</th>")
        resb.AppendFormat("<th>FECHA REG.</th>")
        resb.AppendFormat("<th>SOLICITADO</th>")
        resb.AppendFormat("<th>APROBADO</th>")
        resb.AppendFormat("<th>MONEDA</th>")
        resb.AppendFormat("<th>MOTIVO</th>")
        resb.AppendFormat("<th>ESTADO</th>")
        resb.AppendFormat("<th>APROBAR</th>")
        resb.AppendFormat("<th>RECHAZAR</th>")
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
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("</tr>")
        Else
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODIGO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NRO_DOCUMENTO").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("NOMBRE_EMPLEADO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("FECHA_REG").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MONTO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MONTO_APR").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MONE_DESC").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("MOTIVO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ESTADO").ToString())
                resb.AppendFormat("<td style='text-align:center;'>")
                resb.AppendFormat("<a class='btn green' title='Aprobar Adelanto'  onclick=""IniciaAprobacion('{0}')""><i class='icon-thumbs-up'></i></a>", dt.Rows(i)("CODIGO").ToString())
                resb.AppendFormat("</td>")

                resb.AppendFormat("<td style='text-align:center;'>")
                resb.AppendFormat("<a class='btn red'   title='Rechazar Adelanto' onclick=""rechazarAdelanto('{0}')""><i class='icon-thumbs-down'></i></a>", dt.Rows(i)("CODIGO").ToString())
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