Public Class NCRegimenLaboral

    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function ListarRegimenLaboral(ByVal P_CODE As String, ByVal P_ESTADO_IND As String) As DataTable
        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_REGIMEN_LABORAL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", P_ESTADO_IND, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarBeneficiosRegimenLaboral(ByVal P_REGLA_CODE As String) As DataTable
        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_BENEFICIOS_REGLA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_REGLA_CODE", P_REGLA_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearRegimenLaboral(ByVal P_DENOMINACION As String, ByVal P_ACRONIMO As String, ByVal P_INDE_TIEMPO_SERV As String, ByVal P_INDE_ANIO_SERV As String,
                                        ByVal P_JORNADA_SEMANAL As String, ByVal P_PERIODO_SIN_DESPIDO As String, ByVal P_VACACIONES As String, ByVal P_BENEFICIOS As String, ByVal P_USUA_ID As String, p_PORC_CTS As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_CREAR_REGIMEN_LABORAL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_DENOMINACION", P_DENOMINACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ACRONIMO", P_ACRONIMO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_INDE_TIEMPO_SERV", P_INDE_TIEMPO_SERV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_INDE_ANIO_SERV", P_INDE_ANIO_SERV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_JORNADA_SEMANAL", P_JORNADA_SEMANAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PERIODO_SIN_DESPIDO", P_PERIODO_SIN_DESPIDO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_VACACIONES", P_VACACIONES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_BENEFICIOS", P_BENEFICIOS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PORC_CTS", p_PORC_CTS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = cmd.Parameters("@P_CODE").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarRegimenLaboral(ByVal P_CODE As String, ByVal P_DENOMINACION As String, ByVal P_ACRONIMO As String, ByVal P_INDE_TIEMPO_SERV As String,
                                         ByVal P_INDE_ANIO_SERV As String, ByVal P_JORNADA_SEMANAL As String, ByVal P_PERIODO_SIN_DESPIDO As String, ByVal P_VACACIONES As String,
                                         ByVal P_ESTADO_IND As String, ByVal P_USUA_ID As String, p_PORC_CTS As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_REGIMEN_LABORAL", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DENOMINACION", P_DENOMINACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ACRONIMO", P_ACRONIMO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_INDE_TIEMPO_SERV", P_INDE_TIEMPO_SERV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_INDE_ANIO_SERV", P_INDE_ANIO_SERV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_JORNADA_SEMANAL", P_JORNADA_SEMANAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PERIODO_SIN_DESPIDO", P_PERIODO_SIN_DESPIDO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_VACACIONES", P_VACACIONES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", P_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PORC_CTS", p_PORC_CTS, ParameterDirection.Input, 253))

            cn.Ejecuta_parms(cmd)

            msg = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function AgregarBeneficio(ByVal P_CODE As String, ByVal P_BENSO_CODE As String, ByVal P_USUA_ID As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_AGREGAR_BENEFICIO_REGLA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_REGLA_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_BENSO_CODE", P_BENSO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function EliminarBeneficio(ByVal P_CODE As String, ByVal P_BENSO_CODE As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_ELIMINAR_BENEFICIO_REGLA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_BENSO_CODE", P_BENSO_CODE, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CambiarEstadoRegimenLaboral(ByVal P_CODE As String, ByVal P_USUA_ID As String) As String
        Try
            Dim estado As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CAMBIAR_ESTADO_REGIMEN_LABORAL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            estado = cmd1.Parameters("@P_ESTADO").Value

            Return estado

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

End Class
