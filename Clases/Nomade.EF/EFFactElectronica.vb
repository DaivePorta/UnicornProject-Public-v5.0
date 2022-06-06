Public Class EFFactElectronica
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Dim respuesta As String

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub


    Public Function ListarDocumentosElectronicos(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_DOC_CODE As String,
                                                 ByVal p_PIDM As String, ByVal p_ESTADO_FACT As String, ByVal p_DESDE As String, ByVal p_HASTA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("EFAC_LISTADO_FACTURAS_ELECTRONICAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOC_CODE", p_DOC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_FACT", p_ESTADO_FACT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))

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

    Public Function ModificarEstadoDocumento(ByVal p_DOC_CODE As String, ByVal p_TIP_DOC As String) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("EFAC_UPDATE_FACTURACION_ELECTRONICA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOC_CODE", p_DOC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIP_DOC", p_TIP_DOC, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)
            Return "OK"
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


End Class
