

Imports System.Threading
Imports System.Data
Imports System.Net
Imports System.IO
Imports System.Xml
Imports System.Text
Imports System.Runtime.InteropServices
Imports Nomade.FI.FIMonedas

Public Class SWTipoCambio
    Private cn As Nomade.Connection

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Private Function GeneraTipoCambio(sHtml) As DataTable
        Try
            Dim sGetResponse As String = String.Empty

            sGetResponse = sHtml 'OpenTxt(ruta)

            Dim document As New HtmlAgilityPack.HtmlDocument()
            document.LoadHtml(sGetResponse)

            Dim NodesTr As HtmlAgilityPack.HtmlNodeCollection = document.DocumentNode.SelectNodes("//table[@class='class=""form-table""']//tr")
            Dim iAnio As Integer
            Dim iMes As Integer
            Try
                iAnio = document.GetElementbyId("anioElegido").GetAttributeValue("value", "")
                iMes = document.GetElementbyId("mesElegido").GetAttributeValue("value", "")
            Catch ex As Exception
                iAnio = 0
                iMes = 0
            End Try

            If NodesTr IsNot Nothing Then
                Dim dt As New DataTable()
                dt.Columns.Add("Dia", GetType([String]))
                dt.Columns.Add("Compra", GetType([String]))
                dt.Columns.Add("Venta", GetType([String]))
                dt.Columns.Add("Anio", GetType([String]))
                dt.Columns.Add("Mes", GetType([String]))

                Dim iNumFila As Integer = 0
                For Each Node As HtmlAgilityPack.HtmlNode In NodesTr
                    If iNumFila > 0 Then
                        Dim iNumColumna As Integer = 0
                        Dim dr As DataRow = dt.NewRow()
                        For Each subNode As HtmlAgilityPack.HtmlNode In Node.Elements("td")

                            If iNumColumna = 0 Then
                                dr = dt.NewRow()
                            End If

                            Dim sValue As String = subNode.InnerHtml.ToString().Trim()
                            sValue = System.Text.RegularExpressions.Regex.Replace(sValue, "<.*?>", " ")
                            dr(iNumColumna) = sValue

                            iNumColumna += 1

                            If iNumColumna = 3 Then
                                dr("Anio") = iAnio
                                dr("Mes") = iMes
                                dt.Rows.Add(dr)
                                iNumColumna = 0
                            End If
                        Next
                    End If
                    iNumFila += 1
                Next

                Return dt
            End If
            Return Nothing
        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Private Function fGetHora() As String
        Dim tbl As DataTable
        Dim nRow As DataRow
        Dim strHora As String = String.Empty

        Try
            tbl = ListarParametros("HTCA", "")

            For Each nRow In tbl.Rows
                strHora = nRow("valor")
            Next

            Return strHora
        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Private Function fMonedaAlterna() As String
        Dim tbl As DataTable
        Dim nRow As DataRow
        Dim strHora As String = String.Empty

        Try
            tbl = ListarParametros("MOAL", "")

            For Each nRow In tbl.Rows
                strHora = nRow("valor")
            Next

            Return strHora

        Catch ex As Exception
            Return ex.Message
        End Try
    End Function

    Public Function fListarTipoCambio(ByVal p_CTLG_CODE As String, ByVal p_MONE_CODE As String, ByVal p_FECHA_VIGENTE As String) As DataTable

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFG_LISTAR_VALOR_CAMBIO_TOTAL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VIGENTE", p_FECHA_VIGENTE, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)


            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function fInserarTipoCambio(ByVal p_MONE_CODE As String, ByVal p_FECHA_VIGENTE As String, ByVal p_VALOR_CAMBIO_COMPRA As String,
                                       ByVal p_VALOR_CAMBIO_VENTA As String, ByVal p_USUA_ID As String, ByVal p_DesTCAM As String) As String

        Try

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            Dim msg As String

            cmd = cn.GetNewCommand("PFG_CREAR_VALOR_CAMBIO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VIGENTE", p_FECHA_VIGENTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO_COMPRA", p_VALOR_CAMBIO_COMPRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO_VENTA", p_VALOR_CAMBIO_VENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPCAM", p_DesTCAM, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CODE").Value

            Return msg

        Catch ex As Exception
            Return ex.Message
        End Try
    End Function

    Public Function ListarParametros(ByVal p_codigo As String, ByVal p_desc As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_PARAMETROS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_desc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FILTRO", String.Empty, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)


            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fInsertarICAnterior() As String
        Dim cmd As IDbCommand
        Dim cmd1 As IDbCommand
        Dim msg As String = String.Empty
        Try
            cmd = cn.GetNewCommand("p_InsertarTipoCambioAnterior", CommandType.StoredProcedure)
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg
        Catch ex As Exception
            Throw ex
        End Try

    End Function

    Public Function fGeneraTipoCambio() As String
        Dim tbl As DataTable
        Dim strHoraMinuto As String = String.Empty
        Dim strHoraFinal As String = String.Empty
        Dim nRow As DataRow
        Dim bEncontro As Boolean = False
        Dim strResultado As String = String.Empty
        Dim sFechaVigente As String = String.Empty
        Dim msg As String = String.Empty
        Dim nDIa As Integer
        Dim sUrl As String = "http://www.sunat.gob.pe/cl-at-ittipcam/tcS01Alias"

        Try

            Dim mone As New Nomade.FI.FIMonedas("bn")

            If mone.fValidaTipoCambio() <> "OK" Then

                ' Call URLDownloadToFile(0, sUrl, ruta, 0, 0)

                strHoraMinuto = Now.ToString("HHmm")
                strHoraFinal = strHoraMinuto

                sFechaVigente = Now.Date.ToString("yyyy/MM/dd")

                'If strHoraFinal = fGetHora() Then ' llego a la hora indicada
                tbl = GeneraTipoCambio(GetPageSource(sUrl))

                Dim sDay As String = Now.Day
                Dim sMonth As String = Now.Month
                Dim sYear As String = Now.Year

                For Each nRow In tbl.Rows
                    If nRow("Dia").ToString.Trim.Equals(sDay) And nRow("Mes").ToString.Trim.Equals(sMonth) And nRow("Anio").ToString.Trim.Equals(sYear) Then
                        bEncontro = True
                        strResultado = fInserarTipoCambio(fMonedaAlterna(), sFechaVigente, nRow("Compra"), nRow("Venta"), "SIST", "OFICIAL")
                    End If
                Next

                If bEncontro = False Then
                    strResultado = fInsertarICAnterior()
                End If

                'End If

                For Each nRow In tbl.Rows
                    sFechaVigente = Now.Date.ToString("yyyy/MM") & "/" & Right("0", 2 - nRow(0).ToString.Trim.Length) & nRow(0).ToString.Trim
                    If fValidarFechaTC(sFechaVigente) = 0 Then
                        strResultado = fInserarTipoCambio(fMonedaAlterna(), sFechaVigente, nRow("Compra"), nRow("Venta"), "SIST", "OFICIAL")
                    End If

                Next

                'Inserta los tipos de cambio que no estan en sunat
                nDIa = Now.Day

                For i = 1 To nDIa
                    sFechaVigente = Now.Date.ToString("yyyy/MM") & "/" & Right("0", 2 - i.ToString.Trim.Length) & i
                    If fValidarFechaTC(sFechaVigente) = 0 Then
                        fInserarTipoCambioFaltantes(sFechaVigente)
                    End If
                Next
            End If

            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function fValidarFechaTC(ByVal pFecha As String) As Integer
        Dim dt As DataTable
        Dim cmd As IDbCommand
        Dim nRow As DataRow
        Dim n As Integer
        Try
            cmd = cn.GetNewCommand("sp_ValidaFechaCambio", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@pFecha", pFecha, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)

            If Not dt Is Nothing Then
                For Each nRow In dt.Rows
                    n = nRow("NRO")
                Next
            End If

            Return n

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function fInserarTipoCambioFaltantes(ByVal pFecha As String) As String

        Try
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            Dim msg As String

            cmd = cn.GetNewCommand("sp_InsertaTCFaltante", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@pFecha", pFecha, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function TipoCambioHoy() As DataTable 'tipo cambio hoy

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand



            cmd = cn.GetNewCommand("sp_DevuelTCDia", CommandType.StoredProcedure)
            dt = cn.Consulta(cmd)

            'Parametros Compra,Venta

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try

    End Function

    Public Function GetPageSource(url As String) As String

        Dim htmlSource As String = String.Empty
        Try

            'Dim myProxy As System.Net.WebProxy = New System.Net.WebProxy("Proxy IP", 8080)

            Using client As System.Net.WebClient = New System.Net.WebClient()
                'client.Proxy = myProxy
                'client.Proxy.Credentials = New System.Net.NetworkCredential("username", "password")
                htmlSource = client.DownloadString(url)
            End Using

        Catch ex As WebException
            Throw (ex)
        End Try


        Return htmlSource

    End Function

End Class
