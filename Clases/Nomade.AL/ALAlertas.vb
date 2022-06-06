Public Class ALAlertas
    Private cn As Nomade.Connection
    Dim oDT As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Sub AgregarUsuario(codEmpresa As String, idAlerta As Integer, usuario As String)
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpAlertas_AgregarUsuario", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", codEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IdAlerta", idAlerta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Usuario", usuario, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)
        Catch ex As Exception
            Throw (ex)
        End Try
    End Sub

    Public Function ListarUsuarios(ByVal codEmpresa As String, ByVal idAlerta As Integer) As DataTable
        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable

            cmd = cn.GetNewCommand("SpAlertas_ListarUsuarios", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", codEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IdAlerta", idAlerta, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Sub EliminarUsuario(codEmpresa As String, idAlerta As Integer, usuario As String)
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpAlertas_EliminarUsuario", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", codEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IdAlerta", idAlerta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Usuario", usuario, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)
        Catch ex As Exception
            Throw (ex)
        End Try
    End Sub

    Public Sub AgregarValorParametro(codEmpresa As String, idAlerta As Integer, idParametro As Integer, valor As String)
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpAlertas_AgregarValorParametro", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", codEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IdAlerta", idAlerta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IdParametro", idParametro, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Valor", valor, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)
        Catch ex As Exception
            Throw (ex)
        End Try
    End Sub

    Public Function ListarValorParametro(ByVal codEmpresa As String, ByVal idAlerta As Integer) As DataTable
        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable

            cmd = cn.GetNewCommand("SpAlertas_ListarValorParametro", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", codEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IdAlerta", idAlerta, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarAlertas(ByVal p_ctlg_code As String, ByVal p_usuario As String) As DataTable
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SpAlertas_ListarAlertas", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUARIO", p_usuario, ParameterDirection.Input, 253))

            Return cn.Consulta(cmd)

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
End Class
