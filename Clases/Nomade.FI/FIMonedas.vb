Public Class FIMonedas
    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub



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

    Public Function fInserarTipoCambio(ByVal p_MONE_CODE As String, ByVal p_FECHA_VIGENTE As String, ByVal p_VALOR_CAMBIO_COMPRA As String, _
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

    Public Function fActualizarTipoCambio(ByVal p_VALOR_CAMBIO_VENTA As String, ByVal p_VALOR_CAMBIO_COMPRA As String, ByVal p_FECHA_VIGENTE As String, ByVal p_USUA_ID As String, ByVal p_HMS As String, ByVal p_TIPO_CAMBIO As String) As String

        Try
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            Dim msg As String

            cmd = cn.GetNewCommand("PFG_ACTUALIZAR_VALOR_CAMBIO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VIGENTE", p_FECHA_VIGENTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO_COMPRA", p_VALOR_CAMBIO_COMPRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO_VENTA", p_VALOR_CAMBIO_VENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HMS", p_HMS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_CAMBIO", p_TIPO_CAMBIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_RESP", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@P_RESP").Value

            Return msg

        Catch ex As Exception
            Return ex.Message
        End Try
    End Function

    Public Function fActualizarUltimoIndicador(ByVal p_ULTIMO_INDICADOR As String) As String

        Try
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            Dim msg As String

            cmd = cn.GetNewCommand("PFG_ACTUALIZAR_ULTIMO_INDICADOR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ULTIMO_INDICADOR", p_ULTIMO_INDICADOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_RESP", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@P_RESP").Value

            Return msg

        Catch ex As Exception
            Return ex.Message
        End Try
    End Function

    Public Function fValidaTipoCambio() As String
        Dim cmd As IDbCommand
        Dim nRow As DataRow
        Dim msg As String = ""
        Try
            cmd = cn.GetNewCommand("Valida_TipoCambioFecha", CommandType.StoredProcedure)
            dt = cn.Consulta(cmd)


            If Not (dt Is Nothing) Then
                For Each nRow In dt.Rows
                    If nRow("NRO") = "0" Then
                        msg = "No ha ingresado tipos de cambio"
                    Else
                        msg = "OK"
                    End If
                Next
            Else
                msg = ""
            End If

            Return msg

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function fDevuelveTCDia() As DataTable

        Dim cmd As IDbCommand


        Try
            cmd = cn.GetNewCommand("sp_DevuelTCDia", CommandType.StoredProcedure)
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

    Public Function fObtenerDescripcinMonedasTC() As DataTable
        Dim cmd As IDbCommand


        Try
            cmd = cn.GetNewCommand("SP_DESMONTC", CommandType.StoredProcedure)
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


    Public Function fListarTipoCambioAll(ByVal p_DESDE As String, p_HASTA As String) As DataTable
        Dim cmd As IDbCommand


        Try
            cmd = cn.GetNewCommand("SP_LISTATIPOCAMBIOALL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
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

    Public Function fListarTipoCambio_Unico(ByVal p_FECHA As String, p_HORA As String, p_TEMP As String) As DataTable
        Dim cmd As IDbCommand


        Try
            cmd = cn.GetNewCommand("SP_ListarTipoCambio_Unico", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA", p_FECHA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HORA", p_HORA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TEMP", p_TEMP, ParameterDirection.Input, 253))
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
End Class
