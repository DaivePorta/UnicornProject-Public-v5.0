Public Class NATransferenciaAlmacen

    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function ListarDocumentosRegistro(ByVal p_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_ALMACEN_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PFA_LISTAR_DCTO_REGISTRO_SALIDA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMACEN_CODE", p_ALMACEN_CODE, ParameterDirection.Input, 253))

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

    Public Function ListarSeriesDocumentos(ByVal p_DCTO_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_ALMACEN_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PFA_LISTAR_SERIES_DCTO_REGISTRO_SALIDA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE", p_DCTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMACEN_CODE", p_ALMACEN_CODE, ParameterDirection.Input, 253))

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

    Public Function ListarAlmacenes(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_ALMC_CODE As String, ByVal p_ESTADO_IND As String, ByVal p_TIPO As String) As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_ALMACEN", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            'Throw (ex)
            Return Nothing
        End Try
    End Function

    Public Function ListarAlmacenesRestantes(ByVal p_ALMACEN As String, ByVal p_CTLG_CODE As String) As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_ALMACENES_RESTANTES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMACEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            'Throw (ex)
            Return Nothing
        End Try
    End Function

    Public Function ListarStockAlmacen(ByVal p_ALMACEN As String, ByVal p_GRUPO As String, ByVal p_CTLG_CODE As String) As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_PRODUCTOS_DISPONIBLES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMACEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", p_GRUPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            'Throw (ex)
            Return Nothing
        End Try
    End Function

    Public Function ListarStockAlmacenTransferencia(ByVal p_PROD_CODE As String, ByVal p_ALMACEN_CODE As String, ByVal p_GRUPO As String, ByVal p_CTLG_CODE As String) As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_STOCK_PRODUCTOS_TRANSFERENCIA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMACEN_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", p_GRUPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            'Throw (ex)
            Return Nothing
        End Try
    End Function

    Public Function ListarProductosTotalAlmacenes(ByVal p_ALMACEN As String, ByVal p_GRUPO As String, ByVal p_CTLG_CODE As String) As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_TOTAL_PRODUCTOS_ALMACEN", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMACEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", p_GRUPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            'Throw (ex)
            Return Nothing
        End Try
    End Function

    Public Function ListarStockProductosAlmacen(ByVal p_ALMACEN As String, ByVal p_GRUPO As String, ByVal p_CTLG_CODE As String) As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_PRODUCTOS_ALMACEN_DINAMICO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMACEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", p_GRUPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            'Throw (ex)
            Return Nothing
        End Try
    End Function

End Class
