Public Class NSClases
    Private cn As Nomade.Connection

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function Listar_Clases(ByVal p_GTVCLAS_CODE As String, ByVal p_GTVCLAS_ESTADO_IND As String, ByVal p_GTVCLAS_SIST_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PCS_LISTAR_CLASES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_GTVCLAS_CODE", p_GTVCLAS_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GTVCLAS_ESTADO_IND", p_GTVCLAS_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GTVCLAS_SIST_CODE", p_GTVCLAS_SIST_CODE, ParameterDirection.Input, 253))
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

    Public Function Crear_Clases(ByVal p_GTVCLAS_CODE As String, ByVal p_GTVCLAS_DESC As String, ByVal p_GTVCLAS_SIST_CODE As String, ByVal p_GTVCLAS_ESTADO_IND As String, ByVal p_GTVCLAS_USUA_ID As String,
                                 ByVal p_DETAIL As String, ByVal p_DETAIL_COUNT As Integer) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_CREAR_CLASES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_GTVCLAS_CODE", p_GTVCLAS_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GTVCLAS_DESC", p_GTVCLAS_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GTVCLAS_SIST_CODE", p_GTVCLAS_SIST_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GTVCLAS_ESTADO_IND", p_GTVCLAS_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GTVCLAS_USUA_ID", p_GTVCLAS_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETAIL", p_DETAIL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETAIL_COUNT", p_DETAIL_COUNT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)

            msg(0) = cmd1.Parameters("@p_GENERADO").Value
            msg(1) = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Actualizar_Clases(ByVal p_GTVCLAS_CODE As String, ByVal p_GTVCLAS_DESC As String, ByVal p_GTVCLAS_SIST_CODE As String, ByVal p_GTVCLAS_ESTADO_IND As String, ByVal p_GTVCLAS_USUA_ID As String,
                                 ByVal p_DETAIL As String, ByVal p_DETAIL_COUNT As Integer) As Array
        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_ACTUALIZAR_CLASES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_GTVCLAS_CODE", p_GTVCLAS_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GTVCLAS_DESC", p_GTVCLAS_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GTVCLAS_SIST_CODE", p_GTVCLAS_SIST_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GTVCLAS_ESTADO_IND", p_GTVCLAS_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GTVCLAS_USUA_ID", p_GTVCLAS_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETAIL", p_DETAIL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETAIL_COUNT", p_DETAIL_COUNT, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)


            msg(0) = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
End Class
