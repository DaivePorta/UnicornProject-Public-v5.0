<%@ WebHandler Language="VB" Class="NBMCCUE" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NBMCCUE : Implements IHttpHandler

    Dim opcion As String
    Dim empresa As String
    Dim codigo As String
    Dim PIDM As String

    Dim P_NRO_CUENTA, P_BANC_CODE, P_TIPO_CUENTA, P_MONEDA, P_CTA_INTER, p_PIDM As String

    Dim P_PIDM_SECTORISTA, P_FECHA_APERTURA, P_FECHA_CIERRE, P_CTAS_CODE, P_PAGO_CHEQUERA, P_BILLETERA_DIG, P_CUENTA_COBRANZA,
        P_PAGO_TAR_TRABAJO, P_PIDM_AUT1, P_ESTADO_IND, P_USUA_ID, P_FIRMA, p_RESPONSABLES As String
    Dim P_CUEN_CODE, P_CTLG_CODE, P_ITEM, P_MONTO As String
    Dim dt As DataTable

    Dim e As New Nomade.NC.NCECliente("bn")
    Dim b As New Nomade.NC.NCBanco("bn")
    Dim ncCuentaBancaria As New Nomade.NC.NCCuentaBancaria("BN")
    Dim nbCuentaContable As New Nomade.NB.NBCuentaContable("BN")
    Dim p As New Nomade.NC.NCPersona("bn")
    Dim tcb As New Nomade.NC.NCTipoCuentasBancarias("BN")
    Dim res As String
    Dim resb As New StringBuilder

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        opcion = context.Request("opcion")
        empresa = context.Request("empresa")
        codigo = context.Request("code")
        PIDM = context.Request("pidm")

        P_NRO_CUENTA = context.Request("P_NRO_CUENTA")
        P_PIDM_SECTORISTA = context.Request("P_PIDM_SECTORISTA")
        P_PIDM_SECTORISTA = IIf(P_PIDM_SECTORISTA = "", Nothing, P_PIDM_SECTORISTA)
        P_FECHA_CIERRE = context.Request("P_FECHA_CIERRE")
        P_FECHA_CIERRE = Utilities.fechaLocal(P_FECHA_CIERRE)
        P_FECHA_CIERRE = IIf(P_FECHA_CIERRE = "0000-00-00" Or P_FECHA_CIERRE = "", Nothing, P_FECHA_CIERRE)
        P_CTAS_CODE = context.Request("P_CTAS_CODE")
        P_CTAS_CODE = IIf(P_CTAS_CODE = "", Nothing, P_CTAS_CODE)
        P_PAGO_CHEQUERA = context.Request("P_PAGO_CHEQUERA")
        P_PAGO_TAR_TRABAJO = context.Request("P_PAGO_TAR_TRABAJO")
        P_PIDM_AUT1 = context.Request("P_PIDM_AUT1")
        P_PIDM_AUT1 = IIf(P_PIDM_AUT1 = "", Nothing, P_PIDM_AUT1)
        P_ESTADO_IND = context.Request("P_ESTADO_IND")
        P_USUA_ID = context.Request("P_USUA_ID")
        P_FIRMA = context.Request("P_FIRMA")
        P_FIRMA = IIf(P_FIRMA = "", Nothing, P_FIRMA)
        P_BILLETERA_DIG = context.Request("P_BILLETERA_DIG") 'DPORTA
        P_CUENTA_COBRANZA = context.Request("P_CUENTA_COBRANZA") 'DPORTA
        P_MONEDA = context.Request("P_MONEDA")

        p_RESPONSABLES = context.Request("p_RESPONSABLES")
        P_CUEN_CODE = context.Request("P_CUEN_CODE")
        P_CTLG_CODE = context.Request("P_CTLG_CODE")
        P_ITEM = context.Request("P_ITEM")
        P_MONTO = context.Request("P_MONTO")
        p_PIDM = context.Request("p_PIDM")

        Select Case opcion
            Case "LC" ' Listar Clientes
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = e.ListarCliente(String.Empty, String.Empty, empresa)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                        resb.Append("""RAZON_SOCIAL"" :" & """" & MiDataRow("RAZON_SOCIAL").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                End If

                If Not dt Is Nothing Then
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If

                res = resb.ToString()

            Case "LCB" ' Listar Cuentas Bancarias
                context.Response.ContentType = "application/json; charset=utf-8"
                P_BANC_CODE = context.Request("P_BANC_CODE")
                dt = ncCuentaBancaria.ListarCuentasBancarias(empresa, If(codigo Is Nothing, String.Empty, codigo), "", If(P_MONEDA Is Nothing, String.Empty, P_MONEDA), If(P_BANC_CODE Is Nothing, String.Empty, P_BANC_CODE))
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                        resb.Append("""CODE"" :" & """" & MiDataRow("CODE").ToString & """,")
                        resb.Append("""BANCO"" :" & """" & MiDataRow("BANCO").ToString & """,")
                        resb.Append("""TPOCUENTA_CODE"" :" & """" & MiDataRow("TPOCUENTA_CODE").ToString & """,")
                        resb.Append("""MONE_CODE"" :" & """" & MiDataRow("MONE_CODE").ToString & """,")
                        resb.Append("""NRO_CUENTA"" :" & """" & MiDataRow("NRO_CUENTA").ToString & """,")
                        resb.Append("""NRO_CTA_INTER"" :" & """" & MiDataRow("NRO_CTA_INTER").ToString & """,")
                        resb.Append("""PIDM_SECTORISTA"" :" & """" & MiDataRow("PIDM_SECTORISTA").ToString & """,") 'Devuelve pidm primer sectorista
                        resb.Append("""SECTORISTA"" :" & """" & MiDataRow("SECTORISTA").ToString & """,") 'Devuelve nombre primer sectorista
                        resb.Append("""SEC_PIDMS"" :" & """" & MiDataRow("SEC_PIDMS").ToString & """,")
                        resb.Append("""SEC_NOMBRES"" :" & """" & MiDataRow("SEC_NOMBRES").ToString & """,")
                        resb.Append("""RES_PIDMS"" :" & """" & MiDataRow("RES_PIDMS").ToString & """,")
                        resb.Append("""RES_NOMBRES"" :" & """" & MiDataRow("RES_NOMBRES").ToString & """,")
                        resb.Append("""AUT_PIDMS"" :" & """" & MiDataRow("AUT_PIDMS").ToString & """,")
                        resb.Append("""AUT_NOMBRES"" :" & """" & MiDataRow("AUT_NOMBRES").ToString & """,")
                        resb.Append("""CTAS_CODE"" :" & """" & MiDataRow("CTAS_CODE").ToString & """,")
                        resb.Append("""CHEQUERA"" :" & """" & MiDataRow("CHEQUERA").ToString & """,")
                        resb.Append("""TAR_TRABAJO"" :" & """" & MiDataRow("TAR_TRABAJO").ToString & """,")
                        resb.Append("""BILLETERA_DIG"" :" & """" & MiDataRow("BILLETERA_DIG").ToString & """,")
                        resb.Append("""CUENTA_COBRANZA"" :" & """" & MiDataRow("CUENTA_COBRANZA").ToString & """,")
                        resb.Append("""FECAPERTURA"" :" & """" & MiDataRow("FECAPERTURA").ToString & """,")
                        resb.Append("""FECIERRE"" :" & """" & MiDataRow("FECIERRE").ToString & """,")
                        resb.Append("""FIRMA"" :" & """" & MiDataRow("FIRMA").ToString & """,")
                        resb.Append("""AUT_OBLIG_NRO"" :" & """" & MiDataRow("AUT_OBLIG_NRO").ToString & """,")
                        resb.Append("""AUT_OBLIG_INDS"" :" & """" & MiDataRow("AUT_OBLIG_INDS").ToString & """,")
                        resb.Append("""MOVIMIENTOS"" :" & """" & MiDataRow("MOVIMIENTOS").ToString & """,")
                        resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                End If

                If Not dt Is Nothing Then
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If

                res = resb.ToString()

            Case "AUTX" ' Listar Personas Autorizadas en Firma Mixta: PFC_LISTAR_AUTORIZADOS_MIXTOS
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = ncCuentaBancaria.ListarAutorizadosMixtos(P_CUEN_CODE, P_CTLG_CODE, If(P_ITEM = "", "0", P_ITEM), If(P_MONTO = "", "0", P_MONTO))
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""ITEM"" :" & """" & MiDataRow("ITEM").ToString & """,")
                        resb.Append("""DESDE"" :" & """" & MiDataRow("DESDE").ToString & """,")
                        resb.Append("""HASTA"" :" & """" & MiDataRow("HASTA").ToString & """,")
                        resb.Append("""AUT_PIDMS"" :" & """" & MiDataRow("AUT_PIDMS").ToString & """,")
                        resb.Append("""AUT_OBLIG_IND"" :" & """" & MiDataRow("AUT_OBLIG_IND").ToString & """,")
                        resb.Append("""AUT_NOMBRES"" :" & """" & MiDataRow("AUT_NOMBRES").ToString & """,")
                        resb.Append("""AUT_CANTIDAD"" :" & """" & MiDataRow("AUT_CANTIDAD").ToString & """,")
                        resb.Append("""ESTADO_IND"" :" & """" & MiDataRow("ESTADO_IND").ToString & """,")
                        resb.Append("""FECHA_ACTV"" :" & """" & MiDataRow("FECHA_ACTV").ToString & """,")
                        resb.Append("""USUA_ID"" :" & """" & MiDataRow("USUA_ID").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                Else
                    resb.Append("[]")
                End If
                res = resb.ToString()
            Case "LTCB" 'LISTAR TIPOS DE CUENTA BANCARIA
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = tcb.ListarTCBancarias(String.Empty, "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"":" & """" & MiDataRow("Codigo").ToString & """,")
                        resb.Append("""DESCRIPCION"":" & """" & MiDataRow("Descripcion").ToString & """,")
                        resb.Append("""MONEDA"":" & """" & MiDataRow("MONEDA").ToString & """,")
                        resb.Append("""CHEQUERA_IND"":" & """" & MiDataRow("CHEQUERA_IND").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()

            Case "LCC" ' Listar Cuentas Contables
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = nbCuentaContable.ListarCuentasContablesUltimoNivel(empresa, IIf(P_CUEN_CODE Is Nothing, "10.", P_CUEN_CODE), String.Empty, String.Empty)
                If Not (dt Is Nothing) Then
                    Dim nivel As Int32 = ObtenerMayorNivel(dt)
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        If Integer.Parse(MiDataRow("NIVEL").ToString) >= 4 Then
                            resb.Append("{")
                            resb.Append("""ID_CUENTA"" :" & """" & MiDataRow("ID_CUENTA").ToString & """,")
                            resb.Append("""CUENTA"" :" & """" & MiDataRow("CUENTA").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""DESC_MOSTRAR"" :" & """" & MiDataRow("DESC_MOSTRAR").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        End If
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                    resb = resb.Replace("{}", String.Empty)

                    res = resb.ToString()
                End If

            Case "LPE"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = p.fListarPersonaNatural
                If Not dt Is Nothing Then
                    res = Utilities.Datatable2Json(dt)
                Else
                    res = "[]"
                End If
                'res = fGenerarTabla(dt)

            Case "G" 'Crear cuenta bancaria
                context.Response.ContentType = "text/plain"
                P_FECHA_APERTURA = context.Request("P_FECHA_APERTURA")
                P_FECHA_APERTURA = Utilities.fechaLocal(P_FECHA_APERTURA)
                P_BANC_CODE = context.Request("P_BANC_CODE")
                P_TIPO_CUENTA = context.Request("P_TIPO_CUENTA")
                P_MONEDA = context.Request("P_MONEDA")
                P_CTA_INTER = context.Request("P_CTA_INTER")
                res = ncCuentaBancaria.CrearCuentaBancaria(empresa, P_NRO_CUENTA, P_BANC_CODE, P_TIPO_CUENTA, P_MONEDA, P_CTA_INTER, P_PIDM_SECTORISTA, P_FECHA_APERTURA, P_FECHA_CIERRE,
                                            P_CTAS_CODE, P_PAGO_CHEQUERA, P_PAGO_TAR_TRABAJO, P_BILLETERA_DIG, P_CUENTA_COBRANZA, P_PIDM_AUT1, P_ESTADO_IND, P_USUA_ID, P_FIRMA, p_RESPONSABLES)

            Case "A" 'Actualizar cuenta bancaria
                context.Response.ContentType = "text/plain"
                P_CTA_INTER = context.Request("P_CTA_INTER")
                res = ncCuentaBancaria.ActualizarCuentaBancaria(empresa, codigo, P_NRO_CUENTA, P_PIDM_SECTORISTA, P_FECHA_CIERRE, P_CTAS_CODE, P_PAGO_CHEQUERA, P_PAGO_TAR_TRABAJO, P_BILLETERA_DIG,
                                                                P_CUENTA_COBRANZA, P_PIDM_AUT1, P_ESTADO_IND, P_USUA_ID, P_FIRMA, P_MONEDA, P_CTA_INTER, p_RESPONSABLES)

            Case "CA"
                context.Response.ContentType = "text/plain"
                res = ncCuentaBancaria.CambiarEstadoCuentaBancaria(empresa, codigo)

            Case "VCOR"
                context.Response.ContentType = "text/plain"
                Dim CORegistroCompras As New Nomade.CO.CORegistroCompras("BN")
                dt = CORegistroCompras.LISTAR_DEVULVE_CORREO(p_PIDM)
                If Not (dt Is Nothing) Then
                    For Each MiDataRow As DataRow In dt.Rows
                        res = MiDataRow("CORREO").ToString
                    Next
                Else
                    res = ""
                End If

        End Select

        context.Response.Write(res)
    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property


    Public Function fGenerarTabla(ByVal dtb As DataTable) As String
        If Not dtb Is Nothing Then
            res = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"
            res += "<thead>"
            res += "<tr>"
            res += "<th style=""text-align: center"">TIPO DOCUMENTO</th>"
            res += "<th style=""text-align: center"">DOCUMENTO</th>"
            res += "<th>PERSONA</th>"
            res += "<th style=""text-align: center"">FECHA</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"

            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr id=""" & dt.Rows(i)("CODE").ToString() & """>"
                res += "<td style=""text-align: center; width: 15%"" id=""TFOC" & dt.Rows(i)("CODE").ToString() & """>" & dt.Rows(i)("TIPODOC").ToString() & "</td>"
                res += "<td style=""text-align: center; width: 25%"" id=""DOC" & dt.Rows(i)("CODE").ToString() & """>" & dt.Rows(i)("DOC").ToString() & "</td>"
                res += "<td id=""PER" & dt.Rows(i)("CODE").ToString() & """>" & dt.Rows(i)("NOMBRE").ToString() & " " &
                    dt.Rows(i)("APELL_PATE").ToString() & " " & dt.Rows(i)("APELL_MATE").ToString() & "</td>"
                res += "<td style=""text-align: center"" id=""FE" & dt.Rows(i)("CODE").ToString() & """>" & dt.Rows(i)("FECHA").ToString() & "</td>"
                res += "</tr>"
            Next
            res += "</tbody>"
            res += "</table>"
        Else
            res = "No se encontraron datos!!!"
        End If

        Return res
    End Function

    Public Function ObtenerMayorNivel(ByVal dt As DataTable) As String
        Dim mayor As Int32 = 0
        For Each row In dt.Rows
            If Int32.Parse(row("NIVEL").ToString) > mayor Then
                mayor = Int32.Parse(row("NIVEL").ToString)
            End If
        Next
        Return mayor
    End Function
End Class