Public Class NFUnidadVehiculo



    Private cn As Nomade.Connection
    Dim dt As DataTable



    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub



    Public Function ListarUnidad(ByVal p_codigo As String, ByVal p_empresa As String, ByVal p_estado As String, ByVal p_propietario As String, ByVal p_usuario As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFF_LISTAR_UNIDAD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROP_PIDM", p_propietario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USER", p_usuario, ParameterDirection.Input, 253))

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

    Public Function ActualizarUnidad(ByVal p_codigo As String,
        ByVal p_fecha_ini As String,
        ByVal p_fecha_ter As String,
        ByVal p_mtc As String,
        ByVal p_nro_tarjeta As String,
        ByVal p_placa As String,
        ByVal p_anio_fab As String,
        ByVal p_marca As String,
        ByVal p_modelo As String,
        ByVal p_color As String,
        ByVal p_nro_motor As String,
        ByVal p_nro_serie As String,
        ByVal p_nro_chasis As String,
        ByVal p_gps As String,
        ByVal p_fecha_gps As String,
        ByVal p_propietario As String,
        ByVal p_compa_soat As String,
        ByVal p_poliza_soat As String,
        ByVal p_fecha_soat As String,
        ByVal p_activo As String,
        ByVal p_user As String,
        ByVal p_plataforma As String,
        ByVal p_fila As String,
        ByVal p_tipo_unidad As String,
        ByVal p_empresa As String,
        ByVal p_CARGA_MAXIMA As String, ByVal p_NRO_CONSTANCIA As String, ByVal p_FECHA_REV_TEC As String, ByVal p_NRO_REV_TEC As String,
        ByVal p_COMBUSTIBLE As String
) As Array

        Dim msg(2) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFF_ACTUALIZAR_UNIDAD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INI", p_fecha_ini, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TER", If(p_fecha_ter = String.Empty, DBNull.Value, p_fecha_ter), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MTC", p_mtc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_TARJETA", p_nro_tarjeta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PLACA", p_placa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO_FAB", p_anio_fab, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARC_CODE", p_marca, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MODE_CODE", p_modelo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COLOR", p_color, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_MOTOR", p_nro_motor, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_SERIE", p_nro_serie, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CHASIS", p_nro_chasis, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GPS", p_gps, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_GPS", If(p_fecha_gps = String.Empty, DBNull.Value, p_fecha_gps), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROP_PIDM", p_propietario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPA_SOAT", p_compa_soat, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_POLIZA_SOAT", p_poliza_soat, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_SOAT", p_fecha_soat, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_activo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PLATAFORMA", p_plataforma, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FILA", If(p_fila = String.Empty, DBNull.Value, p_fila), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_UNIDAD", p_tipo_unidad, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_empresa, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_CARGA_MAXIMA", p_CARGA_MAXIMA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CONSTANCIA", p_NRO_CONSTANCIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_REV_TEC", If(p_FECHA_REV_TEC = String.Empty, DBNull.Value, p_FECHA_REV_TEC), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_REV_TEC", p_NRO_REV_TEC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMBUSTIBLE", p_COMBUSTIBLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESPUESTA", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = p_codigo
            msg(1) = cmd.Parameters("@p_RESPUESTA").Value

        Catch ex As Exception
            msg(0) = ex.Message
            msg(1) = "ERROR"
        End Try
        Return msg

    End Function

    Public Function CrearUnidad(ByVal p_fecha_ini As String,
        ByVal p_fecha_ter As String,
        ByVal p_mtc As String,
        ByVal p_nro_tarjeta As String,
        ByVal p_placa As String,
        ByVal p_anio_fab As String,
        ByVal p_marca As String,
        ByVal p_modelo As String,
        ByVal p_color As String,
        ByVal p_nro_motor As String,
        ByVal p_nro_serie As String,
        ByVal p_nro_chasis As String,
        ByVal p_gps As String,
        ByVal p_fecha_gps As String,
        ByVal p_propietario As String,
        ByVal p_compa_soat As String,
        ByVal p_poliza_soat As String,
        ByVal p_fecha_soat As String,
        ByVal p_activo As String,
        ByVal p_user As String,
        ByVal p_plataforma As String,
        ByVal p_fila As String,
        ByVal p_tipo_unidad As String,
        ByVal p_empresa As String,
        ByVal p_CARGA_MAXIMA As String, ByVal p_NRO_CONSTANCIA As String, ByVal p_FECHA_REV_TEC As String, ByVal p_NRO_REV_TEC As String,
        ByVal p_COMBUSTIBLE As String
        ) As Array

        Dim msg(2) As String
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFF_CREAR_UNIDAD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INI", p_fecha_ini, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TER", If(p_fecha_ter = String.Empty, DBNull.Value, p_fecha_ter), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MTC", p_mtc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_TARJETA", p_nro_tarjeta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PLACA", p_placa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO_FAB", p_anio_fab, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARC_CODE", p_marca, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MODE_CODE", p_modelo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COLOR", p_color, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_MOTOR", p_nro_motor, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_SERIE", p_nro_serie, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CHASIS", p_nro_chasis, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GPS", p_gps, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_GPS", If(p_fecha_gps = String.Empty, DBNull.Value, p_fecha_gps), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROP_PIDM", p_propietario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPA_SOAT", p_compa_soat, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_POLIZA_SOAT", p_poliza_soat, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_SOAT", p_fecha_soat, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_activo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PLATAFORMA", p_plataforma, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FILA", If(p_fila = String.Empty, DBNull.Value, p_fila), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_UNIDAD", p_tipo_unidad, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_empresa, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_CARGA_MAXIMA", p_CARGA_MAXIMA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CONSTANCIA", p_NRO_CONSTANCIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_REV_TEC", If(p_FECHA_REV_TEC = String.Empty, DBNull.Value, p_FECHA_REV_TEC), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_REV_TEC", p_NRO_REV_TEC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMBUSTIBLE", p_COMBUSTIBLE, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESPUESTA", String.Empty, ParameterDirection.Output, 253))


            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_CODE").Value
            msg(1) = cmd.Parameters("@p_RESPUESTA").Value

        Catch ex As Exception
            msg(0) = ex.Message
            msg(1) = "ERROR"
        End Try
        Return msg


    End Function


    Public Function CrearChoferUnidad(ByVal p_chofer As String, ByVal p_unidad As String, ByVal p_fecha As String, ByVal p_turno As String, ByVal p_estado As String, ByVal p_user As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFF_CREAR_CHOFER_UNIDAD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_CHOFER", p_chofer, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_UNID_CODE", p_unidad, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INICIO", p_fecha, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TURNO", p_turno, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd1.Parameters("@p_CODE").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarChoferUnidad(ByVal p_code As String, ByVal p_fecha As String, ByVal p_turno As String, ByVal p_estado As String, ByVal p_user As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFF_ACTUALIZAR_CHOFER_UNIDAD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INICIO", p_fecha, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TURNO", p_turno, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "ok"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarChoferUnidad(ByVal p_code As String, ByVal p_chofer As String, ByVal p_unidad As String, ByVal p_estado As String) As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFF_LISTAR_CHOFER_UNIDAD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_CHOFER", p_chofer, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_UNID_CODE", p_unidad, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado, ParameterDirection.Input, 253))

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




    Public Function CambiarEstadoUnidad(ByVal p_codigo As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFF_CAMBIAR_ESTADO_UNIDAD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd1.Parameters("@p_ESTADO").Value



            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function



    Public Function ListarPropietario(ByVal p_estado As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_PROPIETARIOD", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado, ParameterDirection.Input, 253))


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

End Class
