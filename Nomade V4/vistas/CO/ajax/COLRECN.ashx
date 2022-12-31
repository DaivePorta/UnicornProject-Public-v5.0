<%@ WebHandler Language="VB" Class="COLRECN" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO
Imports iTextSharp.text
Imports iTextSharp.text.pdf



Public Class COLRECN : Implements IHttpHandler


    Dim OPCION As String
    Dim p_PERS_PIDM, p_CTLG_CODE, p_SCSL_CODE, p_USUA_ID As String
    Dim p_ANIO, p_MES, p_MES_DES As String
    Dim p_RUC As String

    Dim ccCuentaPorCobrar As New Nomade.CC.CCCuentaPorCobrar("Bn")
    Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
    Dim ncSucursal As New Nomade.NC.NCSucursal("Bn")
    Dim ncCliente As New Nomade.NC.NCECliente("Bn")
    Dim periodo As New Nomade.NC.NCPeriodo("bn")
    Dim coRegistroCompras As New Nomade.CO.CORegistroCompras("Bn")

    Dim dt As System.Data.DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")


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
                Case "0" 'lista empresas
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncEmpresa.ListarEmpresa(String.Empty, "A", context.User.Identity.Name)
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
                Case "1" 'lista sucursales
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncSucursal.ListarSucursal(p_CTLG_CODE, "", "A")
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & "TODOS" & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & "TODOS" & """")
                        resb.Append("}")
                        resb.Append(",")
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
                Case "2"
                    '1 = LISTAR AÑOS
                    dt = periodo.Listar_Periodo("1")
                    res = GenerarCmbAnioMes(dt)
                Case "3"
                    '2= LISTAR MESES
                    dt = periodo.Listar_Periodo("2")
                    res = GenerarCmbAnioMes(dt)

                Case "4" 'Generar tabla: Libro 8 en interfaz
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = coRegistroCompras.ListarRegistroCompras_Libro8("2010", "1", "N", "")
                    res = GenerarTablaRegistroCompras(dt).ToString()

                Case "5"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = coRegistroCompras.ListarRegistroCompras_Libro8("2010", "1", "N", "")
                    res = GenerarPDF(dt) 'Tambien genera el .txt            


            End Select

            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try

    End Sub

    Public Function GenerarPDF(ByVal dt As System.Data.DataTable) As String
        Dim ress As String
        Dim cNomArch As String = ""
        Dim htmlText As New StringBuilder
        If Not dt Is Nothing Then
            cNomArch = "LE" + p_RUC + p_ANIO + p_MES + "00080200" + "00" + "1" + "1" + "1" + "1" + ".pdf"
        Else
            cNomArch = "LE" + p_RUC + p_ANIO + p_MES + "00080200" + "00" + "1" + "0" + "1" + "1" + ".pdf"
        End If

        'dt=
        htmlText = GenerarTablaRegistroCompras(dt)
        HTMLToPDF(htmlText, cNomArch)
        ress = GenerarTXT(dt)
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


    Public Function GenerarTXT(ByVal dt As System.Data.DataTable) As String
        Dim cadena As String = ""
        Dim archivo As String
        Dim res As String = ""
        Try
            If Not dt Is Nothing Then
                res = "Archivos\" + "LE" + p_RUC + p_ANIO + p_MES + "00080200" + "00" + "1" + "1" + "1" + "1" + ".txt"
            Else
                res = "Archivos\" + "LE" + p_RUC + p_ANIO + p_MES + "00080200" + "00" + "1" + "0" + "1" + "1" + ".txt"
            End If

            archivo = HttpContext.Current.Server.MapPath("~") + res

            If My.Computer.FileSystem.FileExists(archivo) Then
                My.Computer.FileSystem.DeleteFile(archivo)
            End If
            Dim nroCorrelativo As Integer = 0

            If Not dt Is Nothing Then
                Dim fd As New StreamWriter(archivo, True)
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
                    cadena += dt.Rows(i)("TIPO_DCTO_SUNAT").ToString() + "|" + dt.Rows(i)("SERIE").ToString() + "|" + "" + "|" + dt.Rows(i)("NUMERO").ToString() + "|"
                    'NUMERO FINAL
                    cadena += dt.Rows(i)("NRO_FINAL").ToString() + "|"
                    ''INFORMACIÓN DEL PROVEEDOR: TIPO, NUMERO
                    If (dt.Rows(i)("DNI").ToString() = "" Or dt.Rows(i)("RUC").ToString() <> "") Then 'falta VALIDAR CORRECTAMENTE
                        cadena += "06" + "|" + dt.Rows(i)("RUC").ToString() + "|"
                    Else
                        cadena += "06" + "|" + dt.Rows(i)("DNI").ToString() + "|"
                    End If
                    cadena += dt.Rows(i)("RAZON_SOCIAL").ToString() + "|"

                    ''Adquisiones:
                    If (dt.Rows(i)("OPERACION").ToString() = "S") Then

                        'cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_DSTGRA").ToString())) + "|" + String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IGV_DSTGRA").ToString())) + "|" +
                        'String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_DSTMIX").ToString())) + "|" + String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IGV_DSTMIX").ToString())) + "|" +
                        'String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_DSTNGR").ToString())) + "|" + String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IGV_DSTNGR").ToString())) + "|" +
                        'String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_DSTMIX").ToString())) + "|" +
                        'String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_OTRTRI").ToString())) + "|"

                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_DSTGRA").ToString())) + "|" + String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IGV_DSTGRA").ToString())) + "|"
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_DSTMIX").ToString())) + "|" + String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IGV_DSTMIX").ToString())) + "|"
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_DSTNGR").ToString())) + "|" + String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IGV_DSTNGR").ToString())) + "|"
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_DSTMIX").ToString())) + "|"
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_OTRTRI").ToString())) + "|"

                    ElseIf (dt.Rows(i)("OPERACION").ToString() = "DSTGRA") Then
                        ' ADQUISICIONES GRAVADAS DESTINADAS A OPERACIONES GRAVADAS Y/O DE EXPORTACIÓN   
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("VALOR").ToString())) + "|" + String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IGV").ToString())) + "|"
                        cadena += " | | | | | |"
                    ElseIf (dt.Rows(i)("OPERACION").ToString() = "DSTMIX") Then
                        ' ADQUISICIONES GRAVADAS DESTINADAS A OPERACIONES GRAVADAS Y/O DE EXPORTACIÓN Y A OPERACIONES NO GRAVADAS
                        cadena += " | |"
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("VALOR").ToString())) + "|" + String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IGV").ToString())) + "|"
                        cadena += " | | | |"
                    ElseIf (dt.Rows(i)("OPERACION").ToString() = "DSTNGR") Then
                        ' ADQUISICIONES GRAVADAS DESTINADAS A OPERACIONES NO GRAVADAS
                        cadena += " | | | |"
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("VALOR").ToString())) + "|" + String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IGV").ToString())) + "|"
                        cadena += " | |"

                    ElseIf (dt.Rows(i)("OPERACION").ToString() = "ORGNGR") Then
                        cadena += " | | | | | |"
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("VALOR").ToString())) + "|"
                        cadena += " |"
                    Else
                        cadena += " | | | | | | |"
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("VALOR").ToString())) + "|"
                    End If


                    ''ISC,OTROS TRIBUTOS Y CARGOS, IMPORTE TOTAL, nro comprobante emitido                
                    If Decimal.Parse(dt.Rows(i)("ISC").ToString()) = 0 Then
                        cadena += " |"
                    Else
                        cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("ISC").ToString())) + "|"
                    End If
                    'cadena += " |" 'OTROS TRIBUTOS Y CARGOS
                    cadena += String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IMPORTE").ToString())) + "|"

                    'CODIGO MONEDA
                    cadena += dt.Rows(i)("MONEDA").ToString() + "|"
                    'TIPO DE CAMBIO
                    If Decimal.Parse(dt.Rows(i)("VALOR_CAMBIO").ToString()) = 0 Then
                        'cadena += " |"
                        cadena += String.Format("{0:#0.000}", Decimal.Parse(dt.Rows(i)("VALOR_CAMBIO").ToString())) + "|"
                    Else
                        cadena += String.Format("{0:#0.000}", Decimal.Parse(dt.Rows(i)("VALOR_CAMBIO").ToString())) + "|"
                    End If
                    ''REFERENCIA DEL COMPROBANTE DE PAGO O DOCUMENTO ORIGINAL QUE SE MODIFICA
                    cadena += If(dt.Rows(i)("FECHA_EMISION_ORIGEN").ToString() = "", "", dt.Rows(i)("FECHA_EMISION_ORIGEN").ToString().Substring(0, 10)) + "|"
                    cadena += dt.Rows(i)("TIPO_DCTO_SUNAT_ORIGEN").ToString() + "|"
                    cadena += dt.Rows(i)("SERIE_ORIGEN").ToString() + "|"
                    cadena += dt.Rows(i)("DEPENDENCIA_ADUANERA").ToString() + "|"
                    cadena += dt.Rows(i)("NUMERO_ORIGEN").ToString() + "|"

                    'CONSTANCIA DE DEPÓSITO DE DETRACCIÓN
                    cadena += dt.Rows(i)("NUM_DEP_DETRAC").ToString() + "|"
                    cadena += If(dt.Rows(i)("FECHA_EMISION_DETRAC").ToString() = "", "", dt.Rows(i)("FECHA_EMISION_DETRAC").ToString().Substring(0, 10)) + "|"

                    'CAMPOS NUEVOS
                    cadena += dt.Rows(i)("MARCA_RETENCION").ToString() + "|"
                    cadena += dt.Rows(i)("CLASIFICACION").ToString() + "|"
                    cadena += dt.Rows(i)("CONTRATO").ToString() + "|"
                    cadena += dt.Rows(i)("INC_TIPO_CAMBIO").ToString() + "|"
                    cadena += dt.Rows(i)("INC_PROV_NOHABIDO").ToString() + "|"
                    cadena += dt.Rows(i)("INC_PROV_RENUNCIANTE").ToString() + "|"
                    cadena += dt.Rows(i)("INC_DNI").ToString() + "|"
                    cadena += dt.Rows(i)("INDICADOR_COMPROBANTE").ToString() + "|"
                    cadena += dt.Rows(i)("ESTADO_AJUSTE").ToString() + "|"
                    cadena += vbCrLf
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

    Public Function GenerarTablaRegistroCompras(ByVal dt As System.Data.DataTable) As StringBuilder
        Dim total As Decimal = 0
        res = ""
        resb.Clear()
        '------
        'Cambios : buscar '**'
        Dim dtEmpresa As New System.Data.DataTable
        dtEmpresa = ncEmpresa.ListarEmpresa(p_CTLG_CODE, "A", "")
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", "PERIODO:")
        resb.AppendFormat("<td width='75%'>{0} {1}</td>", p_MES_DES, p_ANIO)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", "RUC:")
        resb.AppendFormat("<td id='ruc' width='75%'>{0}</td>", dtEmpresa.Rows(0)("RUC").ToString())
        resb.AppendFormat("</tr>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", "APELLIDOS Y NOMBRES, DENOMINACIÓN O RAZÓN SOCIAL:")
        resb.AppendFormat("<td width='75%'>{0}</td>", dtEmpresa.Rows(0)("DESCRIPCION").ToString())
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")
        resb.AppendFormat("<br/>")

        resb.AppendFormat("<table id=""tblRegistroCompras"" border=""1"" style=""max-width:3000px;width:2570px;"" width:""2570px"">")
        resb.AppendFormat("<thead>")
        'Fila 1 CABECERA
        resb.AppendFormat("<tr style='font-size:9px;' align='center' bgcolor='#666666' color='white'>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>PERIODO</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>CÓDIGO ÚNICO DE LA OPERACIÓN (CUO)</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>NÚMERO CORRELATIVO DEL ASIENTO CONTABLE</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>FECHA DE EMISIÓN DEL COMPROBANTE DE PAGO O DOCUMENTO</th>")
        resb.AppendFormat("<th colspan='3' rowspan='2' style='width:90px;'>COMPROBANTE DE PAGO O DOCUMENTO</th>")
        resb.AppendFormat("<th rowspan='3' style='width:80px;' >VALOR DE LA ADQUISICIÓN</th>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>OTROS CONCEPTOS ADICIONALES</th>") '**    
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>IMPORTE TOTAL ADQUISICIÓN SEGÚN COMPROBANTE DE PAGO O DOCUMENTO</th>") '**
        resb.AppendFormat("<th colspan='4' rowspan='2' style='width:90px;'>COMPROBANTE DE PAGO SUSTENTA CRÉDITO FISCAL O DUA</th>")
        resb.AppendFormat("<th rowspan='3' style='width:80px;' >MONTO RETENCIÓN DE IGV</th>")
        resb.AppendFormat("<th rowspan='3' style='width:80px;' >CÓDIGO DE LA MONEDA (abla 4)</th>")
        resb.AppendFormat("<th rowspan='3' style='width:80px;' >TIPO DE CAMBIO</th>")
        resb.AppendFormat("<th colspan='4' rowspan='2' style='width:100px;'>INFORMACIÓN DEL NO DOMICILIADO</th>")
        resb.AppendFormat("<th colspan='3' rowspan='2' style='width:100px;'>INFORMACIÓN DEL BENEFICIARIO DE PAGO</th>")
        resb.AppendFormat("<th rowspan='3' style='width:80px;' >VINCULO ENTRE CONTRIBUYENTE Y NO DOMICILIADO (Tabla 27)</th>")
        resb.AppendFormat("<th rowspan='3' style='width:80px;' >RENTA BRUTA</th>")
        resb.AppendFormat("<th rowspan='3' style='width:80px;' >DEDUCCIÓN</th>")
        resb.AppendFormat("<th rowspan='3' style='width:80px;' >RENTA NETA</th>")
        resb.AppendFormat("<th rowspan='3' style='width:80px;' >TASA DE RETENCIÓN</th>")
        resb.AppendFormat("<th rowspan='3' style='width:80px;' >IMPUESTOS RETENIDOS</th>")
        resb.AppendFormat("<th rowspan='3' style='width:80px;' >CONVENIO PARA EVITAR LA DOBLE IMPOSICIÓN (Tabla 25)</th>")
        resb.AppendFormat("<th rowspan='3' style='width:80px;' >EXONERACIÓN APLICADA</th>")
        resb.AppendFormat("<th rowspan='3' style='width:80px;' >TIPO DE RENTA (Tabla 31)</th>")
        resb.AppendFormat("<th rowspan='3' style='width:80px;' >MODALIDAD DE SERVICIO PRESTADO DEL NO DOMICILIADO (Tabla 32)</th>")
        resb.AppendFormat("<th rowspan='3' style='width:80px;' >APLICACIÓN DEL PENULTIMO PARRAFO DEL ART. 76 DE LA LEY DE IMPUESTOS A LA RENTA</th>")
        resb.AppendFormat("<th rowspan='3' style='width:80px;' >ESTADO QUE IDENTIFICA LA OPORTUNIDAD DE LA ANOTACIÓN O INDICACIÓN SI ÉSTA CORRESPONDE A UN AJUSTE</th>")


        'resb.AppendFormat("<th colspan='2' rowspan='2' style='width:85px;'>ADQUISICIONES GRAVADAS DESTINADAS A OPERACIONES GRAVADAS Y/O DE EXPORTACIÓN</th>")
        'resb.AppendFormat("<th colspan='2' rowspan='2' style='width:85px;'>ADQUISICIONES GRAVADAS DESTINADAS A OPERACIONES GRAVADAS Y/O DE EXPORTACIÓN Y A OPERACIONES NO GRAVADAS</th>")
        'resb.AppendFormat("<th colspan='2' rowspan='2' style='width:85px;'>ADQUISICIONES GRAVADAS DESTINADAS A OPERACIONES NO GRAVADAS</th>")
        'resb.AppendFormat("<th rowspan='3' style='width:85px;'>VALOR DE LAS ADQUISICIONES NO GRAVADAS</th>")
        'resb.AppendFormat("<th rowspan='3' style='width:60px;'>OTROS TRIBUTOS Y CARGOS</th>")
        'resb.AppendFormat("<th rowspan='3' style='width:85px;'>ISC</th>")
        ''resb.AppendFormat("<th rowspan='3' style='width:60px;'>OTROS TRIBUTOS Y CARGOS</th>")
        'resb.AppendFormat("<th rowspan='3' style='width:85px;'>IMPORTE TOTAL</th>")
        'resb.AppendFormat("<th rowspan='3' style='width:60px;'>MONEDA</th>") '**        
        'resb.AppendFormat("<th rowspan='3' style='width:60px;'>TIPO DE CAMBIO</th>")
        'resb.AppendFormat("<th colspan='5' rowspan='2' style='width:60px;'>REFERENCIA DEL COMPROBANTE DE PAGO O DOCUMENTO ORIGINAL QUE SE MODIFICA</th>")
        'resb.AppendFormat("<th colspan='2' rowspan='2' style='width:85px;'>CONSTANCIA DE DEPÓSITO DE DETRACCIÓN (3)</th>")
        'resb.AppendFormat("<th rowspan='3' style='width:60px;'>MARCA DEL COMPROBANTE DE PAGO SUJETO A RETENCIÓN</th>") '**
        'resb.AppendFormat("<th rowspan='3' style='width:60px;'>CLASIFICACIÓN DE LOS BIENES Y SERVICIOS ADQUIRIDOS (TABLA 30)</th>") '**
        'resb.AppendFormat("<th rowspan='3' style='width:60px;'>CONTRATO DE COLABORACIÓN EMPRESARIAL</th>") '**
        'resb.AppendFormat("<th rowspan='3' style='width:60px;'>ERROR TIPO 1: INCONSISTENCIA EN EL TIPO DE CAMBIO</th>") '**
        'resb.AppendFormat("<th rowspan='3' style='width:60px;'>ERROR TIPO 2: INCONSISTENCIA POR PROVEEDORES NO HABIDOS</th>") '**
        'resb.AppendFormat("<th rowspan='3' style='width:60px;'>ERROR TIPO 3: INCONSISTENCIA POR PROVEEDORES RENUNCIANTES A LA EXONERACIÓN DEL IGV</th>") '**
        'resb.AppendFormat("<th rowspan='3' style='width:60px;'>ERROR TIPO 4: INCONSISTENCIA POR DNIs</th>") '**
        'resb.AppendFormat("<th rowspan='3' style='width:60px;'>INDICADOR DE COMPROBANTES DE PAGO CANCELADOS CON MEDIOS DE PAGO</th>") '**
        'resb.AppendFormat("<th rowspan='3' style='width:60px;'>ESTADO QUE IDENTIFICA LA OPORTUNIDAD DE LA ANOTACIÓN O INDICACIÓN SI ÉSTA CORRESPONDE A UN AJUSTE</th>") '**

        resb.AppendFormat("</tr>")
        'Fila 2 CABECERA
        resb.AppendFormat("<tr style='font-size:9px;' align='center' bgcolor='#666666' color='white'>")
        'resb.AppendFormat("<th colspan='2' style='width :60px;'>PAISES DE ORIGEN O RESIDENCIA EL NO DOMICILIADO (Tabla 35)</th>")
        'resb.AppendFormat("<th colspan='2' style='width :60px;'>APELLIDOS Y NOMBRES, DENOMINACIÓN O RAZÓN SOCIAL DEL NO DOMICILIADO</th>")
        'resb.AppendFormat("<th colspan='2' style='width:60px;'>DOMICILIO DEL SUJETO NO DOMICILIADO</th>")
        'resb.AppendFormat("<th colspan='2' style='width:60px;'>NRO. DE IDENTIFICACIÓN DEL SUJETO NO DOMICILIADO</th>")
        'resb.AppendFormat("<th colspan='2' style='width:60px;'>NRO. DE IDENTIFICACIÓN DEL BENEFICIARIO DE PAGO</th>")
        'resb.AppendFormat("<th colspan='2' style='width:100px;'>APELLIDOS Y NOMBRES, DENOMINACIÓN O RAZÓN SOCIAL DEL BENEFICIARIO DE PAGO</th>")
        'resb.AppendFormat("<th colspan='2' style='width:60px;'>PAÍS DE ORIGEN O RESIDENCIA DEL BENEFICIARIO DE PAGO (Tabla 35)</th>")

        resb.AppendFormat("</tr>")
        'Fila 3 CABECERA
        resb.AppendFormat("<tr style='font-size:9px;' align='center' bgcolor='#666666' color='white'>")
        resb.AppendFormat("<th style='width:60px;'>TIPO (TABLA 10)</th>")
        resb.AppendFormat("<th style='width:60px;'>SERIE</th>")
        resb.AppendFormat("<th style='width:60px;'>N° DEL COMPROBANTE DE PAGO</th>")

        resb.AppendFormat("<th style='width:60px;'>TIPO (TABLA 10)</th>")
        resb.AppendFormat("<th style='width:60px;'>SERIE</th>")
        resb.AppendFormat("<th style='width:60px;'>AÑO DUA O DSI QUE SUSTENTA EL CRÉDITO FISCAL</th>")
        resb.AppendFormat("<th style='width:60px;'>NÚMERO COMPROBANTE O DUA</th>")

        resb.AppendFormat("<th style='width:100px;'>PAISES DE ORIGEN O RESIDENCIA EL NO DOMICILIADO (Tabla 35)</th>")
        resb.AppendFormat("<th style='width:100px;'>APELLIDOS Y NOMBRES, DENOMINACIÓN O RAZÓN SOCIAL DEL NO DOMICILIADO</th>")
        resb.AppendFormat("<th style='width:100px;'>DOMICILIO DEL SUJETO NO DOMICILIADO</th>")
        resb.AppendFormat("<th style='width:100px;'>NRO. DE IDENTIFICACIÓN DEL SUJETO NO DOMICILIADO</th>")

        resb.AppendFormat("<th style='width:100px;'>NRO. DE IDENTIFICACIÓN DEL BENEFICIARIO DE PAGO</th>")
        resb.AppendFormat("<th style='width:100px;'>APELLIDOS Y NOMBRES, DENOMINACIÓN O RAZÓN SOCIAL DEL BENEFICIARIO DE PAGO</th>")
        resb.AppendFormat("<th style='width:100px;'>PAÍS DE ORIGEN O RESIDENCIA DEL BENEFICIARIO DE PAGO (Tabla 35)</th>")

        'resb.AppendFormat("<th style='width:55px; word-wrap:break-word;'>BASE IMPONIBLE</th>")
        'resb.AppendFormat("<th style='width:55px;'>IGV</th>")
        'resb.AppendFormat("<th style='width:55px;'>BASE IMPONIBLE</th>")
        'resb.AppendFormat("<th style='width:55px;'>IGV</th>")
        'resb.AppendFormat("<th style='width:55px;'>BASE IMPONIBLE</th>")
        'resb.AppendFormat("<th style='width:55px;'>IGV</th>")

        'resb.AppendFormat("<th style='width:85px;'>FECHA DE EMISIÓN</th>")
        'resb.AppendFormat("<th style='width:60px;'>TIPO (TABLA 10)</th>")
        'resb.AppendFormat("<th style='width:60px;'>SERIE</th>")
        'resb.AppendFormat("<th style='width:60px;'>DEPENDENCIA ADUANERA</th>") '**        
        'resb.AppendFormat("<th style='width:55px;'>NÚMERO</th>")

        'resb.AppendFormat("<th style='width:60px;'>N° DEL COMPROBANTE</th>")
        'resb.AppendFormat("<th style='width:85px;'>  FECHA   </th>")

        resb.AppendFormat("</tr>")

        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody >")

        Dim tipoAdquisicion As String = ""
        Dim nroCorrelativo As Integer = 0
        Dim totalBaseImponible1 As Decimal = 0
        Dim totalBaseImponible2 As Decimal = 0
        Dim totalBaseImponible3 As Decimal = 0
        Dim totalIGV1 As Decimal = 0
        Dim totalIGV2 As Decimal = 0
        Dim totalIGV3 As Decimal = 0
        Dim totalValorNoGravadas As Decimal = 0
        Dim totalValorOtrosTributos As Decimal = 0
        Dim totalISC As Decimal = 0
        Dim totalTributos As Decimal = 0
        Dim totalImporte As Decimal = 0
        If Not dt Is Nothing Then
            Dim editar As String = "Editar"
            For i As Integer = 0 To dt.Rows.Count - 1
                nroCorrelativo += 1
                tipoAdquisicion = dt.Rows(i)("OPERACION").ToString()
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
                resb.AppendFormat("<td align='center' >{0}</td>", "") 'TO DO
                'N° DEL COMPROBANTE DE PAGO
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NUMERO").ToString())
                'N° FINAL
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NRO_FINAL").ToString()) '**
                'INFORMACIÓN DEL PROVEEDOR
                If (dt.Rows(i)("DNI").ToString() = "" Or dt.Rows(i)("RUC").ToString() <> "") Then 'TO DO: VALIDAR CORRECTAMENTE
                    resb.AppendFormat("<td align='center' >{0}</td>", "06")
                    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RUC").ToString())
                Else
                    resb.AppendFormat("<td align='center' >{0}</td>", "01")
                    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DNI").ToString())
                End If
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("RAZON_SOCIAL").ToString())
                'Adquisiones
                If (tipoAdquisicion = "S") Then
                    resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("MONTO_DSTGRA").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_DSTGRA").ToString()))))
                    resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("IGV_DSTGRA").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IGV_DSTGRA").ToString()))))
                    resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("MONTO_DSTMIX").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_DSTMIX").ToString()))))
                    resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("IGV_DSTMIX").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IGV_DSTMIX").ToString()))))
                    resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("MONTO_DSTNGR").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_DSTNGR").ToString()))))
                    resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("IGV_DSTNGR").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IGV_DSTNGR").ToString()))))
                    resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("MONTO_ORGNGR").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_ORGNGR").ToString()))))
                    resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("MONTO_OTRTRI").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_OTRTRI").ToString()))))
                    totalBaseImponible1 += Decimal.Parse(dt.Rows(i)("MONTO_DSTGRA").ToString())
                    totalIGV1 += Decimal.Parse(dt.Rows(i)("IGV_DSTGRA").ToString())
                    totalBaseImponible2 += Decimal.Parse(dt.Rows(i)("MONTO_DSTMIX").ToString())
                    totalIGV2 += Decimal.Parse(dt.Rows(i)("IGV_DSTMIX").ToString())
                    totalBaseImponible3 += Decimal.Parse(dt.Rows(i)("MONTO_DSTNGR").ToString())
                    totalIGV3 += Decimal.Parse(dt.Rows(i)("IGV_DSTNGR").ToString())
                    totalValorNoGravadas += Decimal.Parse(dt.Rows(i)("MONTO_ORGNGR").ToString())
                    totalValorOtrosTributos += Decimal.Parse(dt.Rows(i)("MONTO_OTRTRI").ToString())
                ElseIf (tipoAdquisicion = "DSTGRA") Then
                    ' ADQUISICIONES GRAVADAS DESTINADAS A OPERACIONES GRAVADAS Y/O DE EXPORTACIÓN                    
                    resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("VALOR").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("VALOR").ToString()))))
                    resb.AppendFormat("<td align='center' >{0}</td>", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IGV").ToString())))
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    'Suma para el total
                    totalBaseImponible1 += Decimal.Parse(dt.Rows(i)("VALOR").ToString())
                    totalIGV1 += Decimal.Parse(dt.Rows(i)("IGV").ToString())
                ElseIf (tipoAdquisicion = "DSTMIX") Then
                    ' ADQUISICIONES GRAVADAS DESTINADAS A OPERACIONES GRAVADAS Y/O DE EXPORTACIÓN Y A OPERACIONES NO GRAVADAS
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("VALOR").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("VALOR").ToString()))))
                    resb.AppendFormat("<td align='center' >{0}</td>", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IGV").ToString())))
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    '--Suma para el total
                    totalBaseImponible2 += Decimal.Parse(dt.Rows(i)("VALOR").ToString())
                    totalIGV2 += Decimal.Parse(dt.Rows(i)("IGV").ToString())
                ElseIf (tipoAdquisicion = "DSTNGR") Then
                    ' ADQUISICIONES GRAVADAS DESTINADAS A OPERACIONES NO GRAVADAS
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("VALOR").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("VALOR").ToString()))))
                    resb.AppendFormat("<td align='center' >{0}</td>", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IGV").ToString())))
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    '--Suma para el total
                    totalBaseImponible3 += Decimal.Parse(dt.Rows(i)("VALOR").ToString())
                    totalIGV3 += Decimal.Parse(dt.Rows(i)("IGV").ToString())
                ElseIf (tipoAdquisicion = "ORGNGR") Then
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("VALOR").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("VALOR").ToString()))))
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    '--Suma para el total
                    totalValorNoGravadas += Decimal.Parse(dt.Rows(i)("VALOR").ToString())
                Else
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("VALOR").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("VALOR").ToString()))))
                    '--Suma para el total
                    totalValorOtrosTributos += Decimal.Parse(dt.Rows(i)("VALOR").ToString())
                End If
                'ISC,OTROS TRIBUTOS Y CARGOS, IMPORTE TOTAL, nro comprobante emitido                
                If Decimal.Parse(dt.Rows(i)("ISC").ToString()) = 0 Then
                    resb.AppendFormat("<td align='center' >{0}</td>", "")
                Else
                    resb.AppendFormat("<td align='center' >{0}</td>", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("ISC").ToString())))
                End If
                'resb.AppendFormat("<td align='center' >{0}</td>", "") 'OTROS TRIBUTOS Y CARGOS
                resb.AppendFormat("<td align='center' >{0}</td>", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IMPORTE").ToString())))
                'CODIGO MONEDA
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MONEDA").ToString()) '**                
                'TIPO DE CAMBIO
                If Decimal.Parse(dt.Rows(i)("VALOR_CAMBIO").ToString()) = 0 Then
                    'resb.AppendFormat("<td align='center' >{0}</td>", " ") '
                    resb.AppendFormat("<td align='center' >{0}</td>", String.Format("{0:#0.000}", Decimal.Parse(dt.Rows(i)("VALOR_CAMBIO").ToString()))) '
                Else
                    resb.AppendFormat("<td align='center' >{0}</td>", String.Format("{0:#0.000}", Decimal.Parse(dt.Rows(i)("VALOR_CAMBIO").ToString()))) '
                End If
                'REFERENCIA DEL COMPROBANTE DE PAGO O DOCUMENTO ORIGINAL QUE SE MODIFICA
                resb.AppendFormat("<td align='center' >{0}</td>", If(dt.Rows(i)("FECHA_EMISION_ORIGEN").ToString() = "", "", dt.Rows(i)("FECHA_EMISION_ORIGEN").ToString().Substring(0, 10)))
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_DCTO_SUNAT_ORIGEN").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("SERIE_ORIGEN").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DEPENDENCIA_ADUANERA").ToString()) '**                
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NUMERO_ORIGEN").ToString())

                'CONSTANCIA DE DEP
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NUM_DEP_DETRAC").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", If(dt.Rows(i)("FECHA_EMISION_DETRAC").ToString() = "", "", dt.Rows(i)("FECHA_EMISION_DETRAC").ToString().Substring(0, 10)))
                '

                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MARCA_RETENCION").ToString()) '**                
                'resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CLASIFICACION").ToString()) '**    
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CLASIFICACION").ToString()) '**   
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CONTRATO").ToString()) '**                
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("INC_TIPO_CAMBIO").ToString()) '**                
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("INC_PROV_NOHABIDO").ToString()) '**                
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("INC_PROV_RENUNCIANTE").ToString()) '**                
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("INC_DNI").ToString()) '**                
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("INDICADOR_COMPROBANTE").ToString()) '**                
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ESTADO_AJUSTE").ToString()) '**                

                resb.AppendFormat("</tr>")
                '---Suma de totales
                totalISC += Decimal.Parse(dt.Rows(i)("ISC").ToString())
                'totalTributos += 0
                totalImporte += Decimal.Parse(dt.Rows(i)("IMPORTE").ToString())

            Next

            'Fila de totales          
            resb.AppendFormat("<tr style='font-size:9px;font-weight:700'>")
            resb.AppendFormat("<td colspan='12' align='center' style='border-bottom:1px solid white;border-left:1px solid white;' >{0}</td>", "") '**
            resb.AppendFormat("<td colspan='1' align='center' >TOTALES</td>")
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalBaseImponible1)) 'Total BASE IMPONIBLE 1
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalIGV1)) 'Total IGV 1 
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalBaseImponible2)) 'Total BASE IMPONIBLE 2
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalIGV2)) 'Total IGV 2
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalBaseImponible3)) 'Total BASE IMPONIBLE 3
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalIGV3)) 'Total IGV 3
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalValorNoGravadas)) 'Total Valor Ad. No Gravadas
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalValorOtrosTributos)) 'Total Otros Tributos y Cargos
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalISC)) 'Total ISC
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalImporte)) 'Total Importes Total
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>") '**
            resb.AppendFormat("<td colspan='1' align='center' ></td>") '**
            resb.AppendFormat("<td colspan='1' align='center' ></td>") '**
            resb.AppendFormat("<td colspan='1' align='center' ></td>") '**
            resb.AppendFormat("<td colspan='1' align='center' ></td>") '**
            resb.AppendFormat("<td colspan='1' align='center' ></td>") '**
            resb.AppendFormat("<td colspan='1' align='center' ></td>") '**
            resb.AppendFormat("<td colspan='1' align='center' ></td>") '**
            resb.AppendFormat("<td colspan='1' align='center' ></td>") '**
            resb.AppendFormat("<td colspan='1' align='center' ></td>") '**

            resb.AppendFormat("</tr>")
        Else
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td colspan='41' align='center' >{0}</td>", "NO HAY DATOS")
            resb.AppendFormat("</tr>")
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")

        res = resb.ToString()
        'Return res
        Return resb
    End Function



    Public Function GenerarCmbAnioMes(ByVal dt As System.Data.DataTable) As String
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


    Public Sub ExportToExcel(dt As System.Data.DataTable, ByRef context As HttpContext)
        If dt.Rows.Count > 0 Then
            Dim filename As String = "DownloadExcel.xls"
            Dim tw As New System.IO.StringWriter()
            Dim hw As New System.Web.UI.HtmlTextWriter(tw)
            Dim dgGrid As New DataGrid()
            dgGrid.DataSource = dt
            dgGrid.DataBind()

            'Get the HTML for the control.
            dgGrid.RenderControl(hw)

            'Write the HTML back to the browser.
            context.Response.ContentType = "application/vnd.ms-excel"
            context.Response.AppendHeader("Content-Disposition", (Convert.ToString("attachment; filename=") & filename) + "")
            ' Me.EnableViewState = False
            context.Response.Write(tw.ToString())
            context.Response.End()
        End If
    End Sub

    Private Function SortDataTableColumn(ByVal dt As System.Data.DataTable, ByVal column As String, ByVal sort As String) As System.Data.DataTable
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