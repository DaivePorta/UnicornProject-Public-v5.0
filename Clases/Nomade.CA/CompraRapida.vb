Public Class CompraRapida
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function CompraRapida(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_TIPO_CAMB As String, _
                                        ByVal p_TEXT_COMP As String, ByVal p_USUA_ID As String,
                                        ByVal p_TIPO_BIEN As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCA_GRABAR_COMPRA_RAPIDA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TEXT_COMP", p_TEXT_COMP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_CAMB", p_TIPO_CAMB, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_BIEN", p_TIPO_BIEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@CODE_MOVI", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@CODE_MOVI").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
End Class
