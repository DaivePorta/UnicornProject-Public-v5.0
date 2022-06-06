<%@ WebHandler Language="VB" Class="NOMCOTI" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NOMCOTI : Implements IHttpHandler
    Dim OPCION, TIPO_COTI_BS, CODE_MONEDA, IND_COMPLETADO, p_CORREOS, CONDICIONES, p_PROV_CORREOS, p_COD_REQ, ALMACENABLE, TIPO_COTI, COD_ANTIGUO, EST_IND, EST_COTI, TIPO, DESC, USUA_ID, FECHA_TRAN, TIPO_PROV, SCSL_CODE, CTLG_CODE, DATA, CODIGO, EST_COMPLE As String


    Dim dt As DataTable


    Dim res As String
    Dim resb As New StringBuilder

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        EST_IND = context.Request("EST_IND")
        TIPO = context.Request("TIPO")
        DESC = context.Request("DESC")
        USUA_ID = context.Request("USUA_ID")
        FECHA_TRAN = context.Request("FECHA_TRAN")
        TIPO_PROV = context.Request("TIPO_PROV")

        SCSL_CODE = context.Request("SCSL_CODE")
        CTLG_CODE = context.Request("CTLG_CODE")
        DATA = context.Request("DATA")
        CODIGO = context.Request("CODIGO")
        EST_COMPLE = context.Request("EST_COMPLE")
        TIPO_COTI = context.Request("TIPO_COTI")
        COD_ANTIGUO = context.Request("COD_ANTIGUO")
        TIPO_COTI_BS = context.Request("TIPO_COTI_BS")
        CONDICIONES = context.Request("CONDICIONES")
        ALMACENABLE = context.Request("ALMACENABLE")
        p_COD_REQ = context.Request("p_COD_REQ")
        p_PROV_CORREOS = context.Request("p_PROV_CORREOS")
        p_CORREOS = context.Request("p_CORREOS")
        CODE_MONEDA = context.Request("CODE_MONEDA")
        IND_COMPLETADO = context.Request("IND_COMPLETADO")



        Select Case OPCION


            Case "0" ' lista cabecera solicitud cotizacion
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim CORegistroCotizacion As New Nomade.CO.CORegistroCotizacion("Bn")
                dt = CORegistroCotizacion.Listar_Solicitud_Cotizacion(IIf(CODIGO = Nothing, "", CODIGO), "A", "CABECERA", IIf(CTLG_CODE = Nothing, "", CTLG_CODE), IIf(SCSL_CODE = Nothing, "", SCSL_CODE), IIf(TIPO_PROV = Nothing, "", TIPO_PROV), IIf(EST_COMPLE = Nothing, "", EST_COMPLE), IIf(TIPO_COTI = Nothing, "", TIPO_COTI), IIf(TIPO_COTI_BS = Nothing, "", TIPO_COTI_BS))
                If Not dt Is Nothing Then
                    resb.Append("[")

                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"":" & """" & row("CODIGO").ToString & """,")
                        resb.Append("""NRO_SOLICITUD"":" & """" & row("NRO_SOLICITUD").ToString & """,")
                        resb.Append("""CTLG_CODE"":" & """" & row("CTLG_CODE").ToString & """,")
                        resb.Append("""SCSL_CODE"":" & """" & row("SCSL_CODE").ToString & """,")
                        resb.Append("""DESCRIPCION"":" & """" & row("DESCRIPCION").ToString & """,")
                        resb.Append("""FECHA_TRAN"":" & """" & row("FECHA_TRAN").ToString & """,")
                        resb.Append("""TIPO_PROV"":" & """" & row("TIPO_PROV").ToString & """,")
                        resb.Append("""DESC_CTLG"":" & """" & row("DESC_CTLG").ToString & """,")
                        resb.Append("""EST_COMPLETADO"":" & """" & row("EST_COMPLETADO").ToString & """,")
                        resb.Append("""DESC_EST_COMPLETADO"":" & """" & row("DESC_EST_COMPLETADO").ToString & """,")
                        resb.Append("""CONDICIONES"":" & """" & row("CONDICIONES").ToString & """,")
                        resb.Append("""TIPO_COTI_BS"":" & """" & row("TIPO_COTI_BS").ToString & """,")
                        resb.Append("""DESC_TIPO_SOL"":" & """" & row("DESC_TIPO_SOL").ToString & """,")
                        resb.Append("""COD_REQ"":" & """" & row("COD_REQ").ToString & """,")
                        resb.Append("""DESC_SCSL"":" & """" & row("DESC_SCSL").ToString & """,")
                        resb.Append("""CODIGO_REQ"":" & """" & row("CODIGO_REQ").ToString & """,")
                        resb.Append("""CORREOS"":" & """" & row("CORREOS").ToString & """,")
                        resb.Append("""PROV_CORREOS"":" & """" & row("PROV_CORREOS").ToString & """")
                        resb.Append("},")
                    Next

                    resb.Append("-")
                    resb.Replace("},-", "}")

                    resb.Append("]")
                End If
                res = resb.ToString()
                CORegistroCotizacion = Nothing
            Case "1" ' lista tipo prov 
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim NCEProveedor As New Nomade.NC.NCEProveedor("Bn")
                dt = NCEProveedor.Listar_Proveedor_Grupo("", EST_IND, TIPO)
                If Not dt Is Nothing Then
                    resb.Append("[")

                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"":" & """" & row("CODIGO").ToString & """,")
                        resb.Append("""NOMBRE"":" & """" & row("NOMBRE").ToString & """,")
                        resb.Append("""DESCRIPCION"":" & """" & row("DESCRIPCION").ToString & """,")
                        resb.Append("""NESTADO"":" & """" & row("NESTADO").ToString & """")
                        resb.Append("},")
                    Next

                    resb.Append("-")
                    resb.Replace("},-", "}")

                    resb.Append("]")
                End If
                res = resb.ToString()
                NCEProveedor = Nothing
            Case "2" ' lista detalle solicitud cotizacion 
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim CORegistroCotizacion As New Nomade.CO.CORegistroCotizacion("Bn")
                dt = CORegistroCotizacion.Listar_Solicitud_Cotizacion(IIf(CODIGO = Nothing, "", CODIGO), "A", "DETALLE", IIf(CTLG_CODE = Nothing, "", CTLG_CODE), IIf(SCSL_CODE = Nothing, "", SCSL_CODE), IIf(TIPO_PROV = Nothing, "", TIPO_PROV), IIf(EST_COMPLE = Nothing, "", EST_COMPLE), IIf(TIPO_COTI = Nothing, "", TIPO_COTI), IIf(TIPO_COTI_BS = Nothing, "", TIPO_COTI_BS))
                If Not dt Is Nothing Then
                    resb.Append("[")

                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO_PRODUCTO"":" & """" & row("COD_PROD").ToString & """,")
                        resb.Append("""CANTIDAD_PEDIDA"":" & """" & row("CANTIDAD").ToString & """,")
                        resb.Append("""CANTIDAD"":" & """" & row("CANTIDAD").ToString & """,")
                        resb.Append("""PRECIO"":" & """" & row("PRECIO_REF").ToString & """,")
                        resb.Append("""PRECIO_"":" & """" & row("PRECIO").ToString & """,")
                        resb.Append("""DETRACCION"":" & """" & row("DETRACCION").ToString & """,")
                        resb.Append("""COD_REQ"":" & """" & row("COD_REQ").ToString & """,")
                        resb.Append("""PROD_DESC"":" & """" & row("DESC_PROD").ToString & """,")
                        resb.Append("""DESC_PRODUCTO"":" & """" & row("DESC_PROD").ToString & """")
                        resb.Append("},")
                    Next

                    resb.Append("-")
                    resb.Replace("},-", "}")

                    resb.Append("]")
                End If
                res = resb.ToString()
                CORegistroCotizacion = Nothing
            Case "SENDMAIL"
                context.Request.ContentType = "text/plain"
                Dim mail As New Nomade.Mail.NomadeMail("BN")

                Dim TABLA As String = context.Request("TABLA")
                Dim remitente As String = context.Request("REMITENTE")
                Dim nremitente As String = context.Request("NREMITENTE")
                Dim destinatarios As String = context.Request("DESTINATARIOS")
                Dim asunto As String = context.Request("ASUNTO")
                Dim CUERPO As String = context.Request("CUERPO")
                System.Configuration.ConfigurationManager.AppSettings("HTML_DETALLES_CORREO_COTIZACION") = CUERPO
                Dim HTML_TABLA_CORREO As String = System.Configuration.ConfigurationManager.AppSettings("HTML_DETALLES_CORREO_COTIZACION")
                CUERPO = Replace(CUERPO, "|", "<")
                CUERPO = Replace(CUERPO, "?", ">")
                mail.enviar(remitente, nremitente, destinatarios, asunto, CUERPO)
                res = "OK"
            Case "4"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim Prod As New Nomade.NM.NMGestionProductos("Bn")
                Dim filtrotypeahead As String
                filtrotypeahead = context.Request("q")
                dt = Prod.LISTAR_PRODUCTO("", IIf(filtrotypeahead = Nothing, "", filtrotypeahead), "", IIf(COD_ANTIGUO = Nothing, "", COD_ANTIGUO), "", CTLG_CODE, ALMACENABLE, "", "", SCSL_CODE)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO_ANTIGUO"" :" & """" & MiDataRow("CODIGO_ANTIGUO").ToString & """,")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""UNIDAD"" :" & """" & MiDataRow("UNIDAD").ToString & """,")
                        resb.Append("""NO_SERIADA"" :" & """" & MiDataRow("NO_SERIADA").ToString & """,")
                        resb.Append("""DESC_ADM"" :" & """" & MiDataRow("DESC_ADM").ToString & """,")
                        resb.Append("""SERVICIO"" :" & """" & MiDataRow("SERVICIO").ToString & """,")
                        resb.Append("""DESC_EXISTENCIA"" :" & """" & MiDataRow("DESC_EXISTENCIA").ToString & """,")
                        resb.Append("""MARCA"" :" & """" & MiDataRow("MARCA").ToString & """,")
                        resb.Append("""MODELO"" :" & """" & MiDataRow("MODELO").ToString & """,")
                        resb.Append("""STOCK"" :" & """" & MiDataRow("STOCK").ToString & """,")
                        resb.Append("""DESC_UNIDAD_DESPACHO"" :" & """" & MiDataRow("DESC_UNIDAD_DESPACHO").ToString & """,")
                        resb.Append("""DETRACCION"" :" & """" & MiDataRow("DETRACCION").ToString & """,")
                        resb.Append("""MANUFACTURADA"" :" & """" & MiDataRow("MANUFACTURADA").ToString & """,")
                        resb.Append("""PRECIO"" :" & """" & MiDataRow("PRECIO").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "5" ' lista el REQ servicio 
                Dim CORegistroCompras As New Nomade.CO.CORegistroCompras("Bn")
                dt = CORegistroCompras.Listar_Req_Usua_Servicio("", IIf(CTLG_CODE = Nothing, "", CTLG_CODE), IIf(SCSL_CODE = Nothing, "", SCSL_CODE), If(FECHA_TRAN = "", Nothing, Utilities.fechaLocal(FECHA_TRAN)), "A", "A")
                If Not dt Is Nothing Then
                    resb.Append("[")

                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""DESC_PRODUCTO"":""" & row("PRODUCTO").ToString & """,")
                        resb.Append("""CODIGO_PRODUCTO"":""" & row("CODIGO").ToString & """,")
                        resb.Append("""CANTIDAD_PEDIDA"":""" & row("CANTIDAD").ToString & """,")
                        resb.Append("""PRECIO_"":""" & row("PRECIO").ToString & """,")
                        resb.Append("""COD_REQ"":" & """" & row("COD_REQ").ToString & """,")
                        resb.Append("""PRECIO"":""" & row("PRECIO").ToString & """")


                        resb.Append("},")
                    Next

                    resb.Append("-")
                    resb.Replace("},-", "}")

                    resb.Append("]")
                End If
                res = resb.ToString()
                CORegistroCompras = Nothing
            Case "G" 'CREA SOLICITUD COTIZACION
                context.Response.ContentType = "text/html"
                res = Crear_Sol_Cotizacion(CTLG_CODE, SCSL_CODE, DATA, DESC, If(FECHA_TRAN = "", Nothing, Utilities.fechaLocal(FECHA_TRAN)), USUA_ID, TIPO_PROV, TIPO_COTI, CONDICIONES, TIPO_COTI_BS, p_COD_REQ, p_PROV_CORREOS, p_CORREOS, CODE_MONEDA, IND_COMPLETADO)
                CODIGO = res
                Dim COD_COTI = res
                res = ""
                CODIGO = CODIGO.Substring(5)
                res = Completar_Sol_Cotizacion(CODIGO, TIPO_PROV, USUA_ID)
                res = res + ";" + COD_COTI

            Case "GD" 'CREA SOLICITUD COTIZACION DIRECTA
                context.Response.ContentType = "text/html"
                res = Crear_Sol_Cotizacion(CTLG_CODE, SCSL_CODE, DATA, DESC, If(FECHA_TRAN = "", Nothing, Utilities.fechaLocal(FECHA_TRAN)), USUA_ID, TIPO_PROV, TIPO_COTI, CONDICIONES, TIPO_COTI_BS, p_COD_REQ, p_PROV_CORREOS, p_CORREOS, CODE_MONEDA, IND_COMPLETADO)
                'CODIGO = res
                'Dim COD_COTI = res
                'res = ""
                'CODIGO = CODIGO.Substring(5)
                ''res = Completar_Sol_Cotizacion(CODIGO, TIPO_PROV, USUA_ID)
                'res = CODIGO

            Case "A" 'ACTUALIZA SOLICITUD COTIZACION
                context.Response.ContentType = "text/html"
                res = Actualiza_Sol_Cotizacion(CTLG_CODE, SCSL_CODE, DATA, DESC, If(FECHA_TRAN = "", Nothing, Utilities.fechaLocal(FECHA_TRAN)), USUA_ID, TIPO_PROV, CODIGO, CONDICIONES, CODE_MONEDA)
            Case "C" 'COMPLETAR SOLICITUD COTIZACION
                context.Response.ContentType = "text/html"
                res = Completar_Sol_Cotizacion(CODIGO, TIPO_PROV, USUA_ID)
            Case Else
        End Select
        context.Response.Write(res)
    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property


    Public Function Crear_Sol_Cotizacion(ByVal p_CTLG_CODE As String,
                                         ByVal p_SCSL_CODE As String,
                                         ByVal p_DETALLE As String,
                                         ByVal p_DESCRIPCION As String,
                                         ByVal p_FECHA_TRAN As String,
                                         ByVal p_USUA_ID As String,
                                         ByVal p_TIPO_PROV As String,
                                         ByVal p_TIPO_COTI As String,
                                         ByVal p_CONDICIONES As String,
                                         ByVal p_TIPO_COTI_BS As String,
                                         p_COD_REQ As String,
                                         p_PROV_CORREOS As String,
                                         p_CORREOS As String,
                                         p_MONEDA As String,
                                         p_IND_COMPLETADO As String) As String
        Dim resp = ""
        Dim CORegistroCotizacion As New Nomade.CO.CORegistroCotizacion("Bn")
        resp = CORegistroCotizacion.Crear_sol_cotizacion(p_CTLG_CODE, p_SCSL_CODE, p_DETALLE, p_DESCRIPCION, p_FECHA_TRAN, p_USUA_ID, p_TIPO_PROV, p_TIPO_COTI, p_CONDICIONES, p_TIPO_COTI_BS, p_COD_REQ, p_PROV_CORREOS, p_CORREOS, p_MONEDA, p_IND_COMPLETADO)
        Return resp
        CORegistroCotizacion = Nothing
    End Function

    Public Function Completar_Sol_Cotizacion(ByVal p_CODIGO As String, ByVal p_CODIGO_GRUP_PROV As String, ByVal p_USUA_ID As String) As String
        Dim resp(3) As String
        Dim CORegistroCotizacion As New Nomade.CO.CORegistroCotizacion("Bn")
        resp = CORegistroCotizacion.Completar_sol_cotizacion(p_CODIGO, p_CODIGO_GRUP_PROV, p_USUA_ID)
        Return resp(0) + ";" + resp(1) + ";" + resp(2) + ";" + resp(3)
        CORegistroCotizacion = Nothing
    End Function


    Public Function Actualiza_Sol_Cotizacion(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_DETALLE As String, ByVal p_DESCRIPCION As String, ByVal p_FECHA_TRAN As String, ByVal p_USUA_ID As String, ByVal p_TIPO_PROV As String, ByVal p_CODIGO As String, ByVal p_CONDICIONES As String, ByVal p_MONEDA As String) As String
        Dim resp = ""
        Dim CORegistroCotizacion As New Nomade.CO.CORegistroCotizacion("Bn")
        resp = CORegistroCotizacion.Actualizar_sol_cotizacion(p_CTLG_CODE, p_SCSL_CODE, p_DETALLE, p_DESCRIPCION, p_FECHA_TRAN, p_USUA_ID, p_TIPO_PROV, p_CODIGO, p_CONDICIONES, p_MONEDA)
        Return resp
        CORegistroCotizacion = Nothing
    End Function

End Class