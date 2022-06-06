
Public Class NCMotivosBajaDerecho

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function Listar_MotivoBaja(ByVal p_CODE As String, ByVal p_CODE_SUNAT As String, ByVal p_ESTADO_ID As String, Optional p_CODE_VINC_FAM As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_MOTIVO_BAJA_HABIENTE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_SUNAT", p_CODE_SUNAT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_ID", p_ESTADO_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_VINC_FAM", p_CODE_VINC_FAM, ParameterDirection.Input, 253))
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

    Public Function Crear_MotivoBaja(ByVal p_CODE_SUNAT As String, ByVal p_DESC As String, _
    ByVal p_ESTADO_ID As String, ByVal p_USUA_ID As String, p_CODE_VINC_FAM As String) As Array
        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_MOTIVO_BAJA_DERECHO_HABIENTE", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_SUNAT", p_CODE_SUNAT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_ID", p_ESTADO_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_VINC_FAM", p_CODE_VINC_FAM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)

            msg(0) = cmd1.Parameters("@p_CODE_GENERADO").value
            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Actualizar_MotivoBaja(ByVal p_CODE As String, ByVal p_CODE_SUNAT As String, ByVal p_DESC As String, _
    ByVal p_ESTADO_ID As String, ByVal p_USUA_ID As String, p_CODE_VINC_FAM As String) As Array
        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_MOTIVO_BAJA_DERECHO_AMBIENTE", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_SUNAT", p_CODE_SUNAT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_ID", p_ESTADO_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_VINC_FAM", p_CODE_VINC_FAM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)

            msg(0) = cmd1.Parameters("@p_SALIDA").value
            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CambiarEstado_MotivoBaja(ByVal p_CODE As String) As Array
        Try

            Dim msg(1) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CAMBIAR_ESTADO_MOT_BAJA_DERECHO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_ESTADO").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function



End Class
