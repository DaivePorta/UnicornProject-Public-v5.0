Public Class NFModalidadPago
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function dame_modalidad_pago(ByVal p_MOPA_CODE As String, ByVal p_MOSTRAR_CAJA_IND As String, _
                                   ByVal p_ESTADO_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_MODALIDAD_PAGO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOPA_CODE", p_MOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOSTRAR_CAJA_IND", p_MOSTRAR_CAJA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))

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
