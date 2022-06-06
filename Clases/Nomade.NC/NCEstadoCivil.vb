Public Class NCEstadoCivil
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function listar_EstadoCivil(ByVal p_PTVESCI_CODE As String, ByVal p_PTVESCI_ESTADO_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_ESTADO_CIVIL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVESCI_CODE", p_PTVESCI_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVESCI_ESTADO_IND", p_PTVESCI_ESTADO_IND, ParameterDirection.Input, 253))
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
