Public Class NSGestion_de_feriado
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function ListarFeriados(ByVal p_PEVFERC_CODE As String, ByVal p_PEVFERC_ESTADO_IND As String, ByVal p_PEVFERC_DESC As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_FERIADOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEVFERC_CODE", p_PEVFERC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEVFERC_ESTADO_IND", p_PEVFERC_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEVFERC_DESC", p_PEVFERC_DESC, ParameterDirection.Input, 253))


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
    Public Function CambiarEstadoFeriados(ByVal p_codigo As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_CAMBIAR_ESTADO_FERIADOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd1.Parameters("@p_ESTADO").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function CrearFeriados(ByVal p_DESC As String, ByVal p_FECHA As String,
                                  ByVal p_REPETIR_IND As String, ByVal p_TIEMPO_IND As String, ByVal p_HORA_INICIO As String, ByVal p_HORA_FIN As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_CREAR_FERIADOS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA", p_FECHA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REPETIR_IND", p_REPETIR_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIEMPO_IND", p_TIEMPO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HORA_INICIO", p_HORA_INICIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HORA_FIN", p_HORA_FIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CODE").Value




            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function ActualizarFeriados(ByVal p_CODE As String, ByVal p_DESC As String, ByVal p_FECHA As String,
                                  ByVal p_REPETIR_IND As String, ByVal p_TIEMPO_IND As String, ByVal p_HORA_INICIO As String, ByVal p_HORA_FIN As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_ACTUALIZAR_FERIADOS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA", p_FECHA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REPETIR_IND", p_REPETIR_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIEMPO_IND", p_TIEMPO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HORA_INICIO", p_HORA_INICIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HORA_FIN", p_HORA_FIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"




            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function EditarDetalleFeriados(ByVal p_code As String, ByVal p_scsl As String, ByVal p_estado_ind As String, ByVal p_usua_id As String, ByVal p_empresa As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_CREAR_FERIADOS_DETALLE", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_FERC_CODE", p_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_scsl, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EMPRESA", p_empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_RESP").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarFeriadosDetalle(ByVal p_ferc_code As String, ByVal p_estado_ind As String, ByVal p_scsl_code As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_FERIADOS_DETALLE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FERC_CODE", p_ferc_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_scsl_code, ParameterDirection.Input, 253))


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
