Public Class NScusuario

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function valida_usuario(ByVal p_id As String, ByVal p_pass As String, ByVal p_stbl As String, p_ctlg As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("g_get_usuario_v", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_id", p_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_clave", p_pass, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_stbl", p_stbl, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ctlg", p_ctlg, ParameterDirection.Input, 253))

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

    Public Function RegistrarAccesoUsuario(ByVal p_usua_id As String, ByVal ctlg_code As String, ByVal scsl_code As String, ByVal ip As String, ByVal navegador As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_CREAR_AUDITORIA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", scsl_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IP", ip, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NAVEGADOR", navegador, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarAccesoUsuario(ByVal p_usua_id As String, ByVal p_fecha1 As String, ByVal p_fecha2 As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PCS_LISTAR_AUDITORIA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHA1", p_fecha1, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHA2", p_fecha2, ParameterDirection.Input, 253))

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
