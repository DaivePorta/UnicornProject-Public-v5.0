<%@ WebHandler Language="VB" Class="CAMNGCL" %>

Imports iTextSharp.text
Imports iTextSharp.text.pdf
Imports System
Imports System.Web
Imports System.Data
Imports System.IO
Imports System.IO.FileStream

Public Class CAMNGCL : Implements IHttpHandler

    Dim OPCION As String
    Dim USUA_ID As String

    Dim p_CODE, p_CTLG_CODE, p_SCSL_CODE, p_SCSL_EXONERADA_IND, p_PERS_PIDM As String
    Dim p_MOTIVO_CODE, p_MOTIVO_DESC, p_MOTIVO_ADICIONAL, p_FECHA_EMISION,
        p_MONE_CODE, p_DETALLES, p_MONTO_IGV, p_SERIE, p_NUMERO, p_CODIGO_CORRELATIVO, p_TIPO_IND As String

    Dim p_DESDE, p_HASTA As String

    Dim p_IMPORTE_EXO, p_IMPORTE_INA, p_IMPORTE_GRA, p_IGV, p_IMPORTE_TOTAL, p_PCTJ_IGV As String
    Dim p_VALOR_CAMBIO, p_MONTO_USABLE, p_MES_PERIODO, p_ANIO_PERIODO As String
    'DOCUMENTO DE REFERENCIA
    Dim p_DCTO_REF_CODE, p_DCTO_REF_SERIE, p_DCTO_REF_NRO, p_DCTO_REF_TIPO_CODE As String

    'DETALLES 
    Dim p_ITEM As String
    'correo
    Dim REMITENTE, DESTINATARIOS, ASUNTO, MENSAJE As String
    'QR
    Dim p_IMGQR As String

    'DEVOLUCION DINERO, APLICA A DOCUMENTO
    Dim p_DEVOLVER_DINERO, p_APLICA_DOC_REFERENCIA, p_PAGADO_IND As String

    Dim ncCliente As New Nomade.NC.NCECliente("Bn")
    Dim caNotaCredito As New Nomade.CA.NotaCredito("Bn")
    Dim caNotaDebito As New Nomade.CA.CANotaDebito("Bn")
    Dim codigoQR As New Nomade.Impresion.CodigoQR("Bn")

    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        p_IMGQR = context.Request("p_IMGQR")
        OPCION = context.Request("OPCION")
        USUA_ID = vChar(context.Request("USUA_ID"))
        'NOTA DE CRÉDITO        
        p_CODE = context.Request("p_CODE")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        p_SCSL_EXONERADA_IND = context.Request("p_SCSL_EXONERADA_IND")
        p_PERS_PIDM = context.Request("p_PERS_PIDM")
        p_FECHA_EMISION = context.Request("p_FECHA_EMISION")
        p_SERIE = context.Request("p_SERIE")
        p_NUMERO = context.Request("p_NUMERO")
        p_MOTIVO_CODE = context.Request("p_MOTIVO_CODE")
        p_MOTIVO_DESC = vChar(context.Request("p_MOTIVO_DESC"))
        p_MOTIVO_ADICIONAL = vChar(context.Request("p_MOTIVO_ADICIONAL"))
        p_MONE_CODE = context.Request("p_MONE_CODE")
        p_DETALLES = vChar(context.Request("p_DETALLES"))

        p_IMPORTE_EXO = context.Request("p_IMPORTE_EXO")
        p_IMPORTE_INA = context.Request("p_IMPORTE_INA")
        p_IMPORTE_GRA = context.Request("p_IMPORTE_GRA")
        p_IGV = context.Request("p_IGV")
        p_IMPORTE_TOTAL = context.Request("p_IMPORTE_TOTAL")
        p_PCTJ_IGV = context.Request("p_PCTJ_IGV")

        p_TIPO_IND = vChar(context.Request("p_TIPO_IND"))
        p_CODIGO_CORRELATIVO = context.Request("p_CODIGO_CORRELATIVO")

        p_DESDE = Utilities.fechaLocal(context.Request("p_DESDE"))
        p_HASTA = Utilities.fechaLocal(context.Request("p_HASTA"))


        p_VALOR_CAMBIO = context.Request("p_VALOR_CAMBIO")
        p_MONTO_USABLE = context.Request("p_MONTO_USABLE")
        'AGREGADO PARA QUEN SE MUESTRE EL PERIODO TRIBUTARIO'
        p_MES_PERIODO = context.Request("p_MES_PERIODO")
        p_ANIO_PERIODO = context.Request("p_ANIO_PERIODO")

        'DOCUMENTO DE REFERENCIA
        p_DCTO_REF_CODE = context.Request("p_DCTO_REF_CODE")
        p_DCTO_REF_SERIE = context.Request("p_DCTO_REF_SERIE")
        p_DCTO_REF_NRO = context.Request("p_DCTO_REF_NRO")
        p_DCTO_REF_TIPO_CODE = context.Request("p_DCTO_REF_TIPO_CODE")
        'DETALLES       
        p_ITEM = context.Request("p_ITEM")
        'DEVOLUCION DINERO
        p_DEVOLVER_DINERO = context.Request("p_DEVOLVER_DINERO")
        'APLICA A DOCUMENTO
        p_APLICA_DOC_REFERENCIA = context.Request("p_APLICA_DOC_REFERENCIA")
        p_PAGADO_IND = context.Request("p_PAGADO_IND")
        ' correo
        REMITENTE = context.Request("REMITENTE")
        DESTINATARIOS = context.Request("DESTINATARIOS")
        ASUNTO = context.Request("asunto")
        MENSAJE = context.Request("MENSAJE")
        Try

            Select Case OPCION
                'Case "LPCQR" 'Parametros para el QR
                '    context.Response.ContentType = "application/json; charset=utf-8"
                '    dt = caNotaCredito.ListarParametrosQR(If(p_CODE = Nothing, "", p_CODE))
                '    If Not (dt Is Nothing) Then
                '        resb.Append("[")
                '        For Each MiDataRow As DataRow In dt.Rows
                '            resb.Append("{")
                '            resb.Append("""RUC_EMISOR"" :" & """" & MiDataRow("RUC_EMISOR").ToString & """,")
                '            resb.Append("""CODIGO_DOC"" :" & """" & MiDataRow("CODIGO_DOC").ToString & """,")
                '            resb.Append("""SERIE"" :" & """" & MiDataRow("SERIE").ToString & """,")
                '            resb.Append("""NUMERO"" :" & """" & MiDataRow("NUMERO").ToString & """,")
                '            resb.Append("""TOTAL_IGV"" :" & """" & MiDataRow("TOTAL_IGV").ToString & """,")
                '            resb.Append("""IMPORTE_TOTAL"" :" & """" & MiDataRow("IMPORTE_TOTAL").ToString & """,")
                '            resb.Append("""FECHA_TRANSACCION"" :" & """" & MiDataRow("FECHA_TRANSACCION").ToString & """,")
                '            resb.Append("""TIPO_DOC_ADQUIRIENTE"" :" & """" & MiDataRow("TIPO_DOC_ADQUIRIENTE").ToString & """,")
                '            resb.Append("""NUMERO_DOC_ADQUIRIENTE"" :" & """" & MiDataRow("NUMERO_DOC_ADQUIRIENTE").ToString & """")
                '            resb.Append("}")
                '            resb.Append(",")
                '        Next
                '        resb.Append("{}")
                '        resb = resb.Replace(",{}", String.Empty)
                '        resb.Append("]")
                '    End If
                '    res = resb.ToString()

                Case "GQR_NCG" 'Parametros para guardar el QR
                    context.Response.ContentType = "application/text; charset=utf-8"
                    'Dim nvVenta As New Nomade.NV.NVVenta("Bn")
                    res = caNotaCredito.GuardarCodigoQR_NCG(p_CODE, p_IMGQR)
                Case "GENERAR_PDF" 'DPORTA
                    Dim msgError As String = "OK"
                    Dim dtCabecera As New DataTable
                    'dtCabecera = caNotaCredito.ListarNotaCreditoGenerica(p_CODE, "", "", "", "C")
                    If p_CODE.Length = 9 Then 'And dtCabecera.Rows(0)("ESTADO_IND") = "A" Then
                        Try
                            GenerarPDF(p_CODE, p_CTLG_CODE)
                        Catch ex As Exception
                            msgError = "ERROR: " + ex.Message
                        End Try
                    Else
                        msgError = "ERROR"
                    End If
                    res = msgError.ToString()
                Case "1" ' LISTAR DOCUMENTOS DE VENTA - DOCUMENTOS DE REFERENCIA
                    context.Response.ContentType = "application/text; charset=utf-8"
                    If p_MOTIVO_CODE = "011" Then
                        dt = caNotaCredito.ListarDocumentosVentaNotaGenerica_Solo_Anticipos("", "", "", "", "", p_CTLG_CODE, p_SCSL_CODE, p_DCTO_REF_TIPO_CODE, USUA_ID)
                        res = GenerarTablaDocumentos()
                    Else
                        dt = caNotaCredito.ListarDocumentosVentaNotaGenerica("", "", "", "", "", p_CTLG_CODE, p_SCSL_CODE, p_DCTO_REF_TIPO_CODE, USUA_ID)
                        res = GenerarTablaDocumentos()
                    End If

                Case "3" 'REGISTRAR NOTA DE CRÉDITO
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim array As Array
                    array = caNotaCredito.CrearNotaCreditoGenerica(p_CTLG_CODE, p_SCSL_CODE, p_SERIE, p_NUMERO, Utilities.fechaLocal(p_FECHA_EMISION),
                                                         p_PERS_PIDM, p_DCTO_REF_CODE, p_DCTO_REF_TIPO_CODE, p_MOTIVO_CODE, p_MOTIVO_DESC, p_MONE_CODE, p_TIPO_IND,
                                                          p_IMPORTE_INA, p_IMPORTE_EXO, p_IMPORTE_GRA, p_IGV, p_IMPORTE_TOTAL, p_PCTJ_IGV, USUA_ID, p_SCSL_EXONERADA_IND,
                                                          p_VALOR_CAMBIO, p_MONTO_USABLE, p_MES_PERIODO, p_ANIO_PERIODO,
                                                          p_CODIGO_CORRELATIVO, p_DETALLES)

                    If Not (array Is Nothing) Then
                        resb.Append("[{")
                        resb.Append("""CODIGO"" :" & """" & array(0).ToString & """,")
                        resb.Append("""SERIE_NRO"" :" & """" & array(1).ToString & """,")
                        resb.Append("""RESPUESTA"" :" & """" & array(2).ToString & """")
                        resb.Append("}]")
                    End If
                    res = resb.ToString()

                Case "3.5" 'REGISTRAR NOTA DE CRÉDITO (DEVOLUCION DE DINERO)
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim array As Array
                    array = caNotaCredito.CrearNotaCreditoGenerica_2(p_CTLG_CODE, p_SCSL_CODE, p_SERIE, p_NUMERO, Utilities.fechaLocal(p_FECHA_EMISION),
                                                         p_PERS_PIDM, p_DCTO_REF_CODE, p_DCTO_REF_TIPO_CODE, p_MOTIVO_CODE, p_MOTIVO_DESC, p_MONE_CODE, p_TIPO_IND,
                                                          p_IMPORTE_INA, p_IMPORTE_EXO, p_IMPORTE_GRA, p_IGV, p_IMPORTE_TOTAL, p_PCTJ_IGV, USUA_ID, p_SCSL_EXONERADA_IND,
                                                          p_VALOR_CAMBIO, p_MONTO_USABLE, p_MES_PERIODO, p_ANIO_PERIODO, p_DEVOLVER_DINERO, p_APLICA_DOC_REFERENCIA, p_PAGADO_IND,
                                                          p_CODIGO_CORRELATIVO, p_DETALLES)

                    If Not (array Is Nothing) Then
                        resb.Append("[{")
                        resb.Append("""CODIGO"" :" & """" & array(0).ToString & """,")
                        resb.Append("""SERIE_NRO"" :" & """" & array(1).ToString & """,")
                        'resb.Append("""DATOS_QR"" :" & """" & array(2).ToString & """,")
                        resb.Append("""RESPUESTA"" :" & """" & array(3).ToString & """")
                        resb.Append("}]")
                    End If
                    res = resb.ToString()

                Case "4" 'LISTAR NOTA DE CRÉDITO ( JSON )
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = caNotaCredito.ListarNotaCreditoGenerica(If(p_CODE Is Nothing, "", p_CODE), If(p_CTLG_CODE Is Nothing, "", p_CTLG_CODE),
                                                       If(p_SCSL_CODE Is Nothing, "", p_SCSL_CODE), If(p_PERS_PIDM Is Nothing, "", p_PERS_PIDM), If(p_TIPO_IND Is Nothing, "", p_TIPO_IND),
                                                       If(p_DESDE Is Nothing, "0000-00-00", p_DESDE), If(p_HASTA Is Nothing, "0000-00-00", p_HASTA))
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""CTLG_CODE"" :" & """" & row("CTLG_CODE").ToString & """,")
                            resb.Append("""SCSL_CODE"" :" & """" & row("SCSL_CODE").ToString & """,")
                            resb.Append("""EMISION"" :" & """" & row("EMISION").ToString & """,")
                            resb.Append("""TRANSACCION"" :" & """" & row("TRANSACCION").ToString & """,")
                            resb.Append("""TIPO_IND"" :" & """" & row("TIPO_IND").ToString & """,")
                            resb.Append("""SERIE"" :" & """" & row("SERIE").ToString & """,")
                            resb.Append("""NUMERO"" :" & """" & row("NUMERO").ToString & """,")
                            resb.Append("""MONE_CODE"" :" & """" & row("MONE_CODE").ToString & """,")
                            resb.Append("""MONEDA_SIMBOLO"" :" & """" & row("MONEDA_SIMBOLO").ToString & """,")
                            resb.Append("""MONEDA"" :" & """" & row("MONEDA").ToString & """,")
                            resb.Append("""MOTIVO_CODE"" :" & """" & row("MOTIVO_CODE").ToString & """,")
                            resb.Append("""MOTIVO_DESC"" :" & """" & row("MOTIVO_DESC").ToString & """,")
                            resb.Append("""IMPORTE_EXO"" :" & """" & row("IMPORTE_EXO").ToString & """,")
                            resb.Append("""IMPORTE_INA"" :" & """" & row("IMPORTE_INA").ToString & """,")
                            resb.Append("""IMPORTE_GRA"" :" & """" & row("IMPORTE_GRA").ToString & """,")
                            resb.Append("""IMPORTE_TOTAL"" :" & """" & row("IMPORTE_TOTAL").ToString & """,")
                            resb.Append("""IMPORTE"" :" & """" & row("IMPORTE").ToString & """,")
                            resb.Append("""IGV"" :" & """" & row("IGV").ToString & """,")
                            resb.Append("""PCTJ_IGV"" :" & """" & row("PCTJ_IGV").ToString & """,")
                            resb.Append("""DOCUMENTO"" :" & """" & row("DOCUMENTO").ToString & """,")
                            resb.Append("""DOCUMENTO_REF"" :" & """" & row("DOCUMENTO_REF").ToString & """,")
                            resb.Append("""DCTO_REF_CODE"" :" & """" & row("DCTO_REF_CODE").ToString & """,")
                            resb.Append("""DCTO_REF_SERIE"" :" & """" & row("DCTO_REF_SERIE").ToString & """,")
                            resb.Append("""DCTO_REF_NRO"" :" & """" & row("DCTO_REF_NRO").ToString & """,")
                            resb.Append("""DCTO_REF_TIPO_CODE"" :" & """" & row("DCTO_REF_TIPO_CODE").ToString & """,")
                            resb.Append("""EMISION_REF"" :" & """" & row("EMISION_REF").ToString & """,")
                            resb.Append("""RAZON_SOCIAL"" :" & """" & row("RAZON_SOCIAL").ToString & """,")
                            resb.Append("""PIDM"" :" & """" & row("PIDM").ToString & """,")
                            resb.Append("""USADO"" :" & """" & row("USADO").ToString & """,")
                            resb.Append("""USADO_IND"" :" & """" & row("USADO_IND").ToString & """,")
                            resb.Append("""SCSL_EXONERADA_IND"" :" & """" & row("SCSL_EXONERADA_IND").ToString & """,")
                            resb.Append("""FECHA_USO"" :" & """" & row("FECHA_USO").ToString & """,")
                            resb.Append("""DIRECCION_CLIENTE"" :" & """" & row("DIRECCION_CLIENTE").ToString & """,")
                            resb.Append("""ANIO_PERIODO"" :" & """" & row("ANIO_PERIODO").ToString & """,")
                            resb.Append("""MES_PERIODO"" :" & """" & row("MES_PERIODO").ToString & """,")
                            resb.Append("""ANULADO_IND"" :" & """" & row("ANULADO_IND").ToString & """,")
                            resb.Append("""ANULAC_ID"" :" & """" & row("ANULAC_ID").ToString & """,")
                            resb.Append("""CMNT_ANULAC"" :" & """" & row("CMNT_ANULAC").ToString & """,")
                            resb.Append("""ORIGEN_ANULAC"" :" & """" & row("ORIGEN_ANULAC").ToString & """,")
                            resb.Append("""FECHA_ANULAC"" :" & """" & row("FECHA_ANULAC").ToString & """,")
                            resb.Append("""DESTINO_CODE"" :" & """" & row("DESTINO_CODE").ToString & """,")
                            resb.Append("""VALOR_CAMBIO"" :" & """" & row("VALOR_CAMBIO").ToString & """,")
                            resb.Append("""PERIODO_DESC"" :" & """" & row("PERIODO_DESC").ToString & """,")
                            resb.Append("""DEVUELVE_DINERO"" :" & """" & row("DEVUELVE_DINERO").ToString & """,")
                            resb.Append("""APLICA_DOCUMENTO"" :" & """" & row("APLICA_DOCUMENTO").ToString & """,")
                            resb.Append("""USUA_ID"" :" & """" & row("USUA_ID").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "5" 'LISTAR DETALLES NOTA DE CRÉDITO ( JSON )
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = caNotaCredito.ListarDetalleNotaCreditoGenerica(If(p_CODE Is Nothing, "", p_CODE), If(p_ITEM Is Nothing, "", p_ITEM))
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""CTLG_CODE"" :" & """" & row("CTLG_CODE").ToString & """,")
                            resb.Append("""SCSL_CODE"" :" & """" & row("SCSL_CODE").ToString & """,")
                            resb.Append("""ITEM"" :" & """" & row("ITEM").ToString & """,")
                            resb.Append("""DESC"" :" & """" & row("DESC_ITEM").ToString & """,")
                            resb.Append("""AFEC"" :" & """" & row("AFECTACION_IGV").ToString & """,")
                            resb.Append("""IGV"" :" & """" & row("IGV").ToString & """,")
                            resb.Append("""SUBT_SIN_IGV"" :" & """" & row("VALOR_VENTA").ToString & """,")
                            resb.Append("""MONTO_SUBTOTAL"" :" & """" & row("MONTO_SUBTOTAL").ToString & """,")
                            resb.Append("""PCTJ_IGV"" :" & """" & row("PCTJ_IGV").ToString & """,")
                            resb.Append("""ESTADO_IND"" :" & """" & row("ESTADO_IND").ToString & """,")
                            resb.Append("""FECHA_ACTV"" :" & """" & row("FECHA_ACTV").ToString & """,")
                            resb.Append("""USUA_ID"" :" & """" & row("USUA_ID").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "correo"
                    Dim email As New Nomade.Mail.NomadeMail("Bn")

                    'CAMBIAR EL primer NREMITENTE POR EL NOMBRE DEL USUARIO
                    'If Not My.Computer.FileSystem.FileExists(HttpContext.Current.Server.MapPath("~") & "Archivos\" & p_NOCC_CODE & ".pdf") Then
                    'GenerarPDF(p_NOCC_CODE, p_CTLG_CODE)
                    'End If
                    'Dim datoAj As String = HttpContext.Current.Server.MapPath("~") & "Archivos\" & p_NOCC_CODE & ".pdf"
                    GenerarPDF(p_CODE, p_CTLG_CODE)
                    'End If
                    Dim datoAj As String = HttpContext.Current.Server.MapPath("~") & "Archivos\" & p_CODE & ".pdf"

                    MENSAJE += "<br>"
                    Dim documento As String = ""
                    documento = GenerarDctoCorreo(p_CODE, p_CTLG_CODE)
                    MENSAJE += documento

                    'email.enviar(REMITENTE, REMITENTE, DESTINATARIOS, ASUNTO, MENSAJE)
                    email.enviar(REMITENTE, REMITENTE, DESTINATARIOS, ASUNTO, MENSAJE, datoAj)
                Case "IMPR"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    res = GenerarDctoImprimir(p_CODE, p_CTLG_CODE)

                Case "GEN_ASIENTO"
                    Dim oCTGeneracionAsientos As New Nomade.CT.CTGeneracionAsientos()
                    res = oCTGeneracionAsientos.GenerarAsientoNotaCreditoGenericaCliente(p_CODE, USUA_ID)

                Case Else

            End Select

            context.Response.Write(res)

        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try

    End Sub

    'TABLA DE BÚSQUEDA DE DOCUMENTOS    
    Public Function GenerarTablaDocumentos() As String
        resb.Clear()
        resb.AppendFormat("<table id=""tblBuscarDocumento"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th>CÓDIGO</th>")
        resb.AppendFormat("<th>SERIE</th>")
        resb.AppendFormat("<th>NRO</th>")
        resb.AppendFormat("<th>EMISIÓN</th>")
        resb.AppendFormat("<th>DCTO</th>")
        resb.AppendFormat("<th>ESTADO</th>")
        ' MUESTRA EL CAMPO DE MONTO EN EL MODAL
        resb.AppendFormat("<th>MONTO</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        If Not (dt Is Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                If dt.Rows(i)("COMPLETO_IND").ToString = "S" And dt.Rows(i)("ANULADO").ToString = "NO" And dt.Rows(i)("MONEDA").ToString = p_MONE_CODE Then
                    If dt.Rows(i)("NOTA_CREDITO_IND").ToString = "N" And dt.Rows(i)("NC_DESTINO_IND").ToString = "N" And dt.Rows(i)("NOTA_CREDITO_GEN_IND").ToString = "N" And dt.Rows(i)("NCG_DESTINO_IND").ToString = "N" Then
                        'VALIDA QUE LA FECHA DE EMISION DE LA NOTA DE CREDITO SEA MENOR O IGUAL AL DOCUMENTO DE ORIGEN
                        Dim continuar As Boolean = False
                        If p_FECHA_EMISION <> "" And dt.Rows(i)("EMISION").ToString() <> "" Then
                            Dim fechaConsultada As Integer = Integer.Parse(ObtenerFecha(p_FECHA_EMISION))
                            Dim fechaEvaluar As Integer = Integer.Parse(ObtenerFecha(dt.Rows(i)("EMISION").ToString()))
                            If fechaConsultada >= fechaEvaluar Then
                                continuar = True
                            End If
                        End If
                        If continuar Then
                            Dim serie_numero As String() = dt.Rows(i)("NUM_DCTO").ToString().Split(New Char() {"-"})
                            Dim fechaEmision As String = If(dt.Rows(i)("EMISION").ToString() = "", "", dt.Rows(i)("EMISION").ToString().Substring(0, 10))
                            resb.AppendFormat("<tr class='doc_fila' onclick=""setSeleccionDocumento('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}','{13}')"" id='doc_fila_{0}_{1}'>", dt.Rows(i)("CODIGO").ToString(), dt.Rows(i)("SECUENCIA").ToString(), serie_numero(0), serie_numero(1), dt.Rows(i)("TIPO_DCTO").ToString(), dt.Rows(i)("IMPORTE").ToString(), dt.Rows(i)("MONEDA").ToString(), dt.Rows(i)("SIMBOLO_MONEDA").ToString(), dt.Rows(i)("SCSL_EXONERADA_IND").ToString(), fechaEmision, dt.Rows(i)("PAGADO_IND"), dt.Rows(i)("PAGADO_DESC"), dt.Rows(i)("POR_PAGAR_BASE"), dt.Rows(i)("POR_PAGAR_ALTER"))
                            resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODIGO").ToString())
                            resb.AppendFormat("<td align='center' >{0}</td>", serie_numero(0))
                            resb.AppendFormat("<td align='center' >{0}</td>", serie_numero(1))
                            resb.AppendFormat("<td align='center' >{0}</td>", fechaEmision)
                            resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DOCUMENTO").ToString())
                            resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ESTADO_DOC"))
                            'MUESTRA EL SIMBOLO DE MONEDA Y EL MONTO EN EL MODAL 
                            resb.AppendFormat("<td align='center' style='text-align:center;' >{0}</td>", dt.Rows(i)("SIMBOLO_MONEDA").ToString() + " " + dt.Rows(i)("IMPORTE").ToString())

                            resb.AppendFormat("</tr>")
                        End If

                    End If
                End If
            Next
        End If

        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
        Return res
    End Function



    Public Function GenerarDctoImprimir(ByVal p_CODE As String, ByVal p_CTLG_CODE As String) As String

        Dim ncEmpresa As New Nomade.NC.NCEmpresa("bn")

        Dim tabla As New StringBuilder
        Dim dtCabecera As New DataTable
        Dim dtDetalles As New DataTable
        'Dim dtEmpresas As New DataTable
        dtCabecera = caNotaCredito.ListarNotaCreditoGenerica(p_CODE, "", "", "", "X", "0000-00-00", "0000-00-00")

        dtDetalles = caNotaCredito.ListarDetalleNotaCreditoGenerica(p_CODE, "")

        If dtCabecera IsNot Nothing Then
            Dim rutaLogo As String = ""
            Dim codeMoneda As String = dtCabecera.Rows(0)("MONE_CODE") 'Código de Moneda
            Dim mon As String = dtCabecera.Rows(0)("MONEDA_SIMBOLO")
            Dim descMon As String = dtCabecera.Rows(0)("DESC_MONEDA") 'Descripcion de moneda 
            'dtEmpresas = ncEmpresa.ListarEmpresa(dtCabecera.Rows(0)("CTLG_CODE"), "A", "")
            rutaLogo = dtCabecera.Rows(0)("RUTA_IMAGEN")

            'VARIABLE PARA COLOCAR EL QR EN EL PDF
            Dim rutaQr As String = ""
            'PARAMETROS TABLAS
            Dim border As String = "1"
            Dim marginBottom As String = "10px"
            Dim cellpadding As String = "5px"
            'PARAMETROS TABLA1
            Dim wLogo As String = "60%"
            Dim wNota As String = "40%"
            'PARAMETROS TABLA2
            Dim wRuc As String = "50%"
            Dim wDen As String = "30%"
            Dim wNro As String = "20%"
            'PARAMETROS TABLA3
            Dim wCant As String = "10%"
            Dim wDesc As String = "60%"
            Dim wPrec As String = "15%"
            Dim wSubt As String = "15%"

            'LA RUTA QUE VA A TENER
            'rutaQr = dtCabecera.Rows(0)("IMAGEN_QR")
            rutaQr = "data:image/png;base64," + codigoQR.fnGetCodigoQR(p_CODE)

            tabla.Append("<table id='tblDctoImprimir1' class='tblDctoImprimir' border='" + border + "' style='width: 100%;margin-bottom:" + marginBottom + "' cellpadding='" + cellpadding + "'  align='center'>")
            tabla.Append("<tbody>")
            tabla.Append("<tr>")
            tabla.AppendFormat("<td width='" + wLogo + "' rowspan='2' style='text-align: center'><img src='{0}' style='max-height:50px;'></th></td>", rutaLogo)
            tabla.AppendFormat("<td width='" + wNota + "' style='text-align: center;'><strong>RUC N° {0}</strong></td>", dtCabecera.Rows(0)("RUC"))
            tabla.Append("</tr>") '------------------------------------------------
            tabla.Append("<tr>")
            tabla.AppendFormat("<td style='text-align: center;'><strong>NOTA DE CRÉDITO</strong></td>")
            tabla.Append("</tr>") '------------------------------------------------            
            tabla.Append("<tr>")
            If (dtCabecera.Rows(0)("RUC").substring(0, 2) = "10") Then 'DPORTA 10/12/2021
                tabla.AppendFormat("<td>{0} <br>De: {1} <br>{2}</td>", dtCabecera.Rows(0)("DESC_CORTA_EMPRESA"), dtCabecera.Rows(0)("DESC_EMPRESA"), If(dtCabecera.Rows(0)("DIRECCION") = "", "", dtCabecera.Rows(0)("DIRECCION")))
            Else
                tabla.AppendFormat("<td>{0} {1}</td>", dtCabecera.Rows(0)("DESC_EMPRESA"), If(dtCabecera.Rows(0)("DIRECCION") = "", "", " - " + dtCabecera.Rows(0)("DIRECCION")))
            End If
            tabla.AppendFormat("<td style='text-align: center;'>{0}</td>", dtCabecera.Rows(0)("DOCUMENTO"))
            tabla.Append("</tr>")
            tabla.Append("</tbody></table>")


            tabla.Append("<table id='tblDctoImprimir2' class='tblDctoImprimir' border='" + border + "' style='width: 100%;margin-bottom:" + marginBottom + "' cellpadding='" + cellpadding + "' align='center'>")
            tabla.Append("<tbody>")
            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3'><strong>Cliente:</strong> {0}</td>", dtCabecera.Rows(0)("RAZON_SOCIAL"))
            tabla.Append("</tr>") '-------------------------------------------------            
            tabla.Append("<tr>")
            tabla.AppendFormat("<td><strong>Dirección:</strong> {0}</td>", dtCabecera.Rows(0)("DIRECCION_CLIENTE"))
            tabla.AppendFormat("<td colspan='2'><strong>Documento que modifica</strong></td>")
            tabla.Append("</tr>") '------------------------------------------------
            tabla.Append("<tr>")
            If dtCabecera.Rows(0)("CLIE_DCTO_DESC").ToString = "" Then
                tabla.AppendFormat("<td width='" + wRuc + "'><strong>{0}:</strong> {1}</td>", "Comprobante", "")
            Else
                tabla.AppendFormat("<td width='" + wRuc + "'><strong>{0}:</strong> {1}</td>", dtCabecera.Rows(0)("CLIE_DCTO_DESC"), dtCabecera.Rows(0)("CLIE_DCTO_NRO"))
            End If

            tabla.AppendFormat("<td width='" + wDen + "'><strong>Denominación</strong>: {0}</td>", dtCabecera.Rows(0)("DCTO_REF_TIPO_DESC"))
            tabla.AppendFormat("<td width='" + wNro + "'><strong>N°</strong>: {0}</td>", dtCabecera.Rows(0)("DOCUMENTO_REF"))
            tabla.Append("</tr>") '------------------------------------------------            
            tabla.Append("<tr>")
            tabla.AppendFormat("<td><strong>Fecha Emisión:</strong> {0}</td>", dtCabecera.Rows(0)("EMISION"))
            tabla.AppendFormat("<td colspan='2'><strong>Fecha del comprobante que modifica:</strong> {0}</td>", dtCabecera.Rows(0)("EMISION_REF"))
            tabla.Append("</tr>") '------------------------------------------------           

            tabla.Append("</tbody></table>")


            tabla.Append("<table id='tblDctoImprimir3' class='tblDctoImprimir' border='" + border + "' style='width: 100%;margin-bottom:" + marginBottom + "'  cellpadding='" + cellpadding + "' align='center'>")
            tabla.Append("<tbody>")
            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='4'><strong>Por lo siguiente:</strong></td>")
            tabla.Append("</tr>") '------------------------------------------------            
            tabla.Append("<tr>")
            tabla.AppendFormat("<td width='" + wCant + "'><strong>CANT.</strong></td>")
            tabla.AppendFormat("<td width='" + wDesc + "'><strong>DESCRIPCIÓN</strong></td>")
            'tabla.AppendFormat("<td width='" + wPrec + "'><strong>P. UNIT. ({0})</strong></td>", mon)
            tabla.AppendFormat("<td colspan='2' width='" + wSubt + "' style='font-size:9px !important;word-wrap: break-word;text-align:center;'><strong>VALOR DE VENTA O SERVICIO PRESTADO</strong></td>")
            tabla.Append("</tr>") '------------------------------------------------- 
            For Each row In dtDetalles.Rows
                tabla.Append("<tr>")
                tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", "1")
                tabla.AppendFormat("<td ><span style='word-break:break-all;'>{0}</span></td>", row("DESC_ITEM"))
                'tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("PU"))
                tabla.AppendFormat("<td colspan='2' style='text-align: right;'>{0}</td>", FormatNumber(CDbl(row("VALOR_VENTA")), 2))
                tabla.Append("</tr>")
            Next
            tabla.Append("<tr>")

            Dim l As New Nomade.NB.Numalet(False, "00/100 $.", "con", True)
            Dim importeTexto As String
            importeTexto = (l.ToCustomCardinal(dtCabecera.Rows(0)("IMPORTE_TOTAL"))).ToUpper()
            If codeMoneda = "0002" Then
                tabla.AppendFormat("<td colspan='2'><strong>Son: {0} <span> SOLES </span></strong></td>", importeTexto.Replace(".-", " (" + descMon + ")"))
            ElseIf codeMoneda = "0003" Then
                tabla.AppendFormat("<td colspan='2'><strong>Son: {0} <span> DOLARES </span></strong></td>", importeTexto.Replace(".-", " (" + descMon + ")"))
            Else
                tabla.AppendFormat("<td colspan='2'><strong>SON: {0}</strong></td>", importeTexto.Replace(".-", " " + descMon))
            End If

            tabla.AppendFormat("<td colspan='2'></td>")
            tabla.Append("</tr>") '------------------------------------------------ 
            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='2'><strong>MOTIVO DE LA EMISIÓN DE LA NOTA DE CRÉDITO</strong></td>")
            tabla.AppendFormat("<td ><strong>IGV </strong> </td>")
            tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", FormatNumber(CDbl(dtCabecera.Rows(0)("IGV")), 2))
            tabla.Append("</tr>") '------------------------------------------------ 
            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='2'>{0}</td>", dtCabecera.Rows(0)("MOTIVO_DESC"))
            tabla.AppendFormat("<td ><strong>TOTAL {0}</strong></td>", mon)
            tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", FormatNumber(CDbl(dtCabecera.Rows(0)("IMPORTE_TOTAL")), 2))
            tabla.Append("</tr>") '------------------------------------------------             
            tabla.AppendFormat("<td colspan='2'><strong>GLOSA</strong></td>")
            tabla.AppendFormat("<td colspan='2'></td>")
            tabla.Append("</tr>") '------------------------------------------------ 
            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='2'>{0}</td>", dtCabecera.Rows(0)("GLOSA"))
            tabla.Append("<td colspan='2'></strong></td>")
            tabla.Append("</tr>") '------------------------------------------------ 
            tabla.Append("</tbody></table>")

            tabla.Append("<table id='tblDctoImprimir3' class='tblDctoImprimir' border='" + border + "' style='width: 100%;margin-bottom:" + marginBottom + "'  cellpadding='" + cellpadding + "' align='center'>")
            tabla.Append("<tbody>")
            tabla.Append("<tr>")
            tabla.Append("<td width='" + wRuc + "'><strong></strong> </td>")
            tabla.AppendFormat("<td width='" + wDen + "'><strong>OP GRAVADO ({0})</strong>: </td>", dtCabecera.Rows(0)("MONEDA_SIMBOLO"))
            tabla.AppendFormat("<td width='" + wNro + "' style='text-align: right;'><strong></strong> {0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtCabecera.Rows(0)("IMPORTE_GRA").ToString())))
            tabla.Append("</tr>")
            tabla.Append("<tr>")
            tabla.Append("<td width='" + wRuc + "'><strong></strong> </td>")
            tabla.AppendFormat("<td width='" + wDen + "'><strong>OP INAFECTA ({0})</strong>: </td>", dtCabecera.Rows(0)("MONEDA_SIMBOLO"))
            tabla.AppendFormat("<td width='" + wNro + "' style='text-align: right;'><strong></strong> {0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtCabecera.Rows(0)("IMPORTE_INA").ToString())))
            tabla.Append("</tr>")
            tabla.Append("<tr>")
            tabla.Append("<td width='" + wRuc + "'><strong></strong> </td>")
            tabla.AppendFormat("<td width='" + wDen + "'><strong>OP EXONERADO ({0})</strong>: </td>", dtCabecera.Rows(0)("MONEDA_SIMBOLO"))
            tabla.AppendFormat("<td width='" + wNro + "' style='text-align: right;'><strong></strong> {0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtCabecera.Rows(0)("IMPORTE_EXO").ToString())))
            tabla.Append("</tr>")
            tabla.Append("<tr>")
            tabla.Append("<td width='" + wRuc + "'><strong></strong> </td>")
            tabla.Append("<td width='" + wDen + "'><strong>IGV:</strong> </td>")
            tabla.AppendFormat("<td width='" + wNro + "' style='text-align: right;'><strong></strong> {0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtCabecera.Rows(0)("IGV").ToString())))
            tabla.Append("</tr>")
            tabla.Append("<tr>")
            tabla.Append("<td width='" + wRuc + "'><strong></strong> </td>")
            tabla.AppendFormat("<td width='" + wDen + "'><strong>TOTAL ({0})</strong>: </td>", dtCabecera.Rows(0)("MONEDA_SIMBOLO"))
            tabla.AppendFormat("<td width='" + wNro + "' style='text-align: right;'><strong></strong> {0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtCabecera.Rows(0)("IMPORTE_TOTAL").ToString())))
            tabla.Append("</tr>")
            tabla.Append("</tbody>")
            tabla.Append("</table>")

            tabla.Append("<table id='tblDctoImprimir5' class='tblDctoImprimir' style='width: 100%;margin-bottom:" + marginBottom + "' cellpadding='" + cellpadding + "'  align='center'>")
            tabla.Append("<tbody>")
            tabla.Append("<tr>")
            If dtCabecera.Rows(0)("ELECTRONICO_IND") = "S" Then
                tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'><img style='max-height: 80px' src='{0}'></th> </tr>", rutaQr)
                tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'><strong>Autorizado mediante <span style='float:right'></span></strong>{0}</th></tr>", dtCabecera.Rows(0)("IMPR_SERIE"))
                tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>{0}</td></tr>", "Para consultar el documento ingrese a http://52.41.93.228:1115, debe estar disponible dentro de las próximas 48 hrs. a partir de la fecha de emisión.")
            Else
                tabla.AppendFormat("<td colspan='4' style='text-align: center;'>GRACIAS POR SU PREFERENCIA</td>")
            End If
            tabla.Append("</tr>")
            tabla.Append("</tbody></table>")

        End If
        Return tabla.ToString()
    End Function

    Public Function GenerarDctoCorreo(ByVal p_CODE As String, ByVal CTLG_CODE As String) As String
        Dim ncEmpresa As New Nomade.NC.NCEmpresa("bn")

        Dim tabla As New StringBuilder
        Dim dtCabecera As New DataTable
        Dim dtDetalles As New DataTable
        'Dim dtEmpresas As New DataTable
        dtCabecera = caNotaCredito.ListarNotaCreditoGenerica(p_CODE, "", "", "", "X", "0000-00-00", "0000-00-00")
        dtDetalles = caNotaCredito.ListarDetalleNotaCreditoGenerica(p_CODE, "")

        If dtCabecera IsNot Nothing Then
            Dim codeMoneda As String = dtCabecera.Rows(0)("MONE_CODE") 'Código de Moneda
            Dim mon As String = dtCabecera.Rows(0)("MONEDA_SIMBOLO")
            Dim descMon As String = dtCabecera.Rows(0)("DESC_MONEDA") 'Descripcion de moneda  

            tabla.Append("<br>")
            tabla.Append("<br>")
            tabla.Append("<table border='0' style='width: 90%;' align='center'>")
            tabla.Append("<thead>")
            tabla.Append("<tr><th border='1' style='border-top:1px solid black;'></th></tr>")
            tabla.Append("<tr><th>&nbsp;</th></tr>")
            tabla.AppendFormat("<tr><th align='left' style='font-size:12pt;font-family:Arial,sans-serif'>NOTA DE CRÉDITO ELECTRÓNICA</th></tr>")
            tabla.Append("<tr><th>&nbsp;</th></tr>")
            tabla.Append("<tr><th border='1' style='border-top:1px solid black;'></th></tr>")
            tabla.Append("</thead>")
            tabla.Append("</table>")

            tabla.Append("<table border='0' style='width: 90%;' align='center' font size=9pt>")
            tabla.Append("<thead>")
            If (dtCabecera.Rows(0)("RUC").substring(0, 2) = "10") Then 'DPORTA 10/12/2021
                tabla.AppendFormat("<tr><th colspan='4' align='left' style='font-size:8pt;font-family:Arial,sans-serif'>{0}</th></tr>", dtCabecera.Rows(0)("DESC_CORTA_EMPRESA"))
                tabla.AppendFormat("<tr><th colspan='4' align='left' style='font-size:8pt;font-family:Arial,sans-serif'>De: {0}</th></tr>", dtCabecera.Rows(0)("DESC_EMPRESA"))
            Else
                tabla.AppendFormat("<tr><th colspan='4' align='left' style='font-size:8pt;font-family:Arial,sans-serif'>{0}</th></tr>", dtCabecera.Rows(0)("DESC_EMPRESA"))
            End If
            tabla.AppendFormat("<tr><th colspan='4' align='left' style='font-size:8pt;font-family:Arial,sans-serif'>RUC {0}</th></tr>", dtCabecera.Rows(0)("RUC"))
            tabla.AppendFormat("<tr><th colspan='4' align='left' style='font-size:8pt;font-family:Arial,sans-serif'>{0}</th></tr>", dtCabecera.Rows(0)("DIRECCION"))
            tabla.Append("</thead>")
            tabla.Append("<tbody>")
            tabla.Append("<tr><td colspan='4' border='1' style='border-top:1px solid black;'></td></tr>")
            If dtCabecera.Rows(0)("ELECTRONICO_IND") = "S" Then
                tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Autorizado mediante </strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("IMPR_SERIE"))
            End If
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Local</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("DESC_SUCURSAL"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Vend.</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("USUA_ID"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Tipo Moneda</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("DESC_MONEDA"))

            tabla.Append("<tr><td colspan='4' border='1' style='border-top:1px solid black;' ></td></tr>")
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>{1}</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("DOCUMENTO"), "Nota de Crédito")
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Cliente</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("RAZON_SOCIAL"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>{0}</strong></td><td colspan='3'><strong>: </strong>{1}</td></tr>", dtCabecera.Rows(0)("CLIE_DCTO_DESC"), dtCabecera.Rows(0)("CLIE_DCTO_NRO"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Dirección</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("DIRECCION_CLIENTE"))

            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Doc. Afectado</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("DOCUMENTO_REF"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Notivo</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("MOTIVO_DESC"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Fecha Emisión</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("FECHA_EMISION"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Fecha Venc.</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("EMISION"))

            tabla.Append("<tr><td colspan='4' border='1' style='border-top:1px solid black;' ></td></tr>")
            tabla.Append("</tbody>")
            tabla.Append("</table>")
            tabla.Append("<br>")

            tabla.Append("<table border='1' style='width: 90%;border-collapse:collapse' align='center' font size=9pt ><tbody>")
            tabla.Append("<tr style='background-color: #D6EAF8;'>")
            tabla.Append("<td style='text-align: center;border:1pt solid windowtext;padding:0cm 3.5pt;height:33pt'><strong>CANTIDAD</strong></td>")
            tabla.Append("<td style='text-align: center;padding-left:5px;border:1pt solid windowtext;padding:0cm 3.5pt;height:33pt' colspan='2'><strong>DESCRIPCIÓN</strong></td>")
            tabla.Append("<td style='text-align: center;border:1pt solid windowtext;padding:0cm 3.5pt;height:33pt'><strong>VALOR ITEM</strong></td>")
            tabla.Append("</tr>")

            For Each row In dtDetalles.Rows
                tabla.Append("<tr>")
                tabla.AppendFormat("<td style='text-align: left;border:1pt solid windowtext;'>{0}</td>", "1")
                tabla.AppendFormat("<td style='text-align: left; padding-right:10px;padding-left:5px;border:1pt solid windowtext;' colspan='2'><span style='word-break:break-all;'>{0}</span></td>", row("DESC_ITEM"))
                'tabla.AppendFormat("<td style='text-align: right;border:1pt solid windowtext;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px'></span></td>", Decimal.Parse(row("VALOR_VENTA")))
                tabla.AppendFormat("<td style='text-align: right; padding-left:10px;padding-right:5px;border:1pt solid windowtext;' colspan='2'><span style='word-break:break-all;'>{0}</span></td>", Decimal.Parse(row("VALOR_VENTA")))

                tabla.Append("</tr>")
            Next
            tabla.Append("</tbody></table>")

            tabla.Append("<table border='0' style='width: 90%;' align='center' font size=9pt><tbody>")
            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Op. Gravada {0}</strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", dtCabecera.Rows(0)("IMPORTE_GRA"))
            tabla.Append("</tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>IGV <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", dtCabecera.Rows(0)("IGV"))
            tabla.Append("</tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>ISC <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", "0.00")
            tabla.Append("</tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>OTROS <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", "0.00")
            tabla.Append("</tr>")
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")

            'tabla.Append("<tr>")
            'tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Desc.Global <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            'tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", "0.00")
            'tabla.Append("</tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Total valor de venta <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", dtCabecera.Rows(0)("IMPORTE_GRA"))
            tabla.Append("</tr>")

            Dim l As New Nomade.NB.Numalet(False, "00/100 $.", "con", True)
            Dim importeTexto As String
            importeTexto = (l.ToCustomCardinal(dtCabecera.Rows(0)("IMPORTE_TOTAL"))).ToUpper()

            tabla.Append("<tr>")

            If codeMoneda = "0002" Then
                tabla.AppendFormat("<td colspan='4' style='text-align: right;'>Son: {0} <span> SOLES </span></td>", importeTexto.Replace(".-", " (" + descMon + ")"))
            ElseIf codeMoneda = "0003" Then
                tabla.AppendFormat("<td colspan='4' style='text-align: right;'>Son: {0} <span> DOLARES </span></td>", importeTexto.Replace(".-", " (" + descMon + ")"))
            Else
                tabla.AppendFormat("<td colspan='4' style='text-align: right;'>Son: {0}</td>", importeTexto.Replace(".-", " (" + descMon + ")"))
            End If
            tabla.Append("</tr>")
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Importe Total <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", dtCabecera.Rows(0)("IMPORTE_TOTAL"))
            tabla.Append("<br>")
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr><td colspan='4' border='1'></td></tr>")
            tabla.Append("<tr>")
            If dtCabecera.Rows(0)("ELECTRONICO_IND") = "S" Then
                tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>{0}</td></tr>", "Para consultar el documento ingrese a http://52.41.93.228:1115, debe estar disponible dentro de las próximas 48 hrs. a partir de la fecha de emisión.")
            Else
                tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>{0}</td></tr>", "GRACIAS POR SU PREFERENCIA")
            End If
            tabla.Append("</table>")
        End If
        Return tabla.ToString()
    End Function

    'CORREO    
    Public Function GenerarPDF(ByVal CODIGO As String, ByVal CTLG As String) As String
        Dim ress As String = ""
        Dim htmlText As String = ""
        Dim cNomArch As String = CODIGO & ".pdf"
        htmlText = getHtmlTextPDF(CODIGO, CTLG)
        HTMLToPDF(htmlText, cNomArch, CODIGO)
        Return ress
    End Function

    Function getHtmlTextPDF(ByVal codigo As String, ByVal ctlg As String) As String
        Dim htmlText As New StringBuilder
        htmlText.Length = 0
        Dim documento As String = ""
        documento = GenerarDctoCorreo(codigo, ctlg)
        htmlText.Append(documento)
        Return htmlText.ToString
    End Function

    Sub HTMLToPDF(ByVal HTML As String, ByVal FilePath As String, ByVal p_CODE As String)

        Dim nc As New Nomade.NC.NCEmpresa("Bn")
        Dim dtCabecera As DataTable
        dtCabecera = caNotaCredito.ListarNotaCreditoGenerica(p_CODE, "", "", "", "X", "0000-00-00", "0000-00-00")

        Dim imgS, imgI As String

        Dim imgSuperior As String = dtCabecera(0)("IMG_SUPERIOR").ToString
        imgS = imgSuperior.Replace("../../../", String.Empty)
        If Not My.Computer.FileSystem.FileExists(HttpContext.Current.Server.MapPath("~") & imgS) Then
            imgS = "\recursos\img\SIN_IMAGEN.png"
        End If

        Dim imgInferior As String = dtCabecera(0)("IMG_INFERIOR").ToString
        imgI = imgInferior.Replace("../../../", String.Empty)
        If Not My.Computer.FileSystem.FileExists(HttpContext.Current.Server.MapPath("~") & imgI) Then
            imgI = "\recursos\img\SIN_IMAGEN.png"
        End If

        Dim archivo, res As String
        res = "Archivos\" + FilePath
        archivo = HttpContext.Current.Server.MapPath("~") + res
        If My.Computer.FileSystem.FileExists(archivo) Then
            My.Computer.FileSystem.DeleteFile(archivo)
        End If

        Dim document As Document
        document = New Document(PageSize.A4, 25, 25, 55, 65)

        PdfWriter.GetInstance(document, New FileStream(archivo, FileMode.Create))
        document.Open()

        Dim styles As iTextSharp.text.html.simpleparser.StyleSheet = New iTextSharp.text.html.simpleparser.StyleSheet()
        styles.LoadStyle("border", "border-bottom", "2px")

        Dim hw As iTextSharp.text.html.simpleparser.HTMLWorker = New iTextSharp.text.html.simpleparser.HTMLWorker(document)
        hw.Parse(New StringReader(HTML.ToString))
        document.Close()

        'If dtCabecera.Rows(0)("ELECTRONICO_IND") = "S" And dtCabecera(0)("IMAGEN_QR").ToString <> "" And dtCabecera(0)("IMAGEN_QR").ToString <> "undefined" Then 'DPORTA 20/05/2022
        If dtCabecera.Rows(0)("ELECTRONICO_IND") = "S" And p_CODE <> "" And p_CODE <> "undefined" Then
            imgCabConQR(FilePath, imgS, imgI, Base64ToImage(codigoQR.fnGetCodigoQR(p_CODE))) 'SOLO PARA ´DOCS ELECTRÓNICOS
        Else
            imgC(FilePath, imgS, imgI)
        End If
    End Sub

    Function Base64ToImage(ByVal base64string As String) As System.Drawing.Image 'DPORTA 20/05/2022
        'Configurar imagen y obtener flujo de datos juntos
        Dim img As System.Drawing.Image
        Dim MS As System.IO.MemoryStream = New System.IO.MemoryStream
        Dim b64 As String
        If base64string = "" Then
            b64 = ""
        Else
            'b64 = base64string.Split(",")(1).Replace(" ", "+") 'Con el split se Toma lo que corresponde al base64 y luego se reemplaza
            b64 = base64string
        End If

        Dim b() As Byte

        'Convierte el mensaje codificado en base64 en datos de imagen
        b = Convert.FromBase64String(b64)
        MS = New System.IO.MemoryStream(b)

        'Crea la imagen
        img = System.Drawing.Image.FromStream(MS)

        Return img
    End Function

    Function imgCabConQR(ByVal Archivo As String, ByVal imgs As String, ByVal imginf As String, ByVal imgQR As System.Drawing.Image) As String 'DPORTA 20/05/2022

        Dim WatermarkLocation As String = HttpContext.Current.Server.MapPath("~") & imgs
        Dim WatermarkLocationI As String = HttpContext.Current.Server.MapPath("~") & imginf
        Dim FileLocation As String = HttpContext.Current.Server.MapPath("~") & "Archivos\" & Archivo
        Dim filePath As String = HttpContext.Current.Server.MapPath("~") & "Archivos\ArchivosAux\" & Archivo
        Dim document As Document = New Document()
        Dim pdfReader As PdfReader = New PdfReader(FileLocation)
        Dim stamp As PdfStamper = New PdfStamper(pdfReader, New FileStream(filePath, FileMode.Create))

        Dim img As iTextSharp.text.Image = iTextSharp.text.Image.GetInstance(WatermarkLocation)

        img.ScaleAbsoluteWidth(425) '600
        img.ScaleAbsoluteHeight(73)
        img.SetAbsolutePosition(25, 770) '0,770

        Dim imgQ As iTextSharp.text.Image = iTextSharp.text.Image.GetInstance(imgQR, System.Drawing.Imaging.ImageFormat.Jpeg) 'Con esto se dibuja la imagen en el PDF
        imgQ.ScaleAbsoluteWidth(60)
        imgQ.ScaleAbsoluteHeight(60)
        imgQ.SetAbsolutePosition(515, 770)

        Dim waterMark As PdfContentByte
        For page As Integer = 1 To pdfReader.NumberOfPages
            If page = 1 Then
                waterMark = stamp.GetOverContent(page)
                waterMark.AddImage(img)
                'If elect = "S" Then
                waterMark.AddImage(imgQ)
                'End If
            End If
        Next

        stamp.FormFlattening = True
        stamp.Close()
        pdfReader.Close()
        document.Close()

        My.Computer.FileSystem.DeleteFile(FileLocation)
        My.Computer.FileSystem.MoveFile(filePath, FileLocation)
        Return "ok"

    End Function

    Function imgC(ByVal Archivo As String, ByVal imgs As String, ByVal imginf As String) As String

        Dim WatermarkLocation As String = HttpContext.Current.Server.MapPath("~") & imgs
        Dim WatermarkLocationI As String = HttpContext.Current.Server.MapPath("~") & imginf
        'Dim WatermarkLocationQ As String = HttpContext.Current.Server.MapPath("~") & imgQR
        Dim FileLocation As String = HttpContext.Current.Server.MapPath("~") & "Archivos\" & Archivo
        Dim filePath As String = HttpContext.Current.Server.MapPath("~") & "Archivos\ArchivosAux\" & Archivo
        Dim document As Document = New Document()
        Dim pdfReader As PdfReader = New PdfReader(FileLocation)
        Dim stamp As PdfStamper = New PdfStamper(pdfReader, New FileStream(filePath, FileMode.Create))

        Dim img As iTextSharp.text.Image = iTextSharp.text.Image.GetInstance(WatermarkLocation)

        img.ScaleAbsoluteWidth(425) '600
        img.ScaleAbsoluteHeight(73)
        img.SetAbsolutePosition(25, 770) '0,770

        'Dim imgQ As iTextSharp.text.Image = iTextSharp.text.Image.GetInstance(WatermarkLocationQ)
        'imgQ.ScaleAbsoluteWidth(60)
        'imgQ.ScaleAbsoluteHeight(60)
        'imgQ.SetAbsolutePosition(515, 770)


        'Dim imgIn As iTextSharp.text.Image = iTextSharp.text.Image.GetInstance(WatermarkLocationI)
        'imgIn.ScaleAbsoluteWidth(600)
        'imgIn.ScaleAbsoluteHeight(70)
        'imgIn.Alignment = iTextSharp.text.Image.UNDERLYING
        'imgIn.SetAbsolutePosition(0, 0)

        Dim waterMark As PdfContentByte
        For page As Integer = 1 To pdfReader.NumberOfPages
            If page = 1 Then
                waterMark = stamp.GetOverContent(page)
                waterMark.AddImage(img)
                'If elect = "S" Then
                '    waterMark.AddImage(imgQ)
                'End If
                'waterMark.AddImage(imgIn)
            End If
        Next

        stamp.FormFlattening = True
        stamp.Close()
        pdfReader.Close()
        document.Close()

        My.Computer.FileSystem.DeleteFile(FileLocation)
        My.Computer.FileSystem.MoveFile(filePath, FileLocation)
        Return "ok"

    End Function

    Public Function getLinks(ByVal pie_pagina As String) As String 'DPORTA 31/05/2022
        Dim cadena As String
        cadena = "@»(http://([w.]+/?)S*)»"
        Dim re As Regex = New Regex(cadena, RegexOptions.IgnoreCase Or RegexOptions.Compiled)
        pie_pagina = re.Replace(pie_pagina, "«<a href=»$1″» target=»»_blank»»>$1</a>»»")
        Return pie_pagina
    End Function

    Public Function vChar(ByVal campo As String) As String
        Dim res As String
        If campo IsNot Nothing Then
            res = campo.Trim().Replace("""", "'").Replace("\", " ")
            res = res.Replace(vbCrLf, "\n")
        Else
            res = campo
        End If
        Return res
    End Function

    Function ObtenerFecha(ByVal fecha As String) As String
        Dim dia = fecha.Split(" ")(0).Split("/")(0)
        Dim mes = fecha.Split(" ")(0).Split("/")(1)
        Dim anio = fecha.Split(" ")(0).Split("/")(2)
        Dim hora = ""
        Dim min = ""
        Dim seg = ""
        If fecha.Split(" ").Length = 3 Then
            hora = fecha.Split(" ")(1).Split(":")(0)
            min = fecha.Split(" ")(1).Split(":")(1)
            seg = fecha.Split(" ")(1).Split(":")(2)
            If fecha.Split(" ")(2).Contains("p") Then
                If Integer.Parse(hora) < 12 Then
                    hora = (Integer.Parse(hora) + 12).ToString
                End If
            End If
        End If
        fecha = anio + mes + dia + hora + min + seg
        Return fecha
    End Function


    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class