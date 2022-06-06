<%@ WebHandler Language="VB" Class="NNLBOLE" %>

Imports System
Imports System.Web
Imports System.Data
Imports iTextSharp.text
Imports System.IO
Imports iTextSharp.text.pdf

Public Class NNLBOLE : Implements IHttpHandler
    
        
    Dim OPCION As String
    Dim p_PERS_PIDM, p_CTLG_CODE, p_SCSL_CODE, p_USUA_ID, tablas As String
    Dim p_ANIO, p_MES, p_MES_DES As String
    Dim p_RUC, TIPO_PLANILLA As String
  
  
   
    
    Dim dt As DataTable
    Dim res As String
    Dim resb As New StringBuilder
    
    
    
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
        TIPO_PLANILLA = context.Request("TIPO_PLANILLA")
        tablas = context.Request("tablas")
        
        Try
        
            Select Case OPCION
              
             
                    
                Case "1" 'Generar Planilla quincenal

                    Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
                    dt = NNPlanilla.ListarBoleta(p_CTLG_CODE, p_MES, p_ANIO)
                    res = GenerarTablaBoleta(dt).ToString()
                    'GenerarPDF(dt)
                    NNPlanilla = Nothing
                Case "2" 'Generar Planilla quincenal

                    res = GeneraPDF(p_CTLG_CODE, p_MES, p_ANIO)
                    
            End Select
            
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub
    
    Public Function GeneraPDF(p_CTLG_CODE As String, p_MES As String, p_ANIO As String) As String
      
        Dim msg() As String
        
        Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
        dt = NNPlanilla.ListarBoleta(p_CTLG_CODE, p_MES, p_ANIO)
        res = GenerarTablaBoleta(dt).ToString()
        res = res.Replace("*-", "")
        msg = res.Split("*")
        res = GenerarPDF(msg)
        Return res
    End Function
    
    Public Function GenerarPDF(ByVal dt As Array) As String
        Dim ress As String
        Dim cNomArch As String
        Dim htmlText As New StringBuilder
      
        cNomArch = "Boletas" + ".pdf"
     
        

        HTMLToPDF(dt, cNomArch)
        ress = "OK"
       
        Return ress
    End Function
    
    
    Sub HTMLToPDF(ByVal HTML As Array, ByVal FilePath As String)
        Dim archivo, res As String
        res = "Archivos\" + FilePath
        archivo = HttpContext.Current.Server.MapPath("~") + res
        If My.Computer.FileSystem.FileExists(archivo) Then
            My.Computer.FileSystem.DeleteFile(archivo)
        End If
        
        Dim document As Document
     
        document = New Document(PageSize.A2.Rotate().Rotate(), 100, 100, 50, 250)
        PdfWriter.GetInstance(document, New FileStream(archivo, FileMode.Create))
        document.Open()
       
       
      
        
        
        For i As Integer = 0 To HTML.Length - 1
            document.NewPage()
            Dim hw As iTextSharp.text.html.simpleparser.HTMLWorker = New iTextSharp.text.html.simpleparser.HTMLWorker(document)
            hw.Parse(New StringReader(HTML(i).ToString))
         
        Next

        document.Close()
     
    End Sub
    
    Public Function GenerarTablaBoleta(ByVal dt As DataTable) As StringBuilder
        Dim total As Decimal = 0
        res = ""
        resb.Clear()
        '------
        Dim bool = False
        Dim dtEmpresa As New DataTable
        Dim dtHoraExtra As New DataTable
        Dim dtDiasLaborados As New DataTable
        Dim dtDiasSubsanados As New DataTable
        Dim dtCentroCostos As New DataTable
        Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
        Dim NNPla As New Nomade.NN.NNPlanilla("Bn")
        dtEmpresa = ncEmpresa.ListarEmpresa(p_CTLG_CODE, "A", "")
        dtHoraExtra = NNPla.Listar_calculo_horas_extras(p_ANIO, p_MES, Nothing, p_CTLG_CODE, Nothing, "1")
        dtDiasLaborados = NNPla.Lista_Carga_Data_Boleta(p_CTLG_CODE, p_MES, p_ANIO, "1")
        dtDiasSubsanados = NNPla.Lista_Carga_Data_Boleta(p_CTLG_CODE, p_MES, p_ANIO, "2")
        dtCentroCostos = NNPla.Lista_Carga_Data_Boleta(p_CTLG_CODE, p_MES, p_ANIO, "3")
        
        If Not dt Is Nothing Then
            For i As Integer = 0 To dt.Rows.Count - 1
                Dim total_ingresos As Decimal = 0.0
                Dim total_descuentos As Decimal = 0.0
                Dim total_aportaciones As Decimal = 0.0
       
                resb.AppendFormat("<table border='1' class='{1}' id='{0}' style='max-width:100%;width:100%;' width:'100%'>", "tabla" + Convert.ToString(i), "tabla")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")
        
        resb.AppendFormat("<table border='0' style='max-width:100%;width:100%;' width:'100%'>")
        'Fila 1 CABECERA
        resb.AppendFormat("<tr style='font-size:11px; ' align='center' valign='top' >")
                resb.AppendFormat("<td width='50%' align='left'><strong>{0}</strong></td>", dtEmpresa.Rows(0)("DESCRIPCION").ToString())
        resb.AppendFormat("<td width='50%' align='right' >{0}</td>", "D.S. Nº017-2001-TR DEL 07-06-01")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")
        'fila 2
        resb.AppendFormat("<table border=""0"" style=""max-width:100%;width:100%;"" width:""100%"">")
        resb.AppendFormat("<tr  align='center' valign='top' >")
                resb.AppendFormat("<td width='40%' style='font-size:11px; font-family: verdana;' align='left' >{0}</td>", dtEmpresa.Rows(0)("DIRECCION").ToString())
        resb.AppendFormat("<td width='25%' style='font-size:11px;font-weight: bold;font-family: verdana;' align='center' >{0}</td>", "BOLETA DE REMUNERACIONES")
        resb.AppendFormat("<td width='35%' style='font-size:11px; font-family: verdana;' align='right' >{0}</td>", "D..M Nº136-2001-TR DEL 07-06-01")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")
        'fila 3
        resb.AppendFormat("<table border=""0"" style=""max-width:100%;width:100%;"" width:""100%"">")
        resb.AppendFormat("<tr width=""100%"" align='center' valign='top' >")
       resb.AppendFormat("<td width='40%' style='font-size:11px; font-family: verdana;' align='left' >RUC N° {0}</td>", dtEmpresa.Rows(0)("RUC").ToString())
                resb.AppendFormat("<td width='25%' style='font-size:11px;font-weight: bold;font-family: verdana;' align='center' >Planilla de Haberes   {0} {1}</td>", Devuelve_Nombre_Mes(dt.Rows(i)("MES").ToString()), dt.Rows(i)("ANIO").ToString())
        resb.AppendFormat("<td width='35%' style='font-size:11px;font-weight: bold; font-family: verdana;' align='right' >Fecha de Pago :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{0}</td>", dt.Rows(i)("DIA_PAGO").ToString())
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table><br>")
        'fila 4                    
        resb.AppendFormat("<table border=""0"" style=""max-width:100%;width:100%;"" width:""100%"">")
        
        resb.AppendFormat("<tr width=""100%"" align='center'  >")
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-weight: bold; font-family: verdana;' align='left' >Código:</td>")
                
                resb.AppendFormat("<td width=""25%"" style='font-size:11px;font-family: verdana;' align='left' >{0}</td>", dt.Rows(i)("ID").ToString())
                
        resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-weight: bold; font-family: verdana;' align='left' >Fecha de Ingreso:</td>")
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-family: verdana;' align='center' >{0}</td>", dt.Rows(i)("FECHA_INICIO_CONTRATO").ToString())
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-weight: bold; font-family: verdana;' align='right' >Dias Lab. :</td>")
                
                
                
                bool = False
                If Not (dtDiasLaborados Is Nothing) Then
                    For j As Integer = 0 To dtDiasLaborados.Rows.Count - 1
                        If dt.Rows(i)("PIDM").ToString() = dtDiasLaborados(j)("PIDM").ToString Then
                            resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-family: verdana;' align='right' >{0}</td>", dtDiasLaborados(j)("DIAS_LAB").ToString)
                            bool = True
                            Exit For
                        
                            
                        End If
                     
                    Next
                    
                    If bool = False Then
                        resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-family: verdana;' align='right' >{0}</td>", "0")
                    End If
                Else
                    resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-family: verdana;' align='right' >{0}</td>", "0")
                End If

        resb.AppendFormat("</tr>")
        
        
        resb.AppendFormat("<tr width=""100%"" align='center'  >")
        resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-weight: bold; font-family: verdana;' align='left' >Trabajador:</td>")
                         resb.AppendFormat("<td width=""25%"" style='font-size:11px;font-family: verdana;' align='left' >{0}</td>", dt.Rows(i)("APELLIDOS").ToString() + " " + dt.Rows(i)("NOMBRES").ToString())
        resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-weight: bold; font-family: verdana;' align='left' >Fecha de Cese:</td>")
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-family: verdana;' align='center' >{0}</td>", dt.Rows(i)("FECHA_CESE").ToString())
        resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-weight: bold; font-family: verdana;' align='right' >Dias Subs. :</td>")
       
                
                bool = False
                If Not (dtDiasSubsanados Is Nothing) Then
                    For j As Integer = 0 To dtDiasSubsanados.Rows.Count - 1
                        If dt.Rows(i)("PIDM").ToString() = dtDiasSubsanados(j)("PIDM").ToString Then
                            resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-family: verdana;' align='right' >{0}</td>", dtDiasSubsanados(j)("DIAS_SUBSANADOS").ToString)
                            bool = True
                            Exit For
                        
                            
                        End If
                     
                    Next
                    
                    If bool = False Then
                        resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-family: verdana;' align='right' >{0}</td>", "0")
                    End If
                Else
                    resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-family: verdana;' align='right' >{0}</td>", "0")
                End If
                
                
        resb.AppendFormat("</tr>")
        
        resb.AppendFormat("<tr width=""100%"" align='center'  >")
        resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-weight: bold; font-family: verdana;' align='left' >Tipo/Cat. Trab.:</td>")
                        resb.AppendFormat("<td width=""25%"" style='font-size:11px;font-family: verdana;' align='left' >{0}</td>", dt.Rows(i)("CAT_TRAB").ToString())
        resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-weight: bold; font-family: verdana;' align='left' >Periodo Vacacional</td>")
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-family: verdana;' align='center' >{0}</td>", "")
        resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-weight: bold; font-family: verdana;' align='right' >Dias No Lab. :</td>")
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-family: verdana;' align='right' >{0}</td>", dt.Rows(i)("DIAS_FALTAS").ToString())
        resb.AppendFormat("</tr>")
        
        resb.AppendFormat("<tr width=""100%"" align='center'  >")
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-weight: bold; font-family: verdana;' align='left' >Area:</td>")
                
                
                bool = False
                Dim cad As String = ""
                If Not (dtCentroCostos Is Nothing) Then
                    For j As Integer = 0 To dtCentroCostos.Rows.Count - 1
                        If dt.Rows(i)("PIDM").ToString() = dtCentroCostos(j)("PIDM").ToString Then
                            cad = cad + dtCentroCostos(j)("AREA_DESC").ToString()
                            bool = True
                            
                        
                            
                        End If
                     
                    Next
                     
                    If bool = False Then
                        resb.AppendFormat("<td width=""25%"" style='font-size:11px;font-family: verdana;' align='left' >{0}</td>", "Sin Area")
                    Else
                        resb.AppendFormat("<td width=""25%"" style='font-size:11px;font-family: verdana;' align='left' >{0}</td>", cad.ToString)
                       
                    End If
                    cad = ""
                Else
                    resb.AppendFormat("<td width=""25%"" style='font-size:11px;font-family: verdana;' align='left' >{0}</td>", "Sin Area")
                End If
                
                
     
        resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-weight: bold; font-family: verdana;' align='center' >Inicio Vac. :</td>")
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-family: verdana;' align='center' >{0}</td>", dt.Rows(i)("PERI_VAC_INI").ToString())
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-weight: bold; font-family: verdana;' align='right' >Nro.Hrs.Ord.:</td>")
                
                
                Dim sec_laborados As Integer = 0
                Dim horas As Integer = 0
                Dim min As Integer = 0
                sec_laborados = CInt(dt.Rows(i)("SEC_LABORADOS").ToString())
                
                If (((sec_laborados / 60) Mod 60) = 0) Then
                   
                    horas = sec_laborados / 60 / 60
                    resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-family: verdana;' align='right' >{0}h.</td>", horas)
                Else
             

                    horas = Int(sec_laborados / 60 / 60)
                    min = (sec_laborados / 60) Mod 60
                    resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-family: verdana;' align='right' >{0}h.{1}min.</td>", horas, min)
                End If
                    
               
                resb.AppendFormat("</tr>")
        
        
                resb.AppendFormat("<tr width=""100%"" align='center'  >")
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-weight: bold; font-family: verdana;' align='left' >Centro de Costo:</td>")
                
                bool = False
                Dim cadena As String = ""
                If Not (dtCentroCostos Is Nothing) Then
                    For j As Integer = 0 To dtCentroCostos.Rows.Count - 1
                        If dt.Rows(i)("PIDM").ToString() = dtCentroCostos(j)("PIDM").ToString Then
                            cadena = cadena + dtCentroCostos(j)("CENTRO_COSTO_DESC").ToString()
                            bool = True
                            
                        
                            
                        End If
                     
                    Next
                     
                    If bool = False Then
                        resb.AppendFormat("<td width=""25%"" style='font-size:11px;font-family: verdana;' align='left' >{0}</td>", "Sin Centro Costo")
                    Else
                        resb.AppendFormat("<td width=""25%"" style='font-size:11px;font-family: verdana;' align='left' >{0}</td>", cadena.ToString)
                       
                    End If
                    cadena = ""
                Else
                    resb.AppendFormat("<td width=""25%"" style='font-size:11px;font-family: verdana;' align='left' >{0}</td>", "Sin Centro Costo")
                End If
                
                
                
               
                
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-weight: bold; font-family: verdana;' align='center' >Fin Vac. :</td>")
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-family: verdana;' align='center' >{0}</td>", dt.Rows(i)("PERI_VAC_FIN").ToString())
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-weight: bold; font-family: verdana;' align='right' >Nro.Hrs.Ext.:</td>")
                
                bool = False
                If Not (dtHoraExtra Is Nothing) Then
                    For j As Integer = 0 To dtHoraExtra.Rows.Count - 1
                        If dt.Rows(i)("PIDM").ToString() = dtHoraExtra(j)("PIDM").ToString Then
                            If CInt(dtHoraExtra(j)("TOTAL_MINUTOS_EXTRAS")) Mod 60 = 0 Then
                                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-family: verdana;' align='right' >{0}h.</td>", CInt(dtHoraExtra(j)("TOTAL_MINUTOS_EXTRAS")) / 60)
                            Else
                                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-family: verdana;' align='right' >{0}h.{1}min.</td>", Int(CInt(dtHoraExtra(j)("TOTAL_MINUTOS_EXTRAS")) / 60), CInt(dtHoraExtra(j)("TOTAL_MINUTOS_EXTRAS")) Mod 60)
                            End If
                            bool = True
                            Exit For
                        Else
                            
                        End If
                     
                    Next
                    
                    If bool = False Then
                        resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-family: verdana;' align='right' >{0}</td>", "0.00")
                    End If
                Else
                    resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-family: verdana;' align='right' >{0}</td>", "0.00")
                End If
                    
              
                
                
                
               
                        
                        
                resb.AppendFormat("</tr>")
        
        
                resb.AppendFormat("<tr width=""100%"" align='center'  >")
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-weight: bold; font-family: verdana;' align='left' >Cargo:</td>")
                resb.AppendFormat("<td width=""25%"" style='font-size:11px;font-family: verdana;' align='left' >{0}</td>", dt.Rows(i)("DESC_CARGO").ToString())
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-weight: bold; font-family: verdana;' align='left' >Régimen Pensionario:</td>")
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-family: verdana;' align='center' >{0}</td>", dt.Rows(i)("REG_PENSIONARIO").ToString())
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-weight: bold; font-family: verdana;' align='right' >Rem. Básica :</td>")
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-family: verdana;' align='right' >S/.{0}</td>", String.Format("{0:0.00}", Double.Parse(dt.Rows(i)("REM_BASICA").ToString())))
                resb.AppendFormat("</tr>")
        
                resb.AppendFormat("</table>")
        
                'fila 5
                resb.AppendFormat("<table border=""0"" style=""max-width:100%;width:100%;"" width:""100%"">")
                
                
        
                resb.AppendFormat("<tr width=""100%"" align='center'  >")
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-weight: bold; font-family: verdana;' align='left' >Tipo Documento:</td>")
                resb.AppendFormat("<td width=""8.3%"" style='font-size:11px;font-family: verdana;' align='left' >{0}</td>", "DNI")
                resb.AppendFormat("<td width=""8.3%"" style='font-size:11px;font-weight: bold; font-family: verdana;' align='center' >Nro.</td>")
                resb.AppendFormat("<td width=""8.5%"" style='font-size:11px;font-family: verdana;' align='center' >{0}</td>", dt.Rows(i)("DNI").ToString())
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-weight: bold; font-family: verdana;' align='left' >C.U.S.P.P. :</td>")
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-family: verdana;' align='center' >{0}</td>", IIf(dt.Rows(i)("CUSPP").ToString() = "", "-", dt.Rows(i)("CUSPP").ToString()))
                resb.AppendFormat("<td width=""30%"" style='font-size:11px;font-family: verdana;' align='right' >{0}</td>", "")
                resb.AppendFormat("</tr>")
        
        
                resb.AppendFormat("</table>")
        
        
                'fila 5 
                resb.AppendFormat("<table border=""0"" style=""max-width:100%;width:100%;"" width:""100%"">")
        
                resb.AppendFormat("<tr width=""100%"" align='center'  >")
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-weight: bold; font-family: verdana;' align='left' >Fec. Nacimiento:</td>")
                resb.AppendFormat("<td width=""25%"" style='font-size:11px;font-family: verdana;' align='left' >{0}</td>", dt.Rows(i)("FECHA_NACIMIENTO").ToString())
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-weight: bold; font-family: verdana;' align='left' >Autogenerado:</td>")
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-family: verdana;' align='center' >{0}</td>", "-")
                resb.AppendFormat("<td width=""30%"" style='font-size:11px;font-family: verdana;' align='right' >{0}</td>", "")
                resb.AppendFormat("</tr>")
        
          
                resb.AppendFormat("<tr width=""100%"" align='center'  >")
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-weight: bold; font-family: verdana;' align='left' >Régimen Laboral:</td>")
                resb.AppendFormat("<td width=""25%"" style='font-size:11px;font-family: verdana;' align='left' >{0}</td>", dt.Rows(i)("REG_LABORAL").ToString())
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-weight: bold; font-family: verdana;' align='left' >Sit. Especial:</td>")
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-family: verdana;' align='center' >{0}</td>", "NINGUNO")
                resb.AppendFormat("<td width=""30%"" style='font-size:11px;font-family: verdana;' align='right' >{0}</td>", "")
                resb.AppendFormat("</tr>")
        
                resb.AppendFormat("</table><br>")
        
        
                'fila 6
                resb.AppendFormat("<table border=""1"" style=""max-width:100%;width:100%;"" width:""100%"">")
        
                resb.AppendFormat("<tr bgcolor='#9ACD32' width=""100%"" align='center'  >")
                resb.AppendFormat("<td  width=""15%"" style='font-size:11px;font-weight: bold; font-family: verdana;' align='center' >REMUNERACIONES</td>")
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-weight: bold; font-family: verdana;' align='center' >DESCUENTOS DEL TRABAJADOR</td>")
                resb.AppendFormat("<td width=""15%"" style='font-size:11px;font-weight: bold; font-family: verdana;' align='center' >APORTACIONES EMPLEADOR</td>")
                resb.AppendFormat("</tr>")
        
                resb.AppendFormat("</table>")
        
                'fila 7
                Dim NNPlanilla As New Nomade.NN.NNPlanilla("BN")
                Dim dtDetPlani As New DataTable
                dtDetPlani = NNPlanilla.Lista_Detalle_Planilla(p_CTLG_CODE, p_MES, p_ANIO, dt.Rows(i)("PIDM").ToString())
                
                resb.AppendFormat("<table border=""1"" style=""max-width:100%;width:100%;"" width:""100%"" >")
                resb.AppendFormat("<tr width=""100%"" align='center'  >")
        
                resb.AppendFormat("<td width=""33%"" valign=""top"">")
                'style='vertical-align:top;'
                'tbala enerar automatico
                resb.AppendFormat("<table border=""0"" style=""max-width:100%;width:100%;"" width:""100%"">")
        
              
                
                If Not (dtDetPlani Is Nothing) Then
                    
                    Dim color As String = ""
                    Dim cont As Integer = 0
                    For j As Integer = 0 To dtDetPlani.Rows.Count - 1
                        
                      
                      
     
                        If dtDetPlani(j)("CONCEPTO_CODE").ToString().Substring(0, 2) = "01" Or
                          dtDetPlani(j)("CONCEPTO_CODE").ToString().Substring(0, 2) = "02" Or
                         dtDetPlani(j)("CONCEPTO_CODE").ToString().Substring(0, 2) = "03" Or
                         dtDetPlani(j)("CONCEPTO_CODE").ToString().Substring(0, 2) = "04" Or
                         dtDetPlani(j)("CONCEPTO_CODE").ToString().Substring(0, 2) = "05" Or
                         dtDetPlani(j)("CONCEPTO_CODE").ToString().Substring(0, 2) = "09" Then
                            
                            If cont Mod 2 = 0 Then
                                color = "#F0F8FF"
                            Else
                                color = "#FFFFFF"
                            End If
                            cont = cont + 1
                            
                            resb.AppendFormat("<tr width=""100%"" align='center'  bgcolor='{0}'  >", color)
                            resb.AppendFormat("<td  width=""85%"" style='font-size:9px;font-family: verdana;' align='left' >{0}</td>", dtDetPlani.Rows(j)("DESC_CONCEPTO").ToString())
                            resb.AppendFormat("<td width=""15%"" style='font-size:9px;font-family: verdana;' valign=""bottom"" align='right' >{0}</td>", String.Format("{0:0.00}", CDec(dtDetPlani.Rows(j)("VALOR").ToString())))
                            resb.AppendFormat("</tr>")
                            
                            total_ingresos = total_ingresos + CDec(dtDetPlani.Rows(j)("VALOR").ToString())
                            
                            
                        End If
                    Next
                    
                    
                    
                Else
                    resb.AppendFormat("<tr width=""100%"" align='center'  >")
                    resb.AppendFormat("<td width=""50%"" style='font-size:9px;font-family: verdana;' align='left' >{0}</td>", "-")
                    resb.AppendFormat("<td width=""50%"" style='font-size:9px;font-family: verdana;' align='right' >{0}</td>", "-")
                    resb.AppendFormat("</tr>")
                
              
                End If
                
             
        
       
        
        
                resb.AppendFormat("</table>")
                'tbala enerar automatico
                resb.AppendFormat("</td>")
        
       
                resb.AppendFormat("<td width=""33%"" valign='top'>")
                resb.AppendFormat("<table border=""0"" style=""max-width:100%;width:100%;"" width:""100%"">")
                
                
                If Not (dtDetPlani Is Nothing) Then
                    
                    Dim color As String = ""
                    Dim cont As Integer = 0
                    For j As Integer = 0 To dtDetPlani.Rows.Count - 1
                        
                      
                      
     
                        If dtDetPlani(j)("CONCEPTO_CODE").ToString().Substring(0, 2) = "06" Or
                          dtDetPlani(j)("CONCEPTO_CODE").ToString().Substring(0, 2) = "07" Then
                            
                            If cont Mod 2 = 0 Then
                                color = "#F0F8FF"
                            Else
                                color = "#FFFFFF"
                            End If
                            cont = cont + 1
                            
                            resb.AppendFormat("<tr width=""100%"" align='center'  bgcolor='{0}'  >", color)
                            resb.AppendFormat("<td  width=""85%"" style='font-size:9px;font-family: verdana;' align='left' >{0}</td>", dtDetPlani.Rows(j)("DESC_CONCEPTO").ToString())
                            resb.AppendFormat("<td width=""15%"" style='font-size:9px;font-family: verdana;'  valign=""bottom"" align='right' >{0}</td>", String.Format("{0:0.00}", IIf((CDec(dtDetPlani.Rows(j)("VALOR").ToString())) >= 0, dtDetPlani.Rows(j)("VALOR").ToString(), CDec(dtDetPlani.Rows(j)("VALOR").ToString()) * -1)))
                            resb.AppendFormat("</tr>")
                            
                            total_descuentos = total_descuentos + IIf((CDec(dtDetPlani.Rows(j)("VALOR").ToString())) >= 0, dtDetPlani.Rows(j)("VALOR").ToString(), CDec(dtDetPlani.Rows(j)("VALOR").ToString()) * -1)
                            
                            
                        End If
                    Next
                    
                    
                    
                Else
                    resb.AppendFormat("<tr width=""100%"" align='center'  >")
                    resb.AppendFormat("<td width=""50%"" style='font-size:9px;font-family: verdana;' align='left' >{0}</td>", "-")
                    resb.AppendFormat("<td width=""50%"" style='font-size:9px;font-family: verdana;' align='right' >{0}</td>", "-")
                    resb.AppendFormat("</tr>")
                
              
                End If
        
              
        
                resb.AppendFormat("</table>")
                resb.AppendFormat("</td>")
        
        
                resb.AppendFormat("<td width=""33%""  valign='top'>")
                
                resb.AppendFormat("<table border=""0"" style=""max-width:100%;width:100%;"" width:""100%"">")
                
                If Not (dtDetPlani Is Nothing) Then
                    
                    Dim color As String = ""
                    Dim cont As Integer = 0
                    For j As Integer = 0 To dtDetPlani.Rows.Count - 1
                        
                      
                      
     
                        If dtDetPlani(j)("CONCEPTO_CODE").ToString().Substring(0, 2) = "08" Then
                            
                            If cont Mod 2 = 0 Then
                                color = "#F0F8FF"
                            Else
                                color = "#FFFFFF"
                            End If
                            cont = cont + 1
                            
                            resb.AppendFormat("<tr width=""100%"" align='center'  bgcolor='{0}'  >", color)
                            resb.AppendFormat("<td  width=""85%"" style='font-size:9px;font-family: verdana;' align='left' >{0}</td>", dtDetPlani.Rows(j)("DESC_CONCEPTO").ToString())
                            resb.AppendFormat("<td width=""15%"" style='font-size:9px;font-family: verdana;'  valign=""bottom"" align='right' >{0}</td>", String.Format("{0:0.00}", Double.Parse(dtDetPlani.Rows(j)("VALOR").ToString())))
                            resb.AppendFormat("</tr>")
                            
                            total_aportaciones = total_aportaciones + Double.Parse(dtDetPlani.Rows(j)("VALOR").ToString())
                            
                            
                        End If
                    Next
                    
                    
                    
                Else
                    resb.AppendFormat("<tr width=""100%"" align='center'  >")
                    resb.AppendFormat("<td width=""50%"" style='font-size:9px;font-family: verdana;' align='left' >{0}</td>", "-")
                    resb.AppendFormat("<td width=""50%"" style='font-size:9px;font-family: verdana;' align='right' >{0}</td>", "-")
                    resb.AppendFormat("</tr>")
                
              
                End If
        
                resb.AppendFormat("</table>")
                resb.AppendFormat("</td>")
        
        
        
                resb.AppendFormat("</tr>")
                resb.AppendFormat("</table>")
        
        
        
                'totales
                resb.AppendFormat("<table border=""1"" style=""max-width:100%;width:100%;font-weight: bold;"" width:""100%"">")
        
                resb.AppendFormat("<tr width=""100%"" align='center'  >")
        
                resb.AppendFormat("<td width=""33%"">")
                resb.AppendFormat("<table border=""0"" style=""max-width:100%;width:100%;"" width:""100%"">")
                resb.AppendFormat("<tr width=""100%"" align='center'  >")
                resb.AppendFormat("<td width=""50%"" style='font-size:11px;font-family: verdana;' align='left' >{0}</td>", "TOTAL INGRESOS")
                resb.AppendFormat("<td width=""50%"" style='font-size:11px;font-family: verdana;' align='right' >S/. {0}</td>", String.Format("{0:0.00}", total_ingresos))
                resb.AppendFormat("</tr>")
        
 
        
                resb.AppendFormat("</table>")
                resb.AppendFormat("</td>")
        
                resb.AppendFormat("<td width=""33%"">")
                resb.AppendFormat("<table border=""0"" style=""max-width:100%;width:100%;"" width:""100%"">")
                resb.AppendFormat("<tr width=""100%"" align='center'  >")
                resb.AppendFormat("<td width=""50%"" style='font-size:11px;font-family: verdana;' align='left' >{0}</td>", "TOTAL DESCUENTOS")
                resb.AppendFormat("<td width=""50%"" style='font-size:11px;font-family: verdana;' align='right' >S/.{0}</td>", String.Format("{0:0.00}", total_descuentos))
                resb.AppendFormat("</tr>")
        
                resb.AppendFormat("</table>")
                resb.AppendFormat("</td>")
        
                resb.AppendFormat("<td width=""33%"">")
                resb.AppendFormat("<table border=""0"" style=""max-width:100%;width:100%;"" width:""100%"">")
                resb.AppendFormat("<tr width=""100%"" align='center'  >")
                resb.AppendFormat("<td width=""50%"" style='font-size:11px;font-family: verdana;' align='left' >{0}</td>", "TOTAL APORTES")
                resb.AppendFormat("<td width=""50%"" style='font-size:11px;font-family: verdana;' align='right' >S/.{0}</td>", String.Format("{0:0.00}", total_aportaciones))
                resb.AppendFormat("</tr>")
                resb.AppendFormat("</table>")
                resb.AppendFormat("</td>")
        
                resb.AppendFormat("</tr>")
                resb.AppendFormat("</table>")
        
                'fila importe
                resb.AppendFormat("<table border=""0"" style=""max-width:100%;width:100%;"" width:""100%"">")
        
                resb.AppendFormat("<tr width=""100%"" align='center'  >")
                
                Dim pemp As New Nomade.NC.NCEEmpleado("BN")
                Dim oDt As New DataTable
                oDt = pemp.Lista_Datos_Pago_Empl(dt.Rows(i)("PIDM").ToString())
                
                If Not (oDt Is Nothing) Then
                    resb.AppendFormat("<td style='font-size:9px;font-family: verdana;' align='left' >Importe abonado a la cuenta {0} del {1}</td>", oDt.Rows(0)("NRO_CUENTA_SUELDO").ToString(), dt.Rows(i)("BANCO_DESC").ToString())
                Else
                    resb.AppendFormat("<td style='font-size:9px;font-family: verdana;' align='left' >Importe abonado a la cuenta {0} del {1}</td>", "-", dt.Rows(i)("BANCO_DESC").ToString())
                End If
                pemp = Nothing
               
                resb.AppendFormat("</tr>")
                resb.AppendFormat("</table>")
        
                resb.AppendFormat("<br>")
                'fila neto 
                resb.AppendFormat("<table border=""0"" style=""max-width:100%;font-weight: bold;width:100%;"" width:""100%"">")
        
                resb.AppendFormat("<tr width=""100%"" align='center'  >")
                resb.AppendFormat("<td width=""50%"" style='font-size:15px;font-family: verdana;' align='right' >NETO A RECIBIR &nbsp;&nbsp;&nbsp;S/.&nbsp;&nbsp;</td>")
                resb.AppendFormat("<td width=""15%"">")
                resb.AppendFormat("<table border='1' style='font-family: verdana;' width=""100%""><tr width=""100%""><td align='center' width=""100%"">{0}</td></tr></table>", String.Format("{0:0.00}", total_ingresos - total_descuentos))
                resb.AppendFormat("</td>")
                resb.AppendFormat("<td width=""35%""></td>")
                resb.AppendFormat("</tr>")
                resb.AppendFormat("</table>")
        
        
        
                resb.AppendFormat("<br><br><br>")
       
        
                'fila firmas 
                resb.AppendFormat("<table border=""0"" style=""max-width:100%;font-weight: bold;width:100%;"" width:""100%"">")
        
                resb.AppendFormat("<tr width=""100%"" align='center'>")
                resb.AppendFormat("<td width=""35%"" style='font-size:11px;font-family: verdana;' align='center' >______________________________</td>")
                resb.AppendFormat("<td width=""30%""></td>")
                resb.AppendFormat("<td width=""35%"" style='font-size:11px;font-family: verdana;' align='center' >______________________________</td>")
                resb.AppendFormat("</tr>")
        
                resb.AppendFormat("<tr width=""100%"" align='center'  >")
                resb.AppendFormat("<td width=""35%"" style='font-size:11px;font-family: verdana;' align='center' >EMPLEADOR</td>")
                resb.AppendFormat("<td width=""30%""></td>")
                resb.AppendFormat("<td width=""35%"" style='font-size:11px;font-family: verdana;' align='center' >RECIBI CONFORME TRABAJADOR</td>")
                resb.AppendFormat("</tr>")
        
                resb.AppendFormat("</table><br>")
        
        
        
                'fin
                resb.AppendFormat("</td>")
                resb.AppendFormat("</tr>")
                resb.AppendFormat("</table><br><br>*")
       
      
        
            Next
        Else
            resb.AppendFormat("<table border=""0"" style=""max-width:100%;font-weight: bold;width:100%;"" width:""100%"">")
            resb.AppendFormat("<tr width=""100%"" align='center'  >")
            resb.AppendFormat("<td width=""100%"" style='font-size:11px;font-family: verdana;' align='center' >NO HAY DATOS</td>")
            resb.AppendFormat("</tr>")
            resb.AppendFormat("</table>")
        End If
        
                resb.AppendFormat("*-")
        
       
        
                res = resb.ToString()
                'Return res
                Return resb
    End Function
    
 
    
    
    Public Function Devuelve_Nombre_Mes(mes As String) As String
        Dim oMes As String = ""
        If mes = "1" Then
            oMes = "Enero"
        ElseIf mes = "2" Then
            oMes = "Febrero"
        ElseIf mes = "3" Then
            oMes = "Marzo"
        ElseIf mes = "4" Then
            oMes = "Abril"
        ElseIf mes = "5" Then
            oMes = "Mayo"
        ElseIf mes = "6" Then
            oMes = "Junio"
        ElseIf mes = "7" Then
            oMes = "Julio"
        ElseIf mes = "8" Then
            oMes = "Agosto"
        ElseIf mes = "9" Then
            oMes = "Septiembre"
        ElseIf mes = "10" Then
            oMes = "Octubre"
        ElseIf mes = "11" Then
            oMes = "Noviembre"
        ElseIf mes = "12" Then
            oMes = "Diciembre"
        End If
        
        
        
        Return oMes
    End Function
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class