Public Class NCTipoUbicacion
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function listar_TipoUbicacion(ByVal p_PTVTIDT_CODE As String, ByVal p_PTVTIDT_DESC As String, ByVal P_PTVTIDT_TIPO_IND As String, ByVal p_PTVTIDT_ESTADO_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_TIPO_UBICACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVTIDT_CODE", p_PTVTIDT_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVTIDT_DESC", p_PTVTIDT_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PTVTIDT_TIPO_IND", P_PTVTIDT_TIPO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVTIDT_ESTADO_IND", p_PTVTIDT_ESTADO_IND, ParameterDirection.Input, 253))
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
