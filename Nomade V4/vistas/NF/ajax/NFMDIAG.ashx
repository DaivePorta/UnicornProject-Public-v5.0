<%@ WebHandler Language="VB" Class="NFMDIAG" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NFMDIAG : Implements IHttpHandler

    Dim code, opcion, ctlg_code, scsl_code, code_rece, fec_diagnostico, fec_entrega, hora_diagnostico, hora_entrega,
        code_cotiz, autorizado, monto_cotiz, diagnostico, recomendacion, pidm_tecnico, estado, concepto, monto,
        usua_id, tipo, est_atencion, almc_code, dcto_cliente, dcto_code, des_concepto, igv, importe, pidm_cliente, cate_cliente,
        prod_code, prod_prec_ind, prod_seriado, prod_almacenable_ind, prod_costo, fecha_dia As String
    Dim d As New Nomade.NF.NFDiagnostico("Bn")
    Dim r As New Nomade.NF.NFRecepcion("Bn")
    Dim a As New Nomade.NA.NAConfAlmacenes("Bn")

    Dim dt As DataTable
    Dim res, cod, msg, resd As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        'Capturamos los valores que nos envia el formulario
        '==================================================

        opcion = context.Request("OPCION")
        code = context.Request("CODE")
        ctlg_code = context.Request("CTLG_CODE")
        scsl_code = context.Request("SCSL_CODE")
        fec_entrega = context.Request("FEC_ENTREGA")
        hora_entrega = context.Request("HORA_ENTREGA")
        usua_id = context.Request("USUA_ID")
        tipo = context.Request("TIPO")
        code_rece = context.Request("CODE_RECE")
        fec_diagnostico = context.Request("FEC_DIAGNOSTICO")
        hora_diagnostico = context.Request("HORA_DIAGNOSTICO")
        code_cotiz = IIf(context.Request("CODE_COTIZ") = "", Nothing, context.Request("CODE_COTIZ"))
        monto_cotiz = context.Request("MONTO_COTIZ")
        diagnostico = context.Request("DIAGNOSTICO")
        recomendacion = context.Request("RECOMENDACION")
        pidm_tecnico = context.Request("PIDM_TECNICO")
        estado = context.Request("ESTADO")
        concepto = context.Request("CONCEPTO")
        des_concepto = context.Request("DESC_CONCEPTO")
        monto = context.Request("MONTO")
        est_atencion = context.Request("EST_ATENCION")
        almc_code = context.Request("ALMC_CODE")
        dcto_cliente = context.Request("DCTO_CLIENTE")
        pidm_cliente = context.Request("PIDM_CLIENTE")
        cate_cliente = context.Request("CATE_CLIENTE")
        prod_code = context.Request("PROD_CODE")
        prod_prec_ind = context.Request("PROD_PREC_IND")
        prod_seriado = context.Request("PROD_SERIADO")
        prod_almacenable_ind = context.Request("PROD_ALMACENABLE_IND")
        prod_costo = context.Request("PROD_COSTO")
        fecha_dia = context.Request("FECHA_DIA")

        Try
            Select Case opcion

                Case "1" 'GRABAR DIAGNOSTICO
                    res = d.CrearDiagnostico(code_rece, Utilities.fechaLocal(fec_diagnostico), hora_diagnostico, Utilities.fechaLocal(fec_entrega), hora_entrega, code_cotiz, monto_cotiz, diagnostico, recomendacion, pidm_tecnico, estado, almc_code, concepto, monto, est_atencion, usua_id)
                    If Not (res Is Nothing) Then
                        If est_atencion = "D" Then
                            ' SI LA ATENCION SE CIERRA COMO DIAGNOSTICO SE CREA UN DOCUMENTO DE VENTA POR EL SERVICIO QUE SE BRINDO
                            Dim v As New Nomade.NV.NVVenta("Bn")
                            Dim array As Array

                            If dcto_cliente = "6" Then
                                dcto_code = "0001"
                                importe = Decimal.Parse(monto) / 1.18
                                igv = Decimal.Parse(monto) - importe

                            Else
                                dcto_code = "0001"
                                importe = Decimal.Parse(monto) / 1.18
                                igv = Decimal.Parse(monto) - importe

                                'Else
                                'dcto_cliente = "0000"
                            End If

                            Dim p_detalles As String
                            p_detalles =
                                "1;" +
                                concepto + ";" +
                                des_concepto + ";" +
                                "0007;" +
                                "1;" +
                                monto.ToString + ";" +
                                "0;" +
                                monto.ToString + ";" +
                                "0;" +
                                "0;" +
                                des_concepto + ";" +
                                "GRA;" +
                                prod_prec_ind + ";" +
                                "0;" +
                                "0;" +
                                (monto / DevolverTipoCambio()).ToString + ";" +
                                "0;" +
                                (monto / DevolverTipoCambio()).ToString + ";" +
                                String.Empty + ";" +
                                String.Empty + ";" +
                                prod_almacenable_ind + ";" +
                                String.Empty + ";" +
                                prod_seriado + ";" +
                                String.Empty + ";" +
                                "N;" +
                                prod_costo + ";" +
                                almc_code + ";" +
                                cate_cliente + ";" +
                                "NO;" + "|"

                            array = v.CrearDocumentoVentaWeb("", "", dcto_code,
                                                     If(fecha_dia = "", Nothing, Utilities.fechaLocal(fecha_dia)),
                                                     If(fecha_dia = "", Nothing, Utilities.fechaLocal(fecha_dia)),
                                                     If(fecha_dia = "", Nothing, Utilities.fechaLocal(fecha_dia)),
                                                     "DIAGNOSTICO DE PRODUCTO EN SOPORTE", ctlg_code, scsl_code, Nothing, "0002",
                                                     monto, 0, igv, monto, "0001", "0008", pidm_cliente, dcto_cliente, pidm_tecnico, "N",
                                                     Nothing, Nothing, DevolverTipoCambio(), usua_id, 0, 0, 0, importe, 0, 0, 0, 0, 0, 0,
                                                     Nothing, "N", "N", "N", "", "", "", Nothing, Nothing, Nothing, "S", "", p_detalles, Nothing,
                                                     Nothing, "N", "S", DevolverTipoCambio(), Nothing, DevolverIGV() * 100, DevolverFactorRenta(),
                                                     monto * (DevolverFactorRenta() / 100), If("" = "", Nothing, ""), "", "", "",
                                                     IIf("" = "null" Or "" = "", Nothing, ""), IIf("" = "null" Or "" = "", Nothing, ""), "0")

                            If (array(0) = "ERROR") Then
                                msg = d.RevertirDiagnostico(res)
                                If Not (msg = "OK") Then
                                    res = "Error AL REVERTIR DIAGNOSTICO"
                                Else
                                    res = "Error AL CREAR VENTA"
                                End If
                            End If
                            'resd = d.ActualizarDiagnostico(code_rece, "", "", array(0), "", "", "", "", "", "", "", "") 'DPORTA (ACTUALIZA LA FECHA DE LA VENTA)
                            v = Nothing
                            d = Nothing
                        End If
                    End If
                Case "2" 'LISTAR DIAGNOSTICO POR COODIGO
                    dt = d.ListarDiagnostico(ctlg_code, scsl_code, code_rece, "", 0, 1)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"" :" & """" & MiDataRow("CODE").ToString & """,")
                            resb.Append("""RECE_CODE"" :" & """" & MiDataRow("RECE_CODE").ToString & """,")
                            resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                            resb.Append("""SCSL_CODE"" :" & """" & MiDataRow("SCSL_CODE").ToString & """,")
                            resb.Append("""FECHA_INGRESO"" :" & """" & MiDataRow("FECHA_INGRESO").ToString & """,")
                            resb.Append("""FECHA_RECEPCION"" :" & """" & MiDataRow("FECHA_RECEPCION").ToString.Substring(0, 10) & """,")
                            resb.Append("""HORA_RECEPCION"" :" & """" & MiDataRow("HORA_RECEPCION").ToString & """,")
                            resb.Append("""FECHA_DIAGNOSTICO"" :" & """" & MiDataRow("FECHA_DIAGNOSTICO").ToString.Substring(0, 10) & """,")
                            resb.Append("""HORA_DIAGNOSTICO"" :" & """" & MiDataRow("HORA_DIAGNOSTICO").ToString & """,")
                            resb.Append("""FECHA_ENTREGA"" :" & """" & MiDataRow("FECHA_ENTREGA").ToString.Substring(0, 10) & """,")
                            resb.Append("""HORA_ENTREGA"" :" & """" & MiDataRow("HORA_ENTREGA").ToString & """,")
                            resb.Append("""CATE_CODE"" :" & """" & MiDataRow("CATE_CODE").ToString & """,")
                            resb.Append("""CLIENTE"" :" & """" & MiDataRow("CLIENTE").ToString & """,")
                            resb.Append("""DCTO_CLIENTE"" :" & """" & MiDataRow("DCTO_CLIENTE").ToString & """,")
                            resb.Append("""PIDM_CLIENTE"" :" & """" & MiDataRow("PIDM_CLIENTE").ToString & """,")
                            resb.Append("""AUTORIZADO"" :" & """" & MiDataRow("AUTORIZADO").ToString & """,")
                            resb.Append("""RUC"" :" & """" & MiDataRow("RUC").ToString & """,")
                            resb.Append("""DNI"" :" & """" & MiDataRow("DNI").ToString & """,")
                            resb.Append("""PROD_CODE"" :" & """" & MiDataRow("PROD_CODE").ToString & """,")
                            resb.Append("""PRODUCTO"" :" & """" & MiDataRow("PRODUCTO").ToString & """,")
                            resb.Append("""SERIE"" :" & """" & MiDataRow("SERIE").ToString & """,")
                            resb.Append("""CODE_COTIZACION"" :" & """" & MiDataRow("CODE_COTIZACION").ToString & """,")
                            resb.Append("""ALMC_CODE"" :" & """" & MiDataRow("ALMC_CODE").ToString & """,")
                            resb.Append("""MONTO_COTIZACION"" :" & """" & MiDataRow("MONTO_COTIZACION").ToString & """,")
                            resb.Append("""DIAGNOSTICO"" :" & """" & MiDataRow("DIAGNOSTICO").ToString & """,")
                            resb.Append("""RECOMENDACION"" :" & """" & MiDataRow("RECOMENDACION").ToString & """,")
                            resb.Append("""PIDM_TECNICO"" :" & """" & MiDataRow("PIDM_TECNICO").ToString & """,")
                            resb.Append("""TECNICO"" :" & """" & MiDataRow("TECNICO").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO").ToString & """,")
                            resb.Append("""CONCEPTO"" :" & """" & MiDataRow("CONCEPTO").ToString & """,")
                            resb.Append("""MONTO_DIAGNOSTICO"" :" & """" & MiDataRow("MONTO_DIAGNOSTICO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                        r = Nothing
                    End If
                    res = resb.ToString()
                Case "3" 'LISTAR CLIENTES
                    context.Response.ContentType = "application/text; charset=utf-8"
                    Dim nvCotizacion As New Nomade.NV.NVCotizacion("Bn")
                    dt = nvCotizacion.ListarCotizacionCliente_Busq("", "", "", "", "", "", "", "", Utilities.fechaLocal(""), Utilities.fechaLocal(""), "", "")
                    res = GenerarTablaDocumento(dt)
                Case "5" 'LISTAR RECEPCIONES
                    dt = r.ListarRecepcion(ctlg_code, scsl_code, "0001", String.Empty)
                    ListaRecepcionHTML(dt)
                    r = Nothing
                Case "6" 'LISTAR RECEPCION POR COODIGO
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = r.ListarRecepcion(ctlg_code, scsl_code, "0001", code)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"" :" & """" & MiDataRow("CODE").ToString & """,")
                            resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                            resb.Append("""SCSL_CODE"" :" & """" & MiDataRow("SCSL_CODE").ToString & """,")
                            resb.Append("""FECHA_INGRESO"" :" & """" & MiDataRow("FECHA_INGRESO").ToString & """,")
                            resb.Append("""FECHA_RECEPCION"" :" & """" & MiDataRow("FECHA_RECEPCION").ToString.Substring(0, 10) & """,")
                            resb.Append("""FECHA_ENTREGA"" :" & """" & MiDataRow("FECHA_ENTREGA").ToString & """,")
                            resb.Append("""PIDM_CLIENTE"" :" & """" & MiDataRow("PIDM_CLIENTE").ToString & """,")
                            resb.Append("""CLIENTE"" :" & """" & MiDataRow("CLIENTE").ToString & """,")
                            resb.Append("""PIDM_AUTORIZADO"" :" & """" & MiDataRow("PIDM_AUTORIZADO").ToString & """,")
                            resb.Append("""AUTORIZADO"" :" & """" & MiDataRow("AUTORIZADO").ToString & """,")
                            resb.Append("""RUC"" :" & """" & MiDataRow("RUC").ToString & """,")
                            resb.Append("""DNI"" :" & """" & MiDataRow("DNI").ToString & """,")
                            resb.Append("""PROD_CODE"" :" & """" & MiDataRow("PROD_CODE").ToString & """,")
                            resb.Append("""PRODUCTO"" :" & """" & MiDataRow("PRODUCTO").ToString & """,")
                            resb.Append("""SERIE"" :" & """" & MiDataRow("SERIE").ToString & """,")
                            resb.Append("""ACCESORIOS"" :" & """" & MiDataRow("ACCESORIOS").ToString & """,")
                            resb.Append("""MOTIVOS"" :" & """" & MiDataRow("MOTIVOS").ToString & """,")
                            resb.Append("""PIDM_RECEPCIONADO"" :" & """" & MiDataRow("PIDM_RECEPCCIONADO").ToString & """,")
                            resb.Append("""RECEPCIONADO"" :" & """" & MiDataRow("RECEPCIONADO").ToString & """,")
                            resb.Append("""PIDM_ASIGNADO"" :" & """" & MiDataRow("PIDM_ASIGNADO").ToString & """,")
                            resb.Append("""ASIGNADO"" :" & """" & MiDataRow("ASIGNADO").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                        r = Nothing
                    End If
                    res = resb.ToString()
                Case "7" 'LISTAR ALMACENES
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = a.ListarAlmacenes("", ctlg_code, scsl_code, "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""TIPO_ALMACEN"" :" & """" & MiDataRow("TIPO_ALMACEN").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                        a = Nothing
                    End If
                    res = resb.ToString()
                Case "8" 'LISTA PRODUCTOS CON TIPO DE EXISTENCIA 99 (SERVICIOS)
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = d.ListarServiciosPrecio(ctlg_code, scsl_code, almc_code)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESC_ADM"" :" & """" & MiDataRow("DESC_ADM").ToString & """,")
                            resb.Append("""CODIGO_ANTIGUO"" :" & """" & MiDataRow("CODIGO_ANTIGUO").ToString & """,")
                            resb.Append("""PRECIO"" :" & """" & MiDataRow("PRECIO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                        d = Nothing
                    End If
                    res = resb.ToString()
                Case "IMPR"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    res = GenerarDctoImprimir(code_rece)
                Case "SENDMAIL"
                    context.Request.ContentType = "text/plain"

                    Dim mail As New Nomade.Mail.NomadeMail("BN")
                    Dim remite As String = ""
                    Dim remitente As String = context.Request("REMITENTE")

                    'CMENDIETA
                    If remitente.Equals("") Then
                        remite = "soporte@orbitum.org"
                    Else
                        remite = remitente
                    End If

                    Dim nremitente As String = context.Request("NREMITENTE")
                    Dim destinatarios As String = context.Request("DESTINATARIOS")
                    Dim asunto As String = context.Request("ASUNTO")
                    Dim mensaje As String = context.Request("MENSAJE")

                    Dim empresa As String = context.Request("EMPRESA")
                    Dim htmlMensaje As String = context.Request("HTMLMENSAJE")

                    Dim CUERPO As String =
                        "<p>" & mensaje & "</p><hr>" &
                        "<h2>" & empresa & "</h2>" & htmlMensaje
                    'mail.enviar(remitente, nremitente, destinatarios, asunto, CUERPO)
                    mail.enviar(remite, nremitente, destinatarios, asunto, CUERPO)

                    res = "OK"

                    mail = Nothing
                Case Else
            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub

    Public Function DevolverFactorRenta() As Decimal
        Dim fren As Decimal = 0
        Dim dt As New DataTable
        Dim fiIgv As New Nomade.FI.FIIgv("bn")
        dt = fiIgv.ListarImpuestoRenta("", Nothing, Nothing, Utilities.fechaLocal(fec_diagnostico))
        If Not (dt Is Nothing) Then
            For Each MiDataRow As DataRow In dt.Rows
                fren = Decimal.Parse(MiDataRow("FACTOR").ToString)
            Next
        End If
        dt = Nothing
        fiIgv = Nothing
        Return fren
    End Function

    Public Function DevolverIGV() As Decimal
        Dim tc As Decimal = 0

        Dim dt_p As DataTable
        Dim p As New Nomade.NC.NCParametros("Bn")
        dt_p = p.ListarParametros("0021", "")
        If Not (dt_p Is Nothing) Then
            For Each MiDataRow As DataRow In dt_p.Rows
                tc = Decimal.Parse(MiDataRow("VALOR").ToString)
            Next
        End If
        p = Nothing
        dt_p = Nothing
        Return tc

    End Function

    Public Function DevolverTipoCambio() As Decimal
        Dim tc As Decimal = 0
        Dim mone As New Nomade.NC.NCMonedas("Bn")
        dt = mone.dame_valor_monetario_cambio("0003", Convert.ToDateTime(Date.Now).ToString("yyyy/MM/dd"), "")
        If Not (dt Is Nothing) Then
            For Each MiDataRow As DataRow In dt.Rows
                tc = Decimal.Parse(MiDataRow("VALOR_CAMBIO_VENTA").ToString)
            Next
        End If
        mone = Nothing
        dt = Nothing
        Return tc
    End Function

    Public Function GenerarDctoImprimir(ByVal code_rece As String) As String
        Dim tabla As New StringBuilder

        Dim dtCabecera As New DataTable
        Dim dtEmpresas As New DataTable
        Dim dtParametroLogo As New DataTable
        Dim dtParametroPiePagina As New DataTable

        dtCabecera = d.ListarDiagnostico(ctlg_code, scsl_code, code_rece, "", 0, 4)

        dtParametroLogo = New Nomade.NC.NCParametros("Bn").ListarParametros("LOVE", "")

        dtParametroPiePagina = New Nomade.NC.NCParametros("Bn").ListarParametros("PPAR", "") 'PIE DE´PAGINA RECEPCION DE PRODUCTO

        If dtCabecera IsNot Nothing Then
            'VARIABLE PARA COLOCAR EL LOGO EN EL PDF
            Dim rutaLogo As String = ""

            'PIE DE PAGINA EDITABLE
            Dim pie_pagina As String = ""

            'OBTENER LOGO
            dtEmpresas = New Nomade.NC.NCEmpresa("Bn").ListarEmpresa(dtCabecera.Rows(0)("CTLG_CODE"), "A", "")
            rutaLogo = dtEmpresas(0)("RUTA_IMAGEN").ToString
            'OBTENER EL TEXTO QUE VA A IR EN LA IMPRESION COMO PIE DE PAGINA
            pie_pagina = dtParametroPiePagina(0)("DESCRIPCION_DETALLADA").ToString

            tabla.Append("<table id='tblDctoImprimir' border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'>")
            tabla.Append("<thead>")
            If dtParametroLogo IsNot Nothing Then
                If dtParametroLogo.Rows(0)("VALOR") = "S" Then
                    If Not rutaLogo = "" Then
                        tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'><img style='max-height: 80px' src='{0}'></th> </tr>", rutaLogo)
                    End If
                End If
            Else
                If Not rutaLogo = "" Then
                    tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'><img style='max-height: 80px' src='{0}'></th> </tr>", rutaLogo)
                End If
            End If
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", dtCabecera.Rows(0)("DESC_CTLG"))
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>RUC {0}</th></tr>", dtCabecera.Rows(0)("RUC"))
            tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>{0}</td></tr>", dtCabecera.Rows(0)("DIRECCION"))
            tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>TELEF: {0}</td></tr>", dtCabecera.Rows(0)("TELEFONO"))
            tabla.Append("</thead>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", "SERVICIO DE SOPORTE")
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", dtCabecera.Rows(0)("CODE"))
            tabla.Append("</thead>")

            tabla.Append("<tbody>")
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Fecha/Hora Recepción<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("FECHA_HORA_RECEPCION")) 'Feha y Hora
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Fecha/Hora Entrega<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("FECHA_HORA_ENTREGA")) 'Feha y Hora
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Cliente<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("CLIENTE"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>{0}<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{1}</td></tr>", dtCabecera.Rows(0)("CLIE_DCTO_DESC"), dtCabecera.Rows(0)("CLIE_DCTO_NRO"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Autorizado<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("AUTORIZADO"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>DNI<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("DNI"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Establecimiento<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("DESC_SCSL"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Recepcionado por<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("RECEPCIONADO"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Técnico asignado<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("ASIGNADO"))
            'tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Dirección<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("DIRECCION_CLIENTE"))
            ' PONE LOS PUNTO NEGRITOS
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("<td colspan='4' style='text-align: center;'><strong></strong></td>")
            tabla.Append("</tr>")
            ' DA UN SALTO DE LINEA
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("</tr>")

            tabla.Append("<table border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'><tbody>")
            tabla.Append("<tr style='border-top: 1px dashed black;border-bottom: 1px dashed black;'>")
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Producto<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("PRODUCTO"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Serie<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("SERIE"))
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("<td colspan='4' style='text-align: center;'><strong></strong></td>")
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("</tr>")

            tabla.Append("<table border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'><tbody>")
            tabla.Append("<tr style='border-top: 1px dashed black;border-bottom: 1px dashed black;'>")
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Diagnóstico<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("DIAGNOSTICO"))
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("<td colspan='4' style='text-align: center;'><strong></strong></td>")
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("</tr>")

            tabla.Append("<table border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'><tbody>")
            tabla.Append("<tr style='border-top: 1px dashed black;border-bottom: 1px dashed black;'>")
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Recomendación<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("RECOMENDACION"))
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("<td colspan='4' style='text-align: center;'><strong></strong></td>")
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("</tr>")

            tabla.Append("<table border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'><tbody>")
            tabla.Append("<tr style='border-top: 1px dashed black;border-bottom: 1px dashed black;'>")
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Estado del Equipo<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("ESTADO_EQUIPO"))
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("<td colspan='4' style='text-align: center;'><strong></strong></td>")
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("</tr>")

            tabla.Append("<table border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'><tbody>")
            tabla.Append("<tr style='border-top: 1px dashed black;border-bottom: 1px dashed black;'>")
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Servicio prestado<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("SERVICIO_PRESTADO"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Monto<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("MONTO_DIAG"))
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("<td colspan='4' style='text-align: center;'><strong></strong></td>")
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")

            If dtParametroPiePagina IsNot Nothing Then 'PIE DE PAGINA 
                If dtParametroPiePagina.Rows(0)("VALOR") = "SI" Then
                    'OBTENER EL TEXTO QUE VA A IR EN LA IMPRESION COMO PIE DE PAGINA
                    pie_pagina = dtParametroPiePagina(0)("DESCRIPCION_DETALLADA").ToString
                    If Not pie_pagina = "" Then
                        tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'><strong>{0}</strong></td></tr>", pie_pagina)
                        tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
                        tabla.Append("<td colspan='4' style='text-align: center;'>GRACIAS POR PREFERIRNOS!!!</td>")
                    End If
                Else
                    tabla.Append("<td colspan='4' style='text-align: center;'>GRACIAS POR PREFERIRNOS!!!</td>")
                End If
            Else
                tabla.Append("<td colspan='4' style='text-align: center;'>GRACIAS POR PREFERIRNOS!!!</td>")
            End If
            tabla.Append("</tbody></table>")
        End If
        tabla.Append("</tr>")
        tabla.Append("</thead>")
        tabla.Append("</thead>")
        tabla.Append("<br>")
        tabla.Append("</table>")

        Return tabla.ToString()
    End Function

    Public Function GenerarTablaDocumento(ByVal dt As DataTable) As String
        res = ""
        resb.Clear()
        '------
        resb.AppendFormat("<table id=""tblDocumento"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th>CÓDIGO</th>")
        resb.AppendFormat("<th>TIPO DOCUMENTO</th>")
        resb.AppendFormat("<th>NÚMERO</th>")
        resb.AppendFormat("<th>FECHA EMISIÓN</th>")
        resb.AppendFormat("<th>NRO. DOC.</th>")
        resb.AppendFormat("<th>CLIENTE</th>")
        resb.AppendFormat("<th>MONEDA</th>")
        resb.AppendFormat("<th>TOTAL</th>")
        resb.AppendFormat("<th>VENDEDOR</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        If (dt IsNot Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr id='" & dt.Rows(i)("CODE").ToString() & "'>")
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODE").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_DCTO_DESC").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("NUM_DCTO").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("EMISION").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("CLIE_DOID_NRO").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("RAZON_SOCIAL").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("MONE_DESC").ToString())
                resb.AppendFormat("<td id='mon" & dt.Rows(i)("CODE").ToString() & "' align='left' >{0}</td>", dt.Rows(i)("IMPORTE").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("NOMBRE_VENDEDOR").ToString())
                resb.AppendFormat("</tr>")
            Next
        End If

        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
        Return res
    End Function

    Public Function ListaRecepcionHTML(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<table id='tblAsignacion' cellspacing='0' class='display DTTT_selectable table-bordered' style='OVERFLOW-X: scroll;'>"
            res += "<thead>"
            res += "<tr>"
            res += "<th align='center'>N° ATENCIÓN</th>"
            res += "<th align='center'>FEHCA RECEPCION</th>"
            res += "<th align='center'>CLIENTE</th>"
            res += "<th align='center'>PRODUCTO</th>"
            res += "<th align='center'>RECEPCIONADO</th>"
            res += "<th align='center'>ASIGNADO</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr id='" & dt.Rows(i)("CODE").ToString() & "'>"
                res += "<td align='center'>" & dt.Rows(i)("CODE").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("FECHA_RECEPCION").ToString().Substring(0, 10) & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("CLIENTE").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("PRODUCTO").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("RECEPCIONADO").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("ASIGNADO").ToString() & "</td>"
                res += "</tr>"
            Next
            res += "</tbody>"
            res += "</table>"
        Else
            res = "<table id='tblAsignacion' cellspacing='0' class='display DTTT_selectable table-bordered' style='OVERFLOW-X: scroll;'>"
            res += "<thead>"
            res += "<tr>"
            res += "<th align='center'>N° ATENCIÓN</th>"
            res += "<th align='center'>RECEPCIÓN</th>"
            res += "<th align='center'>CLIENTE</th>"
            res += "<th align='center'>PRODUCTO</th>"
            res += "<th align='center'>RECEPCIONADO</th>"
            res += "<th align='center'>ASIGNADO</th>"
            res += "</tr>"
            res += "</thead>"
            res += "</table>"
        End If
        Return res
    End Function
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class