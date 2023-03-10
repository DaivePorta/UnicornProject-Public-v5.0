Public Class NSAsistencia
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
#Region "Configuracion"
    Public Function Crear_Configuracion(ByVal p_RHCONAS_CODE As String, ByVal p_RHCONAS_COD_BIO As String,
                                       ByVal p_RHCONAS_FECHA As String, ByVal p_RHCONAS_HOR_ENT As String,
                                       ByVal p_RHCONAS_HOR_SAL As String, ByVal p_RHCONAS_HOR_ENT_TRAB As String,
                                       ByVal p_RHCONAS_HOR_SAL_TRAB As String, ByVal p_RHCONAS_CTLG_CODE As String,
                                       ByVal p_RHCONAS_FTVSCSL_CODE As String, ByVal p_RHCONAS_USUA_ID As String,
                                       ByVal p_SALIDA As String) As String

        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PRH_CREAR_CONF_ASIS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_RHCONAS_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHCONAS_COD_BIO", p_RHCONAS_COD_BIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHCONAS_FECHA", p_RHCONAS_FECHA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHCONAS_HOR_ENT", p_RHCONAS_HOR_ENT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHCONAS_HOR_SAL", p_RHCONAS_HOR_SAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHCONAS_HOR_ENT_TRAB", p_RHCONAS_HOR_ENT_TRAB, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHCONAS_HOR_SAL_TRAB", p_RHCONAS_HOR_SAL_TRAB, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHCONAS_CTLG_CODE", p_RHCONAS_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHCONAS_FTVSCSL_CODE", p_RHCONAS_FTVSCSL_CODE, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_RHCONAS_USUA_ID", p_RHCONAS_USUA_ID, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_RHCONAS_CODE").Value
            'msg = "OK"
            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function Actualizar_Configuracion(ByVal p_RHCONAS_CODE As String, ByVal p_RHCONAS_COD_BIO As String,
                                       ByVal p_RHCONAS_FECHA As String, ByVal p_RHCONAS_HOR_ENT As String,
                                       ByVal p_RHCONAS_HOR_SAL As String, ByVal p_RHCONAS_HOR_ENT_TRAB As String,
                                       ByVal p_RHCONAS_HOR_SAL_TRAB As String, ByVal p_RHCONAS_USUA_ID As String,
                                       ByVal p_SALIDA As String) As String

        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PRH_ACTUALIZAR_CONF_ASIS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_RHCONAS_CODE", p_RHCONAS_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHCONAS_COD_BIO", p_RHCONAS_COD_BIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHCONAS_FECHA", p_RHCONAS_FECHA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHCONAS_HOR_ENT", p_RHCONAS_HOR_ENT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHCONAS_HOR_SAL", p_RHCONAS_HOR_SAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHCONAS_HOR_ENT_TRAB", p_RHCONAS_HOR_ENT_TRAB, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHCONAS_HOR_SAL_TRAB", p_RHCONAS_HOR_SAL_TRAB, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_RHCONAS_USUA_ID", p_RHCONAS_USUA_ID, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_SALIDA").Value
            'msg = "OK"
            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function Listar_Configuracion(ByVal p_RHCONAS_CTLG_CODE As String, ByVal p_RHCONAS_FTVSCSL_CODE As String) As DataTable
        Try


            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PRH_LISTAR_CONF_ASIS", CommandType.StoredProcedure)


            cmd.Parameters.Add(cn.GetNewParameter("@p_RHCONAS_CTLG_CODE", p_RHCONAS_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHCONAS_FTVSCSL_CODE", p_RHCONAS_FTVSCSL_CODE, ParameterDirection.Input, 253))
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
#End Region

#Region "Asistencia"
    Public Function Crear_Asistencia(ByVal p_RHMANAS_CODE As String, ByVal p_RHMANAS_CTLG_CODE As String,
                                       ByVal p_RHMANAS_FTVSCSL_CODE As String, ByVal p_RHMANAS_FCOPERI_CODE As String,
                                       ByVal p_RHMANAS_CODE_BIO As String, ByVal p_RHMANAS_NOMBRE As String,
                                       ByVal p_RHMANAS_FECHA As String, ByVal p_RHMANAS_HORA_ENTRADA As String,
                                       ByVal p_RHMANAS_HORA_SALIDA As String, ByVal p_RHMANAS_HORA_ENTRADA_TRABAJADOR As String,
                                       ByVal p_RHMANAS_HORA_SALIDA_TRABAJADOR As String, ByVal p_RHMANAS_USUA_ID As String,
                                       ByVal p_SALIDA As String, ByVal p_TIPO As String, ByVal p_RHMANAS_FALTA_TRABAJADOR As String, ByVal p_RHMANAS_HORA_EXTRA_TRABAJADOR As String) As String

        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PRH_CREAR_ASISTENCIA", CommandType.StoredProcedure)

            'cmd.Parameters.Add(cn.GetNewParameter("@p_RHCONAS_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHMANAS_CODE", p_RHMANAS_CODE, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHMANAS_CTLG_CODE", p_RHMANAS_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHMANAS_FTVSCSL_CODE", p_RHMANAS_FTVSCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHMANAS_FCOPERI_CODE", p_RHMANAS_FCOPERI_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHMANAS_CODE_BIO", p_RHMANAS_CODE_BIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHMANAS_NOMBRE", p_RHMANAS_NOMBRE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHMANAS_FECHA", Convert.ToDateTime(p_RHMANAS_FECHA).ToString("yyyy-MM-dd"), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHMANAS_HORA_ENTRADA", p_RHMANAS_HORA_ENTRADA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHMANAS_HORA_SALIDA", p_RHMANAS_HORA_SALIDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHMANAS_HORA_ENTRADA_TRABAJADOR", p_RHMANAS_HORA_ENTRADA_TRABAJADOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHMANAS_HORA_SALIDA_TRABAJADOR", p_RHMANAS_HORA_SALIDA_TRABAJADOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHMANAS_USUA_ID", p_RHMANAS_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_RHMANAS_FALTA_TRABAJADOR", p_RHMANAS_FALTA_TRABAJADOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHMANAS_HORA_EXTRA_TRABAJADOR", p_RHMANAS_HORA_EXTRA_TRABAJADOR, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_SALIDA").Value
            'msg = "OK"
            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function Listar_Asistencia(ByVal p_RHMANAS_CTLG_CODE As String, ByVal p_RHMANAS_FTVSCSL_CODE As String,
                                      ByVal p_RHMANAS_FCOPERI_CODE As String) As DataTable
        Try


            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PRH_LISTAR_ASISTENCIA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_RHMANAS_CTLG_CODE", p_RHMANAS_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHMANAS_FTVSCSL_CODE", p_RHMANAS_FTVSCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHMANAS_FCOPERI_CODE", p_RHMANAS_FCOPERI_CODE, ParameterDirection.Input, 253))
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
#End Region
    'Public Function ListarSucursal(ByVal p_CTLG_CODE As String, ByVal p_MUESTRA As String) As String
    '    Try
    '        Dim msg As String

    '        Dim cmd As IDbCommand
    '        Dim cmd1 As IDbCommand

    '        cmd = cn.GetNewCommand("FFC_DEVUELVE_LISTA_SUCURSAL", CommandType.StoredProcedure)

    '        cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_MUESTRA", p_MUESTRA, ParameterDirection.Output, 253))
    '        cmd1 = cn.Ejecuta_parms(cmd)

    '        msg = cmd1.ToString


    '        Return msg

    '    Catch ex As Exception
    '        Throw (ex)
    '    End Try
    'End Function

End Class
