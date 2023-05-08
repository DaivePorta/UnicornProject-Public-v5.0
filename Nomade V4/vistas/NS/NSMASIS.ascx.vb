Imports System.IO
'Imports System.Data.OleDb
Imports System.Data
Imports ExcelDataReader

Partial Class vistas_NS_NSMASIST
    Inherits Nomade.N.Cub
    Dim data As New DataTable
    Dim Asistencia As New Nomade.NS.NSAsistencia("Bn")
    Dim Empleado As New Nomade.NC.NCEEmpleado("Bn")

    'Public Shared DataFinal As New DataTable
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim cHtml As String = ""
        cHtml = cHtml & "<div id='DIVTABLA' class='portlet-body'>"
        cHtml = cHtml & "<div id='UNO' class='row-fluid'>"
        cHtml = cHtml & "<div id='DOS'  class='span12'>"
        'cHtml = cHtml & "<table id='tblAsistencia' border='0' class='display DTTT_selectable' style='display: block;'>"
        cHtml = cHtml & "<table id='tblAsistencia' border='0' class='display DTTT_selectable'>"
        cHtml = cHtml & "<thead>"
        cHtml = cHtml & "<tr>"

        cHtml = cHtml & "<th>CÓDIGO</th>"
        cHtml = cHtml & "<th>NOMBRES</th>"
        cHtml = cHtml & "<th>FECHA</th>"
        cHtml = cHtml & "<th>H. ENTRADA</th>"
        cHtml = cHtml & "<th>H. SALIDA</th>"
        cHtml = cHtml & "<th>H. E. TRAB.</th>"
        cHtml = cHtml & "<th>H. S. TRAB.</th>"
        cHtml = cHtml & "<th>USUARIO</th>"

        cHtml = cHtml & "</tr>"
        cHtml = cHtml & "</thead>"
        cHtml = cHtml & "</table>"

        hfTable.Value = cHtml
    End Sub
    Public Sub CargarArchivoX()
        If fuDocumento.HasFile Then
            Try
                For Each uploadedFile As HttpPostedFile In fuDocumento.PostedFiles
                    If uploadedFile.FileName.Contains(".xls") = False Then
                        Me.Page.ClientScript.RegisterStartupScript(Me.GetType(), "Script", "<script language='javascript'>alertCustom('Seleccione un archivo válido.');</script>", False)
                        Exit Sub
                    End If
                    Dim FileName As String = Path.GetFileName(uploadedFile.FileName)
                    Dim Extension As String = Path.GetExtension(uploadedFile.FileName)
                    'Dim FilePath As String = Server.MapPath("~/Archivos/") & fuDocumento.FileName
                    'fuDocumento.SaveAs(Server.MapPath("~/Archivos/") & fuDocumento.FileName)

                    'Dim datoAj As String = HttpContext.Current.Server.MapPath("~") & "Archivos\" & resArray(0).ToString & ".pdf"

                    'Dim FilePath As String = Server.MapPath("~") & "Archivos\Asistencia_" & hfEmpresa.Value & "_" & hfSucursal.Value & ".xls"
                    'fuDocumento.SaveAs(Server.MapPath("~") & "Archivos\Asistencia_" & hfEmpresa.Value & "_" & hfSucursal.Value & ".xls")

                    Dim FilePath As String = Server.MapPath("~") & "Archivos\Asistencia_" & hfEmpresa.Value & "_" & hfSucursal.Value & "_" & hfPeriodo.Value.Split(" ")(0) & "_" & hfPeriodo.Value.Split(" ")(1) & "_" & FileName.Split(".")(0) & ".xls"

                    If My.Computer.FileSystem.FileExists(FilePath) Then
                        Me.Page.ClientScript.RegisterStartupScript(Me.GetType(), "Script", "<script language='javascript'>infoCustom2('La asistencia de " & FileName.Split(".")(0) & " para el periodo " & hfPeriodo.Value & " ya ha sido cargada en UNICORN ERP.');</script>", False)
                        Exit Sub
                    Else
                        uploadedFile.SaveAs(FilePath)
                        extraedatosX(FilePath, Extension, "Yes")
                    End If
                Next
            Catch ex As Exception
                'Me.Page.ClientScript.RegisterStartupScript(Me.GetType(), "El nómade", "window.alertCustom('" & ex.Message & "');", True)
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType(), "Script", "<script language='javascript'>alertCustom('" & ex.Message & "');</script>", False)
                Exit Sub
            End Try
        Else
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType(), "Script", "<script language='javascript'>alertCustom('Seleccione un archivo válido.');</script>", False)
            Exit Sub
        End If
    End Sub
    Dim ListaConfiguracionAsistencia As New List(Of eConfiguracionAsistencia)
    Dim ListaAsistencia As New List(Of eAsistencia)
    Public Sub extraedatosX(ByVal FilePath As String, ByVal Extension As String, ByVal isHDR As String)

        Dim dt As New DataTable()

        Dim stream = File.Open(FilePath, FileMode.Open, FileAccess.Read) 'DPORTA 29/03/2023
        Dim reader = ExcelReaderFactory.CreateReader(stream)
        Dim result = reader.AsDataSet()
        Dim tables = result.Tables.Cast(Of DataTable)

        For Each table As DataTable In tables
            dt = table
        Next

        data = Asistencia.Listar_Configuracion(hfEmpresa.Value, hfSucursal.Value)

        Dim eConfiguracionAsistencia = New eConfiguracionAsistencia()

        ListaConfiguracionAsistencia.Clear()
        ListaAsistencia.Clear()

        If Not data Is Nothing Then

            eConfiguracionAsistencia.p_RHCONAS_CODE = data.Rows(0)("RHCONAS_CODE").ToString()
            eConfiguracionAsistencia.p_RHCONAS_COD_BIO = data.Rows(0)("RHCONAS_COD_BIO").ToString()
            eConfiguracionAsistencia.p_RHCONAS_FECHA = data.Rows(0)("RHCONAS_FECHA").ToString()
            eConfiguracionAsistencia.p_RHCONAS_HOR_ENT = data.Rows(0)("RHCONAS_HOR_ENT").ToString()
            eConfiguracionAsistencia.p_RHCONAS_HOR_SAL = data.Rows(0)("RHCONAS_HOR_SAL").ToString()
            eConfiguracionAsistencia.p_RHCONAS_HOR_ENT_TRAB = data.Rows(0)("RHCONAS_HOR_ENT_TRAB").ToString()
            eConfiguracionAsistencia.p_RHCONAS_HOR_SAL_TRAB = data.Rows(0)("RHCONAS_HOR_SAL_TRAB").ToString()
            eConfiguracionAsistencia.p_RHCONAS_USUA_ID = data.Rows(0)("RHCONAS_USUA_ID").ToString()

            eConfiguracionAsistencia.p_RHMANAS_FALTA_TRABAJADOR = "12"
            eConfiguracionAsistencia.p_RHMANAS_HORA_EXTRA_TRABAJADOR = "13"

            ListaConfiguracionAsistencia.Add(eConfiguracionAsistencia)
        End If

        data = dt

        If Not data Is Nothing Then
            If dt.Rows(0)(0).ToString() = "Nombre" Or dt.Rows(0)(0).ToString() = "" Then 'DPORTA 29/03/2023
                For i = 1 To data.Rows.Count - 1
                    If dt.Rows(i)(Convert.ToInt16(eConfiguracionAsistencia.p_RHCONAS_COD_BIO) - 1).ToString() = "Nombre" Or dt.Rows(i)(Convert.ToInt16(eConfiguracionAsistencia.p_RHCONAS_COD_BIO) - 1).ToString() = "" Then
                    Else
                        Dim eAsistencia As New eAsistencia()
                        eAsistencia.RHMANAS_CODE_BIO = dt.Rows(i)(Convert.ToInt16(eConfiguracionAsistencia.p_RHCONAS_COD_BIO) - 1).ToString()
                        eAsistencia.RHMANAS_FECHA = dt.Rows(i)(Convert.ToInt16(eConfiguracionAsistencia.p_RHCONAS_FECHA) - 1).ToString()
                        eAsistencia.RHMANAS_HORA_ENTRADA = dt.Rows(i)(Convert.ToInt16(eConfiguracionAsistencia.p_RHCONAS_HOR_ENT) - 1).ToString()
                        eAsistencia.RHMANAS_HORA_SALIDA = dt.Rows(i)(Convert.ToInt16(eConfiguracionAsistencia.p_RHCONAS_HOR_SAL) - 1).ToString()
                        eAsistencia.RHMANAS_HORA_ENTRADA_TRABAJADOR = dt.Rows(i)(Convert.ToInt16(eConfiguracionAsistencia.p_RHCONAS_HOR_ENT_TRAB) - 1).ToString()
                        eAsistencia.RHMANAS_HORA_SALIDA_TRABAJADOR = dt.Rows(i)(Convert.ToInt16(eConfiguracionAsistencia.p_RHCONAS_HOR_SAL_TRAB) - 1).ToString()
                        eAsistencia.RHMANAS_USUA_ID = hfUsuario.Value()

                        eAsistencia.RHMANAS_FALTA_TRABAJADOR = dt.Rows(i)(Convert.ToInt16(eConfiguracionAsistencia.p_RHMANAS_FALTA_TRABAJADOR) - 1).ToString()
                        eAsistencia.RHMANAS_HORA_EXTRA_TRABAJADOR = dt.Rows(i)(Convert.ToInt16(eConfiguracionAsistencia.p_RHMANAS_HORA_EXTRA_TRABAJADOR) - 1).ToString()

                        ListaAsistencia.Add(eAsistencia)
                    End If
                Next
            Else
                For i = 0 To data.Rows.Count - 1
                    If dt.Rows(i)(Convert.ToInt16(eConfiguracionAsistencia.p_RHCONAS_COD_BIO) - 1).ToString() = "Nombre" Or dt.Rows(i)(Convert.ToInt16(eConfiguracionAsistencia.p_RHCONAS_COD_BIO) - 1).ToString() = "" Then
                    Else
                        Dim eAsistencia As New eAsistencia()
                        eAsistencia.RHMANAS_CODE_BIO = dt.Rows(i)(Convert.ToInt16(eConfiguracionAsistencia.p_RHCONAS_COD_BIO) - 1).ToString()
                        eAsistencia.RHMANAS_FECHA = dt.Rows(i)(Convert.ToInt16(eConfiguracionAsistencia.p_RHCONAS_FECHA) - 1).ToString()
                        eAsistencia.RHMANAS_HORA_ENTRADA = dt.Rows(i)(Convert.ToInt16(eConfiguracionAsistencia.p_RHCONAS_HOR_ENT) - 1).ToString()
                        eAsistencia.RHMANAS_HORA_SALIDA = dt.Rows(i)(Convert.ToInt16(eConfiguracionAsistencia.p_RHCONAS_HOR_SAL) - 1).ToString()
                        eAsistencia.RHMANAS_HORA_ENTRADA_TRABAJADOR = dt.Rows(i)(Convert.ToInt16(eConfiguracionAsistencia.p_RHCONAS_HOR_ENT_TRAB) - 1).ToString()
                        eAsistencia.RHMANAS_HORA_SALIDA_TRABAJADOR = dt.Rows(i)(Convert.ToInt16(eConfiguracionAsistencia.p_RHCONAS_HOR_SAL_TRAB) - 1).ToString()
                        eAsistencia.RHMANAS_USUA_ID = hfUsuario.Value()

                        eAsistencia.RHMANAS_FALTA_TRABAJADOR = dt.Rows(i)(Convert.ToInt16(eConfiguracionAsistencia.p_RHMANAS_FALTA_TRABAJADOR) - 1).ToString()
                        eAsistencia.RHMANAS_HORA_EXTRA_TRABAJADOR = dt.Rows(i)(Convert.ToInt16(eConfiguracionAsistencia.p_RHMANAS_HORA_EXTRA_TRABAJADOR) - 1).ToString()

                        ListaAsistencia.Add(eAsistencia)
                    End If
                Next
            End If

            Dim bError As Boolean = False
            Dim html As String = ""
            html = html & "<div id='DIVTABLA' class='portlet-body'>"
            html = html & "<div id='UNO' class='row-fluid'>"
            html = html & "<div id='DOS'  class='span12'>"
            html = html & "<table id='tblAsistencia' border='0' class='display DTTT_selectable'>"
            html = html & "<thead>"
            html = html & "<tr>"

            html = html & "<th>CÓDIGO</th>"
            html = html & "<th>NOMBRES</th>"
            html = html & "<th>FECHA</th>"
            html = html & "<th>H. ENTRADA</th>"
            html = html & "<th>H. SALIDA</th>"
            html = html & "<th>H. E. TRAB.</th>"
            html = html & "<th>H. S. TRAB.</th>"
            html = html & "<th>USUARIO</th>"

            html = html & "</tr>"
            html = html & "</thead>"

            html = html & "<tbody>"

            Dim Codigo As String = ""
            Dim Tabla As New DataTable
            Dim Nombre As String = ""
            'For i = 0 To ListaAsistencia.Count - 1
            '    Asistencia.Crear_Asistencia(ListaAsistencia(i).RHMANAS_CODE, hfEmpresa.Value, hfSucursal.Value,
            '                                ListaAsistencia(i).RHMANAS_FCOPERI_CODE,
            '                           ListaAsistencia(i).RHMANAS_CODE_BIO, ListaAsistencia(i).RHMANAS_NOMBRE, ListaAsistencia(i).RHMANAS_FECHA,
            '                           ListaAsistencia(i).RHMANAS_HORA_ENTRADA, ListaAsistencia(i).RHMANAS_HORA_SALIDA,
            '                           ListaAsistencia(i).RHMANAS_HORA_ENTRADA_TRABAJADOR, ListaAsistencia(i).RHMANAS_HORA_SALIDA_TRABAJADOR,
            '                           ListaAsistencia(i).RHMANAS_USUA_ID, p_SALIDA)

            'Next
            For i = 0 To ListaAsistencia.Count - 1

                html = html & "<tr>"
                html = html & "<td>" & ListaAsistencia(i).RHMANAS_CODE_BIO & "</td>"
                If Codigo.Equals(ListaAsistencia(i).RHMANAS_CODE_BIO) Then

                Else
                    'If ListaAsistencia(i).RHMANAS_CODE_BIO.Equals("") Then
                    '    Exit Sub
                    'End If
                    Tabla = New DataTable
                    If ListaAsistencia(i).RHMANAS_CODE_BIO.Equals("") Then
                        If ListaAsistencia(i).RHMANAS_CODE_BIO.Equals("") And
                             ListaAsistencia(i).RHMANAS_FECHA.Equals("") And
                            ListaAsistencia(i).RHMANAS_HORA_ENTRADA.Equals("") And
                            ListaAsistencia(i).RHMANAS_HORA_SALIDA.Equals("") And
                            ListaAsistencia(i).RHMANAS_HORA_ENTRADA_TRABAJADOR.Equals("") And
                            ListaAsistencia(i).RHMANAS_HORA_SALIDA_TRABAJADOR.Equals("") Then
                        Else
                            Me.Page.ClientScript.RegisterStartupScript(Me.GetType(), "Script", "<script language='javascript'>alertCustom('El código biométrico en la fila número " & (i - 1) & " no es válido, vuelva a carga el archivo.');</script>", False)
                            'Me.Page.ClientScript.RegisterStartupScript(Me.GetType(), "El nómade", "El código biométrico en la fila número" & (i - 1) & " no es válido.") 'es para escribir
                            'Exit Sub
                            bError = True
                        End If

                        If ListaAsistencia(i).RHMANAS_CODE_BIO.Equals("") And
                             ListaAsistencia(i).RHMANAS_FECHA.Equals("") And
                            ListaAsistencia(i).RHMANAS_HORA_ENTRADA.Equals("") And
                            ListaAsistencia(i).RHMANAS_HORA_SALIDA.Equals("") And
                            ListaAsistencia(i).RHMANAS_HORA_ENTRADA_TRABAJADOR.Equals("") And
                            ListaAsistencia(i).RHMANAS_HORA_SALIDA_TRABAJADOR.Equals("") Then
                        Else
                            Me.Page.ClientScript.RegisterStartupScript(Me.GetType(), "Script", "<script language='javascript'>alertCustom('El código biométrico en la fila número " & (i - 1) & " no es válido, vuelva a carga el archivo.');</script>", False)
                            'Me.Page.ClientScript.RegisterStartupScript(Me.GetType(), "El nómade", "El código biométrico en la fila número" & (i - 1) & " no es válido.") 'es para escribir
                            'Exit Sub
                            bError = True
                        End If
                    End If
                    If Nombre = "" Or Codigo = "" Then
                        Tabla = Empleado.Listar_Empleados(0, 0, "", "", "", "", "", ListaAsistencia(i).RHMANAS_CODE_BIO)
                        If Not Tabla Is Nothing Then
                            Nombre = Tabla.Rows(0)("NOMBRE_EMPLEADO").ToString()
                            Codigo = Tabla.Rows(0)("CODIGO_EMPLEADO").ToString()
                        Else
                            'no existe
                        End If
                    End If
                End If

                'If Codigo = "" Then
                '    'Codigo = ListaAsistencia(i).RHMANAS_CODE_BIO
                '    Codigo = Tabla.Rows(0)("CODIGO_EMPLEADO").ToString()
                'End If

                'If Nombre = "" Then
                '    Nombre = Tabla.Rows(0)("NOMBRE_EMPLEADO").ToString()
                'End If

                html = html & "<td>" & Nombre & "</td>"

                Try
                    If ListaAsistencia(i).RHMANAS_CODE_BIO.Equals("") And
                           ListaAsistencia(i).RHMANAS_FECHA.Equals("") And
                          ListaAsistencia(i).RHMANAS_HORA_ENTRADA.Equals("") And
                          ListaAsistencia(i).RHMANAS_HORA_SALIDA.Equals("") And
                          ListaAsistencia(i).RHMANAS_HORA_ENTRADA_TRABAJADOR.Equals("") And
                          ListaAsistencia(i).RHMANAS_HORA_SALIDA_TRABAJADOR.Equals("") Then
                    Else
                        'Convert.ToDateTime(ListaAsistencia(i).RHMANAS_FECHA).ToString("dd/MM/yyyy")
                        html = html & "<td>" & ListaAsistencia(i).RHMANAS_FECHA & "</td>"

                    End If
                Catch ex As Exception
                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType(), "Script", "<script language='javascript'>alertCustom('El formato fecha en la fila número " & (i - 1) & " no es válido, vuelva a carga el archivo.');</script>", False)
                    bError = True
                End Try

                html = html & "<td>" & ListaAsistencia(i).RHMANAS_HORA_ENTRADA & "</td>"
                html = html & "<td>" & ListaAsistencia(i).RHMANAS_HORA_SALIDA & "</td>"
                Dim HoraEntradaTrabajador As String = ""
                Dim HoraSalidaTrabajador As String = ""
                If Not ListaAsistencia(i).RHMANAS_HORA_ENTRADA_TRABAJADOR.Equals("") Then
                    html = html & "<td>" & ListaAsistencia(i).RHMANAS_HORA_ENTRADA_TRABAJADOR & "</td>"
                    HoraEntradaTrabajador = ListaAsistencia(i).RHMANAS_HORA_ENTRADA_TRABAJADOR
                Else
                    html = html & "<td>" & ListaAsistencia(i).RHMANAS_HORA_ENTRADA & "</td>"
                    HoraEntradaTrabajador = ListaAsistencia(i).RHMANAS_HORA_ENTRADA
                End If

                If Not ListaAsistencia(i).RHMANAS_HORA_SALIDA_TRABAJADOR.Equals("") Then
                    html = html & "<td>" & ListaAsistencia(i).RHMANAS_HORA_SALIDA_TRABAJADOR & "</td>"
                    HoraSalidaTrabajador = ListaAsistencia(i).RHMANAS_HORA_SALIDA_TRABAJADOR
                Else
                    html = html & "<td>" & ListaAsistencia(i).RHMANAS_HORA_SALIDA & "</td>"
                    HoraSalidaTrabajador = ListaAsistencia(i).RHMANAS_HORA_SALIDA
                End If

                html = html & "<td>" & hfUsuario.Value() & "</td>"
                html = html & "</tr>"

                Asistencia.Crear_Asistencia(ListaAsistencia(i).RHMANAS_CODE, hfEmpresa.Value, hfSucursal.Value, hfPeriodo.Value,
                                                    Codigo, Nombre, Utilities.fechaLocal_Excel(ListaAsistencia(i).RHMANAS_FECHA),
                                                    ListaAsistencia(i).RHMANAS_HORA_ENTRADA, ListaAsistencia(i).RHMANAS_HORA_SALIDA,
                                                    HoraEntradaTrabajador, HoraSalidaTrabajador, ListaAsistencia(i).RHMANAS_USUA_ID, "", 0,
                                                    ListaAsistencia(i).RHMANAS_FALTA_TRABAJADOR, ListaAsistencia(i).RHMANAS_HORA_EXTRA_TRABAJADOR)
                'If i = 0 Then

                '    If ListaAsistencia(i).RHMANAS_CODE_BIO.Equals("") And
                '                     ListaAsistencia(i).RHMANAS_FECHA.Equals("") And
                '                    ListaAsistencia(i).RHMANAS_HORA_ENTRADA.Equals("") And
                '                    ListaAsistencia(i).RHMANAS_HORA_SALIDA.Equals("") And
                '                    ListaAsistencia(i).RHMANAS_HORA_ENTRADA_TRABAJADOR.Equals("") And
                '                    ListaAsistencia(i).RHMANAS_HORA_SALIDA_TRABAJADOR.Equals("") Then

                '    Else
                '        'Asistencia.Crear_Asistencia(ListaAsistencia(i).RHMANAS_CODE, hfEmpresa.Value, hfSucursal.Value, hfPeriodo.Value,
                '        '                            ListaAsistencia(i).RHMANAS_CODE_BIO, Nombre, Utilities.fechaLocal_Excel(ListaAsistencia(i).RHMANAS_FECHA),
                '        '                            ListaAsistencia(i).RHMANAS_HORA_ENTRADA, ListaAsistencia(i).RHMANAS_HORA_SALIDA,
                '        '                            HoraEntradaTrabajador, HoraSalidaTrabajador, ListaAsistencia(i).RHMANAS_USUA_ID, "", 1,
                '        '                            ListaAsistencia(i).RHMANAS_FALTA_TRABAJADOR, ListaAsistencia(i).RHMANAS_HORA_EXTRA_TRABAJADOR)
                '        Asistencia.Crear_Asistencia(ListaAsistencia(i).RHMANAS_CODE, hfEmpresa.Value, hfSucursal.Value, hfPeriodo.Value,
                '                                    Codigo, Nombre, Utilities.fechaLocal_Excel(ListaAsistencia(i).RHMANAS_FECHA),
                '                                    ListaAsistencia(i).RHMANAS_HORA_ENTRADA, ListaAsistencia(i).RHMANAS_HORA_SALIDA,
                '                                    HoraEntradaTrabajador, HoraSalidaTrabajador, ListaAsistencia(i).RHMANAS_USUA_ID, "", 1,
                '                                    ListaAsistencia(i).RHMANAS_FALTA_TRABAJADOR, ListaAsistencia(i).RHMANAS_HORA_EXTRA_TRABAJADOR)
                '    End If
                'Else
                '    If ListaAsistencia(i).RHMANAS_CODE_BIO.Equals("") And
                '             ListaAsistencia(i).RHMANAS_FECHA.Equals("") And
                '            ListaAsistencia(i).RHMANAS_HORA_ENTRADA.Equals("") And
                '            ListaAsistencia(i).RHMANAS_HORA_SALIDA.Equals("") And
                '            ListaAsistencia(i).RHMANAS_HORA_ENTRADA_TRABAJADOR.Equals("") And
                '            ListaAsistencia(i).RHMANAS_HORA_SALIDA_TRABAJADOR.Equals("") Then

                '    Else
                '        'Asistencia.Crear_Asistencia(ListaAsistencia(i).RHMANAS_CODE, hfEmpresa.Value, hfSucursal.Value, hfPeriodo.Value,
                '        '                            ListaAsistencia(i).RHMANAS_CODE_BIO, Nombre, Utilities.fechaLocal_Excel(ListaAsistencia(i).RHMANAS_FECHA),
                '        '                            ListaAsistencia(i).RHMANAS_HORA_ENTRADA, ListaAsistencia(i).RHMANAS_HORA_SALIDA,
                '        '                            HoraEntradaTrabajador, HoraSalidaTrabajador, ListaAsistencia(i).RHMANAS_USUA_ID, "", 0,
                '        '                            ListaAsistencia(i).RHMANAS_FALTA_TRABAJADOR, ListaAsistencia(i).RHMANAS_HORA_EXTRA_TRABAJADOR)
                '        Asistencia.Crear_Asistencia(ListaAsistencia(i).RHMANAS_CODE, hfEmpresa.Value, hfSucursal.Value, hfPeriodo.Value,
                '                                    Codigo, Nombre, Utilities.fechaLocal_Excel(ListaAsistencia(i).RHMANAS_FECHA),
                '                                    ListaAsistencia(i).RHMANAS_HORA_ENTRADA, ListaAsistencia(i).RHMANAS_HORA_SALIDA,
                '                                    HoraEntradaTrabajador, HoraSalidaTrabajador, ListaAsistencia(i).RHMANAS_USUA_ID, "", 0,
                '                                    ListaAsistencia(i).RHMANAS_FALTA_TRABAJADOR, ListaAsistencia(i).RHMANAS_HORA_EXTRA_TRABAJADOR)
                '    End If
                'End If
            Next

            html = html & "</tbody>"

            html = html & "</table>"
            html = html & "</div>"
            html = html & "</div>"
            html = html & "</div>"

            If bError = True Then
                html = ""
                html = html & "<div id='DIVTABLA' class='portlet-body'>"
                html = html & "<div id='UNO' class='row-fluid'>"
                html = html & "<div id='DOS'  class='span12'>"
                'html = html & "<table id='tblAsistencia' border='0' class='display DTTT_selectable' style='display: block;'>"
                html = html & "<table id='tblAsistencia' border='0' class='display DTTT_selectable'>"
                html = html & "<thead>"
                html = html & "<tr>"

                html = html & "<th>CÓDIGO</th>"
                html = html & "<th>NOMBRES</th>"
                html = html & "<th>FECHA</th>"
                html = html & "<th>H. ENTRADA</th>"
                html = html & "<th>H. SALIDA</th>"
                html = html & "<th>H. E. TRAB.</th>"
                html = html & "<th>H. S. TRAB.</th>"
                html = html & "<th>USUARIO</th>"

                html = html & "</tr>"
                html = html & "</thead>"
                html = html & "</table>"
            End If
            hfTable.Value = html
        End If
    End Sub

    Protected Sub btlGenerar_Click(sender As Object, e As EventArgs) Handles btlGenerar.Click
        CargarArchivoX()
    End Sub
    Public Function Crear_Asistencia(ByVal p_RHMANAS_CODE As String, ByVal p_RHMANAS_CTLG_CODE As String,
                                  ByVal p_RHMANAS_FTVSCSL_CODE As String, ByVal p_RHMANAS_FCOPERI_CODE As String,
                                  ByVal p_RHMANAS_CODE_BIO As String, ByVal p_RHMANAS_NOMBRE As String,
                                  ByVal p_RHMANAS_FECHA As String, ByVal p_RHMANAS_HORA_ENTRADA As String,
                                  ByVal p_RHMANAS_HORA_SALIDA As String, ByVal p_RHMANAS_HORA_ENTRADA_TRABAJADOR As String,
                                  ByVal p_RHMANAS_HORA_SALIDA_TRABAJADOR As String, ByVal p_RHMANAS_USUA_ID As String,
                                  ByVal p_SALIDA As String, ByVal p_TIPO As String, ByVal p_RHMANAS_FALTA_TRABAJADOR As String, ByVal p_RHMANAS_HORA_EXTRA_TRABAJADOR As String) As String

        Try
            Dim cResultado As String = ""
            cResultado = Asistencia.Crear_Asistencia(p_RHMANAS_CODE, p_RHMANAS_CTLG_CODE, p_RHMANAS_FTVSCSL_CODE, p_RHMANAS_FCOPERI_CODE,
                                       p_RHMANAS_CODE_BIO, p_RHMANAS_NOMBRE, p_RHMANAS_FECHA, p_RHMANAS_HORA_ENTRADA, p_RHMANAS_HORA_SALIDA,
                                       p_RHMANAS_HORA_ENTRADA_TRABAJADOR, p_RHMANAS_HORA_SALIDA_TRABAJADOR, p_RHMANAS_USUA_ID, p_SALIDA, p_TIPO, p_RHMANAS_FALTA_TRABAJADOR, p_RHMANAS_HORA_EXTRA_TRABAJADOR)
            Return cResultado

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
End Class


