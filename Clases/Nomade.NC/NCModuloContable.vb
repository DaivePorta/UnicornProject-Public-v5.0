Public Class NCModuloContable
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function ListarModulos(ByVal p_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_MODULOS_CONTABLES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
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

    Public Function ListarDetalleModulos(ByVal p_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_DETALLE_MODULOS_CONTABLES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
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

    Public Function CrearModuloContable(ByVal p_NOMBRE As String, ByVal p_DESCRIPCION As String, ByVal p_USUARIO As String) As String

        Dim cmd1 As IDbCommand
        Dim cmd As IDbCommand
        Dim msg(1) As String
        Try

            cmd = cn.GetNewCommand("PFS_CREAR_MODULO_CONTABLE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOMBRE", p_NOMBRE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", p_DESCRIPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUARIO", p_USUARIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)

            Dim sCodigo As String = (cmd.Parameters("@p_CODE_GENERADO").Value).ToString()


            Return sCodigo

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarModuloContable(ByVal p_CODE As String, ByVal p_NOMBRE As String, ByVal p_DESCRIPCION As String, ByVal p_USUARIO As String, ByVal p_ESTADO As String) As String

        Dim cmd1 As IDbCommand
        Dim cmd As IDbCommand
        Dim msg(1) As String
        Try

            cmd = cn.GetNewCommand("PFS_ACTUALIZAR_MODULO_CONTABLE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOMBRE", p_NOMBRE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", p_DESCRIPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUARIO", p_USUARIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            Dim sRpta As String = (cmd.Parameters("@p_SALIDA").Value).ToString()


            Return sRpta

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearDetalleModuloContable(ByVal p_CODE As String, ByVal p_CTLG As String, ByVal p_VALOR As String) As String

        Dim cmd1 As IDbCommand
        Dim cmd As IDbCommand
        Dim msg(1) As String
        Try

            cmd = cn.GetNewCommand("PFS_CREAR_DETALLE_MODULO_CONTABLE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_CTLG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR", p_VALOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            Dim sRpta As String = (cmd.Parameters("@p_SALIDA").Value).ToString()


            Return sRpta

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function EliminarDetalleModuloContable(ByVal p_CODE As String, ByVal p_CTLG As String) As String

        Dim cmd1 As IDbCommand
        Dim cmd As IDbCommand
        Dim msg(1) As String
        Try

            cmd = cn.GetNewCommand("PFS_ELIMINAR_DETALLE_MODULO_CONTABLE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_CTLG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            Dim sRpta As String = (cmd.Parameters("@p_SALIDA").Value).ToString()


            Return sRpta

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CambiarEstadoModuloContable(ByVal p_CODE As String, ByVal p_ESTADO As String) As String

        Dim cmd1 As IDbCommand
        Dim cmd As IDbCommand
        Dim msg(1) As String
        Try

            cmd = cn.GetNewCommand("PFS_CAMBIAR_ESTADO_MODULO_CONTABLE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            Dim sRpta As String = (cmd.Parameters("@p_SALIDA").Value).ToString()


            Return sRpta

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

End Class
