Public Class NCEChofer

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function ListarChofer(ByVal p_pidm As String, ByVal p_empresa As String, ByVal p_estado As String, Optional ByVal p_TIPO As String = "N") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_CHOFER", CommandType.StoredProcedure)


            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))
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

    Public Function CrearChofer(ByVal p_empresa As String, ByVal p_pidm As String, ByVal p_nro_licencia As String,
                                       ByVal p_fecha_expedicion As String, ByVal p_fecha_renovacion As String,
                                        ByVal p_fecha_inicio As String, ByVal p_fecha_fin As String, ByVal p_ruta_anverso As String,
                                        ByVal p_ruta_reverso As String, ByVal p_activo As String, ByVal p_user As String) As Array
        Try
            Dim msg(3) As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_CHOFER", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_LICENCIA", p_nro_licencia, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EXPEDICION", p_fecha_expedicion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_RENOVACION", p_fecha_renovacion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INICIO", p_fecha_inicio, ParameterDirection.Input, 253))
            If p_fecha_fin = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN", p_fecha_fin, ParameterDirection.Input, 253))
            End If

            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_activo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RUTA_ANVERSO", p_ruta_anverso, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RUTA_REVERSO", p_ruta_reverso, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODANVERSO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODREVERSO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg(0) = "OK"
            msg(1) = cmd1.Parameters("@p_CODANVERSO").Value
            msg(2) = cmd1.Parameters("@p_CODREVERSO").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarChofer(ByVal p_empresa As String, ByVal p_pidm As String, ByVal p_nro_licencia As String,
                                       ByVal p_fecha_expedicion As String, ByVal p_fecha_renovacion As String,
                                        ByVal p_fecha_inicio As String, ByVal p_fecha_fin As String,
                                        ByVal p_ruta_anverso As String, ByVal p_ruta_reverso As String,
                                        ByVal p_codeimag_anverso As String, ByVal p_codeimag_reverso As String,
                                        ByVal p_activo As String, ByVal p_user As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_CHOFER", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_LICENCIA", p_nro_licencia, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EXPEDICION", p_fecha_expedicion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_RENOVACION", p_fecha_renovacion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INICIO", p_fecha_inicio, ParameterDirection.Input, 253))
            If p_fecha_fin = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN", p_fecha_fin, ParameterDirection.Input, 253))
            End If
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_activo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODEIMAG_ANVERSO", p_codeimag_anverso, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RUTA_ANVERSO", p_ruta_anverso, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODEIMAG_REVERSO", p_codeimag_reverso, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RUTA_REVERSO", p_ruta_reverso, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function







End Class
