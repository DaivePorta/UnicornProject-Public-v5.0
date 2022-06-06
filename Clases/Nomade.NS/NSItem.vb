Public Class NSItem

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function ListarItem(ByVal p_codigo As String, ByVal p_estado As String, ByVal p_sistema As String, ByVal p_modulo As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_ITEM", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SISTEMA", p_sistema, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MODULO", p_modulo, ParameterDirection.Input, 253))

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

    Public Function ActualizarItem(ByVal p_codigo As String, ByVal p_nombre As String,
                                   ByVal p_modulo As String, ByVal p_sistema As String, ByVal p_descripcion As String,
                                   ByVal p_activo As String, ByVal p_user As String, ByVal p_DETAIL As String, ByVal p_DETAIL_COUNT As Integer) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_ACTUALIZAR_ITEM", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOMBRE", p_nombre, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MODL_CODE", p_modulo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SIST_CODE", p_sistema, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_descripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_activo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETAIL", p_DETAIL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETAIL_COUNT", p_DETAIL_COUNT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MESSAGE", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd1.Parameters("@p_MESSAGE").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearItem(ByVal p_nombre As String,
                                   ByVal p_modulo As String, ByVal p_sistema As String, ByVal p_descripcion As String,
                                   ByVal p_activo As String, ByVal p_user As String, ByVal p_DETAIL As String, ByVal p_DETAIL_COUNT As Integer) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_CREAR_ITEM", CommandType.StoredProcedure)


            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOMBRE", p_nombre, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MODL_CODE", p_modulo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SIST_CODE", p_sistema, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_descripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_activo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETAIL", p_DETAIL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETAIL_COUNT", p_DETAIL_COUNT, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CODE").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function CambiarEstadoItem(ByVal p_codigo As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_CAMBIAR_ESTADO_ITEM", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd1.Parameters("@p_ESTADO").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

End Class
