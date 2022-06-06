Public Class CAOETipoCambio

    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function ListarOETipoCambio(ByVal p_CODE As String, ByVal p_ESTADO As String, Optional ByVal p_CTLG_CODE As String = "") As DataTable

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_LISTAR_OETIPOCAMBIO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

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

    Public Function CrearOETipoCambio(ByVal p_CAJA_CODE As String, ByVal p_CASA_CAMBIO_PIDM As String, ByVal p_MODO As String,
                                     ByVal p_ASIG_PIDM As String, ByVal p_MONE_BASE_CODE As String, ByVal p_MONE_BASE_MONTO As String,
                                     ByVal p_TIPO_CAMBIO As String, ByVal p_MONE_CAMBIO_CODE As String, ByVal p_MONE_CAMBIO_MONTO As String,
                                     ByVal p_USUA_ID As String, ByVal p_FECHA_OPE As String, ByVal p_HORA_OPE As String) As String
        Try
            Dim codigo As String = "0000"
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_OETIPOCAMBIO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CASA_CAMBIO_PIDM", p_CASA_CAMBIO_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MODO", p_MODO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ASIG_PIDM", p_ASIG_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_BASE_CODE", p_MONE_BASE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_BASE_MONTO", p_MONE_BASE_MONTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_CAMBIO", p_TIPO_CAMBIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CAMBIO_CODE", p_MONE_CAMBIO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CAMBIO_MONTO", p_MONE_CAMBIO_MONTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_OPE", p_FECHA_OPE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HORA_OPE", p_HORA_OPE, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            codigo = cmd1.Parameters("@p_CODE").Value

            Return codigo

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarOETipoCambio(ByVal p_CODE As String, ByVal p_CAJA_CODE As String, ByVal p_CASA_CAMBIO_PIDM As String,
                                      ByVal p_MODO As String, ByVal p_ASIG_PIDM As String, ByVal p_MONE_BASE_CODE As String,
                                      ByVal p_MONE_BASE_MONTO As String, ByVal p_TIPO_CAMBIO As String, ByVal p_MONE_CAMBIO_CODE As String,
                                      ByVal p_MONE_CAMBIO_MONTO As String, ByVal p_USUA_ID As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_ACTUALIZAR_OETIPOCAMBIO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CASA_CAMBIO_PIDM", p_CASA_CAMBIO_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MODO", p_MODO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ASIG_PIDM", p_ASIG_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_BASE_CODE", p_MONE_BASE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_BASE_MONTO", p_MONE_BASE_MONTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_CAMBIO", p_TIPO_CAMBIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CAMBIO_CODE", p_MONE_CAMBIO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CAMBIO_MONTO", p_MONE_CAMBIO_MONTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
End Class
