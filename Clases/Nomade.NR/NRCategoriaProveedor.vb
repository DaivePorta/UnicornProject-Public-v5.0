Public Class NRCategoriaProveedor


    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function ListarTipoClienteProveedor(ByVal p_code As String, ByVal p_tipo_ind As String, ByVal p_estado As String, _
                                                ByVal p_ctlg_code As String, Optional ByVal p_tipo As String = "A") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_CATEGORIACLPR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_IND", p_tipo_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_tipo, ParameterDirection.Input, 253))
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

    Public Function ActualizarTipoClienteProveedor(ByVal p_desc As String, ByVal p_code As String, _
                                                   ByVal p_tipo As String, ByVal p_activo As String, _
                                                   ByVal p_user As String, ByVal p_ctlg_code As String, _
                                                   ByVal p_predet As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_CATEGORIACLPR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_desc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_IND", p_tipo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_activo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PREDET", p_predet, ParameterDirection.Input, 253))
            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearTipoClienteProveedor(ByVal p_desc As String, ByVal p_tipo As String, ByVal p_activo As String, _
                                              ByVal p_user As String, ByVal p_ctlg_code As String, _
                                              ByVal p_predet As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_CATEGORIACLPR", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_desc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_IND", p_tipo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_activo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PREDET", p_predet, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CODE").Value


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CambiarEstadoTipoClienteProveedor(ByVal p_codigo As String, ByVal p_tipo As String, ByVal p_ctlg As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CAMBIAR_ESTADO_CATEGORIACLPR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_IND", p_tipo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_ctlg, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd1.Parameters("@p_ESTADO").Value



            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function fListarProveedores(ByVal CodEmpresa As String) As DataTable

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SP_LIST_PROV", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", CodEmpresa, ParameterDirection.Input, 253))


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

End Class



