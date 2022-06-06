Public Class CTTipoMedioPago
    Private cn As Nomade.Connection
    Dim oDT As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function fnAgregarTipoMedioPago(ByVal sCodSunat As String, ByVal sDescripcion As String, ByVal sDescripcionCorta As String,
                                           ByVal sEstado As String, ByVal sCodUsuario As String) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("Contabilidad.SpCon_AgregarTipoMedioPago", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@psCodTipoMedioPago", DBNull.Value, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@pecCodSunat", sCodSunat, ParameterDirection.Input, DbType.String))
            cmd.Parameters.Add(cn.GetNewParameter("@pecDescripcion", sDescripcion, ParameterDirection.Input, DbType.String))
            cmd.Parameters.Add(cn.GetNewParameter("@pecDescripCorta", sDescripcionCorta, ParameterDirection.Input, DbType.String))
            cmd.Parameters.Add(cn.GetNewParameter("@pebEstado", IIf(sEstado.Equals(""), DBNull.Value, IIf(sEstado.Equals("A"), True, False)), ParameterDirection.Input, DbType.Boolean))
            cmd.Parameters.Add(cn.GetNewParameter("@peCodUsuario", sCodUsuario, ParameterDirection.Input, DbType.String))
            cmd = cn.Ejecuta_parms(cmd)

            Dim sCodTipoMedioPago As String = cmd.Parameters("@psCodTipoMedioPago").Value
            Return sCodTipoMedioPago
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Sub fnEditarTipoMedioPago(ByVal sCodTipoMedioPago As String, ByVal sCodSunat As String, ByVal sDescripcion As String,
                                     ByVal sDescripcionCorta As String, ByVal sEstado As String, ByVal sCodUsuario As String)
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("Contabilidad.SpCon_EditarTipoMedioPago", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@peCodTipoMedioPago", sCodTipoMedioPago, ParameterDirection.Input, DbType.String))
            cmd.Parameters.Add(cn.GetNewParameter("@pecCodSunat", sCodSunat, ParameterDirection.Input, DbType.String))
            cmd.Parameters.Add(cn.GetNewParameter("@pecDescripcion", sDescripcion, ParameterDirection.Input, DbType.String))
            cmd.Parameters.Add(cn.GetNewParameter("@pecDescripCorta", sDescripcionCorta, ParameterDirection.Input, DbType.String))
            cmd.Parameters.Add(cn.GetNewParameter("@pebEstado", IIf(sEstado.Equals(""), DBNull.Value, IIf(sEstado.Equals("A"), True, False)), ParameterDirection.Input, DbType.Boolean))
            cmd.Parameters.Add(cn.GetNewParameter("@peCodUsuario", sCodUsuario, ParameterDirection.Input, DbType.String))
            cmd = cn.Ejecuta_parms(cmd)
        Catch ex As Exception
            Throw (ex)
        End Try
    End Sub

    Public Function fnListaTipoMedioPago(ByVal sCodTipoMedioPago As String, ByVal sEstado As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("Contabilidad.SpCon_ListaTipoMedioPago", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@peCodTipoMedioPago", IIf(sCodTipoMedioPago.Equals(""), DBNull.Value, sCodTipoMedioPago), ParameterDirection.Input, DbType.String))
            cmd.Parameters.Add(cn.GetNewParameter("@pebEstado", IIf(sEstado.Equals(""), DBNull.Value, IIf(sEstado.Equals("A"), True, False)), ParameterDirection.Input, DbType.Boolean))

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

    Public Function fnCambiarEstadoTipoMedioPago(ByVal sCodTipoMedioPago As String, ByVal sCodUsuario As String) As Boolean
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("Contabilidad.SpCon_CambiarEstadoTipoMedioPago", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@peCodTipoMedioPago", sCodTipoMedioPago, ParameterDirection.Input, DbType.String))
            cmd.Parameters.Add(cn.GetNewParameter("@psbEstado", DBNull.Value, ParameterDirection.Output, DbType.Boolean))
            cmd.Parameters.Add(cn.GetNewParameter("@peCodUsuario", sCodUsuario, ParameterDirection.Input, DbType.String))
            cmd = cn.Ejecuta_parms(cmd)

            Dim bEstado As Boolean = cmd.Parameters("@psbEstado").Value
            Return bEstado
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnExisteCodSunatTipoMedioPago(ByVal sCodTipoMedioPago As String, ByVal sCodSunat As String) As Boolean
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("Contabilidad.SpCon_ExisteCodSunatTipoMedioPago", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@peCodTipoMedioPago", IIf(sCodTipoMedioPago.Equals(""), DBNull.Value, sCodTipoMedioPago), ParameterDirection.Input, DbType.String))
            cmd.Parameters.Add(cn.GetNewParameter("@peCodSunat", sCodSunat, ParameterDirection.Input, DbType.String))
            cmd.Parameters.Add(cn.GetNewParameter("@psbExiste", DBNull.Value, ParameterDirection.Output, SqlDbType.Bit))
            cn.Ejecuta_parms(cmd)
            Dim bExiste As Boolean = cmd.Parameters("@psbExiste").Value
            Return bExiste
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
End Class
