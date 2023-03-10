<%@ WebHandler Language="VB" Class="COLREVE" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO
Imports iTextSharp.text
Imports iTextSharp.text.pdf

Public Class COLREVE : Implements IHttpHandler


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

                Case "4" 'Generar tabla: Libro 8 en interfaz
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = coRegistroVentas.ListarRegistroVentas_sunat(p_ANIO, p_MES, p_CTLG_CODE, "")
                    res = GenerarTablaRegistroVentas(dt).ToString()
                    GenerarTXT(dt) 'Genera el .txt 

                Case "5"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = coRegistroVentas.ListarRegistroVentas_sunat(p_ANIO, p_MES, p_CTLG_CODE, "")
                    res = GenerarPDF(dt)

                Case "6"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = coRegistroVentas.ListarRegistroVentas_sunat(p_ANIO, p_MES, p_CTLG_CODE, "")
                    res = GenerarTXT(dt) 'Genera el .txt     
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
            cNomArch = "LE" + p_RUC + p_ANIO + p_MES + "00140100" + "00" + "1" + "1" + "1" + "1" + ".pdf"
        Else
            cNomArch = "LE" + p_RUC + p_ANIO + p_MES + "00140100" + "00" + "1" + "0" + "1" + "1" + ".pdf"
        End If

        'dt=
        htmlText = GenerarTablaRegistroVentas(dt)
        HTMLToPDF(htmlText, cNomArch)
        'ress = GenerarTXT(dt)
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
                res = "Archivos\" + "LE" + p_RUC + p_ANIO + p_MES + "00140100" + "00" + "1" + "1" + "1" + "1" + ".txt"

            Else
                res = "Archivos\" + "LE" + p_RUC + p_ANIO + p_MES + "00140100" + "00" + "1" + "0" + "1" + "1" + ".txt"
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
                    'PERIODO, CUO, CORRELATIVO CONTABLE                 
                    cadena += dt.Rows(i)("PERIODO").ToString() + "|" + dt.Rows(i)("CUO").ToString() + "|" + dt.Rows(i)("CAC").ToString() + "|"
                    'DPORTA
                    'Dim oNCParametros As New Nomade.NC.NCParametros("Bn")
                    'Dim oDT_Param As New DataTable()
                    'oDT_Param = oNCParametros.ListarParametros("CMOV", "")
                    'If oDT_Param Is Nothing Then
                    '    Throw New System.Exception("No se encontró el parámetro CMOV: Correlativo Movimiento en libro.")
                    'End If
                    'If oDT_Param.Rows.Count = 0 Then
                    '    Throw New System.Exception("No se encontró el parámetro CMOV: Correlativo Movimiento en libro.")
                    'End If
                    'Dim sUsaCorrelativo As String = oDT_Param.Rows(0)("VALOR")
                    'If Not sUsaCorrelativo.Equals("S") Then
                    '    cadena += dt.Rows(i)("FILA").ToString() + "|"
                    'Else
                    '    cadena += dt.Rows(i)("CAC").ToString() + "|"
                    'End If
                    'FECHA EMISION, FECHA VENCIMIENTO                  
                    cadena += If(dt.Rows(i)("EMISION").ToString() = "", "", dt.Rows(i)("EMISION").ToString().Substring(0, 10)) + "|" + If(dt.Rows(i)("VENCIMIENTO").ToString() = "", "", dt.Rows(i)("VENCIMIENTO").ToString().Substring(0, 10)) + "|"
                    'TIPO COMPROBANTE, SERIE, AÑO EMISION DUA, NRO                    
                    cadena += dt.Rows(i)("TIPO_DCTO_SUNAT").ToString() + "|" + dt.Rows(i)("SERIE").ToString() + "|" + dt.Rows(i)("NUMERO").ToString() + "|"
                    'NUMERO FINAL
                    cadena += dt.Rows(i)("NRO_FINAL").ToString() + "|"
                    ''INFORMACIÓN DEL CLIENTE                                    
                    'If dt.Rows(i)("TIPO_DCTO_CLIE").ToString() <> "" And dt.Rows(i)("NRO_DCTO_CLIE").ToString() <> "" Then
                    cadena += dt.Rows(i)("TIPO_DCTO_CLIE").ToString() + "|" + dt.Rows(i)("NRO_DCTO_CLIE").ToString() + "|"
                    'Else
                    'If (dt.Rows(i)("DNI").ToString() = "" Or dt.Rows(i)("RUC").ToString() <> "") Then
                    '    cadena += "6" + "|" + dt.Rows(i)("RUC").ToString() + "|"
                    'Else
                    '    cadena += "1" + "|" + dt.Rows(i)("DNI").ToString() + "|"
                    'End If
                    'End If
                    cadena += dt.Rows(i)("RAZON_SOCIAL").ToString() + "|"
                    'VALOR DE LA EXPORTACION
                    If Decimal.Parse(dt.Rows(i)("VALOR_EXPORTACION").ToString()) = 0 Then
                        cadena += " |"
                    Else
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("VALOR_EXPORTACION").ToString())) + "|"
                    End If
                    'BASE IMPONIBLE
                    If Decimal.Parse(dt.Rows(i)("BASE_IMPONIBLE").ToString()) = 0 Then
                        cadena += " |"
                    Else
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("BASE_IMPONIBLE").ToString())) + "|"
                    End If
                    'DESCUENTO DE LA BASE IMPONIBLE
                    If Decimal.Parse(dt.Rows(i)("DESC_BASEIMP").ToString()) = 0 Then
                        cadena += " |"
                    Else
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("DESC_BASEIMP").ToString())) + "|"
                    End If
                    'IGV
                    If Decimal.Parse(dt.Rows(i)("IGV").ToString()) = 0 Then
                        cadena += " |"
                    Else
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IGV").ToString())) + "|"
                    End If
                    'DESCUENTO DEL IGV O IMPUESTO DE PROMOCIÓN MUNICIPAL
                    If Decimal.Parse(dt.Rows(i)("DESC_IGV").ToString()) = 0 Then
                        cadena += " |"
                    Else
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("DESC_IGV").ToString())) + "|"
                    End If

                    'IMPORTE EXONERADA
                    If Decimal.Parse(dt.Rows(i)("IMPORTE_EXONERADA").ToString()) = 0 Then
                        cadena += " |"
                    Else
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IMPORTE_EXONERADA").ToString())) + "|"
                    End If
                    'IMPORTE INAFECTA
                    If Decimal.Parse(dt.Rows(i)("IMPORTE_INAFECTA").ToString()) = 0 Then
                        cadena += " |"
                    Else
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IMPORTE_INAFECTA").ToString())) + "|"
                    End If
                    'ISC
                    If Decimal.Parse(dt.Rows(i)("ISC").ToString()) = 0 Then
                        cadena += " |"
                    Else
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("ISC").ToString())) + "|"
                    End If

                    'BASE IMPONIBLE DE VENTAS DEL ARROZ PILADO
                    If Decimal.Parse(dt.Rows(i)("BASEIMP_ARROZ").ToString()) = 0 Then
                        cadena += " |"
                    Else
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("BASEIMP_ARROZ").ToString())) + "|"
                    End If
                    'IMPUESTO DE VENTAS DEL ARROZ PILADO
                    If Decimal.Parse(dt.Rows(i)("IMPUESTO_ARROZ").ToString()) = 0 Then
                        cadena += " |"
                    Else
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IMPUESTO_ARROZ").ToString())) + "|"
                    End If

                    'IMPUESTO AL CONSUMO DE LAS BOLSAS DE PLASTICO
                    cadena += String.Format("{0:##0.00}", Decimal.Parse("0.00")) + "|"


                    'OTROS TRIBUTOS
                    If Decimal.Parse(dt.Rows(i)("OTROS_TRIBUTOS").ToString()) = 0 Then
                        cadena += " |"
                    Else
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("OTROS_TRIBUTOS").ToString())) + "|"
                    End If
                    'IMPORTE
                    If Decimal.Parse(dt.Rows(i)("IMPORTE").ToString()) = 0 Then
                        cadena += " |"
                    Else
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IMPORTE").ToString())) + "|"
                    End If
                    'CODIGO MONEDA
                    cadena += dt.Rows(i)("MONEDA").ToString() + "|"
                    'VALOR CAMBIO               
                    If Decimal.Parse(dt.Rows(i)("VALOR_CAMBIO").ToString()) = 0 Then
                        cadena += "" + " |"
                        'cadena += String.Format("{0:#0.000}", Decimal.Parse(dt.Rows(i)("VALOR_CAMBIO").ToString())) + "|"
                    Else
                        cadena += String.Format("{0:#0.000}", Decimal.Parse(dt.Rows(i)("VALOR_CAMBIO").ToString())) + "|"
                    End If
                    'REFERENCIA DEL COMPROBANTE DE PAGO O DOCUMENTO ORIGINAL QUE SE MODIFICA
                    cadena += If(dt.Rows(i)("FECHA_EMISION_ORIGEN").ToString() = "", "", dt.Rows(i)("FECHA_EMISION_ORIGEN").ToString().Substring(0, 10)) + "|"
                    cadena += dt.Rows(i)("TIPO_DCTO_SUNAT_ORIGEN").ToString() + "|"
                    cadena += dt.Rows(i)("SERIE_ORIGEN").ToString() + "|"
                    cadena += dt.Rows(i)("NUMERO_ORIGEN").ToString() + "|"

                    'CAMPOS NUEVOS
                    cadena += dt.Rows(i)("CONTRATO").ToString() + "|"
                    cadena += dt.Rows(i)("INC_TIPO_CAMBIO").ToString() + "|"
                    cadena += dt.Rows(i)("INDICADOR_COMPROBANTE").ToString() + "|"
                    cadena += dt.Rows(i)("ESTADO_AJUSTE").ToString() + "|"
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
        'Dim dtEmpresa As New DataTable
        'dtEmpresa = ncEmpresa.ListarEmpresa(p_CTLG_CODE, "A", "X")
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
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>PERIODO</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>CÓDIGO ÚNICO DE LA OPERACIÓN (CUO)</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>NÚMERO CORRELATIVO DEL ASIENTO CONTABLE</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>FECHA DE EMISIÓN DEL COMPROBANTE DE PAGO O DOCUMENTO</th>")
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>FECHA DE VENCIMIENTO O FECHA DE PAGO(1)</th>")
        resb.AppendFormat("<th colspan='3' rowspan='2' style='width:60px;'>COMPROBANTE DE PAGO O DOCUMENTO</th>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>N° FINAL</th>") '**        
        resb.AppendFormat("<th colspan='3'>INFORMACIÓN DEL CLIENTE</th>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>VALOR FACTURADO DE LA EXPORTACIÓN</th>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>BASE IMPONIBLE DE LA OPERACIÓN GRAVADA</th>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>DESCUENTO DE LA BASE IMPONIBLE</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>IGV O IMPUESTO DE PROMOCIÓN MUNICIPAL</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>DESCUENTO DEL IGV O IMPUESTO DE PROMOCIÓN MUNICIPAL</th>") '**        
        resb.AppendFormat("<th colspan='2' rowspan='2' style='width:85px;'> IMPORTE TOTAL DE LA OPERACIÓN EXONERADA O INAFECTA</th>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>ISC</th>")
        resb.AppendFormat("<th rowspan='2' colspan='2' style='width:75px;'>VENTAS DEL ARROZ PILADO</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>IMPUESTO AL CONSUMO DE LAS BOLSAS DE PLASTICO</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>OTROS TRIBUTOS Y CARGOS QUE NO FORMAN PARTE DE LA BASE IMPONIBLE</th>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>IMPORTE TOTAL DEL COMPROBANTE DE PAGO</th>")
        resb.AppendFormat("<th rowspan='3' style='width:60px;'>MONEDA</th>") '**                
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>TIPO DE CAMBIO</th>")
        resb.AppendFormat("<th colspan='4' rowspan='2' style='width:60px;'>REFERENCIA DEL COMPROBANTE DE PAGO O DOCUMENTO ORIGINAL QUE SE MODIFICA</th>")

        resb.AppendFormat("<th rowspan='3' style='width:60px;'>CONTRATO DE COLABORACIÓN EMPRESARIAL</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:60px;'>ERROR TIPO 1: INCONSISTENCIA EN EL TIPO DE CAMBIO</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:60px;'>INDICADOR DE COMPROBANTES DE PAGO CANCELADOS CON MEDIOS DE PAGO</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:60px;'>ESTADO QUE IDENTIFICA LA OPORTUNIDAD DE LA ANOTACIÓN O INDICACIÓN SEGÚN EL INCISO e) DEL ARTÍCULO 8° RESOLUCIÓN 286-2009/SUNAT</th>") '**
        resb.AppendFormat("</tr>")
        'Fila 2 CABECERA
        resb.AppendFormat("<tr style='font-size:9px;' align='center' bgcolor='#666666' color='white'>")
        resb.AppendFormat("<th colspan='2' style='width:60px;'>DOCUMENTO DE IDENTIDAD</th>")
        resb.AppendFormat("<th rowspan='2' style='width:200px;'>APELLIDOS Y NOMBRES, DENOMINACIÓN O RAZÓN SOCIAL</th>")
        resb.AppendFormat("</tr>")
        'Fila 3 CABECERA
        resb.AppendFormat("<tr style='font-size:9px;' align='center' bgcolor='#666666' color='white'>")
        resb.AppendFormat("<th style='width:60px;'>TIPO (TABLA 10)</th>")
        resb.AppendFormat("<th style='width:60px;'>N° SERIE</th>")
        resb.AppendFormat("<th style='width:60px;'>NÚMERO</th>")
        resb.AppendFormat("<th style='width:60px;'>TIPO (TABLA 2)</th>")
        resb.AppendFormat("<th style='width:60px;'>NÚMERO</th>")
        resb.AppendFormat("<th style='width:55px; word-wrap:break-word;'>EXONERADA</th>")
        resb.AppendFormat("<th style='width:55px;'>INAFECTA</th>")
        resb.AppendFormat("<th style='width:55px;'>BASE IMPONIBLE</th>") '**
        resb.AppendFormat("<th style='width:55px;'>IMPUESTO</th>") '**        
        resb.AppendFormat("<th style='width:85px;'>FECHA</th>")
        resb.AppendFormat("<th style='width:60px;'>TIPO (TABLA 10)</th>")
        resb.AppendFormat("<th style='width:60px;'>SERIE</th>")
        resb.AppendFormat("<th style='width:60px;'>N° DEL COMPROBANTE</th>")
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
                'PERIODO , CUO, CORRELATIVO ASIENTO CONTABLE
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("PERIODO").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CUO").ToString()) '**
                'DPORTA
                'Dim oNCParametros As New Nomade.NC.NCParametros("Bn")
                'Dim oDT_Param As New DataTable()
                'oDT_Param = oNCParametros.ListarParametros("CMOV", "")
                'If oDT_Param Is Nothing Then
                '    Throw New System.Exception("No se encontró el parámetro CMOV: Correlativo Movimiento en libro.")
                'End If
                'If oDT_Param.Rows.Count = 0 Then
                '    Throw New System.Exception("No se encontró el parámetro CMOV: Correlativo Movimiento en libro.")
                'End If
                'Dim sUsaCorrelativo As String = oDT_Param.Rows(0)("VALOR")
                'If Not sUsaCorrelativo.Equals("S") Then
                '    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("FILA").ToString())
                'Else
                '    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CAC").ToString())
                'End If
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CAC").ToString()) '**

                'FECHA DE EMISIÓN DEL COMPROBANTE DE PAGO O DOCUMENTO,	FECHA DE VENCIMIENTO O FECHA DE PAGO(1)      
                resb.AppendFormat("<td align='center' >{0}</td>", If(dt.Rows(i)("EMISION").ToString() = "", "", dt.Rows(i)("EMISION").ToString().Substring(0, 10)))
                resb.AppendFormat("<td align='center' >{0}</td>", If(dt.Rows(i)("VENCIMIENTO").ToString() = "", "", dt.Rows(i)("VENCIMIENTO").ToString().Substring(0, 10)))
                'COMPROBANTE DE PAGO O DOCUMENTO
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_DCTO_SUNAT").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("SERIE").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NUMERO").ToString()) 'falta completar
                'N° FINAL
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NRO_FINAL").ToString()) '**
                'INFORMACIÓN DEL CLIENTE
                'If dt.Rows(i)("TIPO_DCTO_CLIE").ToString() <> "" And dt.Rows(i)("NRO_DCTO_CLIE").ToString() <> "" Then
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_DCTO_CLIE").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NRO_DCTO_CLIE").ToString())
                'Else
                'If (dt.Rows(i)("DNI").ToString() = "" Or dt.Rows(i)("RUC").ToString() <> "") Then
                '    resb.AppendFormat("<td align='center' >{0}</td>", "6")
                '    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RUC").ToString())
                'Else
                '    resb.AppendFormat("<td align='center' >{0}</td>", "1")
                '    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DNI").ToString())
                'End If
                'End If

                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("RAZON_SOCIAL").ToString())
                'VALOR DE LA EXPORTACION
                resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("VALOR_EXPORTACION").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("VALOR_EXPORTACION").ToString()))))
                totalValorExportacion += Decimal.Parse(dt.Rows(i)("VALOR_EXPORTACION").ToString())
                'BASE IMPONIBLE
                resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("BASE_IMPONIBLE").ToString()) = 0, "0.00", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("BASE_IMPONIBLE").ToString()))))
                totalBaseImponible += Decimal.Parse(dt.Rows(i)("BASE_IMPONIBLE").ToString())

                'DESCUENTO DE LA BASE IMPONIBLE
                resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("DESC_BASEIMP").ToString()) = 0, "0.00", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("DESC_BASEIMP").ToString()))))
                totalDescuentoBaseImp += Decimal.Parse(dt.Rows(i)("DESC_BASEIMP").ToString())
                'IMPUESTO GENERAL A LAS VENTAS Y/O IMPUESTO DE PROMOCION MUNICIPAL
                resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("IGV").ToString()) = 0, "0.00", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IGV").ToString()))))
                totalIGV += Decimal.Parse(dt.Rows(i)("IGV").ToString())
                'DESCUENTO IMPUESTO GENERAL A LAS VENTAS Y/O IMPUESTO DE PROMOCION MUNICIPAL
                resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("DESC_IGV").ToString()) = 0, "0.00", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("DESC_IGV").ToString()))))
                totalDescuentoIgv += Decimal.Parse(dt.Rows(i)("DESC_IGV").ToString())

                'IMPORTE EXONERADA
                resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("IMPORTE_EXONERADA").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IMPORTE_EXONERADA").ToString()))))
                totalImportExone += Decimal.Parse(dt.Rows(i)("IMPORTE_EXONERADA").ToString())
                'IMPORTE INAFECTA
                resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("IMPORTE_INAFECTA").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IMPORTE_INAFECTA").ToString()))))
                totalImporteInafe += Decimal.Parse(dt.Rows(i)("IMPORTE_INAFECTA").ToString())
                'ISC
                resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("ISC").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("ISC").ToString()))))
                totalISC += Decimal.Parse(dt.Rows(i)("ISC").ToString())

                'BASE IMPONIBLE VENTAS DEL ARROZ PILADO
                resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("BASEIMP_ARROZ").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("BASEIMP_ARROZ").ToString()))))
                totalBaseImpArroz += Decimal.Parse(dt.Rows(i)("BASEIMP_ARROZ").ToString())
                'IMPUESTO A LAS VENTAS DEL ARROZ PILADO
                resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("IMPUESTO_ARROZ").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IMPUESTO_ARROZ").ToString()))))
                totalImpuestoArroz += Decimal.Parse(dt.Rows(i)("IMPUESTO_ARROZ").ToString())

                'IMPUESTO AL CONSUMO DE LAS BOLSAS DE PLASTICO
                resb.AppendFormat("<td align='center' >{0}</td>", String.Format("{0:##0.00}", Decimal.Parse("0.00")))

                'OTROS TRIBUTOS
                resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("OTROS_TRIBUTOS").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("OTROS_TRIBUTOS").ToString()))))
                totalTributos += Decimal.Parse(dt.Rows(i)("OTROS_TRIBUTOS").ToString())
                'IMPORTE
                resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("IMPORTE").ToString()) = 0, "0.00", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IMPORTE").ToString()))))
                totalImporte += Decimal.Parse(dt.Rows(i)("IMPORTE").ToString())
                'CODIGO MONEDA
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MONEDA").ToString()) '**                
                'TIPO DE CAMBIO                             
                If Decimal.Parse(dt.Rows(i)("VALOR_CAMBIO").ToString()) = 0 Then
                    resb.AppendFormat("<td align='center' >{0}</td>", " ") '
                    'resb.AppendFormat("<td align='center' >{0}</td>", String.Format("{0:#0.000}", Decimal.Parse(dt.Rows(i)("VALOR_CAMBIO").ToString()))) '
                Else
                    resb.AppendFormat("<td align='center' >{0}</td>", String.Format("{0:#0.000}", Decimal.Parse(dt.Rows(i)("VALOR_CAMBIO").ToString()))) '
                End If

                'REFERENCIA DEL COMPROBANTE DE PAGO O DOCUMENTO ORIGINAL QUE SE MODIFICA
                resb.AppendFormat("<td align='center' >{0}</td>", If(dt.Rows(i)("FECHA_EMISION_ORIGEN").ToString() = "", "", dt.Rows(i)("FECHA_EMISION_ORIGEN").ToString().Substring(0, 10)))
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_DCTO_SUNAT_ORIGEN").ToString()) 'falta completar TIPO
                resb.AppendFormat("<td align='center' style=""mso-number-format:'\@'"">{0}</td>", dt.Rows(i)("SERIE_ORIGEN").ToString()) 'falta completar SERIE
                resb.AppendFormat("<td align='center' style=""mso-number-format:'\@'"">{0}</td>", dt.Rows(i)("NUMERO_ORIGEN").ToString()) 'falta completar NRO

                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CONTRATO").ToString()) '**                
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("INC_TIPO_CAMBIO").ToString()) '**                
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("INDICADOR_COMPROBANTE").ToString()) '**                
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ESTADO_AJUSTE").ToString()) '**                

                resb.AppendFormat("</tr>")
            Next
            '    'Fila de totales          
            resb.AppendFormat("<tr style='font-size:9px;font-weight:700'>")
            resb.AppendFormat("<td colspan='11' align='center' style='border-bottom:1px solid white;border-left:1px solid white;' >{0}</td>", "")
            resb.AppendFormat("<td colspan='1' align='center' >TOTALES</td>")
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalValorExportacion)) 'Total BASE IMPONIBLE 1
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalBaseImponible)) 'Total IGV 1             
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalDescuentoBaseImp))
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalIGV)) 'Total IGV 3
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalDescuentoIgv))
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalImportExone)) 'Total BASE IMPONIBLE 2
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalImporteInafe)) 'Total IGV 2
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalISC)) 'Total BASE IMPONIBLE 3            
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalBaseImpArroz))
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalImpuestoArroz))
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", Decimal.Parse("0.00")))
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalTributos)) 'Total BASE_IMPONIBLE Ad. No Gravadas
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalImporte)) 'Total ISC
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("</tr>")
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