<%@ WebHandler Language="VB" Class="CAMCPOS" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CAMCPOS : Implements IHttpHandler

    Dim flag, res As String
    Dim resb As New StringBuilder
    Dim sb As New StringBuilder
    Dim dt As DataTable
    Dim empresapidm As String
    Dim codigo As String
    Dim empresa As String
    Dim establecimiento As String
    Dim moneda As String
    Dim pos As String
    Dim numero As String
    Dim fecha As String
    Dim monto_cierre As String
    Dim detalle As String
    Dim usuario As String
    Dim ttransaccion As String
    Dim operador As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"

        flag = context.Request("flag")
        empresapidm = context.Request("empresapidm")
        codigo = context.Request("codigo")
        empresa = context.Request("empresa")
        establecimiento = context.Request("establecimiento")
        moneda = context.Request("moneda")
        pos = context.Request("pos")
        numero = context.Request("numero")
        fecha = context.Request("fecha")
        If fecha <> String.Empty Then
            fecha = Utilities.fechaLocal(context.Request("fecha"))
        End If
        monto_cierre = context.Request("monto_cierre")
        detalle = context.Request("detalle")
        usuario = context.Request("usuario")
        ttransaccion = context.Request("ttransaccion")
        operador = context.Request("operador")

        Try

            Select Case flag.ToString()

                Case "1"
                    Dim p As New Nomade.NC.NCPOS("Bn")
                    res = p.CerrarLotePos(numero, fecha, monto_cierre, pos, moneda, empresa, establecimiento, detalle, usuario, ttransaccion)
                    Dim parts() As String = res.Split("-")
                    Dim CodMovBanc As String = parts(1)
                    Dim CodMovPos As String = parts(2)

                    Dim oCTGeneracionAsientos As New Nomade.CT.CTGeneracionAsientos()
                    Dim strCodAsientoCierrePos As String
                    strCodAsientoCierrePos = oCTGeneracionAsientos.GenerarAsientoCierrePos(CodMovBanc, CodMovPos)
                    Dim strCodAsientoITF As String
                    strCodAsientoITF = oCTGeneracionAsientos.GenerarAsientoITF(CodMovBanc, CodMovPos, "")

                Case "ld"
                    Dim p As New Nomade.NC.NCPOS("Bn")
                    resb.Append("[")
                    For Each mcod As String In detalle.Split(",")

                        dt = p.ListarMovPOS(mcod, String.Empty, "P", "", String.Empty, String.Empty, "", "", "N", "S")
                        If Not dt Is Nothing Then

                            For Each row As DataRow In dt.Rows

                                resb.Append("{")
                                resb.Append("""CODIGO_MCAJA"":""" & row("MCAJ_CODE").ToString & """,")
                                resb.Append("""DOCUMENTO"":{""valor"":""" & row("DOCUMENTO").ToString & """,""codigo"":""" & row("DOCUMENTO_CODE").ToString & """},")
                                resb.Append("""FECHA"":{""display"":""" & row("FECHA_OPERACION").ToString & """,""order"":""" & String.Join("", row("FECHA_OPERACION").ToString.Split("/").Reverse()) & """},")
                                resb.Append("""CLIENTE"":{""valor"":""" & row("CLIENTE").ToString & """,""codigo"":""" & row("CLIE_PIDM").ToString & """},")
                                resb.Append("""BANCO"":{""valor"":""" & row("BANCO").ToString & """,""codigo"":""" & row("BANC_CODE").ToString & """},")
                                resb.Append("""MARCA"":{""valor"":""" & row("MARCA").ToString & """,""codigo"":""" & row("MARCA_CODE").ToString & """},")
                                resb.Append("""ULT_DIGITOS"":""" & row("ULT_DIGITOS").ToString & """,")
                                resb.Append("""CODIGO_AUTORIZACION"":""" & row("CODIGO_AUTORIZACION").ToString & """,")
                                resb.Append("""TIPO_TRAN_IND"":""" & row("TIPO_TRAN_IND").ToString & """,")
                                resb.Append("""MONTO"":""" & row("MONTO").ToString & """")
                                resb.Append("},")

                            Next

                        End If


                    Next
                    resb.Append("-")
                    resb.Replace("},-", "}")
                    resb.Append("]")
                    res = resb.ToString()

                Case "L"
                    Dim P As New Nomade.NC.NCPOS("Bn")



                    dt = P.ListarCierreLote(pos, moneda)

                    If Not dt Is Nothing Then
                        sb.Append("[")

                        For Each row As DataRow In dt.Rows
                            sb.Append("{")
                            sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            sb.Append("""NUMERO"":""" & row("NUMERO").ToString & """,")
                            sb.Append("""FECHA"":{""display"":""" & row("FECHA").ToString & """,""order"":""" & String.Join("", row("FECHA").ToString.Split("/").Reverse()) & """},")
                            sb.Append("""MONTO_CIERRE"":""" & row("MONTO_CIERRE").ToString & """,")
                            sb.Append("""USUARIO"":""" & row("USUARIO").ToString & """,")
                            sb.Append("""DETALLE"":""" & row("DETALLE").ToString & """,")
                            sb.Append("""COMISIONES"":""" & row("TOTAL_COMISIONES").ToString & """,")
                            sb.Append("""IMPORTE_ABONADO"":""" & row("IMPORTE_ABONADO").ToString & """,")
                            sb.Append("""CANTIDAD_ORDENES"":""" & row("CANTIDAD_ORDENES").ToString & """,")
                            sb.Append("""DESCUENTOS"":""" & row("DESCUENTOS").ToString & """")
                            sb.Append("},")

                        Next
                        sb.Append("-")
                        sb.Replace("},-", "}")

                        sb.Append("]")

                    End If
                    res = sb.ToString()

                Case "3"
                    Dim p As New Nomade.NC.NCPOS("Bn")
                    dt = p.ListarMovPOS(String.Empty, String.Empty, "P", moneda, String.Empty, String.Empty, "", pos)
                    If Not dt Is Nothing Then
                        resb.Append("[")

                        For Each row As DataRow In dt.Rows

                            resb.Append("{")
                            resb.Append("""CODIGO_MCAJA"":""" & row("MCAJ_CODE").ToString & """,")
                            resb.Append("""DOCUMENTO"":{""valor"":""" & row("DOCUMENTO").ToString & """,""codigo"":""" & row("DOCUMENTO_CODE").ToString & """},")
                            resb.Append("""FECHA"":{""display"":""" & row("FECHA_OPERACION").ToString & """,""order"":""" & String.Join("", row("FECHA_OPERACION").ToString.Split("/").Reverse()) & """},")
                            resb.Append("""CLIENTE"":{""valor"":""" & row("CLIENTE").ToString & """,""codigo"":""" & row("CLIE_PIDM").ToString & """},")
                            resb.Append("""BANCO"":{""valor"":""" & row("BANCO").ToString & """,""codigo"":""" & row("BANC_CODE").ToString & """},")
                            resb.Append("""MARCA"":{""valor"":""" & row("MARCA").ToString & """,""codigo"":""" & row("MARCA_CODE").ToString & """},")
                            resb.Append("""ULT_DIGITOS"":""" & row("ULT_DIGITOS").ToString & """,")
                            resb.Append("""CODIGO_AUTORIZACION"":""" & row("CODIGO_AUTORIZACION").ToString & """,")
                            resb.Append("""TIPO_TRAN_IND"":""" & row("TIPO_TRAN_IND").ToString & """,")
                            resb.Append("""MONTO"":""" & row("MONTO").ToString & """")
                            resb.Append("},")

                        Next
                        resb.Append("-")
                        resb.Replace("},-", "}")

                        resb.Append("]")
                        res = resb.ToString()
                    Else

                    End If



                Case "4"
                    Dim p As New Nomade.NC.NCPOS("Bn")
                    dt = p.ListarPOS("", empresa, establecimiento, "", "A")
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "codigo", "DESCRIPCION", "POS")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "codigo", "DESCRIPCION", "POS")
                    End If

                Case "5"
                    Dim p As New Nomade.NC.NCEmpresa("BN")
                    dt = p.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "codigo", "descripcion", "EMPRESA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "codigo", "descripcion", "EMPRESA")
                    End If

                Case "V1"
                    Dim p As New Nomade.NC.NCPOS("Bn")
                    dt = p.ListarAjuste("", "", Nothing, Nothing, empresa, moneda, operador)
                    If Not dt Is Nothing Then
                        res = dt.Rows(0)("FECHA_INICIO") & "|" & dt.Rows(0)("FECHA_FIN")
                    Else
                        res = ""
                    End If

                Case "V2"
                    Dim p As New Nomade.NC.NCPOS("Bn")
                    dt = p.ListarAjuste("", "", Nothing, Nothing, empresa, moneda, operador, fecha)
                    If dt Is Nothing Then
                        res = "OK"
                    Else
                        res = "NO"
                    End If

                Case "M"
                    Dim p As New Nomade.NC.NCMonedas("BN")
                    dt = p.ListarMoneda(codigo, String.Empty, "A")
                    res = dt.Rows(0)("Simbolo").ToString

                Case "MO"
                    Dim p As New Nomade.GL.GLLetras("Bn")
                    dt = p.ListarMoneda(empresa)
                    res = GenerarSelect(dt, "codigo", "descripcion", "MONEDA")

            End Select

            context.Response.Write(res)

        Catch ex As Exception

            context.Response.Write("error" & ex.ToString)

        End Try


    End Sub

    Public Function GenerarSelect(ByVal dt As DataTable, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then

            res = "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                If clase = "EMPRESA" Then
                    res += "<option pidm=""" & dt.Rows(i)("PIDM").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                Else
                    If clase = "POS" Then
                        res += "<option codOpe=""" & dt.Rows(i)("CODIGO_OPERADOR") & """ moneda=""" & dt.Rows(i)("MONEDA") & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                    Else
                        If clase = "MONEDA" Then
                            res += "<option tipo=""" & dt.Rows(i)("TIPO").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                        Else
                            If clase = "CAJA" Then
                                res += "<option monto=""" & dt.Rows(i)("MONTOCAJA").ToString() & """codigo=""" & dt.Rows(i)("CODIGO_APERTURA").ToString() & """ stbl=""" & dt.Rows(i)("SUCURSAL").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & " - SD: S/." & dt.Rows(i)("MONTOCAJA").ToString() & "</option>"
                            Else
                                If dt.Rows(i)(chtml).ToString() <> String.Empty Then
                                    res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                                End If

                            End If
                        End If
                    End If
                End If
            Next

        Else
            res = "error"
        End If
        Return res
    End Function



    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function



    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class