Public Class FIIgv
    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function fListarAnio() As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("sp_Anio_Periodo", CommandType.StoredProcedure)
            dt = cn.Consulta(cmd)

            If Not dt Is Nothing Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function fListarMes() As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("sp_Mes_Periodo", CommandType.StoredProcedure)
            dt = cn.Consulta(cmd)

            If Not dt Is Nothing Then
                Return dt
            Else
                Return Nothing
            End If

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function fListarIGV(ByVal Anio As String, ByVal Mes As String, ByVal ctlg As String, ByVal scsl As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("Sp_DeclareIGV", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_Mes", Mes, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Anio", Anio, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ctlg", ctlg, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_scsl", scsl, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not dt Is Nothing Then
                Return dt
            Else
                Return Nothing
            End If

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function fNombreEmpresa(ByVal Ctlg As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SP_EMPIGV", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@pctlg", Ctlg, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not dt Is Nothing Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw ex
        End Try
    End Function
    Function ListarImpuestoRenta(ByVal p_CODE As String, ByVal p_FECHA_TRANSACCION As String, ByVal p_FECHA_APLICACION As String, ByVal p_FECHA_BUSQUEDA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFR_LISTAR_IMPUESTO_RENTA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRANSACCION", p_FECHA_TRANSACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_APLICACION", p_FECHA_APLICACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_BUSQUEDA", p_FECHA_BUSQUEDA, ParameterDirection.Input, 253))
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

    Function CrearImpuestoRenta(ByVal p_FECHA_APLICACION As String, ByVal p_FACTOR As String,
                                ByVal p_IMPUESTO_RENTA As String, ByVal p_INGRESO As String, ByVal p_DIFERENCIA As String,
                                ByVal p_COEFICIENTE As String, ByVal p_USUA_ID As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFR_CREAR_IMPUESTO_RENTA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_APLICACION", p_FECHA_APLICACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACTOR", p_FACTOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPUESTO_RENTA", p_IMPUESTO_RENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_INGRESO", p_INGRESO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIFERENCIA", p_DIFERENCIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COEFICIENTE", p_COEFICIENTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", String.Empty, ParameterDirection.Output, 253))


            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_CODIGO").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Function ActualizarImpuestoRenta(ByVal p_CODE As String, ByVal p_FECHA_APLICACION As String,
                                     ByVal p_FACTOR As String, p_IMPUESTO_RENTA As String, ByVal p_INGRESO As String,
                                     ByVal p_DIFERENCIA As String, ByVal p_COEFICIENTE As String, ByVal p_USUA_ID As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFR_ACTUALIZAR_IMPUESTO_RENTA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_APLICACION", p_FECHA_APLICACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACTOR", p_FACTOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPUESTO_RENTA", p_IMPUESTO_RENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_INGRESO", p_INGRESO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIFERENCIA", p_DIFERENCIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COEFICIENTE", p_COEFICIENTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", String.Empty, ParameterDirection.Output, 253))


            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_CODIGO").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fListarRenta(ByVal pMes As String, ByVal pAnio As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("sp_ListaRenta", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_Mes", pMes, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Anio", pAnio, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not dt Is Nothing Then
                Return dt
            Else
                Return Nothing
            End If

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function fObtieneMonedaOficial() As String
        Dim dt As DataTable
        Dim cmd As IDbCommand
        Dim Codigo As String = String.Empty
        Try
            cmd = cn.GetNewCommand("SP_MonedaOficial", CommandType.StoredProcedure)

            dt = cn.Consulta(cmd)

            If Not dt Is Nothing Then
                For Each nrow As DataRow In dt.Rows
                    Codigo = nrow("CODIGO").ToString
                Next
            End If

            Return Codigo
        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function fListaCronograma(ByVal pPeriodoInicial As String, ByVal pPeriodoFinal As String) As DataTable
        'Dim sQUERY As String
        'Dim sQUERY1 As String
        'Dim cmd As IDbCommand
        'Dim dt As DataTable
        'Dim i As Integer
        'Try
        '    sQUERY = "SELECT T.pertrib, max(T.dig0) as dig0,max(T.dig1) as dig1, max(T.dig2) as dig2,max(T.dig3) as dig3,"
        '    sQUERY = sQUERY & " max(T.dig4) as dig4, max(T.dig5) as dig5, max(T.dig6) as dig6, max(T.dig7) as dig7,"
        '    sQUERY = sQUERY & " max(T.dig8) as dig8, max(T.dig9) as dig9, max(T.dig10) as dig10 "
        '    sQUERY = sQUERY & " FROM("
        '    sQUERY = sQUERY & " select f.`pertrib`, f.`dig0`, f.`dig1`, f.`dig2`, f.`dig3`, f.`dig4`, f.`dig5`,"
        '    sQUERY = sQUERY & "  f.`dig6`, f.`dig7`, f.`dig8`, f.`dig9`, f.`dig10`"
        '    sQUERY = sQUERY & "  from ftvcrsu f"
        '    sQUERY = sQUERY & "  where f.`pertrib`>='" & pPeriodoInicial & "' and f.`pertrib`<='" & pPeriodoFinal & "' "

        '    sQUERY1 = ""
        '    For i = Convert.ToInt32(pPeriodoInicial) To Convert.ToInt32(pPeriodoFinal)

        '        If i.ToString.Substring(4, 2) = "01" Or i.ToString.Substring(4, 2) = "02" Or i.ToString.Substring(4, 2) = "03" Or _
        '           i.ToString.Substring(4, 2) = "04" Or i.ToString.Substring(4, 2) = "05" Or i.ToString.Substring(4, 2) = "06" Or _
        '           i.ToString.Substring(4, 2) = "07" Or i.ToString.Substring(4, 2) = "08" Or i.ToString.Substring(4, 2) = "09" Or _
        '           i.ToString.Substring(4, 2) = "10" Or i.ToString.Substring(4, 2) = "11" Or i.ToString.Substring(4, 2) = "12" Then
        '            If i = Convert.ToInt32(pPeriodoInicial) Then
        '                sQUERY1 = sQUERY1 & " union all "
        '                sQUERY1 = sQUERY1 & " select '" & i & "' as pertri,"
        '                sQUERY1 = sQUERY1 & " null as dig0,"
        '                sQUERY1 = sQUERY1 & " null as dig1,"
        '                sQUERY1 = sQUERY1 & " null as dig2,"
        '                sQUERY1 = sQUERY1 & " null as dig3,"
        '                sQUERY1 = sQUERY1 & " null as dig4,"
        '                sQUERY1 = sQUERY1 & " null as dig5,"
        '                sQUERY1 = sQUERY1 & " null as dig6,"
        '                sQUERY1 = sQUERY1 & " null as dig7,"
        '                sQUERY1 = sQUERY1 & " null as dig8,"
        '                sQUERY1 = sQUERY1 & " null as dig9,"
        '                sQUERY1 = sQUERY1 & " null as dig10"
        '            Else
        '                sQUERY1 = sQUERY1 & " union all"
        '                sQUERY1 = sQUERY1 & " select '" & i & "' as pertri,"
        '                sQUERY1 = sQUERY1 & " null as dig0,"
        '                sQUERY1 = sQUERY1 & " null as dig1,"
        '                sQUERY1 = sQUERY1 & " null as dig2,"
        '                sQUERY1 = sQUERY1 & " null as dig3,"
        '                sQUERY1 = sQUERY1 & " null as dig4,"
        '                sQUERY1 = sQUERY1 & " null as dig5,"
        '                sQUERY1 = sQUERY1 & " null as dig6,"
        '                sQUERY1 = sQUERY1 & " null as dig7,"
        '                sQUERY1 = sQUERY1 & " null as dig8,"
        '                sQUERY1 = sQUERY1 & " null as dig9,"
        '                sQUERY1 = sQUERY1 & " null as dig10"
        '            End If
        '        End If
        '    Next

        '    sQUERY1 = sQUERY1 & " )T"
        '    sQUERY1 = sQUERY1 & " group by T.pertrib"
        '    sQUERY1 = sQUERY1 & " order by T.pertrib"

        '    cmd = cn.GetNewCommand("Sp_Cronograma", CommandType.StoredProcedure)
        '    cmd.Parameters.Add(cn.GetNewParameter("@pQuery", sQUERY & sQUERY1, ParameterDirection.Input, 253))

        '    dt = cn.Consulta(cmd)

        '    If Not dt Is Nothing Then
        '        Return dt
        '    Else
        '        Return Nothing
        '    End If

        'Catch ex As Exception
        '    Throw ex
        'End Try


       
        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable

            cmd = cn.GetNewCommand("Sp_Cronograma", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERIODO_INI", pPeriodoInicial, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERIODO_FIN", pPeriodoFinal, ParameterDirection.Input, 253))
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

    Public Function fGrabarCronograma(ByVal CodPeriodo As String, _
                                      ByVal dig0 As String, _
                                      ByVal dig1 As String, _
                                      ByVal dig2 As String, _
                                      ByVal dig3 As String, _
                                      ByVal dig4 As String, _
                                      ByVal dig5 As String, _
                                      ByVal dig6 As String, _
                                      ByVal dig7 As String, _
                                      ByVal dig8 As String, _
                                      ByVal dig9 As String, _
                                      ByVal dig10 As String) As String
        Dim msg As String = ""
        Try

            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("sp_ins_crosunat", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@pper", CodPeriodo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@pcod0", dig0, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@pcod1", dig1, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@pcod2", dig2, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@pcod3", dig3, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@pcod4", dig4, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@pcod5", dig5, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@pcod6", dig6, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@pcod7", dig7, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@pcod8", dig8, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@pcod9", dig9, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@pcod10", dig10, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)

            msg = "OK"
            Return msg
        Catch ex As Exception
            Throw ex
        End Try
    End Function



    Public Function fListaPeriodosCronograma(ByVal panio As String, ByVal pfiltro As String) As DataTable

        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable

            cmd = cn.GetNewCommand("PFC_LISTAR_PERIODO_MES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", panio, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FILTRO", pfiltro, ParameterDirection.Input, 253))
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


    Public Function fCompletarPeriodo(ByVal p_Periodo As String, ByVal p_anio As String) As String
        Dim msg As String = ""
        Try

            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_COMPLETAR_CRONOGRAMA_PERIODO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERIODO", p_Periodo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_anio, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)

            msg = "OK"
            Return msg
        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function fListaAsignacionesCronogramaEmpresas(ByVal p_CODE As String, ByVal p_ctlg_code As String, ByVal p_ANIO As String, ByVal p_ESTADO As String) As DataTable

        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable

            cmd = cn.GetNewCommand("PFC_LISTAR_CRONOGRAMA_TRIBUTARIO_EMPRESAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
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

    Public Function fCrearAsignacionesCronogramaEmpresas(ByVal p_ANIO As String) As DataTable

        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable

            cmd = cn.GetNewCommand("PFC_ASIGNAR_CRONOGRAMA_TRIBUTARIO_EMPRESAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_ANIO", p_ANIO, ParameterDirection.Input, 253))
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

    Public Function fCompletarAsignacionEmpresas(ByVal p_ctlg_code As String, ByVal p_anio As String, ByVal p_fecha_renta As String) As String
        Dim msg As String = ""
        Try

            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_COMPLETAR_ASIGANACION_CRONOGRAMA_EMPRESAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_anio, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_RENTA", p_fecha_renta, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)

            msg = "OK"
            Return msg
        Catch ex As Exception
            Throw ex
        End Try
    End Function

End Class
