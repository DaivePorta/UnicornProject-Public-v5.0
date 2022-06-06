Public Class NCCompra

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function lista_dcto_compra(ByVal p_COMC_CODE As String, ByVal p_RAZON_SOCIAL As String, _
                               ByVal p_REQC_CODE As String, ByVal p_ANIO As String, ByVal p_MES As String, Optional ByVal p_PIDM As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFP_LISTAR_DCTO_COMPRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMC_CODE", p_COMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_SOCIAL", p_RAZON_SOCIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REQC_CODE", p_REQC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
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

    Public Function lista_detalle_dcto_compra(ByVal p_FACC_CODE As String, ByVal p_FACC_NUM_SEQ_DOC As String, _
                                   ByVal p_ITEM As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFP_LISTAR_DETALLE_DCTO_COMPRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMC_CODE", p_FACC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMC_NUM_SEQ_DOC", p_FACC_NUM_SEQ_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", p_ITEM, ParameterDirection.Input, 253))


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
