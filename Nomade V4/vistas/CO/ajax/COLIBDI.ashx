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
    Dim p_ANIO, p_MES, p_MES_DES As String
    Dim p_RUC As String
  
    Dim ccCuentaPorCobrar As New Nomade.CC.CCCuentaPorCobrar("Bn")
    Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
    Dim ncSucursal As New Nomade.NC.NCSucursal("Bn")
    Dim ncCliente As New Nomade.NC.NCECliente("Bn")
    Dim periodo As New Nomade.NC.NCPeriodo("bn")
    Dim coLibroContable As New Nomade.CO.COLibroDiario("Bn")
    
    Dim dt As DataTable
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
                                  
                Case "1" 'Generar tabla: Libro 8 en interfaz
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = coLibroContable.listarLibroDiario(p_CTLG_CODE, p_ANIO, p_MES, "")
                    res = GenerarTablaLibroDiario(dt).ToString()
                    
                Case "2"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = coLibroContable.listarLibroDiario(p_CTLG_CODE, p_ANIO, p_MES, "")
                    res = GenerarPDF(dt) 'Tambien genera el .txt            
            End Select
            
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
        
    End Sub
 
    Public Function GenerarPDF(ByVal dt As DataTable) As String
        Dim ress As String
        
        Dim cNomArch As String
        Dim htmlText As New StringBuilder
        If Not dt Is Nothing Then
            cNomArch = "LE" + p_RUC + p_ANIO + p_MES + "00050100" + "00" + "1" + "1" + "1" + "1" + ".pdf"
        Else
            cNomArch = "LE" + p_RUC + p_ANIO + p_MES + "00050100" + "00" + "1" + "0" + "1" + "1" + ".pdf"
        End If
        
        'dt=
        htmlText = GenerarTablaLibroDiario(dt)
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
         
    
    Public Function GenerarTXT(ByVal dt As DataTable) As String
        Dim cadena As String = ""
        Dim archivo As String
        Dim res As String = ""
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
                    
                    cadena += vbCrLf
                Next
                fd.WriteLine(cadena)
                fd.Close()
                res = "ok"
            Else
                Dim fd As New StreamWriter(archivo, True)
                fd.WriteLine(cadena)
                fd.Close()
                res = "vacio"
            End If
        Catch ex As Exception
            res = "error"
        End Try
        Return res
    End Function
    
    Public Function GenerarTablaLibroDiario(ByVal dt As DataTable) As StringBuilder
        Dim total As Decimal = 0
        res = ""
        resb.Clear()
        '------
        Dim dtEmpresa As New DataTable
        dtEmpresa = ncEmpresa.ListarEmpresa(p_CTLG_CODE, "A", "")
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", "PERIODO:")
        resb.AppendFormat("<td width='75%'  style=""mso-number-format:'\@'"">{0} {1}</td>", p_MES_DES, p_ANIO)
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
        
        resb.AppendFormat("<table id=""tblLibroDiario"" border=""1"" style=""max-width:3000px;width:1500px;"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<tr style='font-size:12px;color:white' align='center' bgcolor='#666666'>")
        resb.AppendFormat("<th style='width:75px;'>PERIODO</th>")
        resb.AppendFormat("<th style='width:75px;'>CÓDIGO ÚNICO DE LA OPERACIÓN (CUO)</th>")
        resb.AppendFormat("<th style='width:75px;'>NÚMERO CORRELATIVO DEL ASIENTO CONTABLE</th>")
        resb.AppendFormat("<th style='width:75px;'>PLAN CONTABLE USADO POR EL DEUDOR TRIBUTARIO (TABLA 17)</th>")
        resb.AppendFormat("<th style='width:75px;'>CÓDIGO DE CUENTA CONTABLE </th>")
        resb.AppendFormat("<th style='width:75px;'>FECHA DE OPERACIÓN</th>")
        resb.AppendFormat("<th style='width:150px;'>GLOSA DE LA NATURALEZA DE LA OPERACIÓN</th>")
        resb.AppendFormat("<th style='width:75px;'>DEBE</th>")
        resb.AppendFormat("<th style='width:75px;'>HABER</th>")
        resb.AppendFormat("<th style='width:75px;'>CORRELATIVO EN REGISTRO DE VENTA</th>")
        resb.AppendFormat("<th style='width:75px;'>CORRELATIVO EN REGISTRO DE COMRPA</th>")
        resb.AppendFormat("<th style='width:75px;'>CORRELATIVO EN REGISTRO DE CONSIGNACIONES</th>")
        resb.AppendFormat("<th style='width:75px;'>ESTADO DE LA OPERACIÓN</th>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")
                                 
        Dim totalDebe As Decimal = 0
        Dim totalHaber As Decimal = 0

        
        If Not dt Is Nothing Then
            For i As Integer = 0 To dt.Rows.Count - 1
                'nroCorrelativo += 1               
                resb.AppendFormat("<tr style='font-size:10px;'>")
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("PERIODO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CUO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CORRELATIVO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPL").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CUENTA_CONTABLE").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("FECHA_OPERACION").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("DESCRIPCION").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MONTO_DEBE").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MONTO_HABER").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CORR_REG_VENTAS").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CORR_REG_COMPRAS").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CORR_REG_CONSIG").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ESTADO_OPERACION").ToString())
                
                If dt.Rows(i)("MONTO_DEBE").ToString().Equals(String.Empty) Then
                    totalDebe += 0
                Else
                    totalDebe += Decimal.Parse(dt.Rows(i)("MONTO_DEBE").ToString())
                End If
                
                If dt.Rows(i)("MONTO_HABER").ToString().Equals(String.Empty) Then
                    totalHaber += 0
                Else
                    totalHaber += Decimal.Parse(dt.Rows(i)("MONTO_HABER").ToString())
                End If
                
            Next
            '    'Fila de totales          
            resb.AppendFormat("<tr style='font-size:10px;font-weight:700'>")
            resb.AppendFormat("<td colspan='6' align='center' style='border-bottom:1px solid white;border-left:1px solid white;' >{0}</td>", "")
            resb.AppendFormat("<td colspan='1' align='center' >TOTALES</td>")
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalDebe))
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalHaber))
            resb.AppendFormat("<td colspan='4' align='center' ></td>")
            resb.AppendFormat("</tr>")
        Else
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", "NO HAY DATOS")
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