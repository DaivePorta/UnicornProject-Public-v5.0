<%@ WebHandler Language="VB" Class="NFMREPA" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NFMREPA : Implements IHttpHandler

    Dim opcion, fec_entrega, hora_entrega, lugar_entrega, rece_code, diag_code,
            diagnostico, recomendacion, pidm_tecnico, estado, situacion, cecc_code,
            cecd_code, detalles, usua_id, ctlg_code, scsl_code, almc_code, code_prod, serie, fecha_dia As String


    Dim dcto_code As String
    Dim igv As Decimal
    Dim importe As Decimal
    Dim dcto_cliente As String
    Dim monto As Decimal
    Dim repa_code As String
    Dim pidm_cliente As String


    Dim r As New Nomade.NF.NFReparacion("Bn")

    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        'Capturamos los valores que nos envia el formulario
        '==================================================
        opcion = context.Request("OPCION")

        fec_entrega = context.Request("FEC_ENTREGA")
        hora_entrega = context.Request("HORA_ENTREGA")
        lugar_entrega = context.Request("LUGAR")
        rece_code = context.Request("RECE_CODE")

        diag_code = context.Request("DIAG_CODE")
        cecc_code = context.Request("CECC_CODE")
        cecd_code = context.Request("CECD_CODE")
        usua_id = context.Request("USUA_ID")
        diagnostico = context.Request("DIAGNOSTICO")
        recomendacion = context.Request("RECOMENDACION")
        pidm_tecnico = context.Request("PIDM_TECNICO")
        estado = context.Request("ESTADO")
        ctlg_code = context.Request("CTLG_CODE")
        scsl_code = context.Request("SCSL_CODE")
        almc_code = context.Request("ALMC_CODE")
        serie = context.Request("SERIE")
        detalles = context.Request("DETALLES")

        dcto_cliente = context.Request("DCTO_CLIENTE")
        monto = context.Request("MONTO")
        code_prod = context.Request("CODE_PROD")
        repa_code = context.Request("REPA_CODE")
        pidm_cliente = context.Request("PIDM_CLIENTE")
        fecha_dia = context.Request("FECHA_DIA")

        Try
            Select Case opcion

                Case "1" 'GRABAR REPARACIÓN
                    resArray = r.CrearReparacion(ctlg_code, scsl_code, almc_code, code_prod, serie, Utilities.fechaLocal(fec_entrega), hora_entrega, lugar_entrega, rece_code, diag_code, diagnostico, recomendacion, pidm_tecnico, estado, detalles, cecc_code, cecd_code, usua_id)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODE"" :" & """" & resArray(0).ToString & """,")
                    resb.Append("""ISAC_CODE"" :" & """" & resArray(1).ToString & """,")
                    resb.Append("""RESPUESTA"" :" & """" & resArray(2).ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                Case "2" 'LISTA LOS DATOS DE REPARACION
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim dt As DataTable

                    context.Response.ContentType = "application/json"
                    dt = New Nomade.NF.NFReparacion("Bn").ListarReparacion("1" & rece_code)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows

                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""FECHA_ENTREGA"" :" & """" & row("FECHA_ENTREGA").ToString.Substring(0, 10) & """,")
                            resb.Append("""HORA_ENTREGA"" :" & """" & row("HORA_ENTREGA").ToString & """,")
                            resb.Append("""LUGAR_ENTREGA"" :" & """" & row("LUGAR_ENTREGA").ToString & """,")
                            resb.Append("""DIAGNOSTICO"" :" & """" & row("DIAGNOSTICO").ToString & """,")
                            resb.Append("""RECOMENDACION"" :" & """" & row("RECOMENDACION").ToString & """,")
                            resb.Append("""PIDM_TECNICO"" :" & """" & row("PIDM_TECNICO").ToString & """,")
                            resb.Append("""TECNICO"" :" & """" & row("TECNICO").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & row("ESTADO").ToString & """,")
                            resb.Append("""SITUACION"" :" & """" & row("SITUACION").ToString & """,")
                            resb.Append("""CECC_CODE"" :" & """" & row("CECC_CODE").ToString & """,")
                            resb.Append("""CECD_CODE"" :" & """" & row("CECD_CODE").ToString & """,")
                            resb.Append("""CENTRO_COSTO"" :" & """" & row("CENTRO_COSTO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    dt = Nothing
                    res = resb.ToString()
                Case "3"
                    Dim dt As New DataTable
                    dt = New Nomade.NF.NFReparacion("Bn").ListarDetalleReparacion(rece_code)
                    res = DevuelveHTMLTabla(dt)
                    dt = Nothing
                Case "4"
                    'res = New Nomade.NF.NFReparacion("Bn").CerrarReparacion(rece_code, usua_id, "0003")
                    res = New Nomade.NF.NFReparacion("Bn").CerrarReparacion(rece_code, usua_id, "0004")
                Case "5"
                    'Se crea la salida de productos de almacen para poder realizar laventa
                    Dim arr(2) As String
                    Dim p_fecha As String = Convert.ToDateTime(Date.Now).ToString("dd/MM/yyyy") 'verificar esto y funciona todo hasta venta
                    Dim detalles As String = ObtenerDetallesAlmacen(repa_code)

                    arr = New Nomade.NF.NFReparacion("Bn").PasePagoReparacion(ctlg_code, scsl_code, almc_code, code_prod, serie,
                                                                              If(fecha_dia = "", Nothing, Utilities.fechaLocal(fecha_dia)), hora_entrega, lugar_entrega, rece_code,
                                                                              diag_code, diagnostico, recomendacion, pidm_tecnico,
                                                                              estado, detalles, cecc_code, cecd_code, usua_id)

                    If arr(2) = "OK" Then

                        'Se generra la venta con los productos/servicios que se usaron en la reparacion
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

                        Dim p_detalles As String = ObtenerDetallesVenta(repa_code)

                        'monto, 0, igv, monto, "0002", "0008", pidm_cliente, dcto_cliente, pidm_tecnico, "N",
                        array = v.CrearDocumentoVentaWeb("", "", dcto_code,
                                                 If(fecha_dia = "", Nothing, Utilities.fechaLocal(fecha_dia)),
                                                 If(fecha_dia = "", Nothing, Utilities.fechaLocal(fecha_dia)),
                                                 If(fecha_dia = "", Nothing, Utilities.fechaLocal(fecha_dia)),
                                                 "REPARACION DE PRODUCTO EN SOPORTE", ctlg_code, scsl_code, Nothing, "0002",
                                                 monto, 0, igv, monto, "0001", "0008", pidm_cliente, dcto_cliente, pidm_tecnico, "N",
                                                 Nothing, Nothing, DevolverTipoCambio(), usua_id, 0, 0, 0, importe, 0, 0, 0, 0, 0, 0,
                                                 Nothing, "N", "N", "N", "", "", "", Nothing, Nothing, Nothing, "S", "", p_detalles, Nothing,
                                                 Nothing, "N", "S", DevolverTipoCambio(), Nothing, DevolverIGV() * 100, DevolverFactorRenta(Utilities.fechaLocal(fecha_dia)),
                                                 monto * (DevolverFactorRenta(Utilities.fechaLocal(fecha_dia)) / 100), If("" = "", Nothing, ""), "", "", "",
                                                 IIf("" = "null" Or "" = "", Nothing, ""), IIf("" = "null" Or "" = "", Nothing, ""), "0")

                        If (array(0) = "ERROR") Then
                            res = "ERROR AL CREAR VENTA"
                        Else
                            'res = New Nomade.NF.NFReparacion("Bn").CerrarReparacion(repa_code, usua_id, "0004")
                            res = New Nomade.NF.NFReparacion("Bn").CerrarReparacion(repa_code, usua_id, "0005")
                        End If
                    Else
                        res = "ERROR"
                    End If
                Case "6"
                    'res = New Nomade.NF.NFReparacion("Bn").CerrarReparacion(rece_code, usua_id, "0005")
                    res = New Nomade.NF.NFReparacion("Bn").CerrarReparacion(rece_code, usua_id, "0006")
                Case "IMPR"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    res = GenerarDctoImprimir(rece_code)
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

    Public Function GenerarDctoImprimir(ByVal code As String) As String
        Dim tabla As New StringBuilder

        Dim dtCabecera As New DataTable
        Dim dtDetalles As New DataTable
        Dim dtEmpresas As New DataTable
        Dim dtParametroLogo As New DataTable
        Dim dtParametroPiePagina As New DataTable

        dtCabecera = New Nomade.NF.NFReparacion("Bn").ListarReparacion("2" & code)
        dtDetalles = New Nomade.NF.NFReparacion("Bn").ListarDetalleReparacion(rece_code)
        dtParametroLogo = New Nomade.NC.NCParametros("Bn").ListarParametros("LOVE", "")

        dtParametroPiePagina = New Nomade.NC.NCParametros("Bn").ListarParametros("PPAR", "") 'PIE DE´PAGINA RECEPCION DE PRODUCTO

        If dtCabecera IsNot Nothing Then
            'PIE DE PAGINA EDITABLE
            Dim totalImporte As Decimal = 0

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
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", "REPARACIÓN DE EQUIPO")
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
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Lugar de Entrega<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("LUGAR_ENTREGA"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Nro. de Diagnóstico<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("COD_DIAGNOSTICO"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Cotización de Reparación<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("COTIZACION"))
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
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Producto<span style='float:right;clear:both;'>:</span></strong></td><td colspan='1'>{0}</td></tr>", dtCabecera.Rows(0)("PRODUCTO"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Serie<span style='float:right;clear:both;'>:</span></strong></td><td colspan='1'>{0}</td></tr>", dtCabecera.Rows(0)("SERIE"))
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("</tr>")

            tabla.Append("<table border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'><tbody>")
            tabla.Append("<tr style='border-top: 1px dashed black;border-bottom: 1px dashed black;'>")
            tabla.Append("<td style='text-align: left;'><strong>Cant.</strong></td><td style='text-align: left;'><strong>U.m.</strong></td><td style='text-align: left;padding-left:5px;' colspan='2'><strong>Descripción</strong></td><td style='text-align: right;'><strong>Total</strong></td>")
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("</tr>")

            For Each row In dtDetalles.Rows
                tabla.Append("<tr>")
                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("DESC_COR_UN_ME").ToString())
                tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1}</td>", row("NOMBRE_IMPRESION"), IIf(Decimal.Parse(row("PRECIO_DETALLE")) < 0, (Decimal.Parse(row("PRECIO_DETALLE")) * (-1)), row("PRECIO_DETALLE")))
                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("TOTAL_BRUTO")), 2).ToString())
                tabla.Append("</tr>")
                totalImporte += Math.Round(Decimal.Parse(row("TOTAL_BRUTO")), 2)
            Next

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("<td colspan='5' style='text-align: center;'><strong></strong></td>")
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("</tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='4'><strong>Total a Pagar<span style='float:right;clear:both;'>{0}</span></strong></td>", "S/ ")
            tabla.AppendFormat("<td colspan='1' style='text-align: right;'><strong>{0}</strong></td>", totalImporte)
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

    Public Function ObtenerDetallesVenta(ByVal p_repa_code As String) As String
        Dim p_detalles As String = ""

        Dim dt As New DataTable
        Dim rp As New Nomade.NF.NFReparacion("Bn")
        dt = rp.ListarDetalleReparacion(p_repa_code)
        Dim resb As New StringBuilder
        If Not dt Is Nothing Then
            For Each row As DataRow In dt.Rows

                Dim monto As Decimal = 0
                monto = Decimal.ToDouble(row("TOTAL_BRUTO").ToString)

                resb.Append(row("ITEM").ToString & ";")
                resb.Append(row("PROD_CODE").ToString & ";")
                resb.Append(row("NOMBRE_IMPRESION").ToString & ";")
                resb.Append(row("UNME_CODE").ToString & ";")
                resb.Append(row("CANTIDAD").ToString & ";")
                resb.Append(row("PRECIO_DETALLE").ToString & ";")
                resb.Append("0;")
                resb.Append(monto & ";")
                resb.Append("0;")
                resb.Append("0;")
                resb.Append(row("NOMBRE_IMPRESION").ToString & ";")
                resb.Append("GRA;")
                resb.Append(row("PRECIO_IND").ToString & ";") 'PRECIO_IND
                resb.Append("0;")
                resb.Append("0;")
                resb.Append((monto / DevolverTipoCambio()).ToString & ";")
                resb.Append("0;")
                resb.Append((monto / DevolverTipoCambio()).ToString & ";")
                resb.Append(String.Empty & ";")
                resb.Append(String.Empty & ";")
                resb.Append(row("ALMACENABLE_IND").ToString & ";")
                resb.Append(String.Empty & ";")
                resb.Append(row("SERIADO_IND").ToString & ";")
                resb.Append(String.Empty & ";")
                resb.Append("N;")
                resb.Append(row("COSTO").ToString & ";")
                resb.Append(row("ALMC_CODE").ToString & ";")
                resb.Append(row("CATE_CLIENTE").ToString & ";")
                resb.Append("NO;")
                'resb.Append(String.Empty)
                resb.Append("|")
            Next
            p_detalles = resb.ToString()
        End If

        Return p_detalles
    End Function

    Public Function ObtenerDetallesAlmacen(ByVal p_repa_code As String) As String
        Dim p_detalles As String = ""

        Dim dt As New DataTable
        Dim rp As New Nomade.NF.NFReparacion("Bn")
        dt = rp.ListarDetalleReparacion(p_repa_code)
        Dim resb As New StringBuilder
        If Not dt Is Nothing Then
            For Each row As DataRow In dt.Rows
                Dim monto As Decimal = 0
                monto = Decimal.ToDouble(row("TOTAL_BRUTO").ToString)

                resb.Append(row("ITEM").ToString & ";")
                resb.Append(row("PROD_CODE").ToString & ";")
                resb.Append(row("CANTIDAD").ToString & ";")
                resb.Append(row("CODIGO_BARRAS").ToString & ";")
                resb.Append(row("PRECIO_DETALLE").ToString & ";")
                resb.Append(monto & ";")
                resb.Append(row("NOMBRE_IMPRESION").ToString & ";")
                resb.Append(row("UNME_CODE").ToString & ";")
                resb.Append("|")
            Next
            p_detalles = resb.ToString()
        End If

        Return p_detalles
    End Function

    Public Function DevolverFactorRenta(ByVal fec_diagnostico As String) As Decimal
        Dim fren As Decimal = 0
        Dim dt As New DataTable
        Dim fiIgv As New Nomade.FI.FIIgv("bn")
        dt = fiIgv.ListarImpuestoRenta("", Nothing, Nothing, fec_diagnostico)
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

    Public Function DevuelveHTMLTabla(dt As DataTable) As String
        Dim resD As New StringBuilder
        Dim res As String

        res = "<table id='tabla_det' class='display DTTT_selectable' border='0'>"
        res += "<thead>"

        res += "<tr align='center'>"
        res += "<th>ITEM</th>"
        res += "<th>CODIGO</th>"
        res += "<th>DESCRIPCIÓN</th>"
        res += "<th>UM.</th>"
        res += "<th>SERIE</th>"
        res += "<th>CANTIDAD</th>"
        res += "<th>PREC. UNIT.</th>"
        res += "<th>TOTAL</th>"
        res += "</tr>"
        res += "</thead>"
        res += "<tbody>"

        For i As Integer = 0 To dt.Rows.Count - 1

            res += "<tr id="" + detallesVenta[i].ITEM + "">"

            res += "<td align='center'>" & dt.Rows(i)("ITEM").ToString() & "</td>"

            res += "<td class='producto' align='center'>" & dt.Rows(i)("PROD_CODE_ANTIGUO").ToString() & "</td>"

            res += "<td class='descripcion'>" & dt.Rows(i)("NOMBRE_IMPRESION").ToString() & "</td>"

            res += "<td align='center'>" & dt.Rows(i)("DESC_UNIDAD").ToString() & "</td>"

            res += "<td align='center'>" & dt.Rows(i)("CODIGO_BARRAS").ToString() & "</td>"

            res += "<td align='center'>" & dt.Rows(i)("CANTIDAD").ToString() & "</td>"

            res += "<td class='precio' " & dt.Rows(i)("ITEM").ToString() & "align='center'>" & dt.Rows(i)("PRECIO_DETALLE").ToString() & "</td>"

            res += "<td class='bruto' " & dt.Rows(i)("ITEM").ToString() & "align='center'>" & dt.Rows(i)("TOTAL_BRUTO").ToString() & "</td>"

            res += "</tr>"
        Next
        res += "</tbody>"
        res += "</table>"
        Return res
    End Function

    Public Function DevuelveHTMLTablaCorreo(dt As DataTable) As String
        Dim resD As New StringBuilder
        Dim res As String

        res = "<table style=""border: 1px solid #ddd;border-collapse: separate;border-left: 0;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;clear: both;margin-bottom: 6px !important;max-width: none !important; width: 100%;"">"
        res += "<thead style=""display: table-header-group;vertical-align: middle;border-color: inherit; background-color: #dddddd"">"

        res += "<tr align='center'>"
        res += "<th style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">ITEM</th>"
        res += "<th style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">CODIGO</th>"
        res += "<th style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">DESCRIPCIÓN</th>"
        res += "<th style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">UM.</th>"
        res += "<th style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">SERIE</th>"
        res += "<th style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">CANTIDAD</th>"
        res += "<th style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">PREC. UNIT.</th>"
        res += "<th style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">TOTAL</th>"
        res += "</tr>"
        res += "</thead>"
        res += "<tbody>"

        For i As Integer = 0 To dt.Rows.Count - 1

            res += "<tr id="" + detallesVenta[i].ITEM + "">"

            res += "<td style=""padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">" & dt.Rows(i)("ITEM").ToString() & "</td>"

            res += "<td style=""padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">" & dt.Rows(i)("PROD_CODE_ANTIGUO").ToString() & "</td>"

            res += "<td style=""padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">" & dt.Rows(i)("NOMBRE_IMPRESION").ToString() & "</td>"

            res += "<td style=""padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">" & dt.Rows(i)("DESC_UNIDAD").ToString() & "</td>"

            res += "<td style=""padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">" & dt.Rows(i)("CODIGO_BARRAS").ToString() & "</td>"

            res += "<td style=""padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">" & dt.Rows(i)("CANTIDAD").ToString() & "</td>"

            res += "<td style=""padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">" & dt.Rows(i)("PRECIO_DETALLE").ToString() & "</td>"

            res += "<td style=""padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">" & dt.Rows(i)("TOTAL_BRUTO").ToString() & "</td>"

            res += "</tr>"
        Next
        res += "</tbody>"
        res += "</table>"
        Return res
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class