Public Class CTPeriodoContable
    Private cn As Nomade.Connection
    Dim oDT As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    'Public Function fnAgregarLibroContable(ByVal sCodSunat As String, ByVal sDescripcion As String, ByVal sDescripcionCorta As String,
    '                                       ByVal sEstado As String, ByVal sCodUsuario As String) As String
    '    Try
    '        Dim cmd As IDbCommand
    '        cmd = cn.GetNewCommand("Contabilidad.SpCon_AgregarLibroContable", CommandType.StoredProcedure)
    '        cmd.Parameters.Add(cn.GetNewParameter("@psCodLibro", DBNull.Value, ParameterDirection.Output, SqlDbType.VarChar,, 4))
    '        cmd.Parameters.Add(cn.GetNewParameter("@pecCodSunat", sCodSunat, ParameterDirection.Input, DbType.String))
    '        cmd.Parameters.Add(cn.GetNewParameter("@pecDescripcion", sDescripcion, ParameterDirection.Input, DbType.String))
    '        cmd.Parameters.Add(cn.GetNewParameter("@pecDescripcionCorta", sDescripcionCorta, ParameterDirection.Input, DbType.String))
    '        cmd.Parameters.Add(cn.GetNewParameter("@pebEstado", IIf(sEstado.Equals(""), DBNull.Value, IIf(sEstado.Equals("A"), True, False)), ParameterDirection.Input, DbType.Boolean))
    '        cmd.Parameters.Add(cn.GetNewParameter("@peCodUsuario", sCodUsuario, ParameterDirection.Input, DbType.String))
    '        cmd = cn.Ejecuta_parms(cmd)

    '        Dim sCodLibro As String = cmd.Parameters("@psCodLibro").Value
    '        Return sCodLibro
    '    Catch ex As Exception
    '        Throw (ex)
    '    End Try
    'End Function

    'Public Sub fnEditarLibroContable(ByVal sCodLibro As String, ByVal sCodSunat As String, ByVal sDescripcion As String,
    '                                 ByVal sDescripcionCorta As String, ByVal sEstado As String, ByVal sCodUsuario As String)
    '    Try
    '        Dim cmd As IDbCommand
    '        cmd = cn.GetNewCommand("Contabilidad.SpCon_EditarLibroContable", CommandType.StoredProcedure)
    '        cmd.Parameters.Add(cn.GetNewParameter("@peCodLibro", sCodLibro, ParameterDirection.Input, DbType.String))
    '        cmd.Parameters.Add(cn.GetNewParameter("@pecCodSunat", sCodSunat, ParameterDirection.Input, DbType.String))
    '        cmd.Parameters.Add(cn.GetNewParameter("@pecDescripcion", sDescripcion, ParameterDirection.Input, DbType.String))
    '        cmd.Parameters.Add(cn.GetNewParameter("@pecDescripcionCorta", sDescripcionCorta, ParameterDirection.Input, DbType.String))
    '        cmd.Parameters.Add(cn.GetNewParameter("@pebEstado", IIf(sEstado.Equals(""), DBNull.Value, IIf(sEstado.Equals("A"), True, False)), ParameterDirection.Input, DbType.Boolean))
    '        cmd.Parameters.Add(cn.GetNewParameter("@peCodUsuario", sCodUsuario, ParameterDirection.Input, DbType.String))
    '        cmd = cn.Ejecuta_parms(cmd)
    '    Catch ex As Exception
    '        Throw (ex)
    '    End Try
    'End Sub

    Public Function fnListaPeriodoContable(ByVal sCodEmpresa As String, ByVal sCodLibro As String, ByVal sAnio As String, ByVal sMes As String, ByVal sAbierto As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("Contabilidad.SpCon_ListaPeriodoContable", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@peCodEmpresa", sCodEmpresa, ParameterDirection.Input, DbType.String))
            cmd.Parameters.Add(cn.GetNewParameter("@peCodLibro", IIf(sCodLibro.Equals(""), DBNull.Value, sCodLibro), ParameterDirection.Input, DbType.String))
            cmd.Parameters.Add(cn.GetNewParameter("@pecAnio", IIf(sAnio.Equals(""), DBNull.Value, sAnio), ParameterDirection.Input, DbType.String))
            cmd.Parameters.Add(cn.GetNewParameter("@pecMes", IIf(sMes.Equals(""), DBNull.Value, sMes), ParameterDirection.Input, DbType.String))
            cmd.Parameters.Add(cn.GetNewParameter("@pebAbierto", IIf(sAbierto.Equals(""), DBNull.Value, IIf(sAbierto.Equals("A"), True, False)), ParameterDirection.Input, DbType.Boolean))

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

    'Public Function fnCambiarEstadoLibroContable(ByVal sCodLibro As String, ByVal sCodUsuario As String) As Boolean
    '    Try
    '        Dim cmd As IDbCommand
    '        cmd = cn.GetNewCommand("Contabilidad.SpCon_CambiarEstadoLibroContable", CommandType.StoredProcedure)
    '        cmd.Parameters.Add(cn.GetNewParameter("@peCodLibro", sCodLibro, ParameterDirection.Input, DbType.String))
    '        cmd.Parameters.Add(cn.GetNewParameter("@psbEstado", DBNull.Value, ParameterDirection.Output, DbType.Boolean))
    '        cmd.Parameters.Add(cn.GetNewParameter("@peCodUsuario", sCodUsuario, ParameterDirection.Input, DbType.String))
    '        cmd = cn.Ejecuta_parms(cmd)

    '        Dim bEstado As Boolean = cmd.Parameters("@psbEstado").Value
    '        Return bEstado
    '    Catch ex As Exception
    '        Throw (ex)
    '    End Try
    'End Function

End Class
