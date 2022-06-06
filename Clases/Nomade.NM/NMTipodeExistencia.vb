Public Class NMTipodeExistencia

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function Listar_Existencias(ByVal p_CODE As String, ByVal p_CODE_SUNAT As String, ByVal p_ESTADO As String, ByVal p_ALMACENABLE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFM_LISTAR_EXISTENCIAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_SUNAT", p_CODE_SUNAT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMACENABLE", p_ALMACENABLE, ParameterDirection.Input, 253))
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

    Public Function Crear_Existencias(ByVal p_CODE_SUNAT As String, ByVal p_DESC As String, ByVal p_ESTADO_IND As String, p_USUA_ID As String, ByVal p_ALMACENABLE As String) As Array

        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand



            cmd = cn.GetNewCommand("PFM_CREAR_EXISTENCIAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_SUNAT", p_CODE_SUNAT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMACENABLE", p_ALMACENABLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_GENERADO").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Actualizar_Existencias(ByVal p_CODE As String, ByVal p_CODE_SUNAT As String, ByVal p_DESC As String, ByVal p_ESTADO_IND As String, p_USUA_ID As String, ByVal p_ALMACENABLE As String) As Array

        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand



            cmd = cn.GetNewCommand("PFM_ACTUALIZAR_EXISTENCIAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_SUNAT", p_CODE_SUNAT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMACENABLE", p_ALMACENABLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)

            msg(0) = cmd1.Parameters("@p_GENERADO").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CambiarEstadoExistencias(ByVal p_CODE As String) As Array
        Try

            Dim msg(1) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFM_CAMBIAR_ESTADO_EXISTENCIAS", CommandType.StoredProcedure)
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
