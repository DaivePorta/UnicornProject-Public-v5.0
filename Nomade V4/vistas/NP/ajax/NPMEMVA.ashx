<%@ WebHandler Language="VB" Class="NPMEMVA" %>

Imports System
Imports System.Web
Imports System.Data
Imports iTextSharp.text
Imports System.IO
Imports iTextSharp.text.pdf

Public Class NPMEMVA : Implements IHttpHandler
    Dim OPCION, PIDM, SERIE, SECUENCIA, DIAS, USUARIO, FECHA_INI, FECHA_FIN, ESTADO, ITEM,
        CTLG_CODE, ADEL_IND As String

    Dim res As String
    Dim dt As DataTable
    Dim resb As New StringBuilder
    Dim resArray As Array

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        PIDM = context.Request("PIDM")
        SERIE = context.Request("SERIE")
        SECUENCIA = context.Request("SECUENCIA")
        DIAS = context.Request("DIAS")
        USUARIO = context.Request("USUARIO")
        FECHA_INI = context.Request("FECHA_INI")
        FECHA_FIN = context.Request("FECHA_FIN")
        ESTADO = context.Request("ESTADO")
        ITEM = context.Request("ITEM")
        CTLG_CODE = context.Request("CTLG_CODE")
        ADEL_IND = context.Request("ADEL_IND")

        Select Case OPCION.ToString()
            Case "1" 'Lista Periodo Vacacional
                context.Response.ContentType = "application/text; charset=utf-8"
                Dim pemp As New Nomade.NC.NCEEmpleado("BN")
                dt = pemp.Listar_Periodo_Vac(PIDM, SERIE, CTLG_CODE)
                res = GenerarTablaPeriodoVac(dt)
            Case "2" 'Lista Detalle Vacaciones

                Dim pemp As New Nomade.NC.NCEEmpleado("BN")
                dt = pemp.Listar_Detalle_Vac(PIDM, SECUENCIA, 0, CTLG_CODE)

                If Not dt Is Nothing Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""NRO"":""" & row("NRO").ToString & """,")
                        resb.Append("""ITEM"":""" & row("ITEM").ToString & """,")
                        resb.Append("""FECHA_INICIO"":""" & row("FECHA_INICIO").ToString & """,")
                        resb.Append("""FECHA_FIN"":""" & row("FECHA_FIN").ToString & """,")
                        resb.Append("""DIAS"":""" & row("DIAS").ToString & """,")
                        resb.Append("""ESTADO_IND"":""" & row("ESTADO_IND").ToString & """,")
                        resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                        resb.Append("},")

                    Next
                    resb.Append("-")
                    resb.Replace("},-", "}")

                    resb.Append("]")
                    res = resb.ToString()
                Else
                    res = ""
                End If

            Case "3" 'Crea Periodo Vacacional
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim e As New Nomade.NC.NCEEmpleado("Bn")

                resArray = e.Crear_Periodo_Vac(PIDM, SERIE, DIAS, USUARIO, CTLG_CODE)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""SUCCESS"" :" & """" & resArray(0).ToString & """,")
                resb.Append("""GENERADO"" :" & """" & resArray(1).ToString & """,")
                resb.Append("""VALIDACION"" :" & """" & resArray(2).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()

            Case "4" 'Crea detalle Vacacional
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim e As New Nomade.NC.NCEEmpleado("Bn")

                FECHA_INI = Utilities.fechaLocal(FECHA_INI)
                FECHA_FIN = Utilities.fechaLocal(FECHA_FIN)

                resArray = e.Crear_Detalle_Vac(PIDM, SECUENCIA, FECHA_INI, FECHA_FIN, DIAS, ESTADO, USUARIO, ADEL_IND, CTLG_CODE)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""SUCCESS"" :" & """" & resArray(0).ToString & """,")
                resb.Append("""VALIDACION"" :" & """" & resArray(1).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()

            Case "5" 'Elimina Detalle Vacaciones
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim e As New Nomade.NC.NCEEmpleado("Bn")

                resArray = e.Elimina_Detalle_Vac(ITEM)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""SUCCESS"" :" & """" & resArray(0).ToString & """,")
                resb.Append("""VALIDACION"" :" & """" & resArray(1).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()

            Case "6" 'Actualiza Estado de Vacaciones
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim e As New Nomade.NC.NCEEmpleado("Bn")

                resArray = e.Actualiza_Detalle_Vac(ITEM, ESTADO)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""SUCCESS"" :" & """" & resArray(0).ToString & """,")
                resb.Append("""VALIDACION"" :" & """" & resArray(1).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()
            Case "7"
                context.Response.ContentType = "text/html"
                Dim NCEEmpleado As New Nomade.NC.NCEEmpleado("Bn")
                Dim resp As String = ""
                dt = NCEEmpleado.Listar_Detalle_Vac(0, 0, ITEM, CTLG_CODE)
                GenerarPDF(dt, CTLG_CODE)
                res = "OK"
        End Select


        context.Response.Write(res)
    End Sub

    Public Function GenerarTablaPeriodoVac(ByVal dt As DataTable) As String
        res = ""
        resb.Clear()
        '------
        resb.AppendFormat("<table id=""tblPeriodoVac"" class=""display DTTT_selectable table table-bordered"">")
        resb.AppendFormat("<thead style=""background-color: steelblue; color: aliceblue;"">")
        resb.AppendFormat("<th></th>")
        resb.AppendFormat("<th>NRO</th>")
        resb.AppendFormat("<th>SECUENCIA</th>")
        resb.AppendFormat("<th>FECHA INICIO</th>")
        resb.AppendFormat("<th>FECHA FIN</th>")
        resb.AppendFormat("<th>DIAS</th>")
        resb.AppendFormat("<th>DIAS GOZ.</th>")
        resb.AppendFormat("<th>DIAS FALT.</th>")
        resb.AppendFormat("<th>DIAS PROG.</th>")
        resb.AppendFormat("<th>FECHA_ORIG_INI</th>")
        resb.AppendFormat("<th>FECHA_ORIG_FIN</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")


        If (dt Is Nothing) Then
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'>NO HAY DATOS DISPONIBLES</td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("</tr>")
        Else

            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td style='text-align:center;'>")
                resb.AppendFormat("<img src='recursos/img/details_open.png' class='detVac' />")
                resb.AppendFormat("</td>")
                resb.AppendFormat("<td align='center;'>{0}</td>", dt.Rows(i)("NRO").ToString())
                resb.AppendFormat("<td align='center;'>{0}</td>", dt.Rows(i)("SECUENCIA").ToString())
                resb.AppendFormat("<td align='center;'>{0}</td>", dt.Rows(i)("FECHA_INICIO").ToString())
                resb.AppendFormat("<td align='center;'>{0}</td>", dt.Rows(i)("FECHA_FIN").ToString())
                resb.AppendFormat("<td align='center;'>{0}</td>", dt.Rows(i)("DIAS").ToString())
                resb.AppendFormat("<td align='center;'>{0}</td>", dt.Rows(i)("DIAS_GOZ").ToString())
                resb.AppendFormat("<td align='center;'>{0}</td>", dt.Rows(i)("DIAS_FALT").ToString())
                resb.AppendFormat("<td align='center;'>{0}</td>", dt.Rows(i)("DIAS_PROG").ToString())
                resb.AppendFormat("<td align='center;'>{0}</td>", dt.Rows(i)("FECHA_ORIG_INI").ToString())
                resb.AppendFormat("<td align='center;'>{0}</td>", dt.Rows(i)("FECHA_ORIG_FIN").ToString())
                resb.AppendFormat("</tr>")
            Next
        End If

        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()

        Return res
    End Function


    Public Function GenerarPDF(ByVal dt As DataTable, CTLG_CODE As String) As String
        Dim ress As String
        Dim cNomArch As String = ""

        Dim bloquesHtml As String() = {"1", "2"}

        If Not dt Is Nothing Then
            cNomArch = dt(0)("ITEM").ToString + dt(0)("PIDM").ToString + ".pdf"
        End If


        bloquesHtml(0) = GenerarTablaLiquidacion(dt, CTLG_CODE)
        bloquesHtml(1) = Replace(GenerarTablaLiquidacion(dt, CTLG_CODE), "EMPLEADOR", "TRABAJADOR")
        HTMLToPDF(bloquesHtml, cNomArch)

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
        document = New Document(PageSize.A2)

        PdfWriter.GetInstance(document, New FileStream(archivo, FileMode.Create))

        document.Open()


        For i As Integer = 0 To HTML.Length - 1
            document.NewPage()
            Dim hw As iTextSharp.text.html.simpleparser.HTMLWorker = New iTextSharp.text.html.simpleparser.HTMLWorker(document)
            hw.Parse(New StringReader(HTML(i).ToString))

        Next

        document.Close()
    End Sub

    Public Function GenerarTablaLiquidacion(ByVal dtLiquidacion As DataTable, CTLG_CODE As String) As String
        'If Not dtLiquidacion Is Nothing Then   

        'End If
        Dim DATA As String = "DATOS :)"
        Dim FECHA As Date = Date.Today()

        Dim NroMes As Integer = Month(FECHA)
        Dim DiaFecha As Integer = Day(FECHA)
        Dim AnioFecha As Integer = Year(FECHA)
        Dim NombreMes As String = GetNombreMes(NroMes)
        Dim dtEmp As DataTable
        Dim e As New Nomade.NC.NCEmpresa("Bn")
        dtEmp = e.ListarEmpresa(CTLG_CODE, "", "")


        res = ""
        resb.Clear()
        '------
        resb.AppendFormat("<table border=""1"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")

        resb.AppendFormat("<table border=""0"" width=""100%"" >")

        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%'><strong>{0}</strong></td>", dtEmp(0)("DESCRIPCION").ToString)
        resb.AppendFormat("</tr>")

        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%'><strong>R U C :&nbsp;&nbsp;{0}</strong></td>",  dtEmp(0)("RUC").ToString)
        resb.AppendFormat("</tr>")

        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%'><strong>{0}</strong></td>", dtEmp(0)("CORTO").ToString)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")


        resb.AppendFormat("<table border=""0"" width=""100%"" >")

        resb.AppendFormat("<tr width=""100%"">")
        resb.AppendFormat("<td width='100%'>{0}</td>", "")
        resb.AppendFormat("<td width='100%' align='center'>{0}</td>", "")
        resb.AppendFormat("<td width='100%' align='center'>{0}</td>", "")
        resb.AppendFormat("<td width='100%' align='center'>{0}</td>", "")
        resb.AppendFormat("<td width='100%' align='center'>{0}</td>", "")
        resb.AppendFormat("<td width='100%' align='center'>{0}</td>", "")
        resb.AppendFormat("<td width='70%' align='left'><strong>{0}</strong></td>", DiaFecha.ToString() + " de " + NombreMes + " de " + AnioFecha.ToString)
        resb.AppendFormat("</tr>")


        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='font-size: xx-large;' width='100%' height='60px' align='center' colspan=7><strong>{0}</strong></td>", "C O N S T A N C I A &nbsp;&nbsp;&nbsp;&nbsp;D E&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;V A C A CI O N E S")
        resb.AppendFormat("<td width='100%' align='center'>{0}</td>", "")
        resb.AppendFormat("<td width='100%' align='center'>{0}</td>", "")
        resb.AppendFormat("<td width='100%' align='center'>{0}</td>", "")
        resb.AppendFormat("<td width='100%' align='center'>{0}</td>", "")
        resb.AppendFormat("<td width='100%' align='center'>{0}</td>", "")
        resb.AppendFormat("<td width='100%' align='center'>{0}</td>", "")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("<br><br><br><br><br>")


        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")

        resb.AppendFormat("<table border=""0"" width=""100%"" >")

        resb.AppendFormat("<tr width=""100%"">")
        resb.AppendFormat("<td style='font-size: x-large;' width='100%' height='40px'align='left'>{0}</td>", "A quien corresponda:")
        resb.AppendFormat("</tr>")


        resb.AppendFormat("<tr width=""100%"">")
        resb.AppendFormat("<td style='font-size: x-large;' width='100%' height='40px' align='left'>{0}</td>", "Por Medio de la presente, hago constar, Yo " + dt(0)("NOMBRE_EMPLEADO").ToString)
        resb.AppendFormat("</tr>")

        resb.AppendFormat("<tr width=""100%"">")
        resb.AppendFormat("<td style='font-size: x-large;' width='100%' height='40px' align='left'>{0}</td>", " disfruté de un periodo vacacional de " + dt(0)("DIAS").ToString + " días, que transcurrió del " + dt(0)("FECHA_INICIO").ToString + " al " + dt(0)("FECHA_FIN").ToString + ".")
        resb.AppendFormat("</tr>")

        resb.AppendFormat("<tr width=""100%""><td>" + " " + "</td></tr>")


        resb.AppendFormat("<tr width=""100%"">")
        resb.AppendFormat("<td style='font-size: x-large;' width='100%' height='40px' align='left'>{0}</td>", "Lo que hago de conocimiento público para todos los efectos a que  haya lugar.")
        resb.AppendFormat("</tr>")

        resb.AppendFormat("<tr width=""100%""><td>" + " " + "</td></tr>")
        resb.AppendFormat("<tr width=""100%""><td>" + " " + "</td></tr>")

        resb.AppendFormat("<tr width=""100%"">")
        resb.AppendFormat("<td style='font-size: x-large;' width='100%' height='40px' align='left'>{0}</td>", "Atentamente")
        resb.AppendFormat("<br><br>")
        resb.AppendFormat("</tr>")

        resb.AppendFormat("<tr width=""100%""><td>" + " " + "</td></tr>")
        resb.AppendFormat("<tr width=""100%""><td>" + " " + "</td></tr>")



        resb.AppendFormat("<tr width=""100%"">")
        resb.AppendFormat("<td style='font-size: x-large;' width='100%' height='80px' align='left'>{0}</td>", dt(0)("NOMBRE_EMPLEADO").ToString)
        resb.AppendFormat("<td style='font-size: x-large;' width='100%' height='80px' align='left'>{0}</td>", ("DNI: " & dt(0)("NUMERO_DOC").ToString))
        resb.AppendFormat("</tr>")

        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")



        'tabla firmas 
        resb.AppendFormat("<br><br><br><br>")

        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%'   align='right'><strong>{0}</strong></td>", "COPIA EMPLEADOR")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("<br><br><br><br>")

        res = resb.ToString()

        'res += Replace(resb.ToString(), "EMPLEADOR", "TRABAJADOR")

        Return res
    End Function


    Function GetNombreMes(NroMes As Integer) As String
        Dim NombMes As String = ""
        Select Case NroMes

            Case 1
                NombMes = "Enero"
            Case 2
                NombMes = "Febrero"
            Case 3
                NombMes = "Marzo"
            Case 4
                NombMes = "Abril"
            Case 5
                NombMes = "Mayo"
            Case 6
                NombMes = "Junio"
            Case 7
                NombMes = "Julio"
            Case 8
                NombMes = "Agosto"
            Case 9
                NombMes = "Septiembre"
            Case 10
                NombMes = "Octubre"
            Case 11
                NombMes = "Noviembre"
            Case 12
                NombMes = "Diciembre"

        End Select


        Return NombMes
    End Function


    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class