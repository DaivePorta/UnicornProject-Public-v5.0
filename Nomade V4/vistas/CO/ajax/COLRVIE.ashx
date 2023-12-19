<%@ WebHandler Language="VB" Class="COLRVIE" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO
Imports iTextSharp.text
Imports iTextSharp.text.pdf

Public Class COLRVIE : Implements IHttpHandler

    Dim OPCION As String
    Dim p_PERS_PIDM, p_CTLG_CODE, p_SCSL_CODE, p_USUA_ID As String
    Dim p_ANIO, p_MES, p_MES_DES, p_DESC_EMPRESA As String
    Dim p_RUC As String

    Dim ccCuentaPorCobrar As New Nomade.CC.CCCuentaPorCobrar("Bn")
    Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
    Dim ncSucursal As New Nomade.NC.NCSucursal("Bn")
    Dim ncCliente As New Nomade.NC.NCECliente("Bn")
    Dim periodo As New Nomade.NC.NCPeriodo("bn")
    Dim coRegistroVentas As New Nomade.CO.CORegistroCompras("Bn")

    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")
        p_DESC_EMPRESA = context.Request("p_DESC_EMPRESA")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_PERS_PIDM = context.Request("p_PERS_PIDM")
        p_RUC = context.Request("p_RUC")
        p_ANIO = context.Request("p_ANIO")
        p_MES = context.Request("p_MES")
        p_MES_DES = context.Request("p_MES_DES")
        If p_PERS_PIDM = "" Or p_PERS_PIDM Is Nothing Then
            p_PERS_PIDM = "0"
        End If

        If p_SCSL_CODE = "TODOS" Then
            p_SCSL_CODE = ""
        End If
        Try

            Select Case OPCION

                Case "1" 'Generar tabla: Libro 8 en interfaz
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = coRegistroVentas.ListarRegistroVentas_sire(p_ANIO, p_MES, p_CTLG_CODE, "", p_RUC, p_DESC_EMPRESA)
                    res = GenerarTablaRegistroVentas(dt).ToString()
                    GenerarTXT(dt) 'Genera el .txt 

                Case "2"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = coRegistroVentas.ListarRegistroVentas_sire(p_ANIO, p_MES, p_CTLG_CODE, "", p_RUC, p_DESC_EMPRESA)
                    res = GenerarPDF(dt)

            End Select

            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try

    End Sub

    Public Function GenerarPDF(ByVal dt As DataTable) As String
        Dim ress As String = ""
        Dim cNomArch As String
        Dim htmlText As New StringBuilder
        If Not dt Is Nothing Then
            cNomArch = "LE" + p_RUC + p_ANIO + p_MES + "00140400" + "02" + "1" + "1" + "1" + "2" + ".pdf"
        Else
            cNomArch = "LE" + p_RUC + p_ANIO + p_MES + "00140400" + "02" + "1" + "0" + "1" + "2" + ".pdf"
        End If
        htmlText = GenerarTablaRegistroVentas(dt)
        HTMLToPDF(htmlText, cNomArch)
        If dt.Rows.Count <> 0 Then
            ress = "ok"
        End If
        Return ress
    End Function


    Sub HTMLToPDF(ByVal HTML As StringBuilder, ByVal FilePath As String)
        Dim archivo, res As String
        res = "Archivos\" + FilePath
        archivo = HttpContext.Current.Server.MapPath("~") + res
        If My.Computer.FileSystem.FileExists(archivo) Then
            My.Computer.FileSystem.DeleteFile(archivo)
        End If

        Dim document As Document
        document = New Document(PageSize.A2.Rotate(), 25, 25, 45, 20)

        PdfWriter.GetInstance(document, New FileStream(archivo, FileMode.Create))
        document.Open()

        Dim abc As StringReader = New StringReader(HTML.ToString)
        Dim styles As iTextSharp.text.html.simpleparser.StyleSheet = New iTextSharp.text.html.simpleparser.StyleSheet()
        styles.LoadStyle("border", "border-bottom", "2px")

        Dim hw As iTextSharp.text.html.simpleparser.HTMLWorker = New iTextSharp.text.html.simpleparser.HTMLWorker(document)
        hw.Parse(New StringReader(HTML.ToString))
        document.Close()
    End Sub


    Public Function GenerarTXT(ByVal dt As DataTable) As String
        Dim cadena As String = ""
        Dim archivo As String
        Dim res As String = ""
        Dim cantidad_datos As Integer = 0
        Try

            If Not dt Is Nothing Then
                res = "Archivos\" + "LE" + p_RUC + p_ANIO + p_MES + "00140400" + "02" + "1" + "1" + "1" + "2" + ".txt"

            Else
                res = "Archivos\" + "LE" + p_RUC + p_ANIO + p_MES + "00140400" + "02" + "1" + "0" + "1" + "2" + ".txt"
            End If
            archivo = HttpContext.Current.Server.MapPath("~") + res

            If My.Computer.FileSystem.FileExists(archivo) Then
                My.Computer.FileSystem.DeleteFile(archivo)
            End If

            Dim nroCorrelativo As Integer = 0

            If Not dt Is Nothing Then
                Dim fd As New StreamWriter(archivo, True)
                cantidad_datos = dt.Rows.Count
                For i As Integer = 0 To dt.Rows.Count - 1
                    nroCorrelativo += 1
                    cadena += dt.Rows(i)("RUC_EMISOR").ToString() + "|" + dt.Rows(i)("NOMBRE_EMISOR").ToString() + "|" + dt.Rows(i)("PERIODO").ToString() + "|" + dt.Rows(i)("CAR").ToString() + "|"
                    'FECHA EMISION, FECHA VENCIMIENTO                  
                    cadena += If(dt.Rows(i)("EMISION").ToString() = "", "", dt.Rows(i)("EMISION").ToString().Substring(0, 10)) + "|" + If(dt.Rows(i)("VENCIMIENTO").ToString() = "", "", dt.Rows(i)("VENCIMIENTO").ToString().Substring(0, 10)) + "|"
                    'TIPO COMPROBANTE, SERIE, AÑO EMISION DUA, NRO                    
                    cadena += dt.Rows(i)("TIPO_DCTO_SUNAT").ToString() + "|" + dt.Rows(i)("SERIE").ToString() + "|" + dt.Rows(i)("NUMERO").ToString() + "|"
                    'NUMERO FINAL
                    'cadena += dt.Rows(i)("NRO_FINAL").ToString() + "|"
                    ''INFORMACIÓN DEL CLIENTE                                    
                    cadena += dt.Rows(i)("TIPO_DCTO_CLIE").ToString() + "|" + dt.Rows(i)("NRO_DCTO_CLIE").ToString() + "|"
                    cadena += dt.Rows(i)("RAZON_SOCIAL").ToString() + "|"
                    'VALOR DE LA EXPORTACION
                    If Decimal.Parse(dt.Rows(i)("VALOR_EXPORTACION").ToString()) = 0 Then
                        cadena += "0|"
                    Else
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("VALOR_EXPORTACION").ToString())) + "|"
                    End If
                    'BASE IMPONIBLE
                    If Decimal.Parse(dt.Rows(i)("BASE_IMPONIBLE").ToString()) = 0 Then
                        cadena += "0|"
                    Else
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("BASE_IMPONIBLE").ToString())) + "|"
                    End If
                    'DESCUENTO DE LA BASE IMPONIBLE
                    If Decimal.Parse(dt.Rows(i)("DSCTO_BASE_IMPONIBLE").ToString()) = 0 Then
                        cadena += "0|"
                    Else
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("DSCTO_BASE_IMPONIBLE").ToString())) + "|"
                    End If
                    'IGV
                    If Decimal.Parse(dt.Rows(i)("IGV").ToString()) = 0 Then
                        cadena += "0|"
                    Else
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IGV").ToString())) + "|"
                    End If
                    'DESCUENTO DEL IGV O IMPUESTO DE PROMOCIÓN MUNICIPAL
                    If Decimal.Parse(dt.Rows(i)("DSCTO_IGV").ToString()) = 0 Then
                        cadena += "0|"
                    Else
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("DSCTO_IGV").ToString())) + "|"
                    End If
                    'IMPORTE EXONERADA
                    If Decimal.Parse(dt.Rows(i)("IMPORTE_EXONERADA").ToString()) = 0 Then
                        cadena += "0|"
                    Else
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IMPORTE_EXONERADA").ToString())) + "|"
                    End If
                    'IMPORTE INAFECTA
                    If Decimal.Parse(dt.Rows(i)("IMPORTE_INAFECTA").ToString()) = 0 Then
                        cadena += "0|"
                    Else
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IMPORTE_INAFECTA").ToString())) + "|"
                    End If
                    'ISC
                    If Decimal.Parse(dt.Rows(i)("ISC").ToString()) = 0 Then
                        cadena += "0|"
                    Else
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("ISC").ToString())) + "|"
                    End If
                    'BASE IMPONIBLE IVAP
                    If Decimal.Parse(dt.Rows(i)("BASE_IMPONIBLE_IVAP").ToString()) = 0 Then
                        cadena += "0|"
                    Else
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("BASE_IMPONIBLE_IVAP").ToString())) + "|"
                    End If
                    'IMPUESTO IVAP
                    If Decimal.Parse(dt.Rows(i)("IMPUESTO_IVAP").ToString()) = 0 Then
                        cadena += "0|"
                    Else
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IMPUESTO_IVAP").ToString())) + "|"
                    End If
                    'IMPUESTO AL CONSUMO DE LAS BOLSAS DE PLASTICO (ICEPER)
                    If Decimal.Parse(dt.Rows(i)("ICBPER").ToString()) = 0 Then
                        cadena += "0|"
                    Else
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("ICBPER").ToString())) + "|"
                    End If
                    'OTROS TRIBUTOS
                    If Decimal.Parse(dt.Rows(i)("OTROS_TRIBUTOS").ToString()) = 0 Then
                        cadena += "0|"
                    Else
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("OTROS_TRIBUTOS").ToString())) + "|"
                    End If
                    'IMPORTE
                    If Decimal.Parse(dt.Rows(i)("IMPORTE").ToString()) = 0 Then
                        cadena += "0|"
                    Else
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IMPORTE").ToString())) + "|"
                    End If
                    'CODIGO MONEDA
                    cadena += dt.Rows(i)("MONEDA").ToString() + "|"
                    'VALOR CAMBIO
                    If dt.Rows(i)("MONEDA").ToString() = "PEN" Then
                        cadena += "1|"
                    Else
                        cadena += String.Format("{0:#0.000}", Decimal.Parse(dt.Rows(i)("TIPO_CAMBIO").ToString())) + "|"
                    End If
                    'REFERENCIA DEL COMPROBANTE DE PAGO O DOCUMENTO ORIGINAL QUE SE MODIFICA
                    cadena += If(dt.Rows(i)("FECHA_EMISION_DOC_MODIFICADO").ToString() = "", "", dt.Rows(i)("FECHA_EMISION_DOC_MODIFICADO").ToString().Substring(0, 10)) + "|"
                    cadena += dt.Rows(i)("TIPO_CP_MODIFICADO").ToString() + "|"
                    cadena += dt.Rows(i)("SERIE_CP_MODIFICADO").ToString() + "|"
                    cadena += dt.Rows(i)("NRO_CP_MODIFICADO").ToString() + "|"

                    'CAMPOS NUEVOS
                    cadena += dt.Rows(i)("ID_PROYECTO_OPERADORES").ToString() + "|"

                    cadena += "|"
                    cadena += "1" + "|"
                    cadena += "0" + "|"
                    cadena += "0" + "|"
                    cadena += "101" + "|"
                    cadena += "|"
                    cadena += "|"

                    If cantidad_datos <> nroCorrelativo Then
                        cadena += vbCrLf
                    End If
                Next
                fd.Write(cadena)
                fd.Close()
                res = "ok"
            Else
                Dim fd As New StreamWriter(archivo, True)
                fd.Write(cadena)
                fd.Close()
                res = "vacio"
            End If
        Catch ex As Exception
            res = "error"
        End Try
        Return res
    End Function

    Public Function GenerarTablaRegistroVentas(ByVal dt As DataTable) As StringBuilder
        Dim total As Decimal = 0
        res = ""
        resb.Clear()
        '------
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", "PERIODO:")
        resb.AppendFormat("<td width='75%'  style=""mso-number-format:'\@'"">{0} {1}</td>", p_MES_DES, p_ANIO)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", "RUC:")
        resb.AppendFormat("<td id='ruc' width='75%'>{0}</td>", p_RUC)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", "APELLIDOS Y NOMBRES, DENOMINACIÓN O RAZÓN SOCIAL:")
        resb.AppendFormat("<td width='75%'>{0}</td>", p_DESC_EMPRESA)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")
        resb.AppendFormat("<br/>")

        resb.AppendFormat("<table id=""tblRegistroVentas"" border=""1"" style=""max-width:3000px;width:2570px;"" width:""2570px"">")
        resb.AppendFormat("<thead>")
        'Fila 1 CABECERA
        resb.AppendFormat("<tr style='font-size:9px;' align='center' bgcolor='#666666' color='white'>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>RUC</th>")
        resb.AppendFormat("<th rowspan='1' style='width:500px;'>RAZÓN SOCIAL</th>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>PERIODO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>CAR SUNAT</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>FECHA DE EMISIÓN</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>FECHA VCTO / PAGO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>TIPO CP / DOC.</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>SERIE DEL CDP</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>NRO CP O DOC. NRO INICIAL (RANGO)</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>NRO FINAL (RANGO)</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>TIPO DOC IDENTIDAD</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>NRO DOC IDENTIDAD</th>")
        resb.AppendFormat("<th rowspan='1' style='width:200px;'>APELLIDOS NOMBRES / RAZÓN SOCIAL</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>VALOR FACTURADO EXPORTACIÓN</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>BI GRAVADA</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>DSCTO BI</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>IGV / IPM</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>DSCTO IGV / IPM</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>MTO EXONERADP</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>MTO INAFECTO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>ISC</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>BI GRAV IVAP</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>IVAP</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>ICBPER</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>OTROS TRIBUTOS</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>TOTAL CP</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>MONEDA</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>TIPO CAMBIO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>FECHA EMISIÓN DOC MODIFICADO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>TIPO CP MODIFICADO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>SERIE CP MODIFICADO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>NRO CP MODIFICADO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>ID PROYECTO OPERADORES ATRIBUCIÓN</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>TIPO DE NOTA</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>EST. COMP</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>VALOR FOB EMBARCADO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>VALOR OP GRATUITAS</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>TIPO OPERACIÓN</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>DAM / CP</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>CLU</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>USO INTERNO SUNAT</th>")
        resb.AppendFormat("</tr>")

        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody >")


        Dim nroCorrelativo As Integer = 0
        Dim totalValorExportacion As Decimal = 0.0
        Dim totalBaseImponible As Decimal = 0.0
        Dim totalImportExone As Decimal = 0.0
        Dim totalImporteInafe As Decimal = 0.0
        Dim totalISC As Decimal = 0.0
        Dim totalIGV As Decimal = 0.0
        Dim totalTributos As Decimal = 0.0
        Dim totalImporte As Decimal = 0.0
        'nuevos
        Dim totalDescuentoBaseImp As Decimal = 0.0
        Dim totalDescuentoIgv As Decimal = 0.0
        Dim totalBaseImpArroz As Decimal = 0.0
        Dim totalImpuestoArroz As Decimal = 0.0

        If Not dt Is Nothing Then
            For i As Integer = 0 To dt.Rows.Count - 1
                nroCorrelativo += 1

                resb.AppendFormat("<tr style='font-size:9px;'>")
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RUC_EMISOR").ToString()) '1
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NOMBRE_EMISOR").ToString()) '2
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("PERIODO").ToString()) '3
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CAR").ToString()) '4             
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("EMISION").ToString()) '5
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("VENCIMIENTO").ToString()) '6
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_DCTO_SUNAT").ToString()) '7
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("SERIE").ToString()) '8   
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NUMERO").ToString()) '9
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NRO_FINAL").ToString()) '10
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_DCTO_CLIE").ToString()) '11
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NRO_DCTO_CLIE").ToString()) '12   
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RAZON_SOCIAL").ToString()) '13
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("VALOR_EXPORTACION").ToString()) '14
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("BASE_IMPONIBLE").ToString()) '15
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DSCTO_BASE_IMPONIBLE").ToString()) '16   
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("IGV").ToString()) '17
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DSCTO_IGV").ToString()) '18
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("IMPORTE_EXONERADA").ToString()) '19
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("IMPORTE_INAFECTA").ToString()) '20 
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ISC").ToString()) '21
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("BASE_IMPONIBLE_IVAP").ToString()) '22
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("IMPUESTO_IVAP").ToString()) '23
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ICBPER").ToString()) '24   
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("OTROS_TRIBUTOS").ToString()) '25
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("IMPORTE").ToString()) '26
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MONEDA").ToString()) '27
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_CAMBIO").ToString()) '28  
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("FECHA_EMISION_DOC_MODIFICADO").ToString()) '29
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_CP_MODIFICADO").ToString()) '30
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("SERIE_CP_MODIFICADO").ToString()) '31
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NRO_CP_MODIFICADO").ToString()) '32  
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ID_PROYECTO_OPERADORES").ToString()) '33

                resb.AppendFormat("<td align='center' >{0}</td>", "") '34
                resb.AppendFormat("<td align='center' >{0}</td>", "1") '35
                resb.AppendFormat("<td align='center' >{0}</td>", "0") '36   
                resb.AppendFormat("<td align='center' >{0}</td>", "0") '37
                resb.AppendFormat("<td align='center' >{0}</td>", "101") '38
                resb.AppendFormat("<td align='center' >{0}</td>", "") '39   
                resb.AppendFormat("<td align='center' >{0}</td>", "") '40  
                resb.AppendFormat("<td align='center' >{0}</td>", "") '41  
                resb.AppendFormat("</tr>")
            Next
        Else
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td colspan='34' align='center' >{0}</td>", "NO HAY DATOS")
            resb.AppendFormat("</tr>")
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")

        res = resb.ToString()
        'Return res
        Return resb
    End Function

    Public Function GenerarCmbAnioMes(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<option  value=""" & dt.Rows(i)("CODIGO").ToString() & """>" & dt.Rows(i)("DESCRIPCION").ToString() & "</option>"
            Next
        Else
            res = ""
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