Public Class eAsistencia
    Private _RHMANAS_CODE As String
    Private _RHMANAS_CTLG_CODE As String
    Private _RHMANAS_FTVSCSL_CODE As String
    Private _RHMANAS_FCOPERI_CODE As String
    Private _RHMANAS_CODE_BIO As String
    Private _RHMANAS_FECHA As String
    Private _RHMANAS_HORA_ENTRADA As String
    Private _RHMANAS_HORA_SALIDA As String
    Private _RHMANAS_HORA_ENTRADA_TRABAJADOR As String
    Private _RHMANAS_HORA_SALIDA_TRABAJADOR As String
    Private _RHMANAS_ESTADO_IND As String
    Private _RHMANAS_USUA_ID As String
    Private _RHMANAS_FECHA_ACTV As String

    Private _RHMANAS_FALTA_TRABAJADOR As String
    Private _RHMANAS_HORA_EXTRA_TRABAJADOR As String
    Public Property RHMANAS_CODE() As String
        Get
            Return _RHMANAS_CODE
        End Get
        Set(ByVal Value As String)
            _RHMANAS_CODE = Value
        End Set
    End Property
    Public Property RHMANAS_CTLG_CODE() As String
        Get
            Return _RHMANAS_CTLG_CODE
        End Get
        Set(ByVal Value As String)
            _RHMANAS_CTLG_CODE = Value
        End Set
    End Property
    Public Property RHMANAS_FTVSCSL_CODE() As String
        Get
            Return _RHMANAS_FTVSCSL_CODE
        End Get
        Set(ByVal Value As String)
            _RHMANAS_FTVSCSL_CODE = Value
        End Set
    End Property
    Public Property RHMANAS_FCOPERI_CODE() As String
        Get
            Return _RHMANAS_FCOPERI_CODE
        End Get
        Set(ByVal Value As String)
            _RHMANAS_FCOPERI_CODE = Value
        End Set
    End Property
    Public Property RHMANAS_CODE_BIO() As String
        Get
            Return _RHMANAS_CODE_BIO
        End Get
        Set(ByVal Value As String)
            _RHMANAS_CODE_BIO = Value
        End Set
    End Property
    Public Property RHMANAS_FECHA() As String
        Get
            Return _RHMANAS_FECHA
        End Get
        Set(ByVal Value As String)
            _RHMANAS_FECHA = Value
        End Set
    End Property
    Public Property RHMANAS_HORA_ENTRADA() As String
        Get
            Return _RHMANAS_HORA_ENTRADA
        End Get
        Set(ByVal Value As String)
            _RHMANAS_HORA_ENTRADA = Value
        End Set
    End Property
    Public Property RHMANAS_HORA_SALIDA() As String
        Get
            Return _RHMANAS_HORA_SALIDA
        End Get
        Set(ByVal Value As String)
            _RHMANAS_HORA_SALIDA = Value
        End Set
    End Property
    Public Property RHMANAS_HORA_ENTRADA_TRABAJADOR() As String
        Get
            Return _RHMANAS_HORA_ENTRADA_TRABAJADOR
        End Get
        Set(ByVal Value As String)
            _RHMANAS_HORA_ENTRADA_TRABAJADOR = Value
        End Set
    End Property
    Public Property RHMANAS_HORA_SALIDA_TRABAJADOR() As String
        Get
            Return _RHMANAS_HORA_SALIDA_TRABAJADOR
        End Get
        Set(ByVal Value As String)
            _RHMANAS_HORA_SALIDA_TRABAJADOR = Value
        End Set
    End Property
    Public Property RHMANAS_ESTADO_IND() As String
        Get
            Return _RHMANAS_ESTADO_IND
        End Get
        Set(ByVal Value As String)
            _RHMANAS_ESTADO_IND = Value
        End Set
    End Property
    Public Property RHMANAS_USUA_ID() As String
        Get
            Return _RHMANAS_USUA_ID
        End Get
        Set(ByVal Value As String)
            _RHMANAS_USUA_ID = Value
        End Set
    End Property
    Public Property RHMANAS_FECHA_ACTV() As String
        Get
            Return _RHMANAS_FECHA_ACTV
        End Get
        Set(ByVal Value As String)
            _RHMANAS_FECHA_ACTV = Value
        End Set
    End Property

    Public Property RHMANAS_FALTA_TRABAJADOR() As String
        Get
            Return _RHMANAS_FALTA_TRABAJADOR
        End Get
        Set(ByVal Value As String)
            _RHMANAS_FALTA_TRABAJADOR = Value
        End Set
    End Property

    Public Property RHMANAS_HORA_EXTRA_TRABAJADOR() As String
        Get
            Return _RHMANAS_HORA_EXTRA_TRABAJADOR
        End Get
        Set(ByVal Value As String)
            _RHMANAS_HORA_EXTRA_TRABAJADOR = Value
        End Set
    End Property
