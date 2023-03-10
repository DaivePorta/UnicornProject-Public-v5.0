  <%@ WebHandler Language="VB" Class="CCMCMDT" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO
Imports System.Drawing
Imports System.Drawing.Imaging


Public Class CCMCMDT : Implements IHttpHandler
    Dim dt, dt2 As DataTable
    Dim s As New Nomade.NC.NCEAdicionales("bn")
    Dim ccdetraccion As New Nomade.CC.CCDetraccionCliente("Bn")
    Dim PagoProveedor As New Nomade.CP.CPPagoProveedor("Bn")
    Dim ccPercepcion As New Nomade.CC.CCPercepcion("Bn")
    Dim nceCliente As New Nomade.NC.NCECliente("Bn")
    Dim flag As String
    Dim res As String
    Dim resb As New StringBuilder
    Dim empresapidm As String
    Dim codigo As String
    Dim empresa As String
    Dim cliente As String
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
    Dim estado As String
    Dim esCliente As String
    Dim notaCredito As String
    Dim tipo_cambio As String
    Dim establec, VALIDAR_IMG As String
    Dim sRutaImagenes As String = System.Configuration.ConfigurationManager.AppSettings("PathImagenes") + "Sustentos"
    Dim RUTA_IMAGEN As String = ""
    Dim RUTA As String = ""
    Dim autodetracc_ind As String

    Dim resArray As Array

    Dim fini As String
    Dim ffin As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"

        flag = context.Request("flag")
        empresapidm = context.Request("empresapidm")
        codigo = context.Request("codigo")
        empresa = context.Request("empresa")
        cliente = context.Request("cliente")
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
        esCliente = context.Request("esCliente")
        notaCredito = context.Request("notacredito")
        tipo_cambio = context.Request("tipo_cambio")
        establec = context.Request("establec")
        fini = context.Request("fini")
        autodetracc_ind = context.Request("autodetracc_ind")

        RUTA_IMAGEN = context.Request("RUTA_IMAGEN")

        If fini <> "" Then
            fini = Utilities.fechaLocal(fini)
        End If
        ffin = context.Request("ffin")
        If ffin <> "" Then
            ffin = Utilities.fechaLocal(ffin)
        End If
        Try

            Select Case flag.ToString()

                Case "1" 'crear pago x caja
                    If RUTA_IMAGEN = "../../recursos/img/no_disponible.jpg" Then
                        VALIDAR_IMG = "NO"
                    Else
                        VALIDAR_IMG = "SI"
                    End If

                    resArray = ccdetraccion.PagarDetraccionesVariasCaja(detalle, caja, usuario, codigo_apertura, empresa, fecha_pago, moneda, medio_pago, descripcion, destino, documento, tipo_cambio, VALIDAR_IMG, "CAJ", notaCredito, "", "", "", "", "", "", monto_total)

                    Dim oCTGeneracionAsientos As New Nomade.CT.CTGeneracionAsientos()
                    Dim strCodAsientoDetraccion As String
                    For Each item As String In detalle.Split("|")
                        Dim p_CodDetracCode As String = item.Split(",")(0)
                        strCodAsientoDetraccion = oCTGeneracionAsientos.GenerarAsientoCobroDetraccionDocVenta(p_CodDetracCode)
                    Next

                    If RUTA_IMAGEN <> "" And resArray(1) = "TC" And VALIDAR_IMG = "SI" Then
                        RUTA = GrabaImagen(RUTA_IMAGEN, context, resArray(0).ToString + ".jpg")
                    End If

                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODE_GENERADO"" :" & """" & resArray(0).ToString & """,")
                    resb.Append("""SUCCESS"" :" & """" & resArray(1).ToString & """")
                    resb.Append("}")
                    resb.Append("]")

                    res = resb.ToString()

                Case "1.5" 'crear pago x banco
                    If RUTA_IMAGEN = "../../recursos/img/no_disponible.jpg" Then
                        VALIDAR_IMG = "NO"
                    Else
                        VALIDAR_IMG = "SI"
                    End If
                    resArray = ccdetraccion.PagarDetraccionesVariasBanco(detalle, caja, pidmcuenta, cuenta, usuario, empresa, fecha_pago, moneda, medio_pago, descripcion, destino, documento, completo, monto_total, tipo_cambio, VALIDAR_IMG, origen, origen_pidm, origen_codigo_banco, adicional, "BAN", "", "", codigo_apertura)
                    If resArray(1).Equals("TC") Then
                        Dim oCTGeneracionAsientos As New Nomade.CT.CTGeneracionAsientos()
                        Dim strCodAsientoCobroDetracDocVenta As String
                        For Each item As String In detalle.Split("|")
                            Dim p_CodDetracCode As String = item.Split(",")(0)
                            strCodAsientoCobroDetracDocVenta = oCTGeneracionAsientos.GenerarAsientoCobroDetraccionDocVenta(p_CodDetracCode)
                        Next
                    End If

                    If RUTA_IMAGEN <> "" And resArray(1) = "TC" And VALIDAR_IMG = "SI" Then
                        RUTA = GrabaImagen(RUTA_IMAGEN, context, resArray(0).ToString + ".jpg")
                    End If

                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODE_GENERADO"" :" & """" & resArray(0).ToString & """,")
                    resb.Append("""SUCCESS"" :" & """" & resArray(1).ToString & """")
                    resb.Append("}")
                    resb.Append("]")

                    res = resb.ToString()

                Case "2" 'lista forma de pago

                    dt = ccPercepcion.ListarFormasPago("", "", "", "A")
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "codigo", "descripcion_corta", "FOPA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "descripcion_corta", "ASC"), "codigo", "descripcion_corta", "FOPA")
                    End If

                Case "3"
                    dt = ccdetraccion.ListarClientesPorPagarDetracciones(empresa) 'DPORTA 18/03/2021
                    If dt Is Nothing Then
                        res = "<option></option>"
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "NCLIENTE", "ASC"), "pidm", "NCLIENTE", "CLIENTE")
                    End If

                Case "4"
                    dt = ccdetraccion.ListarDeudasDetraccionCliente(empresa, "N", "A", cliente, autodetracc_ind, establec, fini, ffin)
                    Dim ind As Boolean = False
                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = ""
                    End If

                Case "4.5"
                    dt = ccdetraccion.ListarAmortizacionesDetracciones(factura)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""DESTINO"":""" & row("DESTINO").ToString & """,")
                            resb.Append("""ORIGEN"":""" & row("ORIGEN").ToString & """,")
                            resb.Append("""FECHA"":{""display"":""" & row("FECHA_FORMATO").ToString & """,""order"":""" & String.Join("", row("FECHA_FORMATO").ToString.Split("/").Reverse()) & """},")
                            resb.Append("""FORMA_PAGO"":""" & row("FORMA_PAGO").ToString & """,")
                            resb.Append("""DOCUMENTO"":""" & row("DOCUMENTO").ToString & """,")
                            resb.Append("""SIMBOLO_MONEDA"":""" & row("SIMBOLO_MONEDA").ToString & """,")
                            resb.Append("""MONTO"":""" & row("MONTO").ToString & """")
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


                Case "5.5"
                    Dim p As New Nomade.NC.NCSucursal("BN")
                    dt = p.ListarSucursal(empresa, String.Empty, "A")
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "codigo", "descripcion", "SUCURSAL")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "codigo", "descripcion", "SUCURSAL")
                    End If


                Case "6"

                    dt = s.Listar_DatosBancarios(empresapidm, "", banco, moneda, "", "A")
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "code", "DESCRIPCION", "CTABANC")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "code", "DESCRIPCION", "CTABANC")
                    End If

                Case "6.5"

                    dt = s.Listar_DatosBancarios(empresapidm, "", "", moneda, "", "A")

                    Dim rows() As DataRow = dt.Select("TCUE_CODE = '0005'")

                    If rows.Length > 0 Then
                        dt = rows.CopyToDataTable()
                    End If

                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "code", "DES", "CTABANC")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DES", "ASC"), "code", "DES", "CTABANC")
                    End If

                Case "7"
                    Dim p As New Nomade.NC.NCCaja("BN")
                    dt = p.ListarCajasAperturadas(String.Empty, empresa, establec, String.Empty, "A", usuario)
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

            End Select

            context.Response.Write(res)

        Catch ex As Exception

            context.Response.Write("error" & ex.ToString)

        End Try

    End Sub

    Public Function GrabaImagen(ByVal img As String, ByVal context As HttpContext, ByVal nombrearch As String) As String
        Dim rp As String = String.Empty
        Try
            Dim savepath As String = sRutaImagenes
            Dim filename As String = nombrearch

            If Not Directory.Exists(savepath) Then
                Directory.CreateDirectory(savepath)
            End If

            File.WriteAllBytes(savepath & "\" & filename, Utilities.Base64ImgToBytes(img))
            rp = "/" & filename

            context.Response.StatusCode = 200

        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try

        Return rp
    End Function


    Private Function GetEncoder(ByVal format As ImageFormat) As ImageCodecInfo
        Dim codecs As ImageCodecInfo() = ImageCodecInfo.GetImageDecoders()
        Dim codec As ImageCodecInfo
        For Each codec In codecs
            If codec.FormatID = format.Guid Then
                Return codec
            End If
        Next codec
        Return Nothing
    End Function

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
                            res += "<option simbolo=""" & dt.Rows(i)("SIMBOLO").ToString() & """ tipo=""" & dt.Rows(i)("TIPO").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
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