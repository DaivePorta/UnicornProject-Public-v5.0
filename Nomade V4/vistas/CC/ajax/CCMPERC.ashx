<%@ WebHandler Language="VB" Class="CCMPERC" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CCMPERC : Implements IHttpHandler

    Dim OPCION As String
    Dim p_PERS_PIDM, p_CTLG_CODE, p_USUA_ID, p_FAB_CODE, p_MONTO, p_INTERES, p_PAGO_CODE As String

    Dim p_NRO, p_FECHA_TRANSACCION, p_FECHA_PAGO, p_MODO_PAGO, p_CUENTA_ORIGEN, p_NRO_CHEQUE, p_CUENTA_DESTINO As String

    Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
    Dim ncSucursal As New Nomade.NC.NCSucursal("Bn")
    Dim glLetras As New Nomade.GL.GLLetras("Bn")
    Dim ncCaja As New Nomade.NC.NCCaja("Bn")
    Dim ccPercepcion As New Nomade.CC.CCPercepcion("Bn")
    Dim ncCuentaBancaria As New Nomade.NC.NCCuentaBancaria("Bn")

    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")

        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_PERS_PIDM = context.Request("p_PERS_PIDM")

        p_FECHA_TRANSACCION = context.Request("p_FECHA_TRANSACCION")
        p_FECHA_PAGO = context.Request("p_FECHA_PAGO")
        p_MODO_PAGO = context.Request("p_MODO_PAGO")
        p_CUENTA_ORIGEN = context.Request("p_CUENTA_ORIGEN")
        p_NRO_CHEQUE = context.Request("p_NRO_CHEQUE")
        p_CUENTA_DESTINO = context.Request("p_CUENTA_DESTINO")
        p_NRO = context.Request("p_NRO")


        p_PAGO_CODE = context.Request("p_PAGO_CODE")
        p_FAB_CODE = context.Request("p_FAB_CODE")
        p_MONTO = context.Request("p_MONTO")
        p_INTERES = context.Request("p_INTERES")

        If p_PERS_PIDM = "" Or p_PERS_PIDM Is Nothing Then
            p_PERS_PIDM = "0"
        End If

        Try
            Select Case OPCION
                Case "0" 'lista empresas
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncEmpresa.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "1" 'Generar tabla percepciones
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = ccPercepcion.ListarPercepciones("", Nothing, Nothing, "E", p_CTLG_CODE)
                    res = GenerarTablaPercepciones(dt)
                Case "2" 'lista forma de pago
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ccPercepcion.ListarFormasPago("", "", "", "A")
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""DESCRIPCION_CORTA"" :" & """" & MiDataRow("DESCRIPCION_CORTA").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "3" 'Lista cuentas bancarias
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncCuentaBancaria.ListarCuentasBancarias(p_CTLG_CODE, "", "")
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
                            resb.Append("""PIDM_SECTORISTA"" :" & """" & MiDataRow("PIDM_SECTORISTA").ToString & """,")
                            resb.Append("""SECTORISTA"" :" & """" & MiDataRow("SECTORISTA").ToString & """,")




                            'resb.Append("""PIDM_AUT1"" :" & """" & MiDataRow("PIDM_AUT1").ToString & """,")
                            'resb.Append("""AUT1"" :" & """" & MiDataRow("AUT1").ToString & """,")
                            'resb.Append("""PIDM_AUT2"" :" & """" & MiDataRow("PIDM_AUT2").ToString & """,")
                            'resb.Append("""AUT2"" :" & """" & MiDataRow("AUT2").ToString & """,")
                            resb.Append("""CTAS_CODE"" :" & """" & MiDataRow("CTAS_CODE").ToString & """,")
                            resb.Append("""CHEQUERA"" :" & """" & MiDataRow("CHEQUERA").ToString & """,")
                            resb.Append("""TAR_TRABAJO"" :" & """" & MiDataRow("TAR_TRABAJO").ToString & """,")
                            resb.Append("""FECAPERTURA"" :" & """" & MiDataRow("FECAPERTURA").ToString & """,")
                            resb.Append("""FECIERRE"" :" & """" & MiDataRow("FECIERRE").ToString & """,")
                            resb.Append("""FIRMA"" :" & """" & MiDataRow("FIRMA").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case 4 'Registrar cobro percepcion
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim array As Array
                    array = ccPercepcion.CrearCobroPercepcion(p_FAB_CODE, Utilities.fechaLocal(p_FECHA_PAGO), p_INTERES, p_MONTO, p_MODO_PAGO, p_NRO_CHEQUE, p_CUENTA_DESTINO, p_CUENTA_ORIGEN, p_NRO)
                    If Not (array Is Nothing) Then
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""CODIGO_PAGO"" :" & """" & array(0).ToString & """")
                        resb.Append("}")
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case 5 'Actualiza la percepcion, estado y fecha de pago                    
                    context.Response.ContentType = "application/text; charset=utf-8"
                    res = ccPercepcion.RegistraCobroRegistro(p_FAB_CODE, p_PAGO_CODE)
                Case 6 'Lista los cobros realizados para una percepxion                 
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = ccPercepcion.ListarCobrosPercepcion(p_FAB_CODE)
                    res = GenerarTablaCobrosPercepcion(dt)

            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try

    End Sub

    Public Function GenerarTablaPercepciones(ByVal dt As DataTable) As String
        resb.Clear()
        Dim dtMonedas As New DataTable
        dtMonedas = glLetras.ListarMoneda(p_CTLG_CODE)
        Dim descMonedaBase As String = ""
        Dim descMonedaAlterna As String = ""
        Dim simbMonedaBase As String = ""
        Dim simbMonedaAlterna As String = ""
        For Each row In dtMonedas.Rows
            If row("TIPO") = "MOBA" Then
                descMonedaBase = row("DESC_CORTA")
                simbMonedaBase = row("SIMBOLO")
            Else
                descMonedaAlterna = row("DESC_CORTA")
                simbMonedaAlterna = row("SIMBOLO")
            End If
        Next
        '------
        resb.AppendFormat("<table id=""tblPercepciones"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<th></th>")
        resb.AppendFormat("<th>DOCUMENTO</th>")
        resb.AppendFormat("<th>FECHA EMISIÓN</th>")
        resb.AppendFormat("<th>PROVEEDOR</th>")
        resb.AppendFormat("<th>PERCEPCIÓN ({0})</th>", simbMonedaBase)
        resb.AppendFormat("<th>SALDO ({0})</th>", simbMonedaBase)
        resb.AppendFormat("<th>#</th>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")
        If (dt Is Nothing) Then
            'No hay datos          
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'>NO HAY DATOS DISPONIBLES</td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("</tr>")
        Else
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td style='text-align:center;'><img id='{0}' src='recursos/img/details_open.png' /></td>", dt.Rows(i)("CODIGO").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("DOCUMENTO").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", If(dt.Rows(i)("FECHA_EMISION").ToString() = "", "", dt.Rows(i)("FECHA_EMISION").ToString().Substring(0, 10)))
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("PROVEEDOR").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("PERCEPCION").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("SALDO").ToString())
                resb.AppendFormat("<td style='text-align:center;'>")
                resb.AppendFormat("<input style='width:16px;height:16px' id='chkPercepcion_{0}' class='checker' type='checkbox' data-code='{0}' data-monto='{1}' name='percepcion' value='E' style='opacity: 0;' />", dt.Rows(i)("CODIGO").ToString(), dt.Rows(i)("SALDO").ToString())
                resb.AppendFormat("</td>")
                resb.AppendFormat("</tr>")
            Next
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        'Datos de moneda  
        resb.AppendFormat("<input id='hfDescMonedaBase' value='{0}' type='hidden' />", descMonedaBase)
        resb.AppendFormat("<input id='hfDescMonedaAlterna' value='{0}' type='hidden' />", descMonedaAlterna)
        resb.AppendFormat("<input id='hfSimbMonedaBase' value='{0}' type='hidden' />", simbMonedaBase)
        resb.AppendFormat("<input id='hfSimbMonedaAlterna' value='{0}' type='hidden' />", simbMonedaAlterna)
        res = resb.ToString()
        Return res
    End Function

    Public Function GenerarTablaCobrosPercepcion(ByVal dt As DataTable) As String
        resb.Clear()
        resb.AppendFormat("<table id=""tblCobrosPercepcion"" class=""display DTTT_selectable"" border=""0"" style=""width:100%;"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<th>FECHA TRANSACCIÓN</th>")
        resb.AppendFormat("<th>FECHA PAGO</th>")
        resb.AppendFormat("<th>FORMA PAGO</th>")
        resb.AppendFormat("<th>MONTO</th>")
        'resb.AppendFormat("<th>INTERES</th>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        If (dt Is Nothing) Then
            'No hay datos          
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td style='text-align:center;'>NO HAY DATOS DISPONIBLES</td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            'resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("</tr>")
        Else
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", If(dt.Rows(i)("FECHA_TRANSACCION").ToString() = "", "", dt.Rows(i)("FECHA_TRANSACCION").ToString().Substring(0, 10)))
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", If(dt.Rows(i)("FECHA_PAGO").ToString() = "", "", dt.Rows(i)("FECHA_PAGO").ToString().Substring(0, 10)))
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("FORMA_PAGO").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("MONTO").ToString())
                'resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("INTERES").ToString())
                resb.AppendFormat("</tr>")
            Next
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
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