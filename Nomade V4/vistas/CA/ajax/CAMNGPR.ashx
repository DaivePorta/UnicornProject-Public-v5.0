<%@ WebHandler Language="VB" Class="CAMNGPR" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CAMNGPR : Implements IHttpHandler
    Dim OPCION As String
    Dim USUA_ID As String

    Dim p_CODE, p_CTLG_CODE, p_SCSL_CODE, p_SCSL_EXONERADA_IND, p_PERS_PIDM As String
    Dim p_MOTIVO_CODE, p_MOTIVO_DESC, p_MOTIVO_ADICIONAL, p_FECHA_EMISION,
        p_MONE_CODE, p_DETALLES, p_MONTO_IGV, p_SERIE, p_NUMERO, p_CODIGO_CORRELATIVO, p_TIPO_IND As String

    Dim p_IMPORTE_EXO, p_IMPORTE_INA, p_IMPORTE_GRA, p_IGV, p_IMPORTE_TOTAL, p_PCTJ_IGV As String
    Dim p_VALOR_CAMBIO, p_MONTO_USABLE, p_MES_PERIODO, p_ANIO_PERIODO As String
    'DOCUMENTO DE REFERENCIA
    Dim p_DCTO_REF_CODE, p_DCTO_REF_SERIE, p_DCTO_REF_NRO, p_DCTO_REF_TIPO_CODE As String

    'DETALLES 
    Dim p_ITEM As String

    'NUEVO
    Dim p_FTVDCTO_CODE As String
    Dim p_FTVDCTO_IND_ESTADO As String


    Dim ncCliente As New Nomade.NC.NCECliente("Bn")
    Dim caNotaCredito As New Nomade.CA.NotaCredito("Bn")
    Dim caNotaDebito As New Nomade.CA.CANotaDebito("Bn")

    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

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

        p_VALOR_CAMBIO = context.Request("p_VALOR_CAMBIO")
        p_MONTO_USABLE = context.Request("p_MONTO_USABLE")
        p_MES_PERIODO = context.Request("p_MES_PERIODO")
        p_ANIO_PERIODO = context.Request("p_ANIO_PERIODO")

        'DOCUMENTO DE REFERENCIA
        p_DCTO_REF_CODE = context.Request("p_DCTO_REF_CODE")
        p_DCTO_REF_SERIE = context.Request("p_DCTO_REF_SERIE")
        p_DCTO_REF_NRO = context.Request("p_DCTO_REF_NRO")
        p_DCTO_REF_TIPO_CODE = context.Request("p_DCTO_REF_TIPO_CODE")
        'DETALLES       
        p_ITEM = context.Request("p_ITEM")

        'NUEVO
        p_FTVDCTO_CODE = context.Request("p_FTVDCTO_CODE")
        p_FTVDCTO_CODE = IIf(p_FTVDCTO_CODE Is Nothing, "", p_FTVDCTO_CODE)
        p_FTVDCTO_IND_ESTADO = context.Request("p_FTVDCTO_IND_ESTADO")
        p_FTVDCTO_IND_ESTADO = IIf(p_FTVDCTO_IND_ESTADO Is Nothing, "", p_FTVDCTO_IND_ESTADO)

        Try

            Select Case OPCION

                Case "1" ' LISTAR DOCUMENTOS DE VENTA - DOCUMENTOS DE REFERENCIA
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = caNotaCredito.ListarDocumentosCompra("", "", "", "", "", p_CTLG_CODE, p_SCSL_CODE, p_DCTO_REF_TIPO_CODE, USUA_ID)
                    res = GenerarTablaDocumentos()

                Case "2" 'LISTAR DOCUMENTOS
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = caNotaCredito.fnListarDocumentosNC(p_FTVDCTO_CODE, p_FTVDCTO_IND_ESTADO)
                    res = "[]"
                    If Not dt Is Nothing Then
                        res = Utilities.DataTableToJSON(dt)
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


                Case "4" 'LISTAR NOTA DE CRÉDITO ( JSON )
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = caNotaCredito.ListarNotaCreditoGenerica(If(p_CODE Is Nothing, "", p_CODE), If(p_CTLG_CODE Is Nothing, "", p_CTLG_CODE),
                                                       If(p_SCSL_CODE Is Nothing, "", p_SCSL_CODE), If(p_PERS_PIDM Is Nothing, "", p_PERS_PIDM), If(p_TIPO_IND Is Nothing, "", p_TIPO_IND))
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
                Case "IMPR"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    res = GenerarDctoImprimir(p_CODE, p_CTLG_CODE)
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
        ' MUESTRA EL CAMPO DE MONTO EN EL MODAL
        resb.Append("<th>MODO PAGO</th>")
        resb.AppendFormat("<th>MONTO</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        If Not (dt Is Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                If dt.Rows(i)("COMPLETO").ToString = "COMPLETO" And dt.Rows(i)("ANULADO").ToString = "NO ANULADO" Then
                    If dt.Rows(i)("NOTA_CREDITO_IND").ToString = "N" Then
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
                            resb.AppendFormat("<tr class='doc_fila' onclick=""setSeleccionDocumento('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}')"" id='doc_fila_{0}_{1}'>", dt.Rows(i)("CODIGO").ToString(), dt.Rows(i)("SECUENCIA").ToString(), serie_numero(0), serie_numero(1), dt.Rows(i)("TIPO_DCTO").ToString(), dt.Rows(i)("IMPORTE_TOTAL").ToString(), dt.Rows(i)("MONEDA").ToString(), dt.Rows(i)("SIMBOLO_MONEDA").ToString(), dt.Rows(i)("INC_IGV_IND").ToString(), fechaEmision)
                            resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODIGO").ToString())
                            resb.AppendFormat("<td align='center' >{0}</td>", serie_numero(0))
                            resb.AppendFormat("<td align='center' >{0}</td>", serie_numero(1))
                            resb.AppendFormat("<td align='center' >{0}</td>", fechaEmision)
                            resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DESC_DCTO").ToString())
                            resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MOPA_DESC").ToString())
                            'MUESTRA EL SIMBOLO DE MONEDA Y EL MONTO EN EL MODAL 
                            resb.AppendFormat("<td align='center' style='text-align:center;' >{0}</td>", dt.Rows(i)("SIMBOLO_MONEDA").ToString() + " " + dt.Rows(i)("IMPORTE_TOTAL").ToString())
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
        Dim dtEmpresas As New DataTable
        dtCabecera = caNotaCredito.ListarNotaCreditoGenerica(p_CODE, "", "", "", "")

        dtDetalles = caNotaCredito.ListarDetalleNotaCreditoGenerica(p_CODE, "")

        If dtCabecera IsNot Nothing Then
            Dim rutaLogo As String = ""
            Dim mon As String = dtCabecera.Rows(0)("MONEDA_SIMBOLO")

            dtEmpresas = ncEmpresa.ListarEmpresa(dtCabecera.Rows(0)("CTLG_CODE"), "A", "")
            rutaLogo = dtEmpresas(0)("RUTA_IMAGEN").ToString

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

            tabla.Append("<table id='tblDctoImprimir1' class='tblDctoImprimir' border='" + border + "' style='width: 100%;margin-bottom:" + marginBottom + "' cellpadding='" + cellpadding + "'  align='center'>")
            tabla.Append("<tbody>")
            tabla.Append("<tr>")
            tabla.AppendFormat("<td rowspan='3'><h3>{0}</h3> {1}</td>", dtCabecera.Rows(0)("RAZON_SOCIAL"), If(dtCabecera.Rows(0)("DIRECCION_CLIENTE") = "", "", "</br>" + dtCabecera.Rows(0)("DIRECCION_CLIENTE")))
            tabla.AppendFormat("<td style='text-align: center;'>{0}</td>", dtCabecera.Rows(0)("DOCUMENTO"))
            tabla.Append("</tr>")
            tabla.Append("<tr>")
            'tabla.AppendFormat("<td width='" + wLogo + "' rowspan='2'></td>")
            tabla.AppendFormat("<td width='" + wNota + "' style='text-align: center;'><strong>RUC N° {0}</strong></td>", dtCabecera.Rows(0)("CLIE_DCTO_NRO"))
            tabla.Append("</tr>") '------------------------------------------------
            tabla.Append("<tr>")
            tabla.AppendFormat("<td style='text-align: center;'><strong>NOTA DE CRÉDITO</strong></td>")
            tabla.Append("</tr>") '------------------------------------------------            
            tabla.Append("</tbody></table>")

            tabla.Append("<table id='tblDctoImprimir2' class='tblDctoImprimir' border='" + border + "' style='width: 100%;margin-bottom:" + marginBottom + "' cellpadding='" + cellpadding + "' align='center'>")
            tabla.Append("<tbody>")
            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3'><strong>Cliente:</strong> {0}</td>", dtCabecera.Rows(0)("DESC_EMPRESA"))
            tabla.Append("</tr>") '-------------------------------------------------            
            tabla.Append("<tr>")
            tabla.AppendFormat("<td><strong>Dirección:</strong> {0}</td>", dtCabecera.Rows(0)("DIRECCION"))
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
                tabla.AppendFormat("<td><span style='word-break:break-all;'>{0}</span></td>", row("DESC_ITEM"))
                'tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", FormatNumber(CDbl(row("MONTO_SUBTOTAL")), 2))
                tabla.AppendFormat("<td colspan='2' style='text-align: right;'>{0}</td>", FormatNumber(CDbl(row("MONTO_SUBTOTAL")), 2))
                tabla.Append("</tr>")
            Next
            tabla.Append("<tr>")

            Dim l As New Nomade.NB.Numalet(False, "00/100 $.", "con", True)
            Dim importeTexto As String
            importeTexto = (l.ToCustomCardinal(dtCabecera.Rows(0)("IMPORTE_TOTAL"))).ToUpper()

            tabla.AppendFormat("<td colspan='2'><strong>SON: {0}</strong></td>", importeTexto.Replace(".-", " " + mon))
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
            tabla.Append("</tbody></table>")

            tabla.Append("</tbody>")
            tabla.Append("</table>")
        End If

        Return tabla.ToString()
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