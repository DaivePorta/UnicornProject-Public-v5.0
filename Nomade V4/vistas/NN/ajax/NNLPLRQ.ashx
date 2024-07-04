<%@ WebHandler Language="VB" Class="NNLPLRQ" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NNLPLRQ : Implements IHttpHandler

    Dim OPCION As String
    Dim p_PERS_PIDM, p_CTLG_CODE, p_USUA_ID As String
    Dim p_ANIO, p_MES, p_MES_DES As String
    Dim p_RUC As String
    Dim DATOS_PLAME_PS4, DATOS_PLAME_4TA As String

    Dim dt As DataTable
    Dim res As String
    Dim resb As New StringBuilder

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")

        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_PERS_PIDM = context.Request("p_PERS_PIDM")
        p_RUC = context.Request("p_RUC")
        p_ANIO = context.Request("p_ANIO")
        p_MES = context.Request("p_MES")

        Try

            Select Case OPCION

                Case "1" 'Generar PLAME renta 4ta categoria
                    'context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NN.NNHonorarios("Bn").listarPLAMERenta4taCategoria(p_CTLG_CODE, p_ANIO, p_MES)

                    If Not (dt Is Nothing) Then
                        dt.Columns.Add("NUMERO_REGISTRO", GetType(Integer))

                        Dim rowNumber As Integer = 1
                        For Each row As DataRow In dt.Rows
                            row("NUMERO_REGISTRO") = rowNumber
                            rowNumber += 1
                        Next

                        res = GenerarTablaRenta(dt)
                    Else
                        res = ""
                    End If

            End Select

            context.Response.Write(res)

        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub

    Public Function GenerarTablaRenta(ByVal dt As DataTable) As String
        res = ""
        resb.Clear()

        Dim dtEmpresa As New DataTable
        Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
        dtEmpresa = ncEmpresa.ListarEmpresa(p_CTLG_CODE, "A", "X")
        Dim DATOS_PLAME_PS4 As String = String.Empty
        Dim DATOS_PLAME_4TA As String = String.Empty

        'TABLA 1 o Datos 
        resb.AppendFormat("<table border='0' width='100%' >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td colspan='2' style='font-weight: bold;'>{0}</td>", "PLAME V.2.8 DATOS DEL DETALLE DE COMPROBANTES - CUARTA CATEGORIA") ' Merged cell with colspan and bold style
        resb.AppendFormat("</tr>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='font-weight: bold;'>{0}</td>", "EMPRESA:")
        resb.AppendFormat("<td>{0}</td>", dtEmpresa.Rows(0)("DESCRIPCION").ToString())
        resb.AppendFormat("</tr>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='font-weight: bold;'>{0}</td>", "RUC:")
        resb.AppendFormat("<td id='ruc'>{0}</td>", dtEmpresa.Rows(0)("RUC").ToString())
        resb.AppendFormat("</tr>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='font-weight: bold;'>{0}</td>", "AÑO:")
        resb.AppendFormat("<td>{0}</td>", p_ANIO.ToUpper())
        resb.AppendFormat("</tr>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='font-weight: bold;'>{0}</td>", "MES:")
        resb.AppendFormat("<td>{0}</td>", getMes(Integer.Parse(p_MES)))
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("<br><br>")

        resb.AppendFormat("<style>")
        resb.AppendFormat("#tblRenta tbody tr:last-child td {{ border-bottom: 1px solid #000; }}")
        resb.AppendFormat("</style>")

        'TABLA 2 
        resb.AppendFormat("<table id='tblRenta' border='1' style='color:white; width: 100%;'>")
        resb.AppendFormat("<thead>")

        'Fila 1 CABECERA
        resb.AppendFormat("<tr style ='font-size:9px;' align='center' bgcolor='#4682B4' color='white'>")
        resb.AppendFormat("<th rowspan='2' style='width:85px;'>NUMERO DEL REGISTRO</th>")
        resb.AppendFormat("<th colspan ='4' style='width:400px;'>DATOS DEL TRABAJADOR</th>")
        resb.AppendFormat("<th rowspan='2' style='width:85px;'>DOMICILIADO</th>")
        resb.AppendFormat("<th rowspan='2' style='width:85px;'>CONVENIO DOBLE TRIBUTACION</th>")
        resb.AppendFormat("<th colspan='7' style='width:1200px;'>DATOS DEL COMPROBANTE EMITIDO</th>")
        resb.AppendFormat("</tr>")

        'Fila 2 CABECERA
        resb.AppendFormat("<tr style ='font-size:9px;' align='center' bgcolor='#666666' color='white'>")
        resb.AppendFormat("<th style='width:100px;'>COD</th>")
        resb.AppendFormat("<th style='width:200px;'>TIPO DOCUMENTO</th>")
        resb.AppendFormat("<th style='width:200px;'>N° DOCUMENTO</th>")
        resb.AppendFormat("<th style='width:200px;'>APELLIDOS Y NOMBRES</th>")

        resb.AppendFormat("<th style='width:85px;'>TIPO</th>")
        resb.AppendFormat("<th style='width:85px;'>SERIE</th>")
        resb.AppendFormat("<th style='width:85px;'>NUMERO</th>")
        resb.AppendFormat("<th style='width:200px;'>MONTO TOTAL</th>")
        resb.AppendFormat("<th style='width:200px;'>FECHA EMISION</th>")
        resb.AppendFormat("<th style='width:200px;'>FECHA PAGO</th>")
        resb.AppendFormat("<th style='width:200px;'>RET. 4TA CAT.</th>")
        resb.AppendFormat("</tr>")

        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        Dim b As Boolean = False
        If Not dt Is Nothing Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr style='font-size:9px;color:black;'>")
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NUMERO_REGISTRO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("PIDM_BENEFICIARIO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_DOCUMENTO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NRO_DOCUMENTO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("APELLIDOS_NOMBRES").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DOMICILIADO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DOBLE_TRIBUTACION").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("SERIE").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NUMERO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MONTO_TOTAL").ToString())
                Dim fechaEmision As DateTime = DateTime.Parse(dt.Rows(i)("FECHA_EMISION").ToString())
                Dim fechaPago As DateTime = DateTime.Parse(dt.Rows(i)("FECHA_PAGO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", fechaEmision.ToString("dd/MM/yyyy"))
                resb.AppendFormat("<td align='center' >{0}</td>", fechaPago.ToString("dd/MM/yyyy"))
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RETENCION_4TA").ToString())
                resb.AppendFormat("</tr>")

                DATOS_PLAME_PS4 &= dt.Rows(i)("TIPO_DOCUMENTO").ToString() + "|" +
                           dt.Rows(i)("NRO_DOCUMENTO").ToString() + "|" +
                           dt.Rows(i)("APELLIDO_PATE").ToString() + "|" +
                           dt.Rows(i)("APELLIDO_MATE").ToString() + "|" +
                           dt.Rows(i)("NOMBRE").ToString() + "|" +
                           dt.Rows(i)("DOMICILIADO").ToString() + "|" +
                           dt.Rows(i)("DOBLE_TRIBUTACION").ToString() + "|"

                Dim fEmision As Date = Date.Parse(dt.Rows(i)("FECHA_EMISION").ToString())
                Dim fPago As Date = Date.Parse(dt.Rows(i)("FECHA_PAGO").ToString())

                Dim fEmisionFormato As String = fechaEmision.ToString("dd/MM/yyyy")
                Dim fPagoFormato As String = fechaPago.ToString("dd/MM/yyyy")

                Dim montoTotal As Decimal = Decimal.Parse(dt.Rows(i)("MONTO_TOTAL").ToString())
                Dim montoTotalFormato As String = montoTotal.ToString("0.##")


                DATOS_PLAME_4TA &= dt.Rows(i)("TIPO_DOCUMENTO").ToString() + "|" +
                       dt.Rows(i)("NRO_DOCUMENTO").ToString() + "|" +
                       dt.Rows(i)("TIPO").ToString() + "|" +
                       dt.Rows(i)("SERIE").ToString() + "|" +
                       dt.Rows(i)("NUMERO").ToString() + "|" +
                       montoTotalFormato + "|" +
                       fEmisionFormato + "|" +
                       fPagoFormato + "|" +
                       dt.Rows(i)("RETENCION_4TA").ToString() + "|" + "|" + "|"
            Next
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")

        Dim r As String = ""
        r = resb.ToString + "{|||||}" + DATOS_PLAME_PS4 + "{|||||}" + DATOS_PLAME_4TA

        Return r

    End Function

    Function getMes(monthNumber As Integer) As String
        Dim monthNames As String() = {"Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                                      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"}

        If monthNumber >= 1 AndAlso monthNumber <= 12 Then
            Return monthNames(monthNumber - 1)
        Else
            Return "Mes invalido"
        End If
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class