  <%@ WebHandler Language="VB" Class="CCMCBDT" %>

Imports System
Imports System.Web
Imports System.Data


Public Class CCMCBDT : Implements IHttpHandler
    Dim dt, dt2 As DataTable
    Dim s As New Nomade.NC.NCEAdicionales("bn")
    Dim DetraccionCliente As New Nomade.CC.CCDetraccionCliente("Bn")
    Dim ccPercepcion As New Nomade.CC.CCPercepcion("Bn")
    Dim flag As String
    Dim res As String
    Dim resb As New StringBuilder
    Dim empresapidm As String
    Dim codigo As String
    Dim empresa As String
    Dim proveedor As String
    Dim prov As New Nomade.NC.NCEProveedor("Bn")
    Dim estable As String
    Dim detalle As String
    Dim caja As String
    Dim usuario As String
    Dim codigo_apertura As String
    Dim moneda As String
    Dim medio_pago As String
    Dim descripcion As String
    Dim destino As String
    Dim fecha_pago As String
    Dim banco As String
    Dim cuenta As String
    Dim pidmcuenta As String
    Dim tipo As String
    Dim factura As String
    Dim documento As String
    Dim completo As String
    Dim adicional As String
    Dim monto_total As String
    Dim origen As String
    Dim origen_pidm As String
    Dim origen_codigo_banco As String
    Dim estado As String '25/02/2021
    Dim quitarCtaDetraccion As String
    Dim esCliente As String
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"

        flag = context.Request("flag")
        empresapidm = context.Request("empresapidm")
        codigo = context.Request("codigo")
        empresa = context.Request("empresa")
        proveedor = context.Request("proveedor")
        detalle = context.Request("detalle")
        caja = context.Request("caja")
        usuario = context.Request("usuario")
        codigo_apertura = context.Request("codigo_apertura")
        moneda = context.Request("moneda")
        medio_pago = context.Request("medio_pago")
        descripcion = context.Request("descripcion")
        destino = context.Request("destino")
        fecha_pago = Utilities.fechaLocal(context.Request("fecha_pago"))
        banco = context.Request("banco")
        cuenta = context.Request("cuenta")
        pidmcuenta = context.Request("pidmcuenta")
        tipo = context.Request("tipo")
        factura = context.Request("factura")
        documento = context.Request("documento")
        completo = context.Request("completo")
        adicional = context.Request("adicional")
        monto_total = context.Request("monto_total")
        origen = context.Request("origen")
        origen_pidm = context.Request("origen_pidm")
        origen_codigo_banco = context.Request("origen_codigo_banco")
        estado = context.Request("estado")
        quitarCtaDetraccion = context.Request("quitarCtaDetraccion")
        esCliente = context.Request("esCliente")

        Try

            Select Case flag.ToString()

                Case "1" 'crear pago x banco
                    res = DetraccionCliente.CobrarDetraccionCliente(detalle, pidmcuenta, cuenta, usuario, empresa, fecha_pago, moneda, medio_pago, descripcion, destino, documento, completo, monto_total, origen, origen_pidm, origen_codigo_banco)

                    If res.Equals("TC") Then
                        Dim oCTGeneracionAsientos As New Nomade.CT.CTGeneracionAsientos()
                        Dim strCodAsientoCobroDetracDocVenta As String
                        For Each item As String In detalle.Split("|")
                            'Ejemplo de traza: D000000517,FE01-0012284,300.000,0,S
                            Dim p_CodDetracCode As String = item.Split(",")(0)
                            strCodAsientoCobroDetracDocVenta = oCTGeneracionAsientos.GenerarAsientoCobroDetraccionDocVenta(p_CodDetracCode)
                        Next
                    End If

                Case "2" 'lista forma de pago

                    dt = ccPercepcion.ListarFormasPago("", "", "", "A")
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "codigo", "descripcion_corta", "FOPA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "descripcion_corta", "ASC"), "codigo", "descripcion_corta", "FOPA")
                    End If


                Case "3"
                    dt = prov.ListarProveedor("0", "A", empresa)
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "pidm", "razon_social", "PROVEEDOR")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "razon_social", "ASC"), "pidm", "razon_social", "PROVEEDOR")
                    End If

                Case "4"

                    Dim dt As DataTable
                    Dim resb As New StringBuilder

                    dt = DetraccionCliente.ListarDetraccionCliente(String.Empty, String.Empty, "N", empresa, estado)
                    If Not dt Is Nothing Then
                        resb.Append("[")

                        For Each row As DataRow In dt.Rows

                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO_DETRACCION").ToString & """,")
                            resb.Append("""NOMBRE"":""" & row("NOMBRE").ToString & """,")
                            resb.Append("""TIPO_DOC"":""" & row("TIPO_DOC").ToString & """,")
                            resb.Append("""DOCUMENTO"":{""CODIGO"":""" & row("CODIGO_DOC").ToString & """,""NUMERO"":""" & row("NUMERO_DOC").ToString & """},")
                            resb.Append("""FECHA_EMISION_DCTO"":{""display"":""" & row("FECHA_EMISION_DCTO").ToString & """,""order"":""" & String.Join("", row("FECHA_EMISION_DCTO").ToString.Split("/").Reverse()) & """},")
                            resb.Append("""ES_MONEDA_BASE"":""" & row("ES_MONEDA_BASE").ToString & """,")
                            resb.Append("""MONTO"":""" & row("MONTO").ToString & """,")
                            resb.Append("""MONEDA"":{""CODIGO"":""" & row("MONE_CODE") & """,""SIMBOLO"":""" & row("MONEDA").ToString & """},")
                            resb.Append("""AUTODETRACCION"":""" & row("AUTODETRACCION").ToString & """,") '25/02/2021
                            resb.Append("""CLIENTE"":{""CODIGO"":""" & row("CLIENTE").ToString & """,""NOMBRE"":""" & row("NCLIENTE").ToString & """}")
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
                        res = GenerarSelect(dt, "codigo", "descripcion", "EMPRESA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "codigo", "descripcion", "EMPRESA")
                    End If


                Case "6"
                    dt = s.Listar_DatosBancarios(empresapidm, "", banco, moneda, "0005", "A", "S") '0005 cuenta detracciones
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "code", "DESCRIPCION", "CTABANC")
                    ElseIf String.IsNullOrEmpty(quitarCtaDetraccion) Then
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "code", "DESCRIPCION", "CTABANC")
                    ElseIf Not quitarCtaDetraccion.Equals("S") Then
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "code", "DESCRIPCION", "CTABANC")
                    Else
                        Dim dtClone As New DataTable
                        dtClone = dt.Clone

                        For Each row As DataRow In dt.Rows
                            If Not row("TCUE_CODE").ToString.Equals("0005") Then
                                dtClone.ImportRow(row)
                            End If
                        Next

                        If dtClone.Rows.Count = 0 Then
                            res = GenerarSelect(dtClone, "code", "DES", "CTABANC")
                        Else
                            res = GenerarSelect(SortDataTableColumn(dtClone, "DES", "ASC"), "code", "DES", "CTABANC")
                        End If
                    End If

                Case "6.5"
                    esCliente = IIf(String.IsNullOrEmpty(esCliente), "N", esCliente)
                    dt = s.Listar_DatosBancarios(empresapidm, "", "", moneda, "", "A", IIf(esCliente.Equals("S"), "N", "S"))
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "code", "DES", "CTABANC")
                    ElseIf String.IsNullOrEmpty(quitarCtaDetraccion) Then
                        res = GenerarSelect(SortDataTableColumn(dt, "DES", "ASC"), "code", "DES", "CTABANC")
                    ElseIf Not quitarCtaDetraccion.Equals("S") Then
                        res = GenerarSelect(SortDataTableColumn(dt, "DES", "ASC"), "code", "DES", "CTABANC")
                    Else
                        Dim dtClone As New DataTable
                        dtClone = dt.Clone

                        For Each row As DataRow In dt.Rows
                            If Not row("TCUE_CODE").ToString.Equals("0005") Then
                                dtClone.ImportRow(row)
                            End If
                        Next

                        If dtClone.Rows.Count = 0 Then
                            res = GenerarSelect(dtClone, "code", "DES", "CTABANC")
                        Else
                            res = GenerarSelect(SortDataTableColumn(dtClone, "DES", "ASC"), "code", "DES", "CTABANC")
                        End If
                    End If

                Case "6.6"
                    dt = s.Listar_DatosBancarios(empresapidm, "", "", moneda, "", "A", "S")

                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "code", "DES", "CTABANC")
                    ElseIf String.IsNullOrEmpty(quitarCtaDetraccion) Then
                        res = GenerarSelect(SortDataTableColumn(dt, "DES", "ASC"), "code", "DES", "CTABANC")
                    ElseIf Not quitarCtaDetraccion.Equals("S") Then
                        res = GenerarSelect(SortDataTableColumn(dt, "DES", "ASC"), "code", "DES", "CTABANC")
                    Else
                        Dim dtClone As New DataTable
                        dtClone = dt.Clone

                        For Each row As DataRow In dt.Rows
                            If Not row("TCUE_CODE").ToString.Equals("0005") Then
                                dtClone.ImportRow(row)
                            End If
                        Next

                        If dtClone.Rows.Count = 0 Then
                            res = GenerarSelect(dtClone, "code", "DES", "CTABANC")
                        Else
                            res = GenerarSelect(SortDataTableColumn(dtClone, "DES", "ASC"), "code", "DES", "CTABANC")
                        End If
                    End If

                Case "7"
                    Dim p As New Nomade.NC.NCCaja("BN")
                    dt = p.ListarCajasAperturadas(String.Empty, empresa, String.Empty, String.Empty, "A", usuario)
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "CODIGO", "DESCRIPCION", "CAJA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "CODIGO", "DESCRIPCION", "CAJA")
                    End If

                    'VALIDA CAJA ACTIVA
                Case "7.5"
                    Dim p As New Nomade.NC.NCCaja("BN")
                    res = p.ListarCajasAperturadas(codigo, empresa, String.Empty, String.Empty, "A").Rows(0)("MONTOCAJA").ToString()



                Case "8"
                    Dim p As New Nomade.NB.NBCheque("Bn")
                    dt = p.ListarCheque("", cuenta, pidmcuenta, "", "E", "P")
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "NUMERO_CHEQ", "NUMERO_CHEQ", "CHEQUE")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "NUMERO_CHEQ", "ASC"), "NUMERO_CHEQ", "NUMERO_CHEQ", "CHEQUE")
                    End If

                Case "9"
                    Dim p As New Nomade.NC.NCTarjetasEmpresa("Bn")
                    dt = p.ListarTarjetaEmpresa("", pidmcuenta, cuenta, "A", tipo)
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "CODE", "NUMERO", "NTARJETA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "NUMERO", "ASC"), "CODE", "NUMERO", "NTARJETA")
                    End If

                Case "M"
                    Dim p As New Nomade.NC.NCMonedas("BN")
                    dt = p.ListarMoneda(codigo, String.Empty, "A")
                    res = dt.Rows(0)("Simbolo").ToString

                Case "MO"
                    Dim p As New Nomade.GL.GLLetras("Bn")
                    dt = p.ListarMoneda(empresa)
                    res = GenerarSelect(dt, "codigo", "descripcion", "MONEDA")

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
                    res += "<option pidm=""" & dt.Rows(i)("PIDM").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                Else
                    If clase = "CTABANC" Then
                        res += "<option monto=""" & dt.Rows(i)("SALDO") & """ banco=""" & dt.Rows(i)("BANC_CODE") & """ moneda=""" & dt.Rows(i)("MONE_CODE").ToString() & """ pidm=""" & dt.Rows(i)("PIDM").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                    Else
                        If clase = "MONEDA" Then
                            res += "<option tipo=""" & dt.Rows(i)("TIPO").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                        Else
                            If clase = "CAJA" Then
                                res += "<option monto=""" & dt.Rows(i)("MONTOCAJA").ToString() & """ monto_d=""" & dt.Rows(i)("MONTOCAJA_DOLARES").ToString() & """ codigo=""" & dt.Rows(i)("CODIGO_APERTURA").ToString() & """ stbl=""" & dt.Rows(i)("SUCURSAL").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                            Else
                                If clase = "CHEQUE" Then
                                    res += "<option tipo=""" & dt.Rows(i)("TIPO").ToString() & """ ngiradoa=""" & dt.Rows(i)("NGIRADOA").ToString() & """ giradoa=""" & dt.Rows(i)("GIRADOA").ToString() & """ monto=""" & dt.Rows(i)("MONTO").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & " (" & dt.Rows(i)("SMONEDA").ToString() & " " & dt.Rows(i)("MONTO").ToString() & ")" & "</option>"
                                Else
                                    If dt.Rows(i)(chtml).ToString() <> String.Empty Then
                                        res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                                    End If
                                End If
                            End If
                        End If
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