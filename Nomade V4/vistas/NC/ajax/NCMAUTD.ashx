<%@ WebHandler Language="VB" Class="NCMAUTD" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMAUTD : Implements IHttpHandler

    Dim OPCION As String

    Dim P_CTLG_CODE, P_CAJA_CODE, P_PIDM_VENDEDOR, P_ALMACEN_CODE As String

    Dim P_CODE As String

    Dim P_EMISION, P_SCSL_CODE, P_TIPO_DOC, P_AUTORIZACION, P_CORRELATIVO,
        P_TIPO_CAMPO, P_NRO_DIGITOS, P_NRO_LINEAS, P_SERIE,
        P_INI, P_FIN, P_FORMATO, P_ESTADO, P_IMPRENTA, P_ESTADO_IND,
        P_USUA_ID, NICA_CODE, P_IMPR_CODE, P_FORMATO_TICKET_IND As String

    Dim aut As New Nomade.NC.NCAutorizacionDocumento("BN")

    Dim dt As DataTable

    Dim res As String
    Dim resb As New StringBuilder

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")
        P_CTLG_CODE = context.Request("P_CTLG_CODE")
        P_CAJA_CODE = context.Request("P_CAJA_CODE")
        P_PIDM_VENDEDOR = context.Request("P_PIDM_VENDEDOR")
        P_ALMACEN_CODE = context.Request("P_ALMACEN_CODE")

        P_CODE = context.Request("P_CODE")

        P_EMISION = context.Request("P_EMISION")
        P_EMISION = Utilities.fechaLocal(P_EMISION)
        P_SCSL_CODE = context.Request("P_SCSL_CODE")
        P_TIPO_DOC = context.Request("P_TIPO_DOC")
        P_AUTORIZACION = context.Request("P_AUTORIZACION")
        P_CORRELATIVO = context.Request("P_CORRELATIVO")
        P_TIPO_CAMPO = context.Request("P_TIPO_CAMPO")
        P_NRO_DIGITOS = context.Request("P_NRO_DIGITOS")
        P_NRO_LINEAS = context.Request("P_NRO_LINEAS")
        P_SERIE = context.Request("P_SERIE")
        P_INI = context.Request("P_INI")
        P_FIN = IIf(context.Request("P_FIN") = "", Nothing, context.Request("P_FIN"))
        P_FORMATO = context.Request("P_FORMATO")
        P_ESTADO = context.Request("P_ESTADO")
        P_IMPRENTA = IIf(context.Request("P_IMPRENTA") = "", Nothing, context.Request("P_IMPRENTA"))
        P_ESTADO_IND = context.Request("P_ESTADO_IND")
        P_USUA_ID = context.Request("P_USUA_ID")

        NICA_CODE = context.Request("NICA_CODE")
        P_IMPR_CODE = IIf(context.Request("P_IMPR_CODE") = "", Nothing, context.Request("P_IMPR_CODE"))
        P_FORMATO_TICKET_IND = context.Request("P_FORMATO_TICKET_IND")

        Select Case OPCION
            Case "L"
                Dim dcct As New Nomade.NC.NCTipoDCEmpresa("BN")
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = aut.ListarAutorizacion(IIf(P_CODE Is Nothing, "", P_CODE), String.Empty, IIf(P_CTLG_CODE Is Nothing, "", P_CTLG_CODE), IIf(P_SCSL_CODE Is Nothing, "", P_SCSL_CODE), IIf(P_TIPO_DOC Is Nothing, "", P_TIPO_DOC))
                resb.Append("[")
                If Not (dt Is Nothing) Then
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                        resb.Append("""EMISION"":""" & row("EMISION").ToString & """,")
                        resb.Append("""CTLG_CODE"":""" & row("CTLG_CODE").ToString & """,")
                        resb.Append("""CTLG"":""" & row("CTLG").ToString & """,")
                        resb.Append("""SCSL_CODE"":""" & row("SCSL_CODE").ToString & """,")
                        resb.Append("""SCSL"":""" & row("SCSL").ToString & """,")
                        resb.Append("""TIPO_DOC_CODE"":""" & row("TIPO_DOC_CODE").ToString & """,")
                        resb.Append("""TIPO_DOC"":""" & row("TIPO_DOC").ToString & """,")
                        resb.Append("""NRO_AUTORIZACION"":""" & row("NRO_AUTORIZACION").ToString & """,")
                        resb.Append("""CORRELATIVO"":""" & row("CORRELATIVO").ToString & """,")
                        resb.Append("""CORRELATIVO_DESC"":""" & IIf(row("CORRELATIVO").ToString = "S", "SUCURSAL", IIf(row("CORRELATIVO").ToString = "C", "CAJA", "VENDEDOR")) & """,")
                        resb.Append("""CAJA_CODE"":""" & row("CAJA_CODE").ToString & """,")
                        resb.Append("""PIDM_VENDEDOR"":""" & row("PIDM_VENDEDOR").ToString & """,")
                        resb.Append("""ALMACEN_CODE"":""" & row("ALMACEN_CODE").ToString & """,")
                        resb.Append("""TIPO_CAMPO"":""" & row("TIPO_CAMPO").ToString & """,")
                        resb.Append("""NRO_DIGITOS"":""" & row("NRO_DIGITOS").ToString & """,")
                        resb.Append("""NRO_LINEAS"":""" & row("NRO_LINEAS").ToString & """,")
                        resb.Append("""SERIE"":""" & row("SERIE").ToString & """,")
                        resb.Append("""VALOR_INICIO"":""" & row("VALOR_INICIO").ToString & """,")
                        resb.Append("""VALOR_FIN"":""" & row("VALOR_FIN").ToString & """,")
                        resb.Append("""VALOR_FIN_MOSTRAR"":""" & IIf(row("VALOR_FIN").ToString = "999999999999999", "", row("VALOR_FIN").ToString) & """,")
                        resb.Append("""FORMATO"":""" & row("FORMATO").ToString & """,")
                        resb.Append("""FORMATO_DESC"":""" & IIf(row("FORMATO").ToString = "F", "IMPRESO", IIf(row("FORMATO").ToString = "P", "PAPEL EN BLANCO", "ELECTRONICO")) & """,")
                        resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """,")
                        resb.Append("""IMPRENTA_CODE"":""" & row("IMPRENTA_CODE").ToString & """,")
                        resb.Append("""IMPRENTA"":""" & row("IMPRENTA").ToString & """,")
                        resb.Append("""IMPR_CODE"":""" & row("IMPR_CODE").ToString & """,")
                        resb.Append("""IMPRESORA"":""" & row("IMPRESORA").ToString & """,")
                        resb.Append("""FORMATO_TICKET_IND"":""" & row("FORMATO_TICKET_IND").ToString & """,")
                        resb.Append("""ESTADO_IND"":""" & row("ESTADO_IND").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                End If
                resb.Append("]")
                res = resb.ToString()
            Case "LTDC" ' Listar Tipos de Documento
                Dim dcct As New Nomade.NC.NCTipoDCEmpresa("BN")
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = dcct.ListarTipoDCEmpresa(" ", P_CTLG_CODE, " ", "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        If row("GASTOS").ToString = "EMITE" Or row("ALMACEN").ToString = "EMITE" Or row("COMPRA_VENTA").ToString = "EMITE" Or row("CASOS_ESP").ToString = "EMITE" Then
                            resb.Append("{")
                            resb.Append("""CODE"":""" & row("CODE").ToString & """,")
                            resb.Append("""DCTO_CODE"":""" & row("DCTO_CODE").ToString & """,")
                            resb.Append("""SUNAT_CODE"":""" & row("SUNAT_CODE").ToString & """,")
                            resb.Append("""TIPO_DOC"":""" & row("TIPO_DOC").ToString & """,")
                            resb.Append("""GASTOS"":""" & row("GASTOS").ToString & """,")
                            resb.Append("""ALMACEN"":""" & row("ALMACEN").ToString & """,")
                            resb.Append("""COMPRA_VENTA"":""" & row("COMPRA_VENTA").ToString & """,")
                            resb.Append("""FECHA_ELEC"":""" & row("FECHA_ELEC").ToString & """,")
                            resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """,")
                            resb.Append("""DCTO_DESC"":""" & row("DCTO_DESC").ToString & """")
                            resb.Append("},")
                        End If
                    Next
                End If
                If Not dt Is Nothing Then
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "LDCE" ' Listar Tipos de Documento Electronicos
                Dim dcct As New Nomade.NC.NCTipoDCEmpresa("BN")
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = dcct.ListarTipoDCEmpresaElectronica(P_CTLG_CODE, "A", P_SCSL_CODE, "E")

                resb.Append("[")
                If Not (dt Is Nothing) Then
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""TIPO_DOC_CODE"":""" & row("TIPO_DOC_CODE").ToString & """,")
                        resb.Append("""TIPO_DOC"":""" & row("TIPO_DOC").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                End If
                resb.Append("]")
                res = resb.ToString()
            Case "LA" ' Listar Almacen
                Dim alm As New Nomade.NA.NAConfAlmacenes("BN")
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = alm.ListarAlmacenes(" ", P_CTLG_CODE, P_SCSL_CODE, "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                        resb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """")
                        resb.Append("},")
                    Next
                End If
                If Not dt Is Nothing Then
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "LV" ' Listar Valores de Inicio y Fin
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = aut.ListarValoresAutorizacion(P_CTLG_CODE, P_SCSL_CODE, P_TIPO_DOC, P_SERIE, P_CORRELATIVO)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""VALOR_FIN"":""" & row("VALOR_FIN").ToString & """,")
                        resb.Append("""NRO_DIGITOS"":""" & row("NRO_DIGITOS").ToString & """,")
                        resb.Append("""VALOR_NUEVO"":""" & row("VALOR_NUEVO").ToString & """")
                        resb.Append("},")
                    Next
                End If
                If Not dt Is Nothing Then
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "LVEND" ' Listar Vendedores
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim e As New Nomade.NC.NCEEmpleado("BN")
                dt = e.Listar_Empleados(0, 0, "A", P_CTLG_CODE, P_SCSL_CODE)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        If row("CARGO").ToString = "VENDEDOR" Then
                            resb.Append("{")
                            resb.Append("""PIDM"":""" & row("PIDM").ToString & """,")
                            resb.Append("""NOMBRE_EMPLEADO"":""" & row("NOMBRE_EMPLEADO").ToString & """")
                            resb.Append("},")
                        End If
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "LIMPR" 'Listar Imprentas
                Dim prov As New Nomade.NC.NCEProveedor("BN")
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = prov.ListarProveedor("0", "A", P_CTLG_CODE)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        If row("ACTIVIDAD").ToString.Length > 0 Then
                            If row("ACTIVIDAD").ToString.Substring(0, 5) = "22214" Or row("ACTIVIDAD").ToString.Substring(0, 5) = "22227" Or row("ACTIVIDAD").ToString.Substring(0, 4) = "1812" Or row("ACTIVIDAD").ToString.Substring(0, 4) = "1811" Then
                                resb.Append("{")
                                resb.Append("""RAZON_SOCIAL"" :" & """" & row("RAZON_SOCIAL").ToString & """,")
                                resb.Append("""DIRECCION"" :" & """" & row("DIRECCION").ToString & """,")
                                resb.Append("""NOMBRE_COMERCIAL"" :" & """" & row("NOMBRE_COMERCIAL").ToString & """,")
                                resb.Append("""PIDM"" :" & """" & row("PIDM").ToString & """")
                                resb.Append("}")
                                resb.Append(",")
                            End If
                        End If
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                    resb = resb.Replace("[{}]", String.Empty)
                End If
                res = resb.ToString()
            Case "LC" ' Listar Cajas
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim c As New Nomade.NC.NCCaja("BN")
                dt = c.ListarCaja(String.Empty, P_CTLG_CODE, P_SCSL_CODE, String.Empty, "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                        resb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """")
                        resb.Append("},")
                    Next
                    If Not dt Is Nothing Then
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                End If
                res = resb.ToString()
            Case "G"
                context.Response.ContentType = "text/plain"
                res = aut.CrearAutorizacion(P_EMISION, P_CTLG_CODE, P_SCSL_CODE, P_TIPO_DOC, P_AUTORIZACION, P_CORRELATIVO,
                                            P_CAJA_CODE, P_ALMACEN_CODE, P_PIDM_VENDEDOR, P_TIPO_CAMPO, P_NRO_DIGITOS, P_NRO_LINEAS, P_SERIE,
                                            P_INI, P_FIN, P_FORMATO, P_ESTADO, P_IMPRENTA, P_ESTADO_IND,
                                            P_USUA_ID, P_IMPR_CODE, P_FORMATO_TICKET_IND)
            Case "A"
                context.Response.ContentType = "text/plain"
                res = aut.ActualizarAutorizacion(P_CODE, P_EMISION, P_CTLG_CODE, P_SCSL_CODE, P_TIPO_DOC, P_AUTORIZACION, P_CORRELATIVO,
                                            P_CAJA_CODE, P_ALMACEN_CODE, P_PIDM_VENDEDOR, P_TIPO_CAMPO, P_NRO_DIGITOS, P_NRO_LINEAS, P_SERIE,
                                            P_INI, P_FIN, P_FORMATO, P_ESTADO, P_IMPRENTA, P_ESTADO_IND,
                                            P_USUA_ID, P_IMPR_CODE, P_FORMATO_TICKET_IND)
            Case "CE"
                context.Response.ContentType = "text/plain"
                res = aut.CambiarEstadoAutorizacion(P_CODE, P_USUA_ID)

            Case "CT"
                context.Response.ContentType = "text/plain"
                res = aut.CambiarEstadoTicket(P_CODE, P_USUA_ID)

            Case "VRDOC"
                Dim adoc As New Nomade.NC.NCAutorizacionDocumento("BN")
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = adoc.VerificarSerieNumeroDocumento(P_CTLG_CODE, P_SCSL_CODE, P_TIPO_DOC, P_CORRELATIVO, P_CAJA_CODE, P_PIDM_VENDEDOR, P_FORMATO, "")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""SERIE"" :" & """" & row("SERIE").ToString & """,")
                        resb.Append("""NUMERO"" :" & """" & row("NUMERO").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                    resb = resb.Replace("[{}]", String.Empty)
                End If
                res = resb.ToString()
        End Select

        context.Response.Write(res)
    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class