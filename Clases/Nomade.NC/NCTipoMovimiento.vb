Public Class NCTipoMovimiento
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function dame_tipo_movimiento(ByVal p_TMOV_CODE As String, ByVal p_TIPO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_TIPO_MOVIMIENTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_TMOV_CODE", p_TMOV_CODE, ParameterDirection.Input, 253))
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
End Class
