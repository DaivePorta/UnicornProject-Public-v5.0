<%@ WebHandler Language="VB" Class="NALAPES" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NALAPES : Implements IHttpHandler

    Dim OPCION As String

    Dim dt As DataTable

    Dim res As String
    Dim resb As New StringBuilder

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim CTLG_CODE, ISAC_CODE, ALMC_CODE, USUA_ID, DESDE, HASTA As String
        OPCION = context.Request("OPCION")
        USUA_ID = context.Request("USUA_ID")
        CTLG_CODE = context.Request("CTLG_CODE")
        ALMC_CODE = context.Request("ALMC_CODE")
        DESDE = context.Request("DESDE")
        HASTA = context.Request("HASTA")
        Try
            Select Case OPCION
                Case "S"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NA.NATipoMovimiento("Bn").lista_dcto_almacen("", "", "", "", "", "", CTLG_CODE, ALMC_CODE)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            If row("NIVEL_APROB").ToString <> "D" Then
                                resb.Append("{")
                                resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                                resb.Append("""RETORNO"":""" & row("RETORNO").ToString & """,")
                                resb.Append("""TIPO_MOVIMIENTO"":""" & row("TIPO_MOVIMIENTO").ToString & """,")
                                resb.Append("""ALMACEN"":""" & row("ALMACEN").ToString & """,")
                                resb.Append("""RAZON_DEST"":""" & row("RAZON_DEST").ToString & """,")
                                resb.Append("""FECHA_EMISION"":""" & row("FECHA_EMISION") & """,")
                                resb.Append("""FECHA_TRANS"":""" & row("FECHA_TRANS") & """,")
                                resb.Append("""TIPO_DCTO"":""" & row("TIPO_DCTO").ToString & """,")
                                resb.Append("""NRO_DCTO"":""" & row("REQC_NUM_SEQ_DOC").ToString & "-" & row("REQC_CODE").ToString & """,")
                                resb.Append("""SOLICITANTE"":""" & row("SOLICITANTE").ToString & """,")
                                resb.Append("""ENTREGAR_A"":""" & row("ENTREGAR_A").ToString & """,")
                                resb.Append("""IMPORTE_BIEN"":""" & row("IMPORTE_BIEN").ToString & """,")
                                resb.Append("""COMPLETO"":""" & row("COMPLETO").ToString & """,")
                                resb.Append("""ANULADO_IND"":""" & row("ANULADO_IND").ToString & """,")
                                resb.Append("""EMPRESA"":""" & row("EMPRESA").ToString & """,")
                                resb.Append("""ALMC_CODE"":""" & row("ALMC_CODE").ToString & """")
                                resb.Append("},")
                            End If
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                        resb.Replace("[{}]", "[]")
                    End If
                    res = resb.ToString
                Case "S2"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NA.NATipoMovimiento("Bn").lista_dcto_almacen2(CTLG_CODE, ALMC_CODE, Utilities.fechaLocal(DESDE),
                                                                                  Utilities.fechaLocal(HASTA))
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            'If (row("NIVEL_APROB").ToString <> "D") Or (row("NIVEL_APROB").ToString = "D" And row("NUM_DCTO").ToString = "") Then
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            resb.Append("""RETORNO"":""" & row("RETORNO").ToString & """,")
                            resb.Append("""TIPO_MOVIMIENTO"":""" & row("TIPO_MOVIMIENTO").ToString & """,")
                            'resb.Append("""ALMACEN"":""" & row("ALMACEN").ToString & """,")
                            'resb.Append("""RAZON_DEST"":""" & row("RAZON_DEST").ToString & """,")
                            resb.Append("""FECHA_EMISION"":""" & row("FECHA_EMISION") & """,")
                            resb.Append("""FECHA_TRANS"":""" & row("FECHA_TRANS") & """,")
                            resb.Append("""TIPO_DCTO"":""" & row("TIPO_DCTO").ToString & """,")
                            resb.Append("""NRO_DCTO"":""" & row("REQC_NUM_SEQ_DOC").ToString & "-" & row("REQC_CODE").ToString & """,")
                            resb.Append("""SOLICITANTE"":""" & row("SOLICITANTE").ToString & """,")
                            resb.Append("""ENTREGAR_A"":""" & row("ENTREGAR_A").ToString & """,")
                            resb.Append("""IMPORTE_BIEN"":""" & row("IMPORTE_BIEN").ToString & """,")
                            resb.Append("""PESO_TOTAL"":""" & row("PESO_TOTAL").ToString & """,")
                            resb.Append("""COMPLETO"":""" & row("COMPLETO").ToString & """,")
                            resb.Append("""ANULADO_IND"":""" & row("ANULADO_IND").ToString & """,")
                            resb.Append("""EMPRESA"":""" & row("EMPRESA").ToString & """,")
                            resb.Append("""ALMC_CODE"":""" & row("ALMC_CODE").ToString & """,")
                            resb.Append("""MOVCONT_CODE"":""" & row("MOVCONT_CODE").ToString & """,")
                            resb.Append("""ELECTRONICO_IND"":""" & row("ELECTRONICO_IND").ToString & """,")
                            resb.Append("""COSTO_TRANSPORTE"":""" & row("COSTO_TRANSPORTE").ToString & """")
                            resb.Append("},")
                            'End If
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                        resb.Replace("[{}]", "[]")
                    End If
                    res = resb.ToString
                Case "LISTAR_EMPRESAS"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    USUA_ID = context.Request("USUA_ID")
                    dt = New Nomade.NC.NCEmpresa("BN").ListarEmpresa("", "A", HttpContext.Current.User.Identity.Name)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & row("DESCRIPCION").ToString & """,")
                            resb.Append("""PIDM"" :" & """" & row("PIDM").ToString & """,")
                            resb.Append("""RUC"" :" & """" & row("RUC").ToString & """,")
                            resb.Append("""DIRECCION"" :" & """" & row("DIRECCION").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "LISTAR_ALMACENES"
                    context.Response.ContentType = "application/json; charset=utf-8"

                    dt = New Nomade.NA.NAConfAlmacenes("BN").ListarAlmacenesUsuario(USUA_ID, CTLG_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & row("DESCRIPCION").ToString & """,")
                            resb.Append("""SCSL_CODE"" :" & """" & row("SCSL_CODE").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "LISTAR_DETALLES"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    ISAC_CODE = context.Request("ISAC_CODE")
                    dt = New Nomade.NA.NATipoMovimiento("Bn").lista_detalle_dcto_almacen(ISAC_CODE, "")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""ITEM"" :" & """" & row("ITEM").ToString & """,")
                            resb.Append("""PROD_CODE"" :" & """" & row("PROD_CODE").ToString & """,")
                            resb.Append("""PRODUCTO"" :" & """" & row("PRODUCTO").ToString & """,")
                            resb.Append("""DESC_PRODUCTO"" :" & """" & row("DESC_PRODUCTO").ToString & """,")
                            resb.Append("""NRO_SERIE"" :" & """" & row("NRO_SERIE").ToString & """,")
                            resb.Append("""CENTRO_COSTO"" :" & """" & row("CENTRO_COSTO").ToString & """,")
                            resb.Append("""GARANTIA"" :" & """" & row("GARANTIA").ToString & """,")
                            resb.Append("""CANTIDAD_BASE"" :" & """" & row("CANTIDAD_BASE").ToString & """,")
                            resb.Append("""DESC_UNME_BASE"" :" & """" & row("DESC_UNME_BASE").ToString & """,")
                            resb.Append("""TOTAL"" :" & """" & row("TOTAL").ToString & """,")
                            resb.Append("""TOTAL_ALTERNO"" :" & """" & row("TOTAL_ALTERNO").ToString & """,")
                            resb.Append("""INC_IGV"" :" & """" & row("INC_IGV").ToString & """,")
                            resb.Append("""DCTO_ORGN_CODE"" :" & """" & row("DCTO_ORGN_CODE").ToString & """,")
                            resb.Append("""SERIADO_IND"" :" & """" & row("SERIADO_IND").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "COMPLETAR"
                    context.Response.ContentType = "text/plain"
                    ISAC_CODE = context.Request("ISAC_CODE")
                    res = New Nomade.NA.NATipoMovimiento("BN").VERIFICAR_SERIES(ISAC_CODE) 'DPORTA- VERIFICA SOLO EL INGRESO TRANSF. DE ENTRADA DE PROD. SERIADOS PARA EVITAR DUPLICIDAD EN LAS SERIES
                    If res = "OK" Then
                        res = New Nomade.NA.NATipoMovimiento("BN").COMPLETAR_DCTO_ALMACEN(ISAC_CODE)
                    End If
                Case "COMPLETAR_VALI"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim caTipoMov As New Nomade.NA.NATipoMovimiento("Bn")
                    Dim array As Array
                    ISAC_CODE = context.Request("ISAC_CODE")
                    res = caTipoMov.VERIFICAR_SERIES(ISAC_CODE) 'DPORTA- VERIFICA SOLO EL INGRESO TRANSF. DE ENTRADA DE PROD. SERIADOS PARA EVITAR DUPLICIDAD EN LAS SERIES
                    If res = "OK" Then
                        array = caTipoMov.COMPLETAR_DCTO_ALMACEN_VALI(ISAC_CODE)
                        If Not (array Is Nothing) Then
                            resb.Append("[{")
                            resb.Append("""p_RPTA"" :" & """" & array(0).ToString & """,")
                            resb.Append("""DATOS_QR"" :" & """" & array(1).ToString & """")
                            resb.Append("}]")
                        End If
                        res = resb.ToString()
                    Else
                        resb.Append("[{")
                        resb.Append("""p_RPTA"" :" & """" & res.ToString() & """,")
                        resb.Append("""ERROR_SERIES"" :" & """" & "ERROR_SERIES" & """")
                        resb.Append("}]")
                        res = resb.ToString()
                    End If
            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try

    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class