<%@ WebHandler Language="VB" Class="NCMTCAM" %>
Imports System
Imports System.Web
Imports System.Data

Public Class NCMTCAM : Implements IHttpHandler
    'Declaramos variables para usarlas en el proceso

    Dim resb As New StringBuilder


    Dim dt, dt2 As DataTable

    'Instanciamos las clases de Persona
    Dim P As New Nomade.FI.FIMonedas("bn")
    Dim res As String
    Dim opcion As String
    Dim cero As String = "0"
    Dim valorCode As String
    Dim valorcomprabase, DESDE, HASTA As String
    Dim valorventabase As String
    Dim valorcompralt As String
    Dim valorventalt As String
    Dim fecha As String
    Dim usuario As String
    Dim codbase As String
    Dim codalt As String
    Dim p_FECHA, p_HORA, p_TEMP, p_HMS, p_TIPO_CAMBIO As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        opcion = context.Request("opcion")
        valorCode = context.Request("CODE")
        valorcomprabase = context.Request("valorcomprabase")
        valorventabase = context.Request("valorventabase")
        valorcompralt = context.Request("valorcompralt")
        valorventalt = context.Request("valorventalt")
        fecha = context.Request("fecha")
        usuario = context.Request("usuario")
        codbase = context.Request("codbase")
        codalt = context.Request("codalt")
        DESDE = context.Request("DESDE")
        HASTA = context.Request("HASTA")
        p_FECHA = context.Request("p_FECHA")
        p_HORA = context.Request("p_HORA")
        p_TEMP = context.Request("p_TEMP")
        p_HMS = context.Request("p_HMS")
        p_TIPO_CAMBIO = context.Request("p_TIPO_CAMBIO")

        context.Response.ContentType = "application/json; charset=utf-8"


        Select Case opcion
            Case "1"
                dt = P.fDevuelveTCDia()

                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""COMPRA"" :" & """" & dt.Rows(0)("COMPRA") & """,")
                    resb.Append("""VENTA"" :" & """" & dt.Rows(0)("VENTA") & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()

                Else
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""COMPRA"" :" & """" & cero & """,")
                    resb.Append("""VENTA"" :" & """" & cero & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                End If
            Case "2"

                dt = P.fObtenerDescripcinMonedasTC

                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each nrow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CodParam"" :" & """" & nrow("CodParam").ToString & """,")
                        resb.Append("""Descripcion"" :" & """" & nrow("Descripcion").ToString & """,")
                        resb.Append("""Codigo"" :" & """" & nrow("CodMoneda").ToString & """")
                        resb.Append("}")
                        resb.Append(",")

                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")

                    res = resb.ToString()

                Else
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CodParam"" :" & """" & cero & """,")
                    resb.Append("""Descripcion"" :" & """" & cero & """,")
                    resb.Append("""Codigo"" :" & """" & cero & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                End If
            Case "3"
                context.Response.ContentType = "text/html"
                res = GrabarTC(valorcomprabase, valorventabase, valorcompralt, valorventalt, fecha, codbase, codalt, usuario)
            Case "3.5" 'DPORTA 26/02/2021
                context.Response.ContentType = "text/html"
                res = GrabarTCOficial(valorcomprabase, valorventabase, valorcompralt, valorventalt, fecha, codbase, codalt, usuario)
            Case "4"
                context.Response.ContentType = "text/html"
                res = fObtenerFechaVigente()

            Case "6" ' Obtiene tabla con documentos de venta
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim oTC As New Nomade.FI.FIMonedas("bn")
                dt = oTC.fListarTipoCambioAll(Utilities.fechaLocal(DESDE), Utilities.fechaLocal(HASTA))
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""FechaVigencia"":""" & MiDataRow("FECHAVIGENCIA").ToString & """,")
                        'resb.Append("""FechaVigencia"":{""display"":""" & MiDataRow("FECHAVIGENCIA").ToString & """,""order"":""" & MiDataRow("FECHAVIGENCIA").ToString & """},")
                        resb.Append("""Codigomoneda"":""" & MiDataRow("CODIGOMONEDA").ToString & """,")
                        resb.Append("""descripcion"":""" & MiDataRow("DESCRIPCION").ToString & """,")
                        resb.Append("""valorcompra"":""" & MiDataRow("COMPRA").ToString & """,")
                        resb.Append("""valorventa"":""" & MiDataRow("VENTA").ToString & """,")
                        resb.Append("""ULTIMO_IND"":""" & MiDataRow("ULTIMO_IND").ToString & """,")
                        resb.Append("""tipocambio"":""" & MiDataRow("TIPOCAMBIO").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()

            Case "8"
                context.Response.ContentType = "text/html"
                'P.fInserarTipoCambio()
                res = fActualizarTipoCambio(valorcompralt, valorventalt, fecha, usuario, p_HMS, p_TIPO_CAMBIO)
            Case "8.5" 'Es un artificio auxiliar cuando no se ha guardado el último tipo de cambio del día
                context.Response.ContentType = "text/html"
                'P.fInserarTipoCambio()
                res = fActualizarUltimoIndicador("S")
            Case "7" ' LISTA VALOR CAMBIO UNICO
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim oTC As New Nomade.FI.FIMonedas("bn")
                dt = oTC.fListarTipoCambio_Unico(Utilities.fechaLocal(p_FECHA), IIf(p_HORA = "", Nothing, p_HORA), IIf(p_TEMP = "", Nothing, p_TEMP))
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""FECHA_VIGENTE"" :" & """" & MiDataRow("FECHA_VIGENTE").ToString & """,")
                        resb.Append("""VALOR_CAMBIO_COMPRA"" :" & """" & MiDataRow("VALOR_CAMBIO_COMPRA").ToString & """,")
                        resb.Append("""VALOR_CAMBIO_VENTA"" :" & """" & MiDataRow("VALOR_CAMBIO_VENTA").ToString & """,")
                        resb.Append("""USUARIO"" :" & """" & MiDataRow("USUARIO").ToString & """,")
                        resb.Append("""ULTIMO_IND"" :" & """" & MiDataRow("ULTIMO_IND").ToString & """,")
                        resb.Append("""HMS"" :" & """" & MiDataRow("HMS").ToString & """,")
                        resb.Append("""TIPO_CAMBIO"" :" & """" & MiDataRow("TIPO_CAMBIO").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "TC"
                Dim resulta As String = ""
                Dim contador = 0
                While Not (resulta.Equals("OK")) And contador < 2
                    Try
                        Dim tcam As Nomade.FI.SWTipoCambio = New Nomade.FI.SWTipoCambio("BN")
                        resulta = "" ' tcam.fGeneraTipoCambio()
                    Catch ex As Exception
                        resulta = ""
                    End Try
                    contador += 1
                End While
                res = resulta

        End Select

        context.Response.Write(res)

    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property


    Public Function GrabarTC(ByVal pTCCompraBase As String, ByVal pTCVentaBase As String, ByVal pTCCompraAlt As String, ByVal pTCVentaAlt As String, ByVal pTCFecha As String,
                        ByVal pTCCodBase As String, ByVal pTCCodAlt As String, ByVal pUsuario As String) As String

        Dim datos As String

        'datos = P.fInserarTipoCambio(pTCCodAlt, Utilities.fechaLocal(fecha), pTCCompraBase, pTCVentaBase, pUsuario, "OFICIAL") ' Se inserta el tipo de cambio base
        datos = P.fInserarTipoCambio(pTCCodAlt, Utilities.fechaLocal(fecha), pTCCompraAlt, pTCVentaAlt, pUsuario, "INTERNO") ' Se inserta el tipo de cambio base

        Return datos


    End Function
    'DPORTA 26/02/2021
    Public Function GrabarTCOficial(ByVal pTCCompraBase As String, ByVal pTCVentaBase As String, ByVal pTCCompraAlt As String, ByVal pTCVentaAlt As String, ByVal pTCFecha As String,
                    ByVal pTCCodBase As String, ByVal pTCCodAlt As String, ByVal pUsuario As String) As String

        Dim datos As String

        datos = P.fInserarTipoCambio(pTCCodAlt, Utilities.fechaLocal(fecha), pTCCompraBase, pTCVentaBase, pUsuario, "OFICIAL") ' Se inserta el tipo de cambio base

        Return datos


    End Function

    Public Function fActualizarTipoCambio(ByVal pTCCompraAlt As String, ByVal pTCVentaAlt As String, ByVal pTCFecha As String, ByVal pUsuario As String, ByVal p_HMS As String, ByVal p_TIPO_CAMBIO As String) As String

        Dim datos As String

        datos = P.fActualizarTipoCambio(pTCCompraAlt, pTCVentaAlt, Utilities.fechaLocal(pTCFecha), pUsuario, p_HMS, p_TIPO_CAMBIO)

        Return datos


    End Function

    Public Function fActualizarUltimoIndicador(ByVal pIndicador As String) As String

        Dim datos As String

        datos = P.fActualizarUltimoIndicador(pIndicador)

        Return datos


    End Function
    Public Function fObtenerFechaVigente() As String
        Try
            Return Convert.ToDateTime(Date.Now).ToString("dd/MM/yyyy")

        Catch ex As Exception
            Throw ex
        End Try
    End Function

End Class