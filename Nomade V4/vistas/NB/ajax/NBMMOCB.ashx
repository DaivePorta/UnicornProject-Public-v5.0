<%@ WebHandler Language="VB" Class="NBMMOCB" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NBMMOCB : Implements IHttpHandler

    Dim res, flag As String
    Dim resb As New StringBuilder
    Dim dt As DataTable
    Dim empresa As String
    Dim empresapidm As String
    Dim b As New Nomade.NB.NBChequera("bn")
    Dim cuenta As String
    Dim mes As String
    Dim anho As String
    Dim codigo As String
    Dim descripcion As String
    Dim oficina As String
    Dim canal As String
    Dim nro_operacion As String
    Dim fecha_ope As String
    Dim fecha_valor As String
    Dim monto As String
    Dim tipoOpeCta As String
    Dim tipoOperacion As String
    Dim tc As String
    Dim user As String
    Dim tipo As String
    Dim pidm As String
    Dim cta_code As String
    Dim cheque As String
    Dim caja As String
    Dim monto_d As String

    Dim stbl As String
    Dim tipoChq As String
    Dim origen As String

    Dim persona As String
    Dim codigoVenta As String

    Dim indCobranzaStr As String
    Dim indCobranza As Boolean = False

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        empresa = context.Request("empresa")
        empresapidm = context.Request("empresapidm")
        flag = context.Request("flag")

        cuenta = context.Request("cuenta")
        mes = context.Request("mes")
        anho = context.Request("anho")
        codigo = context.Request("codigo")
        oficina = context.Request("oficina")
        descripcion = context.Request("descripcion")
        canal = context.Request("canal")
        nro_operacion = context.Request("nro_operacion")
        fecha_ope = context.Request("fecha_ope")
        If fecha_ope <> String.Empty Then
            fecha_ope = Utilities.fechaLocal(context.Request("fecha_ope"))
        End If
        fecha_valor = context.Request("fecha_valor")
        If fecha_valor <> String.Empty Then
            fecha_valor = Utilities.fechaLocal(context.Request("fecha_valor"))
        End If
        monto = context.Request("monto")

        tipoOpeCta = context.Request("tipoOpeCta")
        tipoOperacion = context.Request("tipoOperacion")
        persona = context.Request("persona")
        codigoVenta = context.Request("codigoVenta") 'String de codigo venta seleccionado en dinero por encargo

        user = context.Request("user")
        tipo = context.Request("tipo")
        pidm = context.Request("pidm")
        cta_code = context.Request("cta_code")
        cheque = context.Request("cheque")
        caja = context.Request("caja")
        monto_d = context.Request("monto_d")

        stbl = context.Request("stbl")
        tipoChq = context.Request("tipoChq")
        origen = context.Request("origen")

        indCobranzaStr = context.Request("indCobranza")

        Try

            Select Case flag

                Case "1"
                    Dim q As New Nomade.FI.SWTipoCambio("Bn")
                    tc = q.TipoCambioHoy().Rows(0)("Venta").ToString

                    Dim P As New Nomade.NB.NBMovimientoBancario("Bn")

                    Dim arrSplitDesc() As String

                    arrSplitDesc = Split(descripcion, ",")

                    Dim desc As String

                    desc = arrSplitDesc(0)

                    res = P.CrearMovimientoBancarioDetalle(oficina, desc, canal, nro_operacion, fecha_ope, IIf(monto = 0, monto_d, monto), tc, fecha_valor, "S", user, stbl, tipo, pidm, cta_code, IIf(caja <> String.Empty, "C", "M"))
                    Dim ref = res
                    If (Not res Is Nothing) And (caja <> String.Empty) Then
                        Dim p1 As New NOMADE.CA.CAMovimientos("Bn")
                        res = p1.CrearMovimientoCaja(stbl, caja, origen, "OING", "", "INGRESO POR RETIRO EN CUENTA", "", ("OP" & nro_operacion), "", "S", monto, monto_d, "", "0008", "", "", Utilities.fechaLocal(Date.Now), "", "S", user, "O", res)(0)
                        If res = "OK" And (cheque <> String.Empty) And (tipoChq <> String.Empty) Then
                            Dim p2 As New Nomade.NB.NBCheque("Bn")
                            p2.ActualizarCheque("", "", "", "", "00/00/0000", "", 0, "00/00/0000", 0, "", "P", user, "", "", "", "", "", "", (cta_code & "," & pidm & "," & tipoChq & "," & cheque))
                            p2.ActualizarCheque("", "", "", "", "00/00/0000", "", 0, "00/00/0000", 0, "", "C", user, "", "", "", "", "", "", (cta_code & "," & pidm & "," & tipoChq & "," & cheque & "," & fecha_ope & "," & oficina & "," & nro_operacion))

                        End If
                    End If

                Case "1.5" 'Agregar tipo operacion y persona al movimiento bancario manual
                    'Tambien se agregaran los tickets a la tabla intermedia

                    Dim p As New Nomade.NB.NBMovimientoBancario("BN")
                    res = p.AgregarAMovimientoBancarioManual(codigo, persona, tipoOperacion, codigoVenta)

                Case "2"
                    Dim q As New Nomade.FI.SWTipoCambio("Bn")
                    tc = q.TipoCambioHoy().Rows(0)("Venta").ToString

                    Dim P As New Nomade.NB.NBMovimientoBancario("Bn")
                    res = P.ActualizarMovimientoBancarioDetalle(codigo, oficina, descripcion, canal, nro_operacion, fecha_ope, monto, tc, fecha_valor, "S", user, stbl, tipo, pidm, cta_code, tipoOperacion, persona)

                Case "3"
                    Dim p As New Nomade.NB.NBMovimientoBancario("BN")
                    dt = p.ListarMovimientoBancario(mes, anho, "", cuenta, empresapidm)
                    res = dt.Rows(0)("CODIGO") & "|" & dt.Rows(0)("CERRADO_IND")

                Case "3.5" 'Para confirmar el codigo de operacion los anticipos
                    Dim p As New Nomade.NB.NBMovimientoBancario("BN")
                    dt = p.ListarNroOperacionSinUsar(cuenta, tipoOperacion, empresapidm)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO") & """,")
                            resb.Append("""NRO_OPERACION"" :" & """" & row("NRO_OPERACION") & """,")
                            resb.Append("""MONTO"" :" & """" & row("MONTO") & """,")
                            resb.Append("""PIDM_CLIENTE"" :" & """" & row("PIDM_CLIENTE") & """,")
                            resb.Append("""CERRADO_IND"" :" & """" & row("CERRADO_IND") & """")
                            resb.Append("},")
                        Next
                        resb.Append("-")
                        resb.Replace("},-", "}")
                        resb.Append("]")
                        res = resb.ToString()
                    Else
                        res = ""
                    End If

                Case "4"
                    Dim p As New Nomade.NB.NBMovimientoBancario("BN")
                    Dim auxiliar As Decimal = 0.0
                    Dim auxiliar2 As Decimal = 0.0
                    dt = p.ListarMovimientoBancarioDetalle(codigo)
                    If dt IsNot Nothing Then
                        dt.DefaultView.Sort = "FECHA_OPERACION_F ASC"
                        dt = dt.DefaultView.ToTable()
                    End If

                    If Not dt Is Nothing Then
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""CODIGO"":"" "",")
                        resb.Append("""OFICINA"":"" "",")
                        resb.Append("""DESCRIPCION"":""SALDO ANTERIOR"",")
                        resb.Append("""CANAL"":"" "",")
                        resb.Append("""FECHA_OPERACION"":{""display"":"" "",""order"":""0""},")
                        resb.Append("""MONTO"":"""",")
                        resb.Append("""MONTO_ITF"":"""",")
                        resb.Append("""FECHA_VALOR"":{""display"":"" "",""order"":""0""},")
                        resb.Append("""SALDO_CONTABLE"":""" & dt.Rows(0)("SALDO_ANTERIOR").ToString & """,")
                        resb.Append("""SALDO_DISPONIBLE"":""" & dt.Rows(0)("SALDO_ANTERIOR").ToString & """,")
                        resb.Append("""NRO_OPERACION"":"" "",")
                        resb.Append("""COMPLETO_IND"":""S"",")
                        resb.Append("""TIPO"":"" """)
                        resb.Append("},")
                        auxiliar = Decimal.Parse(dt.Rows(0)("SALDO_ANTERIOR").ToString)
                        auxiliar2 = Decimal.Parse(dt.Rows(0)("SALDO_ANTERIOR").ToString)

                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            resb.Append("""OFICINA"":""" & row("OFICINA").ToString & """,")
                            resb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                            resb.Append("""CANAL"":""" & row("CANAL").ToString & """,")
                            resb.Append("""FECHA_OPERACION"":{""display"":""" & row("FECHA_OPERACION").ToString & """,""order"":""" & String.Join("", row("FECHA_OPERACION").ToString.Split("-").Reverse()) & """},")
                            resb.Append("""MONTO"":""" & row("MONTO").ToString & """,")
                            resb.Append("""MONTO_ITF"":""" & row("MONTO_ITF").ToString & """,")
                            resb.Append("""FECHA_VALOR"":{""display"":""" & row("FECHA_VALOR").ToString & """,""order"":""" & String.Join("", row("FECHA_VALOR").ToString.Split("-").Reverse()) & """},")
                            resb.Append("""COMPLETO_IND"":""" & row("COMPLETO_IND").ToString & """,")

                            If row("TIPO").ToString = "I" Then
                                If row("COMPLETO_IND").ToString = "S" Then
                                    auxiliar = auxiliar + Decimal.Parse(row("MONTO").ToString) - Decimal.Parse(row("MONTO_ITF").ToString)
                                End If

                                auxiliar2 = auxiliar2 + Decimal.Parse(row("MONTO").ToString) - Decimal.Parse(row("MONTO_ITF").ToString)
                            Else
                                If row("COMPLETO_IND").ToString = "S" Then
                                    auxiliar = auxiliar - Decimal.Parse(row("MONTO").ToString) - Decimal.Parse(row("MONTO_ITF").ToString)
                                End If

                                auxiliar2 = auxiliar2 - Decimal.Parse(row("MONTO").ToString) - Decimal.Parse(row("MONTO_ITF").ToString)
                            End If


                            resb.Append("""SALDO_CONTABLE"":""" & auxiliar & """,")
                            resb.Append("""SALDO_DISPONIBLE"":""" & auxiliar2 & """,")
                            resb.Append("""NRO_OPERACION"":""" & row("NRO_OPERACION").ToString.Trim() & """,")
                            resb.Append("""CODIGO_OPERACION"":""" & row("CODIGO_OPERACION").ToString.Trim() & """,")
                            resb.Append("""TIPO"":""" & row("TIPO").ToString & """,")
                            resb.Append("""TIPO_REG"":""" & row("TIPO_REGISTRO").ToString & """")
                            resb.Append("},")

                        Next
                        resb.Append("-")
                        resb.Replace("},-", "}")

                        resb.Append("]")
                        res = resb.ToString()
                    Else
                        res = ""
                    End If
                Case "4.5"
                    Dim p As New Nomade.NB.NBMovimientoBancario("BN")
                    Dim auxiliar As Decimal = 0.0
                    Dim auxiliar2 As Decimal = 0.0
                    dt = p.ListarMovimientoBancarioDetalleFast(codigo)
                    If dt IsNot Nothing Then
                        dt.DefaultView.Sort = "FECHA_OPERACION_F ASC"
                        dt = dt.DefaultView.ToTable()
                    End If

                    If Not dt Is Nothing Then
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""CODIGO"":"" "",")
                        resb.Append("""OFICINA"":"" "",")
                        resb.Append("""DESCRIPCION"":""SALDO ANTERIOR"",")
                        resb.Append("""CANAL"":"" "",")
                        resb.Append("""FECHA_OPERACION"":{""display"":"" "",""order"":""0""},")
                        resb.Append("""MONTO"":"""",")
                        resb.Append("""MONTO_ITF"":"""",")
                        resb.Append("""FECHA_VALOR"":{""display"":"" "",""order"":""0""},")
                        resb.Append("""SALDO_CONTABLE"":""" & dt.Rows(0)("SALDO_ANTERIOR").ToString & """,")
                        resb.Append("""SALDO_DISPONIBLE"":""" & dt.Rows(0)("SALDO_ANTERIOR").ToString & """,")
                        resb.Append("""NRO_OPERACION"":"" "",")
                        resb.Append("""COMPLETO_IND"":""S"",")
                        resb.Append("""TIPO"":"" """)
                        resb.Append("},")
                        auxiliar = Decimal.Parse(dt.Rows(0)("SALDO_ANTERIOR").ToString)
                        auxiliar2 = Decimal.Parse(dt.Rows(0)("SALDO_ANTERIOR").ToString)

                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            resb.Append("""OFICINA"":""" & row("OFICINA").ToString & """,")
                            resb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                            resb.Append("""CANAL"":""" & row("CANAL").ToString & """,")
                            resb.Append("""FECHA_OPERACION"":{""display"":""" & row("FECHA_OPERACION").ToString & """,""order"":""" & String.Join("", row("FECHA_OPERACION").ToString.Split("-").Reverse()) & """},")
                            resb.Append("""MONTO"":""" & row("MONTO").ToString & """,")
                            resb.Append("""MONTO_ITF"":""" & row("MONTO_ITF").ToString & """,")
                            resb.Append("""FECHA_VALOR"":{""display"":""" & row("FECHA_VALOR").ToString & """,""order"":""" & String.Join("", row("FECHA_VALOR").ToString.Split("-").Reverse()) & """},")
                            resb.Append("""COMPLETO_IND"":""" & row("COMPLETO_IND").ToString & """,")

                            If row("TIPO").ToString = "I" Then
                                If row("COMPLETO_IND").ToString = "S" Then
                                    auxiliar = auxiliar + Decimal.Parse(row("MONTO").ToString) - Decimal.Parse(row("MONTO_ITF").ToString)
                                End If

                                auxiliar2 = auxiliar2 + Decimal.Parse(row("MONTO").ToString) - Decimal.Parse(row("MONTO_ITF").ToString)
                            Else
                                If row("COMPLETO_IND").ToString = "S" Then
                                    auxiliar = auxiliar - Decimal.Parse(row("MONTO").ToString) - Decimal.Parse(row("MONTO_ITF").ToString)
                                End If

                                auxiliar2 = auxiliar2 - Decimal.Parse(row("MONTO").ToString) - Decimal.Parse(row("MONTO_ITF").ToString)
                            End If


                            resb.Append("""SALDO_CONTABLE"":""" & auxiliar & """,")
                            resb.Append("""SALDO_DISPONIBLE"":""" & auxiliar2 & """,")
                            resb.Append("""NRO_OPERACION"":""" & row("NRO_OPERACION").ToString.Trim() & """,")
                            resb.Append("""TIPO"":""" & row("TIPO").ToString & """,")
                            resb.Append("""TIPO_REG"":""" & row("TIPO_REGISTRO").ToString & """")
                            resb.Append("},")

                        Next
                        resb.Append("-")
                        resb.Replace("},-", "}")

                        resb.Append("]")
                        res = resb.ToString()
                    Else
                        res = ""
                    End If
                Case "5"
                    Dim p As New Nomade.NC.NCEmpresa("BN")
                    dt = p.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "codigo", "DESCRIPCION", "EMPRESA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "codigo", "DESCRIPCION", "EMPRESA")
                    End If

                Case "6"
                    If Not String.IsNullOrEmpty(indCobranzaStr) Then
                        Boolean.TryParse(indCobranzaStr, indCobranza)
                    End If

                    dt = b.ListarCtasBancarias(empresapidm, "A", "")

                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "code", "DESCRIPCION", "CTABANC")
                    ElseIf indCobranza = True Then
                        ' Filtra la datatable bajo la condicion de COBRANZA_IND = "S"
                        Dim dtFiltrada As DataTable = dt.Clone()
                        For Each row As DataRow In dt.Rows
                            If row("COBRANZA_IND").ToString() = "S" Then
                                dtFiltrada.ImportRow(row)
                            End If
                        Next
                        res = GenerarSelect(SortDataTableColumn(dtFiltrada, "DESCRIPCION", "ASC"), "code", "DESCRIPCION", "CTABANC")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "code", "DESCRIPCION", "CTABANC")
                    End If

                Case "6.5"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = b.ListarCtasBancarias_2(empresa, "A", "")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODE").ToString & """,")
                            resb.Append("""MONEDA_CODE"" :" & """" & MiDataRow("MONEDA_CODE").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "7"
                    Dim p As New Nomade.GL.GLLetras("Bn")
                    dt = p.ListarMoneda(empresa)
                    res = GenerarSelect(dt, "codigo", "descripcion", "MONEDA")

                Case "M"
                    Dim p As New Nomade.NC.NCMonedas("BN")
                    dt = p.ListarMoneda(codigo, String.Empty, "A")
                    res = dt.Rows(0)("Simbolo").ToString

                Case "L"
                    Dim p As New Nomade.NB.NBMovimientoBancario("BN")
                    dt = p.ListarMovimientoBancarioDetalle(String.Empty, codigo)
                    If Not dt Is Nothing Then

                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""CODIGO"":""" & dt.Rows(0)("CODIGO").ToString & """,")
                        resb.Append("""OFICINA"":""" & dt.Rows(0)("OFICINA").ToString & """,")
                        resb.Append("""DESCRIPCION"":""" & dt.Rows(0)("DESCRIPCION").ToString & """,")
                        resb.Append("""CANAL"":""" & dt.Rows(0)("CANAL").ToString & """,")
                        resb.Append("""FECHA_OPERACION"":""" & dt.Rows(0)("FECHA_OPERACION_F").ToString & """,")
                        resb.Append("""MONTO"":""" & dt.Rows(0)("MONTO").ToString & """,")
                        resb.Append("""MONTO_ITF"":""" & dt.Rows(0)("MONTO_ITF").ToString & """,")
                        resb.Append("""FECHA_VALOR"":""" & dt.Rows(0)("FECHA_VALOR_F").ToString & """,")
                        resb.Append("""NRO_OPERACION"":""" & dt.Rows(0)("NRO_OPERACION").ToString & """,")
                        resb.Append("""COMPLETO_IND"":""" & dt.Rows(0)("COMPLETO_IND").ToString & """,")
                        resb.Append("""TIPO"":""" & dt.Rows(0)("TIPO").ToString & """,")
                        resb.Append("""CTA_CODE"":""" & dt.Rows(0)("CTA_CODE").ToString & """,")
                        resb.Append("""PIDM"":""" & dt.Rows(0)("PIDM").ToString & """,")
                        resb.Append("""CAJA_CODE"":""" & dt.Rows(0)("CAJA_CODE").ToString & """,")
                        resb.Append("""RESPONSABLE"":""" & dt.Rows(0)("RESPONSABLE").ToString & """,")
                        resb.Append("""PERSONA"":""" & dt.Rows(0)("PERSONA").ToString.Trim() & """,")
                        resb.Append("""CODIGO_OPERACION"":""" & dt.Rows(0)("CODIGO_OPERACION").ToString.Trim() & """,")
                        resb.Append("""TIPO_REG"":""" & dt.Rows(0)("TIPO_REGISTRO").ToString & """")
                        resb.Append("}")
                        resb.Append("]")
                        res = resb.ToString()

                    Else
                        res = ""
                    End If

                Case "GEN_ASIENTO"
                    Dim oCTGeneracionAsientos As New Nomade.CT.CTGeneracionAsientos()
                    Dim strCodAsientoCobroDetracDocVenta As String
                    strCodAsientoCobroDetracDocVenta = oCTGeneracionAsientos.GenerarAsientoMovBancario(codigo, "N", "ADMINSIS", tipoOpeCta)
                    res = strCodAsientoCobroDetracDocVenta

            End Select

            context.Response.Write(res)

        Catch ex As Exception

            context.Response.Write("error" & ex.ToString)

        End Try

    End Sub




    Public Function GenerarSelect(ByVal dt As DataTable, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then

            res = "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                If clase = "EMPRESA" Then
                    res += "<option ruc="""& dt.Rows(i)("RUC").ToString()&""" pidm=""" & dt.Rows(i)("PIDM").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                Else
                    If clase = "CTABANC" Then
                        res += "<option"
                        res += " moneda=""" & dt.Rows(i)("MONEDA_CODE").ToString()
                        res += """ value=""" & dt.Rows(i)(cvalue).ToString()
                        res += """monto=""" & dt.Rows(i)("SALDO")
                        res += """pidm_banco=""" & dt.Rows(i)("PIDM_BANCO")
                        res += """>" & dt.Rows(i)(chtml).ToString() & " SD:" & dt.Rows(i)("SALDO") & "</option>"
                    Else
                        res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                    End If
                End If
            Next

        Else
            res = "error"
        End If
        Return res
    End Function


    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class