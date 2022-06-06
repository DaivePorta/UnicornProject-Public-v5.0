Public Class CPReportesGastos
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function DetalleEgresosGenerales(ByVal p_TIPO As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_DESDE As String, ByVal p_HASTA As String, ByVal p_CECC As String, ByVal p_CECD As String, ByVal p_CONC_CODE As String, ByVal p_ANIO As String, ByVal p_MES As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            'p_FILTRO=P
            cmd = cn.GetNewCommand("PFS_LISTAR_DETALLE_GASTOS_REPORTE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO", p_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_HASTA", p_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CECC_CODE", p_CECC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CECD_CODE", p_CECD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CONC_CODE", p_CONC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MES", p_MES, ParameterDirection.Input, 253))
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

    Public Function ReporteEgresosGenerales(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_DESDE As String, ByVal p_HASTA As String, ByVal p_CECC As String, ByVal p_CECD As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            'p_FILTRO=P
            cmd = cn.GetNewCommand("PGE_REPORTE_EGRESOS_GENERALES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_HASTA", p_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CECC_CODE", p_CECC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CECD_CODE", p_CECD, ParameterDirection.Input, 253))

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

    Public Function ReporteEgresosSubconceptos(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_DESDE As String, ByVal p_HASTA As String, ByVal p_SUBCONCEPTO As String, ByVal p_CECC As String, ByVal p_CECD As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            'p_FILTRO=P
            cmd = cn.GetNewCommand("PGE_REPORTE_EGRESOS_SUBCONCEPTOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_HASTA", p_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SUBCONCEPTO", p_SUBCONCEPTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CECC_CODE", p_CECC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CECD_CODE", p_CECD, ParameterDirection.Input, 253))
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


    Public Function ReporteEgresosMensuales(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_SUBCONCEPTO As String, ByVal p_ANIO As String, ByVal p_CECC As String, ByVal p_CECD As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            'p_FILTRO=P
            cmd = cn.GetNewCommand("PGE_REPORTE_EGRESOS_MENSUALES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SUBCONCEPTO", p_SUBCONCEPTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CECC_CODE", p_CECC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CECD_CODE", p_CECD, ParameterDirection.Input, 253))
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
