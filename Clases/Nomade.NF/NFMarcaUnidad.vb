Public Class NFMarcaUnidad

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function ListarMarcaUnidad(ByVal p_codigo As String, ByVal p_marca As String, ByVal p_estado As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFF_LISTAR_MARCA_UNIDAD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARCA", p_marca, ParameterDirection.Input, 253))


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

    Public Function ActualizarMarcaUnidad(ByVal p_CODE As String, ByVal p_MARCA As String,
                                       ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String, ByVal p_DESC_MARCA As String) As Array
        Dim msg(2) As String
        Try

            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFF_ACTUALIZAR_MARCA_UNIDAD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARCA", p_MARCA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_MARCA", p_DESC_MARCA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESPUESTA", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = p_CODE
            msg(1) = cmd.Parameters("@p_RESPUESTA").Value

        Catch ex As Exception
            msg(0) = ex.Message
            msg(1) = "ERROR"
        End Try
        Return msg
    End Function

    Public Function CrearMarcaUnidad(ByVal p_marca As String,
                                         ByVal p_activo As String, ByVal p_user As String, ByVal p_DESC_MARCA As String) As Array

        Dim msg(2) As String
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFF_CREAR_MARCA_UNIDAD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARCA", p_marca, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_activo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_MARCA", p_DESC_MARCA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESPUESTA", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_CODE").Value
            msg(1) = cmd.Parameters("@p_RESPUESTA").Value

        Catch ex As Exception
            msg(0) = ex.Message
            msg(1) = "ERROR"
        End Try
        Return msg
    End Function


    Public Function CambiarEstadoMarcaUnidad(ByVal p_codigo As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFF_CAMBIAR_ESTADO_MARCA_UNIDAD", CommandType.StoredProcedure)
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
