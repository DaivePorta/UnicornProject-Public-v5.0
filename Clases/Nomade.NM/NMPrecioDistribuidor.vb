Public Class NMPrecioDistribuidor

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function ListarPrecioDistribuidor(ByVal p_ctlg_code As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_PRECIO_DISTRIBUIDOR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))

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

    Public Function CrearPrecioDistribuidor(ByVal p_code As String,
                                    ByVal p_limite As String, ByVal p_descuento As String, ByVal p_ctlg_code As String,
                                    ByVal p_usua_id As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFS_CREAR_PRECIO_DISTRIBUIDOR", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVPRER_CODE", p_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LIMITE", p_limite, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCUENTO", p_descuento, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_RESP").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function ActualizarPrecioDistribuidor(ByVal p_code As String, ByVal p_codigo_rango As String,
                                    ByVal p_limite As String, ByVal p_descuento As String, ByVal p_ctlg_code As String,
                                    ByVal p_usua_id As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFS_ACTUALIZAR_PRECIO_DISTRIBUIDOR", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVPRER_CODE", p_codigo_rango, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LIMITE", p_limite, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCUENTO", p_descuento, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_RESP").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function



End Class
