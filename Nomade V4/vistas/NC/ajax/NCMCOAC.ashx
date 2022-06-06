<%@ WebHandler Language="VB" Class="NCMCOAC" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMCOAC : Implements IHttpHandler

    Dim OPCION, USUARIO, CTLG_CODE, SCSL_CODE, USUA_ID, TIPO_ACT, F_DESDE, F_HASTA As String


    Dim res, cod, msg As String
    Dim resb As New StringBuilder

    Dim dt As DataTable

    Dim oTransaction As New Nomade.DataAccess.Transaccion()

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        'Capturamos los valores que nos envia el formulario 

        OPCION = context.Request("OPCION")
        CTLG_CODE = context.Request("CTLG_CODE")
        SCSL_CODE = context.Request("SCSL_CODE")
        USUA_ID = context.Request("USUA_ID")
        TIPO_ACT = context.Request("TIPO_ACT")
        F_DESDE = context.Request("F_DESDE")
        F_HASTA = context.Request("F_HASTA")

        Try
            Select Case OPCION

                Case "LDOCS"

                    If TIPO_ACT = "1" Then 'Lista Documentos de COMPRA

                        context.Response.ContentType = "application/json; charset=utf-8"
                        Dim oNCCorrecionActividad As New Nomade.NC.NCCorrecionActividad("BN")
                        dt = oNCCorrecionActividad.ListarDocumentos(CTLG_CODE, SCSL_CODE, TIPO_ACT, Utilities.fechaLocal(F_DESDE),
                                                                    Utilities.fechaLocal(F_HASTA))
                        resb.Append("[")
                        If Not dt Is Nothing Then
                            For Each row As DataRow In dt.Rows
                                resb.Append("{")
                                resb.Append("""CODIGO"":" & """" & row("CODIGO").ToString & """,")
                                resb.Append("""DESC_SUCURSAL"":" & """" & row("DESC_SUCURSAL").ToString & """,")
                                resb.Append("""DESC_DCTO"":" & """" & row("DESC_DCTO").ToString & """,")
                                resb.Append("""NUM_DCTO"":" & """" & row("NUM_DCTO").ToString & """,")
                                resb.Append("""EMISION"":" & """" & row("EMISION").ToString & """,")
                                resb.Append("""VENCIMIENTO"":" & """" & row("VENCIMIENTO".ToString) & """,")
                                resb.Append("""RAZON_SOCIAL"":" & """" & row("RAZON_SOCIAL").ToString & """,")
                                resb.Append("""SIMBOLO_MONEDA"":" & """" & row("SIMBOLO_MONEDA").ToString & """,")
                                resb.Append("""TIPO_MONEDA"":" & """" & row("TIPO_MONEDA").ToString & """,")
                                resb.Append("""TOTAL"":" & """" & IIf(row("MONEDA").ToString = "0002", row("TOTAL").ToString, row("CONVERT_TOTAL").ToString) & """,")
                                resb.Append("""COMPLETO"":" & """" & row("COMPLETO").ToString & """,")
                                resb.Append("""ANULADO"":" & """" & row("ANULADO").ToString & """,")
                                resb.Append("""PROVISIONADO_DESC"":" & """" & row("PROVISIONADO_DESC").ToString & """,")
                                resb.Append("""EMPRESA"":" & """" & row("EMPRESA").ToString & """,")
                                resb.Append("""SUCURSAL"":" & """" & row("SUCURSAL").ToString & """,")
                                resb.Append("""PERIODO"":" & """" & row("PERIODO").ToString & """,")
                                resb.Append("""TIPO_DCTO"":" & """" & row("TIPO_DCTO").ToString & """,")
                                resb.Append("""PIDM"":""" & row("PIDM_VENDEDOR").ToString & """,")
                                resb.Append("""USUARIO"":""" & row("USUARIO").ToString & """,")
                                resb.Append("""ESTADO"" :" & """" & row("ESTADO_VENDEDOR").ToString & """,")
                                resb.Append("""NOMBRE_EMPLEADO"":""" & row("VENDEDOR").ToString & """")
                                resb.Append("},")
                            Next
                            resb.Append("{}")
                            resb.Replace(",{}", "")
                        End If
                        resb.Append("]")
                        res = resb.ToString()

                    ElseIf TIPO_ACT = "2" Then 'Lista Documentos de VENTAS

                        context.Response.ContentType = "application/json; charset=utf-8"
                        Dim oNCCorrecionActividad As New Nomade.NC.NCCorrecionActividad("BN")
                        dt = oNCCorrecionActividad.ListarDocumentos(CTLG_CODE, SCSL_CODE, TIPO_ACT, Utilities.fechaLocal(F_DESDE),
                                                                    Utilities.fechaLocal(F_HASTA))
                        resb.Append("[")
                        If Not dt Is Nothing Then
                            For Each row As DataRow In dt.Rows
                                resb.Append("{")
                                resb.Append("""CODIGO"":" & """" & row("CODE").ToString & """,")
                                resb.Append("""DOCUMENTO"":" & """" & row("NUM_DCTO").ToString & """,")
                                resb.Append("""EMISION"":" & """" & row("EMISION").ToString & """,")
                                resb.Append("""VENCIMIENTO"":" & """" & row("VENCIMIENTO").ToString & """,")
                                resb.Append("""CLIENTE"":" & """" & row("CLIENTE").ToString & """,")
                                resb.Append("""VENDEDOR"":" & """" & row("NOMBRE_VENDEDOR").ToString & """,")
                                resb.Append("""PIDM"":" & """" & row("PIDM").ToString & """,")
                                resb.Append("""USUARIO"":" & """" & row("VENDEDOR_USUA_ID").ToString & """,")
                                resb.Append("""COMPLETO"":" & """" & row("COMPLETO").ToString & """")
                                resb.Append("},")
                            Next
                            resb.Append("{}")
                            resb.Replace(",{}", "")
                        End If
                        resb.Append("]")
                        res = resb.ToString()

                    Else    'Lista Documentos de GASTOS

                        context.Response.ContentType = "application/json; charset=utf-8"
                        Dim oNCCorrecionActividad As New Nomade.NC.NCCorrecionActividad("BN")
                        dt = oNCCorrecionActividad.ListarDocumentos(CTLG_CODE, SCSL_CODE, TIPO_ACT, Utilities.fechaLocal(F_DESDE),
                                                                    Utilities.fechaLocal(F_HASTA))
                        resb.Append("[")
                        If Not dt Is Nothing Then
                            For Each row As DataRow In dt.Rows
                                resb.Append("{")
                                resb.Append("""CODE_APROB"":" & """" & row("GASTO_APROB_CODE").ToString & """,")
                                resb.Append("""CODIGO"":" & """" & row("CODIGO").ToString & """,")
                                resb.Append("""TIPO_DOC"":" & """" & row("DCTO_CODE").ToString & """,")
                                resb.Append("""DOCUMENTO"":" & """" & row("DCTO").ToString & """,")
                                resb.Append("""NRO_DOCUMENTO"":" & """" & row("SERIE_NRO_DOC").ToString & """,")
                                resb.Append("""DESCRIPCION"":" & """" & row("GASTO_DESC").ToString & """,")
                                resb.Append("""EMISION"":" & """" & row("FECHA_EMISION").ToString & """,")
                                resb.Append("""PIDM_BENEFICIARIO"":" & """" & row("PIDM_BENEF").ToString & """,")
                                resb.Append("""BENEFICIARIO"":" & """" & row("BENEFICIARIO").ToString & """,")
                                resb.Append("""IND_COMPRAS"":" & """" & row("IND_COMPRAS").ToString & """,")
                                resb.Append("""ANIO_TRIB"":" & """" & row("ANIO_TRIB").ToString & """,")
                                resb.Append("""MES_TRIB"":" & """" & row("MES_TRIB").ToString & """,")
                                resb.Append("""CONCEPTO"":" & """" & row("CONCEPTO").ToString & """,")
                                resb.Append("""ESTADO_GASTO"":" & """" & row("ESTADO_GASTO").ToString & """,")
                                resb.Append("""FECHA_VENCIMIENTO"":" & """" & row("FECHA_VENCIMIENTO").ToString & """,")
                                resb.Append("""FECHA_DETRA"":" & """" & row("FECHA_DETRA").ToString & """,")
                                resb.Append("""NUMERO_DETRA"":" & """" & row("NUMERO_DETRA").ToString & """,")
                                resb.Append("""ESTADO_GASTO_DESCRIPCION"":" & """" & row("ESTADO_GASTO_DESC").ToString & """")
                                resb.Append("},")
                            Next
                            resb.Append("{}")
                            resb.Replace(",{}", "")
                        End If
                        resb.Append("]")
                        res = resb.ToString()

                    End If


                Case "ADOC"

                    If TIPO_ACT = "1" Then

                        context.Response.ContentType = "application/json; charset=utf-8"

                        Dim CODE As String = context.Request("CODE")
                        Dim TIPO_DOC As String = context.Request("TIPO_DOC")
                        'Dim CODE_VENDEDOR As String = context.Request("CODE_VENDEDOR")
                        'Dim PIDM_VENDEDOR As String = context.Request("PIDM_VENDEDOR")
                        Dim SERIE_DOC As String = context.Request("SERIE_DOC")
                        Dim NRO_DOC As String = context.Request("NRO_DOC")
                        Dim F_EMISION As String = context.Request("F_EMISION")
                        Dim F_VENCIMIENTO As String = context.Request("F_VENCIMIENTO")
                        Dim F_DETRACCION As String = context.Request("F_DETRACCION")
                        Dim N_DETRACCION As String = context.Request("N_DETRACCION")

                        Dim oNCCorrecionActividad As New Nomade.NC.NCCorrecionActividad("BN")
                        Dim array As Array
                        array = oNCCorrecionActividad.ActualizarDocumento(CTLG_CODE, SCSL_CODE, TIPO_ACT, CODE, TIPO_DOC, "", "", SERIE_DOC, NRO_DOC,
                                                                          Utilities.fechaLocal(F_EMISION), Utilities.fechaLocal(F_VENCIMIENTO), Utilities.fechaLocal(F_DETRACCION),
                                                                          N_DETRACCION, String.Empty, String.Empty, String.Empty, String.Empty)

                        If Not (array Is Nothing) Then
                            resb.Append("[")
                            resb.Append("{")
                            resb.Append("""MENSAJE"" :" & """" & array(0).ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                            resb.Append("{}")
                            resb = resb.Replace(",{}", String.Empty)
                            resb.Append("]")
                        End If
                        res = resb.ToString()

                    ElseIf TIPO_ACT = "2" Then

                        context.Response.ContentType = "application/json; charset=utf-8"

                        Dim CODE As String = context.Request("CODE")
                        Dim CODE_VENDEDOR As String = context.Request("CODE_VENDEDOR")
                        Dim PIDM_VENDEDOR As String = context.Request("PIDM_VENDEDOR")
                        Dim SERIE_DOC As String = context.Request("SERIE_DOC")
                        Dim NRO_DOC As String = context.Request("NRO_DOC")
                        Dim F_EMISION As String = context.Request("F_EMISION")
                        Dim F_VENCIMIENTO As String = context.Request("F_VENCIMIENTO")
                        Dim F_DETRACCION As String = context.Request("F_DETRACCION")
                        Dim N_DETRACCION As String = context.Request("N_DETRACCION")

                        Dim oNCCorrecionActividad As New Nomade.NC.NCCorrecionActividad("BN")
                        Dim array As Array

                        array = oNCCorrecionActividad.ActualizarDocumento(CTLG_CODE, SCSL_CODE, TIPO_ACT, CODE, String.Empty, CODE_VENDEDOR, PIDM_VENDEDOR, SERIE_DOC, NRO_DOC,
                                                                          Utilities.fechaLocal(F_EMISION), Utilities.fechaLocal(F_VENCIMIENTO), Utilities.fechaLocal(F_DETRACCION),
                                                                          N_DETRACCION, String.Empty, String.Empty, String.Empty, String.Empty)

                        If Not (array Is Nothing) Then
                            resb.Append("[")
                            resb.Append("{")
                            resb.Append("""MENSAJE"" :" & """" & array(0).ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                            resb.Append("{}")
                            resb = resb.Replace(",{}", String.Empty)
                            resb.Append("]")
                        End If
                        res = resb.ToString()

                    Else

                        context.Response.ContentType = "application/json; charset=utf-8"

                        Dim CODE As String = context.Request("CODE")
                        Dim TIPO_DOC As String = context.Request("TIPO_DOC")
                        Dim SERIE_DOC As String = context.Request("SERIE_DOC")
                        Dim NRO_DOC As String = context.Request("NRO_DOC")
                        Dim F_EMISION As String = context.Request("F_EMISION")
                        Dim IND_COMPRAS As String = context.Request("IND_COMPRAS")
                        Dim ANIO_PERIODO As String = context.Request("ANIO_PERIODO")
                        Dim MES_PERIODO As String = context.Request("MES_PERIODO")
                        Dim CODE_APROB As String = context.Request("CODE_APROB")
                        Dim F_VENCIMIENTO As String = context.Request("F_VENCIMIENTO")
                        Dim F_DETRACCION As String = context.Request("F_DETRACCION")
                        Dim N_DETRACCION As String = context.Request("N_DETRACCION")

                        Dim oNCCorrecionActividad As New Nomade.NC.NCCorrecionActividad("BN")
                        Dim array As Array

                        array = oNCCorrecionActividad.ActualizarDocumento(CTLG_CODE, SCSL_CODE, TIPO_ACT, CODE, TIPO_DOC, String.Empty, String.Empty, SERIE_DOC, NRO_DOC,
                                                                          Utilities.fechaLocal(F_EMISION), Utilities.fechaLocal(F_VENCIMIENTO), Utilities.fechaLocal(F_DETRACCION),
                                                                          N_DETRACCION, IND_COMPRAS, ANIO_PERIODO, MES_PERIODO, CODE_APROB)

                        If Not (array Is Nothing) Then
                            resb.Append("[")
                            resb.Append("{")
                            resb.Append("""MENSAJE"" :" & """" & array(0).ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                            resb.Append("{}")
                            resb = resb.Replace(",{}", String.Empty)
                            resb.Append("]")
                        End If
                        res = resb.ToString()


                    End If

            End Select

            context.Response.Write(Res)

        Catch ex As Exception

        End Try


    End Sub



    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class