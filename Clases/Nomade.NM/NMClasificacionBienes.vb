Public Class NMClasificacionBienes
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function ListarClasificacionBienes(ByVal p_CODE As String, ByVal p_DESCRIPCION As String,
                                              ByVal p_DESC_CORTA As String, ByVal p_ESTADO_IND As String,
                                              Optional ByVal p_TIPO As String = "1", Optional ByVal p_ORDEN As String = "-1") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFT_LISTAR_CLASIFICACION_BIENES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", p_DESCRIPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_CORTA", p_DESC_CORTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ORDEN", p_ORDEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))

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

    Public Function ActualizarClasificacionBienes(ByVal p_CODE As String, ByVal p_DESCRIPCION As String,
                                                  ByVal p_DESC_CORTA As String, ByVal p_ORDEN As String,
                                                  ByVal p_ESTADO_IND As String, ByVal p_TIPO As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFT_ACTUALIZAR_CLASIFICACION_BIENES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", p_DESCRIPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_CORTA", p_DESC_CORTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ORDEN", p_ORDEN, ParameterDirection.Input, 253)) 'CODIGO SUNAT
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_tipo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RETORNO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_RETORNO").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearClasificacionBienes(ByVal p_DESCRIPCION As String, ByVal p_DESC_CORTA As String,
                                             ByVal p_ORDEN As String, ByVal p_ESTADO_IND As String,
                                             ByVal p_USUA_ID As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFT_CREAR_CLASIFICACION_BIENES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", p_DESCRIPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_CORTA", p_DESC_CORTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ORDEN", p_ORDEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CODIGO").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
End Class
