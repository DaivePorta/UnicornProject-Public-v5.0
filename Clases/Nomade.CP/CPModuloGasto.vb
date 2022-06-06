Public Class CPModuloGasto
    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function CrearModuloGasto(ByVal p_FACMDLG_DESC As String, ByVal p_FACMDLG_DESC_CORTA As String, _
      ByVal p_FACMDLG_ESTADO_IND As String, ByVal p_FACMDLG_USUA_ID As String) As Array
        Dim msg(2) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFB_CREAR_MODULO_GASTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACMDLG_DESC", p_FACMDLG_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACMDLG_DESC_CORTA", p_FACMDLG_DESC_CORTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACMDLG_ESTADO_IND", p_FACMDLG_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACMDLG_USUA_ID", p_FACMDLG_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESPUESTA", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cn.Ejecuta_parms(cmd)

            msg(0) = cmd.Parameters("@p_RESPUESTA").Value
            msg(1) = cmd.Parameters("@p_CODE").Value

            Return msg
        Catch ex As Exception
            msg(0) = ex.Message
            msg(1) = ""
            Return msg
        End Try
    End Function

    Public Function ActualizarModuloGasto(ByVal p_FACMDLG_CODE As String, ByVal p_FACMDLG_DESC As String, ByVal p_FACMDLG_DESC_CORTA As String,
                                ByVal p_FACMDLG_ESTADO_IND As String, ByVal p_FACMDLG_USUA_ID As String) As Array
        Dim msg(2) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFB_ACTUALIZAR_MODULO_GASTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACMDLG_CODE", p_FACMDLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACMDLG_DESC", p_FACMDLG_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACMDLG_DESC_CORTA", p_FACMDLG_DESC_CORTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACMDLG_ESTADO_IND", p_FACMDLG_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACMDLG_USUA_ID", p_FACMDLG_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESPUESTA", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cn.Ejecuta_parms(cmd)

            msg(0) = cmd.Parameters("@p_RESPUESTA").Value
            msg(1) = cmd.Parameters("@p_CODE").Value

            Return msg
        Catch ex As Exception
            msg(0) = ex.Message
            msg(1) = ""
            Return msg
        End Try
    End Function

    Public Function ListarModuloGasto(ByVal p_FACMDLG_CODE As String, ByVal p_FACMDLG_DESC As String, ByVal p_FACMDLG_DESC_CORTA As String, _
          ByVal p_FACMDLG_ESTADO_IND As String, ByVal p_FACMDLG_USUA_ID As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFB_LISTAR_MODULO_GASTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACMDLG_CODE", p_FACMDLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACMDLG_DESC", p_FACMDLG_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACMDLG_DESC_CORTA", p_FACMDLG_DESC_CORTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACMDLG_ESTADO_IND", p_FACMDLG_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACMDLG_USUA_ID", p_FACMDLG_USUA_ID, ParameterDirection.Input, 253))

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


    Public Function ListarUsuariosPorGatos(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_FECHA_DEL As String, _
          ByVal p_FECHA_AL As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFB_LISTAR_USUARIOS_X_GASTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_DEL", p_FECHA_DEL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_AL", p_FECHA_AL, ParameterDirection.Input, 253))
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
