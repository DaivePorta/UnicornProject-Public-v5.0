<%@ WebHandler Language="VB" Class="NALLRIV" %>

Imports iTextSharp.text
Imports iTextSharp.text.pdf
Imports System
Imports System.Web
Imports System.Data
Imports System.IO

Public Class NALLRIV : Implements IHttpHandler
    
    Dim code As String
    Dim opcion As String
    Dim p_alamcen, p_grupo, p_scl, p_UNME_DET, p_TIPO, p_mone_code, p_prd, p_moneda As String
    Dim total As Decimal
    Dim CODIGO, EMPRESA, ALMACEN, DESCRIPCION,
   TIPO_ALMACEN,
   TIPO_ALMACENAJE, ESTADO, USUARIO, SISTEMA_ALMACENAJE, PALETIZADO_IND, NRO_PALETS As String
    
    
    Dim dt As DataTable
    Dim dtp As DataTable
    Dim p As New NOMADE.NA.NASeccionesAlmacen("bn")
    Dim gPro As New NOMADE.NM.NMGestionProductos("BN")
    Dim empre As New NOMADE.NC.NCEmpresa("BN")
    Dim almace As New Nomade.NA.NAConfAlmacenes("BN")
    Dim reportes As New Nomade.NA.NAReportes("BN")
    Dim res As String
    Dim p_alamcen1 As String
    Dim p_prd1 As String
    Dim p_scl1 As String
    Dim resb As New StringBuilder
    Dim Prod As New NOMADE.NM.NMGestionProductos("Bn")
    Dim periodo As New NOMADE.NC.NCPeriodo("bn")
    Dim codempr As String
    Dim usua As String
    Dim p_tipo_op As String
    
    Dim p_anio As String
    Dim p_mes As String
    Dim p_ruc As String
    Dim p_emp As String
    Dim p_direcc As String
    Dim p_codExis As String
    Dim p_tipoExist As String
    Dim p_Descr As String
    Dim p_unidad As String
    Dim p_mesDes As String
    Dim cadena As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        'url: "vistas/na/ajax/NALKARD.ashx?OPCION=2&p_alamcen=" + $('#hf10').val() + "&p_scl=" + $('#cboEmpresas').val() + "&p_moneda=" + $('#slsMoneda').val() + "&p_prd=" + $('#hdcodProd').val(),
        
        opcion = context.Request("OPCION")
        code = context.Request("code")
        p_alamcen = context.Request("p_alamcen")
        p_grupo = context.Request("p_grupo")
        p_moneda = context.Request("p_moneda")
        p_scl = context.Request("p_scl")
        p_UNME_DET = context.Request("p_UNME_DET")
        p_TIPO = context.Request("p_TIPO")
        p_prd = context.Request("p_prd")
        CODIGO = context.Request("CODIGO")
        EMPRESA = context.Request("EMPRESA")
        ALMACEN = context.Request("ALMACEN")
        DESCRIPCION = context.Request("DESCRIPCION")
        TIPO_ALMACEN = context.Request("TIPO_ALMACEN")
        p_tipo_op = context.Request("p_tipo_op")
        
        p_scl1 = context.Request("p_scl1")
        p_prd1 = context.Request("p_prd1")
        p_alamcen1 = context.Request("p_alamcen1")
        p_anio = context.Request("p_anio")
        p_mes = context.Request("p_mes")
        p_ruc = context.Request("p_ruc")
        p_emp = context.Request("p_emp")
        p_direcc = context.Request("p_direcc")
        p_codExis = context.Request("p_codExis")
        p_tipoExist = context.Request("p_tipoExist")
        p_Descr = context.Request("p_Descr")
        p_unidad = context.Request("p_unidad")
        p_mesDes = context.Request("p_mesDes")
        
        
        
        
        TIPO_ALMACENAJE = context.Request("TIPO_ALMACENAJE")
        total = 0
             
        ESTADO = context.Request("ESTADO")

        USUARIO = context.Request("USUARIO")
       
        SISTEMA_ALMACENAJE = context.Request("SISTEMA_ALMACENAJE")
        
        PALETIZADO_IND = context.Request("PALETIZADO_IND")
        
        NRO_PALETS = context.Request("NRO_PALETS")
        If (NRO_PALETS = String.Empty) Then
            NRO_PALETS = "0"
        End If
        
        codempr = context.Request("codempr")
        usua = context.Request("usua")
        
        Try
            
            Select Case opcion
                
                Case "1"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = Prod.LISTAR_PRODUCTO("", "", "", "", "", p_scl)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO_ANTIGUO"" :" & """" & MiDataRow("CODIGO_ANTIGUO").ToString & """,")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""UNIDAD"" :" & """" & MiDataRow("UNIDAD").ToString & """,")
                            resb.Append("""DESC_UNIDAD_DESPACHO"" :" & """" & MiDataRow("DESC_UNIDAD_DESPACHO").ToString & """,")
                            resb.Append("""NO_SERIADA"" :" & """" & MiDataRow("NO_SERIADA").ToString & """,")
                            resb.Append("""SERVICIO"" :" & """" & MiDataRow("SERVICIO").ToString & """,")
                            resb.Append("""DESC_ADM"" :" & """" & MiDataRow("DESC_ADM").ToString & """,")
                            resb.Append("""SERVICIO"" :" & """" & MiDataRow("SERVICIO").ToString & """,")
                            resb.Append("""CODE_EXISTENCIA"" :" & """" & MiDataRow("CODE_EXISTENCIA").ToString & """,")
                            resb.Append("""DESC_EXISTENCIA"" :" & """" & MiDataRow("DESC_EXISTENCIA").ToString & """,")
                            resb.Append("""CODE_SUNAT"" :" & """" & MiDataRow("CODE_SUNAT").ToString & """,")
                            resb.Append("""COD_UNMED_SUNAT"" :" & """" & MiDataRow("COD_UNMED_SUNAT").ToString & """,")
                            
                            'resb.Append("""COD_EXISTENCIA"" :" & """" & MiDataRow("CODE_EXISTENCIA").ToString & """,")
                            'resb.Append("""DESC_EXISTENCIA"" :" & """" & MiDataRow("DESC_EXISTENCIA").ToString & """,")
                            resb.Append("""MANUFACTURADA"" :" & """" & MiDataRow("MANUFACTURADA").ToString & """")
                            
                           
                            
                            resb.Append("}")
                            
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "2"
                    dtp = gPro.LISTAR_KARDEX(p_prd, p_alamcen, p_moneda, p_scl)
                    GenerarTablaPro(dtp)
                Case "3"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = empre.ListarEmpresa(p_scl, "A", "")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""RUC"" :" & """" & MiDataRow("RUC").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "4"
                    
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = almace.ListarAlmacenes(p_alamcen, p_scl, "", "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""DIRECCION"" :" & """" & MiDataRow("DIRECCION").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                   
                Case "5"
                    
                    dt = periodo.Listar_Periodo(p_tipo_op)
                    res = GenerarSelect1(dt, "codigo", "descripcion", "AÑO")
                        
                Case "6"

                    dt = periodo.Listar_Periodo(p_tipo_op)
                    res = GenerarSelect1(dt, "codigo", "descripcion", "MES")
                Case "7"
                    
                
                    'res = exportar(p_anio, p_mes, p_ruc, p_emp, p_direcc, p_codExis, p_tipoExist, p_Descr, p_unidad, p_prd1, p_alamcen1, p_scl1)
                    res = exportar2()
                    
                Case "8"
                    
                    dt = reportes.LISTAR_INVENT_UND_FISICAS(p_prd, p_alamcen, p_scl, p_anio, p_mes)
                    GenerarTablaPro(dt)
                    
                Case "9"
                    descargar()
                    
                   
                    
                    
                   
                    
                   
                 
            End Select
            
            context.Response.Write(res)
            
        Catch ex As Exception

            context.Response.Write("error" & ex.ToString)
            
        End Try
    End Sub
        
    
    
    Public Function GenerarSelect1(ByVal dt As DataTable, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then
           
            
            res = "<option></option>"
            If p_tipo_op.Equals("2") Then
                res += "<option  value='00'>TODOS</option>"
            End If
           
            For i As Integer = 0 To dt.Rows.Count - 1
              
                res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
               
            Next
        
        Else
            res = "error"
        End If
        Return res
    End Function
    
    
    Public Function descargar() As String
        
        Try
            Dim file = "Archivos\" + "LE" + p_ruc + p_anio + p_mes + "00120100" + "00" + "1" + "1" + "1" + "1" + ".txt"
            Dim file2 = p_anio + p_mes
           
            Dim des As String
            des = "<a href='data:application/txt;charset=utf-8," + file + "' download='" + file2 + ".txt' >" + file2 + "</a>"
            res = des
            '<a href="data:application/csv;charset=utf-8,Col1%2CCol2%2CCol3%0AVal1%2CVal2%2CVal3%0AVal11%2CVal22%2CVal33%0AVal111%2CVal222%2CVal333" download="somedata.csv">Example</a>
            
            'Dim ress = HttpContext.Current.Response
            'Dim fil As String
            'fil = HttpContext.Current.Server.MapPath("~") + file
            'ress.Clear()
            'ress.ContentType = "application/octet-stream"
            'ress.AddHeader("Content-Disposition", "attachment; fileName=binaries/file")
            'ress.WriteFile(fil)
            'ress.Flush()
            'ress.End()
        Catch ex As Exception
            
        End Try
        Return res
    End Function
    

    

    Public Function exportar2() As String
        Dim ress As String
        
        Dim htmlText As New StringBuilder
        Dim cNomArch As String = "LE" + p_ruc + p_anio + p_mes + "00130100" + "00" + "1" + "1" + "1" + "1" + ".pdf"
        htmlText = getHtmlTextPDF()
        HTMLToPDF(htmlText, cNomArch)
        exportar()
        ress = "ok"
        Return ress
    End Function
    
    Public Function exportar() As String
        
        
        Dim cadena As String
        Dim archivo As String
        Dim res As String
        
        
        res = "Archivos\" + "LE" + p_ruc + p_anio + p_mes + "00130100" + "00" + "1" + "1" + "1" + "1" + ".txt"
        archivo = HttpContext.Current.Server.MapPath("~") + res
     
        If My.Computer.FileSystem.FileExists(archivo) Then
            My.Computer.FileSystem.DeleteFile(archivo)
        Else
        End If
        
        dt = reportes.LISTAR_INVENT_UND_FISICAS(p_prd1, p_alamcen1, p_scl1, p_anio, p_mes)
        GenerarTablaPro(dt)
        If Not dt Is Nothing Then
                
            Dim fd As New StreamWriter(archivo, True)
            'fd.WriteLine("PERIODO                                              " + p_mesDes + " " + p_anio)
            'fd.WriteLine("RUC                                                  " + p_ruc)
            'fd.WriteLine("APELLIDOS Y NOMBRES, DENOMINACION O RAZON SOCIAL     " + p_emp)
            'fd.WriteLine("DIRECCION                                            " + p_direcc)
            'fd.WriteLine("CODIGO DE LA EXISTENCIA                              " + p_codExis)
            'fd.WriteLine("TIPO                                                 " + p_tipoExist)
            'fd.WriteLine("DESCRIPCION                                          " + p_Descr)
            'fd.WriteLine("CODIGO DE LA UNIDAD DE MEDIDAD                       " + p_unidad)
            'fd.WriteLine("                       ")
            'fd.WriteLine("                       ")
       
            
      
                
            For i As Integer = 0 To dt.Rows.Count - 1
                cadena += dt.Rows(i)("FECHA").ToString() + "|" + dt.Rows(i)("TIPO").ToString() + "|" + dt.Rows(i)("SERIE").ToString() + "|" + dt.Rows(i)("NUMERO").ToString() + "|" + dt.Rows(i)("OPERACION").ToString() + "|" + dt.Rows(i)("CA_ENT").ToString() + "|" + dt.Rows(i)("PU_ENT").ToString() + "|"
                cadena += dt.Rows(i)("PT_ENT").ToString() + "|" + dt.Rows(i)("CA_SAL").ToString() + "|" + dt.Rows(i)("PU_SAL").ToString() + "|" + dt.Rows(i)("PT_SAL").ToString() + "|" + dt.Rows(i)("CA_TOT").ToString() + "|" + dt.Rows(i)("PU_TOT").ToString() + "|" + dt.Rows(i)("PT_TOT").ToString() + vbCrLf
            Next
                
                
            fd.WriteLine(cadena)
            fd.Close()
            res = "ok"
        Else
            res = "error"
        End If
        Return res
    End Function
    
    

    
    Public Function GenerarSelect(ByVal dt As DataTable, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then
           
            
            res += "["
            For i As Integer = 0 To dt.Rows.Count - 1
              
                res += "{label:" & dt.Rows(i)(chtml).ToString() & ",title" & dt.Rows(i)(chtml).ToString() & "value" & dt.Rows(i)(cvalue).ToString() & "},"
               
            Next
        
            res += "]"
            res = res.Replace(",]", "]")
        
            
        Else
            res = "error"
        End If
        Return res
    End Function
    'ToString("##,#0.00");
    
    Public Function GenerarTablaPro(ByVal dt As DataTable) As String
     
        Dim canEntra, costoEntra, canSalida, costoSalida As Decimal
        If Not dt Is Nothing Then
            res = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"
     
            res += "<thead>"
            
            
            res += "<tr align=""center"">"
            
            res += "<th>&nbsp;</th>"
            res += "<th>&nbsp;</th>"
            res += "<th>&nbsp;</th>"
            res += "<th>&nbsp;</th>"
            res += "<th>&nbsp;</th>"
            res += "<th>&nbsp;</th>"
            res += "<th>ENTRADA</th>"
            res += "<th>&nbsp;</th>"
            res += "<th>&nbsp;</th>"
            res += "<th>SALIDA</th>"
            res += "<th>&nbsp;</th>"
            res += "<th>&nbsp;</th>"
            res += "<th>SALDOS</th>"
            res += "<th>&nbsp;</th>"
            
            res += "</tr>"
            
            
            
            res += "<tr align=""center"">"
            
            res += "<th>FECHA</th>"
            res += "<th>TIPO</th>"
            res += "<th>SERIE</th>"
            res += "<th>NUMERO</th>"
            res += "<th>OPERACION</th>"
            
            
            res += "<th>CANT</th>"
            res += "<th>CU</th>"
            res += "<th>CT</th>"
            
            res += "<th>CANT</th>"
            res += "<th>CU</th>"
            res += "<th>CT</th>"
            
            res += "<th>CANT</th>"
            res += "<th>CU</th>"
            res += "<th>CT</th>"
            
            
            
   
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr >"
                res += "<td align='center'>" & dt.Rows(i)("FECHA").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("TIPO").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("SERIE").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("NUMERO").ToString() & "</td>"
                res += "<td align='center' >" & dt.Rows(i)("OPERACION").ToString() & "</td>"
                
                res += "<td align='center' >" & dt.Rows(i)("CA_ENT").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("PU_ENT").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("PT_ENT").ToString() & "</td>"
                
                res += "<td align='center'>" & dt.Rows(i)("CA_SAL").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("PU_SAL").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("PT_SAL").ToString() & "</td>"
                
                res += "<td align='center'>" & dt.Rows(i)("CA_TOT").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("PU_TOT").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("PT_TOT").ToString() & "</td>"
                res += "</tr>"
                
                
                
                
                
                canEntra = canEntra + dt.Rows(i)("CA_ENT").ToString()
                costoEntra = costoEntra + dt.Rows(i)("PT_ENT").ToString()
                
                canSalida = canSalida + dt.Rows(i)("CA_SAL").ToString()
                costoSalida = costoSalida + dt.Rows(i)("PT_SAL").ToString()
              
                
                
                
            Next
                
            
            res += "</tbody>"
            
            
            res += "<tfoot>"
            res += "<tr >"
            res += "<th colspan=""5"" align='center'><b>TOTALES</b></th>"
            
            res += "<th align='center' >" & canEntra.ToString("##,#0.00") & "</th>"
            res += "<th align='center'></th>"
            res += "<th align='center'>" & costoEntra.ToString("##,#0.00") & "</th>"
            
            
            res += "<th align='center'>" & canSalida.ToString("##,#0.00") & "</th>"
            res += "<th align='center'></th>"
            res += "<th align='center'>" & costoSalida.ToString("##,#0.00") & "</th>"
            
            res += "<th align='center'></th>"
            res += "<th align='center'></th>"
             res += "<th align='center'></th>"
            res += "</tr>"
            
            res += "</tfoot>"
            
           
            
            
            res += "</table>"
        Else
            GenerarTablaProSinDatos()
        End If
        Return res
    End Function
    
    
    
   
    
    
    Public Function GenerarTablaProSinDatos() As String
            
        res = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"
        res += "<thead>"
        res += "<tr align=""center"">"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "</tr>"
        res += "</thead>"
        res += "<tbody>"
       
        res += "<tr >"
        res += "<td align='center'> </td>"
        res += "<td ></td>"
        res += "<td align='center'></td>"
        res += "<td align='center' >NO HAY DATOS DISPONIBLES</td>"
        res += "<td align='center'></td>"
        res += "<td align='center'></td>"
        res += "</tr>"
       
        res += "</tbody>"
        res += "</table>"
        
        Return res
    End Function
    
    Sub HTMLToPDF(ByVal HTML As StringBuilder, ByVal FilePath As String)
        Dim archivo, res As String
        res = "Archivos\" + FilePath
        archivo = HttpContext.Current.Server.MapPath("~") + res
        If My.Computer.FileSystem.FileExists(archivo) Then
            My.Computer.FileSystem.DeleteFile(archivo)
        End If
        
        
        
        Dim document As Document '= New Document(PageSize.A4, 20, 20, 20, 20)


       
        document = New Document(PageSize.A4.Rotate, 25, 25, 45, 20)

        PdfWriter.GetInstance(document, New FileStream(archivo, FileMode.Create))
        document.Open()

        Dim abc As StringReader = New StringReader(HTML.ToString)
        Dim styles As iTextSharp.text.html.simpleparser.StyleSheet = New iTextSharp.text.html.simpleparser.StyleSheet()
        styles.LoadStyle("border", "border-bottom", "2px")

        Dim hw As iTextSharp.text.html.simpleparser.HTMLWorker = New iTextSharp.text.html.simpleparser.HTMLWorker(document)
        hw.Parse(New StringReader(HTML.ToString))
        document.Close()


    End Sub
    
    
    
    Function getHtmlTextPDF() As StringBuilder

        Dim htmlText As New StringBuilder
        htmlText.Length = 0
        htmlText.Append("<table width='100%'   border='1' font size=9pt>  " & vbCrLf)
        htmlText.Append("            <tr>  " & vbCrLf)
        htmlText.Append("                <td  align='center' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b>" + p_emp + "  " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("            </tr>  " & vbCrLf)
        '/tr1

        'tr2()
        htmlText.Append("            <tr  font color='white' bgcolor='black'>  " & vbCrLf)

        htmlText.Append("                <td   align='center' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                  <b>INVENTARIO PERMANENTE VALORIZADO</b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("            </tr>  " & vbCrLf)
        '/tr2
        htmlText.Append(" </table>  " & vbCrLf)
        
        htmlText.Append("<table width='100%'   border='1' font size=9pt>  " & vbCrLf)
        htmlText.Append("            <tr>  " & vbCrLf)
        htmlText.Append("                <td width='30%' align='left' valign='bottom' bgcolor='#666666' color='white'>  " & vbCrLf)
        htmlText.Append("                    <b>PERIODO</b>  " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='70%'align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                  <b>" + p_mesDes + " " + p_anio + "</b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("            </tr>  " & vbCrLf)
        htmlText.Append("            <tr>  " & vbCrLf)
        htmlText.Append("                <td width='30%' align='left' valign='bottom' bgcolor='#666666' color='white'>  " & vbCrLf)
        htmlText.Append("                    <b>RUC</b>  " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='70%'align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                  <b>" + p_ruc + "</b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("            </tr>  " & vbCrLf)
        htmlText.Append("            <tr>  " & vbCrLf)
        htmlText.Append("                <td width='30%' align='left' valign='bottom' bgcolor='#666666' color='white'>  " & vbCrLf)
        htmlText.Append("                    <b>APELLIDOS Y NOMBRES, DENOMINACION O RAZON SOCIA</b>  " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='70%'align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                  <b>" + p_emp + "</b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("            </tr>  " & vbCrLf)
        htmlText.Append("            <tr>  " & vbCrLf)
        htmlText.Append("                <td width='30%' align='left' valign='bottom' bgcolor='#666666' color='white'>  " & vbCrLf)
        htmlText.Append("                    <b>DIRECCION</b>  " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='70%'align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                  <b>" + p_direcc + "</b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("            </tr>  " & vbCrLf)
        
        htmlText.Append("            <tr>  " & vbCrLf)
        htmlText.Append("                <td width='30%' align='left' valign='bottom' bgcolor='#666666' color='white'>  " & vbCrLf)
        htmlText.Append("                    <b>CODIGO DE LA EXISTENCIA</b>  " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='70%'align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                  <b>" + p_codExis + "</b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("            </tr>  " & vbCrLf)
        
        
        htmlText.Append("            <tr>  " & vbCrLf)
        htmlText.Append("                <td width='30%' align='left' valign='bottom' bgcolor='#666666' color='white'>  " & vbCrLf)
        htmlText.Append("                    <b>TIPO</b>  " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='70%'align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                  <b>" + p_tipoExist + "</b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("            </tr>  " & vbCrLf)
        
        htmlText.Append("            <tr>  " & vbCrLf)
        htmlText.Append("                <td width='30%' align='left' valign='bottom' bgcolor='#666666' color='white'>  " & vbCrLf)
        htmlText.Append("                    <b>DESCRIPCION</b>  " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='70%'align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                  <b>" + p_Descr + "</b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("            </tr>  " & vbCrLf)
        
        htmlText.Append("            <tr>  " & vbCrLf)
        htmlText.Append("                <td width='30%' align='left' valign='bottom' bgcolor='#666666' color='white'>  " & vbCrLf)
        htmlText.Append("                    <b>CODIGO DE LA UNIDAD DE MEDIDA</b>  " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td align='left' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                  <b>" + p_unidad + "</b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("            </tr>  " & vbCrLf)
        htmlText.Append(" </table>  " & vbCrLf)
        
        htmlText.Append(" <br>  " & vbCrLf)
        htmlText.Append(" <br>  " & vbCrLf)
        
        htmlText.Append("<table width='100%'   border='1' font size=9pt>  " & vbCrLf)
        
        htmlText.Append("            <tr  >  " & vbCrLf)
        htmlText.Append("                <td font color='white' bgcolor='black' width='40%' align='left valign='bottom'>  " & vbCrLf)
        htmlText.Append("                    <b>DOCUMENTO DE TRASLADO, COMPROBANTE DE PAGO,DOCUMENTO INTERNO O SIMILAR</b>  " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        
        htmlText.Append("                <td font color='white' bgcolor='black' width='10%' align='center' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                  <b>TIPO DEOPERACIÓN</b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        
        htmlText.Append("                <td width='16.6%' align='center' bgcolor='#666666' color='white' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                  <b>ENTRADAS</b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='16.6%' align='center' bgcolor='#666666' color='white' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                  <b>SALIDAS</b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='16.6%' align='center' bgcolor='#666666' color='white' valign='bottom'>  " & vbCrLf)
        htmlText.Append("                  <b>SALDO FINAL</b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("            </tr>  " & vbCrLf)
        
        htmlText.Append(" </table>  " & vbCrLf)
        
        htmlText.Append("<table width='100%'   border='1' font size=9pt>  " & vbCrLf)
        htmlText.Append("            <tr >  " & vbCrLf)
        
        
        htmlText.Append("                <td width='10%' align='left' valign='bottom' bgcolor='#666666' color='white'>  " & vbCrLf)
        htmlText.Append("                    <b>FECHA</b>  " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='10%' align='left' valign='bottom' bgcolor='#666666' color='white'>  " & vbCrLf)
        htmlText.Append("                    <b>TIPO</b>  " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='10%' align='left' valign='bottom' bgcolor='#666666' color='white'>  " & vbCrLf)
        htmlText.Append("                    <b>SERIE</b>  " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='10%' align='left' valign='bottom' bgcolor='#666666' color='white'>  " & vbCrLf)
        htmlText.Append("                    <b>NUMERO</b>  " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        
        htmlText.Append("                <td width='10%'>  " & vbCrLf)
        htmlText.Append("                  <b></b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        
        
        htmlText.Append("                <td width='5.53%' >  " & vbCrLf)
        htmlText.Append("                  <b>CANT.</b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='5.53%' >  " & vbCrLf)
        htmlText.Append("                  <b>CU</b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf) 
        htmlText.Append("                <td width='5.53%'>  " & vbCrLf)
        htmlText.Append("                  <b>CT</b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        
        htmlText.Append("                <td width='5.53%' >  " & vbCrLf)
        htmlText.Append("                  <b>CANT.</b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='5.53%' >  " & vbCrLf)
        htmlText.Append("                  <b>CU</b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='5.53%' >  " & vbCrLf)
        htmlText.Append("                  <b>CT</b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        
        htmlText.Append("                <td width='5.53%' >  " & vbCrLf)
        htmlText.Append("                  <b>CANT.</b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='5.53%'>  " & vbCrLf)
        htmlText.Append("                  <b>CU</b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        htmlText.Append("                <td width='5.53%'>  " & vbCrLf)
        htmlText.Append("                  <b>CT</b> " & vbCrLf)
        htmlText.Append("                </td>  " & vbCrLf)
        
        htmlText.Append("            </tr>  " & vbCrLf)
        htmlText.Append(" </table>  " & vbCrLf)
        
        
        
        
       
        dt = reportes.LISTAR_INVENT_UND_FISICAS(p_prd1, p_alamcen1, p_scl1, p_anio, p_mes)
        GenerarTablaPro(dt)
        If Not dt Is Nothing Then
            
            Dim canEntra, costoEntra, canSalida, costoSalida As Decimal
            htmlText.Append("<table width='100%'   border='1' font size=9pt>  " & vbCrLf)
        
                
            For i As Integer = 0 To dt.Rows.Count - 1
                'cadena += dt.Rows(i)("FECHA").ToString() + "|" + dt.Rows(i)("TIPO").ToString() + "|" + dt.Rows(i)("SERIE").ToString() + "|" + dt.Rows(i)("NUMERO").ToString() + "|" + dt.Rows(i)("OPERACION").ToString() + "|" + dt.Rows(i)("CA_ENT").ToString() + "|" + dt.Rows(i)("CA_SAL").ToString() + "|" + dt.Rows(i)("CA_TOT").ToString() + vbCrLf
      
                htmlText.Append("            <tr >  " & vbCrLf)
                htmlText.Append("                <td width='10%'  >  " & vbCrLf)
                htmlText.Append("                    <b> " + dt.Rows(i)("FECHA").ToString() + "</b>  " & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)
                htmlText.Append("                <td width='10%'  >  " & vbCrLf)
                htmlText.Append("                    <b>" + dt.Rows(i)("TIPO").ToString() + "</b>  " & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)
                htmlText.Append("                <td width='10%'  >  " & vbCrLf)
                htmlText.Append("                    <b>" + dt.Rows(i)("SERIE").ToString() + "</b>  " & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)
                htmlText.Append("                <td width='10%'  >  " & vbCrLf)
                htmlText.Append("                    <b>" + dt.Rows(i)("NUMERO").ToString() + "</b>  " & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)
                htmlText.Append("                <td width='10%'>  " & vbCrLf)
                htmlText.Append("                  <b>" + dt.Rows(i)("OPERACION").ToString() + "</b> " & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)
                
                

                
                
                htmlText.Append("                <td width='5.53%' >  " & vbCrLf)
                htmlText.Append("                  <b>" + dt.Rows(i)("CA_ENT").ToString() + "</b> " & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)
                htmlText.Append("                <td width='5.53%' >  " & vbCrLf)
                htmlText.Append("                  <b>" + dt.Rows(i)("PU_ENT").ToString() + "</b> " & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)
                htmlText.Append("                <td width='5.53%'>  " & vbCrLf)
                htmlText.Append("                  <b>" + dt.Rows(i)("PT_ENT").ToString() + "</b> " & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)
                
                
                htmlText.Append("                <td width='5.53%' >  " & vbCrLf)
                htmlText.Append("                  <b>" + dt.Rows(i)("CA_SAL").ToString() + "</b> " & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)
                htmlText.Append("                <td width='5.53%' >  " & vbCrLf)
                htmlText.Append("                  <b>" + dt.Rows(i)("PU_SAL").ToString() + "</b> " & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)
                htmlText.Append("                <td width='5.53%'>  " & vbCrLf)
                htmlText.Append("                  <b>" + dt.Rows(i)("PT_SAL").ToString() + "</b> " & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)
                
                
                htmlText.Append("                <td width='5.53%' >  " & vbCrLf)
                htmlText.Append("                  <b>" + dt.Rows(i)("CA_TOT").ToString() + "</b> " & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)
                htmlText.Append("                <td width='5.53%' >  " & vbCrLf)
                htmlText.Append("                  <b>" + dt.Rows(i)("PU_TOT").ToString() + "</b> " & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)
                htmlText.Append("                <td width='5.53%'>  " & vbCrLf)
                htmlText.Append("                  <b>" + dt.Rows(i)("PT_TOT").ToString() + "</b> " & vbCrLf)
                htmlText.Append("                </td>  " & vbCrLf)                               
                htmlText.Append("            </tr>  " & vbCrLf)
                
                canEntra = canEntra + dt.Rows(i)("CA_ENT").ToString()
                costoEntra = costoEntra + dt.Rows(i)("PT_ENT").ToString()
                
                canSalida = canSalida + dt.Rows(i)("CA_SAL").ToString()
                costoSalida = costoSalida + dt.Rows(i)("PT_SAL").ToString()
            Next
            

            
            
            
            
            htmlText.Append(" </table>  " & vbCrLf)
            
            htmlText.Append(" <table font size=9pt>  " & vbCrLf)
            
            htmlText.Append("            <tr >  " & vbCrLf)
            htmlText.Append("                <td width='10%'  >  " & vbCrLf)
            htmlText.Append("                    <b></b>  " & vbCrLf)
            htmlText.Append("                </td>  " & vbCrLf)
            htmlText.Append("                <td width='10%'  >  " & vbCrLf)
            htmlText.Append("                    <b></b>  " & vbCrLf)
            htmlText.Append("                </td>  " & vbCrLf)
            htmlText.Append("                <td width='10%'  >  " & vbCrLf)
            htmlText.Append("                    <b></b>  " & vbCrLf)
            htmlText.Append("                </td>  " & vbCrLf)
            htmlText.Append("                <td width='10%'  >  " & vbCrLf)
            htmlText.Append("                    <b></b>  " & vbCrLf)
            htmlText.Append("                </td>  " & vbCrLf)
            htmlText.Append("                <td  border='1' width='10%'>  " & vbCrLf)
            htmlText.Append("                  <b>TOTALES</b> " & vbCrLf)
            htmlText.Append("                </td>  " & vbCrLf)
                
                

                
                
            htmlText.Append("                <td border='1' width='5.53%' >  " & vbCrLf)
            htmlText.Append("                  <b>" & canEntra.ToString("##,#0.00") & "</b> " & vbCrLf)
            htmlText.Append("                </td>  " & vbCrLf)
            htmlText.Append("                <td  border='1' width='5.53%' >  " & vbCrLf)
            htmlText.Append("                  <b></b> " & vbCrLf)
            htmlText.Append("                </td>  " & vbCrLf)
            htmlText.Append("                <td border='1' width='5.53%'>  " & vbCrLf)
            htmlText.Append("                  <b>" & costoEntra.ToString("##,#0.00") & "</b> " & vbCrLf)
            htmlText.Append("                </td>  " & vbCrLf)
                
                
            htmlText.Append("                <td border='1' width='5.53%' >  " & vbCrLf)
            htmlText.Append("                  <b>" & canSalida.ToString("##,#0.00") & "</b> " & vbCrLf)
            htmlText.Append("                </td>  " & vbCrLf)
            htmlText.Append("                <td  border='1'width='5.53%' >  " & vbCrLf)
            htmlText.Append("                  <b></b> " & vbCrLf)
            htmlText.Append("                </td>  " & vbCrLf)
            htmlText.Append("                <td  border='1' width='5.53%'>  " & vbCrLf)
            htmlText.Append("                  <b>" & costoSalida.ToString("##,#0.00") & "</b> " & vbCrLf)
            htmlText.Append("                </td>  " & vbCrLf)
                
                
            htmlText.Append("                <td  border='1' width='5.53%' >  " & vbCrLf)
            htmlText.Append("                  <b></b> " & vbCrLf)
            htmlText.Append("                </td>  " & vbCrLf)
            htmlText.Append("                <td  border='1' width='5.53%' >  " & vbCrLf)
            htmlText.Append("                  <b></b> " & vbCrLf)
            htmlText.Append("                </td>  " & vbCrLf)
            htmlText.Append("                <td  border='1' width='5.53%'>  " & vbCrLf)
            htmlText.Append("                  <b></b> " & vbCrLf)
            htmlText.Append("                </td>  " & vbCrLf)
            htmlText.Append("            </tr>  " & vbCrLf)
            
            
            
            htmlText.Append(" </table>  " & vbCrLf)
            
            
            
            
            
            
        
        End If
        
        
        
        ''tr3

        'htmlText.Append("            <tr>  " & vbCrLf)
        'htmlText.Append("                <td width='20%' align='left' valign='bottom' bgcolor='#666666' color='white'>  " & vbCrLf)
        'htmlText.Append("                    <b>1) Razon Social</b>  " & vbCrLf)
        'htmlText.Append("                </td>  " & vbCrLf)
        'htmlText.Append("                <td width='50%'align='left' valign='bottom'>  " & vbCrLf)
        'htmlText.Append("                  <b> </b> " & vbCrLf)
        'htmlText.Append("                </td>  " & vbCrLf)
        'htmlText.Append("                <td width='10%' align='left' valign='bottom' bgcolor='#666666' color='white'>  " & vbCrLf)
        'htmlText.Append("                    <b>2) Siglas</b>  " & vbCrLf)
        'htmlText.Append("                </td>  " & vbCrLf)
        'htmlText.Append("                <td  width='20%'align='left' valign='bottom' >  " & vbCrLf)
        'htmlText.Append("                  <b> </b>" & vbCrLf)
        'htmlText.Append("                </td>  " & vbCrLf)
        'htmlText.Append("            </tr>  " & vbCrLf)
        '/tr3
        


        'htmlText.Append("<table width='100%'  border='1' font size=9pt>  " & vbCrLf)
        'htmlText.Append("            <tr>  " & vbCrLf)
        'htmlText.Append("                <td width='50%'align='left' valign='bottom'  bgcolor='#666666' color='white'>  " & vbCrLf)
        'htmlText.Append("                    <b> 3) Domicilio Social (indicar ciudad o localidad, distrito, provincia, departamento y país)</b>  " & vbCrLf)
        'htmlText.Append("                </td>  " & vbCrLf)
        'htmlText.Append("                <td  width='50%'align='left'  valign='bottom'>  " & vbCrLf)
        'htmlText.Append("                    <b></b>  " & vbCrLf)
        'htmlText.Append("                </td>  " & vbCrLf)
        'htmlText.Append("            </tr>  " & vbCrLf)

        'htmlText.Append("            <tr colspan='2' >  " & vbCrLf)
        'htmlText.Append("                <td width='100%'align='left' valign='bottom'>  " & vbCrLf)
        'htmlText.Append("                    <b>  &nbsp;</b>  " & vbCrLf)
        'htmlText.Append("                </td>  " & vbCrLf)
        'htmlText.Append("            </tr>  " & vbCrLf)

        'htmlText.Append(" </table>  " & vbCrLf)
        Return htmlText
    End Function
    
  
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
        