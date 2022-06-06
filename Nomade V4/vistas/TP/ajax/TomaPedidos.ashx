<%@ WebHandler Language="VB" Class="TomaPedidos" %>

Imports System
Imports System.Web
Imports System.Data
Imports iTextSharp.text
Imports iTextSharp.text.pdf

Public Class TomaPedidos : Implements IHttpHandler, System.Web.SessionState.IRequiresSessionState
    Dim sOpcion As String
    Dim sCodEmpresa As String
    Dim sGrupo, sSubGrupo, sSucursal, sTermino_busq, sProductoCode, cPrecioInd, codigo As String
    Dim p_CMNT_DCTO, p_NUM_SERIE, p_NUM_DCTO, p_DCTO_CODE, p_FECHA_EMISION, p_FECHA_TRANS, p_FECHA_VENCIMIENTO, p_CTLG_CODE,
        p_SCSL_CODE, p_CAJA_CODE, p_MONE_CODE, p_VALOR, p_DESCUENTO, p_IGV, p_IMPORTE, p_MOPA_CODE, p_FOPA_CODE, p_CLIE_PIDM,
        p_CLIE_DOID, p_USVE_USUA_ID, p_COMPLETO_IND, p_CODE_REF, p_DCTO_CODE_REF, p_VALOR_CAMBIO, p_USUA_ID, p_ISC, p_IMPORTE_EXO,
        p_IMPORTE_INA, p_IMPORTE_GRA, p_IMPORTE_REDONDEO, p_IMPORTE_DONACION, p_IMPORTE_DETRACCION, p_IMPORTE_RETENCION, p_IMPORTE_PERCEPCION,
        p_IMPORTE_OTROS, p_IMPR_CODE, p_DETRACCION_IND, p_PERCEPCION_IND, p_RETENCION_IND, p_NUM_DCTO_PERCEP, p_NUM_DCTO_DETRAC,
        p_NUM_DCTO_RETEN, p_FECHA_EMISION_PERCEP, p_FECHA_EMISION_DETRAC, p_FECHA_EMISION_RETEN, p_IMPRFAC_PERCEP, p_NRO_CUENTA_DETRAC,
        p_DETALLES, p_DCTO_SERIE_REF, p_DCTO_NUM_REF, p_SCSL_EXONERADA_IND, p_IGV_IMPR_IND, p_VALOR_CAMBIO_OFI, p_COD_AUT, p_PCTJ_IGV, p_CODE_VTAC, p_TIPO, p_NOMBRE_REFERENCIA,
        p_FACTOR_RENTA, p_IMPUESTO_RENTA, p_RESP_PIDM As String

    Dim p As New Nomade.NC.NCParametros("Bn")
    Dim sc As New Nomade.NC.NCSucursal("Bn")
    Dim ctlg As New Nomade.NC.NCEmpresa("Bn")
    Dim mp As New Nomade.MP.MPOrdenFabricacion("Bn")
    Dim oDT As New DataTable
    Dim g As New Nomade.NC.NCGrupos("Bn")
    Dim nvVenta As New Nomade.NV.NVVenta("Bn")
    Dim nmGestionPrecios As New Nomade.NM.NMGestionPrecios("Bn")
    Dim resb As New StringBuilder
    Dim fiIgv As New Nomade.FI.FIIgv("Bn")


    Dim sResponse As String
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        'context.Response.ContentType = "text/plain"
        'context.Response.Write("Hello World")

        sOpcion = context.Request("OPCION")
        codigo = context.Request("codigo")

        p_CODE_VTAC = context.Request("p_CODE_VTAC")
        p_TIPO = context.Request("p_TIPO")
        p_NOMBRE_REFERENCIA = context.Request("p_NOMBRE_REFERENCIA")


        sGrupo = context.Request("sGrupo")
        sSubGrupo = context.Request("sSubGrupo")
        sTermino_busq = context.Request("term")
        sProductoCode = context.Request("sProductoCode")
        cPrecioInd = context.Request("cPrecioInd")
        p_CMNT_DCTO = context.Request("p_CMNT_DCTO")
        p_DETALLES = vChar(context.Request("p_DETALLES"))
        p_DCTO_CODE = context.Request("p_DCTO_CODE")
        p_FECHA_EMISION = Utilities.fechaLocal(FormatDateTime(Now, DateFormat.ShortDate))
        p_CAJA_CODE = context.Request("p_CAJA_CODE")
        p_MONE_CODE = context.Request("p_MONE_CODE")
        p_VALOR = context.Request("p_VALOR")
        p_DESCUENTO = context.Request("p_DESCUENTO")
        p_IGV = context.Request("p_IGV")
        p_IMPORTE = context.Request("p_IMPORTE")
        p_MOPA_CODE = context.Request("p_MOPA_CODE")
        p_FOPA_CODE = context.Request("p_FOPA_CODE")
        p_USVE_USUA_ID = mp.DEVULVE_PIDM_USUARIO(context.User.Identity.Name)(0)("PIDM")
        p_CODE_REF = context.Request("p_CODE_REF")
        p_DCTO_CODE_REF = vChar(context.Request("p_DCTO_CODE_REF"))
        p_VALOR_CAMBIO = context.Request("p_VALOR_CAMBIO")
        p_USUA_ID = context.User.Identity.Name
        p_ISC = context.Request("p_ISC")
        p_IMPORTE_EXO = context.Request("p_IMPORTE_EXO")
        p_IMPORTE_INA = context.Request("p_IMPORTE_INA")
        p_IMPORTE_GRA = context.Request("p_IMPORTE_GRA")
        p_IMPORTE_REDONDEO = context.Request("p_IMPORTE_REDONDEO")
        p_IMPORTE_DETRACCION = context.Request("p_IMPORTE_DETRACCION")
        p_IMPORTE_RETENCION = context.Request("p_IMPORTE_RETENCION")
        p_IMPORTE_PERCEPCION = context.Request("p_IMPORTE_PERCEPCION")
        p_IMPR_CODE = context.Request("p_IMPR_CODE")
        p_DETRACCION_IND = context.Request("p_DETRACCION_IND")
        p_PERCEPCION_IND = context.Request("p_PERCEPCION_IND")
        p_RETENCION_IND = context.Request("p_RETENCION_IND")
        p_NUM_DCTO_PERCEP = vChar(context.Request("p_NUM_DCTO_PERCEP"))
        p_NUM_DCTO_DETRAC = vChar(context.Request("p_NUM_DCTO_DETRAC"))
        p_NUM_DCTO_RETEN = vChar(context.Request("p_NUM_DCTO_RETEN"))
        p_FECHA_EMISION_PERCEP = context.Request("p_FECHA_EMISION_PERCEP")
        p_FECHA_EMISION_DETRAC = context.Request("p_FECHA_EMISION_DETRAC")
        p_FECHA_EMISION_RETEN = context.Request("p_FECHA_EMISION_RETEN")
        p_IMPRFAC_PERCEP = context.Request("p_IMPRFAC_PERCEP")
        p_NRO_CUENTA_DETRAC = vChar(context.Request("p_NRO_CUENTA_DETRAC"))
        p_DCTO_SERIE_REF = vChar(context.Request("p_DCTO_SERIE_REF"))
        p_DCTO_NUM_REF = context.Request("p_DCTO_NUM_REF")
        p_SCSL_EXONERADA_IND = context.Request("p_SCSL_EXONERADA_IND")
        p_IGV_IMPR_IND = context.Request("p_IGV_IMPR_IND")

        p_VALOR_CAMBIO_OFI = context.Request("p_VALOR_CAMBIO_OFI")

        p_PCTJ_IGV = context.Request("p_PCTJ_IGV")
        p_FACTOR_RENTA = context.Request("p_FACTOR_RENTA")
        p_IMPUESTO_RENTA = context.Request("p_IMPUESTO_RENTA")


        Try

            Dim aux1 As String = context.Request("sSucursal")
            sSucursal = IIf(aux1 Is Nothing, Utilities.mGetEstablecimiento(context), aux1)

            Dim aux As String = context.Request("sEmpresa")
            sCodEmpresa = IIf(aux Is Nothing, Utilities.mGetEmpresa(context), aux)

            context.Response.ContentType = "text/plain"
            Select Case sOpcion
                Case "1" 'listar grupos
                    context.Response.ContentType = "application/json; charset=utf-8"

                    oDT = g.fnGetGrupos(sCodEmpresa)
                    If oDT IsNot Nothing Then
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If

                Case "2" 'listar sub-grupos
                    context.Response.ContentType = "application/json; charset=utf-8"

                    oDT = g.fnGetSubGrupos(sCodEmpresa, sGrupo)
                    If oDT IsNot Nothing Then
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If

                Case "3" 'listar productos
                    context.Response.ContentType = "application/json; charset=utf-8"

                    oDT = nvVenta.ListarProductosTomaPedido(If(sCodEmpresa = Nothing, "", sCodEmpresa), If(sSucursal = Nothing, "", sSucursal),
                                                         If(sGrupo = Nothing, "", sGrupo), If(sSubGrupo = Nothing, "", sSubGrupo), If(sTermino_busq = Nothing, "", sTermino_busq))
                    If Not (oDT Is Nothing) Then

                        sResponse = Utilities.Datatable2Json(oDT)
                    Else
                        sResponse = "[]"
                    End If

                Case "4" 'Obtener precio producto             
                    context.Response.ContentType = "application/json; charset=utf-8"
                    If cPrecioInd = "E" Then
                        oDT = nmGestionPrecios.LISTAR_PRECIO_ESTANDAR(sProductoCode, sCodEmpresa, sSucursal)
                        If Not oDT Is Nothing Then
                            resb.Append("[{")
                            resb.Append("""PRECIO_VENTA"" :" & """" & oDT.Rows(0)("PRECIO_VENTA") & """,")
                            resb.Append("""PRECIO_MINIMO"" :" & """" & oDT.Rows(0)("PRECIO_MINIMO") & """")
                            resb.Append("}]")
                            sResponse = resb.ToString()
                        Else
                            sResponse = "[]"
                        End If
                    ElseIf cPrecioInd = "C" Then
                        oDT = nmGestionPrecios.LISTAR_PRECIO_CANTIDAD(sProductoCode, sCodEmpresa, sSucursal)
                        If Not (oDT Is Nothing) Then
                            resb.Append("[")
                            For Each row As DataRow In oDT.Rows
                                resb.Append("{")
                                resb.Append("""RANGO"":""" & row("RANGO").ToString & """,")
                                resb.Append("""PRECIO_VENTA"":""" & row("PRECIO").ToString & """")
                                resb.Append("},")
                            Next
                            resb.Append("{}")
                            resb = resb.Replace(",{}", String.Empty)
                            resb.Append("]")
                            sResponse = resb.ToString()
                        Else
                            sResponse = "[]"
                        End If

                    Else
                        sResponse = "[]"
                    End If
                Case "5"
                    oDT = p.fnGetParametro(codigo)
                    If oDT Is Nothing Then
                        sResponse = "{}"
                    Else
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If

                Case "6" 'CREAR DOCUMENTO VENTA             
                    context.Response.ContentType = "application/json; charset=utf-8"

                    p_CMNT_DCTO = "|@TV:T" + p_CMNT_DCTO
                    p_DCTO_CODE = "0003"
                    Dim pidmClieVarios As String = p.fnGetParametro("CLIP")(0)("VALOR")

                    Dim array As Array
                    array = nvVenta.CrearDocumentoVentaWeb(String.Empty, String.Empty, p_DCTO_CODE,
                            p_FECHA_EMISION, p_FECHA_EMISION, p_FECHA_EMISION, p_CMNT_DCTO, sCodEmpresa, sSucursal, p_CAJA_CODE, p_MONE_CODE, p_VALOR, p_DESCUENTO, p_IGV, p_IMPORTE,
                    "0001", Nothing, pidmClieVarios, "1", p_USVE_USUA_ID, "N", Nothing, Nothing,
                    p_VALOR_CAMBIO, p_USUA_ID, p_ISC, p_IMPORTE_EXO, p_IMPORTE_INA, p_IMPORTE_GRA, p_IMPORTE_REDONDEO,
                    "0", p_IMPORTE_DETRACCION, p_IMPORTE_RETENCION, p_IMPORTE_PERCEPCION, "0", p_IMPR_CODE,
                    p_DETRACCION_IND, p_PERCEPCION_IND, p_RETENCION_IND, p_NUM_DCTO_PERCEP, p_NUM_DCTO_DETRAC, p_NUM_DCTO_RETEN,
                    If(p_FECHA_EMISION_PERCEP = "", Nothing, Utilities.fechaLocal(p_FECHA_EMISION_PERCEP)),
                    If(p_FECHA_EMISION_DETRAC = "", Nothing, Utilities.fechaLocal(p_FECHA_EMISION_DETRAC)),
                    If(p_FECHA_EMISION_RETEN = "", Nothing, Utilities.fechaLocal(p_FECHA_EMISION_RETEN)),
                    p_IMPRFAC_PERCEP, p_NRO_CUENTA_DETRAC, p_DETALLES, Nothing, Nothing, p_SCSL_EXONERADA_IND, p_IGV_IMPR_IND,
                    p_VALOR_CAMBIO_OFI, "000003", p_PCTJ_IGV, p_FACTOR_RENTA, p_IMPUESTO_RENTA, Nothing, String.Empty, String.Empty, "SIN DIRECCION",
                    Nothing, Nothing, 0, p_NOMBRE_REFERENCIA)

                    If Not (array Is Nothing) Then
                        Dim msgError As String = "OK"
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & array(0).ToString & """,")
                        resb.Append("""SECUENCIA"" :" & """" & array(1).ToString & """,")
                        resb.Append("""MSGERROR"" :" & """" & msgError & """")
                        resb.Append("}")
                        resb.Append("]")
                    End If
                    sResponse = resb.ToString()

                Case "7"
                    sResponse = sc.ListarSucursal(sCodEmpresa, sSucursal, "A")(0)("EXONERADO")
                Case "8"
                    sResponse = ctlg.ListarEmpresa(sCodEmpresa, "A", String.Empty)(0)("AGENTE_RETEN_IND")
                Case "9" 'Lista impuesto a la renta
                    context.Response.ContentType = "application/json; charset=utf-8"
                    oDT = fiIgv.ListarImpuestoRenta("", Nothing, Nothing, p_FECHA_EMISION)
                    If Not (oDT Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In oDT.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""FACTOR"" :" & """" & MiDataRow("FACTOR").ToString & """,")
                            resb.Append("""USUA_ID"" :" & """" & MiDataRow("USUA_ID").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    sResponse = resb.ToString()


                Case "10"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    'context.Response.ContentType = "application/text; charset=utf-8"
                    oDT = nvVenta.ListarDocVenta_Busq_Toma_Pedido(sCodEmpresa, sSucursal, p_USVE_USUA_ID, "T")
                    If Not oDT Is Nothing Then

                        sResponse = Utilities.Datatable2Json(oDT) 'GenerarTablaDocumento(dt)
                    Else
                        sResponse = "[]"

                    End If

                Case "11"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    'context.Response.ContentType = "application/text; charset=utf-8"
                    oDT = nvVenta.ListarDctoVenta_TomPedido(p_CODE_VTAC, p_TIPO)
                    If Not oDT Is Nothing Then

                        sResponse = Utilities.Datatable2Json(oDT) 'GenerarTablaDocumento(dt)
                    Else
                        sResponse = "[]"

                    End If

                Case "12" 'ACTUALIZAR TOMA PEDIDO            
                    context.Response.ContentType = "application/json; charset=utf-8"

                    p_CMNT_DCTO = "|@TV:T" + p_CMNT_DCTO
                    p_DCTO_CODE = "0003"
                    Dim pidmClieVarios As String = p.fnGetParametro("CLIP")(0)("VALOR")


                    Dim array As Array
                    array = nvVenta.ActualizarDocumentoVentaWeb(p_CODE_VTAC, String.Empty, String.Empty, p_DCTO_CODE,
                            p_FECHA_EMISION, p_FECHA_EMISION, p_FECHA_EMISION, p_CMNT_DCTO, sCodEmpresa, sSucursal, p_CAJA_CODE, p_MONE_CODE, p_VALOR, p_DESCUENTO, p_IGV, p_IMPORTE,
                    "0001", Nothing, pidmClieVarios, "1", p_USVE_USUA_ID, "N", Nothing, Nothing,
                    p_VALOR_CAMBIO, p_USUA_ID, p_ISC, p_IMPORTE_EXO, p_IMPORTE_INA, p_IMPORTE_GRA, p_IMPORTE_REDONDEO,
                    "0", p_IMPORTE_DETRACCION, p_IMPORTE_RETENCION, p_IMPORTE_PERCEPCION, "0", p_IMPR_CODE,
                    p_DETRACCION_IND, p_PERCEPCION_IND, p_RETENCION_IND, p_NUM_DCTO_PERCEP, p_NUM_DCTO_DETRAC, p_NUM_DCTO_RETEN,
                    If(p_FECHA_EMISION_PERCEP = "", Nothing, Utilities.fechaLocal(p_FECHA_EMISION_PERCEP)),
                    If(p_FECHA_EMISION_DETRAC = "", Nothing, Utilities.fechaLocal(p_FECHA_EMISION_DETRAC)),
                    If(p_FECHA_EMISION_RETEN = "", Nothing, Utilities.fechaLocal(p_FECHA_EMISION_RETEN)),
                    p_IMPRFAC_PERCEP, p_NRO_CUENTA_DETRAC, p_DETALLES, Nothing, Nothing, p_SCSL_EXONERADA_IND, p_IGV_IMPR_IND,
                    p_VALOR_CAMBIO_OFI, "000003", p_PCTJ_IGV, p_FACTOR_RENTA, p_IMPUESTO_RENTA, Nothing, String.Empty, String.Empty, "SIN DIRECCION",
                    Nothing, Nothing, 0, p_NOMBRE_REFERENCIA)

                    If Not (array Is Nothing) Then
                        Dim msgError As String = "OK"
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & array(0).ToString & """,")
                        resb.Append("""SECUENCIA"" :" & """" & array(1).ToString & """,")
                        resb.Append("""MSGERROR"" :" & """" & msgError & """")
                        resb.Append("}")
                        resb.Append("]")
                    End If
                    sResponse = resb.ToString()

            End Select
            context.Response.Write(sResponse)

        Catch ex As Exception
            context.Response.Write("[Error]: " + ex.Message)
        End Try
    End Sub

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