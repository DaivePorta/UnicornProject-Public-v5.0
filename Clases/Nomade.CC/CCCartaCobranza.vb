Public Class CCCartaCobranza

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function CrearCartaCobranza(ByVal p_ctlg_code As String, ByVal p_pidm_cliente As String,
                                      ByVal p_mone_code As String, ByVal p_monto As String,
                                      ByVal p_html As String, ByVal p_usua_id As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_CARTA_COBRANZA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM_CLIENTE", p_pidm_cliente, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONE_CODE", p_mone_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONTO", p_monto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_HTML", p_html, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", p_usua_id, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@P_NUM", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd.Parameters("@P_NUM").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarCartaCobranza(ByVal ctlg_code As String, ByVal code As String)
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_LISTAR_CARTA_COBRANZA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODIGO", code, ParameterDirection.Input, 253))

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
