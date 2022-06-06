<%@ WebHandler Language="VB" Class="NBMCHEQ" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NBMCHEQ : Implements IHttpHandler

    Dim res, flag As String
    Dim resb As New StringBuilder
    Dim dt, dt2 As DataTable
    Dim codigo, glosa, moneda, empresa, tipo, numero, refgirador, lugar, fechaemision, fechacobrar, monto, girador, giradoa, avalista, banco, oficina, dc, numerocta, importe, estado, usuario, destino As String
    Dim firmante As String
    Dim empresapidm As String
    Dim b As New Nomade.NB.NBChequera("bn")
    Dim p As New Nomade.NB.NBCheque("bn")
    Dim cuenta_bancaria As String
    Dim pidm_cuenta As String
    Dim fechargto As String
    Dim firmante2 As String
    Dim fondos_ind As String
    Dim code_chequera As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"

        flag = context.Request("flag")
        empresapidm = context.Request("empresapidm")


        codigo = context.Request("codigo")
        empresa = context.Request("empresa")
        tipo = context.Request("tipo")
        numero = context.Request("numero")

        fechaemision = context.Request("fechaemision")
        If fechaemision <> String.Empty Then
            fechaemision = Utilities.fechaLocal(context.Request("fechaemision"))
        End If
        fechacobrar = context.Request("fechacobrar")
        If fechacobrar <> String.Empty Then
            fechacobrar = Utilities.fechaLocal(context.Request("fechacobrar"))
        End If

        fechargto = context.Request("fechargto")
        If fechargto <> String.Empty Then
            fechargto = Utilities.fechaLocal(context.Request("fechargto"))
        End If

        monto = context.Request("monto")

        giradoa = context.Request("giradoa")


        estado = context.Request("estado")
        usuario = context.Request("usuario")

        firmante = context.Request("firmante")
        firmante2 = context.Request("firmante2")
        moneda = context.Request("moneda")
        glosa = context.Request("glosa")
        cuenta_bancaria = context.Request("cuenta_bancaria")
        pidm_cuenta = context.Request("pidm_cuenta")
        destino = context.Request("destino")
        fondos_ind = context.Request("fondos_ind")
        code_chequera = context.Request("code_chequera")

        Try

            Select Case flag

                Case "1"

                    res = p.CrearCheque(empresa, cuenta_bancaria, pidm_cuenta, numero, fechaemision, fechacobrar, monto, fechargto, giradoa, "A", estado, usuario, firmante, firmante2, destino, moneda, glosa, tipo, fondos_ind)

                Case "2"

                    res = p.ActualizarCheque(empresa, cuenta_bancaria, pidm_cuenta, numero, fechaemision, fechacobrar, monto, fechargto, giradoa, "A", estado, usuario, firmante, firmante2, moneda, glosa, tipo, destino)

                Case "3"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarCheque(numero, cuenta_bancaria, pidm_cuenta, tipo)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""TIPO"" :" & """" & dt.Rows(0)("TIPO") & """,")
                    resb.Append("""NUMERO_CHEQ"" :" & """" & dt.Rows(0)("NUMERO_CHEQ") & """,")
                    resb.Append("""FECHA_REGISTRO"" :" & """" & dt.Rows(0)("FECHA_REGISTRO") & """,")
                    resb.Append("""CTA_CODE"" :" & """" & dt.Rows(0)("CTA_CODE") & """,")
                    resb.Append("""FECHA_EMISION"" :" & """" & dt.Rows(0)("FECHA_EMISION") & """,")
                    resb.Append("""FECHA_COBRAR"" :" & """" & dt.Rows(0)("FECHA_COBRAR") & """,")
                    resb.Append("""MONTO"" :" & """" & dt.Rows(0)("MONTO") & """,")
                    resb.Append("""GIRADOA"" :" & """" & dt.Rows(0)("GIRADOA") & """,")
                    resb.Append("""NGIRADOA"" :" & """" & dt.Rows(0)("NGIRADOA") & """,")
                    resb.Append("""CTA_PIDM"" :" & """" & dt.Rows(0)("CTA_PIDM") & """,")
                    resb.Append("""ESTADO_CHEQ"" :" & """" & dt.Rows(0)("ESTADO_CHEQ") & """,")
                    resb.Append("""EMPRESA"" :" & """" & dt.Rows(0)("EMPRESA") & """,")
                    resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """,")
                    resb.Append("""FIRMANTE"" :" & """" & dt.Rows(0)("FIRMANTE") & """,")
                    resb.Append("""NFIRMANTE"" :" & """" & dt.Rows(0)("NFIRMANTE") & """,")
                    resb.Append("""FIRMANTE_2"" :" & """" & dt.Rows(0)("FIRMANTE_2") & """,")
                    resb.Append("""NFIRMANTE_2"" :" & """" & dt.Rows(0)("NFIRMANTE_2") & """,")
                    resb.Append("""GLOSA"" :" & """" & dt.Rows(0)("GLOSA") & """,")
                    resb.Append("""DESTINO"" :" & """" & dt.Rows(0)("DESTINO") & """,")
                    resb.Append("""MONEDA"" :" & """" & dt.Rows(0)("MONEDA") & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()

                Case "4"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    If code_chequera Is Nothing Or code_chequera = "" Then
                        code_chequera = String.Empty
                    End If

                    res = p.ObtenerNroCheque(cuenta_bancaria, pidm_cuenta, tipo, code_chequera)
                    resb.Append("{")
                    resb.Append("""NUMERO_CHEQUE"" : " & """" & res & """")
                    resb.Append("}")
                    res = resb.ToString()

                Case "4.5"

                    res = p.ObtenerChequesRestantes(cuenta_bancaria, pidm_cuenta, tipo)

                Case "5"
                    Dim p As New Nomade.NC.NCEmpresa("BN")
                    dt = p.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "codigo", "descripcion", "EMPRESA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "codigo", "descripcion", "EMPRESA")
                    End If

                Case "6"
                    dt = b.ListarCtasBancarias(empresapidm, "A", "S")
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "code", "DESCRIPCION", "CTABANC", cuenta_bancaria, empresa, monto)
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "code", "DESCRIPCION", "CTABANC", cuenta_bancaria, empresa, monto)
                    End If


                Case "7"
                    Dim p As New Nomade.GL.GLLetras("Bn")
                    dt = p.ListarMoneda(empresa)
                    res = GenerarSelect(dt, "codigo", "descripcion", "MONEDA")

                Case "8"
                    Dim p2 As New Nomade.NC.NCCuentaBancaria("Bn")
                    dt2 = p2.ListarAutorizadosMixtos(cuenta_bancaria, empresa, 0, monto)

                    If Not (dt2 Is Nothing) Then
                        For i As Integer = 0 To (dt2.Rows(0)("AUT_PIDMS").ToString.Split(",").Length - 1)
                            resb.Append("<option value=""" & i + 1 & """ valor=""" & dt2.Rows(0)("AUT_PIDMS").ToString.Split(",")(i) & """>" & dt2.Rows(0)("AUT_NOMBRES").ToString.Split(",")(i) & "</option>")

                        Next
                    End If
                    res = resb.ToString()

                Case "L"
                    Dim q As New NOMADE.NC.NCPersona("Bn")
                    dt = q.listar_Persona("S")

                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""NOMBRE"" :" & """" & MiDataRow("NOMBRE").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "Letras"

                    Dim l As New NOMADE.NB.Numalet(False, "00/100", "con", True)

                    res = l.ToCustomCardinal(numero)

                Case "M"
                    Dim p As New NOMADE.NC.NCMonedas("BN")
                    dt = p.ListarMoneda(codigo, String.Empty, "A")
                    res = dt.Rows(0)("Simbolo").ToString

                Case "D"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim q As New NOMADE.NB.NBCheque("Bn")
                    dt = q.ListarCheque_Detallle(numero, cuenta_bancaria, pidm_cuenta, tipo)

                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""FECHA"" :" & """" & MiDataRow("FECHA").ToString & """,")
                            resb.Append("""USUARIO"" :" & """" & MiDataRow("NUSUARIO").ToString & """,")
                            resb.Append("""NESTADO_CHEQ"" :" & """" & MiDataRow("NESTADO_CHEQ").ToString & """,")
                            resb.Append("""GLOSA"" :" & """" & MiDataRow("GLOSA").ToString & """,")
                            resb.Append("""ESTADO_CHEQ"" :" & """" & MiDataRow("ESTADO_CHEQ").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "TC"
                    Dim p As New Nomade.FI.SWTipoCambio("Bn")
                    res = p.TipoCambioHoy().Rows(0)("Venta")


                Case "LCU" 'Lista Cuentas de la Empresa
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim dt As New DataTable
                    Dim oChequera As New Nomade.NB.NBChequera("Bn")
                    dt = oChequera.ListarCtasBancarias(pidm_cuenta, estado, "")
                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If
                    'context.Response.Write(res)

                Case "LCHE" 'Lista cheques
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim dt As New DataTable
                    dt = p.ListarCheque(IIf(numero Is Nothing, "", numero), cuenta_bancaria, pidm_cuenta, IIf(tipo Is Nothing, "", tipo), IIf(estado Is Nothing, "", estado))
                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If
                    'context.Response.Write(res)




            End Select

            context.Response.Write(res)

        Catch ex As Exception

            context.Response.Write("error" & ex.ToString)

        End Try

    End Sub

    Public Function GenerarSelect(ByVal dt As DataTable, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String, Optional ByVal cuenta_bancaria As String = "", Optional ByVal empresa As String = "", Optional ByVal monto As String = "") As String
        If Not dt Is Nothing Then

            res = "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                If clase = "EMPRESA" Then
                    res += "<option pidm=""" & dt.Rows(i)("PIDM").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                Else
                    If clase = "CTABANC" Then
                        res += "<option firma=""" & dt.Rows(i)("FIRMA").ToString()

                        If dt.Rows(i)("AUT_PIDMS").ToString <> "" Then
                            res += """ aut1pim=""" & dt.Rows(i)("AUT_PIDMS").ToString().Split(",")(0)
                            res += """ aut1=""" & dt.Rows(i)("AUT_NOMBRES").ToString().Split(",")(0)
                            For j As Integer = 0 To dt.Rows(i)("AUT_PIDMS").ToString().Split(",").Length - 2
                                res += """ aut" & j + 2 & "pim=""" & dt.Rows(i)("AUT_PIDMS").ToString().Split(",")(j + 1)
                                res += """ aut" & j + 2 & "=""" & dt.Rows(i)("AUT_NOMBRES").ToString().Split(",")(j + 1)
                            Next

                        End If

                        res += """ moneda=""" & dt.Rows(i)("MONEDA_CODE").ToString()
                        res += """ pidm=""" & dt.Rows(i)("PIDM").ToString()
                        res += """ saldo=""" & dt.Rows(i)("SALDO").ToString()
                        res += """ value=""" & dt.Rows(i)(cvalue).ToString()
                        res += """>" & dt.Rows(i)(chtml).ToString() & " / SD:" & dt.Rows(i)("SALDO").ToString() & "</option>"
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