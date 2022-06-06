<%@ WebHandler Language="VB" Class="NOMORDC" %>

Imports iTextSharp.text
Imports iTextSharp.text.pdf
Imports System
Imports System.Web
Imports System.Data
Imports System.IO
Imports System.IO.FileStream
Public Class NOMORDC : Implements IHttpHandler

    Dim opcion As String
    Dim res As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Dim p_DOC_REGIS, P_PIDM_PERSONA, p_pidm, P_CODE, TIPO_UPDATE, p_COMPRADOR As String
    Dim p_DOC_REGIS_NRO, p_PROVEDOR_TIPODOC As String
    Dim p_CATALOGO, MENSAJE, correo As String
    Dim p_ESTABLEC As String
    Dim p_PROVEDOR As String
    Dim p_FECHA_TRANSAC As String
    Dim p_FECHA_EMISION As String
    Dim p_DOC_ORIG As String
    Dim p_DOC_ORIG_NRO As String
    Dim p_DESPACHO As String
    Dim p_ENTREGA As String
    Dim p_TRANSPORTISTA As String
    Dim p_TIPO_TRANSPOR As String
    Dim p_MODO_PAGO As String
    Dim p_PLAZO_PAGO As Integer
    Dim p_FECHAV_PAGO As String
    Dim p_ESTADO_PAGO As String
    Dim p_MONETAR_MONEDA As String
    Dim p_MONETAR_BASE_IMP As Decimal
    Dim p_MONETAR_DESCUENTO As Decimal
    Dim p_MONETAR_ISC As Decimal
    Dim p_MONETAR_SUBTOTAL As Decimal
    Dim p_MONETAR_IGVPOR As Decimal
    Dim p_MONETAR_IGVSOL As Decimal
    Dim p_MONETAR_AJUST As Decimal
    Dim p_MONETAR_PREC_TOTAL As Decimal
    Dim p_MONETAR_DETRACCION As Decimal
    Dim p_MONETAR_PERCEPCION As Decimal
    Dim p_MONETAR_RETENCION As Decimal
    Dim p_MONETAR_PAGAR As Decimal
    Dim p_TRIBUTAC_SUJETODETRA As String
    Dim p_TRIBUTAC_SOLES As String
    Dim p_TRIBUTAC_CTA_DETRA As String
    Dim p_TRIBUTAC_SJT_PER As String
    Dim p_TRIBUTAC_SJT_RET As String
    Dim p_TRANSPOR_VEHICULO As String
    Dim p_TRANSPOR_CERT_INSCR As String
    Dim p_TRANSPOR_CHOFER As String
    Dim p_TRANSPOR_LICENCIA, p_SOCOTI_CODE, P_CODIGOCAB, p_COMPLETO_IND, p_CODIGO As String

    Dim p_TRIBUTAC_SUJETOPERS, P_CODIGO_SOLICITUD, p_CORRELATIVO As String
    Dim p_TRIBUTAC_SUJETORETEN As String
    Dim p_TEX As String
    Dim p_CONTACTO, p_GLOSA_GENERAL, p_DETALLE_ORD, p_IND_CUENT_COBRAR, TIPO_CONF As String

    Dim P_TIPO, P_NMBRE, NREMITENTE, DESTINATARIOS, asunto, P_SUCURSAL, p_code_orden, P_TIPO_COTI, p_TRANSPORTISTA_TIPODOC, p_INCLU_IGV, p_RESPONSABLE, p_AUTOGENERADO As String
    Dim dt As DataTable

    Dim imagen As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        MENSAJE = context.Request("MENSAJE")
        p_pidm = context.Request("p_pidm")
        p_PROVEDOR_TIPODOC = context.Request("p_PROVEDOR_TIPODOC")
        p_CODIGO = context.Request("p_CODIGO")



        P_CODIGOCAB = context.Request("P_CODIGOCAB")
        TIPO_UPDATE = context.Request("TIPO_UPDATE")
        TIPO_CONF = context.Request("TIPO_CONF")
        P_TIPO = context.Request("P_TIPO")
        P_NMBRE = context.Request("p_nemonico")
        opcion = context.Request("OPCION")
        p_COMPRADOR = context.Request("p_COMPRADOR")
        P_PIDM_PERSONA = context.Request("P_PIDM_PERSONA")

        p_COMPLETO_IND = context.Request("p_COMPLETO_IND")


        p_DOC_REGIS = context.Request("p_DOC_REGIS")
        p_DOC_REGIS_NRO = context.Request("p_DOC_REGIS_NRO")
        p_CATALOGO = context.Request("p_CATALOGO")
        p_ESTABLEC = context.Request("p_ESTABLEC")
        p_PROVEDOR = context.Request("p_PROVEDOR")
        p_FECHA_TRANSAC = context.Request("p_FECHA_TRANSAC")

        If p_FECHA_TRANSAC <> String.Empty Then
            p_FECHA_TRANSAC = Utilities.fechaLocal(context.Request("p_FECHA_TRANSAC"))
        End If


        p_FECHA_EMISION = context.Request("p_FECHA_EMISION")

        If p_FECHA_EMISION <> String.Empty Then
            p_FECHA_EMISION = Utilities.fechaLocal(context.Request("p_FECHA_EMISION"))
        End If

        p_DOC_ORIG = context.Request("p_DOC_ORIG")
        p_DOC_ORIG_NRO = context.Request("p_DOC_ORIG_NRO")
        p_DESPACHO = context.Request("p_DESPACHO")
        p_ENTREGA = vChar(context.Request("p_ENTREGA"))
        p_TRANSPORTISTA = context.Request("p_TRANSPORTISTA")
        p_TIPO_TRANSPOR = context.Request("p_TIPO_TRANSPOR")
        p_MODO_PAGO = context.Request("p_MODO_PAGO")
        p_PLAZO_PAGO = context.Request("p_PLAZO_PAGO")
        p_FECHAV_PAGO = context.Request("p_FECHAV_PAGO")

        If p_FECHAV_PAGO <> String.Empty Then
            p_FECHAV_PAGO = Utilities.fechaLocal(context.Request("p_FECHAV_PAGO"))
        End If

        p_ESTADO_PAGO = context.Request("p_ESTADO_PAGO")
        p_MONETAR_MONEDA = context.Request("p_MONETAR_MONEDA")
        p_MONETAR_BASE_IMP = context.Request("p_MONETAR_BASE_IMP")
        p_MONETAR_DESCUENTO = context.Request("p_MONETAR_DESCUENTO")
        p_MONETAR_ISC = context.Request("p_MONETAR_ISC")
        p_MONETAR_SUBTOTAL = context.Request("p_MONETAR_SUBTOTAL")
        p_MONETAR_IGVPOR = context.Request("p_MONETAR_IGVPOR")
        p_MONETAR_IGVSOL = context.Request("p_MONETAR_IGVSOL")
        p_MONETAR_AJUST = context.Request("p_MONETAR_AJUST")
        p_MONETAR_PREC_TOTAL = context.Request("p_MONETAR_PREC_TOTAL")
        p_MONETAR_DETRACCION = context.Request("p_MONETAR_DETRACCION")
        p_MONETAR_PERCEPCION = context.Request("p_MONETAR_PERCEPCION")
        p_MONETAR_RETENCION = context.Request("p_MONETAR_RETENCION")
        p_MONETAR_PAGAR = context.Request("p_MONETAR_PAGAR")
        p_TRIBUTAC_SUJETODETRA = context.Request("p_TRIBUTAC_SUJETODETRA")
        p_TRIBUTAC_SUJETOPERS = context.Request("p_TRIBUTAC_SUJETOPERS")
        p_TRIBUTAC_SUJETORETEN = context.Request("p_TRIBUTAC_SUJETORETEN")
        p_TRIBUTAC_SOLES = context.Request("p_TRIBUTAC_SOLES")
        p_TRIBUTAC_CTA_DETRA = context.Request("p_TRIBUTAC_CTA_DETRA")
        p_TRANSPOR_VEHICULO = context.Request("p_TRANSPOR_VEHICULO")
        p_TRANSPOR_CERT_INSCR = context.Request("p_TRANSPOR_CERT_INSCR")
        p_TRANSPOR_CHOFER = context.Request("p_TRANSPOR_CHOFER")
        p_TRANSPOR_LICENCIA = context.Request("p_TRANSPOR_LICENCIA")
        p_TEX = context.Request("p_TEX")
        p_CONTACTO = context.Request("p_CONTACTO")
        p_TRANSPORTISTA_TIPODOC = context.Request("p_TRANSPORTISTA_TIPODOC")
        P_CODIGO_SOLICITUD = context.Request("P_CODIGO_SOLICITUD")
        p_GLOSA_GENERAL = vChar(context.Request("p_GLOSA_GENERAL"))

        p_RESPONSABLE = context.Request("p_RESPONSABLE")
        p_AUTOGENERADO = context.Request("p_AUTOGENERADO")

        p_INCLU_IGV = context.Request("p_INCLU_IGV")
        P_SUCURSAL = context.Request("P_SUCURSAL")
        P_CODE = context.Request("P_CODE")
        p_SOCOTI_CODE = context.Request("p_SOCOTI_CODE")
        p_code_orden = context.Request("p_code_orden")
        P_TIPO_COTI = context.Request("P_TIPO_COTI")
        p_DETALLE_ORD = context.Request("p_DETALLE_ORD")



        NREMITENTE = context.Request("NREMITENTE")
        DESTINATARIOS = context.Request("DESTINATARIOS")
        asunto = context.Request("ASUNTO")



        Try
            Select Case opcion
                Case "1" 'VALIDAR CORREO Y CREAR ORDEN DE COMPRA
                    context.Response.ContentType = "application/json; charset=utf-8"

                    Dim flag As Boolean = False
                    Dim orde As New Nomade.CO.CORegistroCompras("Bn")
                    Dim meail As New Nomade.Mail.NomadeMail("Bn")

                    dt = orde.LISTAR_DEVULVE_CORREO(p_PROVEDOR)
                    If Not (dt Is Nothing) Then
                        If dt.Rows(0)("CORREO") <> "" Then
                            flag = True
                        Else
                            resb.Append("[")
                            resb.Append("{")
                            resb.Append("""NOCORREO"" :" & """NOCORREO""")
                            resb.Append("}")
                            resb.Append("]")
                            res = resb.ToString()
                        End If
                    Else
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""NOCORREO"" :" & """NOCORREO""")
                        resb.Append("}")
                        resb.Append("]")
                        res = resb.ToString()
                    End If

                    If (flag) Then

                        Dim asunto As String = ""
                        resArray = orde.CREAR_ORDEN_COMPRA(p_DOC_REGIS, p_DOC_REGIS_NRO, p_CATALOGO, p_ESTABLEC,
                        p_PROVEDOR, p_FECHA_TRANSAC, p_FECHA_EMISION, p_DOC_ORIG, p_DOC_ORIG_NRO, p_DESPACHO,
                        p_ENTREGA, p_TRANSPORTISTA, p_TIPO_TRANSPOR, p_MODO_PAGO, p_PLAZO_PAGO, p_FECHAV_PAGO, p_ESTADO_PAGO,
                        p_MONETAR_MONEDA, p_MONETAR_BASE_IMP, p_MONETAR_DESCUENTO, p_MONETAR_ISC, p_MONETAR_SUBTOTAL,
                        p_MONETAR_IGVPOR, p_MONETAR_IGVSOL, p_MONETAR_AJUST, p_MONETAR_PREC_TOTAL, p_MONETAR_DETRACCION, p_MONETAR_PERCEPCION,
                        p_MONETAR_RETENCION, p_MONETAR_PAGAR, p_TRIBUTAC_SUJETODETRA, p_TRIBUTAC_SUJETOPERS, p_TRIBUTAC_SUJETORETEN, p_TRIBUTAC_SOLES, p_TRIBUTAC_CTA_DETRA,
                        p_TRANSPOR_VEHICULO, p_TRANSPOR_CERT_INSCR, p_TRANSPOR_CHOFER,
                        p_TRANSPOR_LICENCIA, p_CONTACTO, p_COMPRADOR, p_PROVEDOR_TIPODOC, p_TRANSPORTISTA_TIPODOC, p_GLOSA_GENERAL, p_COMPLETO_IND, p_INCLU_IGV, p_AUTOGENERADO, p_RESPONSABLE, p_SOCOTI_CODE)

                        If resArray(1).ToString = "OK" Then

                            orde.CREAR_DETALLE_ORDENCOMPRA(resArray(0).ToString, p_TEX)
                            dt = orde.LISTAR_CABECERA_ORDCOMPRA(resArray(0).ToString)
                            'exportar2(dt, resArray(0).ToString, resArray(2).ToString)

                            Dim datoAj As String = HttpContext.Current.Server.MapPath("~") & "Archivos\" & resArray(0).ToString & ".pdf"
                            Try

                                If p_DOC_REGIS = "C" Then
                                    asunto = "ORDEN DE COMPRA" & p_DOC_REGIS_NRO
                                Else
                                    asunto = "ORDEN DE SERVICIO" & p_DOC_REGIS_NRO
                                End If

                                Dim correoComprador As String = ""
                                correoComprador = dt.Rows(0)("CON_CORREO")
                                If correoComprador = "" Then
                                    correoComprador = "aux@gmail.com"
                                End If

                                'meail.enviar(correoComprador, correoComprador, dt.Rows(0)("PROV_CORREO"), asunto, correo, datoAj)
                                resb.Append("[")
                                resb.Append("{")
                                resb.Append("""CODE_PRODUCTO"" :" & """" & resArray(0).ToString & """,")
                                resb.Append("""CORRELATIVO"" :" & """" & resArray(2).ToString & """,")
                                resb.Append("""SUCCESS"" :" & """" & resArray(1).ToString & """")
                                resb.Append("}")
                                resb.Append("]")

                            Catch ex As Exception
                                resb.Append("[")
                                resb.Append("{")
                                resb.Append("""error"" :" & """error""")
                                resb.Append("}")
                                resb.Append("]")
                            End Try
                        End If
                        res = resb.ToString()
                    End If

                Case "2"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim orde As New Nomade.CO.CORegistroCompras("Bn")
                    Dim dtC As DataTable
                    dtC = orde.LISTAR_CONTACTOS(P_PIDM_PERSONA)

                    If Not (dtC Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dtC.Rows
                            resb.Append("{")
                            resb.Append("""CONTACTO"" :" & """" & MiDataRow("nombre").ToString & """,")
                            resb.Append("""PIDM_CONTAC"" :" & """" & MiDataRow("pidm").ToString & """")
                            resb.Append("}")

                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If

                    res = resb.ToString()
                Case "3"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim dtCof As DataTable
                    Dim orde As New Nomade.CO.CORegistroCompras("Bn")
                    dtCof = orde.DEVUELVE_CONFIGURACION(TIPO_CONF)

                    If Not (dtCof Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dtCof.Rows
                            resb.Append("{")
                            resb.Append("""TIPO"" :" & """" & MiDataRow("TIPO").ToString & """,")
                            resb.Append("""NEMONICO"" :" & """" & MiDataRow("NEMONICO").ToString & """,")
                            resb.Append("""SUCCESS"" :" & """OK""")
                            resb.Append("}")

                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If

                    res = resb.ToString()
                Case "4"
                    Dim orde As New Nomade.CO.CORegistroCompras("Bn")
                    Dim r As String
                    r = orde.MODIFICAR_CORRELATIVO(P_TIPO, P_NMBRE, TIPO_UPDATE)

                    res = r

                Case "5"
                    Dim orde As New Nomade.CO.CORegistroCompras("Bn")
                    Dim dtor As DataTable
                    dtor = orde.LISTAR_LISTA_ORDEN_COMPRA(p_CATALOGO, p_ESTABLEC)

                    If Not dtor Is Nothing Then
                        resb.Append("[")

                        For Each row As DataRow In dtor.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            resb.Append("""CORRELATIVO"":""" & row("CORRELATIVO").ToString & """,")
                            resb.Append("""GLOSA"":""" & row("GLOSA").ToString & """,")
                            resb.Append("""TIPODOC"":""" & row("TIPODOC").ToString & """,")
                            resb.Append("""TOTAL"":""" & row("TOTAL").ToString & """,")
                            resb.Append("""DESC_MONEDA"":""" & row("DESC_MONEDA").ToString & """,")
                            resb.Append("""FECHA_TRANS"":""" & row("FECHA_TRANS").ToString & """,")
                            resb.Append("""ESTADO_CANCELADO"":""" & row("ESTADO_CANCELADO").ToString & """,")
                            resb.Append("""ESTADO"":""" & row("COMPLETO_IND").ToString & """,")
                            resb.Append("""NESTADO_CANCELADO"":""" & row("NESTADO_CANCELADO").ToString & """,")
                            resb.Append("""COMPLETO_IND"":""" & row("COMPLETO_IND").ToString & """,")
                            resb.Append("""PROVEEDOR"":""" & row("P_NOMBRE").ToString & """")
                            resb.Append("},")
                        Next

                        resb.Append("-")
                        resb.Replace("},-", "}")

                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "6"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim orde As New Nomade.CO.CORegistroCompras("Bn")
                    Dim dtt As New DataTable
                    dtt = orde.LISTAR_CABECERA_ORDCOMPRA(P_CODIGOCAB)
                    If Not dtt Is Nothing Then
                        resb.Append("[")

                        For Each row As DataRow In dtt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            resb.Append("""ESTADO_PAGO"":""" & row("ESTADO_PAGO").ToString & """,")
                            resb.Append("""FECHA_PAGO"":""" & row("FECHA_PAGO").ToString & """,")
                            resb.Append("""CORRELATIVO"":""" & row("CORRELATIVO").ToString & """,")
                            resb.Append("""FECHA_TRANS"":""" & row("FECHA_TRANS").ToString & """,")
                            resb.Append("""FECHA_ENTREGA"":""" & row("FECHA_ENTREGA").ToString & """,")
                            resb.Append("""ESTABLECIMIENTO"":""" & row("ESTABLECIMIENTO").ToString & """,")
                            resb.Append("""PLAZO_PAGO"":""" & row("PLAZO_PAGO").ToString & """,")
                            resb.Append("""DESPACHO"":""" & row("DESPACHO").ToString & """,")
                            resb.Append("""MODO_PAGO"":""" & row("MODO_PAGO").ToString & """,")
                            resb.Append("""CATALOGO"":""" & row("CATALOGO").ToString & """,")
                            resb.Append("""DESPACHO"":""" & row("DESPACHO").ToString & """,")
                            resb.Append("""ENTREGAR"":""" & row("ENTREGAR").ToString & """,")
                            resb.Append("""SUBTOTAL"":""" & row("SUBTOTAL").ToString & """,")
                            resb.Append("""IGVSOLES"":""" & row("IGVSOLES").ToString & """,")
                            resb.Append("""DETRACCION"":""" & row("DETRACCION").ToString & """,")
                            resb.Append("""PERCCECION"":""" & row("PERCCECION").ToString & """,")
                            resb.Append("""RETENCION"":""" & row("RETENCION").ToString & """,")
                            resb.Append("""TOTAL"":""" & row("TOTAL").ToString & """,")
                            resb.Append("""PAGAR"":""" & row("PAGAR").ToString & """,")
                            resb.Append("""TIPODOC"":""" & row("TIPODOC").ToString & """,")
                            resb.Append("""TIPOTRANS"":""" & row("TIPOTRANS").ToString & """,")
                            resb.Append("""CONTACTO"":""" & row("CONTACTO").ToString & """,")
                            resb.Append("""TOTAL"":""" & row("TOTAL").ToString & """,")
                            resb.Append("""P_NOMBRE"":""" & row("P_NOMBRE").ToString & """,")
                            resb.Append("""P_NUMERO"":""" & row("P_NUMERO").ToString & """,")
                            resb.Append("""P_TIPO_DOC"":""" & row("P_TIPO_DOC").ToString & """,")
                            resb.Append("""T_NOMBRE"":""" & row("T_NOMBRE").ToString & """,")
                            resb.Append("""M_TIPOMONEDA"":""" & row("M_TIPOMONEDA").ToString & """,")
                            resb.Append("""T_NUMERO"":""" & row("T_NUMERO").ToString & """,")
                            resb.Append("""PIDM_PROVEEDOR"":""" & row("PIDM_PROVEEDOR").ToString & """,")

                            resb.Append("""T_VEHICULO"":""" & row("T_VEHICULO").ToString & """,")
                            resb.Append("""T_INSCRIPCION"":""" & row("T_INSCRIPCION").ToString & """,")
                            resb.Append("""T_CHOFER"":""" & row("T_CHOFER").ToString & """,")
                            resb.Append("""T_LICENCIA"":""" & row("T_LICENCIA").ToString & """,")
                            resb.Append("""T_TIPO_DOC"":""" & row("T_TIPO_DOC").ToString & """,")

                            resb.Append("""BASE_IMPONIBLE"":""" & row("BASE_IMPONIBLE").ToString & """,")
                            resb.Append("""DESCUENTO"":""" & row("DESCUENTO").ToString & """,")
                            resb.Append("""ISC"":""" & row("ISC").ToString & """,")
                            resb.Append("""AJUSTE"":""" & row("AJUSTE").ToString & """,")
                            resb.Append("""SUBTOTAL"":""" & row("SUBTOTAL").ToString & """,")


                            resb.Append("""IGVPOR"":""" & row("IGVPOR").ToString & """,")
                            resb.Append("""IGVSOLES"":""" & row("IGVSOLES").ToString & """,")
                            resb.Append("""DETRACCION"":""" & row("DETRACCION").ToString & """,")
                            resb.Append("""PERCCECION"":""" & row("PERCCECION").ToString & """,")
                            resb.Append("""RETENCION"":""" & row("RETENCION").ToString & """,")
                            resb.Append("""TOTAL"":""" & row("TOTAL").ToString & """,")
                            resb.Append("""PAGAR"":""" & row("PAGAR").ToString & """,")
                            resb.Append("""GLOSA_GENERAL"":""" & row("GLOSA_GENERAL").ToString & """,")
                            resb.Append("""CUENTA_COBRAR"":""" & row("CUENTA_COBRAR").ToString & """,")
                            resb.Append("""INCL_IGV_ITEMS"":""" & row("PRECIOS_INC_IGV").ToString & """,")
                            resb.Append("""MODO_PAGO_CODIGO"":""" & row("MODO_PAGO_CODIGO").ToString & """,")
                            resb.Append("""RESPONSABLE"":""" & row("RESPONSABLE").ToString & """,")
                            resb.Append("""COTIZACION"":""" & row("COTIZACION").ToString & """,")
                            resb.Append("""TRIB_SUJDETRA"":""" & row("TRIB_SUJDETRA").ToString & """,")
                            resb.Append("""TRIB_SUJETOPERS"":""" & row("TRIB_SUJETOPERS").ToString & """,")
                            resb.Append("""TRIB_SUJETORETE"":""" & row("TRIB_SUJETORETE").ToString & """,")
                            resb.Append("""TRIB_SOLES"":""" & row("TRIB_SOLES").ToString & """,")
                            resb.Append("""IND_CANCELADO"":""" & row("IND_CANCELADO").ToString & """,")
                            resb.Append("""COMPLETO_IND"":""" & row("COMPLETO_IND").ToString & """,")
                            resb.Append("""TRIB_CUENTA"":""" & row("TRIB_CUENTA").ToString & """")
                            resb.Append("},")
                        Next

                        resb.Append("-")
                        resb.Replace("},-", "}")

                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "7"

                    Dim dtDetalle As DataTable
                    Dim d As New Nomade.CO.CORegistroCompras("Bn")
                    dtDetalle = d.LISTAR_DETALLE_ORDCOMPRA(P_CODIGOCAB)
                    If Not dtDetalle Is Nothing Then
                        resb.Append("[")

                        For Each row As DataRow In dtDetalle.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGOPRO").ToString & """,")
                            resb.Append("""DES_PRODUCTO"":""" & row("PRODUCTO").ToString & """,")
                            resb.Append("""UNIDAD_MEDIDAD"":""" & row("UNIDAD").ToString & """,")
                            resb.Append("""CODIGO_MEDIDAD"":""" & row("UNME_CODE").ToString & """,")
                            resb.Append("""CANTIDAD"":""" & row("CANTIDAD").ToString & """,")
                            resb.Append("""IMPORTE"":""" & row("PREC_UNIT").ToString & """,")
                            resb.Append("""TOTAL"":""" & row("IMPORTE").ToString & """,")
                            resb.Append("""GLOSA"":""" & row("GLOSA").ToString & """,")
                            resb.Append("""DETRACCION"":""" & row("DETRACCION").ToString & """")
                            resb.Append("},")
                        Next

                        resb.Append("-")
                        resb.Replace("},-", "}")

                        resb.Append("]")
                    End If
                    res = resb.ToString()

                    'GenerarTablaPro2(dtDetalle)

                Case "8"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim dtCod As DataTable
                    Dim d As New Nomade.CO.CORegistroCompras("Bn")
                    dtCod = d.LISTAR_CODIGO_COTIZACION(p_CATALOGO, p_ESTABLEC)

                    If Not dtCod Is Nothing Then
                        resb.Append("[")

                        For Each row As DataRow In dtCod.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """")

                            resb.Append("},")
                        Next

                        resb.Append("-")
                        resb.Replace("},-", "}")

                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "9"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim d As New Nomade.CO.CORegistroCompras("Bn")
                    Dim dtCod As DataTable
                    dtCod = d.LISTA_DETALLE_SOLICITUD(P_CODIGO_SOLICITUD)
                    If Not dtCod Is Nothing Then
                        resb.Append("[")

                        For Each row As DataRow In dtCod.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":" & """" & row("COD_PROD").ToString & """,")
                            resb.Append("""DES_PRODUCTO"":" & """" & row("PRODUCTO").ToString & """,")
                            resb.Append("""CODIGO_MEDIDAD"":" & """" & row("COD_UNIDAD").ToString & """,")
                            resb.Append("""CANTIDAD"":" & """" & row("CANTIDAD").ToString & """,")
                            resb.Append("""TOTAL"":" & """" & row("IMPORTE").ToString & """,")
                            resb.Append("""DETRACCION"":" & """" & row("IMPORTE").ToString & """,")
                            resb.Append("""GLOSA"":" & """" & row("GLOSA").ToString & """,")
                            resb.Append("""IMPORTE"":" & """" & row("PRECIO_UNITARIO").ToString & """,")
                            resb.Append("""UNIDAD_MEDIDAD"":" & """" & row("UNIDAD_MEDIDA").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("-")
                        resb.Replace("},-", "}")
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "10"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim dtCorreo As DataTable
                    Dim orde As New Nomade.CO.CORegistroCompras("Bn")
                    dtCorreo = orde.LISTAR_DEVULVE_CORREO(p_PROVEDOR)

                    If dtCorreo.Rows(0)("CORREO") <> "" Then
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""CORREO"" :" & """" & dtCorreo.Rows(0)("CORREO").ToString() & """")
                        resb.Append("}")
                        resb.Append("]")
                    Else
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""CORREO"" :" & """NOCORREO""")
                        resb.Append("}")
                        resb.Append("]")
                    End If

                    res = resb.ToString()



                Case "11" 'MODIFICACION DE ORDEN
                    context.Response.ContentType = "application/json; charset=utf-8"

                    Dim flag As Boolean = False
                    Dim orde As New Nomade.CO.CORegistroCompras("Bn")
                    Dim meail As New Nomade.Mail.NomadeMail("Bn")

                    dt = orde.LISTAR_DEVULVE_CORREO(p_PROVEDOR)
                    If Not (dt Is Nothing) Then
                        If dt.Rows(0)("CORREO") <> "" Then
                            flag = True
                        Else
                            resb.Append("[")
                            resb.Append("{")
                            resb.Append("""NOCORREO"" :" & """NOCORREO""")
                            resb.Append("}")
                            resb.Append("]")
                            res = resb.ToString()
                        End If
                    Else
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""NOCORREO"" :" & """NOCORREO""")
                        resb.Append("}")
                        resb.Append("]")
                        res = resb.ToString()
                    End If

                    If (flag) Then

                        Dim asunto As String = ""
                        resArray = orde.MODIFICAR_ORDEN_COMPRA(p_CODIGO, p_DOC_REGIS, p_DOC_REGIS_NRO, p_CATALOGO, p_ESTABLEC,
                        p_PROVEDOR, p_FECHA_TRANSAC, p_FECHA_EMISION, p_DOC_ORIG, p_DOC_ORIG_NRO, p_DESPACHO,
                        p_ENTREGA, p_TRANSPORTISTA, p_TIPO_TRANSPOR, p_MODO_PAGO, p_PLAZO_PAGO, p_FECHAV_PAGO, p_ESTADO_PAGO,
                        p_MONETAR_MONEDA, p_MONETAR_BASE_IMP, p_MONETAR_DESCUENTO, p_MONETAR_ISC, p_MONETAR_SUBTOTAL,
                        p_MONETAR_IGVPOR, p_MONETAR_IGVSOL, p_MONETAR_AJUST, p_MONETAR_PREC_TOTAL, p_MONETAR_DETRACCION, p_MONETAR_PERCEPCION,
                        p_MONETAR_RETENCION, p_MONETAR_PAGAR, p_TRIBUTAC_SUJETODETRA, p_TRIBUTAC_SUJETOPERS, p_TRIBUTAC_SUJETORETEN, p_TRIBUTAC_SOLES, p_TRIBUTAC_CTA_DETRA,
                        p_TRANSPOR_VEHICULO, p_TRANSPOR_CERT_INSCR, p_TRANSPOR_CHOFER,
                        p_TRANSPOR_LICENCIA, p_CONTACTO, p_COMPRADOR, p_PROVEDOR_TIPODOC, p_TRANSPORTISTA_TIPODOC, p_GLOSA_GENERAL, p_INCLU_IGV, p_AUTOGENERADO, p_RESPONSABLE, p_SOCOTI_CODE)

                        If resArray(0).ToString = "OK" Then

                            orde.MODIFICAR_DETALLE_ORDENCOMPRA(p_CODIGO.ToString, p_TEX)
                            dt = orde.LISTAR_CABECERA_ORDCOMPRA(p_CODIGO)

                            resb.Append("[")
                            resb.Append("{")
                            resb.Append("""SUCCESS"" :" & """" & resArray(0).ToString & """")
                            resb.Append("}")
                            resb.Append("]")

                        End If
                        res = resb.ToString()
                    End If


                Case "12" 'COMPLETAR DOCUMENTO
                    context.Response.ContentType = "application/json; charset=utf-8"

                    Dim flag As Boolean = False
                    Dim orde As New Nomade.CO.CORegistroCompras("Bn")
                    Dim meail As New Nomade.Mail.NomadeMail("Bn")

                    dt = orde.LISTAR_DEVULVE_CORREO(p_PROVEDOR)
                    If Not (dt Is Nothing) Then
                        If dt.Rows(0)("CORREO") <> "" Then
                            flag = True
                        Else
                            resb.Append("[")
                            resb.Append("{")
                            resb.Append("""NOCORREO"" :" & """NOCORREO""")
                            resb.Append("}")
                            resb.Append("]")
                            res = resb.ToString()
                        End If
                    Else
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""NOCORREO"" :" & """NOCORREO""")
                        resb.Append("}")
                        resb.Append("]")
                        res = resb.ToString()
                    End If

                    If (flag) Then

                        Dim asunto As String = ""
                        resArray = orde.COMPLETAR_ORDEN_COMPRA(p_CODIGO, p_DOC_REGIS, p_DOC_REGIS_NRO, p_CATALOGO, p_ESTABLEC,
                        p_PROVEDOR, p_FECHA_TRANSAC, p_FECHA_EMISION, p_DOC_ORIG, p_DOC_ORIG_NRO, p_DESPACHO,
                        p_ENTREGA, p_TRANSPORTISTA, p_TIPO_TRANSPOR, p_MODO_PAGO, p_PLAZO_PAGO, p_FECHAV_PAGO, p_ESTADO_PAGO,
                        p_MONETAR_MONEDA, p_MONETAR_BASE_IMP, p_MONETAR_DESCUENTO, p_MONETAR_ISC, p_MONETAR_SUBTOTAL,
                        p_MONETAR_IGVPOR, p_MONETAR_IGVSOL, p_MONETAR_AJUST, p_MONETAR_PREC_TOTAL, p_MONETAR_DETRACCION, p_MONETAR_PERCEPCION,
                        p_MONETAR_RETENCION, p_MONETAR_PAGAR, p_TRIBUTAC_SUJETODETRA, p_TRIBUTAC_SUJETOPERS, p_TRIBUTAC_SUJETORETEN, p_TRIBUTAC_SOLES, p_TRIBUTAC_CTA_DETRA,
                        p_TRANSPOR_VEHICULO, p_TRANSPOR_CERT_INSCR, p_TRANSPOR_CHOFER,
                        p_TRANSPOR_LICENCIA, p_CONTACTO, p_COMPRADOR, p_PROVEDOR_TIPODOC, p_TRANSPORTISTA_TIPODOC, p_GLOSA_GENERAL, p_COMPLETO_IND, p_INCLU_IGV, p_AUTOGENERADO, p_RESPONSABLE, p_SOCOTI_CODE)

                        If resArray(1).ToString = "OK" Then

                            If p_CODIGO = "" Then
                                orde.CREAR_DETALLE_ORDENCOMPRA(resArray(0).ToString, p_TEX)
                                dt = orde.LISTAR_CABECERA_ORDCOMPRA(resArray(0).ToString)
                                exportar2(dt, resArray(0).ToString, resArray(2).ToString)

                                Dim datoAj As String = HttpContext.Current.Server.MapPath("~") & "Archivos\" & resArray(0).ToString & ".pdf"
                                Try

                                    If p_DOC_REGIS = "C" Then
                                        asunto = "ORDEN DE COMPRA" & p_DOC_REGIS_NRO
                                    Else
                                        asunto = "ORDEN DE SERVICIO" & p_DOC_REGIS_NRO
                                    End If

                                    Dim correoComprador As String = ""
                                    correoComprador = dt.Rows(0)("CON_CORREO")
                                    If correoComprador = "" Then
                                        correoComprador = "aux@gmail.com"
                                    End If

                                    meail.enviar(correoComprador, correoComprador, dt.Rows(0)("PROV_CORREO"), asunto, correo, datoAj)
                                    resb.Append("[")
                                    resb.Append("{")
                                    resb.Append("""CODE_PRODUCTO"" :" & """" & resArray(0).ToString & """,")
                                    resb.Append("""CORRELATIVO"" :" & """" & resArray(2).ToString & """,")
                                    resb.Append("""SUCCESS"" :" & """" & resArray(1).ToString & """")
                                    resb.Append("}")
                                    resb.Append("]")

                                Catch ex As Exception
                                    resb.Append("[")
                                    resb.Append("{")
                                    resb.Append("""error"" :" & """error""")
                                    resb.Append("}")
                                    resb.Append("]")
                                End Try
                            Else
                                orde.MODIFICAR_DETALLE_ORDENCOMPRA(p_CODIGO, p_TEX)
                                dt = orde.LISTAR_CABECERA_ORDCOMPRA(p_CODIGO)
                                exportar2(dt, p_CODIGO, p_CORRELATIVO)

                                Dim datoAj As String = HttpContext.Current.Server.MapPath("~") & "Archivos\" & p_CODIGO & ".pdf"
                                Try

                                    If p_DOC_REGIS = "C" Then
                                        asunto = "ORDEN DE COMPRA" & p_DOC_REGIS_NRO
                                    Else
                                        asunto = "ORDEN DE SERVICIO" & p_DOC_REGIS_NRO
                                    End If

                                    Dim correoComprador As String = ""
                                    Dim resOK As String = "OK"

                                    correoComprador = dt.Rows(0)("CON_CORREO")
                                    If correoComprador = "" Then
                                        correoComprador = "aux@gmail.com"
                                    End If

                                    meail.enviar(correoComprador, correoComprador, dt.Rows(0)("PROV_CORREO"), asunto, correo, datoAj)
                                    resb.Append("[")
                                    resb.Append("{")
                                    resb.Append("""CODE_PRODUCTO"" :" & """" & p_CODIGO & """,")
                                    resb.Append("""CORRELATIVO"" :" & """" & p_CORRELATIVO & """,")
                                    resb.Append("""SUCCESS"" :" & """" & resOK & """")
                                    resb.Append("}")
                                    resb.Append("]")

                                Catch ex As Exception
                                    resb.Append("[")
                                    resb.Append("{")
                                    resb.Append("""error"" :" & """error""")
                                    resb.Append("}")
                                    resb.Append("]")
                                End Try
                            End If



                        End If
                        res = resb.ToString()
                    End If

                Case "13" 'VALIDAR CORREO Y GRABAR ORDEN DE ADQUISICION
                    context.Response.ContentType = "application/json; charset=utf-8"

                    Dim flag As Boolean = False
                    Dim orde As New Nomade.CO.CORegistroCompras("Bn")
                    Dim meail As New Nomade.Mail.NomadeMail("Bn")

                    dt = orde.LISTAR_DEVULVE_CORREO(p_PROVEDOR)
                    If Not (dt Is Nothing) Then
                        If dt.Rows(0)("CORREO") <> "" Then
                            flag = True
                        Else
                            resb.Append("[")
                            resb.Append("{")
                            resb.Append("""NOCORREO"" :" & """NOCORREO""")
                            resb.Append("}")
                            resb.Append("]")
                            res = resb.ToString()
                        End If
                    Else
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""NOCORREO"" :" & """NOCORREO""")
                        resb.Append("}")
                        resb.Append("]")
                        res = resb.ToString()
                    End If

                    If (flag) Then

                        Dim asunto As String = ""
                        resArray = orde.CREAR_ORDEN_COMPRA(p_DOC_REGIS, p_DOC_REGIS_NRO, p_CATALOGO, p_ESTABLEC,
                        p_PROVEDOR, p_FECHA_TRANSAC, p_FECHA_EMISION, p_DOC_ORIG, p_DOC_ORIG_NRO, p_DESPACHO,
                        p_ENTREGA, p_TRANSPORTISTA, p_TIPO_TRANSPOR, p_MODO_PAGO, p_PLAZO_PAGO, p_FECHAV_PAGO, p_ESTADO_PAGO,
                        p_MONETAR_MONEDA, p_MONETAR_BASE_IMP, p_MONETAR_DESCUENTO, p_MONETAR_ISC, p_MONETAR_SUBTOTAL,
                        p_MONETAR_IGVPOR, p_MONETAR_IGVSOL, p_MONETAR_AJUST, p_MONETAR_PREC_TOTAL, p_MONETAR_DETRACCION, p_MONETAR_PERCEPCION,
                        p_MONETAR_RETENCION, p_MONETAR_PAGAR, p_TRIBUTAC_SUJETODETRA, p_TRIBUTAC_SUJETOPERS, p_TRIBUTAC_SUJETORETEN, p_TRIBUTAC_SOLES, p_TRIBUTAC_CTA_DETRA,
                        p_TRANSPOR_VEHICULO, p_TRANSPOR_CERT_INSCR, p_TRANSPOR_CHOFER,
                        p_TRANSPOR_LICENCIA, p_CONTACTO, p_COMPRADOR, p_PROVEDOR_TIPODOC, p_TRANSPORTISTA_TIPODOC, p_GLOSA_GENERAL, p_COMPLETO_IND, p_INCLU_IGV, p_AUTOGENERADO, p_RESPONSABLE, p_SOCOTI_CODE)

                        If resArray(1).ToString = "OK" Then

                            orde.CREAR_DETALLE_ORDENCOMPRA_ADQUISICION(resArray(0).ToString, p_TEX)
                            dt = orde.LISTAR_CABECERA_ORDCOMPRA(resArray(0).ToString)
                            'exportar2(dt, resArray(0).ToString, resArray(2).ToString)

                            Dim datoAj As String = HttpContext.Current.Server.MapPath("~") & "Archivos\" & resArray(0).ToString & ".pdf"
                            Try

                                If p_DOC_REGIS = "C" Then
                                    asunto = "ORDEN DE COMPRA" & p_DOC_REGIS_NRO
                                Else
                                    asunto = "ORDEN DE SERVICIO" & p_DOC_REGIS_NRO
                                End If

                                Dim correoComprador As String = ""
                                correoComprador = dt.Rows(0)("CON_CORREO")
                                If correoComprador = "" Then
                                    correoComprador = "aux@gmail.com"
                                End If

                                'meail.enviar(correoComprador, correoComprador, dt.Rows(0)("PROV_CORREO"), asunto, correo, datoAj)
                                resb.Append("[")
                                resb.Append("{")
                                resb.Append("""CODE_PRODUCTO"" :" & """" & resArray(0).ToString & """,")
                                resb.Append("""CORRELATIVO"" :" & """" & resArray(2).ToString & """,")
                                resb.Append("""SUCCESS"" :" & """" & resArray(1).ToString & """")
                                resb.Append("}")
                                resb.Append("]")

                            Catch ex As Exception
                                resb.Append("[")
                                resb.Append("{")
                                resb.Append("""error"" :" & """error""")
                                resb.Append("}")
                                resb.Append("]")
                            End Try
                        End If
                        res = resb.ToString()
                    End If

                Case "14" 'MODIFICACION DE ORDEN ADQUISICION
                    context.Response.ContentType = "application/json; charset=utf-8"

                    Dim flag As Boolean = False
                    Dim orde As New Nomade.CO.CORegistroCompras("Bn")
                    Dim meail As New Nomade.Mail.NomadeMail("Bn")

                    dt = orde.LISTAR_DEVULVE_CORREO(p_PROVEDOR)
                    If Not (dt Is Nothing) Then
                        If dt.Rows(0)("CORREO") <> "" Then
                            flag = True
                        Else
                            resb.Append("[")
                            resb.Append("{")
                            resb.Append("""NOCORREO"" :" & """NOCORREO""")
                            resb.Append("}")
                            resb.Append("]")
                            res = resb.ToString()
                        End If
                    Else
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""NOCORREO"" :" & """NOCORREO""")
                        resb.Append("}")
                        resb.Append("]")
                        res = resb.ToString()
                    End If

                    If (flag) Then

                        Dim asunto As String = ""
                        resArray = orde.MODIFICAR_ORDEN_COMPRA(p_CODIGO, p_DOC_REGIS, p_DOC_REGIS_NRO, p_CATALOGO, p_ESTABLEC,
                        p_PROVEDOR, p_FECHA_TRANSAC, p_FECHA_EMISION, p_DOC_ORIG, p_DOC_ORIG_NRO, p_DESPACHO,
                        p_ENTREGA, p_TRANSPORTISTA, p_TIPO_TRANSPOR, p_MODO_PAGO, p_PLAZO_PAGO, p_FECHAV_PAGO, p_ESTADO_PAGO,
                        p_MONETAR_MONEDA, p_MONETAR_BASE_IMP, p_MONETAR_DESCUENTO, p_MONETAR_ISC, p_MONETAR_SUBTOTAL,
                        p_MONETAR_IGVPOR, p_MONETAR_IGVSOL, p_MONETAR_AJUST, p_MONETAR_PREC_TOTAL, p_MONETAR_DETRACCION, p_MONETAR_PERCEPCION,
                        p_MONETAR_RETENCION, p_MONETAR_PAGAR, p_TRIBUTAC_SUJETODETRA, p_TRIBUTAC_SUJETOPERS, p_TRIBUTAC_SUJETORETEN, p_TRIBUTAC_SOLES, p_TRIBUTAC_CTA_DETRA,
                        p_TRANSPOR_VEHICULO, p_TRANSPOR_CERT_INSCR, p_TRANSPOR_CHOFER,
                        p_TRANSPOR_LICENCIA, p_CONTACTO, p_COMPRADOR, p_PROVEDOR_TIPODOC, p_TRANSPORTISTA_TIPODOC, p_GLOSA_GENERAL, p_INCLU_IGV, p_AUTOGENERADO, p_RESPONSABLE, p_SOCOTI_CODE)

                        If resArray(0).ToString = "OK" Then

                            orde.MODIFICAR_DETALLE_ORDENCOMPRA_REQUE(p_CODIGO.ToString, p_TEX)
                            dt = orde.LISTAR_CABECERA_ORDCOMPRA(p_CODIGO)

                            resb.Append("[")
                            resb.Append("{")
                            resb.Append("""SUCCESS"" :" & """" & resArray(0).ToString & """")
                            resb.Append("}")
                            resb.Append("]")

                        End If
                        res = resb.ToString()
                    End If


                Case "15" 'COMPLETAR DOCUMENTO
                    context.Response.ContentType = "application/json; charset=utf-8"

                    Dim flag As Boolean = False
                    Dim orde As New Nomade.CO.CORegistroCompras("Bn")
                    Dim meail As New Nomade.Mail.NomadeMail("Bn")

                    dt = orde.LISTAR_DEVULVE_CORREO(p_PROVEDOR)
                    If Not (dt Is Nothing) Then
                        If dt.Rows(0)("CORREO") <> "" Then
                            flag = True
                        Else
                            resb.Append("[")
                            resb.Append("{")
                            resb.Append("""NOCORREO"" :" & """NOCORREO""")
                            resb.Append("}")
                            resb.Append("]")
                            res = resb.ToString()
                        End If
                    Else
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""NOCORREO"" :" & """NOCORREO""")
                        resb.Append("}")
                        resb.Append("]")
                        res = resb.ToString()
                    End If

                    If (flag) Then

                        Dim asunto As String = ""
                        resArray = orde.COMPLETAR_ORDEN_COMPRA(p_CODIGO, p_DOC_REGIS, p_DOC_REGIS_NRO, p_CATALOGO, p_ESTABLEC,
                        p_PROVEDOR, p_FECHA_TRANSAC, p_FECHA_EMISION, p_DOC_ORIG, p_DOC_ORIG_NRO, p_DESPACHO,
                        p_ENTREGA, p_TRANSPORTISTA, p_TIPO_TRANSPOR, p_MODO_PAGO, p_PLAZO_PAGO, p_FECHAV_PAGO, p_ESTADO_PAGO,
                        p_MONETAR_MONEDA, p_MONETAR_BASE_IMP, p_MONETAR_DESCUENTO, p_MONETAR_ISC, p_MONETAR_SUBTOTAL,
                        p_MONETAR_IGVPOR, p_MONETAR_IGVSOL, p_MONETAR_AJUST, p_MONETAR_PREC_TOTAL, p_MONETAR_DETRACCION, p_MONETAR_PERCEPCION,
                        p_MONETAR_RETENCION, p_MONETAR_PAGAR, p_TRIBUTAC_SUJETODETRA, p_TRIBUTAC_SUJETOPERS, p_TRIBUTAC_SUJETORETEN, p_TRIBUTAC_SOLES, p_TRIBUTAC_CTA_DETRA,
                        p_TRANSPOR_VEHICULO, p_TRANSPOR_CERT_INSCR, p_TRANSPOR_CHOFER,
                        p_TRANSPOR_LICENCIA, p_CONTACTO, p_COMPRADOR, p_PROVEDOR_TIPODOC, p_TRANSPORTISTA_TIPODOC, p_GLOSA_GENERAL, p_COMPLETO_IND, p_INCLU_IGV, p_AUTOGENERADO, p_RESPONSABLE, p_SOCOTI_CODE)

                        If resArray(1).ToString = "OK" Then

                            If p_CODIGO = "" Then
                                orde.CREAR_DETALLE_ORDENCOMPRA_ADQUISICION_COMPLETAR(resArray(0).ToString, p_TEX)
                                dt = orde.LISTAR_CABECERA_ORDCOMPRA(resArray(0).ToString)
                                exportar2(dt, resArray(0).ToString, resArray(2).ToString)

                                Dim datoAj As String = HttpContext.Current.Server.MapPath("~") & "Archivos\" & resArray(0).ToString & ".pdf"
                                Try

                                    If p_DOC_REGIS = "C" Then
                                        asunto = "ORDEN DE COMPRA" & p_DOC_REGIS_NRO
                                    Else
                                        asunto = "ORDEN DE SERVICIO" & p_DOC_REGIS_NRO
                                    End If

                                    Dim correoComprador As String = ""
                                    correoComprador = dt.Rows(0)("CON_CORREO")
                                    If correoComprador = "" Then
                                        correoComprador = "aux@gmail.com"
                                    End If

                                    meail.enviar(correoComprador, correoComprador, dt.Rows(0)("PROV_CORREO"), asunto, correo, datoAj)
                                    resb.Append("[")
                                    resb.Append("{")
                                    resb.Append("""CODE_PRODUCTO"" :" & """" & resArray(0).ToString & """,")
                                    resb.Append("""CORRELATIVO"" :" & """" & resArray(2).ToString & """,")
                                    resb.Append("""SUCCESS"" :" & """" & resArray(1).ToString & """")
                                    resb.Append("}")
                                    resb.Append("]")

                                Catch ex As Exception
                                    resb.Append("[")
                                    resb.Append("{")
                                    resb.Append("""error"" :" & """error""")
                                    resb.Append("}")
                                    resb.Append("]")
                                End Try
                            Else
                                orde.MODIFICAR_DETALLE_ORDENCOMPRA_REQUE_COMPLETAR(p_CODIGO, p_TEX)
                                dt = orde.LISTAR_CABECERA_ORDCOMPRA(p_CODIGO)
                                exportar2(dt, p_CODIGO, p_CORRELATIVO)

                                Dim datoAj As String = HttpContext.Current.Server.MapPath("~") & "Archivos\" & p_CODIGO & ".pdf"
                                Try

                                    If p_DOC_REGIS = "C" Then
                                        asunto = "ORDEN DE COMPRA" & p_DOC_REGIS_NRO
                                    Else
                                        asunto = "ORDEN DE SERVICIO" & p_DOC_REGIS_NRO
                                    End If

                                    Dim correoComprador As String = ""
                                    Dim resOK As String = "OK"

                                    correoComprador = dt.Rows(0)("CON_CORREO")
                                    If correoComprador = "" Then
                                        correoComprador = "aux@gmail.com"
                                    End If

                                    meail.enviar(correoComprador, correoComprador, dt.Rows(0)("PROV_CORREO"), asunto, correo, datoAj)
                                    resb.Append("[")
                                    resb.Append("{")
                                    resb.Append("""CODE_PRODUCTO"" :" & """" & p_CODIGO & """,")
                                    resb.Append("""CORRELATIVO"" :" & """" & p_CORRELATIVO & """,")
                                    resb.Append("""SUCCESS"" :" & """" & resOK & """")
                                    resb.Append("}")
                                    resb.Append("]")

                                Catch ex As Exception
                                    resb.Append("[")
                                    resb.Append("{")
                                    resb.Append("""error"" :" & """error""")
                                    resb.Append("}")
                                    resb.Append("]")
                                End Try
                            End If



                        End If
                        res = resb.ToString()
                    End If

                Case "16"
                    Dim dtDetalle As DataTable
                    Dim d As New Nomade.CO.CORegistroCompras("Bn")
                    dtDetalle = d.LISTAR_DETALLE_ORDCOMPRA(P_CODIGOCAB)
                    GenerarTablaPro2(dtDetalle)

                Case "CT"
                    Dim orde As New Nomade.CO.CORegistroCompras("Bn")
                    dt = orde.listar_cotizacion(p_CATALOGO, P_SUCURSAL, P_TIPO_COTI)
                    If Not dt Is Nothing Then
                        resb.Append("[")

                        For Each row As DataRow In dt.Rows
                            If row("ESTADO_ATENDIDO").ToString = "0" Then
                                resb.Append("{")
                                resb.Append("""CATALOGO"":""" & row("CATALOGO").ToString & """,")
                                resb.Append("""SUCURSAL"":""" & row("SUCURSAL").ToString & """,")
                                resb.Append("""NUMERO"":""" & row("NUMERO").ToString & """,")
                                resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                                resb.Append("""FECHA"":""" & row("FECHA").ToString & """,")
                                resb.Append("""USUARIO"":""" & row("USUARIO").ToString & """,")
                                resb.Append("""ESTADO_ATENDIDO"":""" & row("ESTADO_ATENDIDO").ToString & """,")
                                resb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """")
                                resb.Append("},")
                            End If
                        Next
                        resb.Append("-")
                        resb.Replace("},-", "}")
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "CTD"
                    Dim orde As New Nomade.CO.CORegistroCompras("Bn")
                    dt = orde.listar_cotizacion_detalle(P_CODE)
                    If Not dt Is Nothing Then
                        resb.Append("[")

                        For Each row As DataRow In dt.Rows
                            If row("ATENDIDO").ToString = "0" Then
                                resb.Append("{")
                                resb.Append("""CODE_COTI"":""" & row("CODE_COTI").ToString & """,")
                                resb.Append("""CODE_PRODUCTO"":""" & row("CODE_PRODUCTO").ToString & """,")
                                resb.Append("""PRODUCTO"":""" & row("PRODUCTO").ToString & """,")
                                resb.Append("""CODE_UNIDAD"":""" & row("CODE_UNIDAD").ToString & """,")
                                resb.Append("""CANTIDAD"":""" & row("CANTIDAD").ToString & """,")
                                resb.Append("""UNIDMEDIDAD"":""" & row("UNIDMEDIDAD").ToString & """,")
                                resb.Append("""DETRACCION"":""" & row("DETRACCION").ToString & """,")
                                resb.Append("""ATENDIDO"":""" & row("ATENDIDO").ToString & """")

                                resb.Append("},")
                            End If
                        Next
                        resb.Append("-")
                        resb.Replace("},-", "}")
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "correo"
                    Dim meail As New Nomade.Mail.NomadeMail("Bn")
                    Dim datoAj As String = HttpContext.Current.Server.MapPath("~") & "Archivos\" & p_code_orden & ".pdf"
                    ' CAMBIAR EL NREMITENTE POR EL NOMBRE DEL USUARIO
                    meail.enviar(NREMITENTE, NREMITENTE, DESTINATARIOS, asunto, MENSAJE, datoAj)

                Case "FECHAX"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim fechaEmision As String() = context.Request("FECHA_EMISION").Split("/")
                    Dim ISC As String = context.Request("ISC")
                    If fechaEmision.Length = 3 Then
                        Dim nuevaFecha As Date = New Date(Integer.Parse(fechaEmision(2)), Integer.Parse(fechaEmision(1)), Integer.Parse(fechaEmision(0))).AddDays(Double.Parse(ISC))
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""FECHANUEVA"" :" & """" & nuevaFecha.ToShortDateString() & """")
                        resb.Append("}")
                        resb.Append("]")
                        res = resb.ToString()
                    End If
                Case "20"

                    Dim dtDetalle As DataTable
                    Dim d As New Nomade.CO.CORegistroCompras("Bn")
                    dtDetalle = d.LISTAR_CABECERA_ORDCOMPRA(P_CODIGOCAB)

                    Try
                        If Not dtDetalle Is Nothing Then
                            res = d.Cancelar_Orden_compra(P_CODIGOCAB, p_DETALLE_ORD)


                            If dtDetalle(0)("MODO_PAGO_CODIGO").ToString.Equals("0013") And res <> "" And res <> "E" Then

                                res = d.Cancelar_deuda_Orden_compra(P_CODIGOCAB)
                            End If
                        Else
                            res = "E"
                        End If


                    Catch ex As Exception
                        res = "E"
                    End Try


            End Select

            context.Response.Write(res)

        Catch ex As Exception

            context.Response.Write("error" & ex.ToString)

        End Try
    End Sub

    Public Function GenerarTablaPro2(ByVal dt As DataTable) As String

        If Not dt Is Nothing Then
            res = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"
            res += "<thead>"
            res += "<tr align=""center"">"

            res += "<th>CODIGO</th>"
            res += "<th>DES. PRODUCTO</</th>"
            res += "<th>UNIDAD  MEDIDA</th>"
            res += "<th>CANTIDAD</th>"
            res += "<th>PREC. UNITARIO</th>"
            res += "<th>IMPORTE</th>"
            res += "<th>GLOSA</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1

                res += "<tr >"
                res += "<td align='center'>" & dt.Rows(i)("CODIGOPRO").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("PRODUCTO").ToString() & "</td>"
                res += "<td align='center' >" & dt.Rows(i)("UNIDAD").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("CANTIDAD").ToString() & "</td>"
                res += "<td align='center' >" & dt.Rows(i)("PREC_UNIT").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("IMPORTE").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("GLOSA").ToString() & "</td>"

                res += "</tr>"



            Next
            res += "</tbody>"


            res += "</table>"
        Else
            GenerarTablaProSinDatos()
        End If
        Return res
    End Function
    Public Function GenerarTablaProSinDatos() As String

        res = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"
        res += "<thead>"
        res += "<tr align=""center"">"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "</tr>"
        res += "</thead>"
        res += "<tbody>"

        res += "<tr >"
        res += "<td align='center'> </td>"
        res += "<td ></td>"
        res += "<td align='center'></td>"
        res += "<td align='center' >NO HAY DATOS DISPONIBLES</td>"
        res += "<td align='center'></td>"
        res += "<td align='center'></td>"
        res += "</tr>"

        res += "</tbody>"
        res += "</table>"

        Return res
    End Function
    Public Function exportar2(ByVal dt As DataTable, ByVal CODIGO As String, ByVal CORRELATIVO As String) As String
        Dim ress As String

        Dim htmlText As New StringBuilder
        Dim cNomArch As String = CODIGO & ".pdf"
        htmlText = getHtmlTextPDF(dt, CODIGO, CORRELATIVO)
        correo = Convert.ToString(htmlText)
        HTMLToPDF(htmlText, cNomArch)
        Return ress
    End Function

    Function imgC(ByVal Archivo As String, ByVal imgs As String, ByVal imginf As String) As String

        Dim WatermarkLocation As String = HttpContext.Current.Server.MapPath("~") & imgs
        Dim WatermarkLocationI As String = HttpContext.Current.Server.MapPath("~") & imginf
        Dim FileLocation As String = HttpContext.Current.Server.MapPath("~") & "Archivos\" & Archivo
        Dim filePath As String = HttpContext.Current.Server.MapPath("~") & "Archivos\ArchivosAux\" & Archivo
        Dim pdfReader As PdfReader = New PdfReader(FileLocation)
        Dim stamp As PdfStamper = New PdfStamper(pdfReader, New FileStream(filePath, FileMode.Create))

        Dim img As iTextSharp.text.Image = iTextSharp.text.Image.GetInstance(WatermarkLocation)

        img.ScaleAbsoluteWidth(251)
        img.ScaleAbsoluteHeight(50)
        img.SetAbsolutePosition(28, 775)

        Dim imgIn As iTextSharp.text.Image = iTextSharp.text.Image.GetInstance(WatermarkLocationI)
        imgIn.ScaleAbsoluteWidth(597)
        imgIn.ScaleAbsoluteHeight(23)

        imgIn.Alignment = iTextSharp.text.Image.UNDERLYING
        imgIn.SetAbsolutePosition(0, 0)

        Dim waterMark As PdfContentByte
        For page As Integer = 1 To pdfReader.NumberOfPages
            waterMark = stamp.GetOverContent(page)
            waterMark.AddImage(img)
            waterMark.AddImage(imgIn)
        Next

        stamp.FormFlattening = True
        stamp.Close()
        pdfReader.Close()

        My.Computer.FileSystem.DeleteFile(FileLocation)
        My.Computer.FileSystem.MoveFile(filePath, FileLocation)
        Return "ok"

    End Function

    Sub HTMLToPDF(ByVal HTML As StringBuilder, ByVal FilePath As String)

        Dim dtF As DataTable
        Dim p As New Nomade.NC.NCImagenDNIPersona("Bn")
        dtF = p.ListarImagenFirma(p_RESPONSABLE, "1")

        Dim archivo, res As String
        res = "Archivos\" + FilePath
        archivo = HttpContext.Current.Server.MapPath("~") + res
        If My.Computer.FileSystem.FileExists(archivo) Then
            My.Computer.FileSystem.DeleteFile(archivo)
        End If


        'Dim img As String
        'img = imagen.Replace("../../", String.Empty)
        Dim document As Document '= New Document(PageSize.A4, 20, 20, 20, 20)
        document = New Document(PageSize.A4, 25, 25, 55, 65)
        PdfWriter.GetInstance(document, New FileStream(archivo, FileMode.Create))
        document.Open()

        Dim imgFirma As String
        If Not dtF Is Nothing Then
            imgFirma = Replace(dtF.Rows(0)("FIRMA").ToString(), "../../../", String.Empty)
            If Not My.Computer.FileSystem.FileExists(HttpContext.Current.Server.MapPath("~") & imgFirma) Then
                imgFirma = "\recursos\img\SIN_IMAGEN.png"
            End If
        Else
            imgFirma = "\recursos\img\SIN_IMAGEN.png"
        End If

        Dim pdfImagef As Image
        pdfImagef = Image.GetInstance(HttpContext.Current.Server.MapPath("~") & imgFirma)
        pdfImagef.Alignment = iTextSharp.text.Image.UNDERLYING
        pdfImagef.ScaleAbsoluteWidth(90)
        pdfImagef.ScaleAbsoluteHeight(90)
        pdfImagef.SetAbsolutePosition(50, 195)

        document.Add(pdfImagef)

        '------------------------------------------------------------------------------------------
        Dim USU As New Nomade.NS.NSUsuario("Bn")
        Dim dtUsu, dtImUsu As DataTable
        dtUsu = USU.DevuelveDatosUsuario(p_COMPRADOR)
        dtImUsu = p.ListarImagenFirma(dtUsu.Rows(0)("PIDM").ToString(), "1")


        Dim imgFirmaUsu As String
        If Not dtImUsu Is Nothing Then
            imgFirmaUsu = Replace(dtImUsu.Rows(0)("FIRMA").ToString(), "../../../", String.Empty)
            If Not My.Computer.FileSystem.FileExists(HttpContext.Current.Server.MapPath("~") & imgFirmaUsu) Then
                imgFirmaUsu = "\recursos\img\SIN_IMAGEN.png"
            End If
        Else
            imgFirmaUsu = "\recursos\img\SIN_IMAGEN.png"
        End If

        Dim pdfImageUsu As Image
        pdfImageUsu = Image.GetInstance(HttpContext.Current.Server.MapPath("~") & imgFirmaUsu)
        'pdfImageUsu.Alignment = iTextSharp.text.Image.UNDERLYING
        pdfImageUsu.ScaleAbsoluteWidth(90)
        pdfImageUsu.ScaleAbsoluteHeight(90)
        pdfImageUsu.SetAbsolutePosition(250, 195)

        document.Add(pdfImageUsu)

        '---------------------------------------------------------------------------------------------------------
        Dim nc As New Nomade.NC.NCEmpresa("Bn")
        Dim dtEmpre As DataTable
        dtEmpre = nc.ListarEmpresa(p_CATALOGO, "", "")

        Dim imgS, imgI As String

        Dim imgSuperior As String = dtEmpre.Rows(0)("IMG_SUPERIOR").ToString()
        imgS = imgSuperior.Replace("../../../", String.Empty)
        If Not My.Computer.FileSystem.FileExists(HttpContext.Current.Server.MapPath("~") & imgS) Then
            imgS = "\recursos\img\SIN_IMAGEN.png"
        End If

        Dim imgInferior As String = dtEmpre.Rows(0)("IMG_INFERIOR").ToString()
        imgI = imgInferior.Replace("../../../", String.Empty)
        If Not My.Computer.FileSystem.FileExists(HttpContext.Current.Server.MapPath("~") & imgI) Then
            imgI = "\recursos\img\SIN_IMAGEN.png"
        End If

        Dim abc As StringReader = New StringReader(HTML.ToString)
        Dim styles As iTextSharp.text.html.simpleparser.StyleSheet = New iTextSharp.text.html.simpleparser.StyleSheet()
        styles.LoadStyle("border", "border-bottom", "2px")

        Dim hw As iTextSharp.text.html.simpleparser.HTMLWorker = New iTextSharp.text.html.simpleparser.HTMLWorker(document)
        hw.Parse(New StringReader(HTML.ToString))
        document.Close()

        imgC(FilePath, imgS, imgI)
    End Sub
    '#9FC69E
    Function getHtmlTextPDF(ByVal dt As DataTable, ByVal codigo As String, ByVal correlativo As String) As StringBuilder

        Dim htmlText As New StringBuilder
        htmlText.Length = 0
        imagen = dt.Rows(0)("img").ToString()
        htmlText.Append(" <br>  " & vbCrLf)

        If (dt.Rows(0)("TIPODOC").ToString() = "C") Then

            htmlText.Append("<table width='100%'   border='0' font size=8pt>  " & vbCrLf)
            htmlText.Append("            <tr>  " & vbCrLf)
            htmlText.Append("                <td align='center' width='100%'valign='bottom'>  " & vbCrLf)
            htmlText.Append("                    <b> ORDEN DE COMPRA  " + correlativo + "</b> " & vbCrLf)
            htmlText.Append("                </td>  " & vbCrLf)
            htmlText.Append("            </tr>  " & vbCrLf)
            htmlText.Append(" </table>  " & vbCrLf)
        Else
            htmlText.Append("<table width='100%'   border='0' font size=8pt>  " & vbCrLf)
            htmlText.Append("            <tr>  " & vbCrLf)
            htmlText.Append("                <td align='center' width='100%'valign='bottom'>  " & vbCrLf)
            htmlText.Append("                    <b> ORDEN DE SERVICIO " + correlativo + " </b> " & vbCrLf)
            htmlText.Append("                </td>  " & vbCrLf)
            htmlText.Append("            </tr>  " & vbCrLf)
            htmlText.Append(" </table>  " & vbCrLf)
        End If


        htmlText.Append(" <br>  " & vbCrLf)

        htmlText.Append("<table width='100%'   border='0' font size=8pt>  " & vbCrLf)
        htmlText.Append("            <tr>  " & vbCrLf)
        htmlText.Append("                <td width='50%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b> FECHA DE TRANSACCION </b>" + dt.Rows(0)("FECHA_TRANS").ToString() & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='50%'d  align='right' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b>  </b> " + vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("            </tr>  " & vbCrLf)
        htmlText.Append("            <tr>  " & vbCrLf)
        htmlText.Append("                <td width='50%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     <b>  </b>" + dt.Rows(0)("DESPACHO").ToString() & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='50%'d  align='right' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("            </tr>  " & vbCrLf)

        htmlText.Append(" </table>  " & vbCrLf)

        htmlText.Append(" <br>  " & vbCrLf)

        htmlText.Append("<table width='100%'   font size=8pt>  " & vbCrLf)
        htmlText.Append("            <tr>  " & vbCrLf)
        htmlText.Append("                <td  width='100%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b> DATOS DE FACTURACION: </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("            </tr>  " & vbCrLf)
        htmlText.Append(" </table>  " & vbCrLf)

        htmlText.Append("<table width='100%'   font size=8pt>  " & vbCrLf)
        htmlText.Append("            <tr>  " & vbCrLf)

        htmlText.Append("                <td width='25%'  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b> EMPRESA </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='45%' align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " + dt.Rows(0)("EMPRESA_DES").ToString() + "" & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)


        htmlText.Append("                <td width='15%' align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     RUC" & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='15%'  align='center' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " + dt.Rows(0)("EMPRESA_RUC").ToString() + "" & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("            </tr>  " & vbCrLf)

        htmlText.Append("            <tr>  " & vbCrLf)

        htmlText.Append("                <td width='25%'  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b> DIRECCION </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='45%' align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " + dt.Rows(0)("EMPRESA_DIREC").ToString() & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)


        htmlText.Append("                <td width='15%' align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='15%'  align='center' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("            </tr>  " & vbCrLf)

        htmlText.Append("            <tr>  " & vbCrLf)

        htmlText.Append("                <td width='25%'  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b> COMPRADOR </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='45%' align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " + dt.Rows(0)("COMPRADOR").ToString() & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)


        htmlText.Append("                <td width='15%' align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='15%'  align='center' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("            </tr>  " & vbCrLf)


        htmlText.Append("            <tr>  " & vbCrLf)

        htmlText.Append("                <td width='25%'  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b> FORMA DE PAGO </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='45%' align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " + dt.Rows(0)("MODO_PAGO").ToString() & " " & dt.Rows(0)("PLAZO_PAGO").ToString() & " Dias" & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)


        htmlText.Append("                <td width='15%' align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='15%'  align='center' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("            </tr>  " & vbCrLf)


        htmlText.Append("            <tr>  " & vbCrLf)

        htmlText.Append("                <td width='25%'  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b> ENTREGAR A </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='45%' align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " + dt.Rows(0)("ENTREGAR").ToString() & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)


        htmlText.Append("                <td width='15%' align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='15%'  align='center' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("            </tr>  " & vbCrLf)


        htmlText.Append("            <tr>  " & vbCrLf)

        htmlText.Append("                <td width='25%'  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b>FECHA DE ENTREGA  </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='45%' align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " + dt.Rows(0)("FECHA_ENTREGA").ToString() & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)


        htmlText.Append("                <td width='15%' align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='15%'  align='center' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("            </tr>  " & vbCrLf)

        htmlText.Append(" </table>  " & vbCrLf)

        htmlText.Append(" <br>  " & vbCrLf)


        htmlText.Append("<table width='100%'   font size=8pt>  " & vbCrLf)
        htmlText.Append("            <tr>  " & vbCrLf)
        htmlText.Append("                <td  width='100%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b> DATOS DEL PROVEEDOR: </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("            </tr>  " & vbCrLf)
        htmlText.Append(" </table>  " & vbCrLf)

        htmlText.Append("<table width='100%'  font size=8pt>  " & vbCrLf)
        htmlText.Append("            <tr>  " & vbCrLf)

        htmlText.Append("                <td width='25%'  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b> EMPRESA </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='45%' align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " + dt.Rows(0)("P_NOMBRE").ToString() & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)


        htmlText.Append("                <td width='15%' align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " + dt.Rows(0)("P_TIPO_DOC").ToString() & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='15%'  align='center' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " + dt.Rows(0)("P_NUMERO").ToString() + "" & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("            </tr>  " & vbCrLf)

        htmlText.Append("            <tr>  " & vbCrLf)

        htmlText.Append("                <td width='25%'  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b> DIRECCION </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='45%' align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " + dt.Rows(0)("P_DIRECCION").ToString() + "" & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)


        htmlText.Append("                <td width='15%' align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='15%'  align='center' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("            </tr>  " & vbCrLf)

        htmlText.Append("            <tr>  " & vbCrLf)

        htmlText.Append("                <td width='25%'  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b> CONTACTO </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='45%' align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " + dt.Rows(0)("CONTACTO").ToString() & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)


        htmlText.Append("                <td width='15%' align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='15%'  align='center' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("            </tr>  " & vbCrLf)


        htmlText.Append("            <tr>  " & vbCrLf)
        htmlText.Append("                <td width='25%'  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b> TELEFONO</b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='45%' align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " + dt.Rows(0)("P_TELEFONO").ToString() & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='15%' align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='15%'  align='center' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("            </tr>  " & vbCrLf)


        htmlText.Append(" </table>  " & vbCrLf)

        htmlText.Append(" <br>  " & vbCrLf)
        If (dt.Rows(0)("TIPODOC").ToString() = "C") Then

            If (dt.Rows(0)("TIPOTRANS").ToString() = "PRO") Then

                htmlText.Append("<table width='100%'  font size=8pt>  " & vbCrLf)
                htmlText.Append("            <tr>  " & vbCrLf)
                htmlText.Append("                <td  width='25%'d  align='left' valign='bottom'>  " & vbCrLf)
                htmlText.Append("                    <b> TRANSPORTE: </b> " & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)

                htmlText.Append("                <td  width='75%'d  align='left' valign='bottom'>  " & vbCrLf)
                htmlText.Append("                     <b>PROVEEDOR</b>" & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)
                htmlText.Append("            </tr>  " & vbCrLf)
                htmlText.Append(" </table>  " & vbCrLf)
            Else


                If (dt.Rows(0)("TIPOTRANS").ToString() = "PUB") Then

                    htmlText.Append("<table width='100%'  font size=8pt>  " & vbCrLf)
                    htmlText.Append("            <tr>  " & vbCrLf)
                    htmlText.Append("                <td  width='25%'d  align='left' valign='bottom'>  " & vbCrLf)
                    htmlText.Append("                    <b> TRANSPORTE: </b> " & vbCrLf)
                    htmlText.Append("                </td>  " & vbCrLf)

                    htmlText.Append("                <td  width='75%'d  align='left' valign='bottom'>  " & vbCrLf)
                    htmlText.Append("                     <b>PUBLICO</b>" & vbCrLf)
                    htmlText.Append("                </td>  " & vbCrLf)
                    htmlText.Append("            </tr>  " & vbCrLf)
                    htmlText.Append(" </table>  " & vbCrLf)
                End If

                If (dt.Rows(0)("TIPOTRANS").ToString() = "PRI") Then

                    htmlText.Append("<table width='100%'  font size=8pt>  " & vbCrLf)
                    htmlText.Append("            <tr>  " & vbCrLf)
                    htmlText.Append("                <td  width='25%'d  align='left' valign='bottom'>  " & vbCrLf)
                    htmlText.Append("                    <b> TRANSPORTE: </b> " & vbCrLf)
                    htmlText.Append("                </td>  " & vbCrLf)

                    htmlText.Append("                <td  width='75%'d  align='left' valign='bottom'>  " & vbCrLf)
                    htmlText.Append("                     <b>INTERNO</b>" & vbCrLf)
                    htmlText.Append("                </td>  " & vbCrLf)
                    htmlText.Append("            </tr>  " & vbCrLf)
                    htmlText.Append(" </table>  " & vbCrLf)
                End If


                htmlText.Append("<table width='100%' font size=8pt>  " & vbCrLf)
                htmlText.Append("            <tr>  " & vbCrLf)

                htmlText.Append("                <td width='25%'  align='left' valign='bottom'>  " & vbCrLf)
                htmlText.Append("                    <b> FECHA ENTREGA </b> " & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)

                htmlText.Append("                <td width='45%' align='left' valign='bottom'>  " & vbCrLf)
                htmlText.Append("                     " + dt.Rows(0)("FECHA_ENTREGA").ToString() & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)


                htmlText.Append("                <td width='15%' align='left' valign='bottom'>  " & vbCrLf)
                htmlText.Append("                     " & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)

                htmlText.Append("                <td width='15%'  align='center' valign='bottom'>  " & vbCrLf)
                htmlText.Append("                     " & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)

                htmlText.Append("            </tr>  " & vbCrLf)

                htmlText.Append("            <tr>  " & vbCrLf)

                htmlText.Append("                <td width='25%'  align='left' valign='bottom'>  " & vbCrLf)
                htmlText.Append("                    <b> EMPRESA </b> " & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)

                htmlText.Append("                <td width='45%' align='left' valign='bottom'>  " & vbCrLf)
                htmlText.Append("                     " + dt.Rows(0)("T_NOMBRE").ToString() & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)


                htmlText.Append("                <td width='15%' align='left' valign='bottom'>  " & vbCrLf)
                htmlText.Append("                     " + dt.Rows(0)("T_TIPO_DOC").ToString() & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)

                htmlText.Append("                <td width='15%'  align='center' valign='bottom'>  " & vbCrLf)
                htmlText.Append("                     " + dt.Rows(0)("T_NUMERO").ToString() & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)

                htmlText.Append("            </tr>  " & vbCrLf)

                htmlText.Append(" </table>  " & vbCrLf)

            End If

        End If

        htmlText.Append(" <br>  " & vbCrLf)

        Dim dtDetalle As DataTable
        Dim d As New Nomade.CO.CORegistroCompras("Bn")
        dtDetalle = d.LISTAR_DETALLE_ORDCOMPRA(codigo)

        htmlText.Append("<table width='100%' border='1'  font size=8pt>  " & vbCrLf)
        htmlText.Append("            <tr >  " & vbCrLf)
        htmlText.Append("                <td width='10%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b> CODIGO </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='35%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b> PRODUCTO </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='20%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b> UNIDAD </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='10%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b> CANTIDAD </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='15%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b> PREC. UNITARIO </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='10%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b> IMPORTE </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("            </tr>  " & vbCrLf)

        If Not dtDetalle Is Nothing Then
            For i As Integer = 0 To dtDetalle.Rows.Count - 1

                Dim PRECIO_UNI, IMPORTE, DES_MONE As String

                If dtDetalle.Rows(i)("MONEDA").ToString() = "0002" Then
                    PRECIO_UNI = dtDetalle.Rows(i)("PREC_UNIT").ToString()
                    IMPORTE = dtDetalle.Rows(i)("IMPORTE").ToString()
                    DES_MONE = "SOLES"
                Else
                    PRECIO_UNI = dtDetalle.Rows(i)("PRECIO_UNIT_ALT").ToString()
                    IMPORTE = dtDetalle.Rows(i)("IMPORTE_ALT").ToString()
                    DES_MONE = "DOLARES"
                End If


                htmlText.Append("            <tr>  " & vbCrLf)
                htmlText.Append("                <td width='10%'d  align='left' valign='bottom'>  " & vbCrLf)
                htmlText.Append("                     " + dtDetalle.Rows(i)("CODIGOPRO").ToString() & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)
                htmlText.Append("                <td width='35%'d  align='left' valign='bottom'>  " & vbCrLf)
                htmlText.Append("                    " + dtDetalle.Rows(i)("PRODUCTO").ToString() & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)
                htmlText.Append("                <td width='20%'d  align='left' valign='bottom'>  " & vbCrLf)
                htmlText.Append("                    " + dtDetalle.Rows(i)("UNIDAD").ToString() & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)
                htmlText.Append("                <td width='10%'d  align='left' valign='bottom'>  " & vbCrLf)
                htmlText.Append("                     " + dtDetalle.Rows(i)("CANTIDAD").ToString() & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)
                htmlText.Append("                <td width='15%'d  align='left' valign='bottom'>  " & vbCrLf)
                htmlText.Append("                    " + dt.Rows(0)("M_SIMBOLOMONEDA").ToString() & " " & PRECIO_UNI & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)
                htmlText.Append("                <td width='10%'d  align='left' valign='bottom'>  " & vbCrLf)
                htmlText.Append("                    " + dt.Rows(0)("M_SIMBOLOMONEDA").ToString() & " " & IMPORTE & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)

                htmlText.Append("            </tr>  " & vbCrLf)
            Next
        End If
        htmlText.Append(" </table>  " & vbCrLf)
        htmlText.Append(" <br>  " & vbCrLf)

        Dim l As New Nomade.NB.Numalet(False, "00/100 $.", "con", True)
        Dim importeTexto, igv As String
        importeTexto = (l.ToCustomCardinal(Convert.ToDecimal(dt.Rows(0)("PAGAR").ToString()))).ToUpper()

        Dim moneda As String = ""
        igv = ""
        If dt.Rows(0)("M_TIPOMONEDA").ToString() = "0002" Then
            moneda = "Soles"
        Else
            moneda = "Dolares"

        End If

        If dt.Rows(0)("PRECIOS_INC_IGV").ToString() = "S" Then
            igv = "* Precios de items Incluyen IGV"
        Else
            igv = "* Precios de items No Incluyen IGV"
        End If


        htmlText.Append("<table width='100%'   border='0' font size=8pt>  " & vbCrLf)

        htmlText.Append("            <tr>  " & vbCrLf)
        htmlText.Append("                <td width='10%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b>  </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='35%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b>  </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='20%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b>  </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='10%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b>  </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='15%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b> SUBTOTAL </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='10%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    " + dt.Rows(0)("M_SIMBOLOMONEDA").ToString() & " " & dt.Rows(0)("SUBTOTAL").ToString() & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("            </tr>  " & vbCrLf)

        htmlText.Append("            <tr>  " & vbCrLf)
        htmlText.Append("                <td width='10%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b>  </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td colspan='3' width='65%'  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b> Son: " + importeTexto.Replace("-", " " + moneda) & " " & moneda + "</b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        'htmlText.Append("                <td width='10%'d  align='left' valign='bottom'>  " & vbCrLf)
        'htmlText.Append("                    <b>  </b> " & vbCrLf)
        'htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='15%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b> IGV </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='10%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    " + dt.Rows(0)("M_SIMBOLOMONEDA").ToString() & " " & dt.Rows(0)("IGVSOLES").ToString() & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("            </tr>  " & vbCrLf)



        htmlText.Append("            <tr>  " & vbCrLf)
        htmlText.Append("                <td width='10%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b>  </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td colspan='3' width='65%'  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b> " + igv + " </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        'htmlText.Append("                <td width='20%'d  align='left' valign='bottom'>  " & vbCrLf)
        'htmlText.Append("                    <b>  </b> " & vbCrLf)
        'htmlText.Append("                </td>  " & vbCrLf)
        'htmlText.Append("                <td width='10%'d  align='left' valign='bottom'>  " & vbCrLf)
        'htmlText.Append("                    <b>  </b> " & vbCrLf)
        'htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='15%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b> PREC. TOTAL </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='10%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    " + dt.Rows(0)("M_SIMBOLOMONEDA").ToString() & " " & dt.Rows(0)("TOTAL").ToString() & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("            </tr>  " & vbCrLf)


        htmlText.Append("            <tr>  " & vbCrLf)
        htmlText.Append("                <td width='10%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b>  </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='35%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b>  </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='20%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b>  </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='10%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b>  </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='15%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b> DETRACCION </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='10%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    " + dt.Rows(0)("M_SIMBOLOMONEDA").ToString() & " " & dt.Rows(0)("DETRACCION").ToString() & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("            </tr>  " & vbCrLf)

        htmlText.Append("            <tr>  " & vbCrLf)
        htmlText.Append("                <td width='10%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b>  </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='35%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b>  </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='20%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b>  </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='10%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b>  </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='15%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b> PERCCECION </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='10%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    " + dt.Rows(0)("M_SIMBOLOMONEDA").ToString() & " " & dt.Rows(0)("PERCCECION").ToString() & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("            </tr>  " & vbCrLf)


        htmlText.Append("            <tr>  " & vbCrLf)
        htmlText.Append("                <td width='10%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b>  </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='35%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b>  </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='20%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b>  </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='10%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b>  </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='15%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b> RETENCION </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='10%'d  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    " + dt.Rows(0)("M_SIMBOLOMONEDA").ToString() & " " & dt.Rows(0)("RETENCION").ToString() & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("            </tr>  " & vbCrLf)



        htmlText.Append("            <tr>  " & vbCrLf)
        htmlText.Append("                <td width='10%'  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b>  </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='35%'  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b>  </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='20%' align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b>  </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='10%'  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b>  </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='15%' align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b> TOTAL </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td width='10%' align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    " + dt.Rows(0)("M_SIMBOLOMONEDA").ToString() & " " & dt.Rows(0)("PAGAR").ToString() & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("            </tr>  " & vbCrLf)


        htmlText.Append(" </table>  " & vbCrLf)


        htmlText.Append("<table width='100%'  font size=8pt>  " & vbCrLf)
        htmlText.Append("            <tr>  " & vbCrLf)
        htmlText.Append("                <td  width='8%' align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b> Glosa: </b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)

        htmlText.Append("                <td  width='92%'  align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                     " + dt.Rows(0)("GLOSA_GENERAL").ToString() & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("            </tr>  " & vbCrLf)
        htmlText.Append(" </table>  " & vbCrLf)


        'Dim l As New Nomade.NB.Numalet(False, "00/100 $.", "con", True)
        'Dim importeTexto As String
        'importeTexto = (l.ToCustomCardinal(dtCabecera.Rows(0)("IMPORTE"))).ToUpper()
        'tabla.AppendFormat("<td colspan='4'>SON: {0}</td>", importeTexto.Replace("-", "(" + mon + ")"))

        Return htmlText
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

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property
End Class