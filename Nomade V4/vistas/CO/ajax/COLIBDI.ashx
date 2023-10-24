<%@ WebHandler Language="VB" Class="COLIBDI" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO
Imports iTextSharp.text
Imports iTextSharp.text.pdf

Public Class COLIBDI : Implements IHttpHandler

    Dim OPCION As String
    Dim p_PERS_PIDM, p_CTLG_CODE, p_SCSL_CODE, p_USUA_ID As String
    Dim p_ANIO, p_MES, p_MES_DES, p_DESC_EMPRESA As String
    Dim p_RUC As String

    Dim ccCuentaPorCobrar As New Nomade.CC.CCCuentaPorCobrar("Bn")
    Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
    Dim ncSucursal As New Nomade.NC.NCSucursal("Bn")
    Dim ncCliente As New Nomade.NC.NCECliente("Bn")
    Dim periodo As New Nomade.NC.NCPeriodo("bn")
    Dim coLibroContable As New Nomade.CO.COLibroDiario("Bn")

    Dim dt As System.Data.DataTable
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
                    dt = coLibroContable.listarLibroDiario(p_ANIO, p_MES, p_CTLG_CODE, "")
                    res = GenerarTablaLibroDiario(dt).ToString()
                    'GenerarTXT(dt) 'Genera el .txt 

                Case "5"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = coLibroContable.listarLibroDiario(p_ANIO, p_MES, p_CTLG_CODE, "")
                    res = GenerarPDF(dt) 'Tambien genera el .txt            
            End Select

            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try

    End Sub

    Public Function GenerarPDF(ByVal dt As DataTable) As String
        Dim ress As String = ""
        Dim cNomArch As String = ""
        Dim htmlText As New StringBuilder
        If Not dt Is Nothing Then
            cNomArch = "LE" + p_RUC + p_ANIO + p_MES + "00050100" + "00" + "1" + "1" + "1" + "1" + ".pdf"
        Else
            cNomArch = "LE" + p_RUC + p_ANIO + p_MES + "00050100" + "00" + "1" + "0" + "1" + "1" + ".pdf"
        End If

        'dt=
        htmlText = GenerarTablaLibroDiario(dt)
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
                res = "Archivos\" + "LE" + p_RUC + p_ANIO + p_MES + "00050100" + "00" + "1" + "1" + "1" + "1" + ".txt"
            Else
                res = "Archivos\" + "LE" + p_RUC + p_ANIO + p_MES + "00050100" + "00" + "1" + "0" + "1" + "1" + ".txt"
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
                    cadena += dt.Rows(i)("PERIODO").ToString() + "|" + dt.Rows(i)("CUO").ToString() + "|" + dt.Rows(i)("CORRELATIVO").ToString() + "|"

                    'TIPO PLAN, CUENTA CONTABLE, FECHA_OPERACION
                    cadena += dt.Rows(i)("TIPL").ToString() + "|" + dt.Rows(i)("CUENTA_CONTABLE").ToString() + "|" + dt.Rows(i)("FECHA_OPERACION").ToString() + "|"

                    'DESCRIPCIÓN, DEBE, HABER
                    cadena += dt.Rows(i)("DESCRIPCION").ToString() + "|" + dt.Rows(i)("MONTO_DEBE").ToString() + "|" + dt.Rows(i)("MONTO_HABER").ToString() + "|"

                    'CORRELATIVO DE REGISTRO DE VENTAS-COMPRAS-CONSIGNACION, ESTADO OPERACIÓN
                    cadena += dt.Rows(i)("CORR_REG_VENTAS").ToString() + "|" + dt.Rows(i)("CORR_REG_COMPRAS").ToString() + "|" + dt.Rows(i)("CORR_REG_CONSIG").ToString() + "|" +
                              dt.Rows(i)("ESTADO_OPERACION").ToString()

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

    Public Function GenerarTablaLibroDiario(ByVal dt As System.Data.DataTable) As StringBuilder
        Dim total As Decimal = 0
        res = ""
        resb.Clear()
        '------
        'Cambios : buscar '**'
        'Dim dtEmpresa As New System.Data.DataTable
        'dtEmpresa = ncEmpresa.ListarEmpresa(p_CTLG_CODE, "A", "")
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", "PERIODO:")
        resb.AppendFormat("<td width='75%'>{0} {1}</td>", p_MES_DES, p_ANIO)
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

        resb.AppendFormat("<table id=""tblLibroDiario"" border=""1"" style=""max-width:3000px;width:2570px;"" width:""2570px"">")
        resb.AppendFormat("<thead>")
        'Fila 1 CABECERA
        resb.AppendFormat("<tr style='font-size:9px;' align='center' bgcolor='#666666' color='white'>")
        resb.AppendFormat("<th rowspan='2' style='width:75px;'>PERIODO</th>") '**
        resb.AppendFormat("<th rowspan='2' style='width:75px;'>CÓDIGO ÚNICO DE LA OPERACIÓN (CUO)</th>") '**
        resb.AppendFormat("<th rowspan='2' style='width:75px;'>NÚMERO CORRELATIVO DEL ASIENTO CONTABLE</th>") '**
        resb.AppendFormat("<th rowspan='2' style='width:85px;'>CUENTA CONTABLE</th>")
        resb.AppendFormat("<th rowspan='2' style='width:85px;'>CÓDIGO UNIDAD OPERATIVA</th>")
        resb.AppendFormat("<th rowspan='2' style='width:85px;'>CENTRO DE COSTOS</th>")
        resb.AppendFormat("<th rowspan='2' style='width:85px;'>TIPO DE MONEDA</th>")
        resb.AppendFormat("<th colspan='2' rowspan='1' style='width:60px;'>IDENTIDAD DEL EMISOR</th>")
        resb.AppendFormat("<th colspan='3' rowspan='1' style='width:60px;'>COMPROBANTE DE PAGO O DOCUMENTO</th>")
        resb.AppendFormat("<th rowspan='2' style='width:80px;' >FECHA CONTABLE</th>")
        resb.AppendFormat("<th rowspan='2' style='width:75px;'>FECHA DE VENCIMIENTO</th>") '**        
        resb.AppendFormat("<th rowspan='2' style='width:75px;'>FECHA DE OPERACIÓN O EMISIÓN</th>") '** 
        resb.AppendFormat("<th rowspan='2' style='width:75px;'>DESCRIPCIÓN OPERACIÓN</th>") '** 
        resb.AppendFormat("<th rowspan='2' style='width:75px;'>GLOSA REFERENCIAL</th>") '** 
        resb.AppendFormat("<th colspan='2' rowspan='1' style='width:60px;'>MOVIMIENTOS</th>")
        resb.AppendFormat("<th rowspan='2' style='width:60px;'>CÓDIGO DEL LIBRO</th>") '**
        resb.AppendFormat("<th rowspan='2' style='width:60px;'>ESTADO QUE IDENTIFICA LA OPORTUNIDAD DE LA ANOTACIÓN O INDICACIÓN SI ÉSTA CORRESPONDE A UN AJUSTE</th>") '**

        resb.AppendFormat("</tr>")
        'Fila 2 CABECERA
        resb.AppendFormat("<tr style='font-size:9px;' align='center' bgcolor='#666666' color='white'>")
        resb.AppendFormat("<th style='width:60px;'>TIPO DOC. INDENTIDAD</th>")
        resb.AppendFormat("<th style='width:60px;'>NRO. DOC. IDENTIDAD</th>")
        resb.AppendFormat("<th style='width:60px;'>TIPO (TABLA 10)</th>")
        resb.AppendFormat("<th style='width:60px;'>N° SERIE </th>")
        resb.AppendFormat("<th style='width:60px;'>NÚMERO</th>")
        resb.AppendFormat("<th style='width:60px;'>DEBE</th>")
        resb.AppendFormat("<th style='width:60px;'>HABER</th>")
        resb.AppendFormat("</tr>")

        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody >")

        Dim nroCorrelativo As Integer = 0
        Dim totalDebe As Decimal = 0
        Dim totalHaber As Decimal = 0
        If Not dt Is Nothing Then
            Dim editar As String = "Editar"
            For i As Integer = 0 To dt.Rows.Count - 1
                nroCorrelativo += 1
                resb.AppendFormat("<tr style='font-size:9px;'>")
                'PERIODO , CUO, CORRELATIVO ASIENTO CONTABLE
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("PERIODO").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CUO").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NRO_MOV").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CUENTA_CONTABLE").ToString()) '**

                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("COD_UNIDAD_OPERATIVA").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CENTRO_COSTOS").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_MONEDA").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_DOC_IDENTIDAD").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NRO_DOC_IDENTTIDAD").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_DOC_COMPROBANTE").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("SERIE_COMPROBANTE").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NRO_COMPROBANTE").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("FECHA_CONTABLE").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("FECHA_VENCIMIENTO").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("FECHA_EMISION").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CTAS_DESCRIPCION").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("GLOSA_REFERENCIAL").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DEBE").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("HABER").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODIGO_LIBRO").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ESTADO_AJUSTE").ToString()) '**

                totalDebe += Decimal.Parse(dt.Rows(i)("DEBE").ToString())
                totalHaber += Decimal.Parse(dt.Rows(i)("HABER").ToString())
            Next
            'Fila de totales          
            resb.AppendFormat("<tr style='font-size:9px;font-weight:700'>")
            resb.AppendFormat("<td colspan='16' align='center' style='border-bottom:1px solid white;border-left:1px solid white;' >{0}</td>", "") '**
            resb.AppendFormat("<td colspan='1' align='center' >TOTALES</td>")
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalDebe)) 'Total Debe
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalHaber)) 'Total Haber
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