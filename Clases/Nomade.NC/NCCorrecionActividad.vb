Public Class NCCorrecionActividad

    Private cn As Nomade.Connection

    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function ListarDocumentos(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_TIPO_ACT As String, ByVal p_F_DESDE As String,
                                            ByVal p_F_HASTA As String) As DataTable

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_LISTAR_DCTO_ACTIVIDAD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_ACT", p_TIPO_ACT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_F_DESDE", p_F_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_F_HASTA", p_F_HASTA, ParameterDirection.Input, 253))
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

    Public Function ActualizarDocumento(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_TIPO_ACT As String, ByVal p_CODE As String,
                                        ByVal p_TIPO_DOC As String, ByVal p_CODE_VENDEDOR As String, ByVal p_PIDM_VENDEDOR As String, ByVal p_SERIE_DOC As String,
                                        ByVal p_NRO_DOC As String, ByVal p_F_EMISION As String, ByVal p_F_VENCIMIENTO As String, ByVal p_F_DETRACCION As String, ByVal p_N_DETRACCION As String,
                                        ByVal p_IND_COMPRAS As String, ByVal p_ANIO_PERIODO As String, ByVal p_MES_PERIODO As String, ByVal p_CODE_APROB As String) As Array

        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_ACTUALIZAR_DCTO_ACTIVIDAD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_ACT", p_TIPO_ACT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DOC", p_TIPO_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_VENDEDOR", p_CODE_VENDEDOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_VENDEDOR", p_PIDM_VENDEDOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIE_DOC", p_SERIE_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_DOC", p_NRO_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_F_EMISION", p_F_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_F_VENCIMIENTO", p_F_VENCIMIENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_F_DETRACCION", p_F_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_N_DETRACCION", p_N_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_COMPRAS", p_IND_COMPRAS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO_PERIODO", p_ANIO_PERIODO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES_PERIODO", p_MES_PERIODO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_APROB", p_CODE_APROB, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try

    End Function

End Class
