<%@ WebHandler Language="VB" Class="CPMMOVI" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CPMMOVI : Implements IHttpHandler

    Dim OPCION As String
    Dim USUARIO As String

    Dim P_FECHA_INICIO, P_FECHA_FIN, P_FPRGAST_PIDM_BENEFICIARIO,
        P_FPRGAST_CTLG_CODE, P_FPRGAST_SCSL_CODE, P_GLOSA, P_PERIODO, P_FPRGASTMOV_MONTO_TOTAL, p_PeriodoActivo As String

    Dim oPagosDiversos As New Nomade.CP.CPPagosDiversos("Bn")

    Dim dt As DataTable

    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array



    Dim nMontoTotal, nMontoValido, nMontoInvalido As Decimal
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        'USUARIO = context.Request("USUARIO")
        OPCION = context.Request("OPCION")
        p_PeriodoActivo = context.Request("p_PeriodoActivo")
        P_FECHA_INICIO = context.Request("P_FECHA_INICIO")
        P_FECHA_FIN = context.Request("P_FECHA_FIN")
        P_FPRGAST_PIDM_BENEFICIARIO = context.Request("P_FPRGAST_PIDM_BENEFICIARIO")
        P_FPRGAST_CTLG_CODE = context.Request("P_FPRGAST_CTLG_CODE")
        P_FPRGAST_SCSL_CODE = context.Request("P_FPRGAST_SCSL_CODE")
        P_GLOSA = context.Request("P_GLOSA")
        P_PERIODO = context.Request("P_PERIODO")
        P_FPRGASTMOV_MONTO_TOTAL = context.Request("P_FPRGASTMOV_MONTO_TOTAL")

        Try
            Select Case OPCION
                Case "1" 'Lista tipo de Documento
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = oPagosDiversos.fnListarGastoMovilidad(Nomade.nomade.cutilidades.fechaMYSQL(P_FECHA_INICIO), Nomade.nomade.cutilidades.fechaMYSQL(P_FECHA_FIN), P_FPRGAST_PIDM_BENEFICIARIO, P_FPRGAST_CTLG_CODE, P_FPRGAST_SCSL_CODE)
                    Dim sLista As String
                    sLista = GenerarListaGasto(dt)

                    res = nMontoTotal.ToString() + "|" + nMontoValido.ToString() + "|" + nMontoInvalido.ToString() + "|" + sLista
                Case "2"
                    context.Response.ContentType = "text/html"
                    res = oPagosDiversos.fnRegistrarPlanillaMovilidad(P_FPRGAST_CTLG_CODE, P_FPRGAST_SCSL_CODE, P_FPRGAST_PIDM_BENEFICIARIO, P_PERIODO,
                                                                      P_GLOSA, "PRUEBA", Convert.ToDecimal(P_FPRGASTMOV_MONTO_TOTAL), Nomade.nomade.cutilidades.fechaMYSQL(P_FECHA_INICIO), Nomade.nomade.cutilidades.fechaMYSQL(P_FECHA_FIN))
                Case "3"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = oPagosDiversos.fnListarPlanillaMovilidad(P_FPRGAST_CTLG_CODE, P_FPRGAST_SCSL_CODE, IIf(P_FPRGAST_PIDM_BENEFICIARIO = "", "0", P_FPRGAST_PIDM_BENEFICIARIO), P_PERIODO)
                    Dim sLista As String
                    sLista = GenerarListaPlanilaMovilidad(dt)
                    res = nMontoTotal.ToString() + "|" + sLista
                Case "4"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim anio As String = Date.Now.Year.ToString()
                    dt = New Nomade.NF.NFPeriodo("Bn").Listar_Periodo(p_PeriodoActivo, "", P_FPRGAST_CTLG_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PERIODO_DESC"" :" & """" & MiDataRow("PERIODO_DESC").ToString & """,")
                            resb.Append("""COD"" :" & """" & MiDataRow("COD").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "5" ' imprimir planilla de movilidades
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = oPagosDiversos.fnImprimirPlanillaMovilidad(P_FPRGAST_CTLG_CODE, P_FPRGAST_SCSL_CODE, IIf(P_FPRGAST_PIDM_BENEFICIARIO = "", "0", P_FPRGAST_PIDM_BENEFICIARIO), P_PERIODO)
                    Dim sLista As String
                    sLista = GenerarImprimirPlanilaMovilidad(dt)
                    res = sLista
                Case "6"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim pemp As New Nomade.NC.NCEEmpleado("BN")
                    dt = pemp.Listar_Empleados("0", "0", "A", P_FPRGAST_CTLG_CODE, "", String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""NOMBRE"" :" & """" & MiDataRow("NOMBRE_EMPLEADO").ToString & """,")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("PIDM").ToString & """")
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
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

    Public Function GenerarListaGasto(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<table id='tbLista' cellspacing=''  class='display DTTT_selectable'>"
            res += "<thead>"
            res += "<tr>"
            res += "<th colspan='6'></th>"
            res += "</tr>"
            res += "<tr>"
            res += "<th align='center'>Fecha</th>"
            res += "<th align='center'>Trabajador</th>"
            res += "<th align='center'>Motivo de Traslado</th>"
            res += "<th align='center'>Establecimiento</th>"
            res += "<th align='center'>Destino</th>"
            res += "<th align='center'>Importe</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                Dim sColor As String = ""
                nMontoTotal += CDec(dt.Rows(i)("MONTO").ToString())
                If (dt.Rows(i)("INVALIDO").ToString() = "1") Then
                    nMontoInvalido += CDec(dt.Rows(i)("MONTO").ToString())
                    sColor = "style='color:red'"
                Else
                    nMontoValido += CDec(dt.Rows(i)("MONTO").ToString())
                End If

                res += "<tr " + sColor + ">"
                res += "<td align='center'>" & dt.Rows(i)("FECHA").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("TRABAJADOR").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("MOTIVO_TRASLADO").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("ESTABLECIMIENTO").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("DESTINO").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("MONTO").ToString() & "</td>"
                res += "</tr>"
            Next
            res += "</tbody>"
            res += "</table>"
        Else
            res = "No se encontraron datos!!!"
        End If
        Return res
    End Function
    Public Function GenerarListaPlanilaMovilidad(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<table id='tbLista' cellspacing=''  class='display DTTT_selectable'>"
            res += "<thead>"
            res += "<tr>"
            res += "<th colspan='6'></th>"
            res += "</tr>"
            res += "<tr>"
            res += "<th align='center'>Nro. Planilla</th>"
            res += "<th align='center'>Fecha Inicio</th>"
            res += "<th align='center'>Trabajador</th>"
            res += "<th align='center'>Fecha Fin</th>"
            res += "<th align='center'>Periodo</th>"
            res += "<th align='center'>Glosa</th>"
            res += "<th align='center'>Importe en S/.</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                nMontoTotal += CDec(dt.Rows(i)("FPRGASTMOV_MONTO_TOTAL").ToString())
                res += "<tr>"
                res += "<td align='center'>" & dt.Rows(i)("FPRGASTMOV_CODE").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("FPRGASTMOV_INICIO").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("TRABAJADOR").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("FPRGASTMOV_FIN").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("FPRGASTMOV_PERIODO").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("FPRGASTMOV_GLOSA").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("FPRGASTMOV_MONTO_TOTAL").ToString() & "</td>"
                res += "</tr>"
            Next
            res += "</tbody>"
            res += "</table>"
        Else
            res = "No se encontraron datos!!!"
        End If
        Return res
    End Function






    Public Function GenerarImprimirPlanilaMovilidad(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            Dim dtCabecera As DataTable = dt
            Dim sAuxiliarCab As String = ""
            Dim nImporte As Decimal = 0
            Dim nImporteTotal As Decimal = 0
            Dim sUltimaFecha As String = ""
            res = "<table id='tbLista' cellspacing='' cellpadding='' style='font-size:8pt' >"
            'res += "<thead>"
            res += "<tr>"
            res += "<td align='center' colspan='4'>PLANTILLA DE GASTOS DE MOVILIDAD - POR TRABAJADOR</td>"
            res += "</tr>"

            res += "<tr>"
            res += "<td align='center' colspan='4'>(D.S. N° 159-2007-EF Art. 37 inc a1 literal V del L.I.R.)</td>"
            res += "</tr>"

            res += "<tr>"
            res += "<td align='center' colspan='4'></td>"
            res += "</tr>"

            Dim sCodigoPlanillaAnterior As String = ""
            For Each dtrow As DataRow In dtCabecera.Rows
                Dim sCodigoPlanilla As String = dtrow("FPRGASTMOV_CODE").ToString()

                If (Not sCodigoPlanillaAnterior.Equals(sCodigoPlanilla)) Or sCodigoPlanillaAnterior = "" Then

                    res += "<tr>"
                    res += "<td align='left'>N° de Planilla</td>"
                    res += "<td align='left'>" + dtrow("FPRGASTMOV_CODE").ToString() + "</td>"
                    res += "<td align='left'>Fecha de emisión</td>"
                    res += "<td align='left'>" + dtrow("FPRGASTMOV_DET_FECHA_UNICA").ToString() + "</td>"
                    res += "</tr>"

                    res += "<tr>"
                    res += "<td align='center' colspan='4'></td>"
                    res += "</tr>"

                    res += "<tr>"
                    res += "<td align='left'>Razón Social</td>"
                    res += "<td align='left'>" + dtrow("FTVCTLG_DESC").ToString() + "</td>"
                    res += "<td align='left'>Establecimiento</td>"
                    res += "<td align='left'>TODOS</td>"
                    res += "</tr>"

                    res += "<tr>"
                    res += "<td align='left'>RUC</td>"
                    res += "<td align='left'>" + dtrow("FTVCTLG_RUC").ToString() + "</td>"
                    res += "<td align='center'></td>"
                    res += "<td align='center'></td>"
                    res += "</tr>"

                    res += "<tr>"
                    res += "<td align='left' colspan='3'>Datos del Trabajador</td>"


                    res += "<td align='center'>N°</td>"
                    res += "</tr>"

                    res += "<tr>"
                    res += "<td align='left'>Apellidos y Nombres</td>"
                    res += "<td align='left'>" + dtrow("TRABAJADOR").ToString() + "</td>"
                    res += "<td align='left'>Codigo del trabajador</td>"
                    res += "<td align='center'>" + dtrow("FPRGASTMOV_COD_TRABAJADOR").ToString() + "</td>"
                    res += "</tr>"

                    res += "<tr>"
                    res += "<td align='left'>DNI</td>"
                    res += "<td align='left'>" + dtrow("PPBDOID_NRO").ToString() + "</td>"
                    res += "<td align='center'></td>"
                    res += "<td align='center'></td>"
                    res += "</tr>"

                    res += "<tr>"
                    res += "<td align='left'>Periodo</td>"
                    res += "<td align='left'>" + dtrow("FPRGASTMOV_PERIODO").ToString() + "</td>"
                    res += "<td align='center'></td>"
                    res += "<td align='center'></td>"
                    res += "</tr>"

                    'ssss
                    res += "<tr>"
                    res += "<td colspan='4'>"

                    res += "<table id='tbLista' cellspacing='' cellpadding='' style='font-size:8pt;width:100%' border=1>"
                    res += "<tr>"
                    res += "<td align='center' rowspan='2'>FECHA</td>"
                    res += "<td align='center' colspan='3'>Desplazamiento</td>"
                    res += "</tr>"
                    res += "<tr>"
                    res += "<td align='center'>Motivo de Traslado</td>"
                    res += "<td align='center'>Destino</td>"
                    res += "<td align='center'>Importe S/.</td>"
                    res += "</tr>"
                    'res += "</thead>"
                    'res += "<tbody>"
                    For Each row As DataRow In dt.Rows
                        Dim sCodCabeceraA As String = ""

                        sCodCabeceraA = row("FPRGASTMOV_CODE").ToString()

                        If sCodigoPlanilla.Equals(sCodCabeceraA) Then

                            If Not sCodCabeceraA.Equals(sAuxiliarCab) Then

                                sUltimaFecha = row("FPRGASTMOV_DET_FECHA_UNICA").ToString()
                                Dim nImporteA = CDec(row("FPRGASTMOV_DET_MONTO").ToString())
                                res += "<tr>"
                                res += "<td align='center'>" + row("FPRGASTMOV_DET_FECHA_UNICA").ToString() + "</td>"
                                res += "<td align='center'>" + row("FPRGASTMOV_DET_MOTIVO_TRASLADO").ToString() + "</td>"
                                res += "<td align='center'>" + row("FPRGASTMOV_DET_DESTINO").ToString() + "</td>"
                                res += "<td align='center'>" + nImporteA.ToString() + "</td>"
                                res += "</tr>"
                                nImporte += nImporteA
                                nImporteTotal += nImporteA
                            Else

                                Dim nImporteA = CDec(row("FPRGASTMOV_DET_MONTO").ToString())
                                res += "<tr>"
                                res += "<td align='center'></td>"
                                res += "<td align='center'>" + row("FPRGASTMOV_DET_MOTIVO_TRASLADO").ToString() + "</td>"
                                res += "<td align='center'>" + row("FPRGASTMOV_DET_DESTINO").ToString() + "</td>"
                                res += "<td align='center'>" + nImporteA.ToString() + "</td>"
                                res += "</tr>"
                                nImporte += nImporteA
                                nImporteTotal += nImporteA
                            End If
                            sAuxiliarCab = sCodCabeceraA

                        End If
                    Next
                    If nImporte > 0 Then
                        res += "<tr>"
                        res += "<td align='center'></td>"
                        res += "<td align='center'></td>"
                        res += "<td align='center'> Total del " + sUltimaFecha + " </td>"
                        res += "<td align='center'> S/." + nImporte.ToString() + "</td>"
                        res += "</tr>"
                        res += "</table>"
                        res += "</td>"
                        res += "</tr>"
                    End If
                    nImporte = 0
                End If
                sCodigoPlanillaAnterior = sCodigoPlanilla


            Next

            If nImporteTotal > 0 Then
                res += "<tr>"
                res += "<td align='center'></td>"
                res += "<td align='center'></td>"
                res += "<td align='center'> Total del MES </td>"
                res += "<td align='center'> S/." + nImporteTotal.ToString() + "</td>"
                res += "</tr>"
            End If

            res += "</table>"
            nImporteTotal = 0
            res += "<br><br><br><br>"
            res += "<div style='float:left;font-size:8pt'>TRABAJADOR</div><div style='float:right;font-size:8pt'>V° B° GERENCIA</div>"
        Else
            res = "No se encontraron datos!!!"
        End If

        Return res
    End Function
End Class