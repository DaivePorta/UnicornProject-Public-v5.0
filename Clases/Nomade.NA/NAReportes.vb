Public Class NAReportes

    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function LISTAR_KARDEX(ByVal p_PROD_CODE As String, ByVal p_ALMC_CODE As String, ByVal p_MONE_CODE As String, Optional ByVal p_FECHA As String = "")

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_REPORTE_KARDEX", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA", IIf(p_FECHA = "", DBNull.Value, p_FECHA), ParameterDirection.Input, 253))

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

    Public Function LISTAR_INVENT_UND_FISICAS(ByVal p_PROD_CODE As String, ByVal p_ALMC_CODE As String, ByVal p_CATALOGO As String, ByVal p_ANIO As String, ByVal p_PERI As String)

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_REPORTE_REGISTR_INVENT_UND_FISICAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CATALOGO", p_CATALOGO, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERI", p_PERI, ParameterDirection.Input, 253))



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

    Public Function LISTAR_REPORTE_COMPRAS_PROVEEDOR_RESUMEN(ByVal p_PROV_PIDM As String, ByVal p_DEL As String, ByVal p_AL As String)

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFT_REPORTE_COMPRAS_PROVEEDOR_RESUMEN", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROV_PIDM", p_PROV_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DEL", p_DEL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_AL", p_AL, ParameterDirection.Input, 253))

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

    Public Function LISTAR_REPORTE_COMPRAS_PRODUCTO_PROVEEDOR(ByVal p_PROV_PIDM As String, ByVal p_DEL As String, ByVal p_AL As String, ByVal p_subGrupo As String,
                                                              Optional p_CTLG_CODE As String = "", Optional p_SCSL_CODE As String = "")

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFT_LISTAR_PRODUCTO_PROVEEDOR_RANGO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROV_CODE", p_PROV_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DEL", IIf(p_DEL = "", DBNull.Value, p_DEL), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_AL", IIf(p_AL = "", DBNull.Value, p_AL), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_subGrupo", p_subGrupo, ParameterDirection.Input, 253))
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

    Public Function LISTAR_REPORTE_PRODUCTO_PRECIOS_PROVEEDOR(ByVal p_PROV_CODE As String, ByVal p_PROD_CODE As String, ByVal p_CTLG_CODE As String)

        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFT_LISTAR_PRODUCTO_PROVEEDOR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROV_CODE", p_PROV_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            Dim oDT As DataTable
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fListarDetalleFacturas(ByVal p_Code As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFT_REPORTE_COMPRAS_PROVEEDOR_DETALLE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_Code, ParameterDirection.Input, 253))

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

    Public Function LISTAR_TRANSFERENCIA_ALMACEN(ByVal p_ORIGEN As String, ByVal p_DESTINO As String, ByVal p_DESDE As String, ByVal p_HASTA As String)

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_TRANSFERENCIA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_Origen", p_ORIGEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Destino", p_DESTINO, ParameterDirection.Input, 253))
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

End Class