End Class
Public Class eConfiguracionAsistencia
    Private _p_RHCONAS_CODE As String
    Private _p_RHCONAS_COD_BIO As String
    Private _p_RHCONAS_FECHA As String
    Private _p_RHCONAS_HOR_ENT As String
    Private _p_RHCONAS_HOR_SAL As String
    Private _p_RHCONAS_HOR_ENT_TRAB As String
    Private _p_RHCONAS_HOR_SAL_TRAB As String
    Private _p_RHCONAS_USUA_ID As String

    Private _p_RHMANAS_FALTA_TRABAJADOR As String
    Private _p_RHMANAS_HORA_EXTRA_TRABAJADOR As String
    Public Property p_RHCONAS_CODE() As String
        Get
            Return _p_RHCONAS_CODE
        End Get
        Set(ByVal Value As String)
            _p_RHCONAS_CODE = Value
        End Set
    End Property
    Public Property p_RHCONAS_COD_BIO() As String
        Get
            Return _p_RHCONAS_COD_BIO
        End Get
        Set(ByVal Value As String)
            _p_RHCONAS_COD_BIO = Value
        End Set
    End Property
    Public Property p_RHCONAS_FECHA() As String
        Get
            Return _p_RHCONAS_FECHA
        End Get
        Set(ByVal Value As String)
            _p_RHCONAS_FECHA = Value
        End Set
    End Property
    Public Property p_RHCONAS_HOR_ENT() As String
        Get
            Return _p_RHCONAS_HOR_ENT
        End Get
        Set(ByVal Value As String)
            _p_RHCONAS_HOR_ENT = Value
        End Set
    End Property
    Public Property p_RHCONAS_HOR_SAL() As String
        Get
            Return _p_RHCONAS_HOR_SAL
        End Get
        Set(ByVal Value As String)
            _p_RHCONAS_HOR_SAL = Value
        End Set
    End Property
    Public Property p_RHCONAS_HOR_ENT_TRAB() As String
        Get
            Return _p_RHCONAS_HOR_ENT_TRAB
        End Get
        Set(ByVal Value As String)
            _p_RHCONAS_HOR_ENT_TRAB = Value
        End Set
    End Property
    Public Property p_RHCONAS_HOR_SAL_TRAB() As String
        Get
            Return _p_RHCONAS_HOR_SAL_TRAB
        End Get
        Set(ByVal Value As String)
            _p_RHCONAS_HOR_SAL_TRAB = Value
        End Set
    End Property
    Public Property p_RHCONAS_USUA_ID() As String
        Get
            Return _p_RHCONAS_USUA_ID
        End Get
        Set(ByVal Value As String)
            _p_RHCONAS_USUA_ID = Value
        End Set
    End Property

    Public Property p_RHMANAS_FALTA_TRABAJADOR() As String
        Get
            Return _p_RHMANAS_FALTA_TRABAJADOR
        End Get
        Set(ByVal Value As String)
            _p_RHMANAS_FALTA_TRABAJADOR = Value
        End Set
    End Property

    Public Property p_RHMANAS_HORA_EXTRA_TRABAJADOR() As String
        Get
            Return _p_RHMANAS_HORA_EXTRA_TRABAJADOR
        End Get
        Set(ByVal Value As String)
            _p_RHMANAS_HORA_EXTRA_TRABAJADOR = Value
        End Set
    End Property
End Class
