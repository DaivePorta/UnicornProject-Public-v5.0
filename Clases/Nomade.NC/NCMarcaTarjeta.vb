Public Class NCMarcaTarjeta
    Private cn As Nomade.Connection

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function ListarMarcaTarjeta(ByVal p_codigo As String, ByVal estado As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PMN_LISTAR_MARCA_TARJETA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", estado, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function ListarMarcaTarjetaPorOperador(ByVal p_codigo_operador As String, ByVal estado As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PMN_LISTAR_MARCAS_TARJETA_POR_OPERADOR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_OPTR", p_codigo_operador, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", estado, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function CrearMarcaTarjeta(ByVal marca As String, ByVal tipo_marca As String, ByVal estado_marca As String) As String
        Dim msg As String
        Dim cmd As IDbCommand
        Dim cmd1 As IDbCommand

        cmd = cn.GetNewCommand("PMN_CREAR_GENERICO", CommandType.StoredProcedure)
        cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", "MARCA TARJETA " & marca, ParameterDirection.Input, 253))
        cmd.Parameters.Add(cn.GetNewParameter("@p_DEPEND_CODE", "00001", ParameterDirection.Input, 253))
        cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", estado_marca, ParameterDirection.Input, 253))
        cmd.Parameters.Add(cn.GetNewParameter("@p_COMENTARIO", Nothing, ParameterDirection.Input, 253))
        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR1", marca, ParameterDirection.Input, 253))
        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR2", tipo_marca, ParameterDirection.Input, 253))
        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR3", Nothing, ParameterDirection.Input, 253))
        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR4", Nothing, ParameterDirection.Input, 253))
        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR5", Nothing, ParameterDirection.Input, 253))
        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR6", Nothing, ParameterDirection.Input, 253))
        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR7", Nothing, ParameterDirection.Input, 253))
        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR8", Nothing, ParameterDirection.Input, 253))
        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR9", Nothing, ParameterDirection.Input, 253))
        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR10", Nothing, ParameterDirection.Input, 253))
        cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))

        cmd1 = cn.Ejecuta_parms(cmd)
        msg = cmd1.Parameters("@p_CODE").Value.ToString

        Return msg
    End Function

    Public Function ActualizarMarcaTarjeta(ByVal codigo As String, ByVal marca As String, ByVal tipo_marca As String, ByVal estado_marca As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PMN_ACTUALIZAR_MARCA_TARJETA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", "MARCA TARJETA" & marca, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", estado_marca, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR1", marca, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR2", tipo_marca, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg
        Catch ex As Exception
            Throw ex
        End Try
    End Function
End Class
