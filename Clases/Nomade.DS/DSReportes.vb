Public Class DSReportes
    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    ''' <summary>
    ''' Alta de Clientes
    ''' </summary>
    ''' <param name="p_CTLG_CODE">CÓDIGO DE EMPRESA</param>
    ''' <param name="p_SCSL_CODE">CÓDIGO DE ESTABLECIMIENTO (VACÍO: TODOS)</param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ListarAltasDeClientes(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PDM_LLENA_ALTA_CLIENTES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))

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

    ''' <summary>
    ''' Listado de Ventas por Zona de Distribución
    ''' </summary>
    ''' <param name="p_CTLG_CODE">CÓDIGO DE EMPRESA</param>
    ''' <param name="p_SCSL_CODE">CÓDIGO DE RESTABLECIMIENTO</param>
    ''' <param name="p_ZONA_CODE">CÓDIGO DE ZONA</param>
    ''' <param name="p_FECHA_INI">FECHA INICIO</param>
    ''' <param name="p_FECHA_FIN">FECHA FIN (SI ESTA VACÍA, SOLO SE TOMA EL FECHA_INI)</param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function VentasXzonasDistribucion(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, _
                                             ByVal p_ZONA_CODE As String, ByVal p_FECHA_INI As String, _
                                             ByVal p_FECHA_FIN As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PDS_REPORTE_DISTRIBUCION_POR_ZONAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ZONA_CODE", p_ZONA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INI", p_FECHA_INI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN", p_FECHA_FIN, ParameterDirection.Input, 253))

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
