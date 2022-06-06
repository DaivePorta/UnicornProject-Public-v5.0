<%@ WebHandler Language="VB" Class="NFMRECE" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NFMRECE : Implements IHttpHandler

    Dim filtrotypeahead, opcion, code, ctlg_code, scsl_code, fec_registro, fec_recepcion, fec_entrega,
        hora_registro, hora_recepcion, hora_entrega, cliente, autorizado, producto, serie, accesorios,
        motivos, recepcionado, asignado, almc_code, cliente_dcto, usua_id, estadito, telefonoClie As String
    Dim r As New Nomade.NF.NFRecepcion("Bn")
    Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")

    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        'Capturamos los valores que nos envia el formulario
        '==================================================
        filtrotypeahead = IIf(context.Request("q") = Nothing, "", context.Request("q"))

        opcion = context.Request("OPCION")
        code = context.Request("CODE")
        ctlg_code = context.Request("CTLG_CODE")
        scsl_code = context.Request("SCSL_CODE")
        fec_registro = context.Request("FEC_REGISTRO")
        fec_recepcion = context.Request("FEC_RECEPCION")
        fec_entrega = context.Request("FEC_ENTREGA")
        hora_registro = context.Request("HORA_REGISTRO")
        hora_recepcion = context.Request("HORA_RECEPCION")
        hora_entrega = context.Request("HORA_ENTREGA")
        cliente = context.Request("CLIENTE")
        autorizado = context.Request("AUTORIZADO")
        producto = context.Request("PRODUCTO")
        serie = context.Request("SERIE")
        accesorios = context.Request("ACCESORIOS")
        motivos = context.Request("MOTIVOS")
        recepcionado = context.Request("RECEPCION")
        asignado = context.Request("ASIGNADO")
        almc_code = context.Request("ALMC_CODE")
        cliente_dcto = context.Request("CLIENTE_DCTO")
        usua_id = context.Request("USUA_ID")
        estadito = context.Request("ESTADITO")
        telefonoClie = context.Request("TELEFONO_CLIE")

        Try
            Select Case opcion

                Case "1" 'GRABAR RECEPCION
                    res = r.CrearRecepcion(ctlg_code, scsl_code, Utilities.fechaLocal(fec_registro), Utilities.fechaLocal(fec_recepcion), Utilities.fechaLocal(fec_entrega), hora_registro, hora_recepcion, hora_entrega, cliente, cliente_dcto, IIf(autorizado = "", Nothing, autorizado), producto, serie, accesorios, motivos, recepcionado, asignado, usua_id)
                    r = Nothing
                Case "2" 'ACTUALIZAR RECEPCION
                    res = r.ActualizarRecepcion(code, ctlg_code, scsl_code, Utilities.fechaLocal(fec_registro), Utilities.fechaLocal(fec_recepcion), Utilities.fechaLocal(fec_entrega), hora_registro, hora_recepcion, hora_entrega, cliente, cliente_dcto, IIf(autorizado = "", Nothing, autorizado), producto, serie, accesorios, motivos, recepcionado, asignado, usua_id)
                    r = Nothing
                Case "3" 'LISTAR RECEPCION POR COODIGO
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = r.ListarRecepcion(ctlg_code, scsl_code, "0001", code)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"" :" & """" & MiDataRow("CODE").ToString & """,")
                            resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                            resb.Append("""SCSL_CODE"" :" & """" & MiDataRow("SCSL_CODE").ToString & """,")
                            resb.Append("""FECHA_INGRESO"" :" & """" & MiDataRow("FECHA_INGRESO").ToString.Substring(0, 10) & """,")
                            resb.Append("""FECHA_RECEPCION"" :" & """" & MiDataRow("FECHA_RECEPCION").ToString.Substring(0, 10) & """,")
                            resb.Append("""FECHA_ENTREGA"" :" & """" & MiDataRow("FECHA_ENTREGA").ToString.Substring(0, 10) & """,")
                            resb.Append("""HORA_INGRESO"" :" & """" & MiDataRow("HORA_INGRESO").ToString & """,")
                            resb.Append("""HORA_RECEPCION"" :" & """" & MiDataRow("HORA_RECEPCION").ToString & """,")
                            resb.Append("""HORA_ENTREGA"" :" & """" & MiDataRow("HORA_ENTREGA").ToString & """,")
                            resb.Append("""PIDM_CLIENTE"" :" & """" & MiDataRow("PIDM_CLIENTE").ToString & """,")
                            resb.Append("""CATE_CLIENTE"" :" & """" & MiDataRow("CATE_CLIENTE").ToString & """,")
                            resb.Append("""DCTO_CLIENTE"" :" & """" & MiDataRow("DCTO_CLIENTE").ToString & """,")
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
                            resb.Append("""PRECIO_IND"" :" & """" & MiDataRow("PRECIO_IND").ToString & """,")
                            resb.Append("""SERIADA"" :" & """" & MiDataRow("SERIADA").ToString & """,")
                            resb.Append("""ALMACENABLE_IND"" :" & """" & MiDataRow("ALMACENABLE_IND").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO").ToString & """,")
                            resb.Append("""TELEFONO_CLIE"" :" & """" & MiDataRow("TELEFONO_CLIE").ToString & """,")
                            resb.Append("""COSTO"" :" & """" & MiDataRow("COSTO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                        r = Nothing
                    End If
                    res = resb.ToString()
                Case "4" 'LISTAR CLIENTES
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim clie As New Nomade.NC.NCECliente("Bn")
                    dt = clie.ListarCliente("0", "A", ctlg_code)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""RAZON_SOCIAL"" :" & """" & MiDataRow("RAZON_SOCIAL").ToString & """,")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""DNI"" :" & """" & MiDataRow("NRO_DOCUMENTO").ToString & """,")
                            resb.Append("""RUC"" :" & """" & MiDataRow("NRO_RUC").ToString & """,")
                            resb.Append("""CATE_DESC"" :" & """" & MiDataRow("CATE_DESC").ToString & """,")
                            resb.Append("""TELEFONO"" :" & """" & MiDataRow("TELEFONO").ToString & """,")
                            resb.Append("""TIPO_DOC"" :" & """" & MiDataRow("CODIGO_TIPO_DOCUMENTO").ToString & """,") 'DPORTA 19/03
                            resb.Append("""DIRECCION"" :" & """" & MiDataRow("DIRECCION").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    clie = Nothing
                Case "5" 'LISTAR RECEPCIONES
                    dt = r.ListarRecepcion(ctlg_code, scsl_code, "0001", estadito) 'ESTADITO ES EL PARAMETRO DE CARGA
                    ListaRecepcionHTML(dt)
                    r = Nothing
                Case "6" 'LISTAR PERSONAS NATURALES
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = r.ListarPersonaNatural("N")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PERSONA"" :" & """" & MiDataRow("PERSONA").ToString & """,")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""DNI"" :" & """" & MiDataRow("DNI").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    r = Nothing
                Case "7" 'CREAR SERIE PRODUCTO DESDE RECEPCION TALLER
                    res = r.CrearMercaderia("", producto, "0007", ctlg_code, almc_code, Nothing, Nothing, Nothing, serie, 0, 0, 0, "0003", "N",
                                           Nothing, Nothing, 0, Nothing, Nothing, Utilities.fechaLocal(fec_registro), Nothing,
                                           "S", Nothing, Nothing, Nothing, Nothing, "N", Nothing, Nothing, Nothing, usua_id, Nothing, Nothing,
                                           Nothing, Nothing, Nothing, Nothing, 0, Nothing, Nothing, Nothing, Nothing, Nothing, "", "", "")
                    r = Nothing
                Case "8" 'Listar Serie de los Productos
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = r.ListarSeriesProductos(If(ctlg_code = Nothing, "", ctlg_code), If(producto = Nothing, "", producto))
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CTLG"" :" & """" & MiDataRow("CTLG").ToString & """,")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""CODIGO_SERIADO"" :" & """" & MiDataRow("CODIGO_SERIADO").ToString & """,")
                            resb.Append("""CODIGO_BARRAS"" :" & """" & MiDataRow("CODIGO_BARRAS").ToString & """,")
                            resb.Append("""DESC_ADM"" :" & """" & MiDataRow("DESC_ADM").ToString & """,")
                            resb.Append("""CODIGO_ANTIGUO"" :" & """" & MiDataRow("CODIGO_ANTIGUO").ToString & """,")
                            resb.Append("""GARANTIA"" :" & """" & MiDataRow("GARANTIA").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    r = Nothing
                Case "TELEF" 'DPORTA
                    context.Response.ContentType = "application/text; charset=utf-8"
                    Dim clie As New Nomade.NC.NCECliente("Bn")
                    res = clie.CambiarTelefonoCliente(cliente, telefonoClie, usua_id)
                Case "IMPR"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    res = GenerarDctoImprimir(code)

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
        Dim dtEmpresas As New DataTable
        Dim dtParametroLogo As New DataTable
        Dim dtParametroPiePagina As New DataTable

        dtCabecera = r.ListarRecepcion("C", "", "0001", code)

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
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", "ATENCIÓN DE SOPORTE")
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", dtCabecera.Rows(0)("CODE"))
            tabla.Append("</thead>")

            tabla.Append("<tbody>")
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Fecha/Hora Recepción<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("FECHA_HORA_RECEPCION")) 'Feha y Hora
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Fecha/Hora Entrega<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("FECHA_HORA_ENTREGA")) 'Feha y Hora
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Cliente<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("CLIENTE"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>{0}<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{1}</td></tr>", dtCabecera.Rows(0)("CLIE_DCTO_DESC"), dtCabecera.Rows(0)("CLIE_DCTO_NRO"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Telf. Cliente<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("TELEFONO_CLIE"))
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
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Accesorios<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("ACCESORIOS"))
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
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Motivo<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("MOTIVOS"))
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

    Public Function ListaRecepcionHTML(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<table id='tblAsignacion' cellspacing='0' class='display DTTT_selectable table-bordered' style='OVERFLOW-X: scroll;'>"
            res += "<thead>"
            res += "<tr>"
            res += "<th align='center'>N° ATENCIÓN</th>"
            res += "<th align='center'>FECHA RECEPCIÓN</th>"
            res += "<th align='center'>DOC. CLIENTE</th>"
            res += "<th align='center'>CLIENTE</th>"
            res += "<th align='center'>PRODUCTO</th>"
            res += "<th align='center'>RECEPCIONADO</th>"
            res += "<th align='center'>ASIGNADO</th>"
            res += "<th align='center'>#</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr id='" & dt.Rows(i)("CODE").ToString() & "'>"
                If (dt.Rows(i)("ESTADO").ToString() = "0001") Then
                    res += "<td align='center' class='highlight' style='background-color:#90D101;'><div class='success'></div>" & dt.Rows(i)("CODE").ToString() & "</td>"
                ElseIf dt.Rows(i)("ESTADO").ToString() = "0002" Then
                    res += "<td align='center' class='highlight' style='background-color:#D24726;'><div class='info'></div>" & dt.Rows(i)("CODE").ToString() & "</td>"
                ElseIf dt.Rows(i)("ESTADO").ToString() = "0003" Then
                    res += "<td align='center' class='highlight' style='background-color:#F5B400;'><div class='important'></div>" & dt.Rows(i)("CODE").ToString() & "</td>"
                ElseIf dt.Rows(i)("ESTADO").ToString() = "0004" Then 'DPORTA
                    res += "<td align='center' class='highlight' style='background-color:#00ffff;'><div class='important'></div>" & dt.Rows(i)("CODE").ToString() & "</td>"
                End If
                res += "<td align='center'>" & dt.Rows(i)("FECHA_RECEPCION").ToString().Substring(0, 10) & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("DOC_CLIENTE").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("CLIENTE").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("PRODUCTO").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("RECEPCIONADO").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("ASIGNADO").ToString() & "</td>"
                res += "<td align='left'>"
                If (dt.Rows(i)("ESTADO").ToString() = "0001") Then
                    res += "<div class='btn-group'><a class='btn dropdown-toggle' data-toggle='dropdown' href='#'>Detalles&nbsp <i class='icon-angle-down'></i></a>"
                    res += "<ul class='dropdown-menu'><li><a target='_blank' href='?f=nfmrece&codigo=" & dt.Rows(i)("CODE").ToString() & "'>Recepción</a></li></ul>"
                ElseIf dt.Rows(i)("ESTADO").ToString() = "0002" Then
                    res += "<div class='btn-group'><a class='btn dropdown-toggle' data-toggle='dropdown' href='#'>Detalles&nbsp <i class='icon-angle-down'></i></a>"
                    res += "<ul class='dropdown-menu'><li><a target='_blank' href='?f=nfmrece&codigo=" & dt.Rows(i)("CODE").ToString() & "'>Recepción</a></li><li><a target='_blank' href='?f=nfmdiag&cod=" & dt.Rows(i)("CODE").ToString() & "'>Diagnóstico</a></li></ul>"
                ElseIf dt.Rows(i)("ESTADO").ToString() = "0003" Or dt.Rows(i)("ESTADO").ToString() = "0004" Then 'DPORTA
                    res += "<div class='btn-group'><a class='btn dropdown-toggle' data-toggle='dropdown' href='#'>Detalles&nbsp <i class='icon-angle-down'></i></a>"
                    res += "<ul class='dropdown-menu'><li><a target='_blank' href='?f=nfmrece&codigo=" & dt.Rows(i)("CODE").ToString() & "'>Recepción</a></li><li><a target='_blank' href='?f=nfmdiag&cod=" & dt.Rows(i)("CODE").ToString() & "'>Diagnóstico</a></li><li><a target='_blank' href='?f=nfmrepa&code=" & dt.Rows(i)("CODE").ToString() & "'>Reparación</a></li></ul>"
                End If
                res += "</td>"
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
            res += "<th align='center'>DOC. CLIENTE</th>"
            res += "<th align='center'>CLIENTE</th>"
            res += "<th align='center'>PRODUCTO</th>"
            res += "<th align='center'>RECEPCIONADO</th>"
            res += "<th align='center'>ASIGNADO</th>"
            res += "<th align='center'>#</th>"
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