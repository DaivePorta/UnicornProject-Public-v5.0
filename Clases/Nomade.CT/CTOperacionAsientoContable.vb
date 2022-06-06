Public Class CTOperacionAsientoContable

    Private cn As Nomade.Connection
    Dim oDT As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function AgregarAsientoContableOperacion(ByVal cod_empresa As String, ByVal cod_oper As String, ByVal cod_dinm_cut As String, ByVal sCodUsuario As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_CrearAsientoContableOperacion", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodOP", cod_oper, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", cod_empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodDinamicaCuenta", cod_dinm_cut, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuarioCrea", sCodUsuario, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)

            msg = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarAsientoContableOperacion(ByVal cod_empresa As String, ByVal cod_oper As String, ByVal cod_dinm_cut As String, ByVal sCodUsuario As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ActualizarAsientoContableOperacion", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodOP", cod_oper, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", cod_empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodDinamicaCuenta", cod_dinm_cut, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuarioCrea", sCodUsuario, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)

            msg = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function CambiarEstadoAsientoContableOperacion(ByVal cod_empresa As String, ByVal cod_oper_asncont As String, ByVal cod_oper As String, ByVal cod_dinm_cut As String, ByVal estado As String, ByVal sCodUsuario As String) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_CambiarEstadoAsientoContableOperacion", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodOprAsnCont", cod_oper_asncont, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodOP", cod_oper, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", cod_empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodDinamicaCuenta", cod_dinm_cut, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(estado.Equals(""), Nothing, estado), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuarioModif", sCodUsuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Respuesta", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)

            Dim msg As String = cmd.Parameters("@p_Respuesta").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function ListarAsientoContableOperacion(ByVal cod_empresa As String, ByVal cod_oper As String, ByVal cod_dinm_cuent As String, ByVal estado As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ListarAsientoContableOperacion", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CodOP", IIf(cod_oper.Equals(""), DBNull.Value, cod_oper), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", cod_empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodDinamicaCuenta", IIf(cod_dinm_cuent.Equals(""), Nothing, cod_dinm_cuent), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_bEstado", IIf(estado.Equals(""), Nothing, estado), ParameterDirection.Input, 253))

            Dim oDT As DataTable
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function




    Public Function ListarOperacionAsientosContables(ByVal cod_empresa As String, ByVal cod_oper As String, ByVal filtro As String, ByVal estado As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ListarAsientosContablesXOperacion", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", cod_empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodOper", IIf(cod_oper.Equals(""), Nothing, cod_oper), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TipoFiltro", filtro, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(estado.Equals(""), Nothing, estado), ParameterDirection.Input, 253))

            Dim oDT As DataTable
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


End Class
