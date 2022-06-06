Public Class NCActividad
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function ListarActividad(ByVal p_codigo As String, ByVal p_estado As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_ACTIVIDAD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado, ParameterDirection.Input, 253))

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

    Public Function ActualizarActividad(ByVal p_codigo As String, ByVal p_codigosunat As String,
                                       ByVal p_nombre As String, ByVal p_nombrepropio As String, ByVal p_descripcion As String, ByVal p_activo As String,
                                       ByVal p_user As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_ACTIVIDAD", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_SUNAT", p_codigosunat, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOMBRE_ACTIVIDAD", p_nombre, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOMBRE_PROPIO", p_nombrepropio, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", p_descripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_activo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MENSAJE", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd1.Parameters("@p_MENSAJE").Value


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearActividad(ByVal p_codigosunat As String,
                                       ByVal p_nombre As String, ByVal p_nombrepropio As String, ByVal p_descripcion As String, ByVal p_activo As String,
                                       ByVal p_user As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_ACTIVIDAD", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_SUNAT", p_codigosunat, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOMBRE_ACTIVIDAD", p_nombre, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOMBRE_PROPIO", p_nombrepropio, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", p_descripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_activo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MENSAJE", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_MENSAJE").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function CambiarEstadoActividad(ByVal p_codigo As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CAMBIAR_ESTADO_ACTIVIDAD", CommandType.StoredProcedure)
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
