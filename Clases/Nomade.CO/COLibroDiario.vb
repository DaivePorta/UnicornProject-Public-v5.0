Public Class COLibroDiario
    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    ''' <summary>
    ''' LIBRO DIARIO
    ''' </summary>
    ''' <param name="p_CTLG_CODE">EMPRESA</param>
    ''' <param name="p_SCSL_CODE">SUCURSAL</param>
    ''' <param name="p_ANIO">AÑO PERIODO</param>
    ''' <param name="p_MES">MES PERIODO</param>
    ''' <returns>TABLA DE LIBRO CONTABLE</returns>
    ''' <remarks></remarks>
    Public Function listarLibroDiario(ByVal p_CTLG_CODE As String, ByVal p_ANIO As String,
                                      ByVal p_MES As String, Optional ByVal p_SCSL_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SpCon_LibroDiarioSunat", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", IIf(p_SCSL_CODE.Equals(String.Empty), Nothing, p_SCSL_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))

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